<template>
  <div class="projects">
    <h1 class="body-1 grey--text">Projects</h1>
    <v-container class="my-3">
      <div v-for="(project, key) in projects" :key="key">
        <v-card flat class="pa-3">
          <v-layout row wrap :class="`pa-3 project ${project.status}`">
            <v-flex xs12 md6>
              <div class="caption grey--text">Proje Başlığı</div>
              <div>{{ project.title }}</div>
            </v-flex>
            <v-flex xs6 sm4 md2>
              <div class="caption grey--text">Oluşturan</div>
              <div>{{ project.person }}</div>
            </v-flex>
            <v-flex xs6 sm4 md2>
              <div class="caption grey--text">Bitiş Tarihi</div>
              <div>{{ project.due }}</div>
            </v-flex>
            <v-flex xs2 sm4 md2>
              <div class="caption grey--text">Durum</div>
              <div>{{ project.status }}</div>
            </v-flex>
          </v-layout>
        </v-card>
        <v-divider></v-divider>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'projects',
  data() {
    return {
      projects: [
        {
          title: 'Vuetify ile uygulama geliştir.',
          person: 'Samet Koyuncu',
          due: '25 Ekim 2021',
          status: 'ongoing',
          content:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, nostrum molestiae? Tempore tempora incidunt eius eveniet ratione ducimus, iure, maiores, quis assumenda numquam earum totam nisi consequatur accusantium provident aperiam?',
        },
        {
          title: 'Node.js ile rest api.',
          person: 'Büşra Sarıkamış',
          due: '10 Ekim 2021',
          status: 'complete',
          content:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, nostrum molestiae? Tempore tempora incidunt eius eveniet ratione ducimus, iure, maiores, quis assumenda numquam earum totam nisi consequatur accusantium provident aperiam?',
        },
        {
          title: 'Firebase ile yetkilendirme.',
          person: 'Mert Kayacık',
          due: '28 Eylül 2021',
          status: 'overdue',
          content:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, nostrum molestiae? Tempore tempora incidunt eius eveniet ratione ducimus, iure, maiores, quis assumenda numquam earum totam nisi consequatur accusantium provident aperiam?',
        },
        {
          title: 'Veritabanını MongoDB ye taşı.',
          person: 'Samet Koyuncu',
          due: '1 Kasım 2021',
          status: 'ongoing',
          content:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, nostrum molestiae? Tempore tempora incidunt eius eveniet ratione ducimus, iure, maiores, quis assumenda numquam earum totam nisi consequatur accusantium provident aperiam?',
        },
      ],
    }
  },
}
</script>

<style>
.project.complete {
  border-left: 5px solid #3cd1c2;
}

.project.ongoing {
  border-left: 5px solid orange;
}

.project.overdue {
  border-left: 5px solid tomato;
}
</style>
