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

/* 
  创建文章模型：
   标题，简介，作者，内容（md），内容（html），分类，标签，
   创建时间、更新时间 
*/
const articleModel = connect().model("Articles", {
  title: { type: String },
  outline: { type: String },
  author: { type: String },
  content_md: { type: String },
  content_html: { type: String },
  tag: { type: String },
  sort: { type: String },
  created_at: {
    type: String,
    default: sillyDate.format(new Date(), "YYYY-MM-DD HH:mm:ss"),
  },
  updated_at: {
    type: String,
    default: sillyDate.format(new Date(), "YYYY-MM-DD HH:mm:ss"),
  },
});

module.exports = {
  userModel,
  articleModel,
};
