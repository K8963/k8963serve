const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const app = express();
const routers = require("./routers");

// 解析json格式
app.use(bodyParser.json());
// 解析form表单提交的数据 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// cors 解决跨域
app.use(cors());
// 注册路由
app.use("/", routers);
app.listen("8088", () => {
  console.log("http://");
});
