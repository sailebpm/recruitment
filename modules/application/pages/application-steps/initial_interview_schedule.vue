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
                <div><v-btn v-if="schedule!=null && schedule.status==1" :disabled="btnDisable" color="primary darken-3" class="ml-2 text-capitalize" @click="acknowledge"> Acknowledge </v-btn></div>
                <!-- <v-btn v-if="schedule!=null && schedule.status==1" :disabled="btnDisable" color="primary darken-3" class="mx-2 text-capitalize" @click="reschedule"> Request for Reschedule </v-btn> -->
                <div>
                    <RequestModal v-if="schedule != null && schedule.status == 1 && countReSchedule != 2" :disabled="btnDisable">
                        <template v-slot:dialog_content>
                            <v-card-text class="pt-4 pb-5 black--text">
                                <v-list>
                                    <v-list-item>
                                        <v-textarea
                                            v-model="reasonForResched"
                                            outlined
                                            name="input-7-4"
                                            label="State your reason and preferred date of exam"
                                            hide-details
                                        ></v-textarea>
                                    </v-list-item>
                                </v-list>
                            </v-card-text>
                        </template>
                        <template v-slot:dialog_actions>
                            <div class="mb-3 mt-3">
                                <v-btn class="white--text mr-3 text-capitalize elevation-0" width="140" @click="reschedule" type="submit" color="primary darken-3">Submit</v-btn>
                            </div>
                        </template>
                    </RequestModal>
                </div>
            </v-card-actions>
        </v-card>
        <v-skeleton-loader v-else type="card-avatar, article, actions"></v-skeleton-loader>
    </div>
</template>

<script>
import RequestModal from './request-for-reschedule.vue';

export default {
    components:{
        RequestModal,
    },
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
            reasonForResched:"",
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
            const payload = { 
                schedule_id: this.schedule.id,
                reason: this.reasonForResched, 
            }
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

