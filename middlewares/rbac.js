// middleware to check role based access

// assumption where one user can have only 1 role
const { getPermissionsByRoleName } = require("./../config/roles");
// Check if the user has the required permission for a route
exports.checkPermission = (permission) => {
  return (req, res, next) => {
    const userRole = req.user ? req.user.role : "anonymous";
    const userPermissions = getPermissionsByRoleName(userRole);

    if (userPermissions.includes(permission)) {
      return next();
    } else {
      return res.status(403).json({ error: "Access Denied" });
    }
  };
};
