PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE favorites (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_uid TEXT NOT NULL,
    movie_id INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_uid, movie_id),
    FOREIGN KEY (user_uid) REFERENCES users(user_uid)
  );
INSERT INTO "favorites" VALUES(4,'UV-E2F3E978',139,'2026-03-21 16:17:15');
INSERT INTO "favorites" VALUES(5,'UV-E2F3E978',204,'2026-03-21 16:34:22');
INSERT INTO "favorites" VALUES(6,'UV-E2F3E978',210,'2026-03-22 15:55:31');
INSERT INTO "favorites" VALUES(19,'UV-E2F3E978',313,'2026-03-28 04:53:12');
INSERT INTO "favorites" VALUES(20,'UV-E2F3E978',202,'2026-03-28 04:53:23');
INSERT INTO "favorites" VALUES(21,'UV-E2F3E978',203,'2026-03-28 04:53:31');
CREATE TABLE interactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_uid TEXT NOT NULL,
    movie_id INTEGER NOT NULL,
    event_type TEXT NOT NULL CHECK(event_type IN ('view', 'click', 'search', 'rating', 'recommend_click', 'dwell')),
    event_value TEXT DEFAULT '',
    context_genre TEXT DEFAULT '',
    context_experience TEXT DEFAULT '',
    context_source TEXT DEFAULT '',
    duration_ms INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_uid) REFERENCES users(user_uid)
  );
