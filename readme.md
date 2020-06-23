# CrudNodeMysql

Crud Com Node.js e Mysql

#Comandos para criação do Banco

create database nodeDB;

create table funcionarios (
	ID int(4) NOT NULL AUTO_INCREMENT,
	NOME varchar(50) DEFAULT NULL,
	SALARIO int(11) DEFAULT NULL,
	PRIMARY KEY (ID)
)

INSERT INTO funcionarios VALUES(1,"Lucas Diniz",500000),(2,"Beatriz Lopes",8000);