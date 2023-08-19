require("dotenv").config();
const contract = require("../artifacts/contracts/socialNetwork.sol/SocialNetwork.json");

const API_KEY = process.env.API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const provider = new ethers.InfuraProvider(network = "sepolia", API_KEY);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);
const contractInstance = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, signer);

const address = "0xfb809c4cf09BF87283BF1cAd1002077E85715e2f";

async function main() {
    console.log("Sending new account");
    let tx = await contractInstance.registerNewUser(address, "testName", "https://fastly.picsum.photos/id/1051/200/300.jpg?hmac=l1jFNN1wGY2r8gVAipnoabHxa9LKBSoOTznSjOYWsUY");
    console.log("Creating new account");
    await tx.wait();
    console.log("New account created");

    console.log("Sending new post");
    tx = await contractInstance.createNewPost(address, "Hello world", Date.now());
    console.log("Creating new post");
    await tx.wait();
    console.log("New post created");

    console.log("Sending new comment");
    tx = await contractInstance.addComment(address, 1, "Hello world comment", Date.now());
    console.log("Creating new comment");
    await tx.wait();
    console.log("New comment created");

    console.log("Sending new like");
    tx = await contractInstance.toggleLike(address, 1);
    console.log("Creating new like");
    await tx.wait();
    console.log("New like created");

    console.log("Sending new user info");
    tx = await contractInstance.updateUserinfo(address, "Updated user name", "https://fastly.picsum.photos/id/1051/200/300.jpg?hmac=l1jFNN1wGY2r8gVAipnoabHxa9LKBSoOTznSjOYWsUY");
    console.log("Creating new user info");
    await tx.wait();
    console.log("New user info created");
}

main();