INSERT INTO "interactions" VALUES(1,'UV-E2F3E978',39,'click','','Horror','intense','browse',0,'2026-03-08 11:02:53');
INSERT INTO "interactions" VALUES(2,'UV-E2F3E978',39,'view','','Horror','intense','detail_page',0,'2026-03-08 11:02:53');
INSERT INTO "interactions" VALUES(3,'UV-E2F3E978',54,'click','','Drama','intense','browse',0,'2026-03-08 11:03:23');
INSERT INTO "interactions" VALUES(4,'UV-E2F3E978',54,'view','','Drama','intense','detail_page',0,'2026-03-08 11:03:23');
INSERT INTO "interactions" VALUES(5,'UV-E2F3E978',45,'click','','Action','fun','browse',0,'2026-03-08 11:54:53');
INSERT INTO "interactions" VALUES(6,'UV-E2F3E978',45,'view','','Action','fun','detail_page',0,'2026-03-08 11:54:53');
INSERT INTO "interactions" VALUES(7,'UV-521649E9',42,'click','','Sci-Fi','fun','browse',0,'2026-03-09 10:11:02');
INSERT INTO "interactions" VALUES(8,'UV-521649E9',42,'view','','Sci-Fi','fun','detail_page',0,'2026-03-09 10:11:02');
INSERT INTO "interactions" VALUES(9,'UV-48944C32',26,'click','','Action','intense','browse',0,'2026-03-11 05:14:49');
INSERT INTO "interactions" VALUES(10,'UV-48944C32',26,'view','','Action','intense','detail_page',0,'2026-03-11 05:14:49');
INSERT INTO "interactions" VALUES(11,'UV-48944C32',26,'view','','Action','intense','detail_page',0,'2026-03-11 05:32:04');
INSERT INTO "interactions" VALUES(12,'UV-48944C32',26,'view','','Action','intense','detail_page',0,'2026-03-11 05:32:36');
INSERT INTO "interactions" VALUES(13,'UV-E2F3E978',42,'click','','Sci-Fi','fun','browse',0,'2026-03-11 07:57:33');
INSERT INTO "interactions" VALUES(14,'UV-E2F3E978',42,'view','','Sci-Fi','fun','detail_page',0,'2026-03-11 07:57:33');
INSERT INTO "interactions" VALUES(15,'UV-E2F3E978',45,'view','','Action','fun','detail_page',0,'2026-03-11 08:01:32');
INSERT INTO "interactions" VALUES(16,'UV-E2F3E978',9,'recommend_click','','Action','intense','recommendation',0,'2026-03-11 08:01:37');
INSERT INTO "interactions" VALUES(17,'UV-E2F3E978',9,'view','','Action','intense','detail_page',0,'2026-03-11 08:01:37');
INSERT INTO "interactions" VALUES(18,'UV-E2F3E978',45,'view','','Action','fun','detail_page',0,'2026-03-11 08:06:02');
INSERT INTO "interactions" VALUES(19,'UV-E2F3E978',54,'view','','Drama','intense','detail_page',0,'2026-03-11 08:06:09');
INSERT INTO "interactions" VALUES(20,'UV-E2F3E978',41,'click','','Sci-Fi','intense','browse',0,'2026-03-12 05:21:30');
INSERT INTO "interactions" VALUES(21,'UV-E2F3E978',41,'view','','Sci-Fi','intense','detail_page',0,'2026-03-12 05:21:30');
INSERT INTO "interactions" VALUES(22,'UV-E2F3E978',54,'view','','Drama','intense','detail_page',0,'2026-03-12 06:31:49');
INSERT INTO "interactions" VALUES(23,'UV-E2F3E978',9,'recommend_click','','Action','intense','recommendation',0,'2026-03-12 06:31:59');
INSERT INTO "interactions" VALUES(24,'UV-E2F3E978',9,'view','','Action','intense','detail_page',0,'2026-03-12 06:31:59');
INSERT INTO "interactions" VALUES(25,'UV-E2F3E978',48,'click','','Comedy','fun','browse',0,'2026-03-12 06:32:44');
INSERT INTO "interactions" VALUES(26,'UV-E2F3E978',48,'view','','Comedy','fun','detail_page',0,'2026-03-12 06:32:44');
INSERT INTO "interactions" VALUES(27,'UV-E2F3E978',4,'click','','Sci-Fi','intense','browse',0,'2026-03-12 07:22:06');
INSERT INTO "interactions" VALUES(28,'UV-E2F3E978',4,'view','','Sci-Fi','intense','detail_page',0,'2026-03-12 07:22:06');
INSERT INTO "interactions" VALUES(29,'UV-E2F3E978',7,'click','','Crime','intense','browse',0,'2026-03-12 07:22:11');
INSERT INTO "interactions" VALUES(30,'UV-E2F3E978',7,'view','','Crime','intense','detail_page',0,'2026-03-12 07:22:11');
INSERT INTO "interactions" VALUES(31,'UV-E2F3E978',45,'view','','Action','fun','detail_page',0,'2026-03-12 07:23:24');
INSERT INTO "interactions" VALUES(32,'UV-E2F3E978',39,'view','','Horror','intense','detail_page',0,'2026-03-12 07:23:35');
INSERT INTO "interactions" VALUES(33,'UV-E2F3E978',16,'click','','Sci-Fi','intense','browse',0,'2026-03-12 07:24:30');
INSERT INTO "interactions" VALUES(34,'UV-E2F3E978',16,'view','','Sci-Fi','intense','detail_page',0,'2026-03-12 07:24:31');
INSERT INTO "interactions" VALUES(35,'UV-E2F3E978',37,'click','','Crime','intense','browse',0,'2026-03-12 07:24:39');
INSERT INTO "interactions" VALUES(36,'UV-E2F3E978',37,'view','','Crime','intense','detail_page',0,'2026-03-12 07:24:39');
INSERT INTO "interactions" VALUES(37,'UV-E2F3E978',1,'click','','Sci-Fi','intense','browse',0,'2026-03-12 07:24:43');
INSERT INTO "interactions" VALUES(38,'UV-E2F3E978',1,'view','','Sci-Fi','intense','detail_page',0,'2026-03-12 07:24:43');
INSERT INTO "interactions" VALUES(39,'UV-E2F3E978',31,'click','','Crime','intense','browse',0,'2026-03-12 07:24:50');
INSERT INTO "interactions" VALUES(40,'UV-E2F3E978',31,'view','','Crime','intense','detail_page',0,'2026-03-12 07:24:50');
INSERT INTO "interactions" VALUES(41,'UV-E2F3E978',9,'click','','Action','intense','browse',0,'2026-03-12 07:25:01');
INSERT INTO "interactions" VALUES(42,'UV-E2F3E978',9,'view','','Action','intense','detail_page',0,'2026-03-12 07:25:01');
INSERT INTO "interactions" VALUES(43,'UV-E2F3E978',21,'click','','Drama','intense','browse',0,'2026-03-12 07:25:09');
INSERT INTO "interactions" VALUES(44,'UV-E2F3E978',21,'view','','Drama','intense','detail_page',0,'2026-03-12 07:25:09');
INSERT INTO "interactions" VALUES(45,'UV-E2F3E978',11,'click','','Sci-Fi','emotional','browse',0,'2026-03-12 07:25:15');
INSERT INTO "interactions" VALUES(46,'UV-E2F3E978',11,'view','','Sci-Fi','emotional','detail_page',0,'2026-03-12 07:25:15');
INSERT INTO "interactions" VALUES(47,'UV-E2F3E978',26,'click','','Action','intense','browse',0,'2026-03-12 07:25:25');
INSERT INTO "interactions" VALUES(48,'UV-E2F3E978',26,'view','','Action','intense','detail_page',0,'2026-03-12 07:25:25');
INSERT INTO "interactions" VALUES(49,'UV-E2F3E978',5,'click','','Drama','emotional','browse',0,'2026-03-12 07:25:40');
INSERT INTO "interactions" VALUES(50,'UV-E2F3E978',5,'view','','Drama','emotional','detail_page',0,'2026-03-12 07:25:40');
INSERT INTO "interactions" VALUES(51,'UV-E2F3E978',1,'click','','Sci-Fi','intense','browse',0,'2026-03-12 07:25:51');
INSERT INTO "interactions" VALUES(52,'UV-E2F3E978',1,'view','','Sci-Fi','intense','detail_page',0,'2026-03-12 07:25:51');
INSERT INTO "interactions" VALUES(53,'UV-E2F3E978',1,'view','','Sci-Fi','intense','detail_page',0,'2026-03-12 07:53:36');
INSERT INTO "interactions" VALUES(54,'UV-E2F3E978',1,'view','','Sci-Fi','intense','detail_page',0,'2026-03-12 07:53:36');
INSERT INTO "interactions" VALUES(55,'UV-E2F3E978',1,'view','','Sci-Fi','intense','detail_page',0,'2026-03-12 07:53:37');
INSERT INTO "interactions" VALUES(56,'UV-E2F3E978',1,'view','','Sci-Fi','intense','detail_page',0,'2026-03-12 07:53:37');
INSERT INTO "interactions" VALUES(57,'UV-48944C32',26,'click','','Action','intense','browse',0,'2026-03-13 16:58:54');
INSERT INTO "interactions" VALUES(58,'UV-48944C32',26,'view','','Action','intense','detail_page',0,'2026-03-13 16:58:54');
INSERT INTO "interactions" VALUES(59,'UV-48944C32',42,'click','','Sci-Fi','fun','browse',0,'2026-03-13 17:50:25');
INSERT INTO "interactions" VALUES(60,'UV-48944C32',42,'view','','Sci-Fi','fun','detail_page',0,'2026-03-13 17:50:25');
INSERT INTO "interactions" VALUES(61,'UV-48944C32',1,'view','','Sci-Fi','intense','detail_page',0,'2026-03-13 17:51:42');
INSERT INTO "interactions" VALUES(62,'UV-48944C32',54,'view','','Drama','intense','detail_page',0,'2026-03-13 17:52:12');
INSERT INTO "interactions" VALUES(63,'UV-48944C32',60,'view','','Crime','intense','detail_page',0,'2026-03-13 17:52:25');
INSERT INTO "interactions" VALUES(64,'UV-48944C32',5,'view','','Drama','emotional','detail_page',0,'2026-03-13 17:52:38');
INSERT INTO "interactions" VALUES(65,'test_user',45,'view','test','','','',0,'2026-03-14 17:23:02');
INSERT INTO "interactions" VALUES(66,'test_user2',45,'view','test','','','',0,'2026-03-14 17:23:19');
INSERT INTO "interactions" VALUES(67,'UV-E2F3E978',5,'rating','5','','','explicit_rating',0,'2026-03-15 08:09:32');
INSERT INTO "interactions" VALUES(68,'UV-E2F3E978',5,'rating','5','','','explicit_rating',0,'2026-03-15 08:09:33');
INSERT INTO "interactions" VALUES(69,'UV-E2F3E978',5,'rating','5','','','explicit_rating',0,'2026-03-15 08:09:34');
INSERT INTO "interactions" VALUES(70,'UV-E2F3E978',5,'rating','1','','','explicit_rating',0,'2026-03-15 08:09:35');
INSERT INTO "interactions" VALUES(71,'UV-E2F3E978',5,'rating','2','','','explicit_rating',0,'2026-03-15 08:09:35');
INSERT INTO "interactions" VALUES(72,'UV-E2F3E978',5,'rating','2','','','explicit_rating',0,'2026-03-15 08:09:36');
INSERT INTO "interactions" VALUES(73,'UV-E2F3E978',5,'rating','5','','','explicit_rating',0,'2026-03-15 08:09:36');
INSERT INTO "interactions" VALUES(74,'UV-E2F3E978',5,'rating','5','','','explicit_rating',0,'2026-03-15 08:09:36');
INSERT INTO "interactions" VALUES(75,'UV-E2F3E978',5,'rating','5','','','explicit_rating',0,'2026-03-15 08:09:37');
INSERT INTO "interactions" VALUES(76,'UV-E2F3E978',5,'rating','5','','','explicit_rating',0,'2026-03-15 08:09:42');
INSERT INTO "interactions" VALUES(77,'UV-E2F3E978',5,'rating','5','','','explicit_rating',0,'2026-03-15 08:09:42');
INSERT INTO "interactions" VALUES(78,'UV-E2F3E978',5,'rating','5','','','explicit_rating',0,'2026-03-15 08:09:43');
INSERT INTO "interactions" VALUES(79,'UV-E2F3E978',5,'rating','5','','','explicit_rating',0,'2026-03-15 08:09:43');
INSERT INTO "interactions" VALUES(80,'UV-E2F3E978',5,'rating','5','','','explicit_rating',0,'2026-03-15 08:09:43');
INSERT INTO "interactions" VALUES(81,'UV-E2F3E978',5,'rating','5','','','explicit_rating',0,'2026-03-15 08:09:55');
INSERT INTO "interactions" VALUES(82,'UV-48944C32',1,'rating','5','','','explicit_rating',0,'2026-03-17 16:27:41');
INSERT INTO "interactions" VALUES(83,'UV-48944C32',26,'view','','Action','intense','detail_page',0,'2026-03-21 07:08:31');
INSERT INTO "interactions" VALUES(84,'UV-3D95E43F',1,'rating','5','','','explicit_rating',0,'2026-03-21 07:52:08');
INSERT INTO "interactions" VALUES(85,'test_user_789',101,'click','','Action','','',0,'2026-03-25 08:29:35');
INSERT INTO "interactions" VALUES(86,'test_user_789',101,'click','','Action','','',0,'2026-03-25 08:30:10');
INSERT INTO "interactions" VALUES(87,'test_user_789',101,'click','','Action','','',0,'2026-03-25 08:30:37');
INSERT INTO "interactions" VALUES(88,'test_user_789',101,'click','','Action','','',0,'2026-03-25 08:37:49');
INSERT INTO "interactions" VALUES(89,'test_user_789',101,'click','','Action','','',0,'2026-03-25 08:38:17');
INSERT INTO "interactions" VALUES(90,'test_user_789',101,'click','','Action','','',0,'2026-03-25 08:38:57');
INSERT INTO "interactions" VALUES(91,'test_user_789',101,'click','','Action','','',0,'2026-03-25 08:39:30');
INSERT INTO "interactions" VALUES(92,'test_user_789',101,'click','','Action','','',0,'2026-03-25 08:55:13');
INSERT INTO "interactions" VALUES(93,'test_user_789',101,'click','','Action','','',0,'2026-03-25 08:58:53');
INSERT INTO "interactions" VALUES(94,'test_user_789',101,'click','','Action','','',0,'2026-03-25 08:59:18');
INSERT INTO "interactions" VALUES(95,'test_user_789',101,'click','','Action','','',0,'2026-03-25 09:00:35');
INSERT INTO "interactions" VALUES(96,'test_user_789',101,'click','','Action','','',0,'2026-03-25 09:01:12');
INSERT INTO "interactions" VALUES(97,'test_user_789',101,'click','','Action','','',0,'2026-03-25 09:01:54');
INSERT INTO "interactions" VALUES(98,'test_user_789',101,'click','','Action','','',0,'2026-03-25 09:02:29');
INSERT INTO "interactions" VALUES(99,'test_user_789',101,'click','','Action','','',0,'2026-03-25 09:03:23');
INSERT INTO "interactions" VALUES(100,'test_user_789',101,'click','','Action','','',0,'2026-03-25 09:04:31');
INSERT INTO "interactions" VALUES(101,'test_user_789',101,'click','','Action','','',0,'2026-03-25 09:08:58');
INSERT INTO "interactions" VALUES(102,'test_user_123',202,'click','test_value_native_fetch','Action','intense','native_fetch_script',0,'2026-03-25 18:11:25');
INSERT INTO "interactions" VALUES(103,'UV-E2F3E978',204,'view','','Action','intense','detail_page',0,'2026-03-25 18:17:48');
INSERT INTO "interactions" VALUES(104,'UV-E2F3E978',4,'recommend_click','','Action','intense','recommendation',0,'2026-03-25 18:24:30');
INSERT INTO "interactions" VALUES(105,'UV-E2F3E978',4,'view','','Action','intense','detail_page',0,'2026-03-25 18:24:30');
INSERT INTO "interactions" VALUES(106,'UV-E2F3E978',37,'recommend_click','','Animation','fun','recommendation',0,'2026-03-25 18:24:50');
INSERT INTO "interactions" VALUES(107,'UV-E2F3E978',37,'view','','Animation','fun','detail_page',0,'2026-03-25 18:24:50');
INSERT INTO "interactions" VALUES(108,'UV-8DBE108A',259,'recommend_click','','Drama','thought-provoking','recommendation',0,'2026-03-25 18:36:37');
INSERT INTO "interactions" VALUES(109,'UV-8DBE108A',259,'view','','Drama','thought-provoking','detail_page',0,'2026-03-25 18:36:37');
INSERT INTO "interactions" VALUES(110,'UV-E2F3E978',261,'click','','Action','intense','browse',0,'2026-03-25 18:41:43');
INSERT INTO "interactions" VALUES(111,'UV-E2F3E978',261,'view','','Action','intense','detail_page',0,'2026-03-25 18:41:43');
INSERT INTO "interactions" VALUES(112,'UV-E2F3E978',41,'recommend_click','','Action','fun','recommendation',0,'2026-03-25 18:43:36');
INSERT INTO "interactions" VALUES(113,'UV-E2F3E978',41,'view','','Action','fun','detail_page',0,'2026-03-25 18:43:36');
INSERT INTO "interactions" VALUES(114,'UV-E2F3E978',250,'click','','Animation','fun','browse',0,'2026-03-25 18:44:08');
INSERT INTO "interactions" VALUES(115,'UV-E2F3E978',250,'view','','Animation','fun','detail_page',0,'2026-03-25 18:44:08');
INSERT INTO "interactions" VALUES(116,'UV-E2F3E978',1,'click','','Action','intense','browse',0,'2026-03-25 18:46:06');
INSERT INTO "interactions" VALUES(117,'UV-E2F3E978',1,'view','','Action','intense','detail_page',0,'2026-03-25 18:46:06');
INSERT INTO "interactions" VALUES(118,'UV-E2F3E978',61,'recommend_click','','Action','intense','recommendation',0,'2026-03-25 18:46:32');
INSERT INTO "interactions" VALUES(119,'UV-E2F3E978',61,'view','','Action','intense','detail_page',0,'2026-03-25 18:46:32');
INSERT INTO "interactions" VALUES(120,'UV-E2F3E978',1,'view','','Action','intense','detail_page',0,'2026-03-25 18:46:49');
INSERT INTO "interactions" VALUES(121,'UV-8DBE108A',10,'click','','Action','intense','browse',0,'2026-03-25 18:54:30');
INSERT INTO "interactions" VALUES(122,'UV-8DBE108A',10,'view','','Action','intense','detail_page',0,'2026-03-25 18:54:30');
INSERT INTO "interactions" VALUES(123,'UV-E2F3E978',1,'view','','Action','intense','detail_page',0,'2026-03-25 18:59:15');
INSERT INTO "interactions" VALUES(124,'UV-8DBE108A',1,'click','','Action','intense','browse',0,'2026-03-25 19:02:19');
INSERT INTO "interactions" VALUES(125,'UV-8DBE108A',1,'view','','Action','intense','detail_page',0,'2026-03-25 19:02:19');
INSERT INTO "interactions" VALUES(126,'UV-E2F3E978',1,'view','','Action','intense','detail_page',0,'2026-03-25 19:03:16');
INSERT INTO "interactions" VALUES(127,'UV-8DBE108A',1,'click','','Action','intense','browse',0,'2026-03-25 19:05:53');
INSERT INTO "interactions" VALUES(128,'UV-8DBE108A',1,'view','','Action','intense','detail_page',0,'2026-03-25 19:05:53');
INSERT INTO "interactions" VALUES(129,'UV-8DBE108A',261,'click','','Action','intense','browse',0,'2026-03-25 19:06:31');
INSERT INTO "interactions" VALUES(130,'UV-8DBE108A',261,'view','','Action','intense','detail_page',0,'2026-03-25 19:06:31');
INSERT INTO "interactions" VALUES(131,'UV-8DBE108A',268,'recommend_click','','Action','intense','recommendation',0,'2026-03-25 19:06:51');
INSERT INTO "interactions" VALUES(132,'UV-8DBE108A',268,'view','','Action','intense','detail_page',0,'2026-03-25 19:06:51');
INSERT INTO "interactions" VALUES(133,'UV-E2F3E978',1,'view','','Action','intense','detail_page',0,'2026-03-25 19:07:55');
INSERT INTO "interactions" VALUES(134,'UV-E2F3E978',1,'view','','Action','intense','detail_page',0,'2026-03-25 19:07:55');
INSERT INTO "interactions" VALUES(135,'UV-E2F3E978',24,'click','','Drama','intense','browse',0,'2026-03-25 19:08:25');
INSERT INTO "interactions" VALUES(136,'UV-E2F3E978',24,'view','','Drama','intense','detail_page',0,'2026-03-25 19:08:25');
INSERT INTO "interactions" VALUES(137,'UV-8DBE108A',1,'click','','Action','intense','browse',0,'2026-03-25 19:12:23');
INSERT INTO "interactions" VALUES(138,'UV-8DBE108A',1,'view','','Action','intense','detail_page',0,'2026-03-25 19:12:23');
INSERT INTO "interactions" VALUES(139,'UV-E2F3E978',259,'view','','Drama','thought-provoking','detail_page',0,'2026-03-25 19:13:51');
INSERT INTO "interactions" VALUES(140,'UV-8DBE108A',1,'click','','Action','intense','browse',0,'2026-03-25 19:16:25');
INSERT INTO "interactions" VALUES(141,'UV-8DBE108A',1,'view','','Action','intense','detail_page',0,'2026-03-25 19:16:25');
INSERT INTO "interactions" VALUES(142,'UV-8DBE108A',1,'view','','Action','intense','detail_page',0,'2026-03-25 19:17:57');
INSERT INTO "interactions" VALUES(143,'UV-8DBE108A',10,'view','','Action','intense','detail_page',0,'2026-03-25 19:18:30');
INSERT INTO "interactions" VALUES(144,'UV-E2F3E978',508,'click','','Horror','intense','browse',0,'2026-03-25 19:19:00');
INSERT INTO "interactions" VALUES(145,'UV-E2F3E978',508,'view','','Horror','intense','detail_page',0,'2026-03-25 19:19:00');
INSERT INTO "interactions" VALUES(146,'UV-8DBE108A',254,'view','','Adventure','emotional','detail_page',0,'2026-03-25 19:22:27');
INSERT INTO "interactions" VALUES(147,'UV-8DBE108A',254,'view','','Adventure','emotional','detail_page',0,'2026-03-25 19:23:16');
INSERT INTO "interactions" VALUES(148,'UV-8DBE108A',248,'view','','Animation','fun','detail_page',0,'2026-03-25 19:24:21');
INSERT INTO "interactions" VALUES(149,'UV-8DBE108A',254,'view','','Adventure','emotional','detail_page',0,'2026-03-25 19:25:14');
INSERT INTO "interactions" VALUES(150,'UV-8DBE108A',10,'view','','Action','intense','detail_page',0,'2026-03-25 19:25:30');
INSERT INTO "interactions" VALUES(151,'UV-8DBE108A',248,'view','','Animation','fun','detail_page',0,'2026-03-25 19:26:20');
INSERT INTO "interactions" VALUES(152,'UV-8DBE108A',1,'view','','Action','intense','detail_page',0,'2026-03-25 19:26:35');
INSERT INTO "interactions" VALUES(153,'UV-8DBE108A',248,'view','','Animation','fun','detail_page',0,'2026-03-25 19:27:40');
INSERT INTO "interactions" VALUES(154,'UV-8DBE108A',1,'click','','Action','intense','browse',0,'2026-03-25 19:32:13');
INSERT INTO "interactions" VALUES(155,'UV-8DBE108A',1,'view','','Action','intense','detail_page',0,'2026-03-25 19:32:13');
INSERT INTO "interactions" VALUES(156,'UV-8DBE108A',1,'view','','Action','intense','detail_page',0,'2026-03-25 19:35:23');
INSERT INTO "interactions" VALUES(157,'UV-8DBE108A',1,'click','','Action','intense','browse',0,'2026-03-25 19:37:43');
INSERT INTO "interactions" VALUES(158,'UV-8DBE108A',1,'view','','Action','intense','detail_page',0,'2026-03-25 19:37:43');
INSERT INTO "interactions" VALUES(159,'UV-E2F3E978',11,'click','','Horror','intense','browse',0,'2026-03-25 19:38:53');
INSERT INTO "interactions" VALUES(160,'UV-E2F3E978',11,'view','','Horror','intense','detail_page',0,'2026-03-25 19:38:53');
INSERT INTO "interactions" VALUES(161,'UV-E2F3E978',122,'click','','Drama','thought-provoking','browse',0,'2026-03-26 03:12:27');
INSERT INTO "interactions" VALUES(162,'UV-E2F3E978',122,'view','','Drama','thought-provoking','detail_page',0,'2026-03-26 03:12:27');
INSERT INTO "interactions" VALUES(163,'UV-E2F3E978',122,'view','','Drama','thought-provoking','detail_page',0,'2026-03-26 03:16:31');
INSERT INTO "interactions" VALUES(164,'UV-E2F3E978',56,'click','','Crime','emotional','browse',0,'2026-03-26 03:17:16');
INSERT INTO "interactions" VALUES(165,'UV-E2F3E978',56,'view','','Crime','emotional','detail_page',0,'2026-03-26 03:17:16');
INSERT INTO "interactions" VALUES(166,'UV-E2F3E978',254,'click','','Adventure','emotional','browse',0,'2026-03-26 03:33:00');
INSERT INTO "interactions" VALUES(167,'UV-E2F3E978',254,'view','','Adventure','emotional','detail_page',0,'2026-03-26 03:33:00');
INSERT INTO "interactions" VALUES(168,'UV-E2F3E978',250,'view','','Animation','fun','detail_page',0,'2026-03-26 03:53:13');
INSERT INTO "interactions" VALUES(169,'UV-E2F3E978',121,'click','','Drama','emotional','browse',0,'2026-03-26 04:05:33');
INSERT INTO "interactions" VALUES(170,'UV-E2F3E978',121,'view','','Drama','emotional','detail_page',0,'2026-03-26 04:05:33');
INSERT INTO "interactions" VALUES(171,'UV-E2F3E978',258,'click','','Comedy','fun','browse',0,'2026-03-26 04:10:00');
INSERT INTO "interactions" VALUES(172,'UV-E2F3E978',258,'view','','Comedy','fun','detail_page',0,'2026-03-26 04:10:00');
INSERT INTO "interactions" VALUES(173,'UV-E2F3E978',258,'view','','Comedy','fun','detail_page',0,'2026-03-26 04:15:25');
INSERT INTO "interactions" VALUES(174,'UV-E2F3E978',258,'view','','Comedy','fun','detail_page',0,'2026-03-26 04:15:26');
INSERT INTO "interactions" VALUES(175,'UV-E2F3E978',1,'click','','Action','intense','browse',0,'2026-03-26 04:15:36');
INSERT INTO "interactions" VALUES(176,'UV-E2F3E978',1,'view','','Action','intense','detail_page',0,'2026-03-26 04:15:36');
INSERT INTO "interactions" VALUES(177,'UV-E2F3E978',204,'click','','Action','intense','browse',0,'2026-03-26 04:15:47');
INSERT INTO "interactions" VALUES(178,'UV-E2F3E978',204,'view','','Action','intense','detail_page',0,'2026-03-26 04:15:47');
INSERT INTO "interactions" VALUES(179,'UV-E2F3E978',259,'view','','Drama','thought-provoking','detail_page',0,'2026-03-26 04:24:01');
INSERT INTO "interactions" VALUES(180,'UV-E2F3E978',204,'click','','Action','intense','browse',0,'2026-03-26 04:45:11');
INSERT INTO "interactions" VALUES(181,'UV-E2F3E978',204,'view','','Action','intense','detail_page',0,'2026-03-26 04:45:11');
INSERT INTO "interactions" VALUES(182,'UV-E2F3E978',1,'click','','Action','intense','browse',0,'2026-03-26 07:01:50');
INSERT INTO "interactions" VALUES(183,'UV-E2F3E978',1,'view','','Action','intense','detail_page',0,'2026-03-26 07:01:50');
INSERT INTO "interactions" VALUES(184,'UV-E2F3E978',10,'click','','Action','intense','browse',0,'2026-03-26 07:02:19');
INSERT INTO "interactions" VALUES(185,'UV-E2F3E978',10,'view','','Action','intense','detail_page',0,'2026-03-26 07:02:19');
INSERT INTO "interactions" VALUES(186,'UV-E2F3E978',204,'view','','Action','intense','detail_page',0,'2026-03-26 07:04:12');
INSERT INTO "interactions" VALUES(187,'UV-E2F3E978',410,'click','','Action','intense','browse',0,'2026-03-27 08:10:35');
INSERT INTO "interactions" VALUES(188,'UV-E2F3E978',410,'view','','Action','intense','detail_page',0,'2026-03-27 08:10:35');
INSERT INTO "interactions" VALUES(189,'UV-E2F3E978',204,'click','','Action','intense','browse',0,'2026-03-27 08:22:08');
INSERT INTO "interactions" VALUES(190,'UV-E2F3E978',204,'view','','Action','intense','detail_page',0,'2026-03-27 08:22:08');
INSERT INTO "interactions" VALUES(191,'UV-E2F3E978',4,'recommend_click','','Action','intense','recommendation',0,'2026-03-27 08:22:15');
INSERT INTO "interactions" VALUES(192,'UV-E2F3E978',4,'view','','Action','intense','detail_page',0,'2026-03-27 08:22:15');
INSERT INTO "interactions" VALUES(193,'UV-E2F3E978',204,'view','','Action','intense','detail_page',0,'2026-03-27 08:22:18');
INSERT INTO "interactions" VALUES(194,'UV-E2F3E978',204,'click','','Action','intense','browse',0,'2026-03-27 08:40:35');
INSERT INTO "interactions" VALUES(195,'UV-E2F3E978',204,'view','','Action','intense','detail_page',0,'2026-03-27 08:40:35');
INSERT INTO "interactions" VALUES(196,'UV-E2F3E978',250,'view','','Animation','fun','detail_page',0,'2026-03-27 09:33:32');
INSERT INTO "interactions" VALUES(197,'UV-E2F3E978',37,'recommend_click','','Animation','fun','recommendation',0,'2026-03-27 09:33:47');
INSERT INTO "interactions" VALUES(198,'UV-E2F3E978',37,'view','','Animation','fun','detail_page',0,'2026-03-27 09:33:47');
INSERT INTO "interactions" VALUES(199,'UV-E2F3E978',204,'view','','Action','intense','detail_page',0,'2026-03-27 10:06:44');
INSERT INTO "interactions" VALUES(200,'UV-E2F3E978',410,'recommend_click','','Action','intense','recommendation',0,'2026-03-27 10:06:51');
INSERT INTO "interactions" VALUES(201,'UV-E2F3E978',410,'view','','Action','intense','detail_page',0,'2026-03-27 10:06:51');
INSERT INTO "interactions" VALUES(202,'UV-E2F3E978',221,'recommend_click','','Action','intense','recommendation',0,'2026-03-27 10:06:55');
INSERT INTO "interactions" VALUES(203,'UV-E2F3E978',221,'view','','Action','intense','detail_page',0,'2026-03-27 10:06:55');
INSERT INTO "interactions" VALUES(204,'UV-E2F3E978',221,'view','','Action','intense','detail_page',0,'2026-03-27 10:11:55');
INSERT INTO "interactions" VALUES(205,'UV-E2F3E978',261,'click','','Action','intense','browse',0,'2026-03-27 10:17:28');
INSERT INTO "interactions" VALUES(206,'UV-E2F3E978',261,'view','','Action','intense','detail_page',0,'2026-03-27 10:17:29');
INSERT INTO "interactions" VALUES(207,'UV-E2F3E978',250,'click','','Animation','fun','browse',0,'2026-03-27 10:42:38');
INSERT INTO "interactions" VALUES(208,'UV-E2F3E978',250,'view','','Animation','fun','detail_page',0,'2026-03-27 10:42:38');
INSERT INTO "interactions" VALUES(209,'UV-E2F3E978',410,'view','','Action','intense','detail_page',0,'2026-03-27 10:43:35');
INSERT INTO "interactions" VALUES(210,'UV-E2F3E978',313,'click','','Action','intense','browse',0,'2026-03-28 04:47:01');
INSERT INTO "interactions" VALUES(211,'UV-E2F3E978',313,'view','','Action','intense','detail_page',0,'2026-03-28 04:47:01');
INSERT INTO "interactions" VALUES(212,'UV-E2F3E978',313,'view','','Action','intense','detail_page',0,'2026-03-28 04:47:03');
INSERT INTO "interactions" VALUES(213,'UV-E2F3E978',313,'view','','Action','intense','detail_page',0,'2026-03-28 04:47:03');
INSERT INTO "interactions" VALUES(214,'UV-E2F3E978',313,'view','','Action','intense','detail_page',0,'2026-03-28 04:47:04');
INSERT INTO "interactions" VALUES(215,'UV-E2F3E978',313,'view','','Action','intense','detail_page',0,'2026-03-28 04:47:14');
INSERT INTO "interactions" VALUES(216,'UV-E2F3E978',313,'view','','Action','intense','detail_page',0,'2026-03-28 04:48:17');
INSERT INTO "interactions" VALUES(217,'UV-E2F3E978',313,'view','','Action','intense','detail_page',0,'2026-03-28 04:48:19');
INSERT INTO "interactions" VALUES(218,'UV-E2F3E978',313,'view','','Action','intense','detail_page',0,'2026-03-28 04:48:20');
INSERT INTO "interactions" VALUES(219,'UV-E2F3E978',313,'click','','Action','intense','browse',0,'2026-03-28 04:53:07');
INSERT INTO "interactions" VALUES(220,'UV-E2F3E978',313,'view','','Action','intense','detail_page',0,'2026-03-28 04:53:07');
INSERT INTO "interactions" VALUES(221,'UV-E2F3E978',202,'recommend_click','','Action','intense','recommendation',0,'2026-03-28 04:53:17');
INSERT INTO "interactions" VALUES(222,'UV-E2F3E978',202,'view','','Action','intense','detail_page',0,'2026-03-28 04:53:17');
INSERT INTO "interactions" VALUES(223,'UV-E2F3E978',203,'recommend_click','','Action','intense','recommendation',0,'2026-03-28 04:53:27');
INSERT INTO "interactions" VALUES(224,'UV-E2F3E978',203,'view','','Action','intense','detail_page',0,'2026-03-28 04:53:27');
INSERT INTO "interactions" VALUES(225,'UV-E2F3E978',261,'click','','Action','intense','browse',0,'2026-03-28 04:54:23');
INSERT INTO "interactions" VALUES(226,'UV-E2F3E978',261,'view','','Action','intense','detail_page',0,'2026-03-28 04:54:23');
INSERT INTO "interactions" VALUES(227,'UV-E2F3E978',261,'click','','Action','intense','browse',0,'2026-03-28 04:54:33');
INSERT INTO "interactions" VALUES(228,'UV-E2F3E978',261,'view','','Action','intense','detail_page',0,'2026-03-28 04:54:33');
INSERT INTO "interactions" VALUES(229,'UV-E2F3E978',259,'view','','Drama','thought-provoking','detail_page',0,'2026-03-28 07:41:53');
INSERT INTO "interactions" VALUES(230,'UV-E2F3E978',313,'recommend_click','','Action','intense','recommendation',0,'2026-03-28 07:42:04');
INSERT INTO "interactions" VALUES(231,'UV-E2F3E978',313,'view','','Action','intense','detail_page',0,'2026-03-28 07:42:04');
INSERT INTO "interactions" VALUES(232,'UV-E2F3E978',410,'recommend_click','','Action','intense','recommendation',0,'2026-03-28 07:42:32');
INSERT INTO "interactions" VALUES(233,'UV-E2F3E978',410,'view','','Action','intense','detail_page',0,'2026-03-28 07:42:32');
INSERT INTO "interactions" VALUES(234,'UV-E2F3E978',313,'view','','Action','intense','detail_page',0,'2026-03-28 07:42:37');
INSERT INTO "interactions" VALUES(235,'UV-E2F3E978',203,'recommend_click','','Action','intense','recommendation',0,'2026-03-28 07:42:40');
INSERT INTO "interactions" VALUES(236,'UV-E2F3E978',203,'view','','Action','intense','detail_page',0,'2026-03-28 07:42:40');
INSERT INTO "interactions" VALUES(237,'UV-E2F3E978',313,'view','','Action','intense','detail_page',0,'2026-03-28 08:08:05');
INSERT INTO "interactions" VALUES(238,'UV-E2F3E978',56,'click','','Crime','emotional','browse',0,'2026-03-28 08:08:22');
INSERT INTO "interactions" VALUES(239,'UV-E2F3E978',56,'view','','Crime','emotional','detail_page',0,'2026-03-28 08:08:22');
INSERT INTO "interactions" VALUES(240,'UV-E2F3E978',221,'recommend_click','','Action','intense','recommendation',0,'2026-03-28 08:08:31');
INSERT INTO "interactions" VALUES(241,'UV-E2F3E978',221,'view','','Action','intense','detail_page',0,'2026-03-28 08:08:31');
INSERT INTO "interactions" VALUES(242,'UV-E2F3E978',221,'view','','Action','intense','detail_page',0,'2026-03-28 08:18:41');
INSERT INTO "interactions" VALUES(243,'UV-E2F3E978',221,'view','','Action','intense','detail_page',0,'2026-03-28 08:18:42');
INSERT INTO "interactions" VALUES(244,'UV-E2F3E978',221,'view','','Action','intense','detail_page',0,'2026-03-28 08:18:43');
INSERT INTO "interactions" VALUES(245,'UV-E2F3E978',221,'view','','Action','intense','detail_page',0,'2026-03-28 08:22:02');
INSERT INTO "interactions" VALUES(246,'UV-E2F3E978',410,'recommend_click','','Action','intense','recommendation',0,'2026-03-28 08:22:08');
INSERT INTO "interactions" VALUES(247,'UV-E2F3E978',410,'view','','Action','intense','detail_page',0,'2026-03-28 08:22:08');
INSERT INTO "interactions" VALUES(248,'UV-E2F3E978',220,'recommend_click','','Crime','intense','recommendation',0,'2026-03-28 08:22:18');
INSERT INTO "interactions" VALUES(249,'UV-E2F3E978',220,'view','','Crime','intense','detail_page',0,'2026-03-28 08:22:18');
INSERT INTO "interactions" VALUES(250,'UV-E2F3E978',410,'view','','Action','intense','detail_page',0,'2026-03-28 08:22:20');
INSERT INTO "interactions" VALUES(251,'UV-E2F3E978',410,'view','','Action','intense','detail_page',0,'2026-03-28 10:12:22');
INSERT INTO "interactions" VALUES(252,'UV-E2F3E978',221,'recommend_click','','Action','intense','recommendation',0,'2026-03-28 10:12:25');
INSERT INTO "interactions" VALUES(253,'UV-E2F3E978',221,'view','','Action','intense','detail_page',0,'2026-03-28 10:12:25');
INSERT INTO "interactions" VALUES(254,'UV-E2F3E978',410,'view','','Action','intense','detail_page',0,'2026-03-28 10:12:30');
INSERT INTO "interactions" VALUES(255,'UV-E2F3E978',315,'click','','Action','fun','browse',0,'2026-03-28 10:13:13');
INSERT INTO "interactions" VALUES(256,'UV-E2F3E978',315,'view','','Action','fun','detail_page',0,'2026-03-28 10:13:13');
INSERT INTO "interactions" VALUES(257,'UV-8DBE108A',410,'click','','Action','intense','browse',0,'2026-03-28 10:19:16');
INSERT INTO "interactions" VALUES(258,'UV-8DBE108A',410,'view','','Action','intense','detail_page',0,'2026-03-28 10:19:16');
INSERT INTO "interactions" VALUES(259,'UV-8DBE108A',410,'click','','Action','intense','browse',0,'2026-03-28 10:20:56');
INSERT INTO "interactions" VALUES(260,'UV-8DBE108A',410,'view','','Action','intense','detail_page',0,'2026-03-28 10:20:56');
INSERT INTO "interactions" VALUES(261,'UV-E2F3E978',315,'view','','Action','fun','detail_page',0,'2026-03-28 10:34:17');
INSERT INTO "interactions" VALUES(262,'UV-E2F3E978',315,'view','','Action','fun','detail_page',0,'2026-03-28 10:34:54');
INSERT INTO "interactions" VALUES(263,'UV-E2F3E978',315,'view','','Action','fun','detail_page',0,'2026-03-28 10:34:56');
INSERT INTO "interactions" VALUES(264,'UV-E2F3E978',315,'view','','Action','fun','detail_page',0,'2026-03-28 10:40:34');
INSERT INTO "interactions" VALUES(265,'UV-E2F3E978',315,'view','','Action','fun','detail_page',0,'2026-03-28 10:42:00');
INSERT INTO "interactions" VALUES(266,'UV-E2F3E978',315,'view','','Action','fun','detail_page',0,'2026-03-28 10:42:00');
INSERT INTO "interactions" VALUES(267,'UV-E2F3E978',315,'view','','Action','fun','detail_page',0,'2026-03-28 10:42:01');
INSERT INTO "interactions" VALUES(268,'UV-E2F3E978',315,'view','','Action','fun','detail_page',0,'2026-03-28 10:42:02');
INSERT INTO "interactions" VALUES(269,'UV-E2F3E978',315,'view','','Action','fun','detail_page',0,'2026-03-28 10:42:02');
INSERT INTO "interactions" VALUES(270,'UV-E2F3E978',315,'view','','Action','fun','detail_page',0,'2026-03-28 10:42:02');
INSERT INTO "interactions" VALUES(271,'UV-E2F3E978',315,'view','','Action','fun','detail_page',0,'2026-03-28 10:42:03');
INSERT INTO "interactions" VALUES(272,'UV-E2F3E978',315,'view','','Action','fun','detail_page',0,'2026-03-28 10:42:03');
INSERT INTO "interactions" VALUES(273,'UV-E2F3E978',315,'view','','Action','fun','detail_page',0,'2026-03-28 10:43:39');
INSERT INTO "interactions" VALUES(274,'UV-E2F3E978',315,'view','','Action','fun','detail_page',0,'2026-03-28 10:43:39');
INSERT INTO "interactions" VALUES(275,'UV-E2F3E978',315,'view','','Action','fun','detail_page',0,'2026-03-28 10:43:40');
INSERT INTO "interactions" VALUES(276,'UV-E2F3E978',315,'view','','Action','fun','detail_page',0,'2026-03-28 10:43:40');
INSERT INTO "interactions" VALUES(277,'UV-E2F3E978',315,'view','','Action','fun','detail_page',0,'2026-03-28 10:43:41');
INSERT INTO "interactions" VALUES(278,'UV-E2F3E978',315,'view','','Action','fun','detail_page',0,'2026-03-28 10:43:41');
INSERT INTO "interactions" VALUES(279,'UV-E2F3E978',315,'view','','Action','fun','detail_page',0,'2026-03-28 10:45:10');
INSERT INTO "interactions" VALUES(280,'UV-E2F3E978',315,'view','','Action','fun','detail_page',0,'2026-03-28 10:45:15');
INSERT INTO "interactions" VALUES(281,'UV-E2F3E978',315,'view','','Action','fun','detail_page',0,'2026-03-28 10:45:15');
INSERT INTO "interactions" VALUES(282,'UV-E2F3E978',315,'view','','Action','fun','detail_page',0,'2026-03-28 10:45:16');
INSERT INTO "interactions" VALUES(283,'UV-E2F3E978',315,'view','','Action','fun','detail_page',0,'2026-03-28 10:45:16');
INSERT INTO "interactions" VALUES(284,'UV-E2F3E978',315,'view','','Action','fun','detail_page',0,'2026-03-28 10:45:17');
INSERT INTO "interactions" VALUES(285,'UV-E2F3E978',315,'view','','Action','fun','detail_page',0,'2026-03-28 10:47:03');
INSERT INTO "interactions" VALUES(286,'UV-E2F3E978',315,'view','','Action','fun','detail_page',0,'2026-03-28 10:48:38');
INSERT INTO "interactions" VALUES(287,'UV-E2F3E978',315,'click','','Action','fun','browse',0,'2026-03-28 10:49:01');
INSERT INTO "interactions" VALUES(288,'UV-E2F3E978',315,'view','','Action','fun','detail_page',0,'2026-03-28 10:49:01');
INSERT INTO "interactions" VALUES(289,'UV-E2F3E978',315,'view','','Action','fun','detail_page',0,'2026-03-28 10:52:37');
INSERT INTO "interactions" VALUES(290,'UV-E2F3E978',316,'click','','Action','intense','browse',0,'2026-03-28 10:52:56');
INSERT INTO "interactions" VALUES(291,'UV-E2F3E978',316,'view','','Action','intense','detail_page',0,'2026-03-28 10:52:56');
INSERT INTO "interactions" VALUES(292,'UV-E2F3E978',328,'click','','Action','intense','browse',0,'2026-03-28 10:53:04');
INSERT INTO "interactions" VALUES(293,'UV-E2F3E978',328,'view','','Action','intense','detail_page',0,'2026-03-28 10:53:04');
INSERT INTO "interactions" VALUES(294,'UV-E2F3E978',315,'view','','Action','fun','detail_page',0,'2026-03-28 10:53:07');
INSERT INTO "interactions" VALUES(295,'UV-E2F3E978',315,'view','','Action','fun','detail_page',0,'2026-03-28 10:54:45');
INSERT INTO "interactions" VALUES(296,'UV-E2F3E978',315,'view','','Action','fun','detail_page',0,'2026-03-28 10:54:46');
INSERT INTO "interactions" VALUES(297,'UV-E2F3E978',315,'view','','Action','fun','detail_page',0,'2026-03-28 10:54:47');
INSERT INTO "interactions" VALUES(298,'UV-E2F3E978',315,'view','','Action','fun','detail_page',0,'2026-03-28 10:54:47');
INSERT INTO "interactions" VALUES(299,'UV-E2F3E978',315,'view','','Action','fun','detail_page',0,'2026-03-28 10:54:48');
INSERT INTO "interactions" VALUES(300,'UV-E2F3E978',315,'view','','Action','fun','detail_page',0,'2026-03-28 10:54:48');
INSERT INTO "interactions" VALUES(301,'UV-E2F3E978',315,'view','','Action','fun','detail_page',0,'2026-03-28 16:53:09');
INSERT INTO "interactions" VALUES(302,'UV-E2F3E978',410,'recommend_click','','Action','intense','recommendation',0,'2026-03-28 16:53:15');
INSERT INTO "interactions" VALUES(303,'UV-E2F3E978',410,'view','','Action','intense','detail_page',0,'2026-03-28 16:53:15');
INSERT INTO "interactions" VALUES(304,'UV-E2F3E978',4,'recommend_click','','Action','intense','recommendation',0,'2026-03-28 16:53:21');
INSERT INTO "interactions" VALUES(305,'UV-E2F3E978',4,'view','','Action','intense','detail_page',0,'2026-03-28 16:53:21');
INSERT INTO "interactions" VALUES(306,'UV-E2F3E978',220,'recommend_click','','Crime','intense','recommendation',0,'2026-03-28 16:53:34');
INSERT INTO "interactions" VALUES(307,'UV-E2F3E978',220,'view','','Crime','intense','detail_page',0,'2026-03-28 16:53:34');
INSERT INTO "interactions" VALUES(308,'UV-E2F3E978',328,'view','','Action','intense','detail_page',0,'2026-03-28 16:53:44');
CREATE TABLE ratings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_uid TEXT NOT NULL,
    movie_id INTEGER NOT NULL,
    rating INTEGER NOT NULL CHECK(rating BETWEEN 1 AND 5),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_uid, movie_id),
    FOREIGN KEY (user_uid) REFERENCES users(user_uid)
  );
