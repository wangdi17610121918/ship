import drag from './mapDrag'

const install = function(Vue) {
  Vue.directive('map-drag-dialog', drag)
}

if (window.Vue) {
  window['map-drag-dialog'] = drag
  Vue.use(install); // eslint-disable-line
}

drag.install = install
export default drag
