<template>
  <div class="projects">
    <h1 class="body-1 grey--text my-3 ml-4">Takım</h1>
    <v-container class="my-3">
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 lg3 v-for="(person, index) in team" :key="index">
          <v-card flat class="text-center ma-2">
            <v-responsive class="pt-4">
              <v-avatar size="100" class="deep-purple lighten-2"
                ><img :src="person.avatar" />
              </v-avatar>
            </v-responsive>
            <v-card-text>
              <div class="body-1 font-weight-bold">
                {{ person.name }}
              </div>
              <div class="grey--text">{{ person.role }}</div>
            </v-card-text>
            <v-card-actions class="justify-center">
              <v-tooltip v-model="show" top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    depressed
                    icon
                    color="deep-purple lighten-2"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon>mdi-email</v-icon>
                  </v-btn>
                </template>
                <span>E-Posta Gönder</span>
              </v-tooltip>
              <v-tooltip v-model="show" top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    depressed
                    icon
                    color="black lighten-3"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon>mdi-github</v-icon>
                  </v-btn>
                </template>
                <span>Github Profilini Görüntüle</span>
              </v-tooltip>
              <v-tooltip v-model="show" top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    depressed
                    icon
                    color="blue darken-3"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon>mdi-linkedin</v-icon>
                  </v-btn>
                </template>
                <span>Linkedin Profilini Görüntüle</span>
              </v-tooltip>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'team',
  data() {
    return {
      team: [
        {
          name: 'Samet Koyuncu',
          role: 'Full Stack Web Developer',
          avatar: '/img/teams/5.jpg',
        },
        {
          name: 'Büşra Sarıkamış',
          role: 'Frontend Developer',
          avatar: '/img/teams/1.jpg',
        },
        {
          name: 'Mert Kayacık',
          role: 'Backend Developer',
          avatar: '/img/teams/2.jpg',
        },
        {
          name: 'Ayşe Anayurt',
          role: 'Social Media Expert',
          avatar: '/img/teams/3.jpg',
        },
        {
          name: 'Ezgi Durmaz',
          role: 'Backend Developer',
          avatar: '/img/teams/4.jpg',
        },
        {
          name: 'Sinan Kent',
          role: 'Sales Manager',
          avatar: '/img/teams/6.jpg',
        },
      ],
    }
  },
}
</script>
