CREATE TABLE accounts (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  dob VARCHAR NOT NULL,
  account_type VARCHAR(50) NOT NULL,
  initial_balance BIGINT NOT NULL,
  account_number VARCHAR NOT NULL UNIQUE
);
