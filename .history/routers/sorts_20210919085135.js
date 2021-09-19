const express = require(`express`);
const router = express.Router();
const service = require("../services/sortService");

router.post("/addsort", service.add);
router.delete("/delsort", service.del);
router.post("/upsort", service.up);
router.get("/getsort", service.get);

module.exports = router;
