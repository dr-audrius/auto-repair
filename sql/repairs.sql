SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


CREATE TABLE repairs (
    repair_id int(10) NOT NULL,
    car_id int(10) NOT NULL,
    repair_date varchar(255),
    repaired_part varchar(255),
    comments varchar(255),
    PRIMARY KEY (repair_id),
    FOREIGN KEY (car_id) REFERENCES cars(id),
    CHECK (repaired_part='brakes')
    -- CONSTRAINT CHK_repair CHECK (repaired_part='brakes')
    -- CONSTRAINT CHK_repair CHECK (repaired_part='brakes' AND comments='comment')
); 
