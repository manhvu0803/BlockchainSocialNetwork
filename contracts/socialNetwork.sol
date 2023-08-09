// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.19;

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

    struct Comment {
        uint id;
        uint postId;
        string content;
        uint timestamp;
        address author;
    }

    uint postCount;

    uint commentCount;

    mapping (address => User) public users;

    mapping (uint => Post) public posts;

    mapping (uint => Comment) public comments;

    event NewUser(User account);

    event NewPost(Post post);

    event NewComment(Comment comment);

    constructor() {
        postCount = 0;
    }

    modifier requireNonEmpty(string memory str) {
        require(bytes(str).length > 0);
        _;
    }

    modifier requireNewUser(address userAddress) {
        require(bytes(users[userAddress].username).length <= 0);
        _;
    }

    modifier requireAccount(address userAddress) {
        require(bytes(users[userAddress].username).length > 0);
        _;
    }

    function registerNewUser(address userAddress, string memory username, string memory avatarUrl) public requireNonEmpty(username) requireNewUser(userAddress) {
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

    function addComment(address author, uint postId, string memory content, uint timestamp) public requireAccount(author) {
        commentCount++;
        Comment memory comment = Comment(commentCount, postId, content, timestamp, author);
        comments[commentCount] = comment;
        emit NewComment(comment);
    }
}