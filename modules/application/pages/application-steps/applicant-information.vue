<template>
<div>
    <v-row v-if="schedule == null && !loading ">
        <v-col cols="12" xs="12" sm="3">
            <v-tabs v-model="tab" vertical grow hide-slider active-class="indigo darken-4 white--text rounded-sm" class="elevation-2 rounded-md">
                <v-tab v-for="item in tabs" :key="item.link" :href="item.link"> {{item.text}}</v-tab>
            </v-tabs>
        </v-col>
        <v-col cols="12" xs="12" sm="9">
            <v-form ref="applicationForm" @submit.prevent="submit()">
                <v-tabs-items v-model="tab" vertical>
                    <v-tab-item eager value="c1">
                        <PersonalInformation @getPersonalInformation="getPersonalInformation" />
                        <FamilyBackground @getFamilyBackground="getFamilyBackground" />
                        <EducationalBackground @getEducationalBackground="getEducationalBackground" />
                        <div class="d-flex flex-row-reverse mx-4 my-2">
                            <v-btn color="primary darken-3" @click="changeTab('c2')"> Next </v-btn>
                        </div>
                    </v-tab-item>
                    <v-tab-item :eager="true" value="c2">
                        <C2 @getCivilServices="getCivilServices" @getWorkExperiences="getWorkExperiences"/>
                        <div class="d-flex justify-space-between mx-4 my-2">
                            <v-btn @click="changeTab('c1')"> Back </v-btn>
                            <v-btn color="primary darken-3" @click="changeTab('c3')"> Next </v-btn>
                        </div>
                    </v-tab-item>
                    <v-tab-item eager value="c3"> 
                        <C3 @getVoluntaryWorks="getVoluntaryWorks" @getLearningDevelopments="getLearningDevelopments" @getOtherInformation="getOtherInformation"/> 
                        <div class="d-flex justify-space-between mx-4 my-2">
                            <v-btn @click="changeTab('c2')"> Back </v-btn>
                            <v-btn color="primary darken-3" @click="changeTab('c4')"> Next </v-btn>
                        </div>
                    </v-tab-item>
                    <v-tab-item eager value="c4">
                        <C4 @getChoices="getChoices" @getReferences="getReferences" @getGovernmentID="getGovernmentID" @getAttachments="getAttachments"/>
                        <v-container>
                            <v-row>
                                <v-col cols="12" sm="6">
                                    <div class="d-flex">
                                        <v-checkbox id="agreement" v-model="agree">
                                        </v-checkbox>
                                        <label class="my-5 text-justify" for="agreement">
                                            I declare under oath that I have personally accomplished this Personal Data Sheet which is a true, correct and complete statement pursuant to the provisions of pertinent laws, rules and regulation of the Republic of the Philippines. I authorize the agency head/authorized representative to verify/validate the contents stated herein. I agree that any misrepresentation made in this document and its attachments shall cause the filing of administrative/criminal case/s against me.
                                        </label>
                                    </div>
                                    <v-btn :loading="loading" type="submit" :disabled="!agree" class="mt-4" color="primary darken-4" block> Submit </v-btn>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-tab-item>
                </v-tabs-items>
            </v-form>
        </v-col>
    </v-row> 
    <v-row v-else-if="schedule != null && !loading">
        <v-col cols="12" xs="12" sm="9">
            <v-card elevation="1" class="ma-3">
                <v-card-title> Hello, {{ schedule != null  ?  schedule.applicant.fname + " " + schedule.applicant.lname :  " "}}!</v-card-title>
                <v-card-text>
                    {{ message.wait }}
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
    <v-skeleton-loader v-else type="card-avatar, article, actions"></v-skeleton-loader>
</div>
</template>

<script>
import PersonalInformation from '../../components/application-information/PersonalInformation.vue';
import FamilyBackground from '../../components/application-information/FamilyBackground.vue';
import EducationalBackground from '../../components/application-information/EducationalBackground.vue';
import C2 from '../../components/application-information/C2.vue';
import C3 from '../../components/application-information/C3.vue';
import C4 from '../../components/application-information/C4.vue';
import store from '../../store/application';

