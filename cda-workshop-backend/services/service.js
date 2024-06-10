import Database from '../model/Database.js';
import UserDAO from '../model/UserDAO.js';

const db = new Database();
const model = new UserDAO(db);

const deleteUser = (req) => {
  return new Promise((resolve, reject) => {
    const data = true;
    const roleNamePayload = req.payload.payload.sub.role;
    const payloadId = req.paylod.payload.sub.id;
    const paramsId = req.params.id;
    model
      .findRoleByd(paramsId)
      .then((result) => {
        console.log(result[0]);
        const roleNameParams = result[0].role;
        if (
          roleNamePayload === 'Employee' &&
          roleNamePayload === roleNameParams &&
          payloadId === paramsId
        )
          return true;
      })
      .catch((err) => {
        console.log('err', err);
      });
    console.log(' rolName :', roleName, '//', 'paramsId : ', paramsId);

    if (data === false) {
      return reject('FALSE');
    } else resolve(console.log('TRUE'));
  });
};

export default deleteUser;
