export const ENV = process.env.NODE_ENV

const getBaseUrl = () => {
  if (ENV === 'dev') {
    return '/dev'
  }
  if (ENV === 'test') {
    return '/test'
  }
  return ''
}

export const baseUrl = getBaseUrl() // 获取接口地址前缀
