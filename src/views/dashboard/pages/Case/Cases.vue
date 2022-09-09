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
              Shows cases from different facilities
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
              Facility Code
            </th>
            <th class="primary--text">
              Facility Name
            </th>
            <th class="primary--text">
              Condition (name)
            </th>
            <th class="primary--text">
              Case count
            </th>
            <th class="primary--text">
              Date
            </th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="_case in cases"
           :key="_case.id">
            <td>{{_case.id}}</td>
            <td>{{_case.facility_code}}</td>
            <td>{{_case.facility_name}}</td>
            <td>{{_case.condition_name}}</td>
            <td>{{_case.count}}</td>
            <td>{{ moment(_case.createdAt).format('MMMM Do YYYY, h:mm a') }}</td>
          </tr>
        </tbody>
      </v-simple-table>
    </base-material-card>

    <div class="py-3" />
  </v-container>
</template>

<script>
import caseService from '../../../../services/CaseService'
import FacilityService from '../../../../services/FacilityService'
var moment = require('moment')

export default {
  components: {  },
  data() {
    return {
      cases: null,
      facilities: null,
      moment: moment,
      search: '',
      toBeFilteredCases: null
    }
  },
  watch: {
    search(newQuery, oldQuery) {
      if(this.cases != null) {
        let tempFiltredCases = []
        this.toBeFilteredCases.forEach(_case => {
          const position = _case.condition_name.toLowerCase().search(newQuery.toLowerCase())
          if (position > -1) {
            tempFiltredCases.push(_case)
          }
        })
        this.cases = tempFiltredCases
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
    const cases = (await caseService.index()).data
    this.facilities = (await FacilityService.index()).data

    if(!!cases && !!this.facilities){
      let tmp_cases = []
      this.facilities.forEach(facility => {
        cases.forEach(_case => {
          if(facility.facility_code == _case.facility_code) {
            tmp_cases.push({
              id: _case.id,
              facility_code: _case.facility_code,
              facility_name: facility.name,
              condition_name: _case.condition_name,
              count: parseInt(_case.less_five_years) + parseInt(_case.greater_equal_five_years),
              createdAt: _case.createdAt
            })
          }
        });
      });
      this.cases = tmp_cases.reverse()
      this.toBeFilteredCases = this.cases
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