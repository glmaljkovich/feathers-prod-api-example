// Initializes the `users` service on path `/users`
const { Users } = require('./users.class');
const createModel = require('../../models/users.model');
const hooks = require('./users.hooks');
const m2s = require('mongoose-to-swagger');
const {requestRef, responseRef} = require("../../utils/swagger");

module.exports = function (app) {
  const userModel = createModel(app);
  const options = {
    Model: userModel,
    paginate: app.get('paginate')
  };
  const userService = new Users(options, app);

  userService.docs = {
    description: 'A user potato',
    idType: "string",
    model: "user",
    definitions: {
      user: m2s(userModel),
      user_list: {
        type: 'array',
        items: {
          $ref: '#/definitions/user'
        }
      },
      user_payload: {
        title: "User Payload",
        required: ["username", "email", "password"],
        properties: {
          username: {type: "string", example: "h4ck3r"},
          email: {type: "string", example: "ladiesman217@somemail.com"},
          password: {type: "string", example: "sUp3RS3Cur3P4455"},
        }
      }
    },
    refs: {
      ...requestRef(["CREATE", "UPDATE", "PATCH"], "user_payload")
    }
  };
  // Initialize our service with any options it requires
  app.use('/users', userService);

  // Get our initialized service so that we can register hooks
  const service = app.service('users');

  service.hooks(hooks);
};
