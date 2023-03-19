<template>
    <v-app>
        <Header />
        <v-main>
            <nuxt />
        </v-main>
    </v-app>
</template>
<script>
import Header from '~/components/Header'

export default {
    components: {
        Header
    },
    computed : {
        user(){
            return this.$store.getters['auth/user']
        },
        auth(){
            return this.$store.getters['auth/check']
        }
    }
}
</script>
