import UserDAO from '../model/UserDAO.js';
import Database from '../model/Database.js';

import { hashPassword } from '../utils/auth.js';

import deleteUser from '../services/service.js';

class userController {
  constructor() {
    this.db = new Database();
    this.model = new UserDAO(this.db);
  }
  browse = (req, res) => {
    this.model
      .findAll()
      .then((rows) => {
        res.send(rows);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  read = (req, res) => {
    const id = req.params.id;

    this.model
      .findById(id)
      .then((rows) => {
        if (rows[0] === undefined) {
          res.sendStatus(404);
        } else res.send(rows);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  findNameForLogin = (req, res, next) => {
    const { lastname, password } = req.body;
    console.log('lastname :', lastname, '//', 'password : ', password);
    // console.log('name :', lastname);
    // console.log('password :', password);
    // console.log('res :', res);
    this.model
      .findByName(lastname)
      .then((rows) => {
        console.log(rows, 'rows');
        if (rows[0] === undefined) {
          console.log('rows : ', rows[0]);
          res.sendStatus(404);
        } else req.users = { ...rows, password: password };

        next();
      })
      .catch((err) => {
        console.log('erreur', err);
        res.sendStatus(500);
      });
  };

  filter = (req, res) => {
    const field = Object.keys(req.body).join('');
    const value = Object.values(req.body).join('');

    this.model
      .find(field, value)
      .then((rows) => {
        if (rows[0] === undefined) {
          res.sendStatus(404);
        } else res.send(rows);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  add = async (req, res) => {
    const { firstname, lastname, age, role, phone, password } = req.body;
    console.log('password add :', password);

    const hashedPassword = await hashPassword(password);

    await this.model
      .create(firstname, lastname, age, role, phone, hashedPassword)
      .then((data) => {
        res.sendStatus(200);
      })
      .catch((err) => {
        if (err) {
          console.error(err);
        }
      });
  };

  edit = (req, res) => {
    const user = req.body;
    const id = req.params.id;
    deleteUser(req)
      .then(() => {
        this.model
          .update(user, id)
          .then((result) => {
            if (result.affectedRows === 0) {
              res.sendStatus(404);
            } else {
              res.sendStatus(204);
            }
          })
          .catch((err) => {
            console.error(err);
            res.sendStatus(500);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  destroy = (req, res) => {
    const id = req.params.id;
    this.model
      .delete(id)
      .then((result) => {
        if (result.affectedRows === 0) {
          return res.sendStatus(404);
        }
        return res.sendStatus(204);
      })
      .catch((err) => {
        console.error(err);
        return res.sendStatus(500);
      });
  };
}

export default userController;
