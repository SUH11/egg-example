

# egg-example



本地启动：

1.启动docker

​	直接打开客户端即可

2.启动redis

**a.**查看镜像并启动

​	$ docker images

​	$ docker run -p 6379:6379 -v ~/redis/data:/data  -d redis redis-server --appendonly yes --requirepass "密码"



命令说明：

​	-p 6379:6379 : 将容器的6379端口映射到主机的6379端口

​	-v ~/redis/data:/data: 将主机中~/redis/data挂载到容器的/data

​	redis-server --appendonly yes : 在容器执行redis-server启动命令，并打开redis持久化b.配置

​	--requirepass "密码":

​	设置认证密码



**c.**查看运行状态

​	docker ps

​	ps -ef|grep redis



**d.**连接**redis**客户端

​	$ docker exec -it redis-dev redis-cli

​	$ auth '密码'

​	$ info

**e.**测试

​	$ set test 123

​	$ get test

参考文章：https://github.com/antbaobao/AntBlog/issues/42



3.启动mongodb

​	cd /usr/local/mongodb/bin

​	sudo mongod

4.npm run dev



learn egg mongo



**## QuickStart**



<!-- add docs here for user -->



see [egg docs][egg] for more detail.



**### Development**

--------以下方法也可用，同上述启动方法-------

运行



1. 安装redis并启动

关于redis的安装与运行可以参考[这里](https://github.com/antbaobao/AntBlog/issues/42)

2. 安装mongodb并启动

3. 开发



\```bash

$ npm i

$ npm run dev

$ open http://localhost:7001/

\```



**### Deploy**



\```bash

$ npm start

$ npm stop

\```



**### npm scripts**



\- Use `npm run lint` to check code style.

\- Use `npm test` to run unit test.

\- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.