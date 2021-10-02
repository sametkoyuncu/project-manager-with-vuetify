<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="green accent-3"
          depressed
          small
          dark
          v-bind="attrs"
          v-on="on"
        >
          YENİ PROJE EKLE
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Yeni Proje Oluştur</span>
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
                    hint="6-30 karakter uzunluğunda olmalı."
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
                    hint="En az 10 karakter olmalı."
                    :rules="[rules.required, rules.min, rules.max]"
                  >
                  </v-textarea>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="grey" text @click="dialog = false"> Kapat </v-btn>
            <v-btn color="green accent-3" dark @click="submit"> Kaydet </v-btn>
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
  data: () => ({
    dialog: false,
    title: '',
    content: '',
    // dueDate: format(parseISO(new Date().toISOString()), 'yyyy-MM-dd'),
    dueDate: '',
    menu: false,
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
        this.dialog = false
        // console.log(this.title + ' ' + this.content + ' ' + this.dueDate)

        const project = {
          title: this.title,
          person: 'Samet Koyuncu',
          status: 'ongoing',
          due: this.dueDate,
          content: this.content,
        }

        db.collection('projects')
          .add(project)
          .then((docRef) => {
            console.log('Document written with ID: ', docRef.id)
          })
          .catch((error) => {
            console.error('Error adding document: ', error)
          })
        this.$refs.form.reset()
      }
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
