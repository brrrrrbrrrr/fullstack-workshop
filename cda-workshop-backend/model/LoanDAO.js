import UserDAO from './UserDAO.js';

class LoanDAO extends UserDAO {
  constructor(db) {
    super(db);
    this.table = 'loan';
    this.fields = ['dateStart', 'dateEnd', 'userId'];
    this.paramater = this.fields.map(() => {
      return '?';
    });

    this.insert = `INSERT INTO ${this.table} (${this.fields}) VALUES (${this.paramater})`;
  }
}
export default LoanDAO;
