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
          append-icon="mdi-magnify"
          ></v-text-field>
        </div>
      </div>
    </template>
    <v-data-table
    :headers="headers"
    :items="conditions"
    :items-per-page="5"
    :search="search"
    :page="page"
    :pageCount="numberOfPages"
    :options.sync="options"
    :server-items-length="total"
    :loading="loading"
    class="elevation-1 mytable"
    >
    <template slot="item.active" slot-scope="props">
      <switch-slide :active="props.item.active" />
    </template>
    </v-data-table>
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
      headers: [
        {
          text: 'id',
          align: 'start',
          sortable: false,
          value: 'id',
        },
        { text: 'Code', value: 'code' },
        { text: 'Name', value: 'name' },
        // { text: 'Active', value: 'active' },
        // { text: 'Paired IDs', value: 'paired_with_conditions_ids' }
      ],
      conditions: [],
      moment: moment,
      search: '',
      page: 0,
      numberOfPages: 0,
      total: 0,
      options: {},
      loading: true,
    }
  },
  watch: {
    options: {
      handler() {
        this.readDataFromAPI();
      },
    },
    //deep: true,
  },
  methods: {
    async readDataFromAPI() {
    this.loading = true
    const { page, itemsPerPage } = this.options
    const data = (await ConditionService.paginatedIndex(page-1,itemsPerPage)).data
    this.conditions = data.rows
    this.total = data.count
    this.numberOfPages = this.total;

    if(!!this.conditions){
      this.conditions =  this.conditions.reverse()
      this.loading = false
    }
    }
  },

  async mounted() {
    this.readDataFromAPI()
  },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.v-icon {
  font-size: 70px;
}

.msg-bn {
  font-size: 25px !important;
  float: bottom;
}

.theme--light.v-data-table {
  background-color: #f8f8f8;
  color: rgba(0, 0, 0, 0.87);
  font-weight: 100;
}
</style>