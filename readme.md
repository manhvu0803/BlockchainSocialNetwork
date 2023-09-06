# Blockchain Social Network
A blockchain-based social network website using Ethereum and The Graph Protocol
# This repo
This is the backend of the website. It include the contract, database schema and deploy code
# Frontend repo
https://github.com/KhuongNguyen611/blockchain-social-network
# Website
https://blockchain-social-network.vercel.app/
# Contract address
https://sepolia.etherscan.io/address/0x9e0a242268569d04ce1fd638ad7af2dd61ad75a8
# Report
https://docs.google.com/document/d/1hWNOrmsXZZxubt4eu8lrphcnw3hvYtueDfT7AMudWPA/edit?usp=sharing
# Deploying contract
## Environment
Require an .env file with
- **GATEWAY**: the host URL of the provider. For example: sepolia.infura.io/v3/
- **API_KEY**: API key of the provider
- **PRIVATE_KEY**: private key of the owner contract (require an amount of ether)
## Steps
1. Compile the contract file (.sol)
2. Run npx hardhat script/deploy.js --network sepolia
# Deployind Subgraph
1. Create a subgraph on [Subgraph Studio](https://thegraph.com/studio/)
2. Follow the step in https://thegraph.com/docs/en/deploying/deploying-a-subgraph-to-studio/