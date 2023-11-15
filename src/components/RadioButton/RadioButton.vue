<template>

    <div class="radioBtn">
        <label :for="label" @click="$emit('onChangeRadioBtn', value)">
                <input type="radio" :value="value" name="order" :id="label" /> {{ label }}
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
    },

}


</script>

<style>

.radioBtn{
    display: flex;
}

</style>