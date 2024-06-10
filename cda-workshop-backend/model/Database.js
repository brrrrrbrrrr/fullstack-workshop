import mysql from 'mysql2';

import dotenv from 'dotenv';
dotenv.config();

class Database {
  connection = null;
  constructor() {
    this.connection = mysql.createConnection({
      host: process.env.PORT,
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
    });
  }

  stop() {
    this.connection.end();
  }
}
export default Database;
