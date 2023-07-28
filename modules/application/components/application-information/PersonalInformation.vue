<template>
  <v-container fluid>
    <v-row class="px-3 pt-3">
      <v-col cols="12">
        <p>{{ personalInformation.title }}</p>
        <v-card class="pa-5">
          <v-row class="pt-2">
            <v-col
              v-for="(form, formIndex) in personalInformation
                .personalInformationForm.info"
              :key="formIndex"
              cols="12"
              md="6"
              class="py-0"
            >
              <v-text-field
                v-if="!form.skip"
                v-model.lazy="form.value"
                :label="form.label"
                :readonly="form.readonly"
                :rules="form.rules"
                :type="form.type"
                outlined
                dense
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="pt-2">
            <v-col
              cols="12"
              md="6"
              class="pa-2"
              v-for="(form, formIndex) in personalInformation.address.info"
              :key="formIndex"
            >
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <p class="ps-1">{{ form.title }}</p>
                  </v-col>
                  <v-col
                    cols="12"
                    v-for="(address, index) in form.addressInfo"
                    :key="index"
                  >
                    <v-text-field
                      v-if="!address.skip"
                      v-model.lazy="address.value"
                      :label="address.label"
                      :rules="address.rules"
                      :type="address.type"
                      outlined
                      dense
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-col>
          </v-row>
          <v-row class="pt-2">
            <v-col
              cols="12"
              md="6"
              class="pa-0"
              v-for="(form, formIndex) in personalInformation.radioChoices.info"
              :key="formIndex"
            >
              <v-container>
                <v-radio-group v-model.lazy="form.value" :rules="form.rules">
                  <template v-slot:label>
                    {{ form.title }}
                  </template>
                  <v-row class="pt-2">
                    <v-col cols="12">
                      <v-container>
                        <v-row>
                          <v-col
                            cols="6"
                            v-for="(choices, index) in form.choices"
                            :key="index"
                          >
                            <v-radio
                              :label="choices.label"
                              :value="choices.value"
                            ></v-radio>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-col>
                  </v-row>
                </v-radio-group>

                <v-text-field
                  v-if="
                    form.value == 'others' || form.value == 'dual_citizenship'
                  "
                  :label="form.otherDetails.label"
                  v-model="form.otherDetails.value"
                  :rules="form.otherDetails.rules"
                  outlined
                  dense
                ></v-text-field>
              </v-container>
            </v-col>
          </v-row>
          <v-row class="pt-2">
            <v-col
              v-for="(form, formIndex) in personalInformation.otherInformation
                .info"
              :key="formIndex"
              cols="12"
              md="6"
              class="py-0"
            >
              <v-text-field
                v-if="!form.skip"
                v-model.lazy="form.value"
                :label="form.label"
                :rules="form.rules"
                :type="form.type"
                outlined
                dense
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "PersonalInformation",
  props: ["title"],
  data() {
    return {
      personalInformation: {
        title: "I. Personal Information",
        personalInformationForm: {
          tableName: "personal_information",
          info: [
            {
              entityName: "employee_no",
              label: "Agency Employee No.",
              value: "",
              cols: 6,
              skip: false,
              rules: [],
              errorMessage: "Employee No. is a required field",
              type: "text",
              readonly: true,
            },
            {
              entityName: "email",
              label: "Email Address",
              value: "",
              cols: 6,
              skip: false,
              rules: [(v) => !!v || "Email is a required field"],
              errorMessage: "Email is a required field",
              type: "email",
              readonly: true,
            },
            {
              entityName: "last_name",
              label: "Last Name",
              value: "",
              cols: 6,
              skip: false,
              rules: [(v) => !!v || "Last Name is a required field"],
              errorMessage: "Last Name is a required field",
              type: "text",
              readonly: true,
            },
            {
              entityName: "common_reference_num",
              label: "Common Reference Number (CRN)",
              value: "",
              cols: 6,
              skip: false,
              //rules: [(v) => !!v || "This is a required field."],
              errorMessage: "",
              type: "text",
            },
            {
              entityName: "first_name",
              label: "First Name",
              value: "",
              cols: 6,
              skip: false,
              rules: [(v) => !!v || "First Name is a required field"],
              errorMessage: "First Name is a required field",
              type: "text",
              readonly: true,
            },
            {
              entityName: "gsis_id",
              label: "GSID ID No.",
              value: "",
              cols: 6,
              skip: false,
              rules: [],
              errorMessage: "",
              type: "text",
            },
            {
              entityName: "middle_name",
              label: "Middle Name",
              value: "",
              cols: 6,
              skip: false,
              rules: [],
              errorMessage: "",
              type: "text",
              readonly: true,
            },
            {
              entityName: "pagibig_no",
              label: "PAGIBIG ID No.",
              value: "",
              cols: 6,
              skip: false,
              rules: [],
              errorMessage: "",
              type: "text",
            },
            {
              entityName: "name_extension",
              label: "Name Extension (Jr., Sr)",
              value: "",
              cols: 6,
              skip: false,
              rules: [],
              errorMessage: "",
              type: "text",
            },
            {
              entityName: "philhealth_id",
              label: "PHILHEALTH ID No.",
              value: "",
              cols: 6,
              skip: false,
              rules: [],
              errorMessage: "",
              type: "text",
            },
            {
              entityName: "date_of_birth",
              label: "Date of Birth",
              value: "",
              cols: 6,
              skip: false,
              rules: [(v) => !!v || "Date of birth is a required field"],
              errorMessage: "",
              type: "date",
            },
            {
              entityName: "sss_id",
              label: "SSS ID No.",
              value: "",
              cols: 6,
              skip: false,
              rules: [],
              errorMessage: "",
              type: "text",
            },
            {
              entityName: "place_of_birth",
              label: "Place of Birth",
              value: "",
              cols: 6,
              skip: false,
              rules: [],
              errorMessage: "",
              type: "text",
            },
            {
              entityName: "tin_id",
              label: "TIN ID No.",
              value: "",
              cols: 6,
              skip: false,
              rules: [],
              errorMessage: "",
              type: "text",
            },
          ],
        },
        address: {
          tableName: "addresses",
          info: [
            {
              title: "Residential Address",
              addressInfo: [
                {
                  entityName: "house_block_lot_no",
                  label: "House/Block/Lot No",
                  value: "",
                  cols: 12,
                  skip: false,
                  rules: [
                    (v) => !!v || "House/Block/Lot No is a required field",
                  ],
                  errorMessage: "",
                  type: "text",
                },
                {
                  entityName: "street",
                  label: "Street",
                  value: "",
                  cols: 12,
                  skip: false,
                  rules: [],
                  errorMessage: "",
                  type: "text",
                },
                {
                  entityName: "subdivision_village",
                  label: "Subdivision/Village",
                  value: "",
                  cols: 12,
                  skip: false,
                  rules: [],
                  errorMessage: "",
                  type: "text",
                },
                {
                  entityName: "barangay",
                  label: "Barangay",
                  value: "",
                  cols: 12,
                  skip: false,
                  rules: [(v) => !!v || "Barangay is a required field"],
                  errorMessage: "",
                  type: "text",
                },
                {
                  entityName: "city_municipality",
                  label: "City/Municipality",
                  value: "",
                  cols: 12,
                  skip: false,
                  rules: [
                    (v) => !!v || "City/Municipality is a required field",
                  ],
                  errorMessage: "",
                  type: "text",
                },
                {
                  entityName: "province",
                  label: "Province",
                  value: "",
                  cols: 12,
                  skip: false,
                  rules: [(v) => !!v || "Province is a required field"],
                  errorMessage: "",
                  type: "text",
                },
                {
                  entityName: "zip_code",
                  label: "Zip Code",
                  value: "",
                  cols: 12,
                  skip: false,
                  rules: [(v) => !!v || "Zip code is a required field"],
                  errorMessage: "",
                  type: "text",
                },
              ],
              cols: 6,
            },
            {
              title: "Permanent Address",
              addressInfo: [
                {
                  entityName: "house_block_lot_no",
                  label: "House/Block/Lot No",
                  value: "",
                  cols: 12,
                  skip: false,
                  rules: [
                    (v) => !!v || "House/Block/Lot No is a required field",
                  ],
                  errorMessage: "",
                  type: "text",
                },
                {
                  entityName: "street",
                  label: "Street",
                  value: "",
                  cols: 12,
                  skip: false,
                  rules: [],
                  errorMessage: "",
                  type: "text",
                },
                {
                  entityName: "subdivision_village",
                  label: "Subdivision/Village",
                  value: "",
                  cols: 12,
                  skip: false,
                  rules: [],
                  errorMessage: "",
                  type: "text",
                },
                {
                  entityName: "barangay",
                  label: "Barangay",
                  value: "",
                  cols: 12,
                  skip: false,
                  rules: [(v) => !!v || "Barangay is a required field"],
                  errorMessage: "",
                  type: "text",
                },
                {
                  entityName: "city_municipality",
                  label: "City/Municipality",
                  value: "",
                  cols: 12,
                  skip: false,
                  rules: [
                    (v) => !!v || "City/Municipality is a required field",
                  ],
                  errorMessage: "",
                  type: "text",
                },
                {
                  entityName: "province",
                  label: "Province",
                  value: "",
                  cols: 12,
                  skip: false,
                  rules: [(v) => !!v || "Province is a required field"],
                  errorMessage: "",
                  type: "text",
                },
                {
                  entityName: "zip_code",
                  label: "Zip Code",
                  value: "",
                  cols: 12,
                  skip: false,
                  rules: [(v) => !!v || "Zip code is a required field"],
                  errorMessage: "",
                  type: "text",
                },
              ],
              cols: 6,
            },
          ],
        },
        radioChoices: {
          tableName: "pds_choices",
          info: [
            {
              entityName: "sex",
              title: "Sex",
              choices: [
                {
                  label: "Male",
                  value: "Male",
                  cols: 6,
                  skip: false,
                  errorMessage: "This is a required field.",
                  type: "radio",
                },
                {
                  label: "Female",
                  value: "Female",
                  cols: 6,
                  skip: false,
                  errorMessage: "This is a required field.",
                  type: "radio",
                },
              ],
              value: "",
              cols: 6,
              rules: [(v) => !!v || "This is a required field."],
              errorMessage: "This is a required field.",
              type: "radio",
              skip: false,
            },
            {
              entityName: "citizenship",
              title: "Citizenship",
              choices: [
                {
                  label: "Filipino",
                  value: "filipino",
                  cols: 6,
                  skip: false,
                  errorMessage: "This is a required field.",
                  type: "radio",
                },
                {
                  label: "By Birth",
                  value: "by_birth",
                  cols: 6,
                  skip: false,
                  errorMessage: "This is a required field.",
                  type: "radio",
                },
                {
                  label: "Dual Citizenship",
                  value: "dual_citizenship",
                  cols: 6,
                  skip: false,
                  errorMessage: "This is a required field.",
                  type: "radio",
                },
                {
                  label: "By Naturalization",
                  value: "by_naturalization",
                  cols: 6,
                  skip: false,
                  errorMessage: "This is a required field.",
                  type: "radio",
                },
              ],
              otherDetails: {
                entityName: "citizenship_details",
                label: "Indicate your country",
                value: "",
                rules: [(v) => !!v || "This is a required field."],
                errorMessage: "This is a required field.",
                type: "text",
                skip: false,
              },
              value: "",
              cols: 6,
              rules: [(v) => !!v || "This is a required field."],
              type: "radio",
              skip: false,
            },
            {
              entityName: "civil_status",
              title: "Civil Status",
              choices: [
                {
                  label: "Single",
                  value: "single",
                  cols: 6,
                  skip: false,
                  errorMessage: "This is a required field.",
                  type: "radio",
                },
                {
                  label: "Married",
                  value: "married",
                  cols: 6,
                  skip: false,
                  errorMessage: "This is a required field.",
                  type: "radio",
                },
                {
                  label: "Widowed",
                  value: "widowed",
                  cols: 6,
                  skip: false,
                  errorMessage: "This is a required field.",
                  type: "radio",
                },
                {
                  label: "Separated",
                  value: "separated",
                  cols: 6,
                  skip: false,
                  errorMessage: "This is a required field.",
                  type: "radio",
                },
                {
                  label: "Other/s",
                  value: "others",
                  cols: 6,
                  skip: false,
                  errorMessage: "This is a required field.",
                  type: "radio",
                },
              ],
              value: "",
              otherDetails: {
                entityName: "civil_status_details",
                label: "Please Specify",
                value: "",
                rules: [(v) => !!v || "This is a required field."],
                errorMessage: "This is a required field.",
                type: "text",
                skip: false,
              },
              cols: 6,
              rules: [(v) => !!v || "This is a required field."],
              type: "radio",
              skip: false,
            },
          ],
        },
        otherInformation: {
          tableName: "other_information",
          info: [
            {
              entityName: "height",
              label: "Height (m)",
              value: "",
              cols: 6,
              skip: false,
              rules: [],
              errorMessage: "",
              type: "number",
            },
            {
              entityName: "telephone_no",
              label: "Telephone No.",
              value: "",
              cols: 6,
              skip: false,
              rules: [],
              errorMessage: "",
              type: "text",
            },
            {
              entityName: "weight",
              label: "Weight (kg)",
              value: "",
              cols: 6,
              skip: false,
              rules: [],
              errorMessage: "",
              type: "number",
            },
            {
              entityName: "mobile_no",
              label: "Mobile No.",
              value: "",
              cols: 6,
              skip: false,
              rules: [],
              errorMessage: "",
              type: "text",
            },
            {
              entityName: "blood_type",
              label: "Blood Type",
              value: "",
              cols: 6,
              skip: false,
              rules: [],
              errorMessage: "",
              type: "text",
            },
          ],
        },
      },
      timer: null,
      contact_information: [],
      personal_information: [],
    };
  },
  computed: {
    user() {
      var user = this.$store.getters["auth/user"];
      return user;
    },
    auth() {
      return this.$store.getters["auth/check"];
    },
  },
  async created() {
    await this.$axios
      .post("applicant/pre-employment/fetching_pre_employment")
      .then((res) => {
        this.loading = true;
        var value = res.data.data;
        this.contact_information = value[0].pre_employment_column;
        this.personal_information = value[1].pre_employment_column;
        this.personalInformation.personalInformationForm.info[3].value =
          this.contact_information[4].field_value;
        this.personalInformation.otherInformation.info[1].value =
          this.contact_information[2].field_value;
        this.personalInformation.otherInformation.info[3].value =
          this.contact_information[1].field_value;
        this.personalInformation.personalInformationForm.info[2].value =
          this.personal_information[0].field_value; // surname
        this.personalInformation.personalInformationForm.info[4].value =
          this.personal_information[1].field_value; // given name
        this.personalInformation.personalInformationForm.info[6].value =
          this.personal_information[2].field_value; // middle
        this.personalInformation.personalInformationForm.info[10].value =
          this.personal_information[6].field_value; // birth date
        this.personalInformation.personalInformationForm.info[12].value =
          this.personal_information[7].field_value; // "place_of_birth"
        console.log(this.personalInformation.radioChoices.info[0].choices);
        console.log(this.personal_information[10].field_value);
        this.personalInformation.radioChoices.info[0].choices.value =
          this.personal_information[10].field_value;
        // this.personalInformation.radioChoices.info[0].choices = this.personal_information[10].field_value;

        this.personalInformation.otherInformation.info[0].value =
          this.personal_information[11].field_value; // height
        this.personalInformation.otherInformation.info[2].value =
          this.personal_information[12].field_value; // weight
        this.personalInformation.otherInformation.info[4].value =
          this.personal_information[13].field_value; // blood type
        this.loading = false;
      });
  },
  watch: {
    personalInformation: {
      handler() {
        clearTimeout(this.timer);

        this.timer = setTimeout(() => {
          this.$emit("getPersonalInformation", this.personalInformation);
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
