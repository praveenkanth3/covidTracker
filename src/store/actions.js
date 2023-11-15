export const action = {

    setAllCovidData({ commit }, payload) {
        commit('setAllCovidData', payload);
    },

    setDateWiseData({ commit }, payload) {
        commit('setDateWiseData', payload);
    },

    async fetchHomePageData({commit}) {
        const data = await fetch('https://data.covid19india.org/v4/min/data.min.json', { method: "GET"}).then(res => res.json());
        commit('setAllCovidData',data);
    },

    async fetchDetailedData({commit}, payload) {
        const data = await fetch('https://data.covid19india.org/v4/min/timeseries.min.json',{ method: 'GET'}).then(res => res.json());
        const selectedStateData = data[payload];
        console.log(selectedStateData);
        commit('setDateWiseData',selectedStateData);
    }

}
