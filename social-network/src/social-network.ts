import {
  LikeStatusChanged as LikeStatusChangedEvent,
  NewComment as NewCommentEvent,
  NewPost as NewPostEvent,
  NewUser as NewUserEvent,
  UserInfoChanged as UserInfoChangedEvent
} from "../generated/SocialNetwork/SocialNetwork";
import {
  Like,
  Comment,
  Post,
  User,
} from "../generated/schema";

export function handleLikeStatusChanged(event: LikeStatusChangedEvent): void {
  let id = `${event.params.author.userAddress}_${event.params.post.id}`;
  let entity = Like.load(id);

  if (!entity) {
    entity = new Like(id);
  }

  entity.author = event.params.author.userAddress;
  entity.post = event.params.post.id.toString();
  entity.isLiked = event.params.isLiked

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleNewComment(event: NewCommentEvent): void {
  let entity = new Comment(event.params.comment.id.toString());
  entity.post = event.params.comment.postId.toString();
  entity.content = event.params.comment.content
  entity.timestamp = event.params.comment.timestamp
  entity.author = event.params.comment.author

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleNewPost(event: NewPostEvent): void {
  let entity = new Post(event.params.post.id.toString());
  entity.content = event.params.post.content
  entity.timestamp = event.params.post.timestamp
  entity.author = event.params.post.author

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleNewUser(event: NewUserEvent): void {
  let entity = new User(event.params.account.userAddress);
  entity.username = event.params.account.username
  entity.avatarUrl = event.params.account.avatarUrl

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUserInfoChanged(event: UserInfoChangedEvent): void {
  let entity = User.load(event.params.author.userAddress);

  if (!entity) {
    entity = new User(event.params.author.userAddress);
  }

  entity.username = event.params.author.username
  entity.avatarUrl = event.params.author.avatarUrl

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
