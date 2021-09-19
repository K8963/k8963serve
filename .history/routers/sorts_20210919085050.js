const express = require(`express`);
const router = express.Router();
const service = require("../services/sortService");

router.post("/addarticle", service.add);
router.delete("/delarticle", service.del);
router.post("/uparticle", service.up);
router.get("/getarticle", service.get);

module.exports = router;
