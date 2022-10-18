<template>
  <v-container
    id="user-profile"
    fluid
    tag="section"
  >
    <v-row justify="center">
      <v-col
        cols="12"
        md="8"
      >
        <base-material-card
            icon="mdi-comment-edit"
            title=""
            class="px-5 py-3"
        >

          <v-form>
            <v-container class="py-0">
              <v-row>
               
                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    class="purple-input"
                    required
                    label="Code"
                    type="text"
                    :rules="[rules.required]"
                    v-model="message.code"
                  />
                </v-col>
                
                <v-col
                  cols="12"
                >
                  <v-select
                    v-model="value"
                    :items="items"
                    chips
                    label="Select condition(s)"
                    :rules="[rules.required]"
                    multiple
                    solo
                  ></v-select>
                </v-col>

                <v-col cols="12">
                  <v-textarea
                    class="purple-input"
                    label="Custom Message"
                    value="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    :rules="[rules.required]"
                    v-model="message.body"
                  />
                </v-col>

                <v-col
                  cols="12"
                  class="text-right"
                >
                <div class="error1" v-html="error" style="float: left"/>
                  <v-btn
                    color="success"
                    class="mr-0"
                    @click="EditCustomMessage(message.id)"
                  >
                    Submit
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import customMessageService from '../../../../services/CustomMessageService'

export default {
    data() {
        return {
            message: {
                id: null,
                code: this.code,
                body: this.body,
            },

            error: null,
            rules: {
              required: (value) => !!value || 'Required.'
            },
        }
    },
    methods: {
      async EditCustomMessage(id){
            this.error = null
            const areAllFieldsFilledIn = Object
               .keys(this.message)
               .every(key => !!this.message[key])

            if(!areAllFieldsFilledIn) {
                this.error = "Please fill in the required fields."
                return
            }
            try {
              await customMessageService.put(this.message, this.message.id)
              this.$router.push({
                name: 'Custom Messages'
              })
            } catch (err) {
              this.error = err.response.data.error
            }
      }
    },
     async mounted() {
         this.error = null
         const id = this.$store.state.customMessageEditId
         try {
             const data = (await customMessageService.show(id)).data
             this.message.id = data.id
             this.message.code = data.code
             this.message.body = data.body

         } catch (err) {
             console.log(err.response.data.error)
         }
     }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
#user-profile {
  margin-bottom: 4.9%;
}
.error1 {
    color: red;
}
</style>