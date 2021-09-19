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
  let { user, pwd } = req.body;
  userModel.findOne({ user: user }, "pwd", "user").then((rsUser) => {
    if (!rsUser || rsUser.length === 0) {
      res.json({
        code: CODE_ERROR,
        msg: "用户名或密码错误",
        data: null,
      });
    } else {
      res.json({
        code: CODE_SUCCESS,
        msg: "登录成功",
        data: {
          rsUser,
        },
      });
      // const token = jwt.sign(
      //   // payload：签发的 token 里面要包含的一些数据。
      //   {},
      //   // 私钥
      //   PRIVATE_KEY,
      //   // 设置过期时间
      //   { expiresIn: JWT_EXPIRED }
      // );
    }

    // if (user) {
    //   console.log(user);
    //   if (userData == user.pwd) {
    //     // res.json({
    //     //   code: CODE_SUCCESS,
    //     //   msg: "登录成功",
    //     //   data: {
    //     //     token,
    //     //     userData,
    //     //   },
    //     // });
    //   }
    // } else {
    //   res.json({
    //     msg: "用户不存在",
    //   });
    //   return false;
    // }
  });
}

function register(req, res, next) {
  let userData = req.body;
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
