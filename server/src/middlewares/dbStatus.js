export const attachDbStatus = (getDBStatus) => (req, res, next) => {
  req.isMongoConnected = typeof getDBStatus === 'function' ? getDBStatus() : Boolean(getDBStatus);
  next();
};
