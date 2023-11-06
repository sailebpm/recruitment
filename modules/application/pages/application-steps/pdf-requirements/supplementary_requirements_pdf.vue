<template>
 <v-btn class="text-capitalize mr-2" :loading="loading" :ripple="false" color="primary darken-3" @click="download_SR">Download Supplementary Requirements</v-btn>
</template>

<script>
import jsPDF from "jspdf";
export default {
    props: ['fullName', 'positionName'],

    data() {
        return {
            loading: false,
            requirements_checkbox: [],
            completion_checkbox: [],
            details: [],
        }
    },
    watch:{
        item(){
            this.viewRequirements();
        },

    },
    async mounted() {
            await this.fetchingLogoPath();
            this.viewRequirements();
        },
    async created(){
        await this.fetchingLogoPath();
    },

    methods: {
        async viewRequirements(){

            await this.$axios.post("/applicant/fetch_applicant_request").then((res) => {
                this.loading = true
                var value = res.data.data[0]
                if(value != null){
                var applicant_requirements_user = value.applicant_requirements_user
                var applicant_completion_user = value.applicant_completion_user
                var applicant_details_user = value.applicant_details_user

                applicant_requirements_user.forEach(element => {
                    this.requirements_checkbox.push([element][0].supplemental_requirements.id)
                });

                applicant_completion_user.forEach(element => {
                    this.completion_checkbox.push([element][0].supplemental_completion.id)
                });

                applicant_details_user.forEach(element => {
                    this.details.push([element][0].supplemental_details.id)
                });

                this.loading = false
                 }
            });

        },
        async fetchingLogoPath() {
                await this.$axios.get("fetch_logo_path").then((res) => {
                    this.loading = true;
                    this.get_path = res.data.data;
                    this.logo_url = this.get_path ?? require("~/assets/images/logo/shortcut-icon.png");
                    this.loading = false;
                });
            },


            async download_SR() {
               this.loading = true;
               let footer = new Image();
                footer.src = this.logo_url
            //    var imgData = "https://yt3.googleusercontent.com/ytc/AL5GRJVjOOsRVjYuM4qbNzUDbbrNNxBOcasyoC_1Wrvu=s176-c-k-c0x00ffffff-no-rj"
                var doc = new jsPDF({ orientation: "p", format: "legal"});
                doc.addImage(footer, 'PNG', 25, 3, 20, 20)




                doc.setFont("Arial", "bold").setFontSize(13).text("NATIONAL KIDNEY AND TRANSPLANT INSTITUTE", 102, 10, null, null, "center");
                doc.setFontSize(12).text("East Avenue, Quezion City", 102, 15, null, null, "center");
                const today = new Date().toLocaleDateString("en-us", { year: "numeric", month: "long", day: "numeric" });

                //date
                doc.setFont("Arial", "regular").setFontSize(10).text(today, 6, 33);
                doc.line(3, 35, 37, 35);
                doc.setFont("Arial", "regular").setFontSize(10).text("(date)", 16, 40);

                //MEMORANDUM

                doc.setFont("Arial", "bold").setFontSize(10).text("MEMORANDUM", 16, 50);


                doc.setFont("Arial", "bold").setFontSize(10).text("To:", 38, 55);
                doc.setFont("Arial", "regular")
                doc.line(44, 55, 110, 55);
                doc.line(130, 55, 197, 55);
                doc.setFont("Arial", "bold").setFontSize(12).text(''+this.fullName, 50, 54);
                doc.setFont("Arial", "bold").setFontSize(10).text("( Name of Appointee )", 60, 58);
                doc.setFont("Arial", "bold").setFontSize(12).text(''+this.positionName, 140, 54);
                doc.setFont("Arial", "bold").setFontSize(10).text("( Plantilla Position Title )", 145, 58);

                doc.setFont("Arial", "bold").setFontSize(10).text("From : RECRUITMENT and HIRING SECTION - Human Resource Management Division", 31, 65);
                doc.setFont("Arial", "bold").setFontSize(10).text("Subject : PAPER REQUIREMENTS ON CIVIL SERVICE APPOINTMENT OF PERSONNEL ( Plantilla )", 28, 70);

                var Pursuant = doc.splitTextToSize("Pursuant to Hospital Order No. 26, s. 2004 ( please read copy at the back of this sheet ) and in connection with the recommendation for appointment received by HRM Division  dated ____________________, you are required to submit to this  Office the following documents / records and accomplish the issued blank forms within three to five days ( 3-5 days) from receipt hereof in order to facilitate the processing of your civil service appointment and first salary :", 220);
                doc.setFont("Arial", "regular").setFontSize(10).text(5, 78, Pursuant);

                doc.setLineDash([1, 3, 3, 1], 10);
                doc.line(10, 95, 203, 95);

                doc.setLineDash([0, 0], 0);

                function checkbox(x, y, length, width) {
                    doc.rect(x, y, length, width);
                    doc.line(x, y, x + length, y + width);
                    doc.line(x, y + length, x + width, y);
                    }

                //number1
                doc.setFont("Arial", "bold").setFontSize(10).text("ELIGIBILITY REQUIREMENT APPLICABLE TO THE POSITION :", 8, 100);
                if(this.requirements_checkbox.includes(1)){
                    checkbox(3, 98, 3, 3);
                }else{
                    doc.rect(3, 98, 3, 3);}

                doc.setFont("Arial", "bold").setFontSize(10).text("FOR PROFESSIONAL LICENSED POSITION  :  ", 8, 105);
                doc.setFont("Arial", "regular").setFontSize(10).text("Original and Two (2) Photocopies each of the following :", 8, 109);
                //FOR PROFESSIONAL LICENSED POSITION  :
                doc.setFont("Arial", "bold").setFontSize(10).text("PRC ID, current and valid (Authenticated Original)", 17, 114);
                if(this.details.includes(1)){
                    checkbox(12, 111, 3, 3);
                }else{
                    doc.rect(12, 111, 3, 3);}

                doc.setFont("Arial", "bold").setFontSize(10).text("PRC Board Certificate (Authenticated Original)", 17, 119);
                if(this.details.includes(2)){
                    checkbox(12, 116, 3, 3);
                }else{
                    doc.rect(12, 116, 3, 3);}

                doc.setFont("Arial", "bold").setFontSize(10).text("PRC Board Rating Sheet (Authenticated Original)", 17, 124);
                if(this.details.includes(3)){
                    checkbox(12, 121, 3, 3);
                }else{
                    doc.rect(12, 121, 3, 3);}

               // //FOR ADMINISTRATIVE POSITIONS :
                doc.setFont("Arial", "bold").setFontSize(10).text("FOR ADMINISTRATIVE POSITIONS :  ", 110, 105);
                doc.setFont("Arial", "regular").setFontSize(10).text("Original and Two (2) Photocopies of  either of the following  :", 110, 109);
                doc.setFont("Arial", "bold").setFontSize(10).text("Civil Service Eligibility Report of Rating (Authenticated Original)", 116, 114);
                doc.setFont("Arial", "bold").setFontSize(10).text("( PROFESSIONAL  /  SUB-PROFESSIONAL )", 129, 119);
                if(this.details.includes(4)){
                    checkbox(112, 111, 3, 3);
                }else{
                    doc.rect(112, 111, 3, 3);}

                doc.setFont("Arial", "italic").setFontSize(10).text("FOR OTHER POSITIONS IN THE GOVERNMENT SERVICE  :  Original and Two (2) Photocopies of any of the ff. :", 8, 130);

                //FOR OTHER POSITIONS IN THE GOVERNMENT SERVICE
                doc.setFont("Arial", "bold").setFontSize(10).text("Operator's License from RTC", 17, 135);
                if(this.details.includes(5)){
                    checkbox(12, 132, 3, 3);
                }else{
                    doc.rect(12, 132, 3, 3);}

                doc.setFont("Arial", "bold").setFontSize(10).text("CSC MC No. 10", 85, 135);
                if(this.details.includes(6)){
                    checkbox(81, 132, 3, 3);
                }else{
                    doc.rect(81, 132, 3, 3);}

                doc.setFont("Arial", "bold").setFontSize(10).text("CSC Resolution No. 435", 133, 135);
                if(this.details.includes(7)){
                    checkbox(129, 132, 3, 3);
                }else{
                    doc.rect(129, 132, 3, 3);}

                //number2

                doc.setFont("Arial", "bold").setFontSize(10).text("CERTIFICATES OF RELEVANT TRAININGS : ",8, 142,);
                doc.setFont("Arial", "regular").setFontSize(10).text("Original and photocopies of completed trainings on non-degree courses thru formal",85, 142,);
                var number2 = doc.splitTextToSize("in-service training program; availment of scholarship trainings; study or fellowship grants and other formal training activities accredited by the NKTI and / or the Civil Service Commission.", 150);
                doc.setFont("Arial", "regular").setFontSize(10).text(8, 146, number2);
                if(this.requirements_checkbox.includes(2)){
                    checkbox(3, 139, 3, 3);
                 }else{
                     doc.rect(3, 139, 3, 3);}

                //number3
                doc.setFont("Arial", "bold").setFontSize(10).text("Scholastic DIPLOMA and TRANSCRIPT OF RECORDS : ",8, 155 );
                doc.setFont("Arial", "regular").setFontSize(10).text("Original and a photocopy of each",99, 155 );

                if(this.requirements_checkbox.includes(3)){
                    checkbox(3, 152, 3, 3);
                }else{
                    doc.rect(3, 152, 3, 3);}

                //number4
                doc.setFont("Arial", "bold").setFontSize(10).text("MARRIAGE CONTRACT : ",8, 160 );
                doc.setFont("Arial", "regular").setFontSize(10).text("PSA Original Copy and Two (2) photocopies ( if applicable )",52, 160 );
                if(this.requirements_checkbox.includes(4)){
                    checkbox(3, 157, 3, 3);
                }else{
                    doc.rect(3, 157, 3, 3);}

                //number5
                doc.setFont("Arial", "bold").setFontSize(10).text("BIRTH CERTIFICATE : ",8, 165);
                doc.setFont("Arial", "regular").setFontSize(10).text("PSA Original Copy and Two (2) photocopies ",48, 165 );
                if(this.requirements_checkbox.includes(5)){
                    checkbox(3, 162, 3, 3);
                }else{
                    doc.rect(3, 162, 3, 3);}

                //number6
                doc.setFont("Arial", "bold").setFontSize(10).text("BIRTH CERTIFICATE  of Each Child : ",8, 170 );
                doc.setFont("Arial", "regular").setFontSize(10).text("PSA Original Copy and Two (2) photocopies (if applicable) ",71, 170 );
                if(this.requirements_checkbox.includes(6)){
                    checkbox(3, 167, 3, 3);
                }else{
                    doc.rect(3, 167, 3, 3);}

                //number7
                doc.setFont("Arial", "bold").setFontSize(10).text("(cedula / Community Tax Certificate),",8, 175 );
                doc.setFont("Arial", "regular").setFontSize(10).text("photocopy  FOR THE CURRENT YEAR",67, 175 );
                if(this.requirements_checkbox.includes(7)){
                    checkbox(3, 172, 3, 3);
                }else{
                    doc.rect(3, 172, 3, 3);}

                //number8
                doc.setFont("Arial", "bold").setFontSize(10).text("DRUG TEST CLEARANCE",8, 180 );
                doc.setFont("Arial", "regular").setFontSize(10).text("Certification from accredited service provider",53, 180 );
                if(this.requirements_checkbox.includes(8)){
                    checkbox(3, 177, 3, 3);
                }else{
                    doc.rect(3, 177, 3, 3);}

                //number9
                doc.setFont("Arial", "bold").setFontSize(10).text("PHOTOS : ",8, 185);
                doc.setFont("Arial", "regular").setFontSize(10).text("most recent, two (2) pieces PASSPORT SIZE, RED background  + three (3) pieces 1x1 ID SIZE, WHITE background",27, 185);
                if(this.requirements_checkbox.includes(9)){
                    checkbox(3, 182, 3, 3);
                }else{
                    doc.rect(3, 182, 3, 3);}

                //number10
                doc.setFont("Arial", "bold").setFontSize(10).text("NBI CLEARANCE CERTIFICATE,",8, 190);
                doc.setFont("Arial", "regular").setFontSize(10).text("Original, updated",65, 190);
                if(this.requirements_checkbox.includes(10)){
                    checkbox(3, 187, 3, 3);
                }else{
                    doc.rect(3, 187, 3, 3);}

                // //BLANK FORMS FOR COMPLETION / ACCOMPLISHMENT :
                doc.setFont("Arial", "bold").setFontSize(12).text("BLANK FORMS FOR COMPLETION / ACCOMPLISHMENT :",3, 196);

                //number 1
                doc.setFont("Arial", "bold").setFontSize(10).text("PERSONAL DATA SHEETS (CSC Form 212),",8, 202);
                doc.setFont("Arial", "regular").setFontSize(10).text("TWO sets of four (4) pages, back-to-back print",82, 202);
                if(this.completion_checkbox.includes(1)){
                    checkbox(3, 199, 3, 3);
                }else{
                    doc.rect(3, 199, 3, 3);}

                //number 2
                doc.setFont("Arial", "bold").setFontSize(10).text("SUPPLEMENTAL DATA SHEET,",8, 207);
                doc.setFont("Arial", "regular").setFontSize(10).text("one (1) copy",63, 207);
                if(this.completion_checkbox.includes(2)){
                    checkbox(3, 204, 3, 3);
                }else{
                    doc.rect(3, 204, 3, 3);}

                //number 3
                doc.setFont("Arial", "bold").setFontSize(10).text("MEDICAL CLEARANCE CERTIFICATE (CSC Form No. 211, s.1997),",8, 212);
                doc.setFont("Arial", "regular").setFontSize(10).text("with Instruction Sheet and Memorandum Covering Sheet -",119, 212);
                var number3 = doc.splitTextToSize("to be accomplished at the NKTI and attested by the designated NKTI Employees' Physician.", 150);
                doc.setFont("Arial", "regular").setFontSize(10).text(8, 217, number3);
                if(this.completion_checkbox.includes(3)){
                    checkbox(3, 209, 3, 3);
                }else{
                    doc.rect(3, 209, 3, 3);}

                //number 4
                doc.setFont("Arial", "bold").setFontSize(10).text("POSITION DESCRIPTION FORM (BC-CSC Form No. 1),",8, 222);
                doc.setFont("Arial", "regular").setFontSize(10).text("three (3) copies back-to-back print (computer generated accomplished PDF Forms",98, 222);
                doc.setFont("Arial", "regular").setFontSize(10).text("can be submitted by the concerned Dept. Staff in-Charge, if applicable), duly signed by the appointee and the concerned immediate supervisor.",8, 227);
                if(this.completion_checkbox.includes(4)){
                    checkbox(3, 219, 3, 3);
                }else{
                    doc.rect(3, 219, 3, 3);}

                //number 5
                doc.setFont("Arial", "bold").setFontSize(10).text("SWORN STATEMENT OF ASSETS, LIABILITIES AND NETWORTH",8, 232);
                doc.setFont("Arial", "regular").setFontSize(10).text("(SALN Form 1, 1994 pursuant to R.A. 6713), ",120, 232);
                doc.setFont("Arial", "regular").setFontSize(10).text("four (4) copies, back-to-back print",8, 237);
                if(this.completion_checkbox.includes(5)){
                    checkbox(3, 229, 3, 3);
                }else{
                    doc.rect(3, 229, 3, 3);}

                //number 6
                doc.setFont("Arial", "bold").setFontSize(10).text("OATH OF OFFICE (PANUNUMPA),",8, 242);
                doc.setFont("Arial", "regular").setFontSize(10).text("three (3) copies",68, 242);
                if(this.completion_checkbox.includes(6)){
                    checkbox(3, 239, 3, 3);
                }else{
                    doc.rect(3, 239, 3, 3);}

                //number 7
                doc.setFont("Arial", "bold").setFontSize(10).text("ENROLMENT/ REGISTRATION TO BIOMETRICS",8, 247);
                if(this.completion_checkbox.includes(7)){
                    checkbox(3, 244, 3, 3);
                }else{
                    doc.rect(3, 244, 3, 3);}

                 //number 8
                 doc.setFont("Arial", "bold").setFontSize(10).text("ATM DBP",8, 252);
                 if(this.completion_checkbox.includes(8)){
                    checkbox(3, 249, 3, 3);
                }else{
                    doc.rect(3, 249, 3, 3);}


                 //number 9
                 doc.setFont("Arial", "bold").setFontSize(10).text("Pag-IBIG MEMBER'S DATA FORM,",8, 257);
                 doc.setFont("Arial", "regular").setFontSize(10).text("two (2) copies, back-to-back print",68, 257);
                 if(this.completion_checkbox.includes(9)){
                    checkbox(3, 254, 3, 3);
                }else{
                    doc.rect(3, 254, 3, 3);}

                //number 10
                doc.setFont("Arial", "bold").setFontSize(10).text("GSIS MEMBERSHIP INFORMATION SHEET,",8, 262);
                doc.setFont("Arial", "regular").setFontSize(10).text("one (1) copy",84, 262);
                if(this.completion_checkbox.includes(10)){
                    checkbox(3, 259, 3, 3);
                }else{
                    doc.rect(3, 259, 3, 3);}

                 //number 11
                doc.setFont("Arial", "bold").setFontSize(10).text("PHILHEALTH FORM,",8, 267);
                doc.setFont("Arial", "regular").setFontSize(10).text("two (2) copies",8, 272);


                //philhealth form
                doc.setFont("Arial", "bold").setFontSize(10).text("FORM M1a : ",65, 267);
                doc.setFont("Arial", "regular").setFontSize(10).text("For New Hired Employee, without previous PhilHealth No. ",87, 267);
                if(this.details.includes(8)){
                    checkbox(60, 264, 3, 3);
                }else{
                    doc.rect(60, 264, 3, 3);}
                    //( pls. attach copy of MDR )

                    doc.line(210, 270, 194, 270);
                    doc.line(210, 279, 194, 279)
                    doc.line(194, 270, 194, 279);
                    doc.line(210, 270, 210, 279);

                    doc.setFont("Arial", "bold").setFontSize(6).text("(pls. attch",197, 272);
                    doc.setFont("Arial", "bold").setFontSize(6).text("copy of MDR)",195, 277);


                doc.setFont("Arial", "bold").setFontSize(10).text("FORM M2 : ",65, 272);
                doc.setFont("Arial", "regular").setFontSize(10).text("amendment Form 2007, For Employee with previous / existing PhilHealth No. ",87, 272);
                if(this.details.includes(9)){
                    checkbox(60, 269, 3, 3);
                }else{
                    doc.rect(60, 269, 3, 3);}



                  //number 12
                  doc.setFont("Arial", "bold").setFontSize(10).text("BIR Form  1902, revised 2000:",8, 282);
                  doc.setFont("Arial", "bold").setFontSize(10).text("BIR Form  2305, revised 2008:",8, 287);


                //bir form
                doc.setFont("Arial", "bold").setFontSize(10).text("For New Hired Employee without previous BIR Tax Identification Number or TIN",65, 282);
                if(this.details.includes(10)){
                    checkbox(60, 279, 3, 3);
                }else{
                    doc.rect(60, 279, 3, 3);}

                doc.setFont("Arial", "bold").setFontSize(10).text("For Employee with previous / existing BIR Tax Identification Number or TIN",65, 287);
                if(this.details.includes(11)){
                    checkbox(60, 284, 3, 3);
                }else{
                    doc.rect(60, 284, 3, 3);}


                     //(CHANGE RDO TO RDO 039)

                     doc.line(213, 283, 184, 283);
                     doc.line(213, 290, 184, 290);
                     doc.line(184, 283, 184, 290);
                     doc.line(213, 283, 213, 290);


                doc.setFont("Arial", "bold").setFontSize(6).text("CHANGE RDO TO RDO 039",185, 287);


                doc.setFont("Arial", "bold").setFontSize(8).text("ADDITIONAL REQUIREMENTS FOR TRANSFEREES AND THOSE WITH PREVIOUS GOVERNMENT SERVICE : Please refer at the back portion of this sheet.",3, 297);

                doc.setFont("Arial", "italic").setFontSize(12).text("Acknowledged by:",10, 307);
                doc.line(42, 307, 85, 307);

                doc.setFont("Arial", "italic").setFontSize(12).text("Date:",30, 317);
                doc.line(42, 317, 85, 317);


                doc.setFont("Arial", "italic").setFontSize(12).text("Noted by  (Immediate Supervisor):",90, 307);
                doc.setFont("Arial", "italic").setFontSize(10).text("Printed Name & Signature",100, 312);
                doc.line(150, 307, 200, 307);

                doc.setFont("Arial", "italic").setFontSize(12).text("Date:",138, 317);
                doc.line(150, 317, 200, 317);

                //page 2
                doc.addPage()

                doc.addImage(footer, 'PNG', 25, 3, 20, 20)
                doc.setFont("Arial", "bold").setFontSize(13).text("NATIONAL KIDNEY AND TRANSPLANT INSTITUTE", 102, 10, null, null, "center");
                doc.setFontSize(12).text("East Avenue, Quezion City", 102, 15, null, null, "center");

                doc.setFont("Arial", "regular").setFontSize(12).text("September 16, 2004",  100, 25);

                doc.setFont("Arial", "regular").setFontSize(10).text("HOSPITAL ORDER", 16, 30);
                doc.setFont("Arial", "regular").setFontSize(10).text("NO. 26 ,s. 2004", 16, 35)
                doc.line(22, 36, 27, 36);

                doc.setFont("Arial", "regular").setFontSize(12).text("Subject: Amendment to Hospital Order No, 5 s. 1990", 38, 45)
                doc.setFont("Arial", "regular").setFontSize(12).text("(Re: Completion of Requirements for Appointment/Promotion)", 51, 52)

                doc.setFont("Arial", "regular").setFontSize(12).text("For the Information and guidence of all concerned, all appointments whether original,", 38, 62)
                doc.setFont("Arial", "regular").setFontSize(12).text("transfer, reinstatement or promotion, shall take effect only upon completion of all the necessary", 32, 67)
                doc.setFont("Arial", "regular").setFontSize(12).text("documents that may be required as follows:", 32, 72)

                doc.setFont("Arial", "regular").setFontSize(12).text("1.    Personal Data Sheet (CSC Form 212)", 38, 82)
                doc.setFont("Arial", "regular").setFontSize(12).text("2.    Original and photocopy of Civil Service Eligibility (RA1000)/PRC/NTC", 38, 87)
                doc.setFont("Arial", "regular").setFontSize(12).text("    License/Eligibility (2 copies)", 41, 92)

                doc.setFont("Arial", "regular").setFontSize(12).text("3.    Original and photocopy of certificates of formal training/non-degree courses completed,", 38, 97)
                doc.setFont("Arial", "regular").setFontSize(12).text("    study or scholarship/fellowship grants accredited by NKTI and/or the Civil", 41, 102)
                doc.setFont("Arial", "regular").setFontSize(12).text("    Service Commission", 41, 107)
                doc.setFont("Arial", "regular").setFontSize(12).text("4.    Performance evaluation/ratings for the last two (2) semesters in case of promotion/transfer", 38, 112)
                doc.setFont("Arial", "regular").setFontSize(12).text("5.    Medical Certificate from government physician with documentary stamp (with complete", 38, 117)
                doc.setFont("Arial", "regular").setFontSize(12).text("    results of chest x-ray, laboratory tests, complete check-up result from the employees`", 41, 122)
                doc.setFont("Arial", "regular").setFontSize(12).text("    physician)", 41, 127)
                doc.setFont("Arial", "regular").setFontSize(12).text("6.    Original and photocopy of Diploma and Transcipt of Records", 38, 132)
                doc.setFont("Arial", "regular").setFontSize(12).text("7.    Updated NBI Clearance (Original copy)", 38, 137)
                doc.setFont("Arial", "regular").setFontSize(12).text("8.    Accomplished Position Description Form (PDF)", 38, 142)
                doc.setFont("Arial", "regular").setFontSize(12).text("9.    Certified copy of Birth Certificate", 38, 147)
                doc.setFont("Arial", "regular").setFontSize(12).text("10.  Certified copy of Merriage Contract if married", 38, 152)
                doc.setFont("Arial", "regular").setFontSize(12).text("11.  Accomplished Membership Forms for GSIS, PhilHealth, Pag-Ibig", 38, 157)
                doc.setFont("Arial", "regular").setFontSize(12).text("12.  Statements of Assets and Liabilities ", 38, 162)
                doc.setFont("Arial", "regular").setFontSize(12).text("13.  Oath of Office", 38, 167)
                doc.setFont("Arial", "regular").setFontSize(12).text("14.  Other documents that may be required", 38, 172)

                doc.setFont("Arial", "regular").setFontSize(12).text("Additional requirements for transferees and applicant with previous government service", 38, 182)
                doc.line(38, 183, 187, 183);
                doc.setFont("Arial", "regular").setFontSize(12).text("record/s:", 38, 187)
                doc.line(38, 188, 53, 188);
                doc.setFont("Arial", "regular").setFontSize(12).text("1.   Approved permission to seek transfer/Resignation from former office", 38, 192)
                doc.setFont("Arial", "regular").setFontSize(12).text("2.   Audited statement of Last Salary Received and Previous Deductions from former", 38, 197)
                doc.setFont("Arial", "regular").setFontSize(12).text("            government office/agency employer", 38, 202)
                doc.setFont("Arial", "regular").setFontSize(12).text("3.   Clearance from previous office", 38, 207)
                doc.setFont("Arial", "regular").setFontSize(12).text("4.   Complete Government Servie Record", 38, 212)
                doc.setFont("Arial", "regular").setFontSize(12).text("5.   Transfer of Leave Credits", 38, 217)
                doc.setFont("Arial", "regular").setFontSize(12).text("6.   Certified copy of latest appointment (duly approved by the Civil Service Commission) from", 38, 222)
                doc.setFont("Arial", "regular").setFontSize(12).text("      former government office/agency employer", 38, 227)
                doc.setFont("Arial", "regular").setFontSize(12).text("7.   BIR Form 2316 from previous employer", 38, 232)
                doc.setFont("Arial", "regular").setFontSize(12).text("8.   Previous GSIS Policy Contract", 38, 237)


                doc.setFont("Arial", "regular").setFontSize(12).text("Failure to comply with the necessary documents on time would mean a delay in the", 38, 247)
                doc.setFont("Arial", "regular").setFontSize(12).text("effetive date of appointment.   No candidate for employment, transfer reinstatement or", 32, 252)
                doc.setFont("Arial", "regular").setFontSize(12).text("promotion shall be allowed to commence official duly prior to effective date appointment.", 32, 257)

                doc.setFont("Arial", "regular").setFontSize(12).text("This order takes effect Immediately, ", 38, 267)

                doc.setFont("Arial", "regular").setFontSize(12).text("ALLEN R. JAVIER, M.D., CESO IV ", 120, 287)
                doc.setFont("Arial", "regular").setFontSize(12).text("Officerr In-Charge, ", 136, 292)


                this.loading = false
                doc.autoPrint();
                doc.save(this.fullName+"_"+"Supplementary_requirements.pdf");
                this.$emit("buttonFalse", { update: false });

            },




    }

}
</script>

<style lang="scss">
</style>

