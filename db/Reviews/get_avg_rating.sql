SELECT AVG(rating)
FROM reviews r
FULL OUTER  JOIN channels c ON r.channel_id = c.channel_id
WHERE c.youtube_id = $1;