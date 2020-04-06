const METHODS = ["CREATE", "UPDATE", "REMOVE", "GET", "PATCH", "FIND"]

module.exports = {
  responseRef(methods, reference){
    refs = {}
    for (const method of methods) {
      if (METHODS.includes(method.toUpperCase())) {
        refs[`${method.toLowerCase()}Response`] = reference
      }
    }
    return refs
  },
  requestRef(methods, reference){
    refs = {}
    for (const method of methods) {
      if (METHODS.includes(method.toUpperCase())) {
        refs[`${method.toLowerCase()}Request`] = reference
      }
    }
    return refs
  }
}
