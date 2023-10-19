<template>
    <div>
        <v-card v-if="info!=null" elevation="1" class="ma-3">
            <v-card-title> Subject: Final Interview Status!</v-card-title>
            <v-card-title> Hello, {{ info != null  ?  fullname :  " "}}! </v-card-title>
            <v-card-text v-if="interviewStatus == null">
                {{ message.wait }}
            </v-card-text>
            <v-card-text  v-else-if="interviewStatus.status == 2">
                Congratulations! You have passed the interview for {{ position ? position : ' ' }} on {{ passDate ? passDate : ' ' }}. Please proceed to the next step for the final list of requirements needed.
            </v-card-text>
            <v-card-text  v-else-if="interviewStatus.status == 5">
                <h3> Greetings! I regret to inform you that you have not been selected for the position of a ({{ position ? position : ' ' }}). <br>
                    The interview team appreciates the time you spent in your recent interview. <br>
                    We will, however, keep your resume on record and get in touch with you about future opportunities <br> 
                    that may be a better fit for your skills and experience. </h3>
            </v-card-text>
            <v-card-actions class="d-flex flex-row-reverse">
                <v-btn v-if="interviewStatus!=null && interviewStatus.status==2" color="primary darken-3" class="ml-2 text-capitalize" @click="acknowledge"> Acknowledge </v-btn>
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
            interviewStatus:null,
            position:null,
            passDate:null,
            message:{
                wait: "We are currently reviewing your interview status. Thank you for patiently waiting.",
            },
        }
    },
    created(){
        this.getInfo()
        this.getInterviewStatus()
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

        async getInterviewStatus(){
            await this.$axios.get('/applicant/interview/status').then(async (res) => {
                this.interviewStatus = res.data.data
                if(this.interviewStatus != null){
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

