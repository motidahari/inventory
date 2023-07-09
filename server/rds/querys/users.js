const users = {
  getUserByEmail: (user) => {
    return `SELECT * FROM inventory.users WHERE email = '${user.email.toLowerCase()}';`;
  },
  createUser: (user) => {
    return `INSERT INTO inventory.users (userId, email, name, password, permission, createdAt) VALUES('${
      user.userId
    }', '${user.email.toLowerCase()}', '${user.name}', '${
      user.password
    }', '', NOW());`;
  },
  deleteUser: (userId) => {
    return `UPDATE inventory.users SET users.deleted = 1 WHERE userId = '${userId}';`;
  },
  getUserByEmailAndUserId: (user) => {
    return `SELECT * FROM inventory.users WHERE userId = '${
      user.userId
    }' AND email = '${user.email.toLowerCase()}'; `;
  },
  updateUser: (user) => {
    return `UPDATE inventory.users SET 
                name = '${user.name}',
                permission = '${user.permission}',
                password = '${user.password}' 
            WHERE
                (userId = '${
                  user.userId
                }') and(email = '${user.email.toLowerCase()}'); `;
  },
  updateUserPermission: (user) => {
    return `UPDATE inventory.users SET permission = '${user.permission}' WHERE(userId = '${user.userId}'); `;
  },
  getUnapprovedUsers: () => {
    return `SELECT userId, email, name, createdAt FROM inventory.users WHERE permission = '' AND inventory.users.deleted = 0;`;
  },
  getAllUsers: () => {
    return `SELECT inventory.users.userId, inventory.users.email, inventory.users.name, inventory.users.createdAt, inventory.users.permission FROM inventory.users WHERE inventory.users.deleted = 0;`;
  },
};
module.exports = users;
