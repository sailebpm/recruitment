<template>
    <div>
        <v-card>
        <v-card-text class="pa-5">
            <v-container fluid>
              <v-data-table :loading="loading" :headers="table.headers" :items="applicant_completion_user" :items-per-page="12" disable-sort hide-default-footer>
                <template v-slot:[`item.upload`]="{ item }">
                  <div v-if="item.supplemental_completion.additional_info !== '' && item.status < 1 || item.status == 3" class="d-flex justify-center mt-5">
                    <v-file-input
                      v-model="item.file"
                      :label="'SELECT ' + item.supplemental_completion.title.substring(2)" 
                      prepend-icon="mdi-paperclip"
                      outlined
                      accept=".pdf, .docx"
                      show-size
                      counter
                      dense
                    ></v-file-input>
                  </div>
                  <div v-else-if="item.supplemental_completion.additional_info !== '' && item.attachment != null" class="d-flex justify-center mt-5">
                    <p class="blue--text mdi mdi-download" style="cursor: pointer;" @click="downloadFile(item)">Download</p>
                  </div>
                </template>
                <template v-slot:[`item.status`]="{ item }">
                    <div v-if="item.supplemental_completion.additional_info !== ''">
                        <v-tooltip top v-if="item.status === 3">
                            <template v-slot:activator="{ on }">
                                <v-chip v-on="on" color="red" text-color="white" small>Disapproved</v-chip>
                            </template>
                            <span style="display: inline-block; width: 600px;">{{item.justification}}</span>
                        </v-tooltip>
                        <v-chip v-else-if="item.status === 1" small color="#f78b1e" text-color="white">Pending</v-chip>
                        <v-chip v-else-if="item.status === 2" color="#2f7319" text-color="white" small>Approved</v-chip>
                        <p v-else>N/A</p>
                    </div>
                </template>
              </v-data-table>
            </v-container>
          </v-card-text>
          <v-divider></v-divider>
            <v-card-actions class="justify-end">
                <v-btn class="primary mt-3" :ripple="false" @click="submitFiles()">Submit</v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>
<script>
   export default {
      name: "CompletionAccomplishment",
      props: {
        applicant_completion_user: {
              type: Array,
              default: () => {},
              required: true,
            },   
        },
      data() {
        return {
          loading: false,
          attachment: [],
          rules: {
            file: [(v) => !!v || "File is required"],
          },
          table: {
            page: 1,
            pageCount: 5,
            itemsPerPage: 5,
            headers: [
              {
                class: "black--text",
                align: "center",
                text: "Title",
                value: "supplemental_completion.title",
              },
              {
                class: "black--text",
                align: "center",
                text: "Requirements",
                value: "supplemental_completion.additional_info",
              },
              {
                class: "black--text",
                width: 400,
                align: "center",
                text: "Upload Requirements",
                value: "upload",
              },
              {
                class: "black--text",
                align: "center",
                text: "Status",
                value: "status",
              },
            ],
          },
        };
      },
      methods: {
        downloadFile(item) {    
          const payload = {
            id: item.id,
            applicant_req_id: item.applicant_req_id,
            entityName: "CompletionAccomplishment",
          }
          this.$emit('downloadFile', payload)
        },
       async submitFiles() {
        let formData = new FormData();
          this.applicant_completion_user.forEach((item) => {
            if (item.file) {
              formData.append("attachment[]", item.file);
              formData.append("id[]", item.id);
              formData.append("applicant_req_id[]", item.applicant_req_id);
              formData.append("entityName", "CompletionAccomplishment");
              formData.append("status", 1); //Pending
            }
          });
          this.$emit('submitFiles', formData)
        },
      },
    };
</script>