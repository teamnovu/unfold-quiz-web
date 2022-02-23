import Vue from 'vue'
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
import { required, email } from 'vee-validate/dist/rules'

extend('required', { ...required, message: 'Das ist ein Pflichtfeld' })

extend('email', {
  ...email,
  message: 'Keine gültige Email-Adresse',
})

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
