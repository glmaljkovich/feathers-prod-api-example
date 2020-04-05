// Initializes the `dummy` service on path `/dummy`
const { Dummy } = require('./dummies.class');
const createModel = require('../../models/dummies.model');
const hooks = require('./dummies.hooks');
const m2s = require('mongoose-to-swagger');
function removeIdAndRename(model, title){
  model.title = title
  delete model.properties._id;
  return model
}
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
      dummy_create: removeIdAndRename(m2s(model))
    },
    refs: {
      createRequest: "dummy_create"
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
