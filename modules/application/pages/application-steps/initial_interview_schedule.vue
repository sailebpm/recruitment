<template>
    <div>
        <v-card :loading="loading" v-if="info!=null" elevation="1" class="ma-3">
            <v-card-title>  Subject: Initial Interview Invitation for the position of {{positionName}}!</v-card-title>
            <v-card-title> Hello, {{ info != null  ?  fullname :  " "}}!</v-card-title>

            <v-card-text v-if="schedule == null">
                {{ message.wait }}
            </v-card-text>
            
            <v-card-text  v-else-if="schedule.status == 1">
                <b>
                <p>Thank you for applying for the position of  {{positionName}}  with us. We are glad to inform you that your interview has been scheduled for
                 "{{schedule.schedule}}"</p>
                <p>Kindly note the Initial interview details:</p>
                <p>Join Zoom Meeting:</p>
                <a :href=this.zoomlink>{{ zoomlink }}</a>
                <br><br>
                <v-col cols="6">
                {{details}}
                 </v-col>
                <br>
                {{ interviewer }}
                 </b>
            </v-card-text>
            
            <v-card-text  v-else-if="schedule.status == 4">
                {{ message.reschedule }}
            </v-card-text>
            <v-card-actions class="d-flex flex-row-reverse">
                <v-btn v-if="schedule!=null && schedule.status==1" :disabled="btnDisable" color="primary darken-3" class="ml-2 text-capitalize" @click="acknowledge"> Acknowledge </v-btn>
                <!-- <v-btn v-if="schedule!=null && schedule.status==1" :disabled="btnDisable" color="primary darken-3" class="mx-2 text-capitalize" @click="reschedule"> Request for Reschedule </v-btn> -->
            </v-card-actions>
        </v-card>
        <v-skeleton-loader v-else type="card-avatar, article, actions"></v-skeleton-loader>
    </div>
</template>

<script>

export default {
    data() {
        return {
            btnDisable:false,
            positionName: null,
            loading: false,
            info: null,
            schedule: null,
            zoomlink: null,
            details: null,
            interviewer: null,
            message:{
                wait: "We are currently revisiting your request. We'll notify you once your schedule is posted. Thank you for patiently waiting.",
                schedule: null,
                reschedule: "We are currently revisiting your request for rescheduling. Thank you for patiently waiting.",
            },
        }
    },
    created(){
        this.getInfo()
        this.getPosition()
        this.getSchedule()
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

        async reschedule() {
            this.btnDisable = true
            this.loading = true
            const payload = { schedule_id: this.schedule.id }
            await this.$axios.post('/applicant/initial_interview/update/status', payload)
            .then(async (res) => {
                await this.$axios.post('/applicant/request_initial_interview_reschedule', payload)
                .then((res) => {
                    this.$toast.open({
                        message: res.data.text,
                        duration: 5000,
                    })
                    this.getSchedule()
                    this.btnDisable = false
                    this.loading = false
                }).catch((err) => {
                    this.$toast.open({
                        type: 'error',
                        message: "Something went wrong.",
                        duration: 5000,
                    })
                    this.btnDisable = false
                    this.loading = false
                })
            }).catch((err) => {
                this.$toast.open({
                    type: 'error',
                    message: "Something went wrong.",
                    duration: 5000,
                })
                this.btnDisable = false
                this.loading = false
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

        async getSchedule(){
            await this.$axios.get('/applicant/fetch_initial_interview_schedule').then((res) => {
                this.schedule = res.data.data
                if(this.schedule != null){
                    this.zoomlink = this.schedule.zoomlink
                    this.details = this.schedule.description
                    this.interviewer = "Guest: " +this.schedule.interviewer
                    this.message.schedule = "Thank you for applying for the position of " + this.positionName + " with us. We are glad to inform you that your interview has been scheduled for "
                    + this.schedule.schedule
                }
            })
        },



        
    }
    
}
</script>

<style lang="scss">
</style>

