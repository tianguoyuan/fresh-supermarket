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
