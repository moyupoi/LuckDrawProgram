# LuckDrawProgram

## 依赖

- Vue
- Babel
- Webpack
- [WePY](https://tencent.github.io/wepy/)

## 常用操作

#### 如何运行？

```
$ 拷贝API文件
$ cp config.js
执行如下命令：
$ npm install
```

#### 开启实时编译
```
$ wepy build --watch
```

#### 如何运行测试？
```
npm test
```
#### 如何开发一个功能页面

 - 整体目录结构如下：

```
├── dist                   小程序运行代码目录（该目录由WePY的build指令自动编译生成，请不要直接修改该目录下的文件）
├── node_modules           
├── src                    代码编写的目录（该目录为使用WePY后的开发目录）
|   ├── components         WePY组件目录（组件不属于完整页面，仅供完整页面或其他组件引用）
|   |   ├── com_a.wpy      可复用的WePY组件a
|   |   └── com_b.wpy      可复用的WePY组件b
|   ├── pages              WePY页面目录（属于完整页面）
|   |   ├── index.wpy      index页面（经build后，会在dist目录下的pages目录生成index.js、index.json、index.wxml和index.wxss文件）
|   |   └── other.wpy      other页面（经build后，会在dist目录下的pages目录生成other.js、other.json、other.wxml和other.wxss文件）
|   └── app.wpy            小程序配置项（全局数据、样式、声明钩子等；经build后，会在dist目录下生成app.js、app.json和app.wxss文件）
└── package.json           项目的package配置
```


```
├── home            首页 奖品列表页
├── luckDraw        奖品详情页 抽奖页
├── personalCenter  个人中心 我参加的抽奖、中奖纪录、收货地址
├── past            我参与过的抽奖页 待开奖、已结束
├── prize           中/未中奖展示页、分享页、通过通知点进去展示页
├── record          中过奖的记录页
├── portraitList    头像列表
```

具体代码参照已实现的WePY


## 常见问题（收集中）
