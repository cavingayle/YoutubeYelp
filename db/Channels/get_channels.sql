SELECT * FROM channels c
JOIN genres g ON g.genre_id = c.genre_id
WHERE c.genre_id = $1;