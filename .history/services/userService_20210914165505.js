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
    const [{ msg }] = err.errors;
    // 抛出错误，交给我们自定义的统一异常处理程序进行错误返回
    next(boom.badRequest(msg));
  } else {
    let { user, pwd } = req.body;
    pwd = md5(pwd);
    userModel.findOne({ user: user }, "pwd").then((rsUser) => {
      if (rsUser) {
        // console.log(rsUser);
        if (pwd == rsUser.pwd) {
          const token = jwt.sign(
            // payload：签发的 token 里面要包含的一些数据。
            {},
            // 私钥
            PRIVATE_KEY,
            // 设置过期时间
            { expiresIn: JWT_EXPIRED }
          );
          res.json({
            code: CODE_SUCCESS,
            msg: "登录成功",
            data: {
              user: user,
              pwd: pwd,
              token: token,
            },
          });
        } else {
          res.json({
            code: CODE_ERROR,
            msg: "密码不正确",
            data: null,
          });
        }
      } else {
        res.json({
          code: CODE_ERROR,
          msg: "用户不存在",
          data: null,
        });
        return false;
      }
    });
  }
}

function register(req, res, next) {
  if (!err.isEmpty()) {
    const [{ msg }] = err.errors;
    // 抛出错误，交给我们自定义的统一异常处理程序进行错误返回
    next(boom.badRequest(msg));
  } else {
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
}

module.exports = {
  login,
  register,
};
