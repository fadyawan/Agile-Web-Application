const express = require('express');
const app = express();

const port = process.env.PORT || '8900';
const skillAssigmentRouter = require('./routes/skillAssignment');
const utilities = require('./utilities/utility');

app.use(express.json());
app.set('port', port)
app.listen(port);



app.use("/api/skillAssignment",skillAssigmentRouter);
app.use('/skills', skillRoutes);

app.use((req, res) =>
    utilities.formatErrorResponse(res,400,
        "End point not recognised"));




module.exports = app;