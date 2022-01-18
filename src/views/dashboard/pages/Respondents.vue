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

            <div class="font-weight-light" style="float: right; margin-top: -60px;">
               <v-btn
                    elevation="2"
                    fab
                    @click="navigateTo({name: 'Add Respondent'})"
                > <v-icon>mdi-account-plus</v-icon>
                </v-btn>
            </div>
          </template>

      <v-simple-table>
        <thead>
          <tr>
            <th class="primary--text">
              ID
            </th>
            <th class="primary--text">
              Name
            </th>
            <th class="primary--text">
              Facility
            </th>
            <th class="primary--text">
              Phone (primary)
            </th>
            <th class="primary--text">
              Phone (secondary)
            </th>
            <th class="primary--text">
              Email
            </th>
            <th class="primary--text">

            </th>
          </tr>
        </thead>

        <tbody
         v-for="respondent in respondents"
         :key="respondent.id"
        >
          <tr>
            <td>{{respondent.id}}</td>
            <td>{{respondent.first_name+" "+respondent.last_name}}</td>
            <td>{{respondent.facility_code}}</td>
            <td>{{respondent.phone_pri}}</td>
            <td>{{respondent.phone_sec}}</td>
            <td>{{respondent.email}}</td>
            <td class="action-edit-btn">
                <v-btn
                    elevation="3"
                    fab
                    @click="navigateTo({name: 'Edit Respondent'},respondent.id)"
                > <v-icon>mdi-account-edit</v-icon>
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
import respondentService from '../../../services/RespondentService'

export default {
  components: {  },
  data() {
    return {
      respondents: null
    }
  },
  methods: {
    navigateTo(route, id){
      this.$store.dispatch('setRespondentIdEdit', id)
      this.$router.push(route)
    }
  },
  async mounted() {
    // (await itemsService.index()).data
    this.respondents = (await respondentService.index()).data
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
}
</style>