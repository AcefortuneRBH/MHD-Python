const { expect } = require("chai");

describe("MHDTOKEN", function () {
  it("Should deploy with 9T MHD total supply", async () => {
    const [owner] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("MHDTOKEN");
    const token = await Token.deploy();

    const totalSupply = await token.totalSupply();
    const ownerBalance = await token.balanceOf(owner.address);

    expect(ownerBalance).to.equal(totalSupply);
    expect(totalSupply).to.equal(ethers.utils.parseEther("9000000000000"));
  });
});