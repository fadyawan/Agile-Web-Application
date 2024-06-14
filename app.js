const express = require('express');
const app = express();

const port = process.env.PORT || '8900';

app.use(express.json());
app.set('port', port)
app.listen(port);

module.exports = app;