import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

//添加原型总线,可以在直接访问无关系的数据方法
Vue.prototype.$bus=new Vue()

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
