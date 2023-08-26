DROP DATABASE IF EXISTS todolistdb;
CREATE DATABASE todolistdb;

USE todolistdb;

DROP TABLE IF EXISTS todo;

CREATE TABLE IF NOT EXISTS todo (
    id INTEGER NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    todo_description VARCHAR(255) NOT NULL,
    done TINYINT(1) NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO todo (title, todo_description, done) VALUES 
    ('title1', 'description1', 0),
    ('title2', 'description2', 1),
    ('title3', 'description3', 1);