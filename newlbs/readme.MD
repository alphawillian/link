# 两个gulp服务
1. 启动项目需要命令 gulp dev
3. 对项目修改后需要执行命令 gulp build 和 gulp dest

# 代码拷贝
1. 步骤一：执行依次命令 gulp bild 和 gulp dest development中的lbs项目代码自动拷贝完成。
3. 步骤三：把development中的lbs项目除去 node_modules 拷贝到 release 中的 lbs 项目中。

# 项目框架
+ index.html 中主要是一些页面元素块。
+ index.js 主要是一些地图相关的样式，商户icon 商户聚合等和地图强相关的逻辑。
+ extend.js 主要是一些优惠券领取和 优惠商户列表 相关弹窗 等和地图关联不大的业务逻辑。
+ proHub.js 主要是一些页面交互的接口。