const { articleModel } = require("../utils/db");
const { body, validationResult } = require("express-validator");
const boom = require("boom");
const {
  CODE_ERROR,
  CODE_SUCCESS,
  PRIVATE_KEY,
  JWT_EXPIRED,
} = require("../utils/constant");

function add(req, res, next) {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    const [{ msg }] = err.errors;
    // 抛出错误，交给我们自定义的统一异常处理程序进行错误返回
    next(boom.badRequest(msg));
  } else {
    // console.log(req.body);
    const articleBody = req.body;
    const insertObj = new articleModel(articleBody);
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
        msg: "Article created successfully",
        data: {
          articleBody,
        },
      });
    }
  }
}

function del(req, res, next) {}
function up(req, res, next) {}
function get(req, res, next) {}

module.exports = {
  add,
  del,
  up,
  get,
};
