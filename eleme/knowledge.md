# 项目中的学到的知识

## linkActiveClass和linkExactActiveClass

#### linkActiveClass

类型: string

默认值: "router-link-active"

全局配置 <router-link> 的默认『激活 class 类名』。

#### linkExactActiveClass

2.5.0+

类型: string

默认值: "router-link-exact-active"

全局配置 <router-link> 精确激活的默认的 class。

## 二维码生成器

[草料二维码生成器](https://cli.im/)

## 1像素边框

https://segmentfault.com/a/1190000007604842

## vue-resource的使用方法

https://blog.csdn.net/qq_38209578/article/details/79227477

## vue-axios的使用方法

https://blog.csdn.net/qq_38209578/article/details/79225698

## 问题

![](https://raw.githubusercontent.com/AzkabanV/IMG-repository/master/img_11.png)

![](https://raw.githubusercontent.com/AzkabanV/IMG-repository/master/img_12.png)

为什么created函数中的console.log(this.seller.name)比this.getAjax()中的console.log(this.seller.name)要早执行？

答：因为getAjax函数中的this.$http.get('api/seller')是个Promise对象。

## 因空格造成的间隙

因为代码之间的空格会被解析成一个空格，所以元素之间会有间隔，解决办法是在父级元素上加上font-size: 0;

## CSS3 filter(滤镜) 属性

http://www.runoob.com/cssref/css3-pr-filter.html

## z-index与background重叠问题

https://blog.csdn.net/qq_19865749/article/details/52030132

## 如何在手机上测试vue.js项目

https://blog.csdn.net/qq_31393401/article/details/79162839

## Sticky footers

https://www.w3cplus.com/css3/css-secrets/sticky-footers.html

## backdrop-filter 和filter

https://www.w3cplus.com/css3/advanced-css-filters.html

https://www.cnblogs.com/wyan20/p/6558034.html

## better-scroll

https://github.com/ustbhuangyi/better-scroll

## $nextTick 

https://cn.vuejs.org/v2/guide/reactivity.html#search-query-sidebar

## className-hook

无样式的类名，仅用来被js选择

## 用padding来增加按钮的可点击区域

## 非父子组件之间传值

https://blog.csdn.net/lander_xiong/article/details/79018737

https://cn.vuejs.org/v2/guide/components.html#%E9%9D%9E%E7%88%B6%E5%AD%90%E7%BB%84%E4%BB%B6%E7%9A%84%E9%80%9A%E4%BF%A1

## transition 多个元素嵌套使用过渡

https://blog.csdn.net/xqnode/article/details/60875478

## 问题

已绑定key属性却仍然有 children must be keyed 警告

解决：之前绑定的值是对象的属性(item.index)，现在改为数字index