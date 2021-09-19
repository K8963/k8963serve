const boom = require("boom");
const sillyDate = require("silly-datetime");
const marked = require("marked");
const { articleModel } = require("../utils/db");
const { body, validationResult } = require("express-validator");
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
    articleBody.created_at = sillyDate.format(
      new Date(),
      "YYYY-MM-DD HH:mm:ss"
    );
    articleBody.content_html = marked(articleBody.content_md);
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
          title: articleBody.title,
          author: articleBody.author,
          sort: articleBody.sort,
          tag: articleBody.tag,
          created_at: articleBody.created_at,
        },
      });
    } else {
      res.json({
        code: CODE_ERROR,
        msg: "注册失败",
        data: null,
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
