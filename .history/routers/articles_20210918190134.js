const express = require(`express`);
const router = express.Router();
const service = require("../services/articleService");

router.post("/addarticle", service.add);
router.delete("/delarticle", service.del);
router.post("/uparticle", service.up);
router.get("/getarticle", service.get);

module.exports = router;
