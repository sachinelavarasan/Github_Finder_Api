NodeRestful
Node js user authentication rest api using mysql and express js

Install Node JS and MySQL Software, create a database and exeucte the SQL query.

<code> CREATE DATABASE github_finder

CREATE TABLE `users` (
`id` int NOT NULL AUTO_INCREMENT,
`name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
`email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
`password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
`password_salt` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
`is_active` tinyint NOT NULL DEFAULT '0',
`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
`updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
PRIMARY KEY (`id`),
UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci; </code>

Go to terminal or command line.

Execute following commands to run this application.

Start Project

$ mkdir node js mysql auth rest api

$ cd mkdir node js mysql auth rest api

$ npm install

$ npm install express express-validator mysql body-parser jsonwebtoken bcryptjs cors --save

Open your browser

http://localhost:7000/api/register

##POST

http://localhost:7000/api/register

http://localhost:7000/api/login

##GET
http://localhost:7000/api/get-user
