---
title: 快速签发 Let's Encrypt 证书指南
date: "2019-08-15T22:40:32.169Z"
---
#### [转载 - 这是很好的一篇文章](https://www.cnblogs.com/esofar/p/9291685.html)

## 说在前面
--------------------

本文仅记录给自己的网站添加“小绿锁”的动手操作过程，不涉及 HTTPS 工作原理等内容的讲解，感兴趣的同学可以参考篇尾的文章自行了解。

简单了解下我的实验环境：

*   云服务器：CentOS 7.4
*   网站宿主：Nginx 1.12.2
*   备案域名：[www.vips.im](https://vips.im/)

> 这里以`www.vips.im`作为演示域名，届时一定要修改为自己的域名。

##  什么是 Let's Encrypt
---------------------------------

[Let's Encrypt](https://letsencrypt.org/) 是一个由非营利性组织 [互联网安全研究小组](https://letsencrypt.org/isrg/)（ISRG）提供的免费、自动化和开放的证书颁发机构（CA）。

简单的说，借助 Let's Encrypt 颁发的证书可以为我们的网站免费启用 HTTPS(SSL/TLS) 。

Let's Encrypt免费证书的签发/续签都是脚本自动化的，官方提供了几种证书的申请方式方法，[点击此处](https://letsencrypt.org/docs/client-options/) 快速浏览。

官方推荐使用 [Certbot](https://certbot.eff.org/) 客户端来签发证书，这种方式可参考文档自行尝试，不做评价。

我这里直接使用第三方客户端 [acme.sh](https://github.com/Neilpang/acme.sh) 申请，据了解这种方式可能是目前 Let's Encrypt 免费证书客户端最简单、最智能的 shell 脚本，可以自动发布和续订 Let's Encrypt 中的免费证书。

## 安装 acme.sh
--------------------------

安装很简单，一条命令：

`curl https://get.acme.sh | sh`

整个安装过程进行了以下几步，了解一下即可：

1.  把 acme.sh 安装到当前用户的主目录`$HOME`下的`.acme.sh`文件夹中，即`~/.acme.sh/`，之后所有生成的证书也会放在这个目录下；
2.  创建了一个指令别名`alias acme.sh=~/.acme.sh/acme.sh`，这样我们可以通过`acme.sh`命令方便快速地使用 acme.sh 脚本；
3.  自动创建`cronjob`定时任务, 每天 0:00 点自动检测所有的证书，如果快过期了，则会自动更新证书。

安装命令执行完毕后，执行`acme.sh --version`确认是否能正常使用`acme.sh`命令。

`https://github.com/Neilpang/acme.sh`  v2.7.9

如有版本信息输出则表示环境正常；如果提示命令未找到，执行`source ~/.bashrc`命令重载一下环境配置文件。

整个安装过程不会污染已有的系统任何功能和文件，所有的修改都限制在安装目录`~/.acme.sh/`中。

## 生成证书

据 acme.sh 官方文档介绍，其实现了 [acme](https://github.com/ietf-wg-acme/acme/) 协议支持的所有验证协议，一般有两种方式验证：http 和 dns 验证。

也就是我们有两种选择签发证书，这里我直接选择 http 验证方式，另外一种方式本篇不做介绍，可参考文档自行尝试。

签发证书也很简单，一条命令：

`acme.sh --issue -d vips.im -d www.vips.im -w /home/wwwroot/vips.im`

简单解释下这条命令涉及的几个参数：

*   `--issue`是 acme.sh 脚本用来颁发证书的指令；
*   `-d`是`--domain`的简称，其后面须填写已备案的域名；
*   `-w`是`--webroot`的简称，其后面须填写网站的根目录。

另外，可以通过下面两个常用`acme.sh`命令查看和删除证书：

* 查看证书列表
` acme.sh --list `
* 删除证书
`acme.sh remove <SAN_Domains>`

至此，证书就下载成功。

## 安装证书

我的站点是由 Nginx 承载的，所以本节内容重点记录如何将证书安装到 Nginx，其他 webserver 请参考 acme.sh 文档自行实践。废话不多说，进入本节正题。

上一小节，生成的证书放在了`/root/.acme.sh/vips.im`目录，因为这是 acme.sh 脚本的内部使用目录，而且目录结构可能会变化，所以我们不能让 Nginx 的配置文件直接读取该目录下的证书文件。

正确的做法就是使用`--installcert`命令，指定目标位置，然后证书文件会被 copy 到相应的位置。

一条命令即可解决：

`acme.sh  --installcert -d vips.im --key-file /etc/nginx/ssl/vips.im.key --fullchain-file /etc/nginx/ssl/fullchain.cer --reloadcmd "service nginx force-reload"`

这里我将证书放到了`/etc/nginx/ssl/`目录下。


最后一步就是，修改 Nginx 配置文件启用 ssl，修改完成后需要重启下 Nginx，这一块不再详述。Nginx 配置请参考：
```
server {
        listen 443 ssl;
        server_name vips.im;
        
        ssl on;
        ssl_certificate      /etc/nginx/ssl/fullchain.cer;
        ssl_certificate_key  /etc/nginx/ssl/vips.im.key;

        root /home/wwwroot/vips.im;
        index index.html;
    
        location / {
            try_files $uri $uri/ @router;
            index index.html;
        }
    
        location @router {
            rewrite ^.*$ /index.html last;
        }
    }
    
    server {
        listen 80;
        server_name vips.im;
        return 301 https://$server_name$request_uri;
    }
```

完成证书部署后可以通过如下站点检测网站的安全级别：

*   [https://myssl.com](https://myssl.com/)
*   [https://www.ssllabs.com](https://www.ssllabs.com)

## 更新证书

目前 Let's Encrypt 的证书有效期是90天，时间到了会自动更新，您无需任何操作。 今后有可能会缩短这个时间， 不过都是自动的，不需要您关心。

但是，您也可以强制续签证书：

`acme.sh --renew -d example.com --force`

## 更新 acme.sh
--------------------------

目前由于 acme 协议和 letsencrypt CA 都在频繁的更新, 因此 acme.sh 也经常更新以保持同步。

升级 acme.sh 到最新版：

`acme.sh --upgrade`

如果您不想手动升级,，可以开启自动升级：

`acme.sh  --upgrade  --auto-upgrade`

您也可以随时关闭自动更新：

`acme.sh --upgrade  --auto-upgrade  0`

## 相关阅读
--------------------

*   [README.md - acme.sh | Github](https://github.com/Neilpang/acme.sh)
*   [中文说明 - acme.sh | Github](https://github.com/Neilpang/acme.sh/wiki/%E8%AF%B4%E6%98%8E)
*   [Blogs and tutorials - acme.sh | Github](https://github.com/Neilpang/acme.sh/wiki/Blogs-and-tutorials)
