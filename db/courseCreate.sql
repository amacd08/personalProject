insert into courses (coursename, city, state, picture)
values (${coursename}, ${city}, ${state}, ${picture})
returning coursename, course_id;