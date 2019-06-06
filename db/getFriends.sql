select friends.user_id, friends.friend_id, users.firstname, users.lastname, users.email, users.city, users.state, users.favoritecourse from friends
join users on friends.friend_id = users.user_id
where friends.user_id = ${user_id}