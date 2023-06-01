npm install
```

## PostgreSQL
CREATE DATABASE auth WITH OWNER = postgres ENCODING = 'UTF8';

CREATE TABLE public.users (
  id SERIAL,
  name VARCHAR(100),
  email VARCHAR(100),
  password VARCHAR(100),
  admin BOOLEAN DEFAULT false,
  "deletedAt" TIMESTAMP(0) WITHOUT TIME ZONE,  
  CONSTRAINT users_email_key UNIQUE(email),
  CONSTRAINT users_pkey PRIMARY KEY(id)
) 
WITH (oids = false);

ALTER TABLE public.users ALTER COLUMN id SET STATISTICS 0;

ALTER TABLE public.users OWNER TO postgres;

/* 
  Mock Default: admin@gmail.com - Senha: 123  
*/
INSERT INTO public.users ("id", "name", "email", "password", "admin")
VALUES (1, 
	E'Admin', 
	E'admin@gmail.com', 
	E'$2a$10$rQMnhydle5AS7Lii7riM.ewWV0iG3zNFJUUXEHa2nKJ6hB9KNhUeK', True);  

## Arquivo .env 

module.exports = {
	authSecret: 'your-secret-jwt',
	db: {
		host: '127.0.0.1',
		database: 'auth',
		user:     'postgres',
		password: '1234'
	}
}
	
npm start
npm install
npm run serve
npm run build
