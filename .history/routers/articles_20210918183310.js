const express = require(`express`);
const router = express.Router();
const service = require("../services/articleService");

router.post("/addarticle", service.add);
router.post("/addarticle", service.del);
router.post("/addarticle", service.up);
router.post("/addarticle", service.get);

module.exports = router;
