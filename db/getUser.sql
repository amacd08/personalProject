select user_login.user_id, user_login.username, users.firstname, users.lastname, users.city, users.state, users.favoritecourse from user_login
join users on user_login.user_id=users.user_id
where user_login.user_id = ${user_id}