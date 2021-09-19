const jwt = require("jsonwebtoken");
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
}
module.exports = {
  login,
};
