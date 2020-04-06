// Initializes the `dummy` service on path `/dummy`
const { Dummy } = require('./dummies.class');
const createModel = require('../../models/dummies.model');
const hooks = require('./dummies.hooks');
const {requestRef, responseRef} = require("../../utils/swagger");
const m2s = require('mongoose-to-swagger');

module.exports = function (app) {
  const model = createModel(app);
  const options = {
    Model: model,
    paginate: app.get('paginate')
  };
  const dummyService = new Dummy(options, app);
  console.log(m2s(model));
  dummyService.docs = {
    description: 'A dummy potato',
    model: "dummy",
    definitions: {
      dummy: m2s(model),
      dummy_list: {
        type: 'array',
        items: {
          $ref: '#/definitions/dummy'
        }
      },
      dummy_payload: {
        title: "Dummy request payload",
        required: ["text"],
        properties: {text: {type: "string", example: "Nonsense"}}
      }
    },
    refs: {
      ...requestRef(["CREATE", "UPDATE", "PATCH"], "dummy_payload")
    },
    operations: {
      remove: false
    }
  };

  // Initialize our service with any options it requires
  app.use('/dummies', dummyService);

  // Get our initialized service so that we can register hooks
  const service = app.service('dummies');
  service.hooks(hooks);
};
