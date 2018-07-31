## 本地开发登录问题解决办法
hosts 里添加
```
127.0.0.1	dev.ship.test.mycrudeoil.com
```
浏览器地址

dev.ship.test.mycrudeoil.com:9527


## 本地开发后端请求代理设置
./config/index.js

```
proxyTable: {
  "/api": {
  "target": "http://ship.test.mycrudeoil.com",
  "changeOrigin": true,
  "secure": false
  },
  "/sysShip": {
    "target": "http://ship.test.mycrudeoil.com",
    "changeOrigin": true,
    "secure": false
  }
}
```
## 第三方非npm安装文件入口设置

./build/webpack.base.conf.js

在 entry > depend 里添加既可
```
entry: {
  depend: [
    './src/lib/leaflet/leaflet.js',
    './src/lib/leaflet/leaflet.canvas-markers.js',
    './src/lib/leaflet/leaflet.polylineDecorator.js',
    './src/lib/leaflet/leaflet.markercluster-src.js'
  ],
  app: './src/main.js'
},
```


## 开发
```bash
# 克隆项目
git clone

# 安装依赖
npm install
   
# 建议不要用cnpm安装 会有各种诡异的bug 可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev
```
浏览器访问 http://localhost:9527 http://dev.ship.test.mycrudeoil.com:9527

## 发布
```bash
# 构建测试环境
npm run build:sit

# 构建生成环境
npm run build:prod
```

## 其它
```bash
# --report to build with bundle size analytics
npm run build:prod --report

# --preview to start a server in local to preview
npm run build:prod --preview

# lint code
npm run lint

# auto fix
npm run lint -- --fix
```
