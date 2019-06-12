insert into round_info (user_id, course_id, tee, numOfHoles, goal)
values (${user_id}, ${course_id}, ${tee}, ${numOfHoles}, ${goal})
returning round_id;
