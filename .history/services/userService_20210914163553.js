const { userModel } = require("../utils/db");
const jwt = require("jsonwebtoken");
const md5 = require("../utils/md5");
const boom = require("boom");
const {
  CODE_ERROR,
  CODE_SUCCESS,
  PRIVATE_KEY,
  JWT_EXPIRED,
} = require("../utils/constant");
const { decode } = require("../utils/user-jwt");

function login(req, res, next) {
  res.send("hi");
  let userData = req.body;
  userModel.findOne({ user: userData.user }, "pwd").then((user) => {
    if (user) {
      res.json({
        code: CODE_SUCCESS,
        msg: "登录成功",
        data: {
          token,
          userData,
        },
      });
    } else {
      res.json({
        msg: "用户不存在",
      });
      return false;
    }
  });
}

function register(req, res, next) {
  let userData = req.body;
  userModel.findOne({ user: userData.user }, "pwd").then((user) => {
    if (user) {
      res.json({
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
          user: userData.user,
          pwd: userData.pwd,
          msg: "注册成功",
        });
      } else {
        res.json({
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
