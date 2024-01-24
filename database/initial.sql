CREATE DATABASE mainframe;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(16) UNIQUE NOT NULL,
    email VARCHAR(60) UNIQUE NOT NULL,
    passwd VARCHAR(255) NOT NULL,
    points INT NOT NULL,
    entered VARCHAR(16) NOT NULL,
    moderator BOOLEAN NOT NULL
);

-- INSERT INTO users (username, email, passwd, points, entered)
-- VALUES ('duke', 'duke@nuke.com', 'admin', 0, '2022-10-28');

CREATE TABLE entries (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(60) NOT NULL,
    content VARCHAR(65536) NOT NULL,
    author VARCHAR(16) NOT NULL,
    node VARCHAR(32) NOT NULL,
    points INT NOT NULL,
    created VARCHAR(10) NOT NULL
);

CREATE TABLE replies (
    id BIGSERIAL PRIMARY KEY,
    body VARCHAR(255) NOT NULL,
    username VARCHAR(16) NOT NULL,
    authorid INT NOT NULL,
    parentid INT,
    entryid INT NOT NULL
);

CREATE TABLE credits (
    id BIGSERIAL PRIMARY KEY,
    entryid INT NOT NULL,
    userid INT NOT NULL
);

CREATE TABLE privates (
  id BIGSERIAL PRIMARY KEY,
  sender VARCHAR(16) NOT NULL,
  receiver VARCHAR(16) NOT NULL,
  subject VARCHAR(16),
  sender_del BOOLEAN,
  receiver_del BOOLEAN,
  sender_full_del BOOLEAN,
  receiver_full_del BOOLEAN,
  body VARCHAR(1024) NOT NULL
);