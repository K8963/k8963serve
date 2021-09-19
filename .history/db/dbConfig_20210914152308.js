const mydb = {
  host: "mongodb://localhost", // 主机名称，一般是本机
  port: "27017", // 数据库的端口号，如果不设置，默认是3306
  database: "k8963db", // 创建的数据库
  connectTimeout: 5000, // 连接超时
  user: "root", // 创建数据库时设置用户名
  password: "123456", // 创建数据库时设置的密码
};

module.exports = mydb;
