<template>
    <div class="pa-3">
      <v-col class="text-right">
        <v-btn class="primary" :ripple="false" @click="openDialog()">View Requirements</v-btn>
      </v-col>
      <v-dialog v-model="viewRequirements.modal" max-width="1300">
        <v-card>
          <v-toolbar light flat>
            <v-spacer></v-spacer>
            <v-toolbar-title class="text-center">
              <b>Applicant Requirements</b>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon :ripple="false" plain @click="viewRequirements.modal = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          
          <v-divider></v-divider>
          <v-card-text class="pa-5">
            <v-container fluid>
              <v-alert border="left" colored-border type="warning" elevation="2">
                  <p class="font-weight-medium mb-0" style="font-size: 16px">Warning</p>
                  <p class="mb-0" style="font-size: 14px;"><strong>-</strong> You are required to <strong>upload</strong> our <strong>documents</strong> for the HR to verify whether they are accurate or not.</p>
                  <p class="mb-0" style="font-size: 14px"><strong>-</strong> All the requirements should be <strong>printed</strong> and submitted personally to the <strong>HR.</strong></p>
              </v-alert>
              <v-tabs v-model="procedure" hide-slider class="v-tab__outlined mt-5">
                  <v-tab class="text-capitalize" :ripple="false" href="#SupplementaryRequirements">Supplementary Requirements</v-tab>
                  <v-tab class="text-capitalize" :ripple="false" href="#CompletionAccomplishment">Completion/Accomplishment</v-tab>
                  <v-tab class="text-capitalize" :ripple="false" href="#OtherRequirements">Other Requirements</v-tab>
              </v-tabs>

              <v-tabs-items v-model="procedure">
                  <v-tab-item value="SupplementaryRequirements">
                    <SupplementaryRequirements @submitFiles="submitFiles" @downloadFile="downloadFile" :applicant_requirements_user="applicant_requirements_user"/>
                  </v-tab-item>
                  <v-tab-item value="CompletionAccomplishment">
                    <CompletionAccomplishment @submitFiles="submitFiles" @downloadFile="downloadFile" :applicant_completion_user="applicant_completion_user"/>
                  </v-tab-item>
                  <v-tab-item value="OtherRequirements">
                    <OtherRequirements @submitFiles="submitFiles" @downloadFile="downloadFile" :applicant_details_user="applicant_details_user"/>
                  </v-tab-item>
              </v-tabs-items>

            </v-container>
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>
  </template>
  
  <script>
    import CompletionAccomplishment from "./CompletionAccomplishment.vue";
    import SupplementaryRequirements from "./SupplementaryRequirements.vue";
    import OtherRequirements from "./OtherRequirements.vue";
    export default {
      
      name: "UploadRequirements",
      components: {
        CompletionAccomplishment,
        SupplementaryRequirements,
        OtherRequirements
      },
      props: {
        applicant_information: {
            type: Object,
            default: () => {},
            required: true
        },   
      },
      
      data() {
        return {
          loading: false,
          procedure: null,
          viewRequirements: {
            modal: false,
            fullName: null,
            title: null,
            description: null,
          },
          applicant_requirements_user: [],
          applicant_details_user: [],
          applicant_completion_user: []

        };
      },
      methods: {
        async openDialog() {
          this.viewRequirements.modal = true;
          this.requirementItems()
        },
        async requirementItems(){
          this.loading = true;
            await this.$axios.post("/applicant/fetch_applicant_request").then((res) => { 
                this.applicant_requirements_user = res.data.data[0]?.applicant_requirements_user;
                this.applicant_details_user = res.data.data[0]?.applicant_details_user;
                this.applicant_completion_user = res.data.data[0]?.applicant_completion_user;       
            });
          this.loading = false;
        },
        downloadFile(payload, title, fileType) {
            this.$axios({
                url: '/applicant/download-file-attachment',
                method: 'POST',
                responseType: 'blob',
                data: payload
            })
            .then((res) => {
              const url = window.URL.createObjectURL(new Blob([res.data]));
                const link = document.createElement('a');
                let fullName = this.applicant_information.lname.toUpperCase()+"_"+this.applicant_information.fname.toUpperCase()
                link.href = url;
                link.setAttribute('download', fullName+" ("+title+")"+fileType);
                link.click();
            })
            .catch((err) => {
              this.$toast.open({
                message: "There was an error downloading the file",
                type: "error",
                duration: 3000,
                pauseOnHover: true,
              });
            })
        },
        async submitFiles(payload) {
          await this.$axios
            .post("/applicant/upload-file-attachment", payload)
            .then((res) => {
              this.$swal.fire({
                title: "upload successful",
                icon: "success",
              });
            })
            .catch((err) => {
                this.$toast.open({
                    message: 'There was an error',
                    type: 'error',
                    duration: 3000,
                    pauseOnHover: true,
                });
            })
            .finally(() => {
                this.requirementItems()
            });
        },
      },
    };
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