insert into round_info (user_id, course_id, tee, numOfHoles, goal, roundComplete)
values (${user_id}, ${course_id}, ${tee}, ${numOfHoles}, ${goal}, ${roundComplete})
returning round_id;
