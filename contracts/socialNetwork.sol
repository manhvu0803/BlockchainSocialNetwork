// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.21;

contract SocialNetwork {
    struct User {
        address userAddress;
        string username;
        string avatarUrl;
    }

    struct Post {
        uint id;
        string content;
        uint timestamp;
        address author;
    }

    uint postCount;

    mapping (address => User) public users;

    mapping (uint => Post) public posts;

    event NewUser(User account);

    event NewPost(Post post);

    constructor() {
        postCount = 0;
    }

    modifier requireNonEmpty(string memory str) {
        require(bytes(str).length > 0);
        _;
    }

    modifier requireAccount(address author) {
        require(bytes(users[author].username).length > 0);
        _;
    }

    function registerNewUser(address userAddress, string memory username, string memory avatarUrl) public requireNonEmpty(username) {
        User memory user = User(userAddress, username, avatarUrl);
        users[userAddress] = user;
        emit NewUser(user);
    }

    function createNewPost(address author, string memory content, uint timestamp) public requireAccount(author) {
        postCount++;
        Post memory post = Post(postCount, content, timestamp, author);
        posts[postCount] = post;
        emit NewPost(post);
    }
}