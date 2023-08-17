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
        User author;
    }

    struct Comment {
        uint id;
        uint postId;
        string content;
        uint timestamp;
        User author;
    }

    struct Like {
        uint postId;
        address authorAddress;
    }

    struct LikeData {
        bool isLiked;
        uint timestamp;
        Post post;
        User author;
    }

    uint postCount;

    uint commentCount;

    mapping (address => User) public users;

    mapping (uint => Post) public posts;

    mapping (uint => Comment) public comments;

    mapping (string => LikeData) public likes;

    event NewUser(User account);

    event NewPost(Post post);

    event NewComment(Comment comment);

    event LikeStatusChange(Like like);

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
    }

    function registerNewUser(address userAddress, string memory username, string memory avatarUrl) public requireNonEmpty(username) requireNewUser(userAddress) {
        User memory user = User(userAddress, username, avatarUrl);
        users[userAddress] = user;
        emit NewUser(user);
    }

    function createNewPost(address authorAddress, string memory content, uint timestamp) public requireAccount(authorAddress) {
        postCount++;
        User memory author = users[authorAddress];
        Post memory post = Post(postCount, content, timestamp, author);
        posts[postCount] = post;
        emit NewPost(post);
    }

    function addComment(address authorAddress, uint postId, string memory content, uint timestamp) public requireAccount(authorAddress) {
        commentCount++;
        User memory author = users[authorAddress];
        Comment memory comment = Comment(commentCount, postId, content, timestamp, author);
        comments[commentCount] = comment;
        emit NewComment(comment);
    }

    function toggleLike(address authorAddress, uint postId, uint timestamp) public requireAccount(authorAddress) requirePost(postId) {
        Like memory like = Like(postId, authorAddress);
        LikeData memory oldLikeData = likes[like];
        LikeData memory likeData = LikeData(!oldLikeData.isLiked, timestamp, posts[postId], users[authorAddress]);
        likes[like] = likeData;
        emit LikeStatusChange(likeData);
    }
}