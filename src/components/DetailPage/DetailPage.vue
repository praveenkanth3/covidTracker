<template>
    <div>
        <div class="headerContainer">
            <h2>CovidTracker - India</h2>
            <div class="actionSection">
                <h2>State: {{ stateName }}</h2>
                <InputBox inputType="date" :value="choosedDate" :onChange="onChangeDateField"/>
                <div>(2020 - 2021 Record)</div>
                <div class="sortContainer">
                        <SelectBox :lists="SORT_OPTION" placeholder="select one" :onChange="onChangeFilter" />
                        <input type="radio" value="asec" v-model="order"> Acending
                        <input type="radio" value="desc" v-model="order"/> Desending
                </div>
                <button @click="onClickBack">Back</button>
            </div>
        </div>
        <div>
            <table>
                <thead>
                    <td>Dates</td>
                    <td>Total count</td>
                    <td>Delta count</td>
                    <td>Delta7 count</td>
                </thead>
                <tbody v-if="filteredData.length">
                    <tr v-for="data in filteredData" v-bind:key="data[0]">
                        <td>{{ data[0] }}</td>
                        <td><CaseSection :sectionData="data[1].total"/></td>
                        <td><CaseSection :sectionData="data[1].delta" /></td>
                        <td><CaseSection :sectionData="data[1].delta7"/></td>
                   </tr>
                </tbody>
                <div v-else class="noResults">no results found</div>
            </table>
        </div>
    </div>

</template>

<script>
/* eslint-disable */
import { mapGetters } from 'vuex';
import InputBox from '../Input/Input.vue';
import SelectBox from '../SelectBox/SelectBox.vue';
import CaseSection from './CaseSection.vue';
import { DETAIL_PAGE_SORT_OPTION } from '../../constant'

export default {
    name: 'DetailPage',

    data(){
        return{
            order: 'asec',
            choosedDate: '',
            sort: '',
            stateName: '',
            selectedStateData: {}
        }
    },

    mounted() {
        this.stateName = this.$route.params.state;
        this.fetchDateWiseData();
    },

    computed:{

        ...mapGetters({
            StateDateWiseDetail: 'StateDateWiseDetail'
       }),

        SORT_OPTION() {
            return DETAIL_PAGE_SORT_OPTION;
        },

        filteredData() {
            console.log(this.sort,this.order)
            console.log(Object.entries(this.selectedStateData?.dates || {}).sort((a,b) => {
                if(this.order === 'asec'){
                    return (a[1].total[this.sort] || 0) - (b[1].total[this.sort] || 0)
                }else{
                    return (b[1].total[this.sort] || 0) - (a[1].total[this.sort] || 0)
                }
            }).filter(([key,val]) => key.toLowerCase().includes(this.choosedDate.toLowerCase())))
            return Object.entries(this.selectedStateData.dates || {}).sort((a,b) => {
                if(this.order === 'asec'){
                    return a[1].total[this.sort] - b[1].total[this.sort]
                }else{
                    return b[1].total[this.sort] - a[1].total[this.sort]
                }
            }).filter(([key,val]) => key.toLowerCase().includes(this.choosedDate.toLowerCase()));

        }
    },

    methods:{

        onClickBack(){
            this.$router.push({name : 'LandingPage'})
        },

        onChangeDateField(val) {
            this.choosedDate = val
        },

        onChangeFilter(val) {
            this.sort = val;
            console.log(this.filteredData);
        },

        async fetchDateWiseData() {
            const data = await fetch('https://data.covid19india.org/v4/min/timeseries.min.json',{ method: 'GET'}).then(res => res.json());
            this.$store.dispatch('setDateWiseData',data);
            this.selectedStateData = this.StateDateWiseDetail[this.stateName];
            console.log(this.selectedStateData)

        },

    },

    components: {
        SelectBox,
        InputBox,
        CaseSection
    }
}

</script>

<style>

.headerContainer {
    display:flex;
    flex-direction: column;
    border-bottom: 1px solid black;
}

.actionSection {
    display:flex;
    justify-content: space-between;
    align-items: center;
}

.sortContainer {
    display: flex;
    column-gap: 10px;
    align-items: center;
    justify-content: center;
}

table{
    width: 100%;
    border-collapse: collapse;
    text-align:center;
}

.noResults{
    text-align:center;
}

tr, td{
    border: 1px solid black;
}
</style>