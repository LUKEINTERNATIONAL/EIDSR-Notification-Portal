<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >

    <base-material-card
      icon=""
      title=""
      class="px-5 py-3"
    >
    <template v-slot:heading>
    <div class="clip-b font-weight-light">
      <v-icon>mdi-clipboard-text</v-icon> 
    </div>
    </template>
      <v-simple-table>
        <thead>
          <tr>
            <th class="primary--text">
              ID
            </th>
            <th class="primary--text">
              Respondent ID
            </th>
            <th class="primary--text">
              Message
            </th>
            <th class="primary--text">
              SMS Status
            </th>
            <th class="primary--text">
              Email Status
            </th>
            <th class="primary--text">
              Date
            </th>
            <th class="primary--text">

            </th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="message in messages"
              :key="message.id">

            <td>{{message.id}}</td>
            <td>{{message.respondent_id}}</td>
            <td>{{message.body}}</td>
            <td>{{message.status}}</td>
            <td>{{ emailStatus(message.email_status) }}</td>
            <td>{{ moment(message.createdAt).format('MMMM Do YYYY, h:mm:ss a') }}</td>
            <td class="action-edit-btn">

                <div class="tooltip">
                <v-btn
                    style="margin-left: 33px; background-color: #e46048"
                    elevation="3"
                    fab
                    @click="deleteMessage(message.id)"
                > <v-icon>mdi-delete</v-icon>
                </v-btn>
                 <span class="tooltiptext">delete</span>
                </div>

            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </base-material-card>

    <div class="py-3" />
  </v-container>
</template>

<script>
import messageService from '../../../../services/MessageService'
var moment = require('moment')

export default {
  components: {  },
  data() {
    return {
      messages: null,
      moment: moment,
      fullPage: false
    }
  },
  methods: {
    navigateTo(route, id){
      this.$store.dispatch('setRespondentIdEdit', id)
      this.$router.push(route)
    },
    async deleteMessage(id) {
      if(confirm("Do you really want to delete?")){
        try {
          const message = (await messageService.delete(id)).data

          if(!!message)
            this.$router.go(this.$router.currentRoute)
        } catch (err) {
          console.log(err)
        } 
      }
    },
    emailStatus(statusId) {
      if(parseInt(statusId))
        return "Sent"
      else 
        return "pending"
    }
  },
  async mounted() {
    let loader = this.$loading.show({
      // Optional parameters
      container: this.fullPage ? null : this.$refs.formContainer,
      canCancel: false,
      loader: 'spinner',
      width: 100,
      height: 64,
    });
    this.messages = (await messageService.index()).data
    if (!!this.messages) {
     loader.hide()
    }
  },
}
</script>
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.v-icon {
  font-size: 70px;
}
.action-edit-btn .v-btn--fab.v-size--default{
  height: 30px;
  width: 30px;
  color: #e46048;
}
/* Tooltip container */
.tooltip {
  position: relative;
  display: inline-block;
}

/* Tooltip text */
.tooltip .tooltiptext {
  visibility: hidden;
  width: 50px;
  background-color: rgb(32, 30, 30);
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;
 
  /* Position the tooltip text - see examples below! */
  position: absolute;
  z-index: 10;
}

/* Show the tooltip text when you mouse over the tooltip container */
.tooltip:hover .tooltiptext {
  visibility: visible;
}
</style>