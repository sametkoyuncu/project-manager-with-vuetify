import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    projects: [
      {
        id: 'IdOne',
        title: 'Vuetify ile uygulama geliştir.',
        person: 'Samet Koyuncu',
        due: '1 Ekim 2021',
        status: 'overdue',
        content:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, nostrum molestiae? Tempore tempora incidunt eius eveniet ratione ducimus, iure, maiores, quis assumenda numquam earum totam nisi consequatur accusantium provident aperiam?',
      },
      {
        id: 'IdTwo',
        title: 'Node.js ile rest api.',
        person: 'Büşra Sarıkamış',
        due: '10 Ekim 2021',
        status: 'complete',
        content:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, nostrum molestiae? Tempore tempora incidunt eius eveniet ratione ducimus, iure, maiores, quis assumenda numquam earum totam nisi consequatur accusantium provident aperiam?',
      },
      {
        id: 'IdThree',
        title: 'Firebase ile yetkilendirme.',
        person: 'Mert Kayacık',
        due: '28 Eylül 2021',
        status: 'overdue',
        content:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, nostrum molestiae? Tempore tempora incidunt eius eveniet ratione ducimus, iure, maiores, quis assumenda numquam earum totam nisi consequatur accusantium provident aperiam?',
      },
      {
        id: 'IdFour',
        title: 'MongoDB kullan.',
        person: 'Samet Koyuncu',
        due: '1 Kasım 2021',
        status: 'ongoing',
        content:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, nostrum molestiae? Tempore tempora incidunt eius eveniet ratione ducimus, iure, maiores, quis assumenda numquam earum totam nisi consequatur accusantium provident aperiam?',
      },
    ],
  },
  mutations: {
    sortBy: (state, prop) => {
      state.projects.sort((a, b) => (a[prop] < b[prop] ? -1 : 1))
    },
    deleteProject: (state, id) => {
      state.projects = state.projects.filter((project) => {
        return project.id !== id
      })
    },
    addProject: (state, project) => {
      state.projects.push(project)
    },
    editProject: (state, project) => {
      state.projects[project.index] = {
        id: project.id,
        title: project.title,
        person: project.person,
        due: project.due,
        status: project.status,
        content: project.content,
      }
    },
  },
  actions: {
    sortBy: (context, prop) => {
      context.commit('sortBy', prop)
    },
    deleteProject: (context, id) => {
      context.commit('deleteProject', id)
    },
    addProject: (context, project) => {
      context.commit('addProject', project)
    },
    editProject: (context, project) => {
      context.commit('editProject', project)
    },
  },
})
