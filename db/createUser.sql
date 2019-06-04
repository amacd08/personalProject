insert into users (firstname, lastname, email, city, state, favoritecourse)
values (${firstname}, ${lastname}, ${email}, ${city}, ${state}, ${favoritecourse});

insert into User_login (username, password)
values (${username}, ${hash})
returning username, user_id;





