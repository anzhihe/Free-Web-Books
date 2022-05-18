-- 创建数据库
create database wbs16092 charset=utf8;
use wbs16092;

-- 培训项目表
create table trainItem
(
	itemId int primary key,
	itemName varchar(20) not null
) engine=InnoDB charset=utf8;

-- 课程表
create table course
(
	courseId int primary key,
	courseName varchar(50) not null,
	period int,
	itemId int references trainItem(itemId),
	details varchar(2000)
)  engine=InnoDB charset=utf8;

-- 插入测试数据
insert into trainItem values(1,'Java开发');
insert into trainItem values(2,'Android开发');
insert into trainItem values(3,'前端开发');

insert into course values(1,'JavaSE',90,1,'学习Java基础知识');
insert into course values(2,'JavaWeb',40,1,'学习JavaWeb知识');
insert into course values(3,'MySQL',20,1,'学习MySQL数据库知识');
insert into course values(4,'Oracle',25,1,'学习Oracle数据库知识');
insert into course values(5,'Spring',42,1,'学习Spring框架知识');

insert into course values(6,'JavaSE',60,2,'学习Java基础知识');
insert into course values(7,'Activity',20,2,'学习Activity知识');
insert into course values(8,'ListView',30,2,'学习ListView组件知识');

insert into course values(9,'PS',60,3,'学习Photoshop知识');
insert into course values(10,'jQuery',40,3,'学习jQuery知识');
insert into course values(11,'AngularJS',30,3,'学习AngularJS框架知识');

select * from trainItem;
select * from course;

update course set details='学习Java,基础知识' where courseId=1;
update course set details='学习<MySQL>数据库知识' where courseId=3;