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
        expect(contract.createNewPost(owner.address, "testPost", Date.now()))
            .to.emit(contract, "NewPost");
    });

    it("Add comment", async () => {
        const { owner, contract } = await loadFixture(deployFixture);
        await contract.registerNewUser(owner.address, "testName", "");
        await contract.createNewPost(owner.address, "testPost", Date.now());
        expect(contract.addComment(owner.address, 1, "test comment", Date.now()))
            .to.emit(contract, "NewComment");
    });

    it("Like", async () => {
        const { owner, contract } = await loadFixture(deployFixture);
        await contract.registerNewUser(owner.address, "testName", "");
        await contract.createNewPost(owner.address, "testPost", Date.now());
        expect(contract.toggleLike(owner.address, 1))
            .to.emit(contract, "LikeStatusChanged")
            .withArgs(owner.address, 1, true);
    });

    it("Update user info", async () => {
        const { owner, contract } = await loadFixture(deployFixture);
        await contract.registerNewUser(owner.address, "testName", "https://fastly.picsum.photos/id/1051/200/300.jpg?hmac=l1jFNN1wGY2r8gVAipnoabHxa9LKBSoOTznSjOYWsUY");

        let newName = "updatedName";
        await contract.updateUserinfo(owner.address, newName, "");
        let user = await contract.users(owner.address);
        expect(user[1]).to.equal(newName);
    });
})