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

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === 'user' && password === 'pass') {
        res.status(200).json({ message: 'Login successful!' });
    } else {
        res.status(401).json({ message: 'Invalid username or password.' });
    }
});

app.use((req, res) =>
    utilities.formatErrorResponse(res, 400, "End point not recognised")
);

module.exports = app;
