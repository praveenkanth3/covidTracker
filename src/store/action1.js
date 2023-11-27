 /* eslint-disable */
const API_STRING = 'https://data.covid19india.org/v4/min/';
export const action1 = {
    fetchDetailedData({commit}, payload) {
        const data = new Promise ((resolve,reject) => {
             const dataFetched = fetch(`${API_STRING}timeseries.min.json`,{ method: 'GET'}).then(res => res.json());
                resolve(dataFetched);
        });
        data.then(res => {
            const selectedStateData = res[payload];
            commit('setDateWiseData',selectedStateData);
        });
    }
}