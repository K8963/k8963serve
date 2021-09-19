const express = require(`express`);
const router = express.Router();
const service = require("../services/tagService");

router.post("/addtag", service.add);
router.delete("/deltag", service.del);
router.post("/uptag", service.up);
router.get("/gettag", service.get);

module.exports = router;
