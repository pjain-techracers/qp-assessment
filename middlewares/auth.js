
const { verifyAccessToken } = require("../utils/custom-utils.js");

exports.authenticateToken = function(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (!token) {
      return res.sendStatus(401);
    }
  
    const result = verifyAccessToken(token);
  
    if (!result.success) {
      return res.status(403).json({ error: result.error });
    }
  
    console.log(result.data, '-----')
    req.user = result.data;
    next();
  }