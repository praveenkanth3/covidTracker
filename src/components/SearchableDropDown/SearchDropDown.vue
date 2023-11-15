<template>
    <div class="selectBox">
        <input :placeholder="placeholder" v-model="searchInput"  class="inputBox" @focus="() => showOptions()" />
        <div v-if="optionShow" class="dropdownContainer">
            <div class="dropdownItem" v-for="(option, index) in filteredOptions" :key="index" @click="() => onClickDropDownItem(option)">
                {{ option }}
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'SearchableDropDown',

    data() {
        return {
            searchInput: '',
            optionShow: false 

        }
    },

    computed: {
      filteredOptions() {
        const filtered = [];
        const regOption = new RegExp(this.searchInput, 'ig');
        for (const option of this.options) {
          if (this.searchInput.length < 1 || option.match(regOption)){
            filtered.push(option);
          }
        }
        return filtered;
      }
    },

    methods: {
        onClickDropDownItem(option) {
            this.searchInput = option
            this.$emit("onChangeDist", option);
            this.optionShow = false;
        },

       showOptions(){
          this.searchInput = '';
          this.optionShow = true;
      },
    },

    props: {
        options: {
            type: Array,
            required: true
        },

        placeholder: {
            type: String,
            required: true
        }

    }
}

</script>

<style scoped>
.selectBox {
    position: relative;
    display: block;
    margin: auto;
}

.inputBox {
      background: #fff;
      cursor: pointer;
      border: 1px solid #e7ecf5;
      border-radius: 3px;
      color: #333;
      display: block;
      padding: 5px;
      width:125px;
    }
    .dropdownContainer {
      position: absolute;
      background-color: #fff;
      min-width: 248px;
      max-width: 248px;
      max-height: 248px;
      border: 1px solid #e7ecf5;
      overflow: auto;
      z-index: 1;
    }
    .dropdownItem {
        color: black;
        padding: 8px;
        text-decoration: none;
        display: block;
        cursor: pointer;
      }

    .dropdownItem:hover {
        background-color: #e7ecf5;
    }

    .dropdownContainer {
        display: none;
    }

    .selectBox:hover .dropdownContainer {
      display: block;
    }
</style>