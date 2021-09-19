# 前言

NodeJS后端接口开发基于Node.js+Express+Mongodb实现RESTFUL API。

接口包括：登录、注册、文章分类标签（CRUD）

虽然功能场景单一，但作为一个新手博客功能比较齐全，适合新手全栈项目练习。

# 目录

```
│  app.js                              // 入口文件
│  package.json                       // npm包管理所需模块及配置信息
├─db
│      dbConfig.js                    // mongodb数据库基础配置
├─routes
│      index.js                       // 初始化路由信息，自定义全局异常处理
│      users.js                       // 用户路由模块
│      articles.js                    // 文章路由模块
│      sorts.js                       // 分类路由模块
│      tags.js                       	// 标签路由模块
├─services
│      userService.js                 // 业务逻辑处理 - 用户相关接口
│      articleService.js              // 业务逻辑处理 - 文章相关接口
│      sortService.js                 // 业务逻辑处理 - 分类相关接口
│      tagService.js                  // 业务逻辑处理 - 标签相关接口
└─utils
        constant.js                   // 自定义常量
        db.js                         // 封装连接mongodb模块、model模块
        md5.js                        // 封装md5方法
        user-jwt.js                   // jwt-token验证和解析函数
```

# 技术栈

 * NodeJS v14
 * express
 * mongodb
 * jwt
 * nodemon
 * cors
 * boom

# 功能

* 登录（登出）
* 注册
* 文章 CRUD
* 分类 CRUD
* 标签 CRUD

# 运行项目

下载安装依赖

```
git@github.com:K8963/k8963serve.git
npm i	或	yarn
```

`db/dbConfig.js` 配置mongodb，运行

```
node app.js	或者 nodemon app.js
```