INSERT INTO "ratings" VALUES(1,'UV-E2F3E978',5,5,'2026-03-15 08:09:32','2026-03-15 08:09:55');
INSERT INTO "ratings" VALUES(16,'UV-48944C32',1,5,'2026-03-17 16:27:41','2026-03-17 16:27:41');
INSERT INTO "ratings" VALUES(17,'UV-3D95E43F',1,5,'2026-03-21 07:52:08','2026-03-21 07:52:08');
INSERT INTO "ratings" VALUES(18,'UV-E2F3E978',1,5,'2026-03-21 16:18:02','2026-03-21 16:18:02');
INSERT INTO "ratings" VALUES(19,'UV-E2F3E978',28,4,'2026-03-21 16:18:10','2026-03-21 16:18:10');
INSERT INTO "ratings" VALUES(20,'UV-E2F3E978',4,5,'2026-03-21 16:34:45','2026-03-21 16:34:45');
INSERT INTO "ratings" VALUES(21,'UV-E2F3E978',342,5,'2026-03-22 15:07:35','2026-03-22 15:07:35');
INSERT INTO "ratings" VALUES(22,'UV-E2F3E978',210,5,'2026-03-22 15:55:23','2026-03-22 15:55:23');
INSERT INTO "ratings" VALUES(23,'UV-E2F3E978',54,5,'2026-03-24 14:17:46','2026-03-24 14:17:46');
INSERT INTO "ratings" VALUES(40,'UV-8DBE108A',10,2,'2026-03-25 19:18:49','2026-03-25 19:26:07');
INSERT INTO "ratings" VALUES(41,'UV-8DBE108A',254,4,'2026-03-25 19:22:45','2026-03-25 19:23:41');
CREATE TABLE rl_qtable (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_uid TEXT NOT NULL,
    state_key TEXT NOT NULL,
    movie_id INTEGER NOT NULL,
    q_value REAL DEFAULT 0.0,
    visit_count INTEGER DEFAULT 0,
    last_reward REAL DEFAULT 0.0,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_uid, state_key, movie_id),
    FOREIGN KEY (user_uid) REFERENCES users(user_uid)
  );
