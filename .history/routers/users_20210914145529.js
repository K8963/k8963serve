const express = require(`express`);
const { jwtAuth } = require("../utils/user-jwt");
const userRouter = require("./users");

const router = express.Router();

router.post("/api/v1/login", mainController.login);
router.post("/api/v1/register", mainController.register);
