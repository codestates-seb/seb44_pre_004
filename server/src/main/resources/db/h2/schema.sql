CREATE TABLE IF NOT EXISTS Member (
    memberId bigint NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
    email varchar(30) NOT NULL UNIQUE,
    password varchar(30) NOT NULL,
    username varchar(30) NOT NULL UNIQUE,
    imageUri varchar(200),
    aboutMe varchar(30),
    role varchar(30)
);