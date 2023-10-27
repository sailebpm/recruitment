<template>
    <div>
        <v-alert border="left" colored-border type="warning" elevation="2">
            <p class="font-weight-medium mb-0" style="font-size: 16px">Warning</p>
            <p class="mb-0" style="font-size: 14px;"><strong>-</strong> Indicate <strong>N/A</strong> if not applicable. <strong>DO NOT ABBREVIATE.</strong></p>
            <p class="mb-0" style="font-size: 14px"><strong>-</strong> All the requirements should be <strong>printed</strong> and submitted personally to the <strong>HR.</strong></p>
            <p class="mb-0" style="font-size: 14px"><strong>-</strong> Re-schedule of Initial Interview, Exam and Final Interview <strong> (twice only).</strong></p>
        </v-alert>

        <div v-if="this.step >= 8">
            <UploadRequirements :applicant_information="info"/>
        </div>
        <v-tabs v-model="procedure" hide-slider class="v-tab__outlined mt-10">
            <v-tab :disabled="disable_all_step_1" class="text-capitalize font-weight-bold" :ripple="false" href="#step1">Step 1: Applicant Response </v-tab>
            <v-tab :disabled="disableStep2" class="text-capitalize font-weight-bold" :ripple="false" href="#step2">Step 2: Schedule of Exam</v-tab>
            <v-tab :disabled="disableStep3" class="text-capitalize font-weight-bold" :ripple="false" href="#step3">Step 3: Status of Exam</v-tab>
            <v-tab :disabled="disableStep4" class="text-capitalize font-weight-bold" :ripple="false" href="#step4">Step 4: Schedule of Final Interview</v-tab>
            <v-tab :disabled="disableStep5" class="text-capitalize font-weight-bold" :ripple="false" href="#step5">Step 5: Status of Final Interview</v-tab>
            <v-tab :disabled="disableStep6" class="text-capitalize font-weight-bold" :ripple="false" href="#step6">Step 6: Congratulatory</v-tab>
            <v-tab :disabled="disableStep7" class="text-capitalize font-weight-bold" :ripple="false" href="#step7">Step 7: Submission of Requirements</v-tab>
            <v-tab :disabled="disableStep8" class="text-capitalize font-weight-bold" :ripple="false" href="#step8">Step 8: Appointment</v-tab>
        </v-tabs>
        <v-tabs-items v-model="procedure" class="mr-10">
            <v-tab-item value="step1">
                <v-tabs v-model="stepOne_tab" hide-slider class="v-tab__outlined mt-10 ml-12" >
                        <v-tab :disabled="disableStep1" class="text-capitalize" :ripple="false" href="#step1">Applicant Information </v-tab>
                        <v-tab :disabled="disableStep1_1" class="text-capitalize" :ripple="false" href="#step1_1">Initial Interview </v-tab>
                        <v-tab :disabled="disableStep1_2" class="text-capitalize" :ripple="false" href="#step1_2">Status of Initial Interview</v-tab>
                </v-tabs>
                <v-tabs-items v-model="stepOne_tab">
                    <v-tab-item value="step1">
                        <Step1/>
                    </v-tab-item>
                    <v-tab-item value="step1_1">
                        <Step1_1/>
                    </v-tab-item>
                    <v-tab-item value="step1_2">
                        <Step1_2/>
                    </v-tab-item>
                </v-tabs-items>
    
            </v-tab-item>
            <v-tab-item value="step2">
                <Step2/>
            </v-tab-item>
            <v-tab-item value="step3">
                <Step3/>
            </v-tab-item>
            <v-tab-item value="step4">
                <Step4/>
            </v-tab-item>
            <v-tab-item value="step5">
                <Step5/>
            </v-tab-item>
            <v-tab-item value="step6">
                <Step6/>
            </v-tab-item>
            <v-tab-item value="step7">
                <Step7/>
            </v-tab-item>
            <v-tab-item value="step8">
                <Step8/>
            </v-tab-item>
            
        </v-tabs-items>
        
    </div>
</template>

<script>
import store from '../store/application';
// import PageInfo from '~/components/PageInfo.vue'
import Step1 from './application-steps/applicant-information.vue'
import Step1_1 from './application-steps/initial_interview_schedule.vue'
import Step1_2 from './application-steps/initial-interview-status.vue'
import Step2 from './application-steps/exam-schedule.vue'
import Step3 from './application-steps/exam-status.vue'
import Step4 from './application-steps/interview-schedule.vue'
import Step5 from './application-steps/interview-status.vue'
import Step6 from './application-steps/congratulatory.vue'
import Step7 from './application-steps/submission_of_requirements.vue'
import Step8 from './application-steps/appointment-schedule.vue'

import UploadRequirements from './applicant-requirements/UploadRequirements.vue'

