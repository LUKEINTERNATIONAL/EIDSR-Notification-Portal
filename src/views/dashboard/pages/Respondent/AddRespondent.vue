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
            icon="mdi-account-plus"
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
                    label="Country (disabled)"
                    disabled
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    class="purple-input"
                    label="User Name"
                   v-model="respondent.user_name"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    label="Email Address"
                    required
                    type="email"
                    class="purple-input"
                    :rules="[rules.required]"
                   v-model="respondent.email"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    label="First Name"
                    required
                    class="purple-input"
                    :rules="[rules.required]"
                   v-model="respondent.first_name"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    label="Last Name"
                    required
                    class="purple-input"
                    :rules="[rules.required]"
                   v-model="respondent.last_name"
                  />
                </v-col>


                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    class="purple-input"
                    required
                    label="Phone (primary)"
                    type="number"
                    :rules="[rules.required]"
                    v-model="respondent.phone_pri"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    class="purple-input"
                    label="Phone (secondary)"
                    type="number"
                   v-model="respondent.phone_sec"
                  />
                </v-col>

                <!-- <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    class="purple-input"
                    label="Facility code"
                    type="number"
                    :rules="[rules.required]"
                   v-model="respondent.facility_code"
                  />
                </v-col> -->
                <v-col
                  cols="12"
                  md="4"
                >
                <div>
                  <multiselect :rules="[rules.required]" v-model="respondent.role_id" deselect-label="Can't remove this value" track-by="name" label="name" placeholder="Select role" :options="options" :searchable="false" :allow-empty="false">
                  </multiselect>
                </div>
                </v-col>

                <v-col cols="12">
                  <v-textarea
                    class="purple-input"
                    label="About"
                    value="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    v-model="respondent.about"
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
                    @click="AddRespondent"
                  >
                    Add
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
import respondentService from '../../../../services/RespondentService'
import roleService from '../../../../services/RoleService'

export default {
    data() {
        return {
            respondent: {
                first_name: this.first_name,
                last_name: this.last_name,
                phone_pri: this.phone_pri,
                email: this.email,
                role_id: this.role_id
            },
            about: this.about,
            phone_sec: this.phone_sec,

            error: null,
            rules: {
              required: (value) => !!value || 'Required.'
            },
            options: [
              { name: 'MOH', id: 1 },
              { name: 'Implemenation Partner', id: 2}
            ],
            
        }
    },
    async mounted() {
      let data = (await roleService.index()).data
      data = data.map(item => {
        const option = {
          id: item.role_id,
          name: item.role_name
        }
         return option
      })
      this.options = data
    },
    methods: {
      async AddRespondent(){
            this.error = null
            const areAllFieldsFilledIn = Object
               .keys(this.respondent)
               .every(key => !!this.respondent[key])

            if(!areAllFieldsFilledIn) {
                this.error = "Please fill in the required fields."
                return
            }
            try {
              Object.assign(this.respondent, this.about)
              Object.assign(this.respondent, this.phone_sec)
              this.respondent.role_id = this.respondent.role_id.id
              await respondentService.post(this.respondent)
              this.$router.push({
                name: 'Respondents'
              })
            } catch (err) {
              this.error = err.response.data.error
            }
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