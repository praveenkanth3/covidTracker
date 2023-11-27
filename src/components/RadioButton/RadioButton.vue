<template>

    <div class="radioBtn">
        <label :for="label" @click="$emit('onChangeRadioBtn', value)">
                <input type="radio" :value="value" :name="label" :id="label" :checked="defaultVal === value"/> {{ label }}
        </label>
    </div>

</template>

<script>

export default {
    name: 'RadioButton',

    props: {

        label: {
            type: String,
            required: true
        },

        value: {
            type: String,
            required: true
        },

        defaultVal: {
            type: String,
            default: ''
        }
    },

}


</script>

<style>

.radioBtn{
    display: flex;
}

</style>
