SELECT *
FROM reviews r
FULL OUTER JOIN channels c ON r.channel_id = c.channel_id
WHERE c.channel_id = $1;