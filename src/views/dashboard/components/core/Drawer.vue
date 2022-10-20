<template>
  <v-navigation-drawer
    id="core-navigation-drawer"
    v-model="drawer"
    :dark="barColor !== 'rgba(228, 226, 226, 1), rgba(255, 255, 255, 0.7)'"
    :expand-on-hover="expandOnHover"
    :right="$vuetify.rtl"
    :src="barImage"
    mobile-break-point="960"
    app
    width="260"
    v-bind="$attrs"
  >
    <template v-slot:img="props">
      <v-img
        :gradient="`to bottom, ${barColor}`"
        v-bind="props"
      />
    </template>

    <v-divider class="mb-1" />

    <v-list
      dense
      nav
    >
      <v-list-item>
        <v-list-item-avatar
          class="align-self-center"
          color="white"
          contain
        >
          <v-img
            style="padding: 19px"
            v-bind:src="image.msg"
            max-height="30"
          />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title
            class="display-1"
            v-text="profile.title"
          />
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider class="mb-2" />

    <v-list
      expand
      nav
    >
      <!-- Style cascading bug  -->
      <!-- https://github.com/vuetifyjs/vuetify/pull/8574 -->
      <div />

      <template v-for="(item, i) in computedItems">
        <base-item-group
          v-if="item.children"
          :key="`group-${i}`"
          :item="item"
        >
          <!--  -->
        </base-item-group>

        <base-item class="sidepanelFont"
          v-else
          :key="`item-${i}`"
          :item="item"
        />
      </template>
      <v-expansion-panels class="mb-6" v-if="isUserAdmin">
      <v-expansion-panel
        v-for="(item,i) in "
        :key="i"
      >
        <v-expansion-panel-header expand-icon="mdi-menu-down">
          <h4> {{ AdminDescription }} </h4>
        </v-expansion-panel-header>
          <v-expansion-panel-content>
            <template v-for="(item, i) in computedAdminItems" v-if="isUserAdmin">
            <base-item-group
              v-if="item.children"
              :key="`group-${i}`"
              :item="item"
            >
              <!--  -->
            </base-item-group>

            <base-item class="sidepanelFont"
              v-else
              :key="`item-${i}`"
              :item="item"
            />
          </template>
          </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  // Utilities
  import { mapState } from 'vuex'
  import store from '../../../../store'

  export default {
    name: 'DashboardCoreDrawer',

    props: {
      expandOnHover: {
        type: Boolean,
        default: false,
      },
    },

    data: () => ({
      items: [
        {
          icon: 'mdi-view-dashboard',
          title: 'dashboard',
          to: '/',
        },
        {
          icon: 'mdi-message',
          title: 'messages',
          to: '/pages/messages',
        },
        {
          icon: 'mdi-alert-circle',
          title: 'cases',
          to: '/pages/cases',
        },
        {
          icon: 'mdi-account',
          title: 'respondents',
          to: '/pages/respondents',
        },
        {
          icon: 'mdi-account',
          title: 'user',
          to: '/pages/user',
        },
        // {
        //   title: 'rtables',
        //   icon: 'mdi-clipboard-outline',
        //   to: '/tables/regular-tables',
        // },
        // {
        //   title: 'typography',
        //   icon: 'mdi-format-font',
        //   to: '/components/typography',
        // },
        // {
        //   title: 'icons',
        //   icon: 'mdi-chart-bubble',
        //   to: '/components/icons',
        // },
        {
          title: 'google',
          icon: 'mdi-map-marker',
          to: '/maps/google-maps',
        },
        // {
        //   title: 'notifications',
        //   icon: 'mdi-bell',
        //   to: '/components/notifications',
        // },
      ],
      adminItems: [
        {
          icon: 'mdi-cloud-check',
          title: 'Facilities',
          to: '/pages/facility',
        },
        { 
          icon: 'mdi-briefcase-variant',
          title: 'Conditions',
          to: '/pages/conditions'
        },
        {
          icon: 'mdi-comment-quote',
          title: 'Custom Messages',
          to:'/pages/customMessages'
        }
      ],
      image: { msg: 'msg.jpg' },
      AdminDescription: 'Admin Controlls',
      isUserAdmin: false
    }),

    computed: {
      ...mapState(['barColor', 'barImage']),
      drawer: {
        get () {
          return this.$store.state.drawer
        },
        set (val) {
          this.$store.commit('SET_DRAWER', val)
        },
      },
      computedItems () {
        return this.items.map(this.mapItem)
      },
      computedAdminItems () {
        return this.adminItems.map(this.mapItem)
      },
      profile () {
        return {
          avatar: true,
          title: this.$t('avatar'),
        }
      },
    },

    mounted() {
       this.changeValue()
    },

    methods: {
      mapItem (item) {
        return {
          ...item,
          children: item.children ? item.children.map(this.mapItem) : undefined,
          title: this.$t(item.title),
        }
      },
      /** isUserAdmin */
      changeValue() {
        try {
          if(store.state.userRoleId == 824) {
            this.isUserAdmin = true
          }
        } catch (error) {
          console.error('an error has occured trying to read isUserAdmin : '+error)
        }
      }
    },
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.v-list-item .v-list-item__title, .v-list-item .v-list-item__subtitle {
  line-height: 1.2;
  font-weight: 500 !important;
  font-size: 18px !important;
}
.sidepanelFont .v-list-item .v-list-item__title {
  font-weight: 500 !important;
  font-size: 20px !important;
  line-height: inherit !important;
}
.v-list-item .v-list-item__title, .v-list--dense .v-list-item .v-list-item__subtitle {
  font-weight: 500 !important;
  font-size: 20px !important;
  line-height: inherit !important;
}
</style>
