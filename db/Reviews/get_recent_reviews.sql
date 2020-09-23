SELECT *
FROM reviews r
FULL OUTER JOIN channels c ON r.channel_id = c.channel_id 
ORDER BY r.review_id DESC;