INSERT INTO "rl_qtable" VALUES(1,'UV-E2F3E978','Horror|intense|afternoon',39,1.495000000000000218e-01,2,0.5,'2026-03-08 11:02:53');
INSERT INTO "rl_qtable" VALUES(3,'UV-E2F3E978','Horror|intense|afternoon',54,1.142025000000000124e-01,1,1.0,'2026-03-08 11:03:23');
INSERT INTO "rl_qtable" VALUES(4,'UV-E2F3E978','Drama|intense|afternoon',54,0.05,1,0.5,'2026-03-08 11:03:23');
INSERT INTO "rl_qtable" VALUES(5,'UV-E2F3E978','Drama|intense|evening',45,0.1,1,1.0,'2026-03-08 11:54:53');
INSERT INTO "rl_qtable" VALUES(6,'UV-E2F3E978','Action|intense|evening',45,0.05,1,0.5,'2026-03-08 11:54:53');
INSERT INTO "rl_qtable" VALUES(7,'UV-521649E9','Sci-Fi|fun|afternoon',42,1.495000000000000218e-01,2,0.5,'2026-03-09 10:11:02');
INSERT INTO "rl_qtable" VALUES(9,'UV-48944C32','Action|intense|morning',26,2.477587375000000481e-01,4,0.5,'2026-03-11 05:32:36');
INSERT INTO "rl_qtable" VALUES(13,'UV-E2F3E978','Action|intense|afternoon',42,0.1,1,1.0,'2026-03-11 07:57:33');
INSERT INTO "rl_qtable" VALUES(14,'UV-E2F3E978','Sci-Fi|fun|afternoon',42,0.05,1,0.5,'2026-03-11 07:57:33');
INSERT INTO "rl_qtable" VALUES(15,'UV-E2F3E978','Action|fun|afternoon',45,0.09975,2,0.5,'2026-03-11 08:06:02');
INSERT INTO "rl_qtable" VALUES(16,'UV-E2F3E978','Action|intense|afternoon',9,0.551322132404189,6,0.5,'2026-03-12 07:25:01');
INSERT INTO "rl_qtable" VALUES(19,'UV-E2F3E978','Action|intense|afternoon',54,0.13267080125,2,0.5,'2026-03-12 06:31:49');
INSERT INTO "rl_qtable" VALUES(20,'UV-E2F3E978','Action|intense|morning',41,1.495000000000000218e-01,2,0.5,'2026-03-12 05:21:30');
INSERT INTO "rl_qtable" VALUES(25,'UV-E2F3E978','Action|intense|afternoon',48,2.132596600075312709e-01,2,0.5,'2026-03-12 06:32:44');
INSERT INTO "rl_qtable" VALUES(27,'UV-E2F3E978','Action|intense|afternoon',4,3.985772241513544922e-01,4,0.5,'2026-03-27 08:22:15');
INSERT INTO "rl_qtable" VALUES(29,'UV-E2F3E978','Action|intense|afternoon',7,2.132596600075312709e-01,2,0.5,'2026-03-12 07:22:11');
INSERT INTO "rl_qtable" VALUES(31,'UV-E2F3E978','Action|intense|afternoon',45,0.0885577157934375,1,0.5,'2026-03-12 07:23:24');
INSERT INTO "rl_qtable" VALUES(32,'UV-E2F3E978','Action|intense|afternoon',39,0.0885577157934375,1,0.5,'2026-03-12 07:23:35');
INSERT INTO "rl_qtable" VALUES(33,'UV-E2F3E978','Action|intense|afternoon',16,2.132596600075312709e-01,2,0.5,'2026-03-12 07:24:31');
INSERT INTO "rl_qtable" VALUES(35,'UV-E2F3E978','Action|intense|afternoon',37,3.985772241513544922e-01,4,0.5,'2026-03-27 09:33:47');
INSERT INTO "rl_qtable" VALUES(37,'UV-E2F3E978','Sci-Fi|intense|afternoon',1,4.920203712405916141e-01,8,0.5,'2026-03-12 07:53:37');
INSERT INTO "rl_qtable" VALUES(39,'UV-E2F3E978','Sci-Fi|intense|afternoon',31,1.669847500000000152e-01,2,0.5,'2026-03-12 07:24:50');
INSERT INTO "rl_qtable" VALUES(43,'UV-E2F3E978','Action|intense|afternoon',21,2.395136448989561296e-01,2,0.5,'2026-03-12 07:25:09');
INSERT INTO "rl_qtable" VALUES(45,'UV-E2F3E978','Sci-Fi|intense|afternoon',11,0.170140747375,2,0.5,'2026-03-12 07:25:15');
INSERT INTO "rl_qtable" VALUES(47,'UV-E2F3E978','Action|intense|afternoon',26,2.395136448989561296e-01,2,0.5,'2026-03-12 07:25:25');
INSERT INTO "rl_qtable" VALUES(49,'UV-E2F3E978','Action|intense|afternoon',5,2.395136448989561296e-01,2,0.5,'2026-03-12 07:25:40');
INSERT INTO "rl_qtable" VALUES(57,'UV-48944C32','Action|intense|night',26,1.495000000000000218e-01,2,0.5,'2026-03-13 16:58:54');
INSERT INTO "rl_qtable" VALUES(59,'UV-48944C32','Action|intense|night',42,1.669847500000000152e-01,2,0.5,'2026-03-13 17:50:25');
INSERT INTO "rl_qtable" VALUES(61,'UV-48944C32','Action|intense|night',1,2.751407473750000499e-01,2,2.0,'2026-03-17 16:27:41');
INSERT INTO "rl_qtable" VALUES(62,'UV-48944C32','Action|intense|night',54,6.58635512500000131e-02,1,0.5,'2026-03-13 17:52:12');
INSERT INTO "rl_qtable" VALUES(63,'UV-48944C32','Action|intense|night',60,6.58635512500000131e-02,1,0.5,'2026-03-13 17:52:25');
INSERT INTO "rl_qtable" VALUES(64,'UV-48944C32','Action|intense|night',5,6.58635512500000131e-02,1,0.5,'2026-03-13 17:52:38');
INSERT INTO "rl_qtable" VALUES(65,'test_user','general|any|night',45,0.05,1,0.5,'2026-03-14 17:23:02');
INSERT INTO "rl_qtable" VALUES(66,'test_user2','general|any|night',45,0.05,1,0.5,'2026-03-14 17:23:19');
INSERT INTO "rl_qtable" VALUES(67,'UV-E2F3E978','Sci-Fi|intense|afternoon',5,2.123173471744885354e+00,15,2.0,'2026-03-15 08:09:55');
INSERT INTO "rl_qtable" VALUES(83,'UV-48944C32','Action|intense|afternoon',26,0.05,1,0.5,'2026-03-21 07:08:31');
INSERT INTO "rl_qtable" VALUES(84,'UV-3D95E43F','general|any|afternoon',1,0.2,1,2.0,'2026-03-21 07:52:08');
INSERT INTO "rl_qtable" VALUES(85,'test_user_789','Action|any|afternoon',101,6.456791688409487806e-01,17,1.0,'2026-03-25 09:08:58');
INSERT INTO "rl_qtable" VALUES(86,'test_user_123','Action|intense|night',202,0.1,1,1.0,'2026-03-25 18:11:25');
INSERT INTO "rl_qtable" VALUES(87,'UV-E2F3E978','Sci-Fi|intense|night',204,0.05,1,0.5,'2026-03-25 18:17:48');
INSERT INTO "rl_qtable" VALUES(88,'UV-E2F3E978','Sci-Fi|intense|night',4,1.968702380952381258e-01,2,0.5,'2026-03-25 18:24:30');
INSERT INTO "rl_qtable" VALUES(89,'UV-E2F3E978','Sci-Fi|intense|night',37,2.133049634353741674e-01,2,0.5,'2026-03-25 18:24:50');
INSERT INTO "rl_qtable" VALUES(90,'UV-8DBE108A','Drama|thought-provoking|night',259,1.921428571428571707e-01,2,0.5,'2026-03-25 18:36:37');
INSERT INTO "rl_qtable" VALUES(91,'UV-E2F3E978','Sci-Fi|intense|night',261,1.709664233108600384e-01,2,0.5,'2026-03-25 18:41:43');
INSERT INTO "rl_qtable" VALUES(92,'UV-E2F3E978','Sci-Fi|intense|night',41,1.702639715263605524e-01,1,1.5,'2026-03-25 18:43:36');
INSERT INTO "rl_qtable" VALUES(93,'UV-E2F3E978','Action|intense|night',41,0.05,1,0.5,'2026-03-25 18:43:36');
INSERT INTO "rl_qtable" VALUES(94,'UV-E2F3E978','Sci-Fi|intense|night',250,1.709664233108600384e-01,2,0.5,'2026-03-25 18:44:08');
INSERT INTO "rl_qtable" VALUES(95,'UV-E2F3E978','Action|intense|night',1,2.826865960848076176e-01,7,0.5,'2026-03-25 19:07:55');
INSERT INTO "rl_qtable" VALUES(96,'UV-E2F3E978','Action|intense|night',61,6.397529166666666989e-02,1,0.5,'2026-03-25 18:46:32');
INSERT INTO "rl_qtable" VALUES(97,'UV-8DBE108A','Drama|thought-provoking|night',10,1.182535714285714301e-01,1,1.0,'2026-03-25 18:54:30');
INSERT INTO "rl_qtable" VALUES(98,'UV-8DBE108A','Action|intense|night',10,1.838167395505224955e-01,3,0.5,'2026-03-25 19:25:30');
INSERT INTO "rl_qtable" VALUES(99,'UV-8DBE108A','Action|intense|night',1,4.663169606558387193e-01,15,0.5,'2026-03-25 19:37:43');
INSERT INTO "rl_qtable" VALUES(100,'UV-8DBE108A','Action|intense|night',261,1.775842341827827964e-01,2,0.5,'2026-03-25 19:06:31');
INSERT INTO "rl_qtable" VALUES(101,'UV-8DBE108A','Action|intense|night',268,2.228223294208780402e-01,2,0.5,'2026-03-25 19:06:51');
INSERT INTO "rl_qtable" VALUES(102,'UV-E2F3E978','Action|intense|night',24,1.832073256425815478e-01,2,0.5,'2026-03-25 19:08:25');
INSERT INTO "rl_qtable" VALUES(103,'UV-E2F3E978','Action|intense|night',259,7.685522662805673033e-02,1,0.5,'2026-03-25 19:13:51');
INSERT INTO "rl_qtable" VALUES(104,'UV-E2F3E978','Action|intense|night',508,1.832073256425815478e-01,2,0.5,'2026-03-25 19:19:00');
INSERT INTO "rl_qtable" VALUES(105,'UV-8DBE108A','Action|intense|night',254,2.148247291912408208e-01,3,0.5,'2026-03-25 19:25:14');
INSERT INTO "rl_qtable" VALUES(106,'UV-8DBE108A','Action|intense|night',248,2.158603099973370742e-01,3,0.5,'2026-03-25 19:27:40');
INSERT INTO "rl_qtable" VALUES(107,'UV-E2F3E978','Action|intense|night',11,1.268552266280567331e-01,1,1.0,'2026-03-25 19:38:53');
INSERT INTO "rl_qtable" VALUES(108,'UV-E2F3E978','Action|intense|morning',122,1.958016347402597445e-01,3,0.5,'2026-03-26 03:16:31');
INSERT INTO "rl_qtable" VALUES(109,'UV-E2F3E978','Action|intense|morning',56,1.678783360339362873e-01,2,0.5,'2026-03-26 03:17:16');
INSERT INTO "rl_qtable" VALUES(110,'UV-E2F3E978','Action|intense|morning',254,1.678783360339362873e-01,2,0.5,'2026-03-26 03:33:00');
INSERT INTO "rl_qtable" VALUES(111,'UV-E2F3E978','Action|intense|morning',250,6.860115530032467879e-02,1,0.5,'2026-03-26 03:53:13');
INSERT INTO "rl_qtable" VALUES(112,'UV-E2F3E978','Action|intense|morning',121,1.678783360339362873e-01,2,0.5,'2026-03-26 04:05:33');
INSERT INTO "rl_qtable" VALUES(113,'UV-E2F3E978','Action|intense|morning',258,2.371434921563073672e-01,4,0.5,'2026-03-26 04:15:26');
INSERT INTO "rl_qtable" VALUES(114,'UV-E2F3E978','Action|intense|morning',1,1.751722208780532863e-01,2,0.5,'2026-03-26 04:15:36');
INSERT INTO "rl_qtable" VALUES(115,'UV-E2F3E978','Action|intense|morning',204,2.839584792606113516e-01,4,0.5,'2026-03-26 04:45:11');
INSERT INTO "rl_qtable" VALUES(116,'UV-E2F3E978','Action|intense|morning',259,7.252863175484920711e-02,1,0.5,'2026-03-26 04:24:01');
INSERT INTO "rl_qtable" VALUES(117,'UV-E2F3E978','Action|intense|afternoon',1,2.306023095503580978e-01,2,0.5,'2026-03-26 07:01:50');
INSERT INTO "rl_qtable" VALUES(118,'UV-E2F3E978','Action|intense|afternoon',10,2.306023095503580978e-01,2,0.5,'2026-03-26 07:02:19');
INSERT INTO "rl_qtable" VALUES(119,'UV-E2F3E978','Action|intense|afternoon',204,4.723126783714856614e-01,7,0.5,'2026-03-27 10:06:44');
INSERT INTO "rl_qtable" VALUES(120,'UV-E2F3E978','Action|intense|afternoon',410,6.407749682292734895e-01,12,0.5,'2026-03-28 10:12:30');
INSERT INTO "rl_qtable" VALUES(121,'UV-E2F3E978','Action|intense|afternoon',250,2.919063270434578695e-01,3,0.5,'2026-03-27 10:42:38');
INSERT INTO "rl_qtable" VALUES(122,'UV-E2F3E978','Action|intense|afternoon',221,0.614644897124902,11,0.5,'2026-03-28 10:12:25');
INSERT INTO "rl_qtable" VALUES(123,'UV-E2F3E978','Action|intense|afternoon',261,2.306023095503580978e-01,2,0.5,'2026-03-27 10:17:29');
INSERT INTO "rl_qtable" VALUES(124,'UV-E2F3E978','Action|intense|morning',313,3.9936847173974227e-01,11,0.5,'2026-03-28 04:53:07');
INSERT INTO "rl_qtable" VALUES(125,'UV-E2F3E978','Action|intense|morning',202,8.794000481527551594e-02,1,0.5,'2026-03-28 04:53:17');
INSERT INTO "rl_qtable" VALUES(126,'UV-E2F3E978','Action|intense|morning',203,2.49031437514083076e-01,2,0.5,'2026-03-28 04:53:27');
INSERT INTO "rl_qtable" VALUES(127,'UV-E2F3E978','Action|intense|morning',261,3.325683950534621402e-01,4,0.5,'2026-03-28 04:54:33');
INSERT INTO "rl_qtable" VALUES(128,'UV-E2F3E978','Action|intense|afternoon',259,1.023756025783979507e-01,1,0.5,'2026-03-28 07:41:53');
INSERT INTO "rl_qtable" VALUES(129,'UV-E2F3E978','Action|intense|afternoon',313,3.832885142857166971e-01,4,0.5,'2026-03-28 08:08:05');
INSERT INTO "rl_qtable" VALUES(130,'UV-E2F3E978','Action|intense|afternoon',203,2.758404047884533416e-01,2,0.5,'2026-03-28 07:42:40');
INSERT INTO "rl_qtable" VALUES(131,'UV-E2F3E978','Action|intense|afternoon',56,2.306023095503580978e-01,2,0.5,'2026-03-28 08:08:22');
INSERT INTO "rl_qtable" VALUES(132,'UV-E2F3E978','Action|intense|afternoon',220,2.865277540823141789e-01,2,0.5,'2026-03-28 08:22:18');
INSERT INTO "rl_qtable" VALUES(133,'UV-E2F3E978','Action|intense|afternoon',315,6.352235766192506628e-01,23,0.5,'2026-03-28 10:45:15');
INSERT INTO "rl_qtable" VALUES(134,'UV-8DBE108A','Action|intense|afternoon',410,2.461293901750423729e-01,4,0.5,'2026-03-28 10:20:56');
INSERT INTO "rl_qtable" VALUES(135,'UV-E2F3E978','Action|fun|afternoon',315,3.489757966269466106e-01,15,0.5,'2026-03-28 10:54:48');
INSERT INTO "rl_qtable" VALUES(136,'UV-E2F3E978','Action|fun|afternoon',316,1.831550664930653439e-01,2,0.5,'2026-03-28 10:52:56');
INSERT INTO "rl_qtable" VALUES(137,'UV-E2F3E978','Action|fun|afternoon',328,1.831550664930653439e-01,2,0.5,'2026-03-28 10:53:04');
INSERT INTO "rl_qtable" VALUES(138,'UV-E2F3E978','Action|fun|night',315,0.05,1,0.5,'2026-03-28 16:53:09');
INSERT INTO "rl_qtable" VALUES(139,'UV-E2F3E978','Action|fun|night',410,1.968702380952381258e-01,2,0.5,'2026-03-28 16:53:15');
INSERT INTO "rl_qtable" VALUES(140,'UV-E2F3E978','Action|fun|night',4,2.133049634353741674e-01,2,0.5,'2026-03-28 16:53:21');
INSERT INTO "rl_qtable" VALUES(141,'UV-E2F3E978','Action|fun|night',220,2.162045185489553101e-01,2,0.5,'2026-03-28 16:53:34');
INSERT INTO "rl_qtable" VALUES(142,'UV-E2F3E978','Action|fun|night',328,7.053942926215076014e-02,1,0.5,'2026-03-28 16:53:44');
CREATE TABLE search_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_uid TEXT NOT NULL,
    query TEXT NOT NULL,
    result_count INTEGER DEFAULT 0,
    selected_movie_id INTEGER DEFAULT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_uid) REFERENCES users(user_uid)
  );
