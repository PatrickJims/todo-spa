CREATE DATABASE perntodo;

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    description varchar(500)
);

CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL
);

ALTER TABLE todo 
    ADD COLUMN user_id UUID DEFAULT (uuid_generate_v4());

ALTER TABLE todo
    ADD CONSTRAINT fk_todos_users FOREIGN KEY (user_id) REFERENCES users (user_id);