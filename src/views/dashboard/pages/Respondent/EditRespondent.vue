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
            icon="mdi-account-edit"
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
                    type="text"
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
                    type="text"
                    v-model="respondent.phone_sec"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                <div>
                  <multiselect v-model="respondent.role_id" :rules="[rules.required]" deselect-label="Can't remove this value" track-by="name" label="name" :placeholder="role_place_holder" :options="options" :searchable="false" :allow-empty="false">
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
                    @click="EditRespondent(respondent.id)"
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
import respondentService from '../../../../services/RespondentService'
import roleService from '../../../../services/RoleService'

export default {
    data() {
        return {
            respondent: {
                id: null,
                first_name: this.first_name,
                last_name: this.last_name,
                phone_pri: this.phone_pri,
                email: this.email,
                facility_code: this.facility_code,
                role_id: this.role_id,
                about: this.about,
                phone_sec: this.phone_sec,
                user_name: this.user_name,
            },

            error: null,
            rules: {
              required: (value) => !!value || 'Required.'
            },
            options: [
              { name: 'MOH', id: 1 },
              { name: 'Implemenation Partner', id: 2}
            ],
            role_place_holder: this.role_place_holder
        }
    },
    methods: {
      async EditRespondent(id){
            this.error = null
            const areAllFieldsFilledIn = Object
               .keys(this.respondent)
               .every(key => !!this.respondent[key])

            // if(!areAllFieldsFilledIn) {
            //     this.error = "Please fill in the required fields."
            //     return
            // }
            try {
              this.respondent.role_id = this.respondent.role_id.id
              await respondentService.put(this.respondent, id)
              this.$router.push({
                name: 'Respondents'
              })
            } catch (err) {
              this.error = err.response.data.error
            }
      }
    },
     async mounted() {
         this.error = null
         const id = this.$store.state.respondentIdEdit
         try {
             const data = (await respondentService.show(id)).data
             const roles = (await roleService.index()).data
             this.respondent.id = data.id
             this.respondent.email = data.email
             this.respondent.first_name = data.first_name
             this.respondent.last_name = data.last_name
             this.respondent.phone_pri = data.phone_pri
             this.respondent.user_name = data.user_name
             this.respondent.phone_sec = data.phone_sec
             this.respondent.about = data.about

            roles.forEach(role => {
              //console.log(this.respondent.role_id)
              if (role.id == data.role_id) {
               this.role_place_holder = role.role_name
              }
            });
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