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
        <base-material-card>
          <template v-slot:heading>
            <div class="display-2 font-weight-light">
              Edit Profile
            </div>

            <div class="subtitle-1 font-weight-light">
              Complete your profile
            </div>
          </template>

          <v-form>
            <v-container class="py-0">
              <v-row>
                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    label="Company (disabled)"
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
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    label="Email Address"
                    class="purple-input"
                    v-model="user.email"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    label="First Name"
                    class="purple-input"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    label="Last Name"
                    class="purple-input"
                  />
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    label="Adress"
                    class="purple-input"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    label="City"
                    class="purple-input"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    label="Country"
                    class="purple-input"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    class="purple-input"
                    label="Postal Code"
                    type="number"
                  />
                </v-col>

                <v-col cols="12">
                  <v-textarea
                    class="purple-input"
                    label="About Me"
                    value="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                  />
                </v-col>

                <v-col
                  cols="12"
                  class="text-right"
                >
                  <v-btn
                    color="success"
                    class="mr-0"
                  >
                    Update Profile
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
import userService from '../../../services/UserService'
export default {
    data() {
      return {
          user: {
              id: null,
              first_name: this.first_name,
              last_name: this.last_name,
              phone_pri: this.phone_pri,
              email: this.email,
              facility_code: this.facility_code,
          },
          about: this.about,
          phone_sec: this.phone_sec,
          user_name: this.user_name,

          error: null,
          rules: {
            required: (value) => !!value || 'Required.'
          }
      }
    },
    methods: {
      logout(){
      //unset login state
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      //redirect
      this.$router.push({
        name: 'login'
      })
    }
    },
    async mounted() {
      console.log("...")
      this.error = null
      const id = this.$store.state.user.id
      try {
          const data = (await userService.show(id)).data

          this.user.id = data.id
          this.user.email = data.email
          this.user.first_name = data.first_name
          this.user.last_name = data.last_name
          this.user.phone_pri = data.phone_pri
          this.user.facility_code = data.facility_code
          this.user.user_name = data.user_name
          this.user.phone_sec = data.phone_sec
          this.user.about = data.about

          console.log("data: ",data)
          
      } catch (err) {
          console.log(err.response.data.error)
      }
    }
  }
</script>
