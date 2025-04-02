const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("🚀 Deploying MHDTOKEN with:", deployer.address);

  const Token = await ethers.getContractFactory("MHDTOKEN");
  const token = await Token.deploy();

  await token.deployed();
  console.log("✅ MHDTOKEN deployed at:", token.address);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});