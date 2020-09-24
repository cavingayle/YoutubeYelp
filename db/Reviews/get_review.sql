SELECT * FROM reviews r
JOIN channels c ON c.channel_id = r.channel_id
WHERE c.youtube_id = $1;