export default {
    layout: 'sidebar',
    middleware: 'auth',
    props: ['nav'],
    created() {
        this.getCurrentStep();
        this.routeToStep();
        this.getInfo();
    },
    
    
    data() {
        return {
            pageinfo: {
                title: 'Job Recruitment',
                desc: "Job recruitment refers to the entire process of identifying, sourcing, screening, shortlisting, and interviewing job candidates."
            },

            steps: [
                {
                    step: 1,
                    text: 'Applicant Information',
                    link: 'application.applicant-info'
                },
                {
                    step: 2,
                    text: 'Schedule Initial Interview',
                    link: 'application.initial_interview_schedule'
                },
                {
                    step: 3,
                    text: 'Status of Initial Interview',
                    link: 'application.initial-interview-status'
                },
                {
                    step: 4,
                    text: 'Schedule of Exam',
                    link: 'application.exam-schedule'
                },
                {
                    step: 5,
                    text: 'Status of Exam',
                    link: 'application.exam-status'
                },
                {
                    step: 6,
                    text: 'Schedule of Final Interview',
                    link: 'application.interview-schedule'
                },
                {
                    step: 7,
                    text: 'Status of Final Interview',
                    link: 'application.interview-status'
                },
                {
                    step: 8,
                    text: 'Congratulatory',
                    link: 'application.congratulatory'
                },
                {
                    step: 9,
                    text: 'Submission of requirements',
                    link: 'application.submission_of_requirements'
                },
                {
                    step: 10,
                    text: 'Appointment',
                    link: 'application.appointment-schedule'
                },
            ],
            info: null,
            step: null,
            procedure: null,
            stepOne_tab: null,
            disable_all_step_1: true,
            disableStep1: true,
            disableStep1_1: true,
            disableStep1_2: true,
            disableStep2: true,
            disableStep3: true,
            disableStep4: true,
            disableStep5: true,
            disableStep6: true,
            disableStep7: true,
            disableStep8: true,

        }
    },
    components: {
        // PageInfo,
         Step1, Step1_1, Step1_2, Step2, Step3, Step4, Step5, Step6, Step7, Step8,
         UploadRequirements
    },
    methods: {
        async getCurrentStep(){
            this.loading = true
            await this.$axios.post('/applicant/step/current').then((res) => {
                this.step = res.data.data[0].step
                store.setStep(res.data.data[0].step)
                if(this.step == "1"){
                    this.disableStep1 = false
                    this.disable_all_step_1 = false
                    this.procedure = 'step1'
                }
                if(this.step == "2"){
                    this.disableStep1_1= false
                    this.disable_all_step_1 = false
                    this.procedure = 'step1_1'
                }
                if(this.step == "3"){
                    this.disableStep1_2 = false
                    this.disable_all_step_1 = false
                    this.procedure = 'step1_2'
                  
                }
                if(this.step == "4"){
                    this.disableStep2 = false
                    this.disable_all_step_1 = true
                    this.procedure = 'step2'
                }
                if(this.step == "5"){
                    this.disableStep3 = false
                    this.disable_all_step_1 = true
                    this.procedure = 'step3'
                  
                }
                if(this.step == "6"){
                    this.disableStep4 = false
                    this.disable_all_step_1 = true
                    this.procedure = 'step4'
                  
                }
                if(this.step == "7"){
                    this.disableStep5 = false
                    this.disable_all_step_1 = true
                    this.procedure = 'step5'
                  
                }
                if(this.step == "8"){
                    this.disableStep6 = false
                    this.disable_all_step_1 = true
                    this.procedure = 'step6'
                  
                }
                if(this.step == "9"){
                    this.disableStep7 = false
                    this.disable_all_step_1 = true
                    this.procedure = 'step7'
                  
                }
                if(this.step == "10"){
                    this.disableStep8 = false
                    this.disable_all_step_1 = true
                    this.procedure = 'step8'
                  
                }
            }).finally(() => {
                this.loading = false
            })
            
        },
        routeToStep() {
            let step = this.steps.find(step => step.step == store.state.step);
            this.$router.push({name: step.link});
        },

        async getInfo(){
            await this.$axios.get('/applicant/user').then((res) => {
                this.info = res.data
            })
        },
    },
    watch: {
        currentStep() {
            this.routeToStep();
        }
    },  
    computed: {
        currentStep() {
            this.$axios.post('/applicant/step/current').then((res) => {
                this.step = res.data.data[0].step
                store.setStep(res.data.data[0].step)
            })
            return this.step;
        }
    }
}
</script>
<style scoped>
.v-tabs.v-tab__outlined .v-tab{
    border-bottom: 1.5px solid #747474;
}
.v-tabs.v-tab__outlined .v-tab.v-tab--active {
    border-top: 1.5px solid #747474 !important;
    border-left: 1.5px solid #747474 !important;
    border-right: 1.5px solid #747474 !important;
    border-bottom: none !important;
    background: none !important;
    color: #757575 !important;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
}
</style>