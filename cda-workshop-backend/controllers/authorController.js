import Database from '../model/Database.js';
import userController from './userController.js';
import AuthorDAO from '../model/AuthorDAO.js';

class authorController extends userController {
  constructor() {
    super();
    this.db = new Database();
    this.model = new AuthorDAO(this.db);
  }
}

export default authorController;
