const express = require('express');
const app = express();
const logger = require('morgan');
const helmet = require('helmet');

const port = process.env.PORT || '8900';
const skillAssignmentRouter = require('./routes/skillAssignment');
const skillCategoryRouter = require('./routes/skillCategory');
const skillLevelRouter = require('./routes/skillLevel');
const systemRoleRouter = require('./routes/systemRole');
const userRouter = require('./routes/user');
const skillRouter = require('./routes/skill');
const staffAssignmentRouter = require('./routes/staffAssignment');

const utilities = require('./utilities/utility');

const session = require('express-session');

app.use(session({
    secret: process.env.SESSION_SECRET || 'default_secret_key',
    resave: false,
    saveUninitialized: true,
  }));

app.use(helmet());
app.use(helmet.hsts({ maxAge: 31536000, includeSubDomains: true }));
app.use(helmet.frameguard({ action: 'deny' }));
app.use(helmet.xssFilter());
app.use(helmet.noSniff());
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", 'https:', "'unsafe-inline'"],
        imgSrc: ["'self'", 'data:', 'https:'],
        connectSrc: ["'self'", 'https:'],
        fontSrc: ["'self'", 'https:', 'data:'],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
    },
})); 

app.use(express.json());
app.use(logger('dev'));
app.set('port', port);
app.listen(port);

app.use("/api/skillAssignment", skillAssignmentRouter);
app.use("/api/skillCategory", skillCategoryRouter);
app.use("/api/skillLevel", skillLevelRouter);
app.use("/api/systemRole", systemRoleRouter);
app.use("/api/user", userRouter);
app.use("/api/skill", skillRouter);
app.use("/api/staffAssignment", staffAssignmentRouter);

app.use((req, res) =>
    utilities.formatErrorResponse(res, 400, "End point not recognised")
);

module.exports = app;
