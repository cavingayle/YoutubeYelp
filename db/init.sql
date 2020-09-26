CREATE TABLE users(
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    profile_pic TEXT
);

CREATE TABLE channels(
    channel_id SERIAL PRIMARY KEY,
    youtube_id VARCHAR(200),
    genre VARCHAR(100),
    channel_title VARCHAR(200),
    image VARCHAR(250)
);

CREATE TABLE reviews(
    review_id SERIAL PRIMARY KEY,
    review_title VARCHAR(100),
    review TEXT,
    channel_id INT REFERENCES channel(channel_id),
    rating INT NOT NULL,
    user_id INT REFERENCES users(user_id)
);