require("dotenv").config();
const contract = require("../artifacts/contracts/socialNetwork.sol/SocialNetwork.json");

const API_KEY = process.env.API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

// provider - Alchemy
const provider = new ethers.providers.InfuraProvider(network = "sepolia", API_KEY);

// signer - you
const signer = new ethers.Wallet(PRIVATE_KEY, provider);

// contract instance
const contractInstance = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, signer);

const GAS_LIMIT = 15000

async function main() {
    console.log("Get user");
    let user = await contractInstance.users("0xfb809c4cf09BF87283BF1cAd1002077E85715e2f");
    console.log("User: " + user);

    console.log("Get post")
    let post = await contractInstance.posts(1);
    console.log("Post: " + post);
}

main();