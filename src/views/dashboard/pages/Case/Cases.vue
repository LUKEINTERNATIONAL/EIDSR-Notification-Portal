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
              Facility Code
            </th>
            <th class="primary--text">
              Condition (name)
            </th>
            <th class="primary--text">
              Less Than and Equal to Five Years
            </th>
            <th class="primary--text">
              Greater Than Five Years
            </th>
            <th class="primary--text">
              Date
            </th>
          </tr>
        </thead>

        <tbody
         v-for="_case in cases"
         :key="_case.id"
        >
          <tr>
            <td>{{_case.id}}</td>
            <td>{{_case.facility_code}}</td>
            <td>{{_case.condition_name}}</td>
            <td>{{_case.less_five_years}}</td>
            <td>{{_case.greater_equal_five_years}}</td>
            <td>{{ moment(_case.createdAt).format('MMMM Do YYYY, h:mm:ss a') }}</td>
          </tr>
        </tbody>
      </v-simple-table>
    </base-material-card>

    <div class="py-3" />
  </v-container>
</template>

<script>
import caseService from '../../../../services/CaseService'
var moment = require('moment')

export default {
  components: {  },
  data() {
    return {
      cases: null,
      moment: moment
    }
  },
  methods: {
  },
  async mounted() {
    // (await itemsService.index()).data
    this.cases = (await caseService.index()).data
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