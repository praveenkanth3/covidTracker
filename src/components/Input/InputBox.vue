<template>
    <div class="inputContainer">
        <div class="label">{{ label  }}</div>
        <input :type="inputType" :placeholder="placeholder" v-bind:value="value" @input="onChange($event.target.value)"/>
    </div>
</template>

<script>

export default {
    name:'InputBox',

    props:{

        label:{
            type: String,
            required: false
        },

        placeholder: {
            type: String,
            required: false
        },

        value: {
            required:true
        },
        
        inputType: {
            type: String,
            required: false,
            default: 'text'
        },

        onChange: {
            type: Function,
            required: true
        }
    }
}

</script>

<style>

.inputContainer {
    display: flex;
    column-gap: 10px;
}

.label {
    font-weight: bold;
    text-align: center;
    padding: 5px;
}

</style>