CREATE TABLE usuario(
	id_ BIGINT PRIMARY KEY UNIQUE not NULL,
	nome TEXT NOT NULL, 
	senha TEXT NOT NULL,
	email TEXT NOT NULL,
	telefone TEXT NOT NULL UNIQUE,
	codigoacesso TEXT UNIQUE,
	cpf TEXT UNIQUE NOT NULL,
	role TEXT NOT NULL
);