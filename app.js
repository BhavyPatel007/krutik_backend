const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/db');
const fileRouter = require('./router/router');

const cors = require('cors')


const app = express();
const PORT = 3001;

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', fileRouter);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
