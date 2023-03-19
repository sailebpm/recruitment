<template>
    <div>
        <v-sheet width="100%" elevation="1" class="pb-2 d-flex justify-center py-1 mb-5 header">
            <v-spacer></v-spacer>
            <a :href="$config.jp">
                <v-img :src="require('~/assets/images/logo/main-logo.png')" contain max-height="90px" max-width="250px"></v-img>
            </a>
            <v-spacer></v-spacer>
            <div v-if="!auth" class="mt-2 d-flex justify-end text-capitalized mr-3">
                <v-btn elevation="0" @click="login" color="blue" dense outlined hide-details>
                Login
                </v-btn> 
                <a :href="$config.adg + 'applicant'">
            </a>
            
            </div>
            <v-menu v-if="auth" v-model="userMenu" :close-on-content-click="false" :nudge-width="100" :offset-y="offset">
                <template v-slot:activator="{ on, attrs }">
                    <div class="account align-self-center pr-4">
                        <div class="d-flex align-center">
                        <span class="me-1 d-none d-sm-none d-md-block" style="font-size: 14px;">Hi {{ user.fname }} </span>
                        <v-avatar size="25" class="ml-2" v-bind="attrs" v-on="on">
                            <img :src="require('~/assets/images/avatar/default_avatar_male.png')" alt="..." />
                        </v-avatar>
                        </div>
                    </div>
                </template>
                <v-card class="elevation-0 d-flex flex-column pa-3" elevation="0">
                    <div class="d-flex align-center justify-space-between">
                    <div>
                        <p class="font-weight-medium mb-1 uname line-height-1 mt-2">{{ user.fname + ' ' + user.lname }}</p>
                        <p class="font-weight-regular mb-0 urole">{{ "Applicant" }}</p>
                    </div>
                    <div class="me-2">
                        <v-avatar size="40" class="border-1 sub-avatar">
                        <img :src="require('~/assets/images/avatar/default_avatar_male.png')" alt="..." contain/>
                        </v-avatar>
                    </div>
                    </div>
                    <v-divider class="my-3"></v-divider>
                    <v-btn @click="logout" color="primary" class="font-weight-regular rounded-0" small>Logout</v-btn>
                </v-card>
            </v-menu>
        </v-sheet>
    </div>    
</template>

<script>
export default {
    
    data() {
        return {
            offset: true,
            userMenu: false,
        }
    },
    methods: {
        login(){
            window.location.href = this.$config.adg + "applicant";                                             
        },
        logout() {
            this.$swal.fire({
                title: 'Are you sure?',
                text: "You are about to be logged out!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Log me out!'
            }).then(async(result) => {
                if (result.isConfirmed) {
                var swalala = this.$swal.fire({
                    title : 'Processing Your Request...',
                    icon : 'warning',
                    showCloseButton : false,
                    showConfirmButton : false,
                    showCancelButton: false,
                    allowOutsideClick: false,
                })
                await this.$store.dispatch('auth/logout')
                swalala.close()
                this.$swal.fire(
                    'Logged Out!',
                    'Your session has been successfully destroyed.',
                    'success'
                ).then((v)=>{
                    // if(v.isConfirmed){
                        this.$router.push({ name: 'job-posting' })
                    // }
                })
                }
            })      
        },

        // redirect() {
        //     this
        // }
    },
    computed: {
        user(){
            var user = this.$store.getters['auth/user']
            return user
        },
        auth(){
            return this.$store.getters['auth/check']
        }
    }
}
</script>

<style lang="scss">
    .account {
        position: fixed;
        right: 0;
    }
    .header {
        position: relative;
    }
</style>