const hre = require("hardhat");

async function main() {
  const contractAddress = "0x..."; // ← paste deployed contract address here

  await hre.run("verify:verify", {
    address: contractAddress,
    constructorArguments: [],
  });
}

main().catch(console.error);