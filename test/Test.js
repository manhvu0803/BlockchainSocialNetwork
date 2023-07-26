const { ethers } = require("hardhat");
const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers")

describe("Social network", () => {
    async function deployFixture() {
        const [owner] = await ethers.getSigners();
        const contract = await ethers.deployContract("SocialNetwork");
        await contract.waitForDeployment();

        return { owner, contract };
    }

    it("Create new account", async () => {
        const { owner, contract } = await loadFixture(deployFixture);
        await contract.registerNewUser(owner.address, "testName", "https://fastly.picsum.photos/id/1051/200/300.jpg?hmac=l1jFNN1wGY2r8gVAipnoabHxa9LKBSoOTznSjOYWsUY");
        let user = await contract.users(owner.address);
        console.log(user);
        expect(user).to.be.ok;
    });

    it("Create new post", async () => {
        const { owner, contract } = await loadFixture(deployFixture);
        await contract.registerNewUser(owner.address, "testName", "https://fastly.picsum.photos/id/1051/200/300.jpg?hmac=l1jFNN1wGY2r8gVAipnoabHxa9LKBSoOTznSjOYWsUY");
        expect(contract.createNewPost(owner.address, "testPost", Date.now())).to.emit(contract, "NewPost");
    });
})