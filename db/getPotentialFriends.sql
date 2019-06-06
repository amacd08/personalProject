select pending_friends.user_id, pending_friends.friend_id, users.firstname, users.lastname, users.email, users.city, users.state, users.favoritecourse from pending_friends
join users on pending_friends.user_id = users.user_id
where  pending_friends.friend_id = ${user_id}