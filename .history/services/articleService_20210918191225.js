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
        msg: "文章创建成功",
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
        msg: "文章创建失败",
        data: null,
      });
    }
  }
}

function del(req, res, next) {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    const [{ msg }] = err.errors;
    next(boom.badRequest(msg));
  } else {
    console.log(req.query.id);
    articleModel.deleteOne({ _id: req.query.id }, function (err) {
      if (err) {
        res.json({
          code: CODE_ERROR,
          msg: "文章删除失败",
          data: {
            error: err,
          },
        });
        // console.log(err);
      } else {
        res.json({
          code: CODE_SUCCESS,
          msg: "文章删除成功",
          data: {
            id: id,
          },
        });
      }
      // console.log('删除成功');
    });
  }
}
function up(req, res, next) {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    const [{ msg }] = err.errors;
    next(boom.badRequest(msg));
  } else {
  }
}
function get(req, res, next) {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    const [{ msg }] = err.errors;
    next(boom.badRequest(msg));
  } else {
  }
}

module.exports = {
  add,
  del,
  up,
  get,
};
