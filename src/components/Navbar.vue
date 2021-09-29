<template>
  <nav>
    <v-navigation-drawer app v-model="drawer" class="deep-purple lighten-1">
      <v-list-item class="mt-3">
        <v-list-item-title
          class="text-h6 white--text text-center text-uppercase"
        >
          <span class="font-weight-light">Pro</span>
          <span>Man</span>
        </v-list-item-title>
        <!-- <v-btn icon flat color="white" @click="drawer = !drawer">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn> -->
      </v-list-item>
      <v-layout column class="text-center">
        <v-flex class="mt-5">
          <v-avatar size="100">
            <img src="/img/teams/5.jpg" />
          </v-avatar>
          <p class="white--text subheading-1 text-weight-bold mt-2">
            Samet Koyuncu
          </p>
        </v-flex>
      </v-layout>
      <v-list>
        <v-list-item-group>
          <v-list-item
            v-for="(link, key) in links"
            :key="key"
            router
            :to="link.route"
          >
            <v-list-item-icon>
              <v-icon class="white--text">{{ link.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="white--text">{{
                link.text
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar flat app color="white">
      <v-app-bar-nav-icon class="grey--text" @click="drawer = !drawer">
      </v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase grey--text">
        <span class="font-weight-light">Pro</span>
        <span>Man</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon flat color="grey">
        <v-icon>mdi-location-exit</v-icon>
      </v-btn>
    </v-app-bar>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      links: [
        { icon: 'mdi-view-dashboard', text: 'Dashboard', route: '/' },
        { icon: 'mdi-folder', text: 'My Projects', route: '/projects' },
        { icon: 'mdi-account-group', text: 'Team', route: '/team' },
      ],
    }
  },
}
</script>
