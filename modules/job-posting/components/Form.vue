<template>
    <div>
        <pre_employment v-if="modal_preemployment" :successMessage="successMessage" :data="data" v-on:close_modal="close_modal" :positionChoice="positionChoice" :firstChoice="firstChoice" @registerFunction="registerFunction" />
        <v-dialog v-model="open" max-width="500" transition="dialog-bottom-transition" persistent>
            <v-card class="pa-4 text-center">
                <v-row>
                    <v-col cols="12">
                        <v-btn icon dark color="primary" class="float-right" @click="close">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>

                        <h2 class="mb-3 form-header">Register a new account</h2>
                        <v-form ref="register" @submit.prevent="register">
                            <v-row no-gutters>
                                <v-col cols="5">
                                    <v-text-field v-model="data.register.firstname" :rules="rules.register.firstname" class="mr-2" outlined dense label="First Name"></v-text-field>
                                </v-col>
                                <v-col cols="5">
                                    <v-text-field v-model="data.register.lastname" :rules="rules.register.lastname" class="mr-2" outlined dense label="Last Name"></v-text-field>
                                </v-col>
                                <v-col cols="2">
                                    <v-text-field v-model="data.register.middlename" :rules="rules.register.middleinitial" outlined dense label="M.I."></v-text-field>
                                </v-col>
                            </v-row>
                            <!-- <v-text-field v-model="data.register.username" :rules="rules.register.username" outlined dense label="Username"></v-text-field> -->
                            <v-text-field v-model="data.register.password" :rules="rules.register.password" outlined dense label="Password" type="password"></v-text-field>
                            <v-text-field :rules="rules.register.confirmPassword" outlined dense label="Confirm Password" type="password"></v-text-field>
                            <v-text-field v-model="data.register.email" :rules="rules.register.email" outlined dense label="Email"></v-text-field>
                            <v-autocomplete
                                v-model="positionOption"
                                :items="position_title"
                                outlined
                                dense
                                :rules="rules.register.position_options"
                                label="2nd and 3rd Choice of Position"
                                multiple
                                chips
                                return-object
                                small-chips
                                deletable-chips
                                v-on:input="limiter1"
                                item-text="position.title"
                                item-value="position_id"
                            >
                            </v-autocomplete>
                            <v-checkbox dense v-model="agree">
                                <template v-slot:label>
                                    <span style="font-size: 14px;">
                                        By using this website, you agree to the data that we are collecting from you.
                                    </span>
                                </template>
                            </v-checkbox>
                            <v-btn @click="viewPreEmploy()" block :disabled="!agree" :loading="loading" elevation="1">Next</v-btn>
                            <div class="d-flex justify-center justify-sm-end mb-3 mr-sm-1 px-1"></div>
                            <!-- <div>
                            <v-btn block color="yellow darken-1" :disabled="!agree" :loading="loading" elevation="1" type="submit"> Register </v-btn>
                        </div> -->
                            <div style="font-size: 14px;" class="mt-8">Already have an account? <a class="blue--text login" :href="this.$config.adg + 'applicant'"> Log In </a></div>
                        </v-form>
                    </v-col>
                </v-row>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import pre_employment from "./pre-employment.vue";
    export default {
        components: { pre_employment },
        props: ["job"],
        data() {
            return {
                positionChoice_id: null,
                firstChoice: null,
                positionChoice: null,
                positionOption: [],
                modal_preemployment: false,
                options: [],
                open: true,
                tab: "login",
                agree: false,
                loading: false,
                rules: {
                    register: {
                        firstname: [(v) => !!v || "First Name is required"],
                        lastname: [(v) => !!v || "Last Name is required"],
                        middleinitial: [(v) => !!v || "middle Initial required"],
                        username: [(v) => !!v || "Username is a required field"],
                        password: [(v) => !!v || "Password is a required field"],
                        confirmPassword: [(v) => v == this.data.register.password || "Password does not match"],
                        email: [(v) => !!v || "Email is a required field", (v) => /.+@.+/.test(v) || "Invalid E-Mail address"],
                        position_options: [(v) => !!v || "Position Option is a required field"],
                    },
                },

                data: {
                    register: {
                        firstname: "",
                        lastname: "",
                        middlename: "",
                        username: "",
                        password: "",
                        email: "",
                    },
                },
                payload: {
                    position_id: this.job.position.id,
                    phs_id: this.job.id,
                    applicant_id: null,
                    position_option: this.positionOption,
                },
                position_title: [],
                secondChoice: null,
                thridChoice: null,
                successMessage: false
            };
        },
        watch: {
            positionOption(value) {
                let rows = [];
                this.secondChoice = value[0];
                this.thridChoice = value[1];
                value.forEach((element) => {
                    element.position.title;
                    var positionID = element.position_id;
                    rows.push(positionID);
                });
                this.positionChoice_id = rows;
                this.positionChoice = {
                    secondChoice: this.secondChoice ? this.secondChoice : "N/A",
                    thirdChoice: this.thridChoice ? this.thridChoice : "N/A",
                };
            },
        },
        async created() {
            this.initJobs();
            this.firstChoice = {
                firstChoice: this.job.position.title,
            };
        },
        methods: {
            viewPreEmploy() {
                if (this.$refs.register.validate()) {
                    this.modal_preemployment = true;
                }
            },

            close_modal() {
                this.modal_preemployment = false;
            },

            async initJobs() {
                this.loading = true;
                await this.$axios
                    .post(`/applicant/positions/jobs/?page=${this.page}`)
                    .then((res) => {
                        this.options = res.data.data.data;
                        var positonId = [];
                        Object.keys(this.options).forEach((element) => {
                            if (this.options[element].position_id != this.job.position.id) {
                                this.position = this.options[element];
                                positonId.push(this.position);
                                this.position_title = positonId;
                            }
                        });
                    })
                    .catch(() => {})
                    .finally(() => {
                        this.loading = false;
                    });
            },

            limiter1(e) {
                if (e.length > 2) {
                    e.pop();
                }
            },
            

            async registerFunction(payload1) {
                if (this.$refs.register.validate()) {
                    this.loading = true;
                    const payload = {
                        position_id: this.job.position.id,
                        phs_id: this.job.id,
                        applicant_id: null,
                        position_option: this.positionChoice_id,
                    };
                    await this.$swal
                        .fire({
                            icon: "warning",
                            title: "Are you sure?",
                            text: "You will be applying for " + this.job.position.title,
                            showCancelButton: true,
                            confirmButtonText: "Continue",
                        })
                        .then((res) => {
                            this.successMessage = res.isConfirmed
                            if (res.isConfirmed) {
                                this.$axios
                                    .post("/applicant/register", this.data.register)
                                    .then((res) => {
                                        payload.applicant_id = res.data.id;
                                        this.$axios
                                            .post("/applicant/create/application", payload)
                                            .then((res) => {
                                                this.$toast.open({
                                                    icon: "success",
                                                    message: res.data.text,
                                                    duration: 3000,
                                                });
                                                this.$axios.post('/applicant/pre-employment/create_pre_employment',  {applicant_information: payload1, applicant: res.data}).then((res) => {
                                                    window.location.href = this.$config.adg + "applicant";
                                                 })        
                                            })
                                            .catch((err) => {
                                                this.$toast.open({
                                                    type: "error",
                                                    message: err.response.data.errors[0],
                                                    duration: 3000,
                                                });
                                            });
                                    })
                                    .catch((err) => {
                                        if (err.response.status == "403" || err.response.status == "422" || err.response.status == "400") {
                                            var x = "";
                                            this.$jquery.each(err.response.data.errors, (i, v) => {
                                                x += v + "<br>";
                                            });
                                            this.$toast.open({
                                                message: x,
                                                type: "error",
                                                duration: 3000,
                                                pauseOnHover: true,
                                            });
                                        } else {
                                            throw err.response.data;
                                        }
                                    });
                            } else if (res.dismiss) {
                                this.close();
                            }
                        })
                        .finally(() => {
                        
                            this.loading = false;

                        });
                }
            },
            

            close() {
                this.open = false;
                this.$emit("close");
            },
        },

        computed: {
            small() {
                return this.$vuetify.breakpoint.width < 960;
            },
        },
    };
</script>

<style lang="scss">
    .label-text {
        font-size: 14px;
    }

    .form-header {
        font-size: 24px;
        font-weight: normal;
    }

    .login:hover {
        cursor: pointer;
        text-decoration: underline;
    }
</style>
