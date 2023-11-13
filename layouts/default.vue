<template>
    <v-app>
      <AppBar v-if="$config.login_page === 'nkti-login' && !auth" />
      <SecondAppBar v-if="$config.login_page === 'nkti-login' && !auth" />
      <Header />
      <v-main>
        <nuxt />
      </v-main>
      <Footer class="mt-10" v-if="$config.login_page === 'nkti-login'" />
    </v-app>
  </template>
  
  <script>
  import AppBar from '~/components/AppBar'
  import SecondAppBar from '~/components/SecondAppBar'
  import Header from '~/components/Header'
  import Footer from '~/components/Footer'
  
  export default {
    components: {
      AppBar,
      SecondAppBar,
      Header,
      Footer
    },
    computed: {
      user() {
        return this.$store.getters['auth/user']
      },
      auth() {
        return this.$store.getters['auth/check']
      }
    }
  }
  </script>
  