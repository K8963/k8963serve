const express = require(`express`);
const router = express.Router();
const { jwtAuth } = require("../utils/user-jwt");

const userRouter = require("./users");
router.use(jwtAuth);
