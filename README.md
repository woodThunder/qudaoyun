渠道云工作台前端工程

# 运行方式

- 安装 nodejs [下载](https://nodejs.org/en/)
- 安装 yarn [下载](https://yarnpkg.com/zh-Hans/)
- 安装依赖（进入工程所在目录）

```
$ yarn
```

- 修改代理配置 `devserver/config.js`
- 启动服务（进入工程所在目录）

```
$ yarn start
```

- 访问 http://localhost/wbalone/index.html
- 点击请先登录，使用服务器端的工作台账号（管理员 `admin` , 默认密码 `123456a`）
- 打包发布（进入工程所在目录）

```
$ yarn run build
```

- 部分 yarn 脚本命令

```
$ yarn 重新安装全部依赖
$ yarn add [-dev] 新增依赖[开发依赖]
$ yarn start 启动服务
$ yarn run build 构建打包
$ yarn run xxx 运行 package.json 中脚本 xxx
```

# 更换菜单图标库

- 将图标库下载后，替换到 occ/occ-portal-static/src/wbalone/fonts/iuap_qy 里，并且将 iconfont.css 里的第十行.iconfont{ 改为.qy-iconfont {
