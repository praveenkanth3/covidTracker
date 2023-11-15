<template>
    <div>

        <div class="headerContainer">
            <h2>CovidTracker - India</h2>
            <div class="actionSection">
                <h2>State: {{ stateName }}</h2>
                <InputBox inputType="date" :value="choosedDate" :onChange="onChangeDateField"/>
                <div>(2020 - 2021 Record)</div>
                <div class="sortContainer">
                        <SelectBox :lists="sortOption" placeholder="sort by total case" :onChange="onChangeFilter" />
                        <RadioButton label="Acending" value="asec"  @onChangeRadioBtn = "onChangeRadioBtn"/>
                        <RadioButton label="Desending" value="desc" @onChangeRadioBtn = "onChangeRadioBtn"/>
                </div>
                <CustomButton label="Back"  :onClickBtn="onClickBack"/>
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
import CustomButton from '../Button/Button.vue';
import RadioButton from '../RadioButton/RadioButton.vue';
import CaseSection from './CaseSection.vue';
import { DETAIL_PAGE_SORT_OPTION } from '../../constant'

export default {
    name: 'DetailPage',

    data(){
        return {
            order: 'asec',
            choosedDate: '',
            sort: '',
            stateName: '',
        }
    },

    mounted() {
        this.stateName = this.$route.params.state;
        this.fetchDateWiseData();
    },

    computed: {

        ...mapGetters({
            StateDateWiseDetail: 'StateDateWiseDetail'
       }),

        sortOption() {
            return DETAIL_PAGE_SORT_OPTION;
        },

        filteredData() {
            return Object.entries(this.StateDateWiseDetail.dates || {}).sort((a,b) => {
                if(this.order === 'asec') {
                    return (a[1].total[this.sort] || 0) - (b[1].total[this.sort] || 0)
                }else {
                    return (b[1].total[this.sort] || 0) - (a[1].total[this.sort] || 0)
                }
            }).filter(([key,val]) => key.toLowerCase().includes(this.choosedDate.toLowerCase()));

        }
    },

    methods: {

        onClickBack() {
            this.$router.push({name : 'LandingPage'})
        },

        onChangeRadioBtn(val) {
            console.log(val)
            this.order = val;
        },

        onChangeDateField(val) {
            this.choosedDate = val
        },

        onChangeFilter(val) {
            this.sort = val;
            console.log(this.filteredData);
        },

        fetchDateWiseData() {
            this.$store.dispatch('fetchDetailedData', this.stateName);
        },

    },

    components: {
        SelectBox,
        InputBox,
        CaseSection,
        CustomButton,
        RadioButton
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

table {
    width: 100%;
    border-collapse: collapse;
    text-align:center;
}

.noResults {
    text-align:center;
}

tr, td{
    border: 1px solid black;
}
</style>