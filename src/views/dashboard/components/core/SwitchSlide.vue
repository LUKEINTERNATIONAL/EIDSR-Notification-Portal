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
import customMessageService from '../../../../services/CustomMessageService'

export default{
    data() {
        return {
            toogle: true,
            firstMount: 0
        }
    },
    props: {
        active: {
            default: 0,
            type: Number,
        },
        customMessageId: {
            type: Number
        }
    },
    watch: {
        toogle (val, oldVal) {
            if (this.firstMount) {
                this.firstMount = 0
                return
            }
            this.confirmChange(val)
      },
    },
    async mounted() {
        if (this.active == 0) {
            this.firstMount = 1
        }
        this.toogle = Boolean(this.active)
    },
    methods: {
        confirmChange(val) {
            if (confirm("Cornfirm changes!") == true) {
                const i = val ? 1 : 0
                const response = (customMessageService.put({
                    active: i
                }, this.customMessageId ))
            }
        }
    }
}
</script>
