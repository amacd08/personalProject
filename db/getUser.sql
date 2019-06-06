select user_login.user_id, user_login.username, users.firstname, users.lastname, users.city, users.state, users.favoritecourse, users.email from user_login
join users on user_login.user_id=users.user_id
where User_login.user_id=${user_id}