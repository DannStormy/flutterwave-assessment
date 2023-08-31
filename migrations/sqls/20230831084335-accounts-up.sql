CREATE TABLE accounts (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  dob VARCHAR NOT NULL,
  account_type VARCHAR(50) NOT NULL,
  initial_balance NUMERIC(15, 2) NOT NULL,
  account_number NUMERIC NOT NULL UNIQUE
);
