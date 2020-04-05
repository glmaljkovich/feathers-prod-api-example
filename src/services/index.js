const dummies = require('./dummies/dummies.service.js');
const users = require('./users/users.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(dummies);
  app.configure(users);
};
