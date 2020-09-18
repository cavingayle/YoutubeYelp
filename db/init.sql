CREATE TABLE users(
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    profile_pic TEXT
);

CREATE TABLE genres(
    genre_id SERIAL PRIMARY KEY,
    topic_id TEXT,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE channels(
    channel_id SERIAL PRIMARY KEY,
    youtube_id TEXT,
    genre_id INT REFERENCES genre(genre_id)
);

CREATE TABLE reviews(
    review_id SERIAL PRIMARY KEY,
    title VARCHAR(100),
    review TEXT,
    channel_id INT REFERENCES channel(channel_id),
    rating INT NOT NULL,
    user_id INT REFERENCES user(user_id)
);