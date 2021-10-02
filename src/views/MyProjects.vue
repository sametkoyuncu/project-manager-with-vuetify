<template>
  <div class="myProjects">
    <h1 class="body-1 grey--text my-3 ml-4">Projelerim</h1>
    <v-container class="my-3">
      <v-layout row class="mx-1">
        <v-spacer></v-spacer>
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

      <v-expansion-panels flat>
        <v-expansion-panel
          v-for="project in myProjects"
          :key="project.id"
          :class="`project ${project.status}`"
        >
          <v-expansion-panel-header>
            {{ project.title }}
            <v-spacer></v-spacer>
            <v-chip
              small
              :color="`${getChipColor(project.status)}`"
              class="white--text justify-center"
              style="max-width: 111px !important; min-width: 110px !important"
              >{{ getProjectStatus(project.status) }}
            </v-chip>
          </v-expansion-panel-header>
          <v-expansion-panel-content class="pb-2">
            <div class="caption grey--text">Bitiş Tarihi</div>
            <div>{{ project.due }}</div>
            <div class="caption grey--text mt-2">İçerik</div>
            {{ project.content }}
          </v-expansion-panel-content>
          <v-divider></v-divider>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-container>
  </div>
</template>

<script>
import db from '@/fb'

export default {
  name: 'myProjects',
  data() {
    return {
      projects: [],
      items: [
        { title: 'Başlığa göre', prop: 'title' },
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
  },
  computed: {
    myProjects() {
      return this.projects.filter((project) => {
        return project.person === 'Samet Koyuncu'
      })
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
