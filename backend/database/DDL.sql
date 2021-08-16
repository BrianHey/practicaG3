-- ---------------------------------------------------------------------

CREATE DATABASE users;

-- ---------------------------------------------------------------------

CREATE TABLE users (
  id SERIAL,
  name VARCHAR(50) NOT NULL,
  photoURL VARCHAR(25) NOT NULL,
  email VARCHAR(25) NOT NULL
);

-- ---------------------------------------------------------------------

ALTER TABLE users ADD CONSTRAINT PK_users PRIMARY KEY (id);
ALTER TABLE users ADD CONSTRAINT U_users UNIQUE (email);

-- ---------------------------------------------------------------------
