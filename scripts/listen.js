require("dotenv").config();
const contract = require("../artifacts/contracts/socialNetwork.sol/SocialNetwork.json");

const API_KEY = process.env.API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const provider = new ethers.InfuraProvider(network = "sepolia", API_KEY);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);
const contractInstance = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, signer);

async function main() {
    let filters = {
        topic: [
            ethers.utils.id("NewUser(User)"),
        ]
    }

    contractInstance.on(filters, (event) => {
        console.log(event.args[0].username);
    })
}

main();