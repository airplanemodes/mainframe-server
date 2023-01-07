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

SELECT * FROM users;

INSERT INTO users (username, email, passwd, points, entered)
VALUES ('duke', 'duke@nuke.com', 'admin', 0, '2022-10-28');

DELETE FROM users WHERE id > 1;

CREATE TABLE entries (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(60) NOT NULL,
    content VARCHAR(65536) NOT NULL,
    author VARCHAR(16) NOT NULL,
    node VARCHAR(32) NOT NULL,
    points INT NOT NULL,
    created VARCHAR(10) NOT NULL
);

INSERT INTO entries (title, content, author, node, points, created)
VALUES ('Second entry', 'Some work was done for user authentication system. Added password hashing function. Registered first user accounts and made first system logins.', 'duke', 'core', 0, '2022-11-01');

ALTER TABLE users ADD moderator BOOLEAN;
UPDATE users SET moderator = true WHERE id = 60;

ALTER TABLE users ADD points INT NOT NULL;
UPDATE users SET points = 0 WHERE id > 0;

CREATE TABLE replies (
    id BIGSERIAL PRIMARY KEY,
    body VARCHAR(255) NOT NULL,
    username VARCHAR(16) NOT NULL,
    authorid INT NOT NULL,
    parentid INT,
    entryid INT NOT NULL
);

INSERT INTO replies (body, username, authorid, entryid) VALUES ('Replies developing.', 'alice', '1', 15);
INSERT INTO replies (body, username, authorid, entryid) VALUES ('Interesting', 'alice', '1', 17);
INSERT INTO replies (body, username, authorid, entryid) VALUES ('Really interesting!', 'alice', '1', 17);

CREATE TABLE credits (
    id BIGSERIAL PRIMARY KEY,
    entryid INT NOT NULL,
    userid INT NOT NULL
);

INSERT INTO credits (entryid, userid) VALUES (19, 1);
INSERT INTO credits (entryid, userid) VALUES (17, 1);

CREATE TABLE privates (
  id BIGSERIAL PRIMARY KEY,
  sender VARCHAR(16) NOT NULL,
  receiver VARCHAR(16) NOT NULL,
  body VARCHAR(1024) NOT NULL
);

INSERT INTO privates (sender, receiver, body)
VALUES ('stella', 'alice', 'Lets get this party started');