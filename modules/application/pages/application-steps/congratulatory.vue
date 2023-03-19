<template>
    <div>
        <v-card v-if="info!=null" elevation="1" class="ma-3">
            <v-card-title> Subject: Requierement Details!</v-card-title>
            <v-card-title> Hello, {{ info != null  ?  fullname :  " "}}! </v-card-title>

            <v-row>
            <v-card-text v-if="length == 0">
                <v-col cols="6">
                {{ message.wait }}
                </v-col>
            </v-card-text>

            <v-card-text  v-if="length != 0">
                <v-col cols="6">
                {{ message.congrats }}
                </v-col>
                <v-col cols="12">
                <b>
                <p>For the complete list of requirements needed. Please Click the Button below for your reference:</p>
                </b>
                <div class="d-flex align-left justify-left">
                    <supplementary_requirements_pdf @buttonFalse="buttonFalse" :positionName="positionName" :fullName="fullName"/>
                </div>
                </v-col>
            </v-card-text>
            </v-row>
            <v-card-actions class="d-flex flex-row-reverse">
                <v-btn v-if="length != 0" :disabled="disableBtn" color="primary darken-3" class="ml-2 text-capitalize" @click="acknowledge"> Acknowledge </v-btn>
            </v-card-actions>
        </v-card>
        <v-skeleton-loader v-else type="card-avatar, article, actions"></v-skeleton-loader>
    </div>
</template>

<script>
import store from '../../store/application';
import supplementary_requirements_pdf from './pdf-requirements/supplementary_requirements_pdf.vue';
export default {
    components: { supplementary_requirements_pdf },
    data() {
        return {
            info: null,
            position:null,
            passDate:null,
            positionName:null,
            message:{
                wait: "Please wait for our requirements to be given. Thank you for patiently waiting.",
                thankyou: "",
                congrats: "",
            },
            length: null,
            fullName: null,
            disableBtn: true
            
        }
    },
    async created(){
        this.getInfo()
        this.getRequirments()
        this.getPosition()

    },
    computed: {
        fullname(){
            return this.info.fname + " " + this.info.lname
        }
    },
    methods: {
        buttonFalse() {
               this.disableBtn = false;
              },

        async acknowledge() {
            await this.$axios.post('/applicant/increment_step_require')
            .then((res) => {
                this.$router.go()
            }).catch((err) => {
                this.$toast.open({
                    type: 'error',
                    message: "Something went wrong.",
                    duration: 5000,
                })
            })
        },

        async getInfo(){
            await this.$axios.get('/applicant/user').then((res) => {
                this.info = res.data
            })
        },

        async getPosition(){
            await this.$axios.get('/applicant/fetch_position').then((res) => {
                this.positionName = res.data.data.position.title
                
            })
        },

        async getRequirments(){
            await this.$axios.post('/applicant/get_applicant_req').then((res) => {
                var requirements = res.data.data
                if(requirements != null){
                this.length = requirements.applicant_requirements.length
                if(this.length != 0){
                this.message.congrats = requirements.applicant_requirements[0].message
                this.fullName = (requirements.lname+ " " +requirements.fname+" "+requirements.mname)
                }
                }  
            })
        },

       
    }
    
}
</script>

<style lang="scss">
</style>

