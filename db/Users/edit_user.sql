UPDATE users
SET
username = ${username},
email = ${email},
profile_pic = ${profile_pic},
first_name = ${first_name},
last_name = ${last_name}
WHERE user_id = ${user_id}
RETURNING *;