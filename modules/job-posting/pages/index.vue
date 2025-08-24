<template>
    <div>
        <ApplyForm v-if="apply" :job="jobChosen" @close="closeModal"/>
        <v-container>
            <v-row no-gutters>
                <v-col cols="12" xl="12">
                    <h1 class="text-uppercase">list of job vacancies</h1>
                    <v-breadcrumbs :items="breadcrumbs" divider="/" class="pl-0">
                        <template v-slot:item="{item}">
                            <v-breadcrumbs-item @click="resetCrumbs" :disabled="item.disabled" class="indigo--text crumb">
                                {{ item.text }}
                            </v-breadcrumbs-item>
                        </template>
                    </v-breadcrumbs>
                    <v-divider></v-divider>
                </v-col>
            </v-row>

            <v-fade-transition leave-absolute hide-on-leave>
                <v-sheet class="d-flex justify-center mt-5" v-if="selected">
                    <v-row>
                        <v-col v-for="(selected, index) in selected.details" :key="index" cols="12" sm="6" md="6" lg="4" xl="3">
                            <v-card elevation="1" min-width="320px" max-width="700px;" class="px-4 pb-2 m-3">
                                <v-card-title class="d-flex justify-center mb-4" style="font-size: 30px;">
                                    {{ selected.position_title }}
                                </v-card-title>
                                <v-card-subtitle class="text-center">
                                    <div>
                                        {{ selected.description ? selected.description : "N/A" }}
                                    </div>
                                </v-card-subtitle>
                                <v-card-text v-if="sector.name == 'public'" class="text-center text--primary" >
                                    <div v-if="selected.show_salary==1">
                                        {{ selected.salary.value==undefined ? 'N/A' :  "PHP " + selected.salary.value}}
                                    </div>
                                    <div>
                                        {{ selected.item_code }}
                                    </div>
                                </v-card-text>
                                <v-card-text v-if="sector.name == 'private'" class="text-center text--primary" >
                                    <div v-if="selected.show_salary==1">
                                        {{ selected.salary==undefined ? 'N/A' :  "PHP " + selected.salary}}
                                    </div>
                                    <div>
                                        {{ selected.item_code }}
                                    </div>
                                </v-card-text>

                                <v-card-actions class="pa-4 d-flex justify-center">
                                    <v-btn color="#2d3270" @click="openForm(selected)" class="mx-2 white--text"> Apply </v-btn>
                                    <v-btn color="#2d3270" @click="openPDF(selected)" class="mx-2 white--text"> View </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-col>
                    </v-row>
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
                                           
                                        </div>
                                        <div>
                                            <strong>Available Slot/s: </strong>{{ job.slots }}
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
                                        <v-btn class="white--text" color="#2d3270" @click="openJob(job)">
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

                    <v-col cols="12 mt-5">
                        <v-pagination class="pagination text-center" v-model="page" :length="pageCount" :total-visible="itemsPerPage > 2 ? itemsPerPage : 5" @input="onPageChange" color="#2d3270"></v-pagination>
                    </v-col>
                </v-row>
            </v-fade-transition>
        </v-container>
    </div>
</template>

<script>
import Form from '../components/Form.vue';
import jsPDF from 'jspdf';
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
        openPDF(selected){
            var forAdjust = false;
            var doc = new jsPDF();
            const customPdfText = (text, x, y, fontSize, position = null,bold = false) => {
                            
                const textWidth = doc.getStringUnitWidth(text) * fontSize / doc.internal.scaleFactor;
                const pageWidth = doc.internal.pageSize.getWidth();

                if(position == 'end' ){
                    x = pageWidth - textWidth - x;
                }else if(position == 'center'){
                x = (pageWidth - textWidth) / 2;
                }
                
                doc.setFontSize(fontSize);
                if(bold){
                    doc.setFont('Times', 'bold');
                }
                if(forAdjust)
                {
                    y = y - 10;
                }
                doc.text(text, x, y);

                doc.setFont('Times', 'normal');
            };
            

            
            customPdfText("COMPANY", 15, 8,10, null, true);
            doc.line(15, 15, doc.internal.pageSize.width - 15, 15);


            customPdfText('Place of Assignment :', 16, 24, 11.5, null, true);
            customPdfText(selected.placement_of_assignment, 95, 24, 11.5);

            customPdfText('Position Title :', 16, 34, 11.5, null, true);
            customPdfText(selected.position_title, 95, 34, 11.5);

            customPdfText('Plantilla Item No. :', 16, 44, 11.5, null, true);
            customPdfText(selected.item_code, 95, 44, 11.5);

            customPdfText('Salary/Job/Pay Grade : ', 16, 54, 11.5, null, true);
            customPdfText(selected.salary.salary_grade.toString(), 95, 54, 11.5);
            forAdjust = true
            if(selected.show_salary == 1){

                forAdjust = false
                customPdfText('Monthly Salary :', 16, 64, 11.5, null, true);
                customPdfText(selected.salary.value, 95, 64, 11.5);
            }
            customPdfText('Eligibility :', 16, 74, 11.5, null, true);
            customPdfText(selected.eligibility, 95, 74, 11.5);

            customPdfText('Education :', 16, 89, 11.5, null, true);
            customPdfText(selected.education, 95, 89, 11.5);

            customPdfText('Training :', 16, 104, 11.5, null, true);
            customPdfText(selected.training, 95, 104, 11.5);

            customPdfText('Work Experience :', 16, 114, 11.5, null, true);
            customPdfText(selected.experience, 95, 114, 11.5);

             customPdfText('Competency :', 16, 126, 11.5, null, true);

             customPdfText('Instruction/Remarks :', 16, 136, 11.5, null, true);
             customPdfText('Interested and qualified applicants should signify their interest in writing. Attach the following documents', 16, 141, 11.5);
             customPdfText('to the application letter and send to the address below not later than', 16, 146, 11.5);
             customPdfText('Documents:', 16, 156, 11.5, null, true);

             customPdfText('1. Fully accomplished Personal Data Sheet (PDS) with recent passport-sized picture (CS Form No. 212,', 16, 166, 11.5);
             customPdfText('Revised 2017) which can be downloaded at www.csc.gov.ph;', 16, 171, 11.5);
             customPdfText('2. Performance rating in the last rating period (if applicable);', 16, 176, 11.5);
             customPdfText('3. Photocopy of certificate of eligibility/rating/license; and', 16, 181, 11.5);
             customPdfText('4. Photocopy of Transcript of Records.', 16, 186, 11.5);
             customPdfText('QUALIFIED APPLICANTS', 16, 200, 13,null,true);
             customPdfText('are advised to hand in or send through courier/email their application to:', 73, 200, 11.5);

             customPdfText(selected.hiring_manager, 16, 210, 12.5);
             customPdfText('Hiring Manager', 16, 220, 12,null,true);
            //  customPdfText('Zarraga Water District', 16, 225, 11.5);
            //  customPdfText('Gomez St., Zarraga, Iloilo', 16, 230, 11.5);
             customPdfText('APPLICATIONS WITH INCOMPLETE DOCUMENTS SHALL NOT BE ENTERTAINED.',16, 245,12.5,null,true)
             customPdfText('Posting Date :',16, 260 ,11.5 ,null ,true)
             customPdfText(selected.post_start.split(' ')[0],45, 260,11.5)

             customPdfText('Closing Date :',16, 270 ,11.5 ,null ,true)
             customPdfText(selected.post_due.split(' ')[0],45, 270 ,11.5)

            var pdfData = doc.output('blob');

            var pdfUrl = URL.createObjectURL(pdfData);

            window.open(pdfUrl, '_blank');
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
