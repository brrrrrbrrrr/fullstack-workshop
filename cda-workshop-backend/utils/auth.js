import jwt from 'jsonwebtoken';
import argon2 from 'argon2';

const generateToken = (payload = {}) => {
  const token = jwt.sign(payload, 'secret', {
    expiresIn: '1h',
  });
  console.log('token : ', token);
  return token;
};

const verifyToken = (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(404).json({
      message: 'You need a token',
    });
  }
  const token = authorization.split(' ')[1];

  jwt.verify(token, 'secret', (err, decoded) => {
    if (err) {
      return res.status(403).json({
        message: 'Invalid token ....',
      });
    }

    req.payload = decoded;
    next();
  });
};

const verifyTokenWitoutNext = (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(401).json({
      message: 'You need a token',
    });
  }
  const token = authorization.split(' ')[1];

  jwt.verify(token, 'secret', (err, decoded) => {
    if (err) {
      return res.status(403).json({
        message: 'Invalid token ....',
      });
    }

    return (req.payload = decoded);
  });
};

const hashPassword = async (password) => {
  const hashed = await argon2
    .hash(password)
    .then((hashedPassword) => {
      return hashedPassword;
    })
    .catch((err) => {
      console.warn(err);
      return false;
    });
  return hashed;
};

const verifyPassword = (req, res, next) => {
  console.log('req user password :', req.users[0].password);
  console.log('req body password :', req.body.password);
  const { userId, firstname, lastname, role } = req.users[0];
  argon2
    .verify(req.users[0].password, req.body.password)
    .then((isVerified) => {
      if (isVerified) {
        const payload = {
          sub: {
            userId: userId,
            firstname: firstname,
            lastname: lastname,
            role: role,
          },
        };

        res.send({ token: generateToken({ payload }) });
      } else {
        return res.sendStatus(401);
      }
    })
    .catch((err) => {
      console.error(err);
      return res.sendStatus(500);
    });
};

export {
  hashPassword,
  generateToken,
  verifyToken,
  verifyPassword,
  verifyTokenWitoutNext,
};
