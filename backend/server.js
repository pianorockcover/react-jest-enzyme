const express = require("express");
const news = require("./news");

const app = express();

const setHeaders = (_, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");
    next();
}

app.use(setHeaders, news);

const PORT = 8001;

app.listen(PORT, () => console.log(`Server has been started on port ${PORT}`));
