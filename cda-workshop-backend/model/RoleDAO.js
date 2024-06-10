import UserDAO from './UserDAO.js';
class RoleDAO extends UserDAO {
  constructor(db) {
    super(db);
    this.table = 'role';
    this.fields = ['name'];
    this.paramater = this.fields.map(() => {
      return '?';
    });

    this.insert = `INSERT INTO ${this.table} (${this.fields}) VALUES (${this.paramater})`;
  }
}

export default RoleDAO;
