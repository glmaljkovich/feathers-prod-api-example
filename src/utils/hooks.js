const errors = require('@feathersjs/errors');

module.exports = {
  
  methodDisabled(context){
    throw new errors.MethodNotAllowed(`${context.method} method not allowed on this resource.`);
  }
}
