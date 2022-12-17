const User =  require('../model/User');
const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
  console.log();
  if(req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    if(!token){
      return res.status(403).json({ "message": "A token is require for authentication" });
    }
    try {
      const decoded = jwt.verify(token, process.env.TOKEN_KEY);
      if(!(await User.findOne({ _id: decoded.id }))){
        return res.status(401).json({ "message": "Invalid token" });
      }
      req.user = decoded;
    } catch(err) {
      return res.status(401).json({ "message": "Invalid token" });
    };
    return next();
  }
  return res.status(403).json({ "message": "A token is require for authentication" });
};

module.exports = verifyToken;