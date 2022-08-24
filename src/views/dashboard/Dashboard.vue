<template>
  <v-container
    id="dashboard"
    fluid
    tag="section"
  >
    <v-row>
      <v-col
        cols="12"
        md="12"
      >
        <base-material-chart-card
          color="#E91E63"
          hover-reveal
          type="Bar"
          title="Notifiable Disease Conditions Graph"
        >
        <div id="chart">
        <apexchart type="bar" height="300" :options="barChartOptions" :series="barSeries"></apexchart>
      </div>
          <template v-slot:reveal-actions>
            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn
                  v-bind="attrs"
                  color="info"
                  icon
                  v-on="on"
                >
                  <v-icon
                    color="info"
                  >
                    mdi-refresh
                  </v-icon>
                </v-btn>
              </template>

              <span>Refresh</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn
                  v-bind="attrs"
                  light
                  icon
                  v-on="on"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>

              <span>Change Date</span>
            </v-tooltip>
          </template>


          <template v-slot:actions>
           <div class="view-more-btn" style="display: flex; justify-content: space-between;width: 100%;">
               <p>
                <v-icon class="mr-1" small> mdi-clock-outline </v-icon>
                <span class="caption grey--text font-weight-light">Updated 4 minutes ago</span>
               </p>
              
                <v-btn
                    style="margin-left: 33px; background-color:#999; height:30px; text-transform: capitalize; font-size: 14px;min-width: 50px;padding: 5px !important;"
                    @click="deleteMessage(message.id)"
                > <v-icon> mdi-pencil </v-icon> Edit
                </v-btn>
            </div>
          </template>
        </base-material-chart-card>
      </v-col>

      <v-col
        cols="12"
        md="6"
      >
        <base-material-chart-card
          color="success"
          hover-reveal
          type="Line"
          title="SMS Graph"
        >
         <div id="chart">
        <apexchart type="line" height="300" :options="lineChartOptions1" :series="lineSeries1"></apexchart>
      </div>
          <template v-slot:reveal-actions>
            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn
                  v-bind="attrs"
                  color="info"
                  iconsales
                  v-on="on"
                >
                  <v-icon
                    color="info"
                  >
                    mdi-refresh
                  </v-icon>
                </v-btn>
              </template>

              <span>Refresh</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn
                  v-bind="attrs"
                  light
                  icon
                  v-on="on"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>

              <span>Change Date</span>
            </v-tooltip>
          </template>


     
          <template v-slot:actions>
             <div class="view-more-btn" style="display: flex; justify-content: space-between;width: 100%;">
               <p>
                <v-icon class="mr-1" small> mdi-clock-outline </v-icon>
                <span class="caption grey--text font-weight-light">Updated 4 minutes ago</span>
               </p>
              
                <v-btn
                    style="margin-left: 33px; background-color:#999; height:30px; text-transform: capitalize; font-size: 14px;min-width: 50px;padding: 5px !important;"
                    @click="deleteMessage(message.id)"
                > <v-icon> mdi-pencil </v-icon> Edit
                </v-btn>
            </div>
          </template>
        </base-material-chart-card>
      </v-col>

      <v-col
        cols="12"
        md="6"
      >
        <base-material-chart-card
          hover-reveal
          color="info"
          type="Line"
          title="Email Graph"
        >
         <div id="chart">
        <apexchart type="line" height="300" :options="lineChartOptions2" :series="lineSeries2"></apexchart>
      </div>
          <template v-slot:reveal-actions>
            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn
                  v-bind="attrs"
                  color="info"
                  icon
                  v-on="on"
                >
                  <v-icon
                    color="info"
                  >
                    mdi-refresh
                  </v-icon>
                </v-btn>
              </template>

              <span>Refresh</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn
                  v-bind="attrs"
                  light
                  icon
                  v-on="on"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>

              <span>Change Date</span>
            </v-tooltip>
          </template>

         

          <template v-slot:actions>
             <div class="view-more-btn" style="display: flex; justify-content: space-between;width: 100%;">
               <p>
                <v-icon class="mr-1" small> mdi-clock-outline </v-icon>
                <span class="caption grey--text font-weight-light">Updated 4 minutes ago</span>
               </p>
              
                <v-btn
                    style="margin-left: 33px; background-color:#999; height:30px; text-transform: capitalize; font-size: 14px;min-width: 50px;padding: 5px !important;"
                    @click="deleteMessage(message.id)"
                > <v-icon> mdi-pencil </v-icon> Edit
                </v-btn>
            </div>
          </template>
        </base-material-chart-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import caseService from "./../../services/CaseService"
