const boom = require("boom");
const { tagModel } = require("../utils/db");
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
    const insertObj = new tagModel(sortBody);
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
        msg: "标签创建成功",
        data: {
          name: sortBody.name,
        },
      });
    } else {
      res.json({
        code: CODE_ERROR,
        msg: "标签创建失败",
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
      tagModel.deleteOne({ _id: id }, (err) => {
        if (err) {
          res.json({
            code: CODE_ERROR,
            msg: "标签删除失败",
            data: {
              error: err,
            },
          });
        } else {
          res.json({
            code: CODE_SUCCESS,
            msg: "标签删除成功",
            data: {
              id: id,
            },
          });
        }
      });
    } else {
      res.json({
        code: CODE_ERROR,
        msg: "未找到目标项",
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
    if (req.body) {
      const newName = req.body;
      const id = { _id: newName.id };
      const result = tagModel.updateOne(id, newName, {}, (err, data) => {
        if (err) {
          // console.log(err);
        }
        if (data) {
          // console.log(data);
        }
      });
      if (result) {
        res.json({
          code: CODE_SUCCESS,
          msg: "标签修改成功",
          data: {
            name: newName.name,
          },
        });
      } else {
        res.json({
          code: CODE_ERROR,
          msg: "标签修改失败",
          data: null,
        });
      }
    } else {
      res.json({
        code: CODE_ERROR,
        msg: "未找到目标项",
        data: null,
      });
    }
  }
};

const get = async (req, res, next) => {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    const [{ msg }] = err.errors;
    next(boom.badRequest(msg));
  } else {
    let findId;
    if (req.query.id) {
      findId = { _id: req.query.id };
    } else {
      findId = null;
    }
    const result = await tagModel
      .find(findId)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
        return [];
      });
    if (result) {
      console.log(result);
      res.json({
        code: CODE_SUCCESS,
        msg: "标签查询成功",
        data: {
          result,
        },
      });
    } else {
      res.json({
        code: CODE_ERROR,
        msg: "标签查询失败",
        data: null,
      });
    }
  }
};

module.exports = {
  add,
  del,
  up,
  get,
};
