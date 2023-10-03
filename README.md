# 基于 NodeJS 的资源上传脚本，后端为 assets-be

本脚本主要应用场景为 Typora 的粘贴图片时的上传操作

# 食用方法

1. 新建 .env.local 文件，内容为

```env
key=\<value\> # value 为后端定义的文件上传时的密钥
domain=\<value\> # value 为后端服务运行地址
```

2. pnpm i
3. \[pnpm dlx\] ts-node ./upload.ts \<file-path\>
4. 脚本输出资源上传后的可供访问的 URL
