USE `app`;
ALTER table `user` ADD INDEX `idx_user_1`(`entry_date`, `kana`);
ALTER table `user` ADD INDEX `idx_user_2`(`mail`, `password`);
ALTER table `department_role_member` ADD INDEX `idx_dept_r_m_1`(`user_id`, `belong`);

