import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);

export default new vuex.Store({
    state:{
        username: '',
        isLogin: false
    },
    getters: {
    	isLogin: state => state.isLogin,
    },
    mutations: {
    	userStatus(state, flag) {
    		state.isLogin = flag
    	}
    }
})
