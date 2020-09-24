UPDATE reviews 
SET rating = $1
WHERE channel_id = $2;

RETURNING *;



