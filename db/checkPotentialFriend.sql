select * from pending_friends
where user_id = ${user_id} or friend_id = ${user_id} and user_id = ${friend_id} or friend_id = ${friend_id}