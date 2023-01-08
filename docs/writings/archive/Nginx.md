# Nginx 配置记录



## root 与 alias区别

nginx 指定⽂件路径有两种⽅式 root 和 alias，root 与 alias 主要区别在于 nginx 如何解释 location 后⾯的 uri，这会使两者分别以不同的⽅式将请求映射到服务器⽂件上。



### root

root 指定⽬录的上级⽬录，并且该上级⽬录要含有 locatoin 指定名称的同名⽬录。

以root⽅式设置资源路径：

- 语法：root path

- 配置块：http、server、location、if

例子：

```
location /img/ {
	alias /var/www/image/;
}
```

若按照上述配置的话，则访问 `/img/` ⽬录⾥⾯的⽂件时，nginx 会⾃动去 `/var/www/image/` ⽬录找⽂件



### alias

alias 指定的⽬录是准确的，给location指定⼀个⽬录。

以 alias ⽅式设置资源路径：

- 语法：alias path。需要注意的是目录后面一定要有 `/`

- 配置块：location

例子：

```
location /img/ {
	root /var/www/image;
}
```

若按照这种配置的话，则访问 `/img/` ⽬录下的⽂件时，nginx 会去 `/var/www/image/img/` ⽬录下找⽂件



## proxy_pass 与 / 的关系

在 nginx 中配置 proxy_pass 代理转发时

- 如果在 proxy_pass 后面的 url 加 `/`，表示绝对根路径；
- 如果没有 `/`，表示相对路径，把匹配的路径部分也给代理走。



假设下面四种情况分别用 `http://127.0.0.1/proxy/test.html` 进行访问。

第一种：

```
location /proxy/ {
	proxy_pass http://192.168.0.120/;
}
```

访问的 URL：`http://127.0.0.1/proxy/test.html`

代理到 URL：`http://192.168.0.120/test.html`



第二种（相对于第一种，最后少一个 / ）

```
location /proxy/ {
	proxy_pass http://192.168.0.120;
}
```

访问的 URL：`http://127.0.0.1/proxy/test.html`

代理到 URL：`http://192.168.0.120/proxy/test.html`



第三种：

```
location /proxy {
	proxy_pass http://192.168.0.120/;
}
```

访问的 URL：`http://127.0.0.1/proxy/test.html`

代理到 URL：`http://192.168.0.120//test.html`



第四种：

```
location /proxy {
	proxy_pass http://192.168.0.120;
}
```

访问的 URL：`http://127.0.0.1/proxy/test.html`

代理到 URL：`http://192.168.0.120/proxy/test.html`



第五种：

```
location /proxy/ {
	proxy_pass http://192.168.0.120/aaa/;
}
```

访问的 URL：`http://127.0.0.1/proxy/test.html`

代理到 URL：`http://192.168.0.120/aaa/test.html`



第六种（相对于第五种，最后少一个 / ）

```
location /proxy/ {
	proxy_pass http://192.168.0.120/aaa;
}
```

访问的 URL：`http://127.0.0.1/proxy/test.html`

代理到 URL：`http://192.168.0.120/aaatest.html`