export default {

    components: {
        PersonalInformation, 
        FamilyBackground, 
        EducationalBackground, 
        C2, C3, C4
    },
    
    data() {
        return {
            detailsCheck: [],
            loading: false,
            personalInformation: null,
            familyBackground: null,
            educationalBackground: null,
            civilServices: null,
            workExperiences: null,
            voluntaryWorks: null,
            learningDevelopments: null,
            otherInformation: null,
            choices: null,
            references: null,
            governmentID: null,
            attachments: null,
            tabs: [
                {
                    link: '#c1',
                    text: 'C1',
                    valid: true,
                },
                {
                    link: '#c2',
                    text: 'C2',
                    valid: true,
                },
                {
                    link: '#c3',
                    text: 'C3',
                    valid: true,
                },
                {
                    link: '#c4',
                    text: 'C4',
                    valid: true,
                },
            ],
            tab: '',
            agree: false,
            message:{
                wait: "Your submitted Personal Data Sheet is currently under review. Thank you for patiently waiting.",
            },
            schedule:null,
            loading: false
        }
    },
    mounted(){
        this.checkDetails()
    },
    methods: {

        changeTab(tab) {
            this.tab = tab;
            window.scrollTo(0,0);
        },

        getPersonalInformation(value) {
			this.personalInformation = value;
		},
		getFamilyBackground(value) {
			this.familyBackground = value;
		},
		getEducationalBackground(value) {
			this.educationalBackground = value;
		},
		getCivilServices(value){
			this.civilServices = value;
		},
		getWorkExperiences(value){
			this.workExperiences = value;
		},
		getVoluntaryWorks(value){
			this.voluntaryWorks = value;
		},
		getLearningDevelopments(value){
			this.learningDevelopments = value;
		},
		getOtherInformation(value){
			this.otherInformation = value;
		},
		getChoices(value){
			this.choices = value;
		},
        getReferences(value) {
			this.references = value;
		},
		getGovernmentID(value) {
			this.governmentID = value;
		},
		getAttachments(value) {
			this.attachments = value;
		},
        async checkDetails(){
            this.loading = true
            await this.$axios.get('/applicant/details')
            .then(async (res) => {
                this.schedule = res.data.data
                this.loading = false
            })
        },
		async submit() {
            if(this.$refs.applicationForm.validate()){
                this.loading = true;
                
                await this.$swal.fire({
                    icon: 'warning',
                    title: "Are you sure?",
                    text: "You will be submitting your details.",
                    showCancelButton: true,
                    confirmButtonText: "Continue"
                }).then(async (res) => {
                    if(res.isConfirmed){
                        this.checkJSONChildrenEmpty(this.familyBackground.children);
                        this.checkJSONIfEmpty(this.educationalBackground.elementary);
                        this.checkJSONIfEmpty(this.educationalBackground.secondary);
                        this.checkJSONIfEmpty(this.educationalBackground.vocational);
                        this.checkJSONIfEmpty(this.educationalBackground.college);
                        this.checkJSONIfEmpty(this.educationalBackground.graduate);
                        this.checkJSONIfEmpty(this.civilServices);
                        this.checkJSONIfEmpty(this.workExperiences);
                        this.checkJSONIfEmpty(this.voluntaryWorks);
                        this.checkJSONIfEmpty(this.learningDevelopments);
                        this.checkJSONIfEmpty(this.otherInformation);
                        this.checkJSONChildrenEmpty(this.references);

                        const payload = {
                            personalInformation: this.personalInformation,
                            familyBackground: this.familyBackground,
                            educationalBackground: this.educationalBackground,
                            civilServices: this.civilServices,
                            workExperiences: this.workExperiences,
                            voluntaryWorks: this.voluntaryWorks,
                            learningDevelopments: this.learningDevelopments,
                            otherInformation: this.otherInformation,
                            choices: this.choices,
                            references: this.references,
                            governmentID: this.governmentID,
                        }
                        await this.$axios.post('/applicant/information/create', payload)
                        .then(async (res) => {
                            const formData = new FormData();
                            for (const file of this.attachments) {
                                formData.append(file.entityName, file.value);
                            }
                            await this.submitFiles(formData);
                            
                            await this.$swal.fire({
                                icon: "success",
                                title: "Success",
                                text: "Details successfully submitted",
                                timer: 2000,
                                showConfirmButton: false
                            }).then(async (res) => {
                                this.$router.go()
                            })
                        }).catch((err) => {
                            this.$toast.open({
                                type: 'error',
                                message: err.response.data.error,
                                duration: 5000,
                            });
                        }).finally(() => {
                            this.loading = false;
                        });
                    }
                })
            }else{
                this.$toast.open({
                    type: 'error',
                    message: "Please fill all the required fields. Put 'N/A' if no answer.",
                    duration: 5000,
                })
            }
		},

        checkJSONChildrenEmpty(jsonArr = []) {
			let countEmptyValue = 0;
			let indexes = [];

			jsonArr.forEach((json, index) => {
				json.info.forEach((info) => {
					if (info.value.trim().length == 0) {
						countEmptyValue++;
					}
				});
				if (countEmptyValue == json.info.length) {
					indexes.push(index);
				}
				countEmptyValue = 0;
			});
			return this.removeEmptyIndexes(indexes, jsonArr);
		},
        checkJSONIfEmpty(jsonArr = []) {
			let length = 0;
			let countEmptyValue = 0;
			let indexes = [];

			jsonArr.forEach((value, index) => {
				for (const key in value) {
					if (key != 'tableName') {
						length += value[key].info.length;
						value[key].info.forEach((info) => {
							if (info.value.trim().length <= 0) {
								countEmptyValue++;
							}
						});
					}
				}
				if (countEmptyValue == length) {
					indexes.push(index);
				}
				countEmptyValue = 0;
				length = 0;
			});
			return this.removeEmptyIndexes(indexes, jsonArr);
		},
        removeEmptyIndexes(indexes, jsonArr) {
			indexes.forEach((emptyIndex, index) => {
				jsonArr.splice(emptyIndex - index, 1);
			});

			return jsonArr;
		},

        async submitFiles(formData) {
			await this.$axios
				.post('/applicant/create/files', formData)
				.then((res) => {
					this.$swal.fire({
						icon: 'success',
						title: 'Success',
						text: 'Created successfully!',
					});
					// this.$refs.applicationForm.reset();
				})
				.catch(async (err) => {
					await this.$toast.open({
                        type: 'error',
                        message: err.response.data.error,
                        duration: 5000,
                    });
				})
				.finally(() => {
					this.loading = false;
				});
		},
    }
}
</script>

<style lang="scss">

</style>