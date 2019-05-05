// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import iView from 'iview';
import 'iview/dist/styles/iview.css'; 
import './common/style.css'
import './common/css/common.css'
Vue.use(ElementUI)
Vue.use(iView)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  // el: '#app',
  router,
  components: { App },
  template: '<App/>'
}).$mount('#app')  //这里的$mount和el并没有本质上的不同
