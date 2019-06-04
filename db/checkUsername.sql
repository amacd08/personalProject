select * from User_login
join users on User_login.user_id = users.user_id
where  User_login.username = ${username}