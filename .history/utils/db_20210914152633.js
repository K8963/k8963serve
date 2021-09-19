const mongoose = require("mongoose");
const config = require("../db/dbConfig");

function connect() {
  const { host, port, password, database } = config;
  return mongoose.createConnection(
    host + port,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
      if (err) {
        console.log(err);
      }
      console.log("连接成功");
    }
  );
}
