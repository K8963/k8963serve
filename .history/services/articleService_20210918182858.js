const { articleModel } = require("../utils/db");
const {
  CODE_ERROR,
  CODE_SUCCESS,
  PRIVATE_KEY,
  JWT_EXPIRED,
} = require("../utils/constant");

function add(req, res, next) {
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
}

module.exports = {
  add,
};
