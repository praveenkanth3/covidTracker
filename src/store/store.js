import Vue from "vue";
import Vuex from 'vuex';
import { action as actions } from "./actions";
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

    actions

});