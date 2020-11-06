// Entry point for the app

// Express is the underlying that atlassian-connect-express uses:
// https://expressjs.com
express = require('express');

// https://expressjs.com/en/guide/using-middleware.html
bodyParser = require('body-parser');
compression = require('compression');
cookieParser = require('cookie-parser');
errorHandler = require('errorhandler');
morgan = require('morgan');

// atlassian-connect-express also provides a middleware
ace = require('atlassian-connect-express');

// Use Handlebars as view engine:
// https://npmjs.org/package/express-hbs
// http://handlebarsjs.com

hbs = require('express-hbs');
json = require('hbs-json');
hbs.registerHelper('json', json);

// We also need a few stock Node modules
http = require('http');
path = require('path');
os = require('os');
helmet = require('helmet');
nocache = require('nocache');
fs = require('fs');

// Routes live here; this is the C in MVC
routes = require('./routes');

// Bootstrap Express and atlassian-connect-express
const app = express();
const addon = ace(app);

// See config.json
const port = addon.config.port();
app.set('port', port);

// Log requests, using an appropriate formatter by env
const devEnv = app.get('env') === 'development';
app.use(morgan(devEnv ? 'dev' : 'combined'));

// Configure Handlebars
const viewsDir = path.join(__dirname, 'views');
const handlebarsEngine = hbs.express4({partialsDir: viewsDir});
app.engine('hbs', handlebarsEngine);
app.set('view engine', 'hbs');
app.set('views', viewsDir);

// Atlassian security policy requirements
// http://go.atlassian.com/security-requirements-for-cloud-apps
// HSTS must be enabled with a minimum age of at least one year
app.use(helmet.hsts({
  maxAge: 31536000,
  includeSubDomains: false
}));
app.use(helmet.referrerPolicy({
  policy: ['origin']
}));

// Include request parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

// Gzip responses when appropriate
app.use(compression());

// Include atlassian-connect-express middleware
app.use(addon.middleware());


// Wire up routes
routes(app, addon);

// Mount the static files directory
const staticDir = path.join(__dirname, 'public');
console.log(staticDir)
app.use(express.static(staticDir));

// Atlassian security policy requirements
// http://go.atlassian.com/security-requirements-for-cloud-apps
app.use(nocache());

// Show nicer errors in dev mode
if (devEnv) app.use(errorHandler());

// Boot the HTTP server
http.createServer(app).listen(port, () => {
  console.log('App server running at http://' + os.hostname() + ':' + port);

  // Enables auto registration/de-registration of app into a host in dev mode
  if (devEnv) addon.register();
});
