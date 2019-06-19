update round_info
set total_score = ${total_score},
    total_fairways = ${total_fairways},
    total_gir = ${total_gir},
    total_lostball = ${total_lostball},
    over_par = ${over_par},
    par = ${par},
    under_par = ${under_par}
where round_id = ${round_id}
    