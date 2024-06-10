const isAdmin = (req, res, next) => {
  const roleName = req.payload.payload.sub.role;
  const paramsId = parseInt(req.params.id);
  const userId = req.payload.payload.sub.userId;
  if (roleName === 'Employee' || roleName === 'Admin') {
    return next();
  }
};

const isEmployee = (req, res, next) => {
  console.log('req :', req.payload);
  console.log('req toto :', req.toto);
  const roleId = req.payload.payload.sub.role;
  console.log('roleId :', roleId);
  if (roleId !== 2) {
    return res.status(403).json({ message: 'Foribidden' });
  }
  next();
};
const isNotStudent = (req, res, next) => {
  const roleName = req.payload.payload.sub.role;
  const paramsId = parseInt(req.params.id);
  const userId = req.payload.payload.sub.userId;

  if (roleName === 'Employee' || roleName === 'Admin') {
    return next();
  } else if (roleName === 'Student' && paramsId !== userId) {
    return res.status(403).json({ message: 'Foribidden' });
  }
  next();
};

export { isAdmin, isNotStudent, isEmployee };
