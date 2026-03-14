// src/lib/formatters.ts

export function formatAddress(address: string | undefined): string {
    if (!address) return 'Unknown';
    if (address.length < 10) return address; // Probably an ENS name
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function formatUSD(value: number): string {
    if (value >= 1_000_000_000) {
        return `$${(value / 1_000_000_000).toFixed(2)}B`;
    }
    if (value >= 1_000_000) {
        return `$${(value / 1_000_000).toFixed(2)}M`;
    }
    if (value >= 1_000) {
        return `$${(value / 1_000).toFixed(1)}k`;
    }
    return `$${value.toFixed(2)}`;
}

export function formatTokenAmount(amount: number, decimals: number = 18): string {
    // Simple formatter assuming amounts are already scaled down for the UI
    return new Intl.NumberFormat('en-US', {
        maximumFractionDigits: 2,
        notation: amount >= 100000 ? "compact" : "standard",
        compactDisplay: "short"
    }).format(amount);
}

export function formatTimeAgo(timestamp: string): string {
    const diff = Date.now() - new Date(timestamp).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
}

export function formatPercentage(value: number, decimals: number = 1): string {
    return `${value.toFixed(decimals)}%`;
}