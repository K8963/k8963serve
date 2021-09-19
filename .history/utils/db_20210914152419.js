const mongoose = require("mongoose");
const config = require("../db/dbConfig");
const db = mongoose.createConnection(
  "mongodb://localhost:27017/todolist",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log(err);
    }
    console.log("连接成功");
  }
);
