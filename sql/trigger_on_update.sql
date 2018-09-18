DELIMITER $$
CREATE TRIGGER `repaired_part_check_on_update` BEFORE UPDATE ON `repairs`
FOR EACH ROW
BEGIN
    IF CHAR_LENGTH( NEW.repaired_part ) < 5 THEN
        SIGNAL SQLSTATE '12345'
            SET MESSAGE_TEXT = 'Text should be at least 5 symbols';
    END IF;
END$$   
DELIMITER ;