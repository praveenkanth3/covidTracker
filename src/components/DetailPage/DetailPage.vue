<template>
    <div ref="scrollContainer" @scroll="handleScroll" class="detailPageContainer">

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
            <Transition name="table">
            <table v-if="pagedData.length">
                <thead>
                    <td>Dates</td>
                    <td>Total count</td>
                    <td>Delta count</td>
                    <td>Delta7 count</td>
                </thead>
                <!-- <tbody name="rows" is="transition-group"> -->
                <tbody >
                            <tr v-for="data in pagedData" v-bind:key="data[0]" ref="row" class="rows">
                                <td>{{ data[0] }}</td>
                                <td><CaseSection :sectionData="data[1].total"/></td>
                                <td><CaseSection :sectionData="data[1].delta" /></td>
                                <td><CaseSection :sectionData="data[1].delta7"/></td>
                            </tr>
                </tbody>
            </table>
        </Transition>
            <h2 v-if="!pagedData.length" class="noResults">No results found......</h2>
            <!-- <PaginationComponent :paginationLength='Math.ceil(filteredData.length/25)' :onChangePagination="onChangePagination"/> -->
        </div>

        <transition name="fade">
            <div id="pagetop"  @click="onClickTopBtn" class="scrollTo" v-show="topShowBtn && pagedData.length">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none"
                stroke="#fff"
                stroke-width="1" stroke-linecap="square" stroke-linejoin="arcs">
                <path d="M18 15l-6-6-6 6"/>
            </svg>
            </div>
        </transition>
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
import PaginationComponent from '../Pagination/Pagination.vue'
import { DETAIL_PAGE_SORT_OPTION } from '../../constant'
import Button from '../Button/Button.vue';

export default {
    name: 'DetailPage',

    data(){
        return {
            order: 'asec',
            choosedDate: '',
            sort: '',
            stateName: '',
            timeId: '',
            topShowBtn: false,
            page: 1,
        }
    },

    mounted() {
        this.stateName = this.$route.params.state;
        this.fetchDateWiseData();
        // this.onChangePagination(1);
    },

    beforeDestroy() {
      this.$refs.scrollContainer.removeEventListener('scroll', this.handleScroll);
    },

    watch: {
        pagedData(newValue, oldValue){
            console.log(newValue,oldValue)
            if(newValue != oldValue){
                console.log('fgrtngrn')
                this.scrollToPosition();
            }
        },

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
        },

        pagedData() {
            const start = (this.page - 1) * 25;
            const end = start + 25;
            return this.filteredData.slice(start,end)
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

        handleScroll(event) {
            const scrollContainer = this.$refs.scrollContainer;
            const scrollHeight = scrollContainer.scrollHeight;
            const scrollTop = scrollContainer.scrollTop;
            localStorage.setItem('scrollPosition', scrollTop);
            const clientHeight = scrollContainer.clientHeight;
            // this.intersectionHandler();
            if (scrollTop + clientHeight >= scrollHeight) {
                this.page++;
                this.topShowBtn = true
            }
            else {
                this.topShowBtn = false
            }
        },

        onClickTopBtn() {
            this.$refs.scrollContainer.scrollTo({top: 0, behavior: "smooth" });
        },

        scrollToPosition () {
            const savedScrollPosition = localStorage.getItem('scrollPosition');
            if (this.timeId) {
              clearTimeout(this.timeId);
            }
            this.timeId = setTimeout(() => {
                console.log(savedScrollPosition);
                this.$refs.scrollContainer.scrollTop = savedScrollPosition || 0;
            }, 500);
        },
        // onChangePagination(val) {
        //     this.page = val;
        //     const start = (val - 1) * 25;
        //     const end = start + 25;
        //    console.log(this.filteredData.slice(start,end))
        // }

    },

    components: {
    SelectBox,
    InputBox,
    CaseSection,
    CustomButton,
    RadioButton,
    PaginationComponent,
    Button
}
}

</script>

<style scoped>

body{
    overflow-y: hidden;
}

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

tr, td {
    border: 1px solid black;
    
}

.detailPageContainer {
    height: 98vh; 
    overflow-y: scroll;

}

.fade-enter-active {
  animation: added 1s;
}

.fade-leave-active {
    animation: added 1s reverse;
}

@keyframes added {
    from {
      opacity: 0;
      translate: -100px 0;
    }
    to {
      opacity: 1;
      translate: 0 0;
    }
  }
.scrollTo {
    position: fixed;
    bottom: 0;
    color: white;
    background-color: gray;
}

.rows-enter-active, .rows-leave-active {
  transition: opacity 1s;
}
.rows-enter, .rows-leave-to {
  opacity: 0;
}

tr.rows {
  display: table-row;
  animation: anim 0.5s ease;
}

@keyframes anim {
  0% {
    transform: scaleY(0);
  }
  100% {
    transform: scaleY(1);
  }
}

</style>


<!-- const row = document.querySelectorAll('.rowClass');
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    })
});
row.forEach((el) => observer.observe(el))  -->