<template>
  <div>
    <v-app v-bind:style="{ backgroundImage: 'url(' + image.background + ')' }">
      <v-card elevation="8" raised="true"  class="lgn-card">
        <v-container class="lgn-container" title="Login">
            <div>
              <v-row>
                <v-col cols="3">
                  <v-img class="lgn-img"  v-bind:src="image.msg" />
                </v-col>
                <v-col style="margin-top: 6%">
                  <label class="lgn-txt">EIDSR Notification Portal</label>
                </v-col>
              </v-row>
            </div>
            <div class="lgn-form">
              <v-text-field
              type="email"
              name="email"
              v-model="email"
              placeholder="email"/>
              <br>
              <v-text-field 
              type="password"
              name="password"
              v-model="password"
              placeholder="password"/>
              <br>
              <v-row>
                <v-col>
                  <div class="error1" v-html="error"/>
                </v-col>
                <v-col>
                  <v-btn class="cyan lgn-btn"
                  @click="login">Login</v-btn>
                </v-col>
              </v-row>
            </div>
        </v-container>
      </v-card>
      <v-footer class="footer" fixed="true">
        <v-row>
          <v-col cols="1">
            <v-img class="ftr-img f-img"  v-bind:src="image.malawiGovn" />
          </v-col>
          <v-col cols="1">
            <v-img class="ftr-img sl-img"  v-bind:src="image.pepfar" />
          </v-col>
          <v-col cols="1">
            <v-img class="ftr-img ls-img"  v-bind:src="image.lin" />
          </v-col>
        </v-row>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
import AuthenticationService from '../../services/AuthenticationService'

export default {
  components: {  },
  data() {
    return {
      email: '',
      password: '',
      error: null,
       connectionStatus: false,
      image: {
      msg: 'msg.jpg',
      background: 'login.jpg',
      malawiGovn: 'Malawi-Coat_of_arms_of_arms.png',
      pepfar : 'PEPFAR.png',
      lin : 'LIN.png'
      }
    }
  },
  methods: {
    async login() {
      if(!this.connectionStatus) {
        //this.tryToConnect()
        this.sendRequest()
      }

    },
    tryToConnect(){
      var counter = 0
      var i = setInterval(function(){
          this.sendRequest()
          counter++;
          if(counter === 10) {
              clearInterval(i);
          }
      }, 1000);
    },
    async sendRequest() {
        try {
          const response = await AuthenticationService.login({
            email: this.email,
            password: this.password
          })
          this.$store.dispatch('setToken', response.data.token)
          this.$store.dispatch('setUser', response.data.user)
          this.connectionStatus = true
          this.$router.push({
            name: 'Dashboard'
          })
      } catch (error) {
          this.connectionStatus = true
          this.error = error.response.data.error
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.error1 {
  color: red;
  font-size: 15px;
}
.lgn-img {
  width: 100%;
}
.lgn-txt {
  font-size: 50px;
  line-height: 80px;
  color: #494948;
}
.lgn-form {
  width: 90%;
}
.lgn-container {
  margin-top: 1%;
  margin-left: 4%;
}
.lgn-btn {
  float: right;
  margin-top: -3%;
  font-size: 22px !important;
}
.v-application .cyan {
    background-color: #0f5a93 !important;
    border-color: #0f5a93 !important;
}
.lgn-card {
  margin-left: 22%;
  margin-top: 6%;
  width: 50%;
  opacity: 0.9;
}
#body {
  overflow-y: hidden; /* Hide vertical scrollbar */
  overflow-x: hidden; /* Hide horizontal scrollbar */
}
.v-text-field {
  font-size: 22px !important;
}

.v-footer {
    padding: 0px 0 0px 4px;
    border-top: solid 1px !important;
    position: absolute;
}
.footer {
  background-color: #ececeb;
  opacity: 0.9;
  margin-top: -83%;
}
.f-img {
  width: 57%;
  height: 98%;
  margin-left: 40%;
}
.sl-img {
  margin-top: 10%;
}
.ls-img {
  margin-top: 16%;
}
.row {
  margin: 0;
}
.v-application {
  background-size: cover;
}
</style>
