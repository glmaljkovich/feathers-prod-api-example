const path = require('path');
const favicon = require('serve-favicon');
const compress = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const logger = require('./logger');

const feathers = require('@feathersjs/feathers');
const configuration = require('@feathersjs/configuration');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');
const swagger = require('feathers-swagger');


const middleware = require('./middleware');
const services = require('./services');
const appHooks = require('./app.hooks');

const mongoose = require('./mongoose');

const authentication = require('./authentication');

const app = express(feathers());

// Load app configuration
app.configure(configuration());
// Enable security, CORS, compression, favicon and body parsing
app.use(helmet());
app.use(cors());
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(favicon(path.join(app.get('public'), 'favicon.ico')));
// Host the public folder
app.use('/', express.static(app.get('public')));

// Set up Plugins and providers
app.configure(express.rest());
app.configure(socketio());

app.configure(mongoose);

// set up logging
app.use(morgan('dev'))

// set up documentation
app.configure(swagger({
  docsPath: '/docs/swagger',
  uiIndex: true,
  specs: {
    info: {
      title: 'Example API',
      description: 'A description',
      version: '1.0.0'
    },
  }
}));
// redoc
app.use("/docs", (req, res) => {
  res.redirect("/docs.html")
})

// Configure other middleware (see `middleware/index.js`)
app.configure(middleware);
app.configure(authentication);
// Set up our services (see `services/index.js`)
app.configure(services);

// Configure a middleware for 404s and the error handler
app.use(express.notFound());
app.use(express.errorHandler({ logger }));

app.hooks(appHooks);

module.exports = app;
