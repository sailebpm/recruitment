import Vue from 'vue'
import axios from 'axios'
import Swal from 'sweetalert2'
import jquery from 'jquery'
import VueToast from 'vue-toast-notification';
import VueLuxon from "vue-luxon";

Vue.use(VueLuxon);
Vue.use(VueToast);
Vue.prototype.$axios = axios
Vue.prototype.$swal = Swal
Vue.prototype.$jquery = jquery