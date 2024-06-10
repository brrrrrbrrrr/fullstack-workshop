DROP DATABASE IF EXISTS wcs_cda_sql_1;

CREATE DATABASE wcs_cda_sql_1;

USE wcs_cda_sql_1;

CREATE TABLE user (
    id  INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL ,
    created DATETIME NOT NULL DEFAULT NOW(),
    PRIMARY KEY (id),
    UNIQUE (name)
);

CREATE TABLE article (
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    published DATETIME NOT NULL DEFAULT NOW(),
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE comment (
    id INT NOT NULL AUTO_INCREMENT,
    article_id INT NOT NULL,
    user_id INT NOT NULL,
    content VARCHAR(144) NOT NULL,
    published DATETIME NOT NULL DEFAULT NOW(),
    PRIMARY KEY (id),
    FOREIGN KEY (article_id) REFERENCES article(id),
    FOREIGN KEY (user_id) REFERENCES user(id)
);

INSERT INTO user (name)
VALUES ('Bob'), ('Julie'), ('Robert'), ('Martha');

INSERT INTO article (user_id, title, content)
VALUES
    (1, 'Les cornichons', 'trop bon !!!!'),
    (1, 'le poisson', 'pfffffffffffff'),
    (2, 'Cafés', 'Des petits producteurs');

INSERT INTO comment (article_id, user_id, content)
VALUES
    (1, 3, 'Trop bien !!!! '),
    (1, 1, 'Merci :)'),
    (1, 4, 'Pas d accord ....'),
    (1, 1, 'Jalouse !!!!');
