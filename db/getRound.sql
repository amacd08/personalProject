select round_info.round_id, lostball.hole, lostball.lostball, fairway.fairway, gir.gir, score.score from round_info 
join lostball on round_info.round_id=lostball.round_id
join fairway on round_info.round_id=fairway.round_id
join gir on round_info.round_id=gir.round_id
join score on round_info.round_id=score.round_id



