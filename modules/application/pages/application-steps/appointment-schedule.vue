<template>
    <div>
        <v-card :loading="loading" v-if="info!=null" elevation="1" class="ma-3">



            <v-card-title v-if="appointmentPaper != null &&  this.appointmentPaper.status == 2"> Subject: Congratulations you are hired!</v-card-title>
            <v-card-title v-else> Subject: Appointment Papers Schedule!</v-card-title>
            <v-card-title v-if="appointmentPaper != null && this.appointmentPaper.status == 2"> Thank you, {{ info != null ? fullname : " "}}! </v-card-title>
            <v-card-title v-else> Hello, {{ info != null ? fullname : " "}}! </v-card-title>

            <v-card-text v-if="appointmentPaper != null && appointmentRequirements.status == 2 ">
                <v-col cols="6">
                    {{ message.wait_appointment }}
                </v-col>
            </v-card-text>


            <v-card-text v-if="appointmentRequirements.status == 3 && appointmentPaper == null">
                <v-col cols="6">
                    <b>
                        {{ message.completed }}
                    </b>
                </v-col>
            </v-card-text>

            <v-card-text v-if="appointmentPaper != null && this.appointmentPaper.status != 2" class="pa-5">
                <v-col cols="6">
                        <b>
                            {{message.details_appointment}}
                        </b>
                </v-col>
            </v-card-text>

            <v-card-text v-if="appointmentPaper != null && this.appointmentPaper.status == 2">

                <b>
                 You successfully finished the final evaluation.
                 <br>
                 Congratulations, {{fullname}}! You are selected for the position of {{positionName}}.
                <br>
                <br>
                <v-col cols="6">
                To access the Employee Self-Service (ESS) Portal. Kindly follow the link and Your Email / employee number and password will be the same credentials you will use to login in the Employee portal.
                Click <a class="blue--text login" :href="this.$config.adg">here</a> to proceed to Employee Portal.<br><br>
                 </v-col>
                </b>

            </v-card-text>

            <v-card-actions class="d-flex flex-row-reverse">

            </v-card-actions>
        </v-card>
        <v-skeleton-loader v-else type="card-avatar, article, actions"></v-skeleton-loader>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                positionName: null,
                loading: false,
                status: "",
                info: null,
                appointmentRequirements: "",
                appointmentPaper: "",
                position: null,
                passDate: null,
                message: {
                    wait_appointment: "We are currently revisiting your request. We'll notify you once your appointment paper schedule is posted. Thank you for patiently waiting.",
                    thankyou: "",
                    details_appointment: "",
                    completed: "We'll notify you once your appointment paper schedule is posted. Thank you for patiently waiting.",

                },
            };
        },
        async created() {
            this.getRequirements();
            this.getAppointment();
            this.getPosition()
            this.getInfo();
        },
        computed: {
            fullname() {
                return this.info.fname + " " + this.info.lname;
            },
        },
        methods: {

            async getInfo() {
                await this.$axios.get("/applicant/user").then((res) => {
                    this.info = res.data;
                });
            },

            async getRequirements() {
                await this.$axios.post("/applicant/fetch_requirement_status").then((res) => {
                    this.appointmentRequirements = res.data.data;
                    this.status = this.appointmentRequirements.status;
                });
            },

            async getPosition(){
            await this.$axios.get('/applicant/fetch_position').then((res) => {
                if(res.data.data != null){
                    this.positionName = res.data.data.position.title
                }

            })
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
