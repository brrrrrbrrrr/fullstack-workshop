class UserDAO {
  constructor(db /* CLASS DATABASE */) {
    this.connection = db.connection;
    this.table = 'user';
    this.fields = ['firstname', 'lastname', 'age', 'role', 'phone', 'password'];

    this.paramater = this.fields.map(() => {
      return '?';
    });
    this.insert = `INSERT INTO ${this.table} (${this.fields}) VALUES (${this.paramater})`;
  }

  update(user, id) {
    return new Promise((resolve, reject) => {
      this.connection.query(
        `UPDATE ${this.table} set ? WHERE id = ?`,
        [user, id],
        (err, result, fields) => {
          if (err) {
            reject(err);
          } else resolve(result);
        }
      );
    });
  }

  create(...value) {
    console.log('value : ', value);
    return new Promise((resolve, reject) => {
      this.connection.execute(this.insert, value, (err, result, fields) => {
        if (err) {
          console.error(err);
          return reject(err);
        }
        resolve(result);
      });
    });
  }

  findAll() {
    return new Promise((resolve, reject) => {
      this.connection.query(
        `SELECT * FROM ${this.table}`,
        (err, result, fields) => {
          if (err) {
            return reject(err);
          }

          resolve(result);
        }
      );
    });
  }

  findByName(name) {
    console.log('name :', name);
    return new Promise((resolve, reject) => {
      this.connection.query(
        `SELECT ${this.table}.id as userId, firstname, lastname, password, role.name as role from ${this.table} 
         JOIN role ON role.id = ${this.table}.role where lastname = ? `,
        [name],
        (err, result, field) => {
          if (err) {
            return reject(err);
          }

          resolve(result);
        }
      );
    });
  }

  findRoleByd(id) {
    return new Promise((resolve, reject) => {
      this.connection.query(
        `SELECT ${this.table}.id as userId, role.name as role FROM ${this.table} JOIN role ON role.id = user.role WHERE user.id = ?`,
        [id],
        (err, result, fields) => {
          if (err) {
            return reject(err);
          }

          resolve(result);
        }
      );
    });
  }
  findById(id) {
    return new Promise((resolve, reject) => {
      this.connection.query(
        `SELECT * FROM ${this.table} WHERE id = ?`,
        [id],
        (err, result, fields) => {
          if (err) {
            return reject(err);
          }

          resolve(result);
        }
      );
    });
  }

  find(field, value) {
    return new Promise((resolve, reject) => {
      if (this.fields.find((item) => item === field) === undefined) {
        return reject({ error: `'${field}' : Invalid field` });
      }

      this.connection.execute(
        `SELECT * FROM ${this.table} WHERE ${field} = ?`,
        [value],

        (err, result, fields) => {
          if (err) {
            return reject(err);
          }
          resolve(result);
        }
      );
    });
  }

  delete(id) {
    return new Promise((resolve, reject) => {
      console.log('id :', id);
      this.connection.query(
        `DELETE FROM ${this.table} WHERE id = ?`,
        [id],
        (err, result, fields) => {
          if (err) {
            return reject(err);
          }

          resolve(result);
        }
      );
    });
  }

  selectByUserID(userID) {
    const query = `
      SELECT user.id, user.name, article.title 
      FROM user 
          JOIN article ON user.id = article.user_id
      WHERE user.id`;
    this.connection.query(query, function (error, result, fields) {
      if (error) console.error(error);
    });
  }
}

export default UserDAO;