CREATE TABLE sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_uid TEXT NOT NULL,
    session_token TEXT UNIQUE NOT NULL,
    ip_address TEXT DEFAULT '',
    user_agent TEXT DEFAULT '',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    expires_at DATETIME NOT NULL,
    FOREIGN KEY (user_uid) REFERENCES users(user_uid)
  );
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_uid TEXT UNIQUE NOT NULL,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    display_name TEXT,
    age INTEGER DEFAULT 18,
    preferred_genres TEXT DEFAULT '[]',
    preferred_experience TEXT DEFAULT '',
    avatar_emoji TEXT DEFAULT '👤',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
INSERT INTO "users" VALUES(1,'UV-693395D6','testuser','test@univibe.com','$2b$10$2470H1tyXbK.dbR2elQkde6xcy65hq0RvtQ1Owg3oLTWetcSKZcWy','Test User',25,'[]','','🎪','2026-02-23 14:50:44','2026-02-23 14:50:44');
INSERT INTO "users" VALUES(2,'UV-E2F3E978','ajayy','ajayykumar502@gmail.com','$2b$10$Dku9m5IRzmflxT1pTjvLuuKMRk3zwh65jMyuwO1Cquu9v6SGH/goG','AK',21,'[]','','🎬','2026-02-23 14:56:35','2026-03-27 08:17:31');
INSERT INTO "users" VALUES(3,'UV-521649E9','testuser2','test2@univibe.com','$2b$10$xM00IcH8Cc05cFjttYVxxufS765gMTlem97eVBiyOWjnCkb.Enesy','testuser2',18,'[]','','👤','2026-03-09 10:09:34','2026-03-09 10:09:34');
INSERT INTO "users" VALUES(4,'UV-48944C32','tester123456','tester1@tester.com','$2b$10$Ys6GlQObBf7TgPcjZPxbmekHh9d5NzpUYVofzv/O9Z1VRaPrrN.QK','Tester',25,'[]','','🎭','2026-03-11 05:12:43','2026-03-11 05:12:43');
INSERT INTO "users" VALUES(5,'UV-3D95E43F','tester_unique_12345','tester@test.com','$2b$10$UxfnWijA/wtTI9CqRypoQO4nwp1vo4F8.V.8wi.bkBHgbAR4kn2Di','Tester',25,'[]','','🔥','2026-03-21 07:45:13','2026-03-21 07:45:13');
INSERT INTO "users" VALUES(6,'UV-8DBE108A','user_random_112233445566','testuser@example.com','$2b$10$Wn0iIilXbQJpVuBN5WyH9u.uY2BbqNtY.mqCuaSpbPejCmw4TUpKa','Test Person',25,'[]','','🎬','2026-03-21 07:57:10','2026-03-21 07:57:10');
CREATE TABLE watchlist (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_uid TEXT NOT NULL,
    movie_id INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_uid, movie_id),
    FOREIGN KEY (user_uid) REFERENCES users(user_uid)
  );
