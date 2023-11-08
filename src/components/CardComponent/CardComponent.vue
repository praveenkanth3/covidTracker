<template>
    <div class="cardContainer">
        <div class="header">
            <div class="stateName">{{ state }}</div>
            <SelectBox placeholder="select dist" :lists="districts" :onChange="onChangeDist"/>
        </div>

        <div class="countSection">
            <div class="actionBtn"><CustomButton label="<-" :onClickBtn="onClickPrev" /></div>
            <div>
                <h4>{{ DATA_TO_DISPLAY[review] }} count</h4>
                <div>Confirmed: {{covidInfo[DATA_TO_DISPLAY[review]]?.confirmed || '-'}}</div>
                <div>Recovered: {{covidInfo[DATA_TO_DISPLAY[review]]?.recovered || '-'}}</div>
                <div>Deceased: {{covidInfo[DATA_TO_DISPLAY[review]]?.deceased || '-'}}</div>
            </div>
            <div class="actionBtn"><CustomButton label="->" :onClickBtn="onClickNext" /></div>
        </div>
        <CustomButton  label="View details" :onClickBtn="() => OnclickViewDetail(state)" />

    </div>
</template>

<script>

import SelectBox from '../SelectBox/SelectBox.vue';
import { DATA_TO_DISPLAY } from '../../constant';
import CustomButton from '../Button/Button.vue';

/* eslint-disable */

export default {
    name:'CardComponent',

    props:{
        state: {
            type: String,
            required: true
        },

        caseData:{
            type: Object,
            required: true
        }

    },

    data(){
        return{
            review: 0,
            covidInfo: this.caseData,
            selectedDist: ''
        }
    },

    computed:{
        DATA_TO_DISPLAY(){
            return DATA_TO_DISPLAY;
        },

        districts(){
            return Object.keys(this.caseData.districts || {});
        },

    },

    methods:{

        onClickNext(){
            if(this.review+1 > this.DATA_TO_DISPLAY.length -1){
                this.review = 0;
            }else{
                this.review += 1 
            }
        },

        onClickPrev(){
            if(this.review-1 < 0){
                this.review = this.DATA_TO_DISPLAY.length - 1;
            }else{
                this.review -= 1 
            }
        },

        onChangeDist(val){
            this.selectedDist = val;
            this.covidInfo = this.caseData.districts[val]
        },

        OnclickViewDetail(val){
            this.$router.push({name: 'DetailPage', params: { state: val } });
        }

    },

    components:{
        SelectBox,
        CustomButton
    }
}

</script>

<style scoped>
.header {
    display: flex;
    justify-content: space-between;
}

.cardContainer {
    margin: 20px;
    width: 200px;
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    padding: 10px;
    border: 1px solid black;
}

.countSection {
    text-align:center;
    display:flex;
    justify-content: space-between;
}

.actionBtn {
    display: flex;
    justify-content: center;
    align-items: center;
}

</style>