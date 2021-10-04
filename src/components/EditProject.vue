<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          fab
          text
          small
          color="blue accent-2"
          v-bind="attrs"
          v-on="on"
          @click="getProjectById(projectId)"
        >
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Proje Düzenle</span>
        </v-card-title>
        <v-form class="px-3 pb-3" ref="form">
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" xs="12" sm="6">
                  <v-text-field
                    label="Başlık"
                    v-model="title"
                    prepend-icon="mdi-folder"
                    hint="6-36 karakter uzunluğunda olmalı."
                    :rules="[rules.required, rules.min, rules.max]"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" xs="12" sm="6">
                  <v-menu
                    v-model="menu"
                    :close-on-content-click="false"
                    offset-y
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        :value="computedDateFormattedDatefns"
                        clearable
                        label="Bitiş Tarihi"
                        readonly
                        prepend-icon="mdi-calendar"
                        v-bind="attrs"
                        v-on="on"
                        @click:clear="dueDate = ''"
                        :rules="[rules.required]"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="dueDate"
                      @change="menu = false"
                      :first-day-of-week="1"
                      locale="tr-tr"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    label="Açıklama"
                    v-model="content"
                    prepend-icon="mdi-file-edit"
                    hint="6-36 karakter uzunluğunda olmalı."
                    :rules="[rules.required, rules.min]"
                  >
                  </v-textarea>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="grey" text @click="dialog = false"> Kapat </v-btn>
            <v-btn
              color="green accent-3"
              dark
              :loading="loading"
              @click="submit"
            >
              Kaydet
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import { format, parseISO } from 'date-fns'
import { tr } from 'date-fns/locale'
import db from '@/fb'

export default {
  props: ['projectId'],
  data: () => ({
    edittingProject: {},
    dialog: false,
    id: '',
    title: '',
    content: '',
    // dueDate: format(parseISO(new Date().toISOString()), 'yyyy-MM-dd'),
    dueDate: '',
    menu: false,
    loading: false,
    rules: {
      required: (value) => !!value || 'Bu alan gerekli.',
      min: (value) =>
        (value != null && value.length >= 6) || 'En az 6 karakter olmalı.',
      max: (value) =>
        (value != null && value.length <= 36) || 'En fazla 36 karakter olmalı.',
      email: (value) => {
        const pattern =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'Invalid e-mail.'
      },
    },
  }),
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.loading = true

        // console.log(this.title + ' ' + this.content + ' ' + this.dueDate)

        const project = {
          title: this.title,
          person: this.person,
          status: this.status,
          due: this.dueDate,
          content: this.content,
        }

        db.collection('projects')
          .doc(this.id)
          .update(project)
          .then((docRef) => {
            console.log(docRef)
            this.loading = false
            this.dialog = false
            this.$refs.form.reset()
            this.$emit('projectUpdated')
          })
          .catch((error) => {
            console.error('Error adding document: ', error)
          })

        // db.collection('projects')
        //   .add(project)
        //   .then((docRef) => {
        //     console.log('Document written with ID: ', docRef.id)
        //     this.loading = false
        //     this.dialog = false
        //     this.$refs.form.reset()
        //     this.$emit('projectAdded')
        //   })
        //   .catch((error) => {
        //     console.error('Error adding document: ', error)
        //   })
      }
    },
    getProjectById(project_id) {
      const project = db.collection('projects').doc(project_id)
      project
        .get()
        .then((doc) => {
          if (doc.exists) {
            this.edittingProject = doc.data()

            this.id = project_id
            this.title = this.edittingProject.title
            this.person = this.edittingProject.person
            this.status = this.edittingProject.status
            this.dueDate = this.edittingProject.dueDate
            this.content = this.edittingProject.content
          } else {
            // doc.data() will be undefined in this case
            console.log('No such document!')
          }
        })
        .catch((error) => {
          console.log('Error getting document:', error)
        })
    },
  },
  computed: {
    computedDateFormattedDatefns() {
      return this.dueDate
        ? format(parseISO(this.dueDate), 'dd MMMM yyyy, EEEE', { locale: tr })
        : ''
    },
  },
}
</script>
