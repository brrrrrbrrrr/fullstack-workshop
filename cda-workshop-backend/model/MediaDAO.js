import Database from './Database';
import UserDAO from './UserDAO';

class MediaDAO extends UserDAO {
  constructor(props) {
    super(db);
    this.table = 'author';
    this.fields = [
      'title',
      'isbn',
      'shelf',
      'price',
      'dateOfPublication',
      'editorId',
      'typeId',
      'sectorId',
      'langageId',
      'loanId',
    ];
    this.paramater = this.fields.map(() => {
      return '?';
    });

    this.insert = `INSERT INTO ${this.table} (${this.fields}) VALUES (${this.paramater})`;
  }
}

export default MediaDAO;
