[TOC]

# redux 状态管理

### redux 的基本使用

1. 安装redux

   ```npm i redux —save```

2. 新建store

   通过reducer建立，根据老的state和action (action.type) ,生成新的 state

   ![image-20180506112929170](https://github.com/ijzn/react-job/blob/master/img/redux1.png) 

   ​

   ![img](https://github.com/ijzn/react-job/blob/master/img/redux2.png)

   ​

   ​

---

### react和redux的结合使用

* redux 只是同步的，处理异步的需要  redux-thunk 插件
  * ```npm i redux-thunk —save``` 
  * 使用 applyMiddleware 开启 thunk 中间件
  * Action可以返回函数，使用dispatch提交action

![react-thunk](https://github.com/ijzn/react-job/blob/master/img/redux6.PNG)

![react-thunk2](https://github.com/ijzn/react-job/blob/master/img/redux7.png)

![react-thunk3](https://github.com/ijzn/react-job/blob/master/img/redux8.png)



* 下载调试工具，并开启。

  * Chrome搜索 Redux DevTools 安装
  * 新建store的时候判断window.devToolsExtension
  * 调试窗的redux选项卡，实时看到state

  ![调试器](https://github.com/ijzn/react-job/blob/master/img/redux10.png)

  ![调试器2](https://github.com/ijzn/react-job/blob/master/img/redux11.png)

  ​

  ​

* 使用 react-redux 连接 react 和 redux

  * ```npm install react-redux --save ```   
  * 忘记subscribe，记住reducer，action和dispatch即可
  * React-redux提供Provider和connect两个接口来链接

  ​

* React-redux具体使用

  * Provider组件在应用最外层，传入store即可，只用一次
  * Connect负责从外部获取组件需要的参数
  * Connect可以用装饰器的方式来写


![react-redux](https://github.com/ijzn/react-job/blob/master/img/react-redux1.png)

![react-redux2](https://github.com/ijzn/react-job/blob/master/img/react-redux2.png)





* 使用装饰器优化connect代码

  * Npm run eject弹出个性化配置

  * Npm install babel-plugin-transform-decorators-legacy插件

  * Package.json里babel加上plugins配置

    ![装饰器](https://github.com/ijzn/react-job/blob/master/img/xiushiqi1.png)

    ​

    ![装饰器模式代码](https://github.com/ijzn/react-job/blob/master/img/xiushiqi2.png)

    ​




# react-router4

​	[详情请见官方文档](https://reacttraining.com/react-router/web/guides/philosophy)

对于普通组件想使用this.props.history的时候，可以使用withRouter；

装饰器写法

```javascript
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
@withRouter
export default class AuthRouter extends Component {
  componentDidMount() {
      const publicList = ['/login', '/register']
      const pathname = this.props.location.pathname
      if (publicList.indexOf(pathname)>-1) {
          return null
      }
      axios.get('/user/info')
      .then(res=>{
          if (res.status === 200) {
              if (res.data.code === 0) {
                //   登录成功的

              } else {
                //   没有登录的
                this.props.history.push('/login')              
              }
          }
      })
      .catch(err => {
          console.log(err)
      })
  }
  render() {
    return <div></div>
  }
}
```



# 后端知识

## mongoose

```js
//简单查询
Model.find({'csser.com':5},function(err, docs){
    // docs 是查询的结果数组 
    ...
});
// 同上 第一个参数为查询条件 第二个参数，返回的数据doc不包含哪个
Model.findOne({ age:5},function(err, doc){
    // doc 是单个文档
    ...
});
// Model 模型  User
User.findOne({user, pwd: pwd},{'pwd': 0 },function (err, doc) {
    if (!doc) {
      return res.json({code:1,msg:'用户名不存在或者密码错误'})
    }
    return res.json({code:0, data:doc})
  })
 })
```





### mac下如何查看指定端口被谁占用并且杀死该进程

losf -i ****   ****代表你要查看的端口号

kill pid     kill 进程ID

[mac下如何查看指定端口被谁占用并且杀死该进程](https://www.cnblogs.com/yk123/p/5853994.html)



### 密码加密  md5 推荐使用 [utility](https://www.npmjs.com/package/utility)

``` npm install utility```

一般使用复杂字符串和特殊字符二次加盐

```js
function md5 (pwd) {
   // 也可以是随机的字符串 
    const salt = 'imooc_is_aaa_322_!@#$%^&*'
    return utility.md5(utility.md5(pwd+salt))
}
```









