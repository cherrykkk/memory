import Vue from 'vue'
import Router from 'vue-router'
import Memory from '@/views/Memory.vue'
import Game from '@/views/Game/Game.vue'
import GameTwo from '@/views/GameTwo/index.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Memory
    },{
      path: '/game',
      component:Game
    },{
      path: '/gameTwo',
      component: GameTwo
    }
  ]
})
