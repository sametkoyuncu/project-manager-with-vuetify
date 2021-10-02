<template>
  <div class="projects">
    <v-snackbar
      top
      elevation="0"
      v-model="snackbarDelete"
      :timeout="4000"
      color="red accent-2"
    >
      <span>Proje silindi.</span>
      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="snackbarDelete = false"
        >
          Kapat
        </v-btn>
      </template>
    </v-snackbar>
    <h1 class="body-1 grey--text ml-4">Anasayfa</h1>
    <v-container class="my-3">
      <v-layout row class="mx-1">
        <v-spacer></v-spacer>
        <v-btn-toggle
          v-model="toggle"
          dense
          class="mr-2"
          style="max-height: 20px !important"
        >
          <v-btn small color="deep-purple lighten-2" :disabled="toggle === 0">
            <v-icon class="white--text">mdi-view-agenda</v-icon>
          </v-btn>

          <v-btn small color="deep-purple lighten-2" :disabled="toggle === 1">
            <v-icon class="white--text">mdi-view-grid</v-icon>
          </v-btn>
        </v-btn-toggle>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              depressed
              color="deep-purple lighten-2"
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

      <div v-show="toggle == 0" v-for="project in projects" :key="project.id">
        <v-card flat class="pa-3 mb-2">
          <v-layout row wrap :class="`pa-3 project ${project.status}`">
            <v-flex xs12 md5>
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
            <v-flex xs6 sm3 md2>
              <!-- <div class="caption grey--text">Durum</div> -->
              <div class="my-1 text-center">
                <v-chip
                  :color="`${getChipColor(project.status)}`"
                  class="white--text justify-center"
                  style="min-width: 110px !important"
                  >{{ getProjectStatus(project.status) }}
                </v-chip>
              </div>
            </v-flex>
            <v-flex xs6 sm1 md1 class="text-right">
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    fab
                    text
                    small
                    color="red accent-2"
                    v-bind="attrs"
                    v-on="on"
                    @click="deleteProject(project.id)"
                  >
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </template>
                <span>Projeyi Sil</span>
              </v-tooltip>
            </v-flex>
          </v-layout>
        </v-card>
      </div>

      <!-- $$$$ -->
      <div v-show="toggle == 1">
        <v-layout row wrap>
          <v-flex
            xs12
            sm6
            md4
            lg3
            v-for="(project, index) in projects"
            :key="index"
          >
            <v-card
              flat
              class="ma-2"
              min-height="250px"
              :class="`project ${project.status}`"
            >
              <v-card-title>
                <div class="caption grey--text">
                  Bitiş Tarihi: {{ project.due }}
                </div>
                <div>{{ project.title }}</div>
              </v-card-title>
              <v-card-text>
                <div class="caption grey--text">Açıklama</div>
                <div class="body-1">
                  {{ project.content }}
                </div>
              </v-card-text>
              <v-card-actions class="justify-center">
                <div class="text-center mb-2">
                  <v-chip
                    small
                    :color="`${getChipColor(project.status)}`"
                    class="white--text justify-center"
                    style="min-width: 110px !important"
                    >{{ getProjectStatus(project.status) }}
                  </v-chip>
                </div>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </div>
    </v-container>
  </div>
</template>

<script>
import db from '@/fb'
export default {
  name: 'dashboard',
  data() {
    return {
      toggle: 0,
      snackbarDelete: false,
      projects: [],
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
      if (color == 'complete') return 'green accent-3'
      else if (color == 'ongoing') return 'orange accent-2'
      else if (color == 'overdue') return 'red accent-2'
    },
    getProjectStatus(status) {
      if (status == 'complete') return 'Tamamlandı'
      else if (status == 'ongoing') return 'Devam Ediyor'
      else if (status == 'overdue') return 'Gecikmiş'
    },
    sortBy(prop) {
      this.projects.sort((a, b) => (a[prop] < b[prop] ? -1 : 1))
    },
    deleteProject(id) {
      db.collection('projects').doc(id).delete()
      const lastProjects = this.projects.filter((project) => {
        return project.id !== id
      })
      this.projects = []
      this.projects = lastProjects
      this.snackbarDelete = true
    },
  },
  created() {
    //firestore real time listener
    db.collection('projects').onSnapshot((res) => {
      const changes = res.docChanges()

      changes.forEach((change) => {
        if (change.type === 'added') {
          this.projects.push({
            ...change.doc.data(),
            id: change.doc.id,
          })
        }
      })
    })
  },
  // mounted: function () {
  //   console.log('func')
  //   db.collection('projects')
  //     .get()
  //     .then((querySnapshot) => {
  //       querySnapshot.forEach((doc) => {
  //         this.projects.push(doc.data())
  //       })
  //     })
  // },
}
</script>

<style>
.project.complete {
  border-left: 5px solid #00e676;
}

.project.ongoing {
  border-left: 5px solid #ffab40;
}

.project.overdue {
  border-left: 5px solid #ff5252;
}
</style>
