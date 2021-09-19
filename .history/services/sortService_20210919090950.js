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
    if (req.query.id) {
      const id = req.query.id;
      sortModel.deleteOne({ _id: id }, (err) => {
        if (err) {
          res.json({
            code: CODE_ERROR,
            msg: "分类删除失败",
            data: {
              error: err,
            },
          });
        } else {
          res.json({
            code: CODE_SUCCESS,
            msg: "分类删除成功",
            data: {
              id: id,
            },
          });
        }
      });
    } else {
      res.json({
        code: CODE_ERROR,
        msg: "未找到删除项",
        data: null,
      });
    }
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
