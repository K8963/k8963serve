const boom = require("boom");
const { sortModel } = require("../utils/db");
const { body, validationResult } = require("express-validator");
const {
  CODE_ERROR,
  CODE_SUCCESS,
  PRIVATE_KEY,
  JWT_EXPIRED,
} = require("../utils/constant");

const add = (req, res, next) => {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    const [{ msg }] = err.errors;
    next(boom.badRequest(msg));
  } else {
    const sortBody = req.body;
    const insertObj = new sortModel(sortBody);
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
        msg: "分类创建成功",
        data: {
          name: sortBody.name,
        },
      });
    } else {
      res.json({
        code: CODE_ERROR,
        msg: "分类创建失败",
        data: null,
      });
    }
  }
};

const del = (req, res, next) => {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    const [{ msg }] = err.errors;
    next(boom.badRequest(msg));
  } else {
    const id = req.query.id;
    articleModel.deleteOne({ _id: id }, function (err) {
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
    });
  }
};

const up = (req, res, next) => {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    const [{ msg }] = err.errors;
    next(boom.badRequest(msg));
  } else {
  }
};

const get = (req, res, next) => {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    const [{ msg }] = err.errors;
    next(boom.badRequest(msg));
  } else {
  }
};

module.exports = {
  add,
  del,
  up,
  get,
};