import RespondentService from "./../../services/RespondentService"
import UserService from "./../../services/UserService"
import MessageService from "./../../services/MessageService"

  export default {
    name: 'DashboardDashboard',

    data () {
      return {
        options: [
      { value: 1, text: 'One' },
      { value: 2, text: 'Two' },
    ],
    value: null,
    secondValue: '1',
    disabled: false,
         barSeries: [],
          barChartOptions: {
            chart: {
              type: 'bar',
              height: 350
            },
            plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'
              },
            },
            dataLabels: {
              enabled: false
            },
            stroke: {
              show: true,
              width: 2,
              colors: ['transparent']
            },
            xaxis: {
              categories: [],
            },
            yaxis: {
              title: {
                text: 'Number of patients'
              }
            },
            fill: {
              opacity: 1
            },
            tooltip: {
              y: {
                formatter: function (val) {
                  return val + " Patient(s)"
                }
              }
            }
          },
           lineSeries1: [
            {
              name: "",
              data: []
            },
            {
              name: "",
              data: []
            }
          ],
          lineChartOptions1: {
            chart: {
              height: 350,
              type: 'line',
              dropShadow: {
                enabled: true,
                color: '#000',
                top: 18,
                left: 7,
                blur: 10,
                opacity: 0.2
              },
              toolbar: {
                show: false
              }
            },
            colors: ['#77B6EA', '#f07373'],
            dataLabels: {
              enabled: true,
            },
            stroke: {
              curve: 'smooth'
            },
            title: {
              text: 'SMS Status',
              align: 'left'
            },
            grid: {
              borderColor: '#e7e7e7',
              row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
              },
            },
            markers: {
              size: 1
            },
            xaxis: {
              categories: [],
              title: {
                text: 'Month'
              }
            },
            yaxis: {
              title: {
                text: 'Number of SMS'
              }
            },
            legend: {
              position: 'top',
              horizontalAlign: 'right',
              floating: true,
              offsetY: -25,
              offsetX: -5
            }
          },
          lineSeries2: [
            {
              name: "",
              data: []
            },
            {
              name: "",
              data: []
            }
          ],
          lineChartOptions2: {
            chart: {
              height: 350,
              type: 'line',
              dropShadow: {
                enabled: true,
                color: '#000',
                top: 18,
                left: 7,
                blur: 10,
                opacity: 0.2
              },
              toolbar: {
                show: false
              }
            },
            colors: ['#77B6EA', '#f07373'],
            dataLabels: {
              enabled: true,
            },
            stroke: {
              curve: 'smooth'
            },
            title: {
              text: 'Email status',
              align: 'left'
            },
            grid: {
              borderColor: '#e7e7e7',
              row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
              },
            },
            markers: {
              size: 1
            },
            xaxis: {
              categories: [],
              title: {
                text: 'Month'
              }
            },
            yaxis: {
              title: {
                text: 'Number of Emails'
              }
            },
            legend: {
              position: 'top',
              horizontalAlign: 'right',
              floating: true,
              offsetY: -25,
              offsetX: -5
            }
          },
       
            usersHeaders: [
          {
            sortable: false,
            text: 'ID',
            value: 'id',
          },
          {
            sortable: false,
            text: 'Name',
            value: 'name',
          },
          {
            sortable: false,
            text: 'Username',
            value: 'username',
            align: 'right',
          },
          {
            sortable: false,
            text: 'Address',
            value: 'address',
            align: 'right',
          },
          {
            sortable: false,
            text: 'Phone',
            value: 'phone',
            align: 'right',
          },
          {
            sortable: false,
            text: 'Email',
            value: 'email',
            align: 'right',
          },
          {
            sortable: false,
            text: 'About',
            value: 'about',
            align: 'right',
          },
        ],
        usersItems: [],
        respondentsHeaders: [
         {
            sortable: false,
            text: 'ID',
            value: 'id',
          },
          {
            sortable: false,
            text: 'Name',
            value: 'name',
          },
          {
            sortable: false,
            text: 'Role',
            value: 'role',
            align: 'right',
          },
          {
            sortable: false,
            text: 'Phone',
            value: 'phone',
            align: 'right',
          },
          {
            sortable: false,
            text: 'Email',
            value: 'email',
            align: 'right',
          },
        ],
        respondentsItems: [],
        
      }
    },
  async mounted() {
    await this.getRespondents();
    await this.getCases();
    await this.getUsers();
    await this.getSMS();
    await this.getEmails();
  },
    methods: {
      complete (index) {
        this.list[index] = !this.list[index]
        },
        async getRespondents(){
        let allRespondent = [];
        let allRoles = await RespondentService.index();
        allRoles.data.map((value)=>{
          const roleName = value.role_name	
          let data = value.Respondents.map((value)=>{
            return {
              id: value.id ,
              name: value.first_name+" "+ value.last_name ,
              phone : value.phone_pri+" "+ value.phone_sec ,
              role : roleName,
              email: value.email ,
            }
          })
          allRespondent.push(...data)
          return data
        })
        this.respondentsItems = allRespondent
      },
      async getCases(conditions = [
                                //'Acute Flaccid Paralysis (AFP)',
                                'Anthrax',
                                'Cholera',
                                //'Cluster of SARI',
                                'Diarrhoea with blood (Shigella dysentery)',
                                //'Influenza due to new subtype',
                                //'Maternal death',
                                'Measles',
                                //'Meningococcal meningitis',
                                //'Neonatal tetanus',
                                //'Plague',
                                'Rabies (confirmed cases)',
                                //'Severe Acute Respiratory Syndrome (SARS)',
                                //'Smallpox',
                                //'Typhoid fever',
                                'Yellow fever',
                                ]
                    ){
        let totalData = (await caseService.getYearCases(conditions)).data
        let months = totalData.pop();
        this.barChartOptions = {...this.barChartOptions, ...{
            xaxis: {
                categories: months
            }
        }}
        
        this.barSeries = totalData
       
      },
      async getUsers(){
        const data = await (await UserService.index()).data;
        const userData = data.map((value)=>{
          return {
            id: value.id,
            name: value.first_name+" "+value.last_name,
            username: value.username,
            address: value.address,
            phone: value.phone_pri+" "+value.phone_sec,
            email: value.email,
            about: value.about,
          }
        })
        this.usersItems = userData;

      },
      async getEmails(){

      },
      async getSMS(){
        var messages =(await MessageService.getYearMessages()).data
        this.lineSeries1 = messages[0];
        this.lineSeries2 = messages[1];

         this.lineChartOptions1 = {...this.lineChartOptions1, ...{
            xaxis: {
                categories: messages[2]
            }
        }}
         this.lineChartOptions2 = {...this.lineChartOptions2, ...{
            xaxis: {
                categories: messages[2]
            }
        }}
      }
    },
  }
</script>
