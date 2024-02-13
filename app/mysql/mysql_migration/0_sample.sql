USE `app`;
ALTER table `user` ADD INDEX `idx_user_1`(`entry_date`, `kana`);
ALTER table `user` ADD INDEX `idx_user_2`(`mail`, `password`);

CREATE TABLE `file_resized` (
    `file_id` VARCHAR(36) NOT NULL,
    `path` VARCHAR(1024) NOT NULL,
    PRIMARY KEY (`file_id`)
);
