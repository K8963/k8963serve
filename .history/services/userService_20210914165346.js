const { userModel } = require("../utils/db");
const jwt = require("jsonwebtoken");
const md5 = require("../utils/md5");
const { body, validationResult } = require("express-validator");
const boom = require("boom");
const {
  CODE_ERROR,
  CODE_SUCCESS,
  PRIVATE_KEY,
  JWT_EXPIRED,
} = require("../utils/constant");

function login(req, res, next) {
  const err = validationResult(req);
  if (!err.isEmpty()) {
  } else {
  }
}

function register(req, res, next) {
  let userData = req.body;
  userData.pwd = md5(userData.pwd);
  userModel.findOne({ user: userData.user }, "pwd").then((user) => {
    if (user) {
      res.json({
        code: CODE_ERROR,
        msg: "用户名存在",
      });
      return false;
    } else {
      const insertObj = new userModel(userData);
      const result = insertObj
        .save()
        .then((rs) => {
          return rs;
        })
        .catch((err) => {
          console.log(err);
          return false;
        });
      if (result) {
        res.json({
          code: CODE_SUCCESS,
          user: userData.user,
          pwd: userData.pwd,
          msg: "注册成功",
        });
      } else {
        res.json({
          code: CODE_ERROR,
          msg: "注册失败",
        });
      }
    }
  });
}

module.exports = {
  login,
  register,
};
