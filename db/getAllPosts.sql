select * from posts
where user_id in (
    select friend_id from friends
    where user_id = ${user_id}
)