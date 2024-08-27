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
