export const mutations = {

    setAllCovidData(state, payload){
        state.allCovidData = payload;
    },

    setDateWiseData(state, payload){
        console.log(payload);
        state.StateDateWiseDetail = payload;
    }

}