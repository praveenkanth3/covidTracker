<template>
    <div class='btnContainer'>
        <button @click="onClickBtn">{{ label }}</button>
    </div>

</template>

<script>

export default {
    name: 'CustomButton',

    props: {
        label: {
            type: String,
            required: true,
        },

        onClickBtn: {
            type: Function,
            required: true,
        }
    }
}

</script>

<style>
button{
    width:fit-content;
}

.btnContainer{
    display: flex;
    justify-content: center;
}
</style>