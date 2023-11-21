<template>

    <div class="paginationContainer">
        <div @click="onClickPrev" :class="page === 1 ? 'hideClass' : ''">Prev</div>
        <div class="numbersContainer">
            <div v-for="n in paginationLength" :key="n" :class="n === page ? 'selectedNumber' : 'normalPageNumber' " @click="() => onClickNumbers(n)">{{ n }}</div>
        </div>
        <div @click="onClickNext" :class="page === paginationLength ? 'hideClass' : ''">Next</div>
    </div>

</template>
<script>

export default {
    name: 'PaginationComponent',

    data () {

        return {
             page: 1
        }
         
    },

    methods: {

        onClickPrev() {
            this.page -=1;
            this.onChangePagination(this.page);
        },

        onClickNext() {
            this.page +=1; 
            this.onChangePagination(this.page);

        },

        onClickNumbers(n) {
            this.page = n;
            this.onChangePagination(n)   
        },

    },

    props: {

        paginationLength: {

            type: Number,
            required: true,
    
        },

        onChangePagination : {
            
            type: Function,
            required: true,

        },

    },

}

</script>

<style>
.paginationContainer{
    display: flex;
    column-gap: 20px;
    margin: 10px 0;
    background-color: rgb(236, 231, 231);
    position: sticky;
    bottom: 0;
}

.selectedNumber {
    background-color: blue;
    color: white;
    width:20px;
    text-align: center;
}

.normalPageNumber {
    width: 20px;
    cursor: pointer;
    text-align: center;
}

.numbersContainer {
    display: flex;
    column-gap: 10px;
    width: 1000px;
    overflow-x: scroll; 
    
}

.hideClass {
    visibility: hidden ;
}


</style>