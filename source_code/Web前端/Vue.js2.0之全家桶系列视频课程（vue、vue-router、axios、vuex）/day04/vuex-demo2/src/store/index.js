import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

import getters from './getters.js'
import actions from './actions.js'
import user from './modules/user.js'

export default new Vuex.Store({
	getters,
	actions,
	modules:{
		user
	}
});