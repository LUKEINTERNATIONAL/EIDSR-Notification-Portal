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
              Status
            </th>
            <th class="primary--text">
              Date
            </th>
            <th class="primary--text">

            </th>
          </tr>
        </thead>

        <tbody
         v-for="message in messages"
         :key="message.id"
        >
          <tr>
            <td>{{message.id}}</td>
            <td>{{message.respondent_id}}</td>
            <td>{{message.body}}</td>
            <td>{{message.status}}</td>
            <td>{{ moment(message.createdAt).format('MMMM Do YYYY, h:mm:ss a')}}</td>
            <td class="action-edit-btn">
                <v-btn
                    style="background-color: #5757e7"
                    elevation="3"
                    fab
                    @click="navigateTo({name: 'Edit Respondent'},message.id)"
                > <v-icon>mdi-account-edit</v-icon>
                </v-btn>

                <v-btn
                    style="margin-left: 33px; background-color: #e46048"
                    elevation="3"
                    fab
                    @click="removeRespondent(message.id)"
                > <v-icon>mdi-account-remove</v-icon>
                </v-btn>
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
      moment: moment
    }
  },
  methods: {
    navigateTo(route, id){
      this.$store.dispatch('setRespondentIdEdit', id)
      this.$router.push(route)
    },
    async removeRespondent(id) {
      if(confirm("Do you really want to delete?")){
        try {
          const respondent = (await respondentService.delete(id)).data

          if(!!respondent)
            this.$router.go(this.$router.currentRoute)
        } catch (err) {
          console.log(err)
        } 
      }
    }
  },
  async mounted() {
    // (await itemsService.index()).data
    this.messages = (await messageService.index()).data
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
</style>