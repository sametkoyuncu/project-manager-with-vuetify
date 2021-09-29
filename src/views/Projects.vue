<template>
  <div class="projects">
    <h1 class="body-1 grey--text">Projects</h1>
    <v-container class="my-3">
      <v-layout row class="mx-1 text-right">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              depressed
              color="indigo"
              class="mb-5"
              dark
              small
              v-bind="attrs"
              v-on="on"
            >
              Sırala
              <v-icon right small>mdi-sort</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="(item, index) in items" :key="index" link>
              <v-list-item-title @click="sortBy(item.prop)">{{
                item.title
              }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-layout>

      <div v-for="(project, index) in projects" :key="index">
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
              <!-- <div class="caption grey--text">Durum</div> -->
              <div class="float-right my-2">
                <v-chip
                  small
                  :color="`${getChipColor(project.status)}`"
                  class="white--text"
                  >{{ getProjectStatus(project.status) }}
                </v-chip>
              </div>
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
      items: [
        { title: 'Başlığa göre', prop: 'title' },
        {
          title: 'Kullanıcıya göre',
          prop: 'person',
        },
        {
          title: 'Bitiş tarihine göre',
          prop: 'due',
        },
      ],
    }
  },
  methods: {
    getChipColor(color) {
      if (color == 'complete') return 'green accent-4'
      else if (color == 'ongoing') return 'orange accent-3'
      else if (color == 'overdue') return 'red accent-3'
    },
    getProjectStatus(status) {
      if (status == 'complete') return 'Tamamlandı'
      else if (status == 'ongoing') return 'Devam Ediyor'
      else if (status == 'overdue') return 'Gecikmiş'
    },
    sortBy(prop) {
      this.projects.sort((a, b) => (a[prop] < b[prop] ? -1 : 1))
    },
  },
}
</script>

<style>
.project.complete {
  border-left: 5px solid #00c853;
}

.project.ongoing {
  border-left: 5px solid #ff9100;
}

.project.overdue {
  border-left: 5px solid #ff1744;
}

.v-chip.complete {
  background: #3cd1c2;
}

.v-chip.ongoing {
  background: orange;
}

.v-chip.overdue {
  background: tomato;
}
</style>
