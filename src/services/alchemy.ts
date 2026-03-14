// src/services/alchemy.ts
import { Alchemy, Network, AssetTransfersCategory, SortingOrder } from 'alchemy-sdk';

let alchemyInstance: Alchemy | null = null;

export function getAlchemy(): Alchemy {
  if (!alchemyInstance) {
    const apiKey = process.env.ALCHEMY_API_KEY;
    if (!apiKey) {
      throw new Error('[Alchemy] ALCHEMY_API_KEY not set in environment');
    }
    alchemyInstance = new Alchemy({
      apiKey,
      network: Network.ETH_MAINNET,
      maxRetries: 3,
      requestTimeout: 15000,
    });
  }
  return alchemyInstance;
}

export async function checkAlchemyHealth(): Promise<boolean> {
  try {
    const alchemy = getAlchemy();
    const blockNumber = await alchemy.core.getBlockNumber();
    return blockNumber > 0;
  } catch {
    return false;
  }
}

export async function fetchTokenBalances(address: string) {
  const alchemy = getAlchemy();
  const balances = await alchemy.core.getTokenBalances(address);

  const nonZero = balances.tokenBalances.filter(
    (b) => b.tokenBalance && BigInt(b.tokenBalance) > 0n
  );

  const enriched = await Promise.all(
    nonZero.slice(0, 20).map(async (bal) => {
      try {
        const meta = await alchemy.core.getTokenMetadata(bal.contractAddress);
        const rawBalance = BigInt(bal.tokenBalance || '0');
        const decimals = meta.decimals || 18;
        const balance = Number(rawBalance) / Math.pow(10, decimals);

        return {
          symbol: meta.symbol || 'UNKNOWN',
          name: meta.name || 'Unknown Token',
          address: bal.contractAddress,
          balance,
          decimals,
          logoURI: meta.logo || undefined,
        };
      } catch {
        return null;
      }
    })
  );

  return enriched.filter(Boolean);
}

export async function fetchEthBalance(address: string): Promise<number> {
  const alchemy = getAlchemy();
  const balance = await alchemy.core.getBalance(address);
  return Number(balance) / 1e18;
}

export async function fetchAssetTransfers(
  address: string,
  direction: 'from' | 'to',
  maxCount: number = 50
) {
  const alchemy = getAlchemy();

  const params: any = {
    category: [
      AssetTransfersCategory.ERC20,
      AssetTransfersCategory.EXTERNAL,
    ],
    maxCount,
    order: SortingOrder.DESCENDING,
    withMetadata: true,
  };

  if (direction === 'from') {
    params.fromAddress = address;
  } else {
    params.toAddress = address;
  }

  const result = await alchemy.core.getAssetTransfers(params);
  return result.transfers;
}

export async function resolveENS(address: string): Promise<string | null> {
  try {
    const alchemy = getAlchemy();
    const name = await alchemy.core.lookupAddress(address);
    return name;
  } catch {
    return null;
  }
}

export async function batchResolveENS(
  addresses: string[]
): Promise<Record<string, string | null>> {
  const results: Record<string, string | null> = {};

  for (let i = 0; i < addresses.length; i += 5) {
    const batch = addresses.slice(i, i + 5);
    const resolved = await Promise.all(
      batch.map(async (addr) => ({
        address: addr,
        ens: await resolveENS(addr),
      }))
    );
    resolved.forEach((r) => {
      results[r.address] = r.ens;
    });
  }

  return results;
}
