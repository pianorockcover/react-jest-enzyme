const Router = require("express");
const data = require("./data.json");

const router = Router();

router.get("/news", (req, res) => res.end(JSON.stringify(data)));

module.exports = router;