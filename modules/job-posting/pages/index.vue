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
                            {{ selected.position_title }}
                        </v-card-title>
                        <v-card-subtitle class="text-center">
                            <div>
                                {{ selected.description ? selected.description : "N/A" }}
                            </div>
                        </v-card-subtitle>
                        <v-card-text class="text-center"> Available Slots: {{ selected.slots }} </v-card-text>
                        <v-card-text v-if="sector.name == 'public'" class="text-center text--primary" >
                            <div v-if="selected.show_salary==1">
                                {{ selected.salary.value==undefined ? 'N/A' :  "PHP " + selected.salary.value}}
                            </div>
                        </v-card-text>
                        <v-card-text v-if="sector.name == 'private'" class="text-center text--primary" >
                            <div v-if="selected.show_salary==1">
                                {{ selected.salary==undefined ? 'N/A' :  "PHP " + selected.salary}}
                            </div>
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
                                    <v-card-title> {{ job.position_title }} </v-card-title>
                                    <v-card-subtitle>
                                        <div>
                                            {{ job.description ? job.description : "N/A" }}
                                        </div>
                                    </v-card-subtitle>
                                    <v-card-text class="text--primary" v-if="sector.name == 'public'" >
                                        <div v-if="job.show_salary === 1">
                                            {{ job.salary == undefined ? 'N/A' : "PHP " + job.salary.value }}
                                        </div>
                                    </v-card-text>
                                    <v-card-text class="text--primary" v-if="sector.name == 'private'" >
                                        <div v-if="job.show_salary === 1">
                                            {{ job.salary == undefined ? 'N/A' :  "PHP " + job.salary.value}}
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

                    <v-col cols="12">
                        <v-pagination class="pagination text-center" v-model="page" :length="pageCount" :total-visible="itemsPerPage > 2 ? itemsPerPage : 5" @input="onPageChange" color="#2d3270"></v-pagination>
                    </v-col>
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

   async mounted() {
        this.initJobs();

        await this.$axios.get('/applicant/sector/fetch_sector_type')
            .then((res) => {
                this.sector = res.data
            });

    },

    data() {
        return {
            sector: null,
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
            jobs: [],
            itemsPerPage: 5,
            page: 1,
            pageCount: 1,
        }
    },



    methods: {

        onPageChange() {
            this.initJobs();
        },

        async initJobs() {
            this.loading = true;
            await this.$axios.post(`/applicant/positions/fetch-all-jobs?page=${this.page}`)
                .then(res => {
                    this.jobs = res.data.data.data;
                    this.itemsPerPage = res.data.data.per_page;
                    this.page = res.data.data.current_page;
                    this.pageCount = res.data.data.last_page;
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
    .pagination {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
    }
</style>
