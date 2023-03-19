<template>
    <div>
        <v-card :loading="loading" v-if="info!=null" elevation="1" class="ma-3">
            <v-card-title> Subject: Submission of Requirements Schedule!</v-card-title>
            <v-card-title> Hello, {{ info != null ? fullname : " "}}! </v-card-title>

            <v-card-text v-if="appointmentRequirements == null">
                <v-col cols="6">
                    {{ message.wait }}
                </v-col>
            </v-card-text>

            <v-card-text class="pa-5" v-if="appointmentRequirements != null && appointmentRequirements.status == 1">
                <v-col cols="6">
                    <div>
                        <b>
                            {{message.details_requirements}}
                        </b>
                    </div>
                </v-col>
            </v-card-text>

            <v-card-text class="pa-5" v-if="appointmentRequirements != null && appointmentRequirements.status == 2">
                <v-col cols="6">
                    <div>
                        <b>
                            {{message.review}}
                        </b>
                    </div>
                </v-col>
            </v-card-text>

            
            <v-card-text class="pa-5" v-if="appointmentRequirements != null && appointmentRequirements.status == 3">
                <v-col cols="6">
                    <div>
                        <b>
                            {{message.completed}}
                        </b>
                    </div>
                </v-col>
            </v-card-text>

        

            <v-card-actions class="d-flex flex-row-reverse">
                <v-btn  v-if="appointmentRequirements != null && appointmentRequirements.status == 1" color="primary darken-3" class="ml-2 text-capitalize" @click="acknowledgeRequirement"> Acknowledge </v-btn>
                <v-btn  v-if="appointmentRequirements != null && appointmentRequirements.status == 3" color="primary darken-3" class="ml-2 text-capitalize" @click="acknowledge"> Acknowledge </v-btn>
            </v-card-actions>
        </v-card>
        <v-skeleton-loader v-else type="card-avatar, article, actions"></v-skeleton-loader>
    </div>
</template>

<script>
    import store from "../../store/application";

    export default {
        data() {
            return {
                loading: false,
                status: "",
                info: null,
                appointmentRequirements: null,
                appointmentPaper: null,
                position: null,
                passDate: null,
                message: {
                    wait: "We are currently revisiting your request. We'll notify you once your submission of requirements schedule is posted. Thank you for patiently waiting.",
                    wait_appointment: "We are currently revisiting your request. We'll notify you once your appointment paper schedule is posted. Thank you for patiently waiting.",
                    thankyou: "",
                    details_requirements: "",
                    details_appointment: "",
                    completed: "The requirements has been checked and are all complete. Please check the schedule of appointment papers on the next step.",
                    review: "We are currently reviewing your requirements. Thank you for patiently waiting.",
                },
            };
        },
        async created() {
            this.getRequirments();
            this.getAppointment();
            this.getInfo();
        },
        computed: {
            fullname() {
                return this.info.fname + " " + this.info.lname;
            },
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
            async acknowledgeRequirement() {
                await this.$axios
                    .post("/applicant/update_acknowledge_requirements")
                    .then((res) => {
                        this.$router.go();
                    })
                    .catch((err) => {
                        this.$toast.open({
                            type: "error",
                            message: "Something went wrong.",
                            duration: 5000,
                        });
                    });
            },

            async getInfo() {
                await this.$axios.get("/applicant/user").then((res) => {
                    this.info = res.data;
                });
            },

            async getRequirments() {
                await this.$axios.post("/applicant/fetch_requirement_status").then((res) => {
                    this.appointmentRequirements = res.data.data;
                    if(this.appointmentRequirements != null){
                    this.status = this.appointmentRequirements.status;
                    this.message.details_requirements =
                        "Your schedule of submission of your requirements is on " + this.appointmentRequirements.schedule + " at " + this.appointmentRequirements.office + ". Look for " + this.appointmentRequirements.personnel;
                    }
                    });
            },

            async getAppointment() {
                await this.$axios.post("/applicant/fetch_appointment_status").then((res) => {
                    this.appointmentPaper = res.data.data;
                        if(this.appointmentPaper != null){
                        this.status = this.appointmentPaper.status;
                        this.message.details_appointment = "Your schedule for appointment papers is on " + this.appointmentPaper.schedule + " at " + this.appointmentPaper.office + ". Look for " + this.appointmentPaper.personnel;
                    }
                });
            },
        },
    };
</script>

<style lang="scss"></style>
