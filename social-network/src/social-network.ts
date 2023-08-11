import {
  NewPost as NewPostEvent,
  NewUser as NewUserEvent
} from "../generated/SocialNetwork/SocialNetwork"
import { NewPost, NewUser } from "../generated/schema"

export function handleNewPost(event: NewPostEvent): void {
  let entity = new NewPost(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.post_id = event.params.post.id
  entity.post_content = event.params.post.content
  entity.post_timestamp = event.params.post.timestamp
  entity.post_author = event.params.post.author

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleNewUser(event: NewUserEvent): void {
  let entity = new NewUser(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.account_userAddress = event.params.account.userAddress
  entity.account_username = event.params.account.username
  entity.account_avatarUrl = event.params.account.avatarUrl

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
