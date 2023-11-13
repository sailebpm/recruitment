<template>
    <v-dialog v-model="modal_preemployment" max-width="2100" transition="dialog-bottom-transition" persistent>
        <div>
            <v-card>
                <v-card-title class="pa-0">
                    <v-toolbar class="elevation-0">
                        <v-spacer></v-spacer>
                        <v-toolbar-title>Pre-Employment Application Form</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-toolbar-items>
                            <v-btn icon @click="close_modal()">
                                <v-icon>mdi-close</v-icon>
                            </v-btn>
                        </v-toolbar-items>
                    </v-toolbar>
                </v-card-title>
                <v-divider class="my-1"></v-divider>
                <v-col cols="12">
                    <v-alert border="left" colored-border type="warning" elevation="2">
                        <p class="font-weight-medium mb-0" style="font-size: 16px;">Note:</p>
                        <p class="mb-0" style="font-size: 12px;">Indicate <strong>N/A</strong> if not applicable. <strong>DO NOT ABBREVIATE.</strong></p>
                    </v-alert>
                </v-col>
                <v-col cols="12" xs="12" sm="12">
                    <v-tabs v-model="tab" grow hide-slider active-class="indigo darken-4 white--text rounded-sm" class="elevation-2 rounded-md">
                        <v-tab v-for="item in tabs" :key="item.link" :href="item.link"> {{item.text}}</v-tab>
                    </v-tabs>
                </v-col>
                <v-row v-if="schedule == null && !loading">
                    <v-col cols="12" xs="12" sm="12">
                        <v-form ref="applicationForm" @submit.prevent="submit()">
                            <v-tabs-items v-model="tab" vertical>
                                <v-tab-item eager value="contact_information">
                                    <ContactInformation @getContactInformation="getContactInformation" :register="register" />

                                    <div class="d-flex flex-row-reverse mx-4 my-2">
                                        <v-btn color="primary darken-3" @click="changeTab('personal_information')"> Next </v-btn>
                                    </div>
                                </v-tab-item>
                                <v-tab-item :eager="true" value="personal_information">
                                    <PersonalInformation @getPersonalInformation="getPersonalInformation" :register="register" />

                                    <div class="d-flex justify-space-between mx-4 my-2">
                                        <v-btn @click="changeTab('contact_information')"> Back </v-btn>
                                        <v-btn color="primary darken-3" @click="changeTab('skills_Educational_attainment')"> Next </v-btn>
                                    </div>
                                </v-tab-item>
                                <v-tab-item eager value="skills_Educational_attainment">
                                    <Skills_Educational_Attainment @getSkillsEducationalAttainment="getSkillsEducationalAttainment" />

                                    <div class="d-flex justify-space-between mx-4 my-2">
                                        <v-btn @click="changeTab('personal_information')"> Back </v-btn>
                                        <v-btn color="primary darken-3" @click="changeTab('Work_Experience_and_Trainings')"> Next </v-btn>
                                    </div>
                                </v-tab-item>

                                <v-tab-item eager value="Work_Experience_and_Trainings">
                                    <WorkExperienceTrainings @getWorkExperienceTraining="getWorkExperienceTraining" @getreferral="getreferral" />

                                    <div class="d-flex justify-space-between mx-4 my-2">
                                        <v-btn @click="changeTab('skills_Educational_attainment')"> Back </v-btn>
                                        <v-btn color="primary darken-3" @click="changeTab('Background_Check_Notice')"> Next </v-btn>
                                    </div>
                                </v-tab-item>

                                <v-tab-item eager value="Background_Check_Notice">
                                    <BackgroundCheckNotice @getBackroundCheckNotice="getBackroundCheckNotice" :register="register" :firstchoice="firstchoice" />

                                    <v-row>
                                        <v-col cols="12" sm="9">
                                            <div class="d-flex pl-5" cols="12" sm="9">
                                                <v-checkbox id="agreement" v-model="agree"> </v-checkbox>
                                                <label class="my-5 text-justify" for="agreement">
                                                    I declare under the penalties of perjury that this form has been accoumphished in good faith, verified by me and to the best of my knowledge and belief, is a true, correct and complete
                                                    statement pursuant to the provisions of pertinent laws, rules and regulations of the Republic of the Philippines.
                                                </label>
                                            </div>
                                            <div class="d-flex pl-5">
                                                <v-checkbox id="agreement1" v-model="agree1"> </v-checkbox>
                                                <label class="my-5 text-justify" for="agreement1">
                                                    I agree and authorize the NATIONAL KIDNEY AND TRANSPLANT INSTITUTE to obtain the background infomation for the employment purpose. For all future time, I waive and release from any legal
                                                    obligation, any person or organization for any result of providing, obtaining or acting upon on the result of the employment verification. I understand that such information is sought with
                                                    confidentiality, and I will not request for the copy of that information
                                                </label>
                                            </div>
                                            <div class="d-flex pl-5">
                                                <v-btn :loading="loading" type="submit" :disabled="!agree || !agree1" class="mt-4" color="yellow darken-1" block> Register </v-btn>
                                            </div>
                                        </v-col>
                                    </v-row>
                                </v-tab-item>
                            </v-tabs-items>
                        </v-form>
                    </v-col>
                </v-row>
                <v-row v-else-if="schedule != null && !loading">
                    <v-col cols="12" xs="12" sm="9">
                        <v-card elevation="1" class="ma-3">
                            <v-card-title> Hello, {{ schedule != null ? schedule.applicant.fname + " " + schedule.applicant.lname : " "}}!</v-card-title>
                            <v-card-text>
                                {{ message.wait }}
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
                <v-skeleton-loader v-else type="card-avatar, article, actions"></v-skeleton-loader>
            </v-card>
        </div>
    </v-dialog>
