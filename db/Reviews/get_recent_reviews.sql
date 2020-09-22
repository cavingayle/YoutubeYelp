SELECT *
FROM reviews r
JOIN channels c ON c.channel_id = r.channel_id
ORDER BY review_id DESC;


