---
title: JS无形装逼，最为致命
date: "2015-05-28T22:40:32.169Z"
description: 单行简洁的代码很难维护（有时甚至难以理解），但这并不能阻止广大攻城狮们脑洞，在编写简洁的代码后获得一定的满足感。
---
> 除了三目运算，你还知道其他的装逼姿势吗？留言走你~~

**单行简洁的代码很难维护（有时甚至难以理解），但这并不能阻止广大攻城狮们脑洞，在编写简洁的代码后获得一定的满足感。**

以下我最近的一些收藏`javascript`精简代码集合。它们都可以在你的开发控制台中运行，你可以从控制台中查看运行结果。同时，我希望你能在评论中分享一些自己的藏品！

### 日历
创建过去七天的数组，如果将代码中的减号换成加号，你将得到未来7天的数组集合
``` js
// 创建过去七天的数组
[...Array(7).keys()].map(days => new Date(Date.now() - 86400000 * days));
```
### 生成随机ID
在原型设计时经常使用的创建ID功能。但是我在实际项目中看到有人使用它。其实这并不安全
``` js
// 生成长度为11的随机字母数字字符串
Math.random().toString(36).substring(2);
// hg7znok52x
```
### 获取URL的查询参数
这个获取URL的查询参数代码，是我见过最精简的`QAQ`

`?foo=bar&baz=bing => {foo: bar, baz: bing}`
``` js
// 获取URL的查询参数
q={};location.search.replace(/([^?&=]+)=([^&]+)/g,(_,k,v)=>q[k]=v);q;
```
### 本地时间
通过一堆HTML，您可以创建一个本地时间，其中包含您可以一口气读出的源代码，它每秒都会用当前时间更新页面
``` js
// 创建本地时间
<body onload="setInterval(()=>document.body.innerHTML=new Date().toLocaleString().slice(10,19))"></body>
```
### 数组混淆
随机更改数组元素顺序，混淆数组
``` js
// 随机更改数组元素顺序，混淆数组
(arr) => arr.slice().sort(() => Math.random() - 0.5)
/* 
let a = (arr) => arr.slice().sort(() => Math.random() - 0.5)
let b = a([1,2,3,4,5])
console.log(b)
*/
```
### 生成随机十六进制代码（生成随机颜色）
使用JavaScript简洁代码生成随机十六进制代码
``` js
// 生成随机十六进制代码 如：'#c618b2'
'#' + Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, '0');
```
### 一个面试题
这是一个臭名昭著的面试题，让你写出他的运行结果，受不了~
``` js
for(i=0;++i<101;console.log(i%5?f||i:f+'Buzz'))f=i%3?'':'Fizz'
```
### 数组去重
这是一个原生的JS函数但是非常简洁，Set接受任何可迭代对象，如数组[1,2,3,3]，并删除重复项
``` js
// 数组去重
[...new Set(arr)]
```
### 创建特定大小的数组
方便快捷创建特定大小的数组
``` js
[...Array(3).keys()]
// [0, 1, 2]
```
### 返回一个键盘（惊呆了）
这是一个很难看懂的简洁代码，但是运行后你会惊呆的，他竟然返回一个图形键盘
``` js
// 用字符串返回一个键盘图形
(_=>[..."`1234567890-=~~QWERTYUIOP[]\\~ASDFGHJKL;'~~ZXCVBNM,./~"].map(x=>(o+=`/${b='_'.repeat(w=x<y?2:' 667699'[x=["BS","TAB","CAPS","ENTER"][p++]||'SHIFT',p])}\\|`,m+=y+(x+'    ').slice(0,w)+y+y,n+=y+b+y+y,l+=' __'+b)[73]&&(k.push(l,m,n,o),l='',m=n=o=y),m=n=o=y='|',p=l=k=[])&&k.join`
`)()
```

这是它的打印结果：
![一个键盘](https://user-gold-cdn.xitu.io/2019/4/28/16a633464379dcf6?w=534&h=253&f=png&s=10476)
惊人！