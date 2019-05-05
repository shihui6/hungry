import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import goods from '@/components/goods/goods'
import seller from '@/components/seller/seller'
import ratings from '@/components/ratings/ratings'
// import eltree from '@/components/el-tree'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      redirect:'/goods',
      children:[
        {
          path:'/goods',
          component:goods
        },
        {
          path:'/seller',
          component:seller
        },
        {
          path:'/ratings',
          component:ratings
        },
      ]
    },

  ]
})
