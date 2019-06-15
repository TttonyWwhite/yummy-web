
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from './store'
import VueAMap from 'vue-amap'
import hljs from 'highlight.js'
import 'highlight.js/styles/railscasts.css' 
import VCharts from 'v-charts'


Vue.use(ElementUI)
Vue.use(VueAxios, axios)
Vue.use(VueRouter)
Vue.use(VueAMap)
Vue.use(VCharts)


Vue.directive('hljs', el => {
  let blocks = el.querySelectorAll('pre')
  Array.prototype.forEach.call(blocks, hljs.highlightBlock)
})

VueAMap.initAMapApiLoader({
  key: '01312d09971020b1e83205da9ed48e56',
  plugin: [
  'AMap.Autocomplete', 
  'AMap.PlaceSearch', 
  'AMap.Scale', 
  'AMap.OverView', 
  'AMap.ToolBar', 
  'AMap.MapType', 
  'AMap.PolyEditor', 
  'AMap.CircleEditor',
  'AMap.CitySearch',
  'AMap.Geocoder'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
});

Vue.config.productionTip = false




new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

Vue.config.devtools = true
