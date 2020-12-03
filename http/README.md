---
sidebar: auto
---

# HTTP 协议

HTTP 协议是基于 TCP/IP 协议之上的应用层协议，每次发起 HTTP 请求时都会先进行 3 次握手建立连接，然后传输数据包，数据包传递完成后需要进行 4 次挥手断开连接
![](https://static001.geekbang.org/resource/image/44/44/440ee50de56edc27c6b3c992b3a25844.png)

如果在 requset header 中加入了 Keep-Alive 则会保持 TCP 连接以复用 TCP 连接，减少握手次数，最后再进行 4 次挥手断开连接

![](https://static001.geekbang.org/resource/image/12/80/1277f342174b23f9442d3b27016d7980.png)

## 请求行

请求行由 3 部分组成

`GET /index.html HTTP/1.1`

1. 请求方法 [ GET | POST | DELETE | PATCH | OPTIONS | PUT | HEAD | CONNECT | TRACE ]
2. URI
3. HTTP 协议版本

## 请求头

请求头由一系列的键值对组成，例如：

```
Host: localhost:8080
Connection: keep-alive
Cache-Control: max-age=0
Content-Type: application/json
```

## 请求体

请求体根据请求头中 Content-Type 决定请求体中的数据类型

## 响应行

响应行由 3 部分组成

`HTTP/1.1 200 OK`

1. HTTP 协议版本
2. HTTP 状态码
3. 描述状态

### HTTP 状态码

常用的几种状态码

```
100 （继续） 请求者应当继续提出请求。 服务器返回此代码表示已收到请求的第一部分，正在等待其余部分。
101 （切换协议） 请求者已要求服务器切换协议，服务器已确认并准备切换。

200 （成功） 服务器已成功处理了请求。 通常，这表示服务器提供了请求的网页。
204 （无内容） 服务器成功处理了请求，但没有返回任何内容。

301 （重定向） 永久移动，重定向
302 （重定向） 临时重定向
304 （缓存） 缓存可用

400 （请求语法错误） 错误的请求 例如Content-Type为application/json,但请求体中的数据不是json格式
401 （权限验证） 要求进行权限校验
403 （拒绝请求） 服务端拒绝请求
404 （资源不存在） 找不到该资源

500 （服务器错误）服务异常、报错等
```
