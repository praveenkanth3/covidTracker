/* eslint-disable */
const API_STRING = 'https://data.covid19india.org/v4/min/';
export const action = {

    fetchHomePageData({commit}) {
        const data = new Promise((resolve,reject) => {
            const dataFetched = fetch(`${API_STRING}data.min.json`, { method: "GET"}).then(res => res.json()).catch(err => console.log(err));
            resolve(dataFetched);
        })
        data.then(res => commit('setAllCovidData',res));
    },

    // async fetchDetailedData({commit}, payload) {
    //     const data = await fetch(`${API_STRING}timeseries.min.json`,{ method: 'GET'}).then(res => res.json());
    //     const selectedStateData = data[payload];
    //     commit('setDateWiseData',selectedStateData);
    // }

}
