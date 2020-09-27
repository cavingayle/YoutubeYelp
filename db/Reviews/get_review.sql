SELECT * FROM reviews r
JOIN channels c ON c.channel_id = r.channel_id
JOIN users u ON u.user_id = r.user_id
WHERE c.youtube_id = $1;