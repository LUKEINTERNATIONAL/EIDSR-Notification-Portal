## Vuetify
Vuetify is developed exactly according to Material Design spec. Every component is hand crafted to bring you the best possible UI tools to your next great app. The development doesn't stop at the core components outlined in Google's spec. Through the support of community members and sponsors, additional components will be designed and made available for everyone to enjoy.


## Vuex

Vuex is a state management pattern + library for Vue.js applications. It serves as a centralized store for all the components in an application, with rules ensuring that the state can only be mutated in a predictable fashion. It also integrates with Vue's official [devtools](https://github.com/vuejs/vue-devtools) extension to provide advanced features such as zero-config time-travel debugging and state snapshot export / import.

## Vue-cli

We used the latest 3.x [Vue CLI](https://github.com/vuejs/vue-cli) which aims to reduce project configuration
to as little as possible. Almost everything is inside `package.json` + some other related files such as
`.babel.config.js`, `.eslintrc.js` and `.postcssrc.js`.

## File Structure

Within the download you'll find the following directories and files:

```
vuetify-material-dashboard
├── README.md
├── CHANGELOG.md
├── babel.config.js
├── cypress.json
├── jest.config.js
├── now.json
├── package.json
├── postcss.config.js
├── public
│   ├── favicon.ico
│   └── index.html
├── src
│   ├── App.vue
│   ├── assets
│   │   └── vuetify.svg
│   ├── components
│   │   └── base
│   │       ├── Card.vue
│   │       ├── Item.vue
│   │       ├── ItemGroup.vue
│   │       ├── ItemSubGroup.vue
│   │       ├── MaterialAlert.vue
│   │       ├── MaterialCard.vue
│   │       ├── MaterialChartCard.vue
│   │       ├── MaterialSnackbar.vue
│   │       ├── MaterialStatsCard.vue
│   │       ├── MaterialTabs.vue
│   │       ├── MaterialTestimony.vue
│   │       ├── Subheading.vue
│   │       └── VComponent.vue
│   ├── i18n.js
│   ├── locales
│   │   └── en.json
│   ├── main.js
│   ├── plugins
│   │   ├── base.js
│   │   ├── chartist.js
│   │   ├── vee-validate.js
│   │   └── vuetify.js
│   ├── router.js
│   ├── sass
│   │   ├── main.scss
│   │   ├── overrides.sass
│   │   └── vuetify-material
│   │       └── _sidebar.sass
│   ├── store.js
│   └── views
│       └── dashboard
│           ├── Charts.vue
│           ├── Dashboard.vue
│           ├── Index.vue
│           ├── Widgets.vue
│           ├── component
│           │   ├── Buttons.vue
│           │   ├── Grid.vue
│           │   ├── Icons.vue
│           │   ├── Notifications.vue
│           │   ├── Tabs.vue
│           │   └── Typography.vue
│           ├── components
│           │   └── core
│           │       ├── AppBar.vue
│           │       ├── Drawer.vue
│           │       ├── Footer.vue
│           │       ├── Settings.vue
│           │       └── View.vue
│           ├── maps
│           │   └── GoogleMaps.vue
│           ├── pages
│           │   └── UserProfile.vue
│           └── tables
│               └── RegularTables.vue
├── tests
│   ├── e2e
│   │   ├── plugins
│   │   │   └── index.js
│   │   ├── specs
│   │   │   └── test.js
│   │   └── support
│   │       ├── commands.js
│   │       └── index.js
│   └── unit
│       └── example.spec.js
├── vue.config.js
```
# use `npm install --legacy-peer-deps` for installing dependencies

# use `npm run serve` to run the app while in root dir