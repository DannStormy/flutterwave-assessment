import pgp from 'pg-promise';
import promise from 'bluebird';
import "dotenv/config";

// Initialize postgres database
const pg = pgp({ promiseLib: promise, noLocking: true});
const db = pg(process.env.ASSESSMENT_DB_URL);

export default db;
