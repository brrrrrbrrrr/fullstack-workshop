import Database from '../model/Database.js';
import userController from './userController.js';
import LoanDAO from '../model/LoanDAO.js';

class loanController extends userController {
  constructor() {
    super();
    this.db = new Database();
    this.model = new LoanDAO(this.db);
  }

  add = (req, res) => {
    const { dateStart, dateEnd, userId } = req.body;
    this.model
      .create(dateStart, dateEnd, userId)
      .then(() => {
        res.sendStatus(200);
      })
      .catch((err) => {
        if (err) {
          console.error(err);
        }
      });
  };
}

export default loanController;
