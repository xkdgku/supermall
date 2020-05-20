import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'


Vue.config.productionTip = false

//添加事件总线对象
Vue.prototype.$bus = new Vue()

//解决移动端300ms的延迟
FastClick.attach(document.body)

//使用懒加载的插件(图片中的src改成v-lazy)
Vue.use(VueLazyLoad)

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')