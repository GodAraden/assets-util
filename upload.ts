import path from 'node:path'
import { readFile } from 'fs/promises'

import axios from 'axios'
import { MD5 } from 'crypto-js'
import FormData from 'form-data'

/*
 * 貌似是由于 typora 本身调用脚本时的方式问题，导致脚本没有办法使用相对路径
 * 拿到项目文件夹下的 .env.local 文件，故这里使用绝对路径进行访问
 */
const projectPath = 'D:/assets/assets-util'

;(async () => {
  const filePath = process.argv[2]
  try {
    // 网络上的图片资源粘贴到文件中，保留原 URL
    if (filePath.startsWith('http')) {
      console.log(filePath)
      return
    }

    // 截屏 / 本地图片资源上传
    const parsed = Object.fromEntries(
      (await readFile(`${projectPath}/.env.local`))
        .toString()
        .split('\n')
        .map(line => line.split('='))
    )

    const file = await readFile(filePath)

    const formData = new FormData()
    formData.append('hold', '')
    formData.append('shared', '')
    formData.append('name', path.basename(filePath))
    formData.append('asset', file, path.basename(filePath))

    const { data } = await axios.post<string>(parsed.domain, formData, {
      headers: {
        'upload-assets-key': MD5(parsed.key + new Date().toLocaleDateString('zh-CN')).toString()
      }
    })

    console.log(`${parsed.domain}${data}`)
  } catch (error) {
    console.log('Error: ', error)
  }
})()
