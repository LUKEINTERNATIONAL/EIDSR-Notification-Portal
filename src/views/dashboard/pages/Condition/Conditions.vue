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
      <div>
        <tr>
          <td>
            <div class="clip-b font-weight-light">
              <v-icon>mdi-clipboard-text</v-icon> 
            </div>
          </td>
          <td>
            <div class="msg-bn">
              Conditions
            </div>
          </td>
        </tr>
      </div>

      <div>
        <div class="font-weight-light" style="float: right; margin-top: -60px;">
          <v-text-field
          v-model="search"
          label="Search"
          class="mx-4"
          ></v-text-field>
        </div>
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
              Active
            </th>
            <th class="primary--text">
              Paired With
            </th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="_condition in conditions"
           :key="_condition.id">
            <td>{{_condition.code}}</td>
            <td>{{_condition.name}}</td>
            <td>
              <switch-slide :active="_condition.active" />
            </td>
             <td>{{_condition.paired_with_conditions_ids}}</td>
          </tr>
        </tbody>
      </v-simple-table>
    </base-material-card>

    <div class="py-3"/>
  </v-container>
</template>

<script>
import ConditionService from '../../../../services/ConditionService'
import SwitchSlide from '../../components/core/SwitchSlide.vue'
var moment = require('moment')

export default {
  components: { SwitchSlide },
  data() {
    return {
      conditions: null,
      moment: moment,
      search: '',
      toBeFilteredconditions: null
    }
  },
  watch: {
    search(newQuery, oldQuery) {
      if(this.conditions != null) {
        let tempFiltredconditions = []
        this.toBeFilteredconditions.forEach(_condition => {
          const position = _condition.condition_name.toLowerCase().search(newQuery.toLowerCase())
          if (position > -1) {
            tempFiltredconditions.push(_condition)
          }
        })
        this.conditions = tempFiltredconditions
      }
    }
  },
  methods: {
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
    this.conditions = (await ConditionService.index()).data

    if(!!this.conditions){
      let tmp_conditions = this.conditions
      this.conditions = tmp_conditions.reverse()
      this.toBeFilteredconditions = this.conditions
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
.v-data-table > .v-data-table__wrapper > table > tbody > tr > th, .v-data-table > .v-data-table__wrapper > table > thead > tr > th, .v-data-table > .v-data-table__wrapper > table > tfoot > tr > th {
  font-weight: 400 !important;
  font-size: 15px !important;
}
.v-data-table > .v-data-table__wrapper > table > tbody > tr > td, .v-data-table > .v-data-table__wrapper > table > thead > tr > td, .v-data-table > .v-data-table__wrapper > table > tfoot > tr > td {
  font-weight: 400 !important;
  font-size: 15px !important;
}
.msg-bn {
  font-size: 25px !important;
  float: bottom;
}
.v-data-table {
  overflow: scroll !important;
  max-height: 515px !important;
}
</style>