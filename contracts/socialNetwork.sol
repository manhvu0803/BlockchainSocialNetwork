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

    mapping (address => mapping (uint => bool)) likes;

    event NewUser(User account);

    event NewPost(Post post);

    event NewComment(Comment comment);

    event LikeStatusChanged(User author, Post post, bool isLiked);

    event UserInfoChanged(User author);

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

    modifier requirePost(uint postId) {
        require(postId <= postCount);
        _;
    }

    function registerNewUser(address userAddress, string memory username, string memory avatarUrl) public requireNonEmpty(username) requireNewUser(userAddress) {
        User memory user = User(userAddress, username, avatarUrl);
        users[userAddress] = user;
        emit NewUser(user);
    }

    function createNewPost(address authorAddress, string memory content, uint timestamp) public requireAccount(authorAddress) {
        postCount++;
        Post memory post = Post(postCount, content, timestamp, authorAddress);
        posts[postCount] = post;
        emit NewPost(post);
    }

    function addComment(address authorAddress, uint postId, string memory content, uint timestamp) public requireAccount(authorAddress) {
        commentCount++;
        Comment memory comment = Comment(commentCount, postId, content, timestamp, authorAddress);
        comments[commentCount] = comment;
        emit NewComment(comment);
    }

    function toggleLike(address authorAddress, uint postId) public requireAccount(authorAddress) requirePost(postId) {
        likes[authorAddress][postId] = !likes[authorAddress][postId];
        emit LikeStatusChanged(users[authorAddress], posts[postId], likes[authorAddress][postId]);
    }

    function updateUserinfo(address userAddress, string memory username, string memory avatarUrl) public requireAccount(userAddress) {
        User storage user = users[userAddress];
        user.username = username;
        user.avatarUrl = avatarUrl;
        emit UserInfoChanged(user);
    }
}