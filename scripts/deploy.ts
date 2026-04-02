import hre from "hardhat";
const { ethers } = hre;

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with:", deployer.address);

  // 1. Deploy governance token
  const Token = await ethers.getContractFactory("AxionToken");
  const token = await Token.deploy();
  await token.waitForDeployment();
  console.log("AxionToken deployed to:", await token.getAddress());

  // 2. Deploy governor
  const Governor = await ethers.getContractFactory("AxionGovernor");
  const governor = await Governor.deploy(await token.getAddress());
  await governor.waitForDeployment();
  console.log("AxionGovernor deployed to:", await governor.getAddress());

  // 3. Delegate votes to deployer (required before proposing)
  const tx = await token.delegate(deployer.address);
  await tx.wait();
  console.log("Votes delegated to deployer");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
