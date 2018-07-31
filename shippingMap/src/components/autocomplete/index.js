import mapAutocomplete from './src/autocomplete'

/* istanbul ignore next */
mapAutocomplete.install = function(Vue) {
  Vue.component(mapAutocomplete.name, mapAutocomplete)
}

export default mapAutocomplete
