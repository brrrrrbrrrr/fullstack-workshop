DROP DATABASE IF EXISTS book;

CREATE DATABASE book;

USE book;

CREATE TABLE author (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE media (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    isbn INT NOT NULL,
    shelf INT NOT NULL,
    price INT NOT NULL,
    dateOfPublication DATE NOT NULL,
    editorId INT NOT NULL,
    typeId INT NOT NULL,
    sectorId INT NOT NULL,
    languageId INT NOT NULL,
    genreId INT NOT NULL,
    loanId INT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE user (
    id INT NOT NULL AUTO_INCREMENT,
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    age DATE NOT NULL,
    role INT NOT NULL,
    phone VARCHAR(100),
    password VARCHAR(250) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE reservation (
    id INT NOT NULL AUTO_INCREMENT,
    dateStart DATE NOT NULL,
    dateEnd DATE NOT NULL,
    userId INT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE loan (
    id INT NOT NULL AUTO_INCREMENT,
    dateStart DATE NOT NULL,
    dateEnd DATE NOT NULL,
    userId INT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE genre (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE language (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE sector (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE type (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE editor (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE author_media (
    id INT NOT NULL AUTO_INCREMENT,
    authorId INT NULL,
    mediaId INT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE reservation_media (
    id INT NOT NULL AUTO_INCREMENT,
    reservationId INT NULL,
    mediaId INT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE user_role (
    id INT NOT NULL AUTO_INCREMENT,
    userId INT NULL,
    roleId INT NULL,
    PRIMARY KEY (id)
);

-- ALTER TABLE loan
-- ADD FOREIGN KEY (userId) REFERENCES user(id);

-- ALTER TABLE media
-- ADD FOREIGN KEY (loanId) REFERENCES loan(id),
-- ADD FOREIGN KEY (typeId) REFERENCES type(id),
-- ADD FOREIGN KEY (sectorId) REFERENCES sector(id),
-- ADD FOREIGN KEY (languageId) REFERENCES language(id),
-- ADD FOREIGN KEY (genreId) REFERENCES genre(id),
-- ADD FOREIGN KEY (editorId) REFERENCES editor(id);

-- ALTER TABLE author_media
-- ADD FOREIGN KEY (authorId) REFERENCES author(id),
-- ADD FOREIGN KEY (mediaId) REFERENCES media(id);

-- ALTER TABLE reservation_media
-- ADD FOREIGN KEY (reservationId) REFERENCES reservation(id),
-- ADD FOREIGN KEY (mediaId) REFERENCES media(id);

-- ALTER TABLE user_role 
-- ADD FOREIGN KEY (userId) REFERENCES user(id),
-- ADD FOREIGN KEY (roleId) REFERENCES role(id);



-- CREATE TABLE type (
--     id INT NOT NULL AUTO_INCREMENT,
--     user_id INT NOT NULL,
--     title VARCHAR(255) NOT NULL,
--     content TEXT NOT NULL,
--     published DATETIME NOT NULL DEFAULT NOW(),
--     PRIMARY KEY (id),
--     FOREIGN KEY (user_id) REFERENCES user(id)
-- );

-- CREATE TABLE comment (
--     id INT NOT NULL AUTO_INCREMENT,
--     article_id INT NOT NULL,
--     user_id INT NOT NULL,
--     content VARCHAR(144) NOT NULL,
--     published DATETIME NOT NULL DEFAULT NOW(),
--     PRIMARY KEY (id),
--     FOREIGN KEY (article_id) REFERENCES article(id),
--     FOREIGN KEY (user_id) REFERENCES user(id)
-- );