<template>
  <v-app class="">
    <Navbar />
    <v-main class="grey lighten-3">
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
  name: 'App',
  components: {
    Navbar,
  },
  data: () => ({
    //
  }),
}
</script>
