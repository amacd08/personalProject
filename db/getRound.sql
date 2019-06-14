select round_info.round_id, fairway.fairway, fairway.hole, gir.gir, scores.score , lostBall.lostball from round_info
join  fairway on fairway.round_id = round_info.round_id
join gir on gir.hole = fairway.hole and gir.round_id = round_info.round_id
join scores on scores.hole = fairway.hole and scores.round_id = round_info.round_id
join lostBall on lostball.hole = fairway.hole and lostBall.round_id =  round_info.round_id
where round_info.round_id = ${round_id}

