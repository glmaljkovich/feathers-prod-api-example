# Dummy service

By default feathers enables all CRUD operations on every endpoint.
You can see an example of how to disable a specific REST method trough hooks in `dummies.hooks`
using `methodDisabled` from our custom `utils/hooks`

You also need to blacklist the method in the swagger documentation for the service.
For this you must set `operations.remove: false`
