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
              Add, Edit and Remove Custom messages
            </div>
          </td>
        </tr>
      </div>

        <div class="font-weight-light" style="float: right; margin-top: -60px; margin-right: 50px;">
            <v-btn
                elevation="2"
                fab
                @click="navigateTo({name: 'Add Custom Message'})"
            > <v-icon>mdi-comment-plus</v-icon>
            </v-btn>
        </div>

        <div class="font-weight-light" style="float: right; margin-top: -60px; margin-right: 200px;">
          <v-text-field
          v-model="search"
          label="Search"
          class="mx-4"
          ></v-text-field>
        </div>

    </template>
      <v-simple-table>
        <thead>
          <tr>
            <th class="primary--text">
              ID
            </th>
            <th class="primary--text">
              Code
            </th>
            <th class="primary--text">
              Message
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
            <td>{{message.code}}</td>
            <td>{{message.body}}</td>
            <td>{{ moment(message.createdAt).format('MMMM Do YYYY, h:mm:ss a') }}</td>
            <td class="action-edit-btn">

                <v-btn
                    style="margin-left: 33px; background-color: #e46048"
                    elevation="3"
                    fab
                    @click="navigateTo({name: 'Edit Custom Message'}, message.id)"
                > <v-icon>mdi-comment-edit</v-icon>
                </v-btn>

                <!-- <div class="tooltip"> -->
                <v-btn
                    style="margin-left: 33px; background-color: #e46048"
                    elevation="3"
                    fab
                    @click="deleteMessage(message.id)"
                > <v-icon>mdi-delete</v-icon>
                </v-btn>
                 <!-- <span class="tooltiptext">delete</span>
                </div> -->

            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </base-material-card>

    <div class="py-3" />
  </v-container>
</template>

<script>
import customMessageService from '../../../../services/CustomMessageService'
var moment = require('moment')

export default {
  components: {  },
  data() {
    return {
      messages: null,
      moment: moment,
      fullPage: false,
      search: '',
      toBeFilteredMessages: null
    }
  },
  watch: {
    search(newQuery, oldQuery) {
      if(this.messages != null) {
        let tempFilteredMessages = []
        this.toBeFilteredMessages.forEach(message => {
          const position = message.body.toLowerCase().search(newQuery.toLowerCase())
          if (position > -1) {
            tempFilteredMessages.push(message)
          }
        })
        this.messages = tempFilteredMessages
      }
    }
  },
  methods: {
    navigateTo(route, id){
      this.$store.dispatch('setCustomMessageEditId', id)
      this.$router.push(route)
    },
    async deleteMessage(id) {
      if(confirm("Do you really want to delete?")){
        try {
          const message = (await customMessageService.delete(id)).data
          if(!!message)
            this.$router.go(this.$router.currentRoute)
        } catch (err) {
          console.log(err)
        } 
      }
    },
    emailStatus(statusId) {
      if(parseInt(statusId))
        return "Delivered"
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
    this.messages = (await customMessageService.index()).data
    this.messages.reverse()
    this.toBeFilteredMessages = this.messages
    if (!!this.messages) {
     loader.hide()
    }
  },
}
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
  padding: inherit;
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
  position:inherit;
  padding: inherit !important;
  z-index: 10;
}

/* Show the tooltip text when you mouse over the tooltip container */
.tooltip:hover .tooltiptext {
  visibility: visible;
  z-index: 10;
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