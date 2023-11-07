<template>
    <div>
        <div>Confirmed: {{  sectionData?.confirmed || '-'}}</div>
        <div>Recovered: {{ sectionData?.recovered || '-'}}</div>
        <div>Deceased: {{ sectionData?.deceased || '-'}}</div>
    </div>
</template>

<script>
export default {
    name: 'CaseSection',

    // mounted (){
    //     console.log(this.sectionData)
    // },

    props:{
        sectionData:{
            type: Object,
            required: true
        }
    }
}

</script>