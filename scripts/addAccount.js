require("dotenv").config();
const contract = require("../artifacts/contracts/socialNetwork.sol/SocialNetwork.json");

const API_KEY = process.env.API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const provider = new ethers.providers.InfuraProvider(network = "sepolia", API_KEY);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);
const contractInstance = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, signer);

async function main() {
    console.log("Sending new account");
    let tx = await contractInstance.registerNewUser("0xfb809c4cf09BF87283BF1cAd1002077E85715e2f", "testName", "https://fastly.picsum.photos/id/1051/200/300.jpg?hmac=l1jFNN1wGY2r8gVAipnoabHxa9LKBSoOTznSjOYWsUY");
    console.log("Creating new account");
    await tx.wait();
    console.log("New account created");

    console.log("Sending new post");
    tx = await contractInstance.createNewPost("0xfb809c4cf09BF87283BF1cAd1002077E85715e2f", "Hello world", Date.now());
    console.log("Creating new post");
    await tx.wait();
    console.log("New post created");
}

main();