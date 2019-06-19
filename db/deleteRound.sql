delete from round_info
where round_id = ${round_id};

delete from scores 
where round_id = ${round_id};

delete from fairway
where round_id = ${round_id};

delete from gir
where round_id = ${round_id};

delete from lostBall
where round_id = ${round_id};