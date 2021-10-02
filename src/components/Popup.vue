<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="green accent-3" small dark v-bind="attrs" v-on="on">
          YENİ PROJE EKLE
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Yeni Proje Oluştur</span>
        </v-card-title>
        <v-form class="px-3 pb-3">
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" xs="12" sm="6">
                  <v-text-field
                    label="Başlık"
                    v-model="title"
                    prepend-icon="mdi-folder"
                    hint="6-30 karakter uzunluğunda olmalı."
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
                        @click:clear="dueDate = null"
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

export default {
  data: () => ({
    dialog: false,
    title: '',
    content: '',
    dueDate: format(parseISO(new Date().toISOString()), 'yyyy-MM-dd'),
    menu: false,
  }),
  methods: {
    submit() {
      this.dialog = false
      console.log(this.title + ' ' + this.content + ' ' + this.dueDate)
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
