import db from '../../config/database';
import accountQueries from "../queries/accounts";

export default class AccountService {
  static async insertAccount(data) {
    return db.oneOrNone(accountQueries.addAccount, data);
  }

  static async getSingleAccount(accountNum) {
    return db.oneOrNone(accountQueries.fetchSingleAccount, [accountNum]);
  }

  static async getAllAccounts() {
    return db.manyOrNone(accountQueries.fetchAllAccounts);
  }
}
