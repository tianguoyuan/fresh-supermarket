import { showToast } from 'vant'
import { qqHref } from '~/enums/HrefEnum'

// 解析重定向redirectPath
export function parseRedirectPath(path: string) {
  const isEncode = (v: string) => v.includes(encodeURIComponent('?'))

  function deepDecode(str: string) {
    if (isEncode(str)) {
      str = decodeURIComponent(str)
      return deepDecode(str)
    }
    return str
  }

  return deepDecode(path)
}

/** 保留2位小数 */
export function toFixedNum(str: string) {
  const reg = /^\d+(?:\.\d{0,2})?/
  return String(str.match(reg))
}

/** 获取定位 */
export function getPosition(): Promise<{ latitude: string, longitude: string }> {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const crd = pos.coords
      resolve({ latitude: toFixedNum(`${crd.latitude}`), longitude: toFixedNum(`${crd.longitude}`) })
    }, (err) => {
      reject(new Error(`获取定位失败: getPosition, ${`${err.code}_${err.message}`}`))
    }, {
      enableHighAccuracy: true,
      timeout: 1000 * 5,
      maximumAge: 0,
    })
  })
}

/** 随机字符串 */
export function randomCoding(n = 4) {
  // 创建26个字母数组
  const arr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  let str = ''
  for (let i = 0; i < n; i++) {
    str += arr[Math.floor(Math.random() * arr.length)]
  }
  return str
}

/** 随机数字 */
export function randomNum(n = 11) {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
  let str = ''
  for (let i = 0; i < n; i++) {
    str += arr[Math.floor(Math.random() * arr.length)]
  }
  return str
}

/** 手机号掩码 */
export function phoneMask(v: string) {
  const pre = v.slice(0, 3)
  const last = v.slice(-4)
  return `${pre}****${last}`
}

/** load图片 */
export function loadImage(img: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const domImg = new Image()
    domImg.src = img
    domImg.onload = function () {
      resolve()
    }
    domImg.onerror = function () {
      reject(new Error('图片加载失败'))
    }
  })
}

// 是否 PC浏览器
export function isPC() {
  const userAgent = navigator.userAgent
  const isMobile = /Mobi|Android/i.test(userAgent) // 检查是否为移动设备
  return !isMobile // 如果不是移动设备，则认为是 PC
}

// 打开扫一扫
export function openSweep() {
  const domInput = document.createElement('input')
  domInput.type = 'file'
  domInput.click()
}

// 复制文字
export function copyText(content: string) {
  const dom = document.createElement('input')
  dom.value = content
  dom.style.height = '0px'
  dom.readOnly = true
  document.body.appendChild(dom)
  dom.select()
  document.execCommand('copy')
  document.body.removeChild(dom)
}

// 是否微信浏览器
export function isWeChatBrowser() {
  const userAgent = navigator.userAgent
  return /MicroMessenger/i.test(userAgent) // 检查用户代理中是否包含 "MicroMessenger"
}

// 打开客服
export function openQQHref() {
  if (isWeChatBrowser())
    return showToast({ icon: 'none', message: '不支持微信内打开' })

  const domA = document.createElement('a')
  domA.href = qqHref
  domA.click()
}
