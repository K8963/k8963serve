const express = require(`express`);
const router = express.Router();
const service = require("../services/articleService");

router.post("/addarticle", service.add);

module.exports = router;
