const rolePermissions =  {
  "roles": [
    {
      "name": "admin",
      "permissions": ["create_grocery", "get_all_grocery", "get_avilable_grocery", "update_grocery", "delete_grocery", "get_grocery_byid", "get_grocery_byname", "get_all_orders"]
    },
    {
      "name": "customer",
      "permissions": ["get_all_grocery", "get_avilable_grocery", "get_grocery_byid", "get_grocery_byname", "create_order", "delete_order"]
    }
  ]
}

const getPermissionsByRoleName = (roleName) => {
  const role = rolePermissions.roles.find((r) => r.name === roleName);
  return role ? role.permissions : [];
}

module.exports = {
  rolePermissions,
  getPermissionsByRoleName
}