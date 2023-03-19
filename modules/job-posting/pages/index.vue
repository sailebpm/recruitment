<template>
    <div>
        <ApplyForm v-if="apply" :job="jobChosen" @close="closeModal"/>
        <v-container>
            <v-row no-gutters>
                <v-col cols="12" xl="12">
                    <h1 class="text-uppercase">list of job vacancies</h1>
                    <v-breadcrumbs :items="breadcrumbs" divider="/" class="pl-0">
                        <template v-slot:item="{item}">
                            <v-breadcrumbs-item @click="resetCrumbs" :disabled="item.disabled" class="blue--text crumb">
                                {{ item.text }}
                            </v-breadcrumbs-item>
                        </template>
                    </v-breadcrumbs>
                    <v-divider></v-divider>
                </v-col>
            </v-row>

            <v-fade-transition leave-absolute hide-on-leave>
                <v-sheet class="d-flex justify-center mt-5" v-if="selected">
                    <v-card elevation="1" min-width="320px" max-width="700px;" class="px-4 pb-2">
                        <v-card-title class="d-flex justify-center mb-4" style="font-size: 30px;"> 
                            {{ selected.position.title }} 
                        </v-card-title>
                        <v-card-subtitle class="text-center">
                            <div>
                                {{ selected.item_code}} 
                            </div> 
                            <div>
                                {{ selected.description ? selected.description : "N/A" }} 
                            </div>
                        </v-card-subtitle>
                        <v-card-text class="text-center"> Available Slots: {{ selected.slots }} </v-card-text>
                        <v-card-text v-if="selected.show_salary==1" class="text-center text--primary" > 
                            {{ selected.salary.value==undefined ? 'N/A' :  "PHP " + selected.salary.value}} 
                        </v-card-text>
                        <v-card-actions class="pa-4 d-flex justify-center">  
                            <v-btn color="primary darken-5" @click="openForm(selected)" class="mx-2"> Apply </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-sheet>
            </v-fade-transition>
            <v-fade-transition leave-absolute hide-on-leave>
                <v-row v-if="selected == null">
                    <template style="display: contents;" v-if="!loading">
                        <template style="display: contents;" v-if="jobs.length > 0">
                            <v-col cols="12" xs="12" sm="6" md="6" lg="4" xl="3"
                                v-for="(job, index) in jobs" :key="index"
                                class="d-flex flex-column"
                                >
                                <v-card elevation="1" class="flex-grow-1 d-flex flex-column justify-space-between">
                                    <v-card-title> {{ job.position.title }} </v-card-title>
                                    <v-card-subtitle> 
                                        <div>
                                            {{ job.item_code }}
                                        </div>
                                        <div>
                                            {{ job.description ? job.description : "N/A" }} 
                                        </div>
                                    </v-card-subtitle>
                                    <v-card-text class="text--primary" > 
                                        <div v-if="job.show_salary==1">
                                            {{ job.salary.value==undefined ? 'N/A' :  "PHP " + job.salary.value}} 
                                        </div>  
                                    </v-card-text>
                                    <v-card-actions class="pa-4 d-flex flex-row-reverse justify-self-end"> 
                                        <v-btn color="primary" @click="openJob(job)">
                                            Apply 
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-col>
                        </template>
                        <v-col cols="12" class="text-center mt-10" v-else>
                            No Job Vacancies as of now.
                        </v-col>
                    </template>
                    <template style="display: contents;" v-else>
                        <v-col cols="12" xs="12" sm="6" md="6" lg="4" xl="3"
                            v-for="loader in 4" :key="loader"
                            >
                            <v-skeleton-loader class="mx-auto" type="card">
                            </v-skeleton-loader>
                        </v-col>
                    </template>
                </v-row>
            </v-fade-transition>
        </v-container>
    </div>
</template>

<script>
import Form from '../components/Form.vue';

export default {
    middleware: ['guest'],
    components: {
        ApplyForm: Form
    },

    mounted() {
        this.initJobs();
    },

    data() {
        return {
            jobChosen: null,
            page: 1,
            loading: false,
            selected: null,
            apply: false,
            breadcrumbs: [
                {
                    text: 'Job Vacancies',
                    disabled: true,
                }
            ],
            jobs: [
                // {
                //     title: "Graphic Designer",
                //     description: "Designs the overall UI and UX for the systems",
                // },
                // {
                //     title: "Software Engineer",
                //     description: "The primary role will be programming new functions for the system.",
                // },
                // {
                //     title: "Project Manager",
                //     description: "Manages the projects' requirements",
                // },
                // {
                //     title: "Quality Tester",
                //     description: "Testing system functions if it meets the requirements",
                // },
                // {
                //     title: "Junior Software Engineer (Intern)",
                //     description: "",
                // },
            ]
        }
    },

    methods: {

        async initJobs() {
            this.loading = true;
            await this.$axios.post(`/applicant/positions/jobs/?page=${this.page}`)
                .then(res => {
                    this.jobs = res.data.data.data;
                })
                .catch(() => {

                })
                .finally(() => {
                    this.loading = false;
                });
        },  

        openJob(job) {
            this.breadcrumbs.forEach(crumb => {
                crumb.disabled = false;
            })
            var newJob = {
                text: job.title,
                disabled: true,
            }
            this.selected = job;
            this.breadcrumbs.push(newJob);
        },

        resetCrumbs() {
            this.selected = null;
            this.breadcrumbs[0].disabled = true;
            this.breadcrumbs.pop();
        },

        openForm(selected) {
            this.jobChosen = selected
            this.apply = true;
        },

        closeModal() {
            this.apply = false;
        }

    }
}
</script>

<style>
    .crumb:not([disabled]):hover {
        cursor: pointer;
    }
    .crumb:disabled {
        cursor: default !important;
    }
</style>