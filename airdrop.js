const { ethers } = require("hardhat");

// List of recipient addresses (update with your addresses)
const recipients = [
  "0xAddress1...",
  "0xAddress2...",
  // Add more addresses as needed
];

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Airdrop initiated by:", deployer.address);

  // Replace with your deployed MHDTOKEN address
  const tokenAddress = "0xYourMHDTOKENAddress";
  const token = await ethers.getContractAt("MHDTOKEN", tokenAddress, deployer);

  // Define the amount per recipient (e.g., 1000 MHD)
  const amount = ethers.utils.parseEther("1000");

  for (const recipient of recipients) {
    console.log(`Sending 1000 MHD to ${recipient}`);
    const tx = await token.transfer(recipient, amount);
    await tx.wait();
    console.log(`Transaction hash: ${tx.hash}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});