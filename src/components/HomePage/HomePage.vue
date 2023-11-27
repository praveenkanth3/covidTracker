<template>
    <div class="homepageContainer">
        <header>
            <h2>Covid Tracker -  India</h2>
            <div class="filtersSection">
                <InputBox label="State" placeholder="State" :value="searchTxt" :onChange="onChangeInput"/>
                <SelectBox placeholder="sort by total case" :lists="sortOptions" :onChange="onChangeSort"/>
                <div>
                    <RadioButton 
                        v-for="val in ['Acending', 'Desending']" 
                        :label="val" :value=" val === 'Acending' ? 'asec' : 'desc' " 
                        :defaultVal="order"  
                        @onChangeRadioBtn = "onChangeRadioBtn"
                        :key="val"
                    />
                </div>
            </div>
        </header>

        <section>
            <CardComponent 
                v-for="data in filteredData" 
                :key="data[0]" 
                :state="data[0]" 
                :caseData="data[1]" 
            />
        </section>
    </div>
</template>
<script>

import { mapGetters } from 'vuex';
import InputBox from '../Input/InputBox.vue'
import SelectBox from '../SelectBox/SelectBox.vue'
import CardComponent from '../CardComponent/CardComponent.vue'
import RadioButton from '../RadioButton/RadioButton.vue'
import { SORT_OPTIONS } from  '../../constant'
/* eslint-disable */

export default {
    name: 'HomePage',

    data() {
        return {
            searchTxt: '',
            sort: '',
            order: 'asec'
        }
    },

    mounted() {
        this.fetchData()
    },

    methods: {

        onChangeInput(val) {
            this.searchTxt = val;
        },

        onChangeRadioBtn(val) {
            this.order = val
        },

        getSortData(a,b) {
            return (a[1].total[this.sort] || 0) - (b[1].total[this.sort] || 0)
        },

        async fetchData() {
            this.$store.dispatch('fetchHomePageData');
        },

        onChangeSort(val) {
            this.sort = val;
        }


    },

    computed: {
        ...mapGetters({
            allCovidData: 'allCovidData'
        }),

        sortOptions() {
            return SORT_OPTIONS
        },

        filteredData() {
                return Object.entries(this.allCovidData).sort((a,b) => {
                    if(this.order === 'asec'){
                        return this.getSortData(a,b)
                    }else{
                        return this.getSortData(b,a)
                    }
                }).filter(([key,val]) => key.toLowerCase().includes(this.searchTxt.toLowerCase()) );
        }


    },

    components:{
        InputBox,
        SelectBox,
        CardComponent,
        RadioButton
    }
}
</script>

<style scoped>

.homepageContainer{

    height: 100vh;
    overflow-y: scroll;
}
.filtersSection {
    display: flex;
    column-gap: 20px;
    border-bottom: 1px solid black;
    padding: 10px;
}

section {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    column-gap: 20px;
    row-gap: 20px;
}

</style>