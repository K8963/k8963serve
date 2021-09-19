const express = require(`express`);

const userRouter = require("./users");

const router = express.Router();

const { body } = require("express-validator");

// 登录/注册校验
const vaildator = [
  body("user").isString().withMessage("用户名类型错误"),
  body("pwd").isString().withMessage("密码类型错误"),
];

router.post("/api/v1/login", mainController.login);
router.post("/api/v1/register", mainController.register);
