/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50515
Source Host           : localhost:3306
Source Database       : clubmanagementsystem

Target Server Type    : MYSQL
Target Server Version : 50515
File Encoding         : 65001

Date: 2025-04-21 20:11:32
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `activity`
-- ----------------------------
DROP TABLE IF EXISTS `activity`;
CREATE TABLE `activity` (
  `ActId` int(11) NOT NULL AUTO_INCREMENT,
  `ActName` char(255) NOT NULL,
  `ActType` char(255) NOT NULL,
  `ActDate` date NOT NULL,
  `ActPlace` char(255) NOT NULL,
  `Att` int(11) NOT NULL,
  `ActInfo` char(255) NOT NULL,
  `ClubId` int(11) NOT NULL,
  PRIMARY KEY (`ActId`,`ClubId`),
  KEY `ActClub` (`ClubId`),
  KEY `ActId` (`ActId`),
  CONSTRAINT `ActClub` FOREIGN KEY (`ClubId`) REFERENCES `club` (`ClubId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of activity
-- ----------------------------
INSERT INTO `activity` VALUES ('1', '校篮球联赛', '体育比赛', '2025-04-17', '体育馆', '50', '校级篮球赛', '8');
INSERT INTO `activity` VALUES ('2', '羽毛球友谊赛', '体育比赛', '2025-04-14', '体育馆', '20', '友谊第一，比赛第二', '7');

-- ----------------------------
-- Table structure for `club`
-- ----------------------------
DROP TABLE IF EXISTS `club`;
CREATE TABLE `club` (
  `ClubId` int(11) NOT NULL AUTO_INCREMENT,
  `ClubName` char(255) NOT NULL,
  `ClubType` char(255) NOT NULL,
  `Originator` char(255) NOT NULL,
  `EstablishmentDate` date NOT NULL,
  `Introduction` char(255) NOT NULL,
  `State` char(255) NOT NULL,
  PRIMARY KEY (`ClubId`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of club
-- ----------------------------
INSERT INTO `club` VALUES ('1', '数学研习社', '学术', '张三', '2024-04-23', '学好数理化，走遍天下不用怕', '正常');
INSERT INTO `club` VALUES ('2', '英语研习社', '学术', '李四', '2024-03-08', 'we have a dream', '正常');
INSERT INTO `club` VALUES ('3', '动物保护协会', '公益', '王五', '2024-06-18', '喵~', '正常');
INSERT INTO `club` VALUES ('4', '青年志愿者协会', '公益', '李有胜', '2024-05-01', '学习雷锋好榜样', '正常');
INSERT INTO `club` VALUES ('5', '舞蹈社', '体育', '孔小舞', '2024-03-28', '舞动青春', '正常');
INSERT INTO `club` VALUES ('6', '大合奏社', '艺术', '贝小芬', '2024-04-11', '邦邦邦~', '待审核');
INSERT INTO `club` VALUES ('7', '羽毛球社', '体育', '林李', '2024-05-13', '快来加入羽毛球社吧', '正常');
INSERT INTO `club` VALUES ('8', '篮球社', '体育', '李川枫', '2024-03-05', '教练，我想打篮球', '正常');
INSERT INTO `club` VALUES ('9', '社团联合会', '公益', '罗飞', '2022-04-01', '社团', '正常');

-- ----------------------------
-- Table structure for `finance`
-- ----------------------------
DROP TABLE IF EXISTS `finance`;
CREATE TABLE `finance` (
  `financeId` int(11) NOT NULL AUTO_INCREMENT,
  `financeName` char(255) NOT NULL,
  `financeSum` float NOT NULL,
  `financeType` char(255) NOT NULL,
  `recordDate` date NOT NULL,
  `financeInfo` char(255) NOT NULL,
  `clubId` int(11) NOT NULL,
  PRIMARY KEY (`financeId`),
  KEY `finance_club` (`clubId`),
  CONSTRAINT `finance_club` FOREIGN KEY (`clubId`) REFERENCES `club` (`ClubId`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of finance
-- ----------------------------
INSERT INTO `finance` VALUES ('1', '买水费', '100', '支出', '2025-04-02', '买水', '8');
INSERT INTO `finance` VALUES ('5', '校友捐赠', '10000', '收入', '2025-04-17', '优秀校友捐赠用于修缮篮球场设施', '8');

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `userName` char(255) NOT NULL,
  `studentId` int(11) NOT NULL,
  `accDate` date NOT NULL,
  `role` char(11) NOT NULL,
  `conInfo` char(20) NOT NULL,
  `clubId` int(11) NOT NULL,
  `password` char(20) NOT NULL,
  PRIMARY KEY (`studentId`),
  KEY `clubId` (`clubId`),
  CONSTRAINT `clubId` FOREIGN KEY (`clubId`) REFERENCES `club` (`ClubId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('罗飞', '2002000001', '2002-04-01', '社长', '13929390029', '9', '123456');
INSERT INTO `user` VALUES ('贝小芬', '2022032866', '2022-03-28', '社长', '14578293425', '6', 'bebemaojd');
INSERT INTO `user` VALUES ('张三', '2022040255', '2022-05-11', '社长', '13939393939', '1', '123456');
INSERT INTO `user` VALUES ('李有胜', '2022047829', '2022-03-07', '社长', '19567283842', '4', 'saefAE');
INSERT INTO `user` VALUES ('路人甲', '2022090611', '2025-04-21', '普通成员', '12312312311', '1', '123456');
INSERT INTO `user` VALUES ('孔小舞', '2022093567', '2022-04-11', '社长', '17823461042', '5', 'DANCEING');
INSERT INTO `user` VALUES ('李四', '2022095311', '2022-03-11', '社长', '13667875433', '2', '123456');
INSERT INTO `user` VALUES ('林李', '2022174372', '2022-04-01', '社长', '16482759392', '7', 'zuolinyouli');
INSERT INTO `user` VALUES ('王五', '2022432314', '2022-03-09', '社长', '13028492411', '3', 'sdqw4124');
INSERT INTO `user` VALUES ('李川枫', '2022764329', '2022-03-01', '社长', '18743290843', '8', 'yinmuhuadao');
