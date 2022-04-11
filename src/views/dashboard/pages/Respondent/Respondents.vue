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
              Role
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

        <tbody>
          <tr v-for="respondent of respondents"
            :key="respondent.id">
            <td>{{respondent.id}}</td>
            <td>{{respondent.name}}</td>
            <td>{{respondent.role}}</td>
            <td>{{respondent.phone1}}</td>
            <td>{{respondent.phone2}}</td>
            <td>{{respondent.email}}</td>
            <td class="action-edit-btn">
                <v-btn
                    style="background-color: #5757e7"
                    elevation="3"
                    fab
                    @click="navigateTo({name: 'Edit Respondent'},respondent.id)"
                > <v-icon>mdi-account-edit</v-icon>
                </v-btn>

                <v-btn
                    style="margin-left: 33px; background-color: #e46048"
                    elevation="3"
                    fab
                    @click="removeRespondent(respondent.id)"
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
import respondentService from '../../../../services/RespondentService'
import roleService from '../../../../services/RoleService'

export default {
  components: {  },
  data() {
    return {
      respondents: [],
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
     let loader = this.$loading.show({
      // Optional parameters
      container: this.fullPage ? null : this.$refs.formContainer,
      canCancel: false,
      loader: 'spinner',
      width: 100,
      height: 64,
    });
    const data = (await respondentService.index()).data
     if (!!data) {
       data.map((value)=>{
          const roleName = value.role_name	
          let data = value.Respondents.map((value)=>{
            return {
              id: value.id ,
              name: value.first_name+" "+ value.last_name ,
              phone1 : value.phone_pri,
              phone2 : value.phone_sec,
              role : roleName,
              email: value.email ,
            }
          })
          this.respondents.push(...data)
          return data
        })
      loader.hide()
    }
  }
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