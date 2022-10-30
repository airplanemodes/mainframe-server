CREATE DATABASE mainframe;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(16) UNIQUE,
    email VARCHAR(60) UNIQUE,
    passwd VARCHAR(255),
    entered DATE
);

SELECT * FROM users;

INSERT INTO users (username, email, passwd, entered)
VALUES ('duke', 'duke@nuke.com', 'admin', '2022-10-28');

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(60),
    post VARCHAR(65000),
    created DATE
);

INSERT INTO posts (title, post, created)
VALUES ('First entry', 'This is first Mainframe blog entry. It is created in the database shell for testing purposes.', '2022-10-28');

ALTER TABLE posts ADD author VARCHAR(16);
UPDATE posts SET author = 'duke' WHERE id = 1;

DELETE FROM users WHERE id > 1; 