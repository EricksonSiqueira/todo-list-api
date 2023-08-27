DROP DATABASE IF EXISTS todolistdb;
CREATE DATABASE todolistdb;

USE todolistdb;

DROP TABLE IF EXISTS todos;

CREATE TABLE IF NOT EXISTS todos (
    id INTEGER NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    done TINYINT(1) DEFAULT 0,
    PRIMARY KEY (id)
);

INSERT INTO todos (title, description) VALUES 
    ('title1', 'description1'),
    ('title2', 'description2'),
    ('title3', 'description3');