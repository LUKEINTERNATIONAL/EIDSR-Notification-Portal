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
                    :label="field_label.email"
                    required
                    class="purple-input"
                    :rules="[rules.email]"
                   v-model="respondent.email"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    :label="field_label.first_name"
                    required
                    class="purple-input"
                    :rules="[rules.name]"
                   v-model="respondent.first_name"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    :label="field_label.last_name"
                    required
                    class="purple-input"
                    :rules="[rules.name]"
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
                    :label="field_label.phone_pri"
                    type="text"
                    :rules="[rules.phone]"
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
                    :rules="[rules.phone]"
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
                  <multiselect :rules="[rules.required]" v-model="respondent.role_id" deselect-label="Can't remove this value" track-by="name" label="name" placeholder="Select role (Required)" :options="options" :searchable="false" :allow-empty="false">
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
              required: (value) => !!value || 'Required',
              phone: (value) => /^\+\d{12}$$/gm.test(value) || 'Required/+265',
              name: (value) =>  /^([A-Z][a-z]*)([\\s\\\'-][A-Z][a-z]*)*/gm.test(value) || 'Required',
              email: (value) => /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}/gm.test(value) || 'Required'
            },
            options: [
              { name: 'MOH', id: 1 },
              { name: 'Implemenation Partner', id: 2}
            ],
            field_label: {
              first_name: 'First Name',
              last_name: 'Last Name',
              phone_pri: 'Phone (primary)',
              email: 'Email Address',
              role_id: 'Select role (Required)'
            }  
        }
    },
    async mounted() {
      let data = (await roleService.index()).data
      data = data.map(item => {
        const option = {
          id: item.id,
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
                let fieldError;
                let object = this.respondent
                for (const key in object) {
                  if (Object.hasOwnProperty.call(object, key)) {
                    const el = object[key]
                    if(typeof(el) == "undefined") {
                      let object2 = this.field_label
                      for (const key2 in object2) {
                        if (Object.hasOwnProperty.call(object2, key2)) {
                          if (key == key2) {
                            fieldError = object2[key2]
                          }                           
                        }
                      }
                    }
                  }
                }
                this.error = "Please fill in the required field: "+fieldError

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