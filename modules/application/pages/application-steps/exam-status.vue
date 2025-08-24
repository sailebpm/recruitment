<template>
    <div>
        <v-card v-if="info!=null" elevation="1" class="ma-3">
            <v-card-title>  Subject: Exam Status!</v-card-title>
            <v-card-title> Hello, {{ info != null  ?  fullname :  " "}}! </v-card-title>
            <v-card-text v-if="examStatus == null">
                {{ message.wait }}
            </v-card-text>
            <v-card-text  v-else-if="examStatus.status == 2">
                Congratulations! You have passed the exam for {{ position ? position : ' ' }} on {{ passDate ? passDate : ' ' }}. Please check the schedule of final interview on the next step.
            </v-card-text>
            
            <v-card-text  v-else-if="examStatus.status == 5">
                <h3> "Thank you for your interest in the Position <b>({{ position ? position : ' '  }}) at COMPANY.</b><br>
                    Regrettably, we must inform you that you did not meet the minimum requirements in the recent examination.<br>
                    We appreciate your application and encourage you to consider future opportunities with us that better align with your qualifications."</h3>
            </v-card-text>
            <v-card-actions class="d-flex flex-row-reverse">
                <v-btn v-if="examStatus!=null && examStatus.status==2" color="primary darken-3" class="ml-2 text-capitalize" @click="acknowledge"> Acknowledge </v-btn>
            </v-card-actions>
        </v-card>
        <v-skeleton-loader v-else type="card-avatar, article, actions"></v-skeleton-loader>
    </div>
</template>

<script>
import store from '../../store/application';

export default {

    data() {
        return {
            info: null,
            examStatus:null,
            position:null,
            passDate:null,
            message:{
                wait: "We are currently reviewing your exam status. Thank you for patiently waiting.",
            },
            
        }
    },
    created(){
        this.getInfo()
        this.getExamStatus()
    },
    computed: {
        fullname(){
            return this.info.fname + " " + this.info.lname
        }
    },
    methods: {
        async acknowledge() {
            await this.$axios.post('/applicant/step/next')
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

        async getExamStatus(){
            await this.$axios.get('/applicant/exam/status').then(async (res) => {
                this.examStatus = res.data.data
                if( this.examStatus != null){
                    this.passDate = res.data.data.updated_at
                    if(res.data.data.status == 2 || res.data.data.status == 3 || res.data.data.status == 5){
                        await this.$axios.get('/applicant/position').then((res) => {
                            this.position = res.data.data.position.title
                        })
                    }
                }
            })
        },
    }
    
}
</script>

<style lang="scss">
</style>

