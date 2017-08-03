import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router/router'
import store from './store/'
import ajax from './config/ajax'
import './style/common'
import './config/rem'
import { sync } from 'vuex-router-sync'

Vue.use(VueRouter)
const router = new VueRouter({
	routes
})

sync(store, router)

const history = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)

router.beforeEach(function(to, from, next) {
	const toIndex = history.getItem(to.path)
	const fromIndex = history.getItem(from.path)
	if(toIndex) {
		if(!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
			store.commit('UPDATE_DIRECTION', {
				direction: 'forward'
			})
		} else {
			store.commit('UPDATE_DIRECTION', {
				direction: 'reverse'
			})
		}
	} else {
		++historyCount
		history.setItem('count', historyCount)
		to.path !== '/' && history.setItem(to.path, historyCount)
		store.commit('UPDATE_DIRECTION', {
			direction: 'forward'
		})
	}

	next();

})

new Vue({
	router,
	store,
}).$mount('#app')