</template>

<script>
    import ContactInformation from "./pre-employment-form/ContactInformation.vue";
    import PersonalInformation from "./pre-employment-form/PersonalInformation.vue";
    import Skills_Educational_Attainment from "./pre-employment-form/Skills_Educational_Attainment.vue";
    import WorkExperienceTrainings from "./pre-employment-form/WorkExperienceTrainings.vue";
    import BackgroundCheckNotice from "./pre-employment-form/BackgroundCheckNotice.vue";
    import jsPDF from "jspdf";
    import "jspdf-autotable";
    export default {
        props: ["positionChoice", "data", "firstChoice","successMessage"],
        name: "pre-employment",
        components: {
            ContactInformation,
            PersonalInformation,
            Skills_Educational_Attainment,
            WorkExperienceTrainings,
            BackgroundCheckNotice,
        },

        data() {
            return {
                modal_preemployment: true,
                detailsCheck: [],
                loading: false,

                contactInformation: null,
                personalInformation: null,
                skillsEducationalAttainment: null,
                workExperienceTraining: null,
                referral: null,
                backgroundCheckNotice: null,

                tabs: [
                    {
                        link: "#contact_information",
                        text: "Contact Information",
                        valid: true,
                    },
                    {
                        link: "#personal_information",
                        text: "Personal Information",
                        valid: true,
                    },
                    {
                        link: "#skills_Educational_attainment",
                        text: "Skills and Educational Attainment",
                        valid: true,
                    },
                    {
                        link: "#Work_Experience_and_Trainings",
                        text: "Work Experience and Trainings",
                        valid: true,
                    },
                    {
                        link: "#Background_Check_Notice",
                        text: "Background Check Notice ",
                        valid: true,
                    },
                ],
                tab: "",
                agree: false,
                agree1: false,
                message: {
                    wait: "Your submitted Personal Data Sheet is currently under review. Thank you for patiently waiting.",
                },
                schedule: null,
                loading: false,

                workexpeTrainingPDF: [],
                workexpeRows: [],
                positionchoice: this.positionChoice,
                firstchoice: this.firstChoice,
                register: this.data.register,
            };
        },
        async mounted() {
            await this.fetchingLogoPath();
        },
        async created() {
            await this.fetchingLogoPath();
        },
        watch: {
           successMessage() {
                if(this.successMessage == true){
                    this.download_PEF()
                }
           }

        },
        methods: {
            async fetchingLogoPath() {
                await this.$axios.get("fetch_logo_path").then((res) => {
                    this.loading = true;
                    this.get_path = res.data.data;
                    this.logo_url = this.get_path ?? require("~/assets/images/logo/shortcut-icon.png");
                    this.loading = false;
                });
            },
            close_modal() {
                this.$emit("close_modal", { update: false });
            },

            changeTab(tab) {
                this.tab = tab;
                window.scrollTo(0, 0);
            },

            getContactInformation(value) {
                this.contactInformation = value;
            },
            getPersonalInformation(value) {
                this.personalInformation = value;
            },
            getSkillsEducationalAttainment(value) {
                this.skillsEducationalAttainment = value;
            },
            getWorkExperienceTraining(value) {
                this.workExperienceTraining = value;
            },
            getreferral(value) {
                this.referral = value;
            },
            getBackroundCheckNotice(value) {
                this.backgroundCheckNotice = value;
            },

            async download_PEF() {
                this.loading = true;
                let rows = [];

                this.workexpeTrainingPDF = this.workExperienceTraining;

                this.workexpeTrainingPDF.forEach((element) => {
                    var excluesive_date = element.workexpetraining.info[0].value ?? "";
                    var position = element.workexpetraining.info[1].value ?? "";
                    var status = element.workexpetraining.info[2].value ?? "";
                    var companyName = element.workexpetraining.info[3].value ?? "";
                    var reason = element.workexpetraining.info[4].value ?? "";
                    var temp = [excluesive_date, position, status, companyName, reason];

                    rows.push(temp);
                });

                var firstChoice = this.firstchoice.firstChoice ? this.firstchoice.firstChoice : "N/A";

                if (this.positionChoice != null) {
                    var secondChoice = this.positionChoice.secondChoice.position_title ? this.positionChoice.secondChoice.position_title : "N/A";
                    if (this.positionChoice.thirdChoice != "N/A") {
                        var thirdChoice = this.positionChoice.thirdChoice.position_title ? this.positionChoice.thirdChoice.position_title : "N/A";
                    } else {
                        var thirdChoice = this.positionChoice.thirdChoice;
                    }
                } else {
                    secondChoice = "N/A";
                }

                // I contact
                var date_of_application = this.contactInformation.contactInformationForm.info[0].value;
                var mobile_number = this.contactInformation.contactInformationForm.info[1].value;
                var residence_landline_phone_no = this.contactInformation.contactInformationForm.info[2].value;
                var business_phone_no = this.contactInformation.contactInformationForm.info[3].value;
                var email_address = this.contactInformation.contactInformationForm.info[4].value;
                var other_contact_phone_no = this.contactInformation.contactInformationForm.info[5].value;

                // Personal info
                var surname = this.personalInformation.personalInformationForm.info[0].value;
                var given_name = this.personalInformation.personalInformationForm.info[1].value;
                var middle_name = this.personalInformation.personalInformationForm.info[2].value;
                var Nickname_Alias = this.personalInformation.personalInformationForm.info[3].value;
                var city_address = this.personalInformation.personalInformationForm.info[4].value;
                var permanent_address = this.personalInformation.personalInformationForm.info[5].value;
                var date_of_birth = this.personalInformation.personalInformationForm.info[6].value;
                var place_of_birth = this.personalInformation.personalInformationForm.info[7].value;
                var religion = this.personalInformation.personalInformationForm.info[8].value;

                var civil_status = this.personalInformation.personalInformationForm.info[9].value;
                var sex = this.personalInformation.personalInformationForm.info[10].value;
                var height = this.personalInformation.personalInformationForm.info[11].value;
                var weight = this.personalInformation.personalInformationForm.info[12].value;
                var blood_type = this.personalInformation.personalInformationForm.info[13].value;
                var distinguishing_marks = this.personalInformation.personalInformationForm.info[14].value;
                var physical_defects = this.personalInformation.personalInformationForm.info[15].value;
                var father_name = this.personalInformation.personalInformationForm.info[16].value;
                var father_occupation = this.personalInformation.personalInformationForm.info[17].value;
                var mother_name = this.personalInformation.personalInformationForm.info[18].value;
                var mother_occupation = this.personalInformation.personalInformationForm.info[19].value;
                var no_siblings = this.personalInformation.personalInformationForm.info[20].value;
                var ordinal_position = this.personalInformation.personalInformationForm.info[21].value;
                var spouse_name = this.personalInformation.personalInformationForm.info[22].value;
                var no_children = this.personalInformation.personalInformationForm.info[23].value;
                var spouse_occupation = this.personalInformation.personalInformationForm.info[24].value;
                var emergency = this.personalInformation.personalInformationForm.info[25].value;
                var relationship = this.personalInformation.personalInformationForm.info[26].value;
                var address_contact = this.personalInformation.personalInformationForm.info[27].value;

                // skills Educational Attainment
                var Skills_and_Other_Abilities_one = this.skillsEducationalAttainment.Personal_skills_Other_Abilities_Form.info[0].value ? this.skillsEducationalAttainment.Personal_skills_Other_Abilities_Form.info[0].value : "";
                var Skills_and_Other_Abilities_two = this.skillsEducationalAttainment.Personal_skills_Other_Abilities_Form.info[1].value ? this.skillsEducationalAttainment.Personal_skills_Other_Abilities_Form.info[1].value : "";
                var Skills_and_Other_Abilities_three = this.skillsEducationalAttainment.Personal_skills_Other_Abilities_Form.info[2].value ? this.skillsEducationalAttainment.Personal_skills_Other_Abilities_Form.info[2].value : "";

                var name_of_exam = this.skillsEducationalAttainment.Government_Examination.info[0].value ? this.skillsEducationalAttainment.Government_Examination.info[0].value : "";
                var date_place = this.skillsEducationalAttainment.Government_Examination.info[1].value ? this.skillsEducationalAttainment.Government_Examination.info[1].value : "";
                var grade_rating = this.skillsEducationalAttainment.Government_Examination.info[2].value ? this.skillsEducationalAttainment.Government_Examination.info[2].value : "";

                var degree_course_title = this.skillsEducationalAttainment.Highest_Educational_Attainment.info[0].value ? this.skillsEducationalAttainment.Highest_Educational_Attainment.info[0].value : "";

                var inclusive_dates_of_attendance = this.skillsEducationalAttainment.Highest_Educational_Attainment.info[1].value + " - " + this.skillsEducationalAttainment.Highest_Educational_Attainment.info[2].value;
                var school_university = this.skillsEducationalAttainment.Highest_Educational_Attainment.info[3].value ? this.skillsEducationalAttainment.Highest_Educational_Attainment.info[3].value : "";

                var fullname_backgroundCheckNotice = this.backgroundCheckNotice.fullname_positionform.info[0].value;
                var position_backgroundCheckNotice = this.backgroundCheckNotice.fullname_positionform.info[1].value;

                var firstReference_name = this.backgroundCheckNotice.references.info[0].value ? this.backgroundCheckNotice.references.info[0].value : "";
                var first_email_contact =
                    this.backgroundCheckNotice.references.info[1].value + " " + this.backgroundCheckNotice.references.info[2].value
                        ? this.backgroundCheckNotice.references.info[1].value + " " + this.backgroundCheckNotice.references.info[2].value
                        : "";

                var secondReference_name = this.backgroundCheckNotice.references.info[3].value ? this.backgroundCheckNotice.references.info[3].value : "";
                var second_email_contact =
                    this.backgroundCheckNotice.references.info[4].value + " " + this.backgroundCheckNotice.references.info[5].value
                        ? this.backgroundCheckNotice.references.info[4].value + " " + this.backgroundCheckNotice.references.info[5].value
                        : "";

                var thirdReference_name = this.backgroundCheckNotice.references.info[6].value ? this.backgroundCheckNotice.references.info[6].value : "";
                var third_email_contact =
                    this.backgroundCheckNotice.references.info[7].value + " " + this.backgroundCheckNotice.references.info[8].value
                        ? this.backgroundCheckNotice.references.info[7].value + " " + this.backgroundCheckNotice.references.info[8].value
                        : "";

                var referralName = this.referral[0].referral.info[0].value ?? "";
                var head = [["EXCLUSIVE DATES", "POSITION", "STATUS", "NAME OF COMPANY / AGENT", "Reason for Leaving"]];
                var doc = new jsPDF({ orientation: "p", format: "a4" });
                let footer = new Image();
                footer.src = this.logo_url;

                doc.addImage(footer, "PNG", 25, 3, 20, 20);

                doc.setFont("Arial", "bold").setFontSize(11).text("NATIONAL KIDNEY AND TRANSPLANT INSTITUTE", 102, 10, null, null, "center");
                doc.setFontSize(12).text("Human Resource Management Division", 102, 15, null, null, "center");
                doc.setFontSize(12).text("Recruitment and Hiring Section", 102, 20, null, null, "center");

                //PRE EMPLOYMENT APPLICATION FORM

                doc.setFont("Arial", "bold").setFontSize(9).text("PRE EMPLOYMENT APPLICATION FORM", 5, 35);

                doc.setFont("Arial", "bold").setFontSize(10).text("date of Application", 102, 40);
                doc.setFont("Arial", "regular")
                    .setFontSize(10)
                    .text("" + date_of_application, 136, 40);
                doc.line(132, 41, 190, 41);

                doc.setFont("Arial", "regular").setFontSize(14).text("2x2", 180, 20);
                doc.setFont("Arial", "regular").setFontSize(7).text("Put Picture", 178, 23);

                doc.setFont("Arial", "regular").setFontSize(10).text("Position Applied for", 5, 45);
                doc.setFont("Arial", "bold").setFontSize(10).text("1st Choice", 8, 50);
                doc.setFont("Arial", "regular")
                    .setFontSize(10)
                    .text("" + firstChoice, 26, 50);
                doc.line(25, 51, 70, 51);
                doc.setFont("Arial", "bold").setFontSize(10).text("2nd Choice", 8, 55);
                doc.setFont("Arial", "regular")
                    .setFontSize(10)
                    .text("" + secondChoice, 26, 55);
                doc.line(25, 56, 70, 56);
                doc.setFont("Arial", "bold").setFontSize(10).text("3rd Choice", 8, 60);
                doc.setFont("Arial", "regular")
                    .setFontSize(10)
                    .text("" + thirdChoice, 26, 60);
                doc.line(25, 61, 70, 61);

                doc.setFont("Arial", "bold").setFontSize(10).text("MOBILE Phone No", 102, 50);
                doc.setFont("Arial", "regular")
                    .setFontSize(10)
                    .text("" + mobile_number, 135, 50);
                doc.line(132, 51, 190, 51);
                doc.setFont("Arial", "bold").setFontSize(10).text("Residence Landine Phone No.", 102, 55);
                doc.setFont("Arial", "regular")
                    .setFontSize(10)
                    .text("" + residence_landline_phone_no, 149, 55);
                doc.line(146, 56, 190, 56);
                doc.setFont("Arial", "bold").setFontSize(10).text("Business Phone No.", 102, 60);
                doc.setFont("Arial", "regular")
                    .setFontSize(10)
                    .text("" + business_phone_no, 135, 60);
                doc.line(132, 61, 190, 61);
                doc.setFont("Arial", "bold").setFontSize(10).text("E-MAIL Address.", 102, 65);
                doc.setFont("Arial", "regular")
                    .setFontSize(10)
                    .text("" + email_address, 135, 65);
                doc.line(132, 66, 190, 66);
                doc.setFont("Arial", "bold").setFontSize(10).text("Other Contact Phone No.", 102, 70);
                doc.setFont("Arial", "regular")
                    .setFontSize(10)
                    .text("" + other_contact_phone_no, 143, 70);
                doc.line(141, 71, 190, 71);

                // solid vertical line
                doc.setLineWidth(1.0);
                doc.line(5, 76, 210, 76);

                doc.setLineWidth(0);
                doc.setFont("Arial", "regular").setFontSize(10).text("" + surname, 15, 84);
                doc.line(10, 85, 40, 85);
                doc.setFont("Arial", "bold").setFontSize(8).text("SURNAME", 15, 89);
                doc.setFont("Arial", "regular").setFontSize(10).text("" + given_name, 53, 84);
                doc.line(50, 85, 80, 85);
                doc.setFont("Arial", "bold").setFontSize(8).text("GiVEN NAME", 53, 89);
                doc.setFont("Arial", "regular").setFontSize(10).text("" + middle_name, 92, 84);
                doc.line(90, 85, 120, 85);
                doc.setFont("Arial", "bold").setFontSize(8).text("MIDDLE NAME", 92, 89);
                doc.setFont("Arial", "regular").setFontSize(10).text("" + Nickname_Alias, 129, 84);
                doc.line(130, 85, 160, 85);
                doc.setFont("Arial", "bold").setFontSize(8).text("NICKNAME ALIAS", 129, 89);

                // solid horizontal line
                doc.setLineWidth(1.0);
                doc.line(173, 76, 173, 267);
                doc.setFont("Arial", "bold").setFontSize(8).text("PLS DO NOT WRITE ON", 176, 81);
                doc.setFont("Arial", "bold").setFontSize(8).text("THIS PORTION", 176, 86);
                doc.setFont("Arial", "italic").setFontSize(8).text("FOR INTERVIEWER ONLY", 176, 94);

                doc.setLineWidth(0);
                doc.setFont("Arial", "bold").setFontSize(10).text("CITY Address", 5, 96);
                doc.setFont("Arial", "regular").setFontSize(10).text("" + city_address, 31, 96);
                doc.line(30, 97, 160, 97);

                doc.setFont("Arial", "bold").setFontSize(10).text("PREMANENT ADDRESS", 5, 102);
                doc.setFont("Arial", "regular").setFontSize(10).text("" + permanent_address, 49, 102);
                doc.line(48, 103, 160, 103);

                doc.setFont("Arial", "bold").setFontSize(10).text("Date of Birth", 5, 109);
                doc.setFont("Arial", "regular").setFontSize(10).text("" + date_of_birth, 31, 109);
                doc.line(30, 110, 60, 110);

                doc.setFont("Arial", "bold").setFontSize(10).text("Date of Place", 65, 109);
                doc.setFont("Arial", "regular").setFontSize(10).text("" + place_of_birth, 86, 109);
                doc.line(87, 110, 120, 110);

                doc.setFont("Arial", "bold").setFontSize(10).text("Religion", 125, 109);
                doc.setFont("Arial", "regular").setFontSize(10).text("" + religion, 141, 109);
                doc.line(140, 110, 160, 110);

                doc.setFont("Arial", "bold").setFontSize(10).text("Civil Status", 5, 115);
                doc.setFont("Arial", "regular").setFontSize(10).text("" + civil_status, 31, 115);
                doc.line(30, 116, 50, 116);

                doc.setFont("Arial", "bold").setFontSize(10).text("Sex", 52, 115);
                doc.setFont("Arial", "regular").setFontSize(10).text("" + sex, 61, 115);
                doc.line(60, 116, 74, 116);

                doc.setFont("Arial", "bold").setFontSize(10).text("Height", 76, 115);
                doc.setFont("Arial", "regular").setFontSize(10) .text("" + height, 89, 115);
                doc.line(88, 116, 102, 116);

                doc.setFont("Arial", "bold").setFontSize(10).text("Weight", 104, 115);
                doc.setFont("Arial", "regular").setFontSize(10).text("" + weight, 117, 115);
                doc.line(116, 116, 130, 116);

                doc.setFont("Arial", "bold").setFontSize(10).text("Blood Type", 132, 115);
                doc.setFont("Arial", "regular").setFontSize(10).text("" + blood_type, 150, 115);
                doc.line(150, 116, 160, 116);

                doc.setFont("Arial", "bold").setFontSize(10).text("DISTINGUISHING MARK/s", 5, 121);
                doc.setFont("Arial", "regular").setFontSize(10).text("" + distinguishing_marks, 53, 121);
                doc.line(52, 122, 160, 122);

                doc.setFont("Arial", "bold").setFontSize(10).text("PHYSICAL DEFECTS", 5, 127);
                doc.setFont("Arial", "regular").setFontSize(10).text("" + physical_defects, 53, 127);
                doc.line(52, 128, 160, 128);

                //father
                doc.setFont("Arial", "bold").setFontSize(10).text("Father's Name", 5, 133);
                doc.setFont("Arial", "regular").setFontSize(10).text("" + father_name, 31, 133);
                doc.line(30, 134, 80, 134);
                doc.setFont("Arial", "bold").setFontSize(10).text("Occupation", 5, 139);
                doc.setFont("Arial", "regular").setFontSize(10).text("" + father_occupation, 31, 139);
                doc.line(30, 140, 80, 140);

                //mother
                doc.setFont("Arial", "bold").setFontSize(10).text("Mother's Name", 82, 133);
                doc.setFont("Arial", "regular").setFontSize(10).text("" + mother_name, 108, 133);
                doc.line(107, 134, 160, 134);
                doc.setFont("Arial", "bold").setFontSize(10).text("Occupation", 82, 139);
                doc.setFont("Arial", "regular").setFontSize(10).text("" + mother_occupation, 108, 139);
                doc.line(107, 140, 160, 140);

                doc.setFont("Arial", "bold").setFontSize(10).text("No. of Siblings in the Family", 5, 145);
                doc.setFont("Arial", "regular").setFontSize(10).text("" + no_siblings, 55, 145);
                doc.line(50, 146, 65, 146);
                doc.setFont("Arial", "bold").setFontSize(10).text("Ordinal Position in the Family", 69, 145);
                doc.setFont("Arial", "regular").setFontSize(10).text("" + ordinal_position, 126, 145);
                doc.line(118, 146, 160, 146);

                doc.setFont("Arial", "bold").setFontSize(10).text("Spouse's Name", 5, 151);
                doc.setFont("Arial", "regular").setFontSize(10).text("" + spouse_name, 31, 151);
                doc.line(30, 152, 107, 152);
                doc.setFont("Arial", "bold").setFontSize(10).text("No. of Children", 110, 151);
                doc.setFont("Arial", "regular").setFontSize(10).text("" + no_children, 142, 151);
                doc.line(136, 152, 160, 152);
                doc.setFont("Arial", "bold").setFontSize(10).text("Occupation", 5, 157);
                doc.setFont("Arial", "regular").setFontSize(10).text("" + spouse_occupation, 31, 157);
                doc.line(30, 158, 80, 158);

                //emergency contact
                doc.setFont("Arial", "bold").setFontSize(10).text("In case of emergency who will be notified", 5, 163);
                doc.setFont("Arial", "regular").setFontSize(10).text("" + emergency, 71, 163);
                doc.line(70, 164, 112, 164);
                doc.setFont("Arial", "bold").setFontSize(10).text("Relationship", 114, 163);
                doc.setFont("Arial", "regular").setFontSize(10).text("" + relationship, 136, 163);
                doc.line(135, 164, 160, 164);
                doc.setFont("Arial", "bold").setFontSize(10).text("Address and Contact Phone No.", 5, 168);
                doc.setFont("Arial", "regular").setFontSize(10).text("" + address_contact, 57, 168);
                doc.line(56, 169, 160, 169);

                //PROFESSIONAL SKILL AND OTHER ABILITIES
                doc.setFont("Arial", "bold").setFontSize(8).text("PROFESSIONAL SKILL AND OTHER ABILITIES", 5, 175);
                doc.setFont("Arial", "regular").setFontSize(8).text("" + Skills_and_Other_Abilities_one, 5, 181);
                doc.line(5, 182, 70, 182);
                doc.setFont("Arial", "regular").setFontSize(8).text("" + Skills_and_Other_Abilities_two, 5, 186);
                doc.line(5, 187, 70, 187);
                doc.setFont("Arial", "regular").setFontSize(8).text("" + Skills_and_Other_Abilities_three, 5, 191);
                doc.line(5, 192, 70, 192);

                //GOVERNMENT EXAMINATION/S TAKEN & PASSED
                doc.setFont("Arial", "bold").setFontSize(8).text("GOVERNMENT EXAMINATION/S TAKEN & PASSED", 90, 175);
                doc.setFont("Arial", "bold").setFontSize(8).text("Name of Exam", 90, 181);
                doc.setFont("Arial", "regular").setFontSize(8).text("" + name_of_exam, 111, 181);
                doc.line(110, 182, 160, 182);
                doc.setFont("Arial", "bold").setFontSize(8).text("Date & Place", 90, 186);
                doc.setFont("Arial", "regular").setFontSize(8).text("" + date_place, 111, 186);
                doc.line(110, 187, 160, 187);
                doc.setFont("Arial", "bold").setFontSize(8).text("Grade / Rating", 90, 191);
                doc.setFont("Arial", "regular").setFontSize(8).text("" + grade_rating, 111, 191);
                doc.line(110, 192, 160, 192);

                //Highest Education Attainment
                doc.setFont("Arial", "bold").setFontSize(10).text("Highest Education Attainment", 5, 198);
                var course = doc.splitTextToSize(" " + degree_course_title, 70);
                doc.setFont("Arial", "regular").setFontSize(8).text(7, 202, course);
                doc.line(5, 210, 55, 210);
                doc.setFont("Arial", "bold").setFontSize(8).text("Degree / Course Title", 15, 213);

                doc.setFont("Arial", "regular").setFontSize(8).text("" + inclusive_dates_of_attendance, 62, 209);
                doc.line(60, 210, 110, 210);
                doc.setFont("Arial", "bold").setFontSize(8).text("Inclusive Dates of Attendance", 67, 213);

                doc.setFont("Arial", "regular").setFontSize(8).text("" + school_university, 117, 209);
                doc.line(115, 210, 160, 210);
                doc.setFont("Arial", "bold").setFontSize(8).text("School / University", 125, 213);

                doc.setFont("Arial", "bold").setFontSize(8).text("Work Experience/s (TRAINING / OFFICE PRACTICE MAY BE CONSIDERED)", 5, 219);

                doc.setFont("Arial", "bold").setFontSize(8).text("ACTION TAKEN:", 176, 217);
                doc.setFont("Arial", "regular").setFontSize(8).text("-Active File", 178, 222);
                doc.setFont("Arial", "regular").setFontSize(8).text("-For EXAM", 178, 227);
                doc.setFont("Arial", "regular").setFontSize(8).text("-For Further", 178, 232);
                doc.setFont("Arial", "regular").setFontSize(8).text("Screening", 179, 237);
                doc.setFont("Arial", "regular").setFontSize(8).text("-2ND Priority", 178, 242);
                doc.setFont("Arial", "regular").setFontSize(8).text("(On File)", 179, 247);
                doc.setFont("Arial", "regular").setFontSize(8).text("-REJECTED", 178, 252);
                doc.setFont("Arial", "regular").setFontSize(8).text("-Other:__________", 178, 257);

                doc.setFont("Arial", "bold").setFontSize(8).text("Person/s who referred you to NKTI", 5, 264);
                doc.setFont("Arial", "regular").setFontSize(8).text("" + referralName, 51, 264);
                doc.line(50, 265, 160, 265);

                // solid vertical line
                doc.setLineWidth(1.0);
                doc.line(5, 267, 210, 267);
                doc.setLineWidth(0);
                function checkbox(x, y, length, width) {
                    doc.rect(x, y, length, width);
                    doc.line(x, y, x + length, y + width);
                    doc.line(x, y + length, x + width, y);
                }

                doc.setFont("Arial", "regular").setFontSize(8).text("I declare under the penalties of perjury that this form has been accoumphished in good faith, verified by me and to the best of my knowledge and belief, is a true,", 12, 272);
                doc.setFont("Arial", "regular").setFontSize(8).text("correct and complete statement pursuant to the provisions of pertinent laws, rules and regulations of the Republic of the Philippines.", 8, 275);

                if (this.agree == true) {
                    checkbox(8, 269, 3, 3);
                } else {
                    doc.rect(8, 269, 3, 3);
                }

                doc.setFont("Arial", "regular").setFontSize(8).text("I agree and authorize the NATIONAL KIDNEY AND TRANSPLANT INSTITUTE to obtain the background infomation for the employment purpose. For all future time,", 12, 279);
                doc.setFont("Arial", "regular").setFontSize(8).text("I waive and release from any legal obligation, any person or organization for any result of providing, obtaining or acting upon on the result of the employment verification.", 8, 283);
                doc.setFont("Arial", "regular").setFontSize(8).text("I understand that such information is sought with confidentiality, and I will not request for the copy of that information", 8, 286);

                if (this.agree1 == true) {
                    checkbox(8, 277, 3, 3);
                } else {
                    doc.rect(8, 277, 3, 3);
                }

                doc.line(5, 292, 40, 292);
                doc.setFont("Arial", "regular").setFontSize(8).text("INTERVIEWER", 12, 295);

                doc.line(60, 292, 95, 292);
                doc.setFont("Arial", "regular").setFontSize(8).text("Date of Interview", 67, 295);

                doc.line(115, 292, 155, 292);
                doc.setFont("Arial", "regular").setFontSize(8).text("Applicant`s Signature", 122, 295);

                doc.setFont("Arial", "bold").setFontSize(8).text("PRS-QPP 010a", 165, 295);

                doc.autoTable({
                    head: head,
                    body: rows,
                    startY: 222,
                    theme: "grid",
                    margin: { top: 30, bottom: 35, right: 45, left: 5 },
                    styles: {
                        halign: "center",
                    },
                    headStyles: {
                        fontSize: 6,
                        lineWidth: 0.1,
                        fillColor: [255, 255, 255],
                        lineColor: [0, 0, 0],
                        textColor: [0, 0, 0],
                    },
                    bodyStyles: {
                        fontSize: 7,
                        textColor: [0, 0, 0],
                        lineColor: [0, 0, 0],
                    },

                    didDrawPage: function (rows) {},
                });

                //page 2
                doc.addPage();

                doc.setFont("Arial", "bold").setFontSize(14).text("BACKGROUND CHECK NOTICE TO APPLICANT", 102, 23, null, null, "center");
                doc.setFont("Arial", "bold").setFontSize(14).text("AND AUTHORIZATION FOR EMPLOYMENT REFERENCE REPORT", 102, 30, null, null, "center");

                doc.setFont("Arial", "regular").setFontSize(13).text("The purpose of this notice is to inform tou that we will be conducting a pre-employment", 17, 45);
                doc.setFont("Arial", "regular").setFontSize(13).text("background investigation in conjunction with you application for employment with NATIONAL", 17, 52);
                doc.setFont("Arial", "regular").setFontSize(13).text("KIDNEY AND TRANSPLANT INSTITUTE. This background investigation may involve", 17, 59);
                doc.setFont("Arial", "regular").setFontSize(13).text("verifying or reviewing any of the following relevant information.", 17, 66);

                doc.setFont("Arial", "regular")
                    .setFontSize(13)
                    .text("\u2022 " + "Criminal Convictions", 19, 73);
                doc.setFont("Arial", "regular")
                    .setFontSize(13)
                    .text("\u2022 " + "Prior Employment History", 19, 80);
                doc.setFont("Arial", "regular")
                    .setFontSize(13)
                    .text("\u2022 " + "Educational History", 19, 87);

                // solid vertical line
                doc.setLineWidth(1.0);
                doc.line(19, 94, 196, 94);
                doc.setLineWidth(0);

                doc.setFont("Arial", "regular").setFontSize(13).text("I agree and authorize the NATIONAL KIDNEY AND TRANSPLANT INSTITUTE to obtain", 17, 104);
                doc.setFont("Arial", "regular").setFontSize(13).text("the background information for employment purpose", 17, 111);
                doc.setFont("Arial", "regular").setFontSize(13).text("I am", 17, 124);
                doc.setFont("Arial", "regular")
                    .setFontSize(14)
                    .text("" + fullname_backgroundCheckNotice, 28, 124);
                doc.line(26, 125, 120, 125);
                doc.setFont("Arial", "regular").setFontSize(8).text("Full Printed Name", 62, 128);

                doc.setFont("Arial", "regular").setFontSize(13).text("applying for the", 122, 124);

                doc.setFont("Arial", "regular").setFontSize(13).text("position of", 17, 134);
                doc.setFont("Arial", "regular")
                    .setFontSize(14)
                    .text("" + position_backgroundCheckNotice, 40, 134);
                doc.line(38, 135, 100, 135);
                doc.setFont("Arial", "regular").setFontSize(13).text("at the National Kidney and Transplant Institute.", 102, 134);

                doc.setFont("Arial", "regular").setFontSize(13).text("I understand that National Kidney and Transplant Institute will use this information for employment", 17, 145);
                doc.setFont("Arial", "regular").setFontSize(13).text("purposes only and not furnish this information to a third party without my written consent.", 17, 152);

                doc.setFont("Arial", "regular").setFontSize(13).text("For all future time. I waive and release from any legal obligation, any person or organization for", 17, 162);
                doc.setFont("Arial", "regular").setFontSize(13).text("any result of providing, obtaining, or acting upon on the result of the employment verification.", 17, 169);
                doc.setFont("Arial", "regular").setFontSize(13).text("I understand that such information is sought with confidentiality, and I will not request for the copy", 17, 176);
                doc.setFont("Arial", "regular").setFontSize(13).text("of that information.", 17, 183);

                doc.setFont("Arial", "regular").setFontSize(13).text("Signature:", 17, 203);
                doc.line(37, 204, 100, 204);
                doc.setFont("Arial", "regular").setFontSize(13).text("Date:", 26, 213);
                doc.line(37, 214, 85, 214);

                doc.setFont("Arial", "regular").setFontSize(13).text("Write three references with email address and contact number.", 17, 233);
                doc.setFont("Arial", "regular").setFontSize(13).text("Name", 48, 243);

                doc.setFont("Arial", "regular")
                    .setFontSize(13)
                    .text("" + firstReference_name, 19, 253);
                doc.line(17, 254, 90, 254);
                doc.setFont("Arial", "regular")
                    .setFontSize(13)
                    .text("" + secondReference_name, 19, 263);
                doc.line(17, 264, 90, 264);
                doc.setFont("Arial", "regular")
                    .setFontSize(13)
                    .text("" + thirdReference_name, 19, 273);
                doc.line(17, 274, 90, 274);

                doc.setFont("Arial", "regular").setFontSize(13).text("Email and Contact Number", 135, 243);

                doc.setFont("Arial", "regular")
                    .setFontSize(13)
                    .text("" + first_email_contact, 112, 253);
                doc.line(110, 254, 190, 254);
                doc.setFont("Arial", "regular")
                    .setFontSize(13)
                    .text("" + second_email_contact, 112, 263);
                doc.line(110, 264, 190, 264);
                doc.setFont("Arial", "regular")
                    .setFontSize(13)
                    .text("" + third_email_contact, 112, 273);
                doc.line(110, 274, 190, 274);

                this.loading = false;
                doc.autoPrint();
                doc.save("pre_employment_form "+fullname_backgroundCheckNotice+".pdf");
            },

            async submit() {
                if (this.$refs.applicationForm.validate()) {
        
                    const payload = {
                        contactInformation: this.contactInformation,
                        personalInformation: this.personalInformation,
                        skillsEducationalAttainment: this.skillsEducationalAttainment,
                        workExperienceTraining: this.workExperienceTraining,
                        referral: this.referral,
                        backgroundCheckNotice: this.backgroundCheckNotice,
                    };
                    this.$emit("registerFunction", payload);
                
                }
            },

            // checkJSONChildrenEmpty(jsonArr = []) {
            //     let countEmptyValue = 0;
            //     let indexes = [];

            //     jsonArr.forEach((json, index) => {
            //         json.info.forEach((info) => {
            //             if (info.value.trim().length == 0) {
            //                 countEmptyValue++;
            //             }
            //         });
            //         if (countEmptyValue == json.info.length) {
            //             indexes.push(index);
            //         }
            //         countEmptyValue = 0;
            //     });
            //     return this.removeEmptyIndexes(indexes, jsonArr);
            // },
            // checkJSONIfEmpty(jsonArr = []) {
            //     let length = 0;
            //     let countEmptyValue = 0;
            //     let indexes = [];

            //     jsonArr.forEach((value, index) => {
            //         for (const key in value) {
            //             if (key != 'tableName') {
            //                 length += value[key].info.length;
            //                 value[key].info.forEach((info) => {
            //                     if (info.value.trim().length <= 0) {
            //                         countEmptyValue++;
            //                     }
            //                 });
            //             }
            //         }
            //         if (countEmptyValue == length) {
            //             indexes.push(index);
            //         }
            //         countEmptyValue = 0;
            //         length = 0;
            //     });
            //     return this.removeEmptyIndexes(indexes, jsonArr);
            // },
            // removeEmptyIndexes(indexes, jsonArr) {
            //     indexes.forEach((emptyIndex, index) => {
            //         jsonArr.splice(emptyIndex - index, 1);
            //     });

            //     return jsonArr;
            // },

            // async submitFiles(formData) {
            //     await this.$axios
            //         .post('/applicant/create/files', formData)
            //         .then((res) => {
            //             this.$swal.fire({
            //                 icon: 'success',
            //                 title: 'Success',
            //                 text: 'Created successfully!',
            //             });
            //             // this.$refs.applicationForm.reset();
            //         })
            //         .catch(async (err) => {
            //             await this.$toast.open({
            //                 type: 'error',
            //                 message: err.response.data.error,
            //                 duration: 5000,
            //             });
            //         })
            //         .finally(() => {
            //             this.loading = false;
            //         });
            // },
        },
    };
</script>

<style lang="scss"></style>
