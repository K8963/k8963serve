const mongoose = require("mongoose");
const sillyDate = require("silly-datetime");
const config = require("../db/dbConfig");

function connect() {
  const { host, database } = config;
  return mongoose.createConnection(
    host + "/" + database,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
      if (err) {
        console.log(err);
      }
      console.log("数据库连接成功");
    }
  );
}
// 创建用户模型：用户名、创建日期
const userModel = connect().model("Users", {
  date: {
    type: String,
    default: sillyDate.format(new Date(), "YYYY-MM-DD HH:mm:ss"),
  },
  user: { type: String },
  pwd: { type: String },
});

// 创建文章模型：id,标题，简介，作者，内容（md），内容（html），
const articleModel = connect().model("Articles", {
  date: {
    type: String,
    default: sillyDate.format(new Date(), "YYYY-MM-DD HH:mm:ss"),
  },
  sort{},
  user: { type: String },
  pwd: { type: String },
});

module.exports = {
  userModel,
  articleModel,
};
