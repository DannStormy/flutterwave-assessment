export default {
  addAccount: `
    INSERT INTO accounts(account_number, name, dob, account_type, initial_balance)
    VALUES ($1, $2, $3, $4, $5)
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
