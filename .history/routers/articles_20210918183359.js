const express = require(`express`);
const router = express.Router();
const service = require("../services/articleService");

router.post("/addarticle", service.add);
router.delete("/addarticle", service.del);
router.post("/addarticle", service.up);
router.get("/addarticle", service.get);

module.exports = router;
