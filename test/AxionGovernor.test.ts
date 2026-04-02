import { expect } from "chai";
import hre from "hardhat";
const { ethers } = hre;
import { AxionGovernor, AxionToken } from "../typechain-types";

describe("AxionGovernor", function () {
  let governor: AxionGovernor;
  let token: AxionToken;
  let owner: any, voter: any;

  beforeEach(async function () {
    [owner, voter] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("AxionToken");
    token = await Token.deploy();
    const Governor = await ethers.getContractFactory("AxionGovernor");
    governor = await Governor.deploy(await token.getAddress());
    // Delegate + transfer tokens
    await token.delegate(owner.address);
    await token.transfer(voter.address, ethers.parseEther("1000000"));
    await token.connect(voter).delegate(voter.address);
  });

  it("Should deploy with correct name", async function () {
    expect(await governor.name()).to.equal("AxionGovernor");
  });

  it("Should have 4% quorum fraction", async function () {
    expect(await governor["quorumNumerator()"]()).to.equal(4n);
  });

  it("Should award XP on vote", async function () {
    // Create a proposal first
    const targets = [ethers.ZeroAddress];
    const values  = [0n];
    const calldatas = ["0x"];
    const desc = "Test proposal #1";
    await governor.propose(targets, values, calldatas, desc);
    const proposalId = await governor.hashProposal(targets, values, calldatas,
      ethers.id(desc));
    // Advance time past voting delay (mining 86401 blocks works for both block and time clocks)
    await ethers.provider.send("hardhat_mine", ["0x15181"]); // 86401 in hex
    // Vote and check XP
    await governor.castVoteAndEarnXP(proposalId, 1);
    expect(await governor.contributorXP(owner.address)).to.equal(100n);
  });
});
