INSERT INTO reviews
    (rating, review_title, review, channel_id, user_id)
VALUES
    ($1, $2, $3, $4, $5);