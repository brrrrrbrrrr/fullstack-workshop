import UserDAO from './UserDAO.js';

class EditorDAO extends UserDAO {
  constructor(db) {
    super(db);
    this.table = 'editor';
    this.fields = ['name'];
    this.paramater = this.fields.map(() => {
      return '?';
    });

    this.insert = `INSERT INTO ${this.table} (${this.fields}) VALUES (${this.paramater})`;
  }
}

export default EditorDAO;
