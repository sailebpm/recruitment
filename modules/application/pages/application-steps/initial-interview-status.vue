<template>
    <div>
        <v-card v-if="info!=null" elevation="1" class="ma-3">
            <v-card-title>  Subject: Initial Interview Status!</v-card-title>
            <v-card-title> Hello, {{ info != null  ?  fullname :  " "}}! </v-card-title>
            <v-card-text v-if="initialInterviewStatus == null">
                {{ message.thankyou }}
                <br>
                {{ message.wait }}
            </v-card-text>
            <v-card-text  v-else-if="initialInterviewStatus.status == 2">
                Congratulations! You have passed the Initial Interview for {{ position ? position : ' ' }} on {{ passDate ? passDate : ' ' }}. Please check the schedule of exam on the next step.
            </v-card-text>

            <v-card-text  v-else-if="initialInterviewStatus.status == 3" >
                <p style="font-size: 18px;">The hr decided to tag you to other position <b>({{ position }}).</b> will you accept this offer?</p>

                <div>
                    <v-btn v-if="initialInterviewStatus!=null && initialInterviewStatus.status==3" color="success" class="ml-2 text-capitalize" @click="accept()"> Accept </v-btn>
                    <v-btn v-if="initialInterviewStatus!=null && initialInterviewStatus.status==3" color="error" class="ml-2 text-capitalize" @click="decline()"> Decline </v-btn>
                </div>
            </v-card-text>

            <v-card-text  v-else-if="initialInterviewStatus.status == 5" >
                <h3> Greetings! I regret to inform you that you have not been selected for the position of a ({{ position ? position : ' ' }}). <br>
                    The interview team appreciates the time you spent in your recent interview. <br>
                    We will, however, keep your resume on record and get in touch with you about future opportunities <br> 
                    that may be a better fit for your skills and experience. </h3>
            </v-card-text>

            <v-card-actions class="d-flex flex-row-reverse">
                <v-btn v-if="initialInterviewStatus!=null && initialInterviewStatus.status==2" color="primary darken-3" class="ml-2 text-capitalize" @click="acknowledge"> Acknowledge </v-btn>
            </v-card-actions>
        </v-card>
        <v-skeleton-loader v-else type="card-avatar, article, actions"></v-skeleton-loader>
    </div>
</template>

<script>
import store from '../../store/application';
import axios from 'axios'
export default {

    data() {
        return {
            info: null,
            initialInterviewStatus:null,
            position:null,
            passDate:null,
            message:{
                wait: "We are currently reviewing your Initial Interview status. Thank you for patiently waiting.",
                thankyou: "",
            },
            
        }
    },
    async created(){
        this.getInfo()
        this.getinitialInterviewStatus()
        await this.$axios.get('/applicant/position').then((res) => {
            this.position1 = res.data.data.position.title
            this.message.thankyou = "Thank you for attending the initial interview for the "+ this.position1 + " at National Kidney and Transplant Institute."
        })
    },
    computed: {
        fullname(){
            return this.info.fname + " " + this.info.lname
        }
    },
    methods: {

        async accept() {
            this.loading = true,
            await this.$swal.fire({
                icon: 'warning',
                title: "Are you sure?",
                text: "Do you want to accept this Position",
                showCancelButton: true,
                confirmButtonText: "Continue"
            }).then(async (res) => {
                if(res.isConfirmed){
                    await this.$axios.post('/applicant/step/next')
                    .then((res) => {
                        this.$toast.open({
                            message: 'Position tag has been successfully declined!',
                            duration: 5000,
                        })             
                    })
                }
            }).finally(() => {
                this.loading = false
                this.$router.go()
                });

        },

        async decline() {
            this.loading = true,
            await this.$swal.fire({
                icon: 'warning',
                title: "Are you sure?",
                text: "Do you want to decline this Position",
                showCancelButton: true,
                confirmButtonText: "Continue"
            }).then(async (res) => {
                const payload = {
                    applicant_id: this.applicant_id,
                }
                if(res.isConfirmed){
                    await axios.post(`/applicant/initial_interview/decline_position`, payload)
                    .then((res) => {
                        this.$toast.open({
                            message: 'Position tag has been successfully declined!',
                            duration: 5000,
                        })
                    })
                }
            }).finally(() => {
                this.loading = false
                window.location.reload();
                });

        },

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
                this.applicant_id = this.info.id
            })
        },

        async getinitialInterviewStatus(){
            await this.$axios.get('/applicant/fetch_initial_interview_status').then(async (res) => {
                this.initialInterviewStatus = res.data.data
                if(this.initialInterviewStatus != null){
                this.passDate = res.data.data.updated_at
                if(res.data.data.status == 2 || res.data.data.status == 3 || res.data.data.status == 5){
                    await this.$axios.get('/applicant/position').then((res) => {
                        this.position = res.data.data.position.title
                        this.message.thankyou = "Thank you for attending the initial interview for the"+ this.position + "at National Kidney and Transplant Institute."
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

