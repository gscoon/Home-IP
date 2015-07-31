CREATE TABLE `ip_table` (
  `entry_id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `device` varchar(45) DEFAULT NULL,
  `ip` varchar(45) DEFAULT NULL,
  `timestamp` datetime DEFAULT NULL
);
