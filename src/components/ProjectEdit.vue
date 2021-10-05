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
          @click="getProjectById(project)"
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
                <v-col cols="12">
                  <v-select
                    v-model="status"
                    :items="statuses"
                    prepend-icon="mdi-list-status"
                    :rules="[rules.required]"
                    label="Proje Durumu"
                    required
                  ></v-select>
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
export default {
  props: {
    project: Object,
  },
  data: () => ({
    statuses: ['ongoing', 'complete', 'overdue'],
    dialog: false,
    id: '',
    title: '',
    content: '',
    dueDate: format(parseISO(new Date().toISOString()), 'yyyy-MM-dd'),
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
        // const project = {
        //   title: this.title,
        //   person: this.person,
        //   status: this.status,
        //   due: this.dueDate,
        //   content: this.content,
        // }
        this.loading = false
        this.dialog = false
        this.$refs.form.reset()
        this.$emit('projectUpdated')
      }
    },
    getProjectById(project) {
      this.id = project.id
      this.title = project.title
      this.person = project.person
      this.status = project.status
      //   this.dueDate = project.dueDate
      this.content = project.content
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
© 2021 GitHub, Inc. Terms Privacy Security