INSERT INTO "watchlist" VALUES(1,'UV-E2F3E978',139,'2026-03-21 16:17:13');
INSERT INTO "watchlist" VALUES(2,'UV-E2F3E978',204,'2026-03-21 16:34:21');
CREATE INDEX idx_interactions_user ON interactions(user_uid);
CREATE INDEX idx_interactions_movie ON interactions(movie_id);
CREATE INDEX idx_interactions_type ON interactions(event_type);
CREATE INDEX idx_search_user ON search_history(user_uid);
CREATE INDEX idx_rl_user_state ON rl_qtable(user_uid, state_key);
CREATE INDEX idx_ratings_user ON ratings(user_uid);
CREATE INDEX idx_watchlist_user ON watchlist(user_uid);
CREATE INDEX idx_favorites_user ON favorites(user_uid);
DELETE FROM "sqlite_sequence";
INSERT INTO "sqlite_sequence" VALUES('users',6);
INSERT INTO "sqlite_sequence" VALUES('interactions',308);
INSERT INTO "sqlite_sequence" VALUES('rl_qtable',142);
INSERT INTO "sqlite_sequence" VALUES('ratings',47);
INSERT INTO "sqlite_sequence" VALUES('favorites',21);
INSERT INTO "sqlite_sequence" VALUES('watchlist',16);
COMMIT;