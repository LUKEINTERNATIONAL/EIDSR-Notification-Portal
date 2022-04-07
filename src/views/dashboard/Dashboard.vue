<template>
  <v-container
    id="dashboard"
    fluid
    tag="section"
  >
    <v-row>
      <v-col
        cols="12"
        lg="4"
      >
        <base-material-chart-card
          color="#E91E63"
          hover-reveal
          type="Bar"
          title="Notifiable Disease Conditions Graph"
        >
        <div id="chart">
        <apexchart type="bar" height="295" :options="barChartOptions" :series="barSeries"></apexchart>
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

          <h4 class="card-title font-weight-light mt-2 ml-2">
            Diagnosis
          </h4>

          <p class="d-inline-flex font-weight-light ml-2 mt-1">
            IDRS cases across the country
                <v-btn
                    style="margin-left: 33px; background-color:rgb(104, 104, 104);; height:20px"
                    @click="deleteMessage(message.id)"
                > View more
                </v-btn>
          </p>

          <template v-slot:actions>
            <v-icon
              class="mr-1"
              small
            >
              mdi-clock-outline
            </v-icon>
            <span class="caption grey--text font-weight-light">Updated 10 minutes ago</span>
          </template>
        </base-material-chart-card>
      </v-col>

      <v-col
        cols="12"
        lg="4"
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

          <h4 class="card-title font-weight-light mt-2 ml-2">
            Daily SMS
          </h4>

          <p class="d-inline-flex font-weight-light ml-2 mt-1">
            <v-icon
              color="green"
              small
            >
              mdi-arrow-up
            </v-icon>
            <span class="green--text">55%</span>&nbsp;
            increase in today's SMS
          </p>

     
          <template v-slot:actions>
            <v-icon
              class="mr-1"
              small
            >
              mdi-clock-outline
            </v-icon>
            <span class="caption grey--text font-weight-light">Updated 4 minutes ago</span>
          </template>
        </base-material-chart-card>
      </v-col>

      <v-col
        cols="12"
        lg="4"
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

          <h3 class="card-title font-weight-light mt-2 ml-2">
            Daily Emails
          </h3>

          <p class="d-inline-flex font-weight-light ml-2 mt-1">
            <v-icon
              color="green"
              small
            >
              mdi-arrow-up
            </v-icon>
            <span class="green--text">55%</span>&nbsp;
            increase in today's Emails
          </p>

          <template v-slot:actions>
            <v-icon
              class="mr-1"
              small
            >
              mdi-clock-outline
            </v-icon>
            <span class="caption grey--text font-weight-light">Updated 26 minutes ago</span>
          </template>
        </base-material-chart-card>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <base-material-card
          color="warning"
          class="px-5 py-3"
        >
          <template v-slot:heading>
            <div class="display-2 font-weight-light">
              Respondets Stats 
            </div>

            <div class="subtitle-1 font-weight-light">
              Individuals who will receive IDRS SMS and Emails 
            </div>
          </template>
          <v-card-text>
            <v-data-table
              :headers="respondentsHeaders"
              :items="respondentsItems"
            />
          </v-card-text>
        </base-material-card>
      </v-col>

      <v-col
        cols="12"
        md="6"
      >
      
      <base-material-card
          color="error"
          class="px-5 py-3"
        >
          <template v-slot:heading>
            <div class="display-2 font-weight-light">
              Users Stats
            </div>

            <div class="subtitle-1 font-weight-light">
              Individuals who will be using the system 
            </div>
          </template>
          <v-card-text>
            <v-data-table
              :headers="usersHeaders"
              :items="usersItems"
            />
          </v-card-text>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import caseService from "./../../services/CaseService"
import RespondentService from "./../../services/RespondentService"
import UserService from "./../../services/UserService"

  export default {
    name: 'DashboardDashboard',

    data () {
      return {
         
         barSeries: [{
            name: 'Rabies',
            data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
          }, {
            name: 'Cholera',
            data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
          }, {
            name: 'Yellow fever',
            data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
          }],
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
              categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
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
              name: "SMS sent",
              data: [28, 29, 33, 36, 32, 32, 33]
            },
            {
              name: "SMS failed",
              data: [12, 11, 14, 18, 17, 13, 13]
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
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
              title: {
                text: 'Month'
              }
            },
            yaxis: {
              title: {
                text: 'Number of SMS'
              },
              min: 5,
              max: 40
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
              name: "Email sent",
              data: [28, 29, 33, 36, 32, 32, 33]
            },
            {
              name: "Email failed",
              data: [12, 11, 14, 18, 17, 13, 13]
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
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
              title: {
                text: 'Month'
              }
            },
            yaxis: {
              title: {
                text: 'Number of Emails'
              },
              min: 5,
              max: 40
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
    this.getCases();
    this.getUsers();
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
      async getCases(){
        this.cases = (await caseService.getYearCases()).data
        const  todayDate = new Date();
        const  anotherDate = new Date();
        // console.log(todayDate.toISOString());
        todayDate.setDate(todayDate.getDate() - 365);
        // const startDate = todayDate.setTime(todayDate.getTime() - 3*28*24*60*60);

        let startDate = new Date();
            startDate = startDate.toISOString().slice(0, 10);
            let endDate = new Date();
            endDate.setDate(endDate.getDate() - 365);
            endDate = endDate.toISOString().slice(0, 10);
        console.log(startDate);
        console.log(endDate);
        console.log(this.cases);
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

      }
      },
      

  }
</script>
