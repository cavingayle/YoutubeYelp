SELECT * FROM reviews r
FULL OUTER JOIN channels c 
ON r.channel_id = c.channel_id
WHERE r.user_id = $1
ORDER BY review_id DESC; 