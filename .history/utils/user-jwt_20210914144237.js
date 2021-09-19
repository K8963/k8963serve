const jwt = require("express-jwt");

const jwtAuth = expressJwt({
  // 设置密钥
  secret: PRIVATE_KEY,
  // 设置算法
  algorithms: ["HS256"],
  // 是否开启验证
  credentialsRequired: true,
  // 自定义获取token函数
  getToken: (req) => {
    if (req.headers.authorization) {
      return req.headers.authorization;
    } else if (req.query && req.query.token) {
      return req.query.token;
    }
  },
  // 设置token认证白名单
}).unless({
  path: ["/api/login"],
});
