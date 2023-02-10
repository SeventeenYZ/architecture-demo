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

// 获取 cdn 前缀 url
export const getCDNPrefix = () => {
  if (['dev', 'test'].includes(ENV)) {
    return 'test/cdn';
  }
  return 'prod/cdn';
};

export const baseUrl = getBaseUrl() // 获取接口地址前缀

export const cdnPrefix = getCDNPrefix() // 获取CDN地址前缀
