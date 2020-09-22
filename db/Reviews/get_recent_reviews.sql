SELECT *
FROM reviews r
FULL OUTER JOIN channels c ON c.channel_id = r.channel_id
ORDER BY review_id DESC;


