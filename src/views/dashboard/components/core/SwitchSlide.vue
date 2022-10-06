<template>
    <v-container
        class="px-0"
        fluid
    >
        <v-switch
        v-model="toogle"
        inset
        ></v-switch>
    </v-container>
</template>
<script>
export default{
    data() {
        return {
            toogle: true
        }
    },
    props: {
        active: {
            default: 0,
            type: Number,
        },
    },
    async mounted() {
        console.log(this.active)
        this.toogle = Boolean(this.active)
    }
}
</script>
