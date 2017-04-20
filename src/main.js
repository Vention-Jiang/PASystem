// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

import App from './App'
import Login from './components/Login.vue'
import UserHome from './components/UserHome.vue'
import AdminHome from './components/AdminHome.vue'
import UserList from './components/UserList.vue'
import PASetting from './components/PASetting.vue'
import PAResult from './components/PAResult.vue'
import RecentPA from './components/RecentPA.vue'
import FormerPA from './components/FormerPA.vue'

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(ElementUI)

const routes = [{
  	path : '/',
  	component : Login
},{
  	path : '/login',
  	component : Login
},{
  	path : '/user-home',
  	component : UserHome,
  	children: [
  	{
  	  path : '',
  	  component : RecentPA,
	},
  	{
      path: 'recent-pa',
      component: RecentPA,
    }, 
    {
      path: 'former-pa',
      component: FormerPA
    }, 	
  ]
},{
  	path : '/admin-home',
  	component : AdminHome,
  	children: [
  	{
  	  path : '',
  	  component : UserList,
	},
  	{
      path: 'user-setting',
      component: UserList,
    }, 
    {
      path: 'pa-setting',
      component: PASetting
    }, 	
    {
      path: 'pa-result',
      component: PAResult
    }, 
  ]
}
// ,{
//   	path : '/card-list',
//   	component : CardList
// },{
// 	path : '/time-entries',
// 	component : TimeEntries,
// 	children : [{
// 	    path : 'log-time',
// 	    // 懒加载
// 	    component : resolve => require(['./components/LogTime.vue'],resolve),
// 	}]
// }
];

const router = new VueRouter({
  	routes
});

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
