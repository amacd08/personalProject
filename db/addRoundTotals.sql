update round_info
set total_score = ${total_score},
    total_fairways = ${total_fairways},
    total_gir = ${total_gir},
    total_lostball = ${total_lostball}
where round_id = ${round_id}
    