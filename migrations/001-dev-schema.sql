-- Up
CREATE TABLE User (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nickname VARCHAR(20) UNIQUE,
    email VARCHAR(255) NOT NULL,
    passwd VARCHAR(60) NOT NULL,
    uni_id INTEGER REFERENCES Uni(id),
    first_name VARCHAR(255),
    surnames VARCHAR(255),
    degree VARCHAR(255)
);
CREATE TABLE Post (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    author_id INTEGER REFERENCES User(id),
    category_id INTEGER REFERENCES Category(id),
    title VARCHAR(255),
    content TEXT
);
CREATE TABLE Comment (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    author_id INTEGER REFERENCES User(id),
    post_id INTEGER REFERENCES Post(id),
    content TEXT
);
CREATE TABLE Uni (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255) UNIQUE
);
CREATE TABLE Category (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255),
    uni_id INTEGER REFERENCES Uni(id)
);
INSERT INTO User (nickname, email, passwd, uni_id)
VALUES ("foo", "ex@email.com", "foo", 1);
INSERT INTO User (
        nickname,
        email,
        passwd,
        uni_id,
        first_name,
        surnames,
        degree
    )
VALUES (
        "bar",
        "ex@email.com",
        "foo",
        1,
        "juan",
        "andres lopez",
        "la calle"
    );
INSERT INTO Uni (name)
VALUES ("UPV");
INSERT INTO Post (author_id, category_id, title, content)
VALUES (1, 1, "cositas", "se vienen cositas");
INSERT INTO Category (name, uni_id)
VALUES ("trap", 1);
INSERT INTO Comment (author_id, post_id, content)
VALUES (2, 1, "ice");
-- Down
DROP TABLE User;
DROP TABLE Post;
DROP TABLE Comment;
DROP TABLE Uni;
DROP TABLE Category;