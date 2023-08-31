export default {
  addAccount: `
    INSERT INTO accounts(account_number, name, dob, account_type, initial_balance)
    VALUES ($1, $2, $3, $4, $5) RETURNING account_number, name, account_type, initial_balance
      `,
  fetchSingleAccount: `
    SELECT *
    FROM accounts
    WHERE account_number = $1
      `,
  fetchAllAccounts: `
    SELECT * FROM accounts;
  `,
};
