const mongoose = require("mongoose");
const config = require("../db/dbConfig");
function connect() {
  const { host, user, password, database } = config;
  return mongoose.createConnection(
    "mongodb://localhost:27017/todolist",
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
      if (err) {
        console.log(err);
      }
      console.log("θΏζ₯ζε");
    }
  );
