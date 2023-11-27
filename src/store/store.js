import Vue from "vue";
import Vuex from 'vuex';
import { action as actions } from "./actions";
import { action1 } from "./action1";
import { mutations } from "./mutations";

Vue.use(Vuex);

export const store = new Vuex.Store({

    state:{
        allCovidData: {},
        StateDateWiseDetail: {}
    },

    getters:{
        allCovidData : state => state.allCovidData,
        StateDateWiseDetail : state => state.StateDateWiseDetail
    },

    mutations,

    actions : Object.assign({},actions,action1)


});