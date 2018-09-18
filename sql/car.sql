SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


CREATE TABLE cars (
    id int(10) NOT NULL AUTO_INCREMENT,
    make varchar(255) NOT NULL,
    model varchar(255),
    country_registered varchar(255),
    plate_number varchar(255),
    PRIMARY KEY (ID)
); 
