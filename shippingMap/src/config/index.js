export const host = window.location.host
export const path = host.substr(host.indexOf('.'))
export const domian = window.location.hostname.substr(host.indexOf('.'))
export default {
  html5Path: false,
  localPath: '//' + host + '/',
  staticImagesPath: '/static',
  iconsSvg: '/src/icons/svg',
  // staticImagesPath: '//' + host + '/static/images',
  mapTitlePath: 'https://mt0.google.cn'
}
