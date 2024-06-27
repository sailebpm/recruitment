<template>
    <v-container fluid>
        <v-row class="px-3 pt-3">
            <v-col cols="12">
                <p>{{ SkillsEducationalAttainment.title }}</p>
                <v-card class="pa-5">
                    <v-col class="py-0">
                        <p class="ps-3"><b>{{ SkillsEducationalAttainment.title1}}</b></p>
                    </v-col>

                    <v-row class="pt-2">
                        <v-col v-for="(form, formIndex) in SkillsEducationalAttainment.Personal_skills_Other_Abilities_Form.info" :key="formIndex" :cols="form.cols" class="py-0">
                            <v-text-field v-if="!form.skip" v-model.lazy="form.value" :label="form.label" :rules="form.rules" :type="form.type" outlined dense></v-text-field>
                        </v-col>
                    </v-row>

                    <v-col class="py-0">
                        <p class="ps-3"><b>{{ SkillsEducationalAttainment.title2}}</b></p>
                    </v-col>

                    <v-row class="pt-2">
                        <v-col v-for="(form, formIndex) in SkillsEducationalAttainment.Government_Examination.info" :key="formIndex" :cols="form.cols" class="py-0">
                            <v-text-field v-if="!form.skip" v-model.lazy="form.value" :label="form.label" :rules="form.rules" :type="form.type" outlined dense></v-text-field>
                        </v-col>
                    </v-row>

                    <v-col class="py-0">
                        <p class="ps-3"><b>{{ SkillsEducationalAttainment.title3}}</b></p>
                    </v-col>

                    <v-row class="pt-2">
                        <v-col v-for="(form, formIndex) in SkillsEducationalAttainment.Highest_Educational_Attainment.info" :key="formIndex" :cols="form.cols" class="py-0">
                            <div v-if="form.entityName == 'degree_course_title'">
                                <span v-if="form.level == 'college'">
                                    <v-autocomplete v-model="form.value" :rules="form.rules" v-if="!form.skip" class="pt-5 pl-5 shrink" :items="select.college" :label="form.label" :type="form.type" outlined dense></v-autocomplete>
                                </span>
                            </div>

                            <div v-else>
                                <v-text-field v-if="!form.skip" v-model.lazy="form.value" :label="form.label" :rules="form.rules" :type="form.type" outlined dense></v-text-field>
                            </div>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
    export default {
        name: "SkillsEducationalAttainment",
        data() {
            return {
                SkillsEducationalAttainment: {
                    title1: "Personal Skills and Other Abilities",
                    title2: "Government Examination/s Taken & Passed",
                    title3: "Highest Educational Attainment",

                    title: "III. Skills and Educational Attainment ",
                    Personal_skills_Other_Abilities_Form: {
                        tableName: "Skills_Educational_Attainment",
                        info: [
                            {
                                entityName: "Skills_and_Other_Abilities_one",
                                label: "Enter Skills and Other Abilities",
                                value: "",
                                cols: 4,
                                skip: false,
                                rules: [(v) => !!v || "Enter Skills and Other Abilities is a required field"],
                                errorMessage: "",
                                type: "text",
                            },
                            {
                                entityName: "Skills_and_Other_Abilities_two",
                                label: "Enter Skills and Other Abilities",
                                value: "",
                                cols: 4,
                                skip: false,
                                rules: [(v) => !!v || "Enter Skills and Other Abilities is a required field"],
                                errorMessage: "",
                                type: "text",
                            },
                            {
                                entityName: "Skills_and_Other_Abilities_three",
                                label: "Enter Skills and Other Abilities",
                                value: "",
                                cols: 4,
                                skip: false,
                                rules: [(v) => !!v || "Enter Skills and Other Abilities is a required field"],
                                errorMessage: "",
                                type: "text",
                            },
                        ],
                    },

                    Government_Examination: {
                        tableName: "Government_Examination",
                        info: [
                            {
                                entityName: "name_of_exam",
                                label: "Name of Exam",
                                value: "",
                                cols: 4,
                                skip: false,
                                rules: [(v) => !!v || "Name of Exam is a required field"],
                                errorMessage: "",
                                type: "text",
                            },
                            {
                                entityName: "date_place",
                                label: "Date & Place",
                                value: "",
                                cols: 4,
                                skip: false,
                                rules: [(v) => !!v || "Date & Place is a required field"],
                                errorMessage: "",
                                type: "text",
                            },
                            {
                                entityName: "grade_rating",
                                label: "Grade / Rating",
                                value: "",
                                cols: 4,
                                skip: false,
                                rules: [(v) => !!v || "Grade / Rating is a required field"],
                                errorMessage: "",
                                type: "text",
                            },
                        ],
                    },

                    Highest_Educational_Attainment: {
                        tableName: "Highest_Educational_Attainment",
                        info: [
                            {
                                entityName: "degree_course_title",
                                label: "Degree / Course Title",
                                value: "",
                                cols: 3,
                                skip: false,
                                rules: [(v) => !!v || "Degree / Course Title is a required field"],
                                errorMessage: "",
                                type: "text",
                                level: "college",
                            },
                            {
                                entityName: "inclusive_dates_of_attendance_from",
                                label: "Inclusive Dates of Attendance Form",
                                value: "",
                                cols: 3,
                                skip: false,
                                rules: [(v) => !!v || "Inclusive Dates of Attendance is a required field"],
                                errorMessage: "",
                                type: "date",
                            },
                            {
                                entityName: "inclusive_dates_of_attendance_to",
                                label: "Inclusive Dates of Attendance To",
                                value: "",
                                cols: 3,
                                skip: false,
                                rules: [(v) => !!v || "Inclusive Dates of Attendance is a required field"],
                                errorMessage: "",
                                type: "date",
                            },
    
                            {
                                entityName: "school_university",
                                label: "School / University",
                                value: "",
                                cols: 3,
                                skip: false,
                                rules: [(v) => !!v || "School / University is a required field"],
                                errorMessage: "",
                                type: "text",
                            },
                        ],
                    },
                },
                timer: null,

                select: {
                    college: [
                        {
                            text: "Bachelor of Science in Medical Technology (BS Med Tech)",
                            value: "Bachelor of Science in Medical Technology (BS Med Tech)",
                        },
                        {
                            text: "Bachelor of Science in Midwifery (BS Midwifery)",
                            value: "Bachelor of Science in Midwifery (BS Midwifery)",
                        },
                        {
                            text: "Bachelor of Science in Nursing (BSN)",
                            value: "Bachelor of Science in Nursing (BSN)",
                        },
                        {
                            text: "Bachelor of Science in Occupational Therapy (BSOT)",
                            value: "Bachelor of Science in Occupational Therapy (BSOT)",
                        },
                        {
                            text: "Bachelor of Science in Pharmacy (BS Pharmacy)",
                            value: "Bachelor of Science in Pharmacy (BS Pharmacy)",
                        },
                        {
                            text: "Bachelor of Science in Physical Therapy (BSPT)",
                            value: "Bachelor of Science in Physical Therapy (BSPT)",
                        },
                        {
                            text: "Bachelor of Science in Radiologic Technology (BS Rad Tech)",
                            value: "Bachelor of Science in Radiologic Technology (BS Rad Tech)",
                        },
                        {
                            text: "Bachelor of Science in Respiratory Therapy (BSRT)",
                            value: "Bachelor of Science in Respiratory Therapy (BSRT)",
                        },
                        {
                            text: "Bachelor of Science in Speech-Language Pathology",
                            value: "Bachelor of Science in Speech-Language Pathology",
                        },
                        {
                            text: "Bachelor of Science in Sports Science",
                            value: "Bachelor of Science in Sports Science",
                        },
                        {
                            text: "Bachelor of Science in Computer Science (BSCS)",
                            value: "Bachelor of Science in Computer Science (BSCS)",
                        },
                        {
                            text: "Bachelor of Science in Information Technology (BSIT)",
                            value: "Bachelor of Science in Information Technology (BSIT)",
                        },
                        {
                            text: "Bachelor of Science in Information Systems (BSIS)",
                            value: "Bachelor of Science in Information Systems (BSIS)",
                        },
                        {
                            text: "Bachelor of Science in Mathematics (BS Mathematics)",
                            value: "Bachelor of Science in Mathematics (BS Mathematics)",
                        },
                        {
                            text: "Bachelor of Science in Applied Mathematics (BS Applied Math)",
                            value: "Bachelor of Science in Applied Mathematics (BS Applied Math)",
                        },
                        {
                            text: "Bachelor of Science in Statistics (BS Stat)",
                            value: "Bachelor of Science in Statistics (BS Stat)",
                        },
                        {
                            text: "Bachelor of Science in Agriculture",
                            value: "Bachelor of Science in Agriculture",
                        },
                        {
                            text: "Bachelor of Science in Agribusiness (BS Agribusiness)",
                            value: "Bachelor of Science in Agribusiness (BS Agribusiness)",
                        },
                        {
                            text: "Bachelor of Science in Agroforestry (BS Agroforestry)",
                            value: "Bachelor of Science in Agroforestry (BS Agroforestry)",
                        },
                        {
                            text: "Bachelor of Science in Architecture (BS Architecture)",
                            value: "Bachelor of Science in Architecture (BS Architecture)",
                        },
                        {
                            text: "Bachelor in Landscape Architecture (BLA)",
                            value: "Bachelor in Landscape Architecture (BLA)",
                        },
                        {
                            text: "Bachelor of Science in Interior Design (BS Interior Design)",
                            value: "Bachelor of Science in Interior Design (BS Interior Design)",
                        },
                        {
                            text: "Bachelor of Science in Accountancy (BSA)",
                            value: "Bachelor of Science in Accountancy (BSA)",
                        },
                        {
                            text: "Bachelor of Science in Accounting Technology (BSAcT)",
                            value: "Bachelor of Science in Accounting Technology (BSAcT)",
                        },
                        {
                            text: "Bachelor of Science in Business Administration ",
                            value: "Bachelor of Science in Business Administration ",
                        },
                        {
                            text: "Bachelor of Science in Business Administration Major in Business Economics (BSBA)",
                            value: "Bachelor of Science in Business Administration Major in Business Economics (BSBA)",
                        },
                        {
                            text: "Bachelor of Science in Business Administration Major in Financial Management (BSBA major in FM)",
                            value: "Bachelor of Science in Business Administration Major in Financial Management (BSBA major in FM)",
                        },
                        {
                            text: "Bachelor of Science in Business Administration Major in Human Resource Development (BSBA major in HRDM)",
                            value: "Bachelor of Science in Business Administration Major in Human Resource Development (BSBA major in HRDM)",
                        },
                        {
                            text: "Bachelor of Science in Business Administration Major in Marketing Management (BSBA major in MM)",
                            value: "Bachelor of Science in Business Administration Major in Marketing Management (BSBA major in MM)",
                        },
                        {
                            text: "Bachelor of Science in Business Administration Major in Operations Management (BSBA major in OM)",
                            value: "Bachelor of Science in Business Administration Major in Operations Management (BSBA major in OM)",
                        },
                        {
                            text: "Bachelor of Science in Bachelor of Science in Hotel and Restaurant Management (BS HRM)",
                            value: "Bachelor of Science in Bachelor of Science in Hotel and Restaurant Management (BS HRM)",
                        },
                        {
                            text: "Bachelor of Science in Entrepreneurship (BS Entrep)",
                            value: "Bachelor of Science in Entrepreneurship (BS Entrep)",
                        },
                        {
                            text: "Bachelor of Science in Office Administration (BSOA)",
                            value: "Bachelor of Science in Office Administration (BSOA)",
                        },
                        {
                            text: "Bachelor of Science in Real Estate Management (BS REM)",
                            value: "Bachelor of Science in Real Estate Management (BS REM)",
                        },
                        {
                            text: "Bachelor of Science in Tourism Management (BSTM)",
                            value: "Bachelor of Science in Tourism Management (BSTM)",
                        },
                        {
                            text: "Bachelor in Secondary Education (BSED)",
                            value: "Bachelor in Secondary Education (BSED)",
                        },
                        {
                            text: "Bachelor in Elementary Education (BEED)",
                            value: "Bachelor in Elementary Education (BEED)",
                        },
                        {
                            text: "Bachelor in Secondary Education Major in Technology and Livelihood Education (BSED)",
                            value: "Bachelor in Secondary Education Major in Technology and Livelihood Education (BSED)",
                        },
                        {
                            text: "Bachelor in Secondary Education Major in Biological Sciences (BSED)",
                            value: "Bachelor in Secondary Education Major in Biological Sciences (BSED)",
                        },
                        {
                            text: "Bachelor in Secondary Education Major in English (BSED)",
                            value: "Bachelor in Secondary Education Major in English (BSED)",
                        },
                        {
                            text: "Bachelor in Secondary Education Major in Filipino (BSED)",
                            value: "Bachelor in Secondary Education Major in Filipino (BSED)",
                        },
                        {
                            text: "Bachelor in Secondary Education Major in Mathematics (BSED)",
                            value: "Bachelor in Secondary Education Major in Mathematics (BSED)",
                        },
                        {
                            text: "Bachelor in Secondary Education Major in Islamic Studies (BSED)",
                            value: "Bachelor in Secondary Education Major in Islamic Studies (BSED)",
                        },
                        {
                            text: "Bachelor in Secondary Education Major in Music, Arts, Physical and Health Education (BSED)",
                            value: "Bachelor in Secondary Education Major in Music, Arts, Physical and Health Education (BSED)",
                        },
                        {
                            text: "Bachelor in Secondary Education Major in Physical Sciences (BSED)",
                            value: "Bachelor in Secondary Education Major in Physical Sciences (BSED)",
                        },
                        {
                            text: "Bachelor in Secondary Education Major in Social Studies (BSED)",
                            value: "Bachelor in Secondary Education Major in Social Studies (BSED)",
                        },
                        {
                            text: "Bachelor in Secondary Education Major in Values Education (BSED)",
                            value: "Bachelor in Secondary Education Major in Values Education (BSED)",
                        },
                        {
                            text: "Bachelor in Elementary Education Major in Preschool Education (BEED)",
                            value: "Bachelor in Elementary Education Major in Preschool Education (BEED)",
                        },
                        {
                            text: "Bachelor in Elementary Education Major in Special Education (BEED)",
                            value: "Bachelor in Elementary Education Major in Special Education (BEED)",
                        },
                        {
                            text: "Bachelor of Library and Information Science in the Philippines (BLIS)",
                            value: "Bachelor of Library and Information Science in the Philippines (BLIS)",
                        },
                        {
                            text: "Bachelor of Physical Education (BPE)",
                            value: "Bachelor of Physical Education (BPE)",
                        },
                        {
                            text: "Bachelor of Science in Aeronautical Engineering (BS AeroE)",
                            value: "Bachelor of Science in Aeronautical Engineering (BS AeroE)",
                        },
                        {
                            text: "Bachelor of Science in Ceramic Engineering (BSCerE)",
                            value: "Bachelor of Science in Ceramic Engineering (BSCerE)",
                        },
                        {
                            text: "Bachelor of Science in Chemical Engineering (BSChE)",
                            value: "Bachelor of Science in Chemical Engineering (BSChE)",
                        },
                        {
                            text: "Bachelor of Science in Civil Engineering (BSCE)",
                            value: "Bachelor of Science in Civil Engineering (BSCE)",
                        },
                        {
                            text: "Bachelor of Science in Computer Engineering (BSCpE)",
                            value: "Bachelor of Science in Computer Engineering (BSCpE)",
                        },
                        {
                            text: "Bachelor of Science in Electrical Engineering (BSEE)",
                            value: "Bachelor of Science in Electrical Engineering (BSEE)",
                        },
                        {
                            text: "Bachelor of Science in Electronics and Communications Engineering (BSECE)",
                            value: "Bachelor of Science in Electronics and Communications Engineering (BSECE)",
                        },
                        {
                            text: "Bachelor of Science in Geodetic Engineering (BSGE)",
                            value: "Bachelor of Science in Geodetic Engineering (BSGE)",
                        },
                        {
                            text: "Bachelor of Science in Geological Engineering (BSGeoE)",
                            value: "Bachelor of Science in Geological Engineering (BSGeoE)",
                        },
                        {
                            text: "Bachelor of Science in Marine Engineering in (BSMarE)",
                            value: "Bachelor of Science in Marine Engineering in (BSMarE)",
                        },
                        {
                            text: "Bachelor of Science in Materials Engineering (BSMatE)",
                            value: "Bachelor of Science in Materials Engineering (BSMatE)",
                        },
                        {
                            text: "Bachelor of Science in Mechanical Engineering (BSME)",
                            value: "Bachelor of Science in Mechanical Engineering (BSME)",
                        },
                        {
                            text: "Bachelor of Science in Metallurgical Engineering (BSMetE)",
                            value: "Bachelor of Science in Metallurgical Engineering (BSMetE)",
                        },
                        {
                            text: "Bachelor of Science in Mining Engineering (BSEM)",
                            value: "Bachelor of Science in Mining Engineering (BSEM)",
                        },
                        {
                            text: "Bachelor of Science in Petroleum Engineering (BSPetE)",
                            value: "Bachelor of Science in Petroleum Engineering (BSPetE)",
                        },
                        {
                            text: "Bachelor of Science in Sanitary Engineering (BSSE)",
                            value: "Bachelor of Science in Sanitary Engineering (BSSE)",
                        },
                        {
                            text: "Bachelor of Arts in Broadcasting (AB Broadcasting)",
                            value: "Bachelor of Arts in Broadcasting (AB Broadcasting)",
                        },
                        {
                            text: "Bachelor of Arts in Communication (AB Communication)",
                            value: "Bachelor of Arts in Communication (AB Communication)",
                        },
                        {
                            text: "Bachelor of Science in in Development Communication (BS DevComm)",
                            value: "Bachelor of Science in in Development Communication (BS DevComm)",
                        },
                        {
                            text: "Bachelor of Arts in Journalism (AB Journalism)",
                            value: "Bachelor of Arts in Journalism (AB Journalism)",
                        },
                        {
                            text: "Bachelor of Arts in Mass Communication",
                            value: "Bachelor of Arts in Mass Communication",
                        },
                        {
                            text: "Bachelor of Science in Community Development (BS Community Development)",
                            value: "Bachelor of Science in Community Development (BS Community Development)",
                        },
                        {
                            text: "Bachelor of Science in Customs Administration (BSCA)",
                            value: "Bachelor of Science in Customs Administration (BSCA)",
                        },
                        {
                            text: "Bachelor of Science in Foreign Service (BS Foreign Service)",
                            value: "Bachelor of Science in Foreign Service (BS Foreign Service)",
                        },
                        {
                            text: "Bachelor of Science in International Studies(BSIS)",
                            value: "Bachelor of Science in International Studies(BSIS)",
                        },
                        {
                            text: "Bachelor of Public Administration (BPA)",
                            value: "Bachelor of Public Administration (BPA)",
                        },
                        {
                            text: "Bachelor of Science in Public Safety (BSPS)",
                            value: "Bachelor of Science in Public Safety (BSPS)",
                        },
                        {
                            text: "Bachelor of Science in Social Work (BS Social Work)",
                            value: "Bachelor of Science in Social Work (BS Social Work)",
                        },
                        {
                            text: "Bachelor of Science in Marine Transportation (BSMT)",
                            value: "Bachelor of Science in Marine Transportation (BSMT)",
                        },
                        {
                            text: "Bachelor of Science in Food Technology (BS Food Tech)",
                            value: "Bachelor of Science in Food Technology (BS Food Tech)",
                        },
                        {
                            text: "Bachelor of Science in Nutrition and Dietetics (BS Nutrition and Dietetics)",
                            value: "Bachelor of Science in Nutrition and Dietetics (BS Nutrition and Dietetics)",
                        },
                        {
                            text: "N/A",
                            value: "N/A",
                        },
                    ],
                },
            };
        },
        watch: {
            SkillsEducationalAttainment: {
                handler() {
                    clearTimeout(this.timer);

                    this.timer = setTimeout(() => {
                        this.$emit("getSkillsEducationalAttainment", this.SkillsEducationalAttainment);
                    }, 1000);
                },
                deep: true,
                immediate: true,
            },
        },
    };
</script>
<style scoped lang="scss">
    .bg-odd {
        background-color: #e7e7e7 !important;
    }
    .col,
    .v-input {
        padding: 3px !important;
        margin: 0 !important;
    }
    .col[data-v-f9730c32],
    .v-input[data-v-f9730c32] {
        padding: 0 6px 0 6px !important;
        margin: 0 !important;
    }
</style>
