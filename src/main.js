import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import FastClick from 'fastclick';
import VueLazyLoad from 'vue-lazyload'

import toast from 'components/common/toast'



Vue.config.productionTip = false

//添加原型总线,可以在直接访问无关系的数据方法
Vue.prototype.$bus=new Vue()
//安装toast插件
Vue.use(toast)

//解决移动端300ms延迟
FastClick.attach(document.body)

//使用懒加载的插件
Vue.use(VueLazyLoad,{
  loading:require('./assets/img/detail/loadding.gif')
})

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
