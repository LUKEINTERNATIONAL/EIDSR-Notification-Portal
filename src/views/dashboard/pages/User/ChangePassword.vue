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
              Change Password
            </div>

            <div class="subtitle-1 font-weight-light">
              Enter your curent and new password 
            </div>
          </template>

          <v-form>
            <v-container class="py-0">
              <v-row>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    label="Current Password"
                    class="purple-input"
                    v-model="current_password"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                  class="text-right"
                >
                  <v-text-field
                    label="New Password"
                    class="purple-input"
                    v-model="new_password_first"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    label="New Password"
                    class="purple-input"
                    v-model="new_password_second"
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
                    @click="saveUpdatedUserPassword"
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
import AuthenticationService from '../../../../services/AuthenticationService'

export default {
    data() {
      return {
        current_password: this.current_password,
        new_password_first: this.new_password_first,
        new_password_second: this.new_password_second,
        error: null,
        userID: this.$store.state.user.id,
        rules: {
          required: (value) => !!value || 'Required.'
        }
      }
    },
    methods: {
      async saveUpdatedUserPassword() {
        if(this.new_password_first !== this.new_password_second) {
          this.error = "newly entred passwords do not match"
          return

        } else {
          this.error = null

          try {
            const response = await AuthenticationService.login({
              email: this.$store.state.user.email,
              password: this.current_password
            })
            if (response) {
              try {
                await userService.put({
                  password: this.new_password_first
                }, this.userID)
                this.$router.push({
                  name: 'Dashboard'
                })
              } catch (error) {
                this.error = error.response.data.error
              }
            }
          } catch (error) {
              this.error = error.response.data.error
          }
        }
      },
    },
  }
</script>
<style scoped>
.error1 {
  color: red;
}
</style>
