const mongoose = require("mongoose");
const config = require("../db/dbConfig");
const db = mongoose.createConnection(
  "mongodb://localhost:27017/todolist",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log(err);
    }
    console.log("θΏζ₯ζε");
  }
);
function connect() {
  const { host, user, password, database } = config;
  return mysql.createConnection({
    host,
    user,
    password,
    database,
  });
}
