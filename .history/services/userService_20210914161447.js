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
  console.log(userData);
}

function register(req, res, next) {
  res.send("hi");
  let userData = req.body;
  // userModel.findOne(userData.user);
  const insertObj = new userModel(userData);
  insertObj
    .save()
    .then((res) => {
      console.log(res);
      res.send({
        meta: {
          user: userData.user,
          pwd: userData.pwd,
          msg: "注册成功",
        },
      });
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
}

module.exports = {
  login,
  register,
};
