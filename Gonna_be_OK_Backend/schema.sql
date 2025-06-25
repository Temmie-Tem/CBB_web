CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(20) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    name VARCHAR(50),
    email VARCHAR(255),
    birth_date DATE
);


CREATE TABLE `posts` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`userId` INT(11) NOT NULL,
	`title` VARCHAR(255) NOT NULL COLLATE 'utf8mb4_general_ci',
	`content` TEXT NOT NULL COLLATE 'utf8mb4_general_ci',
	`createdAt` TIMESTAMP NULL DEFAULT current_timestamp(),
	`updatedAt` TIMESTAMP NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
	`viewCount` INT(11) NULL DEFAULT '0',
	`status` VARCHAR(20) NOT NULL DEFAULT '진행중' COMMENT '처리상태 (예: 진행중, 완료)' COLLATE 'utf8mb4_general_ci',
	PRIMARY KEY (`id`) USING BTREE,
	INDEX `userId` (`userId`) USING BTREE,
	CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON UPDATE RESTRICT ON DELETE CASCADE
)
COLLATE='utf8mb4_general_ci'
ENGINE=InnoDB
AUTO_INCREMENT=15
;


CREATE TABLE `comments` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`postId` INT(11) NOT NULL,
	`userId` INT(11) NOT NULL,
	`content` TEXT NOT NULL COLLATE 'utf8mb4_general_ci',
	`createdAt` TIMESTAMP NULL DEFAULT current_timestamp(),
	PRIMARY KEY (`id`) USING BTREE,
	INDEX `postId` (`postId`) USING BTREE,
	INDEX `userId` (`userId`) USING BTREE,
	CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`) ON UPDATE RESTRICT ON DELETE CASCADE,
	CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON UPDATE RESTRICT ON DELETE CASCADE
)
COLLATE='utf8mb4_general_ci'
ENGINE=InnoDB
AUTO_INCREMENT=4
;
