USE `app`;
ALTER table `user` ADD INDEX `idx_user_1`(`entry_date`, `kana`);
ALTER table `user` ADD INDEX `idx_user_2`(`mail`, `password`);
