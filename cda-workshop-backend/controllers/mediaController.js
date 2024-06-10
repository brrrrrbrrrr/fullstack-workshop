import Database from '../model/Database';
import MediaDAO from '../model/MediaDAO';
import userController from './userController';

class mediaController extends userController {
  constructor() {
    super();
    this.db = new Database();
    this.model = new MediaDAO(this.db);
  }
}

export default mediaController;
