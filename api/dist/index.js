"use strict";
const express = require("express");
const cors = require("cors");
const apiRouter = require('./router');
const bodyParser = require('body-parser');
const app = express();
const PORT = 8080;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use('/api', apiRouter);
app.listen(PORT, () => {
    console.log("SERVER IS RUNNING ON http://localhost:" + PORT);
});
//# sourceMappingURL=index.js.map