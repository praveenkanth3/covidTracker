<template>
    <div>
        <div v-for="keys in Object.keys(caseDetail)" :key="keys">{{ caseDetail?.[keys] }}: {{ sectionData?.[keys] || '-'  }}</div>
    </div>
</template>

<script>
export default {
    name: 'CaseSection',

    data () {
        return {
            caseDetail: { confirmed: 'Confimed', deceased: 'Deceased', recovered: 'Recovered'}
        }
    },
    
    props:{
        sectionData:{
            type: Object,
            required: true,
        }
    }
}

</script>