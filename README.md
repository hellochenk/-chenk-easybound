
## easybound my node cli

- <del>实现demo</del>
- <del>编译react</del>
- <del>编译简易ts</del>
- 编译ng
- 编译node

### 项目结构：
```
+src
 +projectName
  -index.js //入口文件
  -index.html //html模板
config.js
```

在config.js 中要配置项目名称：
```javascript
module.exports = {
  port: 1234,
  apps: ['projectName'], //必须配置且与src下的项目名一致
  lang: 'js' // 默认js, 目前只支持 js 和 ts
}
```
