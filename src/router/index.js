import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/views/Index'
import Detail from '@/views/Detail'


Vue.use(Router)

export default function createRouter() {
  return new Router({
    mode: 'history',
    routes: [
      { path: '/', component: Index },
      { path: '/detail', component: Detail },
    ]
  })
}