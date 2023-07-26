async function deploy() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    const token = await ethers.deployContract("SocialNetwork");

    console.log("Token address:", await token.getAddress());
}

deploy()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });