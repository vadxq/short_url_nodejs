# short_url_nodejs
to short url with nodejs

#### 数据库设置
short_url: String 短链接后缀字段
long_url: String 原始长链接
createtime： date
dele: Boolean 是否删除

#### 64位，取长度3-6随机，约580亿组合，对于自己够用了，重合度也会小很多
0-9a-zA-Z共64位
随机生成3-6长度字段

#### koa，post/get（302）

[get] https://t.vadxq.com/xxx
短链接跳转

[post] https://t.vadxq.com
request
```
{
  long_url: String
}
```
response
```
{
  status: Number,
  msg: {
    long_url: String,// 原始链接
    short_url: String // 短链接后缀，需配合https://t.vadxq.com/
  }
}
```
最后的短链接为：
https://t.vadxq.com/short_url

