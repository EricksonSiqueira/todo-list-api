DROP DATABASE IF EXISTS todolistdb;
CREATE DATABASE todolistdb;

USE todolistdb;

DROP TABLE IF EXISTS todos;

CREATE TABLE IF NOT EXISTS todos (
    id INTEGER NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    done TINYINT(1) NOT NULL DEFAULT 0,
    PRIMARY KEY (id)
);

INSERT INTO todos (title, description, done) VALUES 
    ('title1', 'description1', 0),
    ('title2', 'description2', 1),
    ('title3', 'description3', 1);