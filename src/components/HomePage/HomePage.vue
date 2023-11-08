<template>
    <div>
        <header>
            <h2>Covid Tracker -  India</h2>
            <div class="filtersSection">
                <InputBox label="State" placeholder="State" :value="searchTxt" :onChange="onChangeInput"/>
                <SelectBox placeholder="sort by total case" :lists="sortOptions" :onChange="onChangeSort"/>
                <div>
                    <input type="radio" value="asec" v-model="order"> Acending
                    <input type="radio" value="desc" v-model="order"/> Desending
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
import InputBox from '../Input/Input.vue'
import SelectBox from '../SelectBox/SelectBox.vue'
import CardComponent from '../CardComponent/CardComponent.vue'
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

    mounted:function mounted() {
        this.fetchData()
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
                        return (a[1].total[this.sort] || 0 ) - (b[1].total[this.sort] || 0)
                    }else{
                        return (b[1].total[this.sort] || 0) - (a[1].total[this.sort] || 0)
                    }
                }).filter(([key,val]) => key.toLowerCase().includes(this.searchTxt.toLowerCase()) );
        }


    },

    methods: {
        onChangeInput(val) {
            this.searchTxt = val;
        },

        async fetchData() {
            const data = await fetch('https://data.covid19india.org/v4/min/data.min.json', { method: "GET"}).then(res => res.json());
            this.$store.dispatch('setAllCovidData',data);
        },

        onChangeSort(val){
            this.sort = val;
        }


    },

    components:{
        InputBox,
        SelectBox,
        CardComponent
    }
}
</script>

<style scoped>

.filtersSection{
    display: flex;
    column-gap: 20px;
    border-bottom: 1px solid black;
    padding: 10px;
}

section{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    column-gap: 20px;
    row-gap: 20px;
}

</style>