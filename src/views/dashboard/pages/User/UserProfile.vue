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
                    v-model="user.username"
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
                    v-model="user.first_name"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    label="Last Name"
                    class="purple-input"
                    v-model="user.last_name"
                  />
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    label="Adress"
                    class="purple-input"
                    v-model="user.address"
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
                    v-model="user.phone_pri"
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
                   v-model="user.phone_sec"
                  />
                </v-col>

                <v-col cols="12">
                  <v-textarea
                    class="purple-input"
                    label="About Me"
                    v-model="user.about"
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
                    @click="saveUpdatedUserDetails"
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
import userService from '../../../../services/UserService'
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
              address: this.address,
              username: this.username
          },
          about: this.about,
          phone_sec: this.phone_sec,

          error: null,
          userID: this.$store.state.user.id,
          rules: {
            required: (value) => !!value || 'Required.'
          }
      }
    },
    methods: {
      async saveUpdatedUserDetails() {
        try {
          Object.assign(this.user, this.about)
          Object.assign(this.user, this.phone_sec)

          const response = await userService.put(this.user, this.userID)
          this.$store.dispatch('setUser', response.data.user)
          this.$router.push({
            name: 'Dashboard'
          })
        } catch (err) {
          this.error = err.response.data.error
        }
      }
    },
    async mounted() {
      this.error = null
     
      try {
          const data = (await userService.show(this.userID)).data

          this.user.id = data.id
          this.user.email = data.email
          this.user.username = data.username
          this.user.first_name = data.first_name
          this.user.last_name = data.last_name
          this.user.address = data.address
          this.user.phone_pri = data.phone_pri
          this.user.facility_code = data.facility_code
          this.user.user_name = data.user_name
          this.user.phone_sec = data.phone_sec
          this.user.about = data.about
      } catch (err) {
          console.log(err.response.data.error)
      }
    }
  }
</script>
<style scoped>
.error1 {
  color: red;
}
</style>
