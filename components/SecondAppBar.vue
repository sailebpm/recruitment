<template>
  <v-app-bar class="custom-app-bar">
      <v-spacer></v-spacer>
      <div class="govph mr-10">
          <h4>GOVPH</h4>
      </div>
      <div class="mt-5">
          <span class="dropdown ml-5" @mouseover="changeIcon('healthcare')" @mouseleave="resetIcon('healthcare')">
              <span class="icon-link ml-n3" @click="showHealthcareDropdown ? resetIcon('healthcare') : changeIcon('healthcare')">
                  <v-icon>{{ healthcareIcon }}</v-icon>
              </span>
              <a href="http://web.nkti.support/healthcare-professionals/" class="nav-link">Healthcare Professionals</a>
              <div class="dropdown-content mt-4" v-if="showHealthcareDropdown">
                  <a href="http://web.nkti.support/medical-education-and-training/" class="nav-link-child">Medical Education and Training</a>
                  <v-divider></v-divider>
                  <a href="http://web.nkti.support/nursing-in-service-training-and-education-unit/" class="nav-link-child">Nursing and Education Unit</a>
                  <v-divider></v-divider>
                  <a href="http://web.nkti.support/clinical-and-trial-research-unit/" class="nav-link-child">Clinical and Trial Research Unit</a>
                  <v-divider></v-divider>
                  <a href="http://web.nkti.support/public-health-unit/" class="nav-link-child">Public Health Unit</a>
              </div>
          </span>

          <span class="dropdown" @mouseover="changeIcon('newsroom')" @mouseleave="resetIcon('newsroom')">
              <span class="icon-link ml-n3" @click="showNewsRoomDropdown ? resetIcon('newsroom') : changeIcon('newsroom')">
                  <v-icon>{{ newsRoomIcon }}</v-icon>
              </span>
              <a href="http://web.nkti.support/newsroom/" class="nav-link">Newsroom</a>
              <div class="dropdown-content mt-4" v-if="showNewsRoomDropdown">
                  <a href="http://web.nkti.support/advisories-announcements/" class="nav-link-child">Advisories/Announcements</a>
                  <v-divider></v-divider>
                  <a href="http://web.nkti.support/news-and-events/" class="nav-link-child">News and Events</a>
                  <v-divider></v-divider>
                  <a href="http://web.nkti.support/bids-and-awards/" class="nav-link-child">Bids and Awards</a>
              </div>
          </span>

          <span class="dropdown" @mouseover="changeIcon('ourServices')" @mouseleave="resetIcon('ourServices')">
              <span class="icon-link ml-n3" @click="showOurServicessDropdown ? resetIcon('ourServices') : changeIcon('ourServices')">
                  <v-icon>{{ ourServicesIcon }}</v-icon>
              </span>
              <a href="http://web.nkti.support/core-services/" class="nav-link">Our Services</a>
              <div class="dropdown-content mt-4" v-if="showOurServicessDropdown">
                  <div class="core-services" @mouseover="changeIcon('coreServices')" @mouseleave="resetIcon('coreServices')">
                      <span class="icon-link"><v-icon class="core-position-icon">{{ coreServicesIcon }}</v-icon></span>
                      <a href="http://web.nkti.support/core-services/" class="nav-link-child">Core Services</a>
                      <div class="core-second-dropdown-content mt-4">
                          <a href="http://web.nkti.support/hemodialysis/" class="second-nav-link-child">Hemodialysis</a>
                          <v-divider></v-divider>
                          <a href="http://web.nkti.support/peritoneal-dialysis/" class="second-nav-link-child">Peritoneal Dialysis</a>
                          <v-divider></v-divider>
                          <a href="http://web.nkti.support/human-organ-preservation-effort/" class="second-nav-link-child">Human Organ Preservation Effor</a>
                          <v-divider></v-divider>
                          <a href="http://web.nkti.support/center-for-urology-and-mens-health/" class="second-nav-link-child">Center for Urology and Men's Health</a>
                      </div>
                  </div>
                  <v-divider></v-divider>
                  <div class="medical-services" @mouseover="changeIcon('medicalServices')" @mouseleave="resetIcon('medicalServices')">
                      <span class="icon-link"><v-icon class="medical-position-icon">{{ medicalServicesIcon }}</v-icon></span>
                      <a href="http://web.nkti.support/medical-services/" class="nav-link-child Medical-hover">Medical Services</a>
                      <div class="medical-second-dropdown-content mt-4">
                          <a href="http://web.nkti.support/ambulatory-infusion-therapy-unit-formerly-medical-oncology-unit/" class="second-nav-link-child">Ambulatory Infusion Therapy Unit (formerly Medical Oncology Unit)</a>
                          <v-divider></v-divider>
                          <a href="http://web.nkti.support/ambulatory-urology-and-endoscopy-center-auec/" class="second-nav-link-child">Ambulatory Urology and Endoscopy Center (AUEC)</a>
                          <v-divider></v-divider>
                          <a href="http://web.nkti.support/anesthesiology/" class="second-nav-link-child">Anesthesiology</a>
                          <v-divider></v-divider>
                          <a href="http://web.nkti.support/cardiac-and-non-invasive-vascular-laboratory/" class="second-nav-link-child">Cardiac and Non Invasive Vascular Laboratory</a>
                          <v-divider></v-divider>
                          <a href="http://web.nkti.support/cardiac-catherzation-and-radiology-unit-ccru-or-cathlab/" class="second-nav-link-child">Cardiac Catherzation and Radiology Unit (CCRU) or (Cathlab)</a>
                          <v-divider></v-divider>
                          <a href="http://web.nkti.support/celltran-formerly-hicu/" class="second-nav-link-child">Celtran (formerly HICU)</a>
                          <v-divider></v-divider>
                          <a href="http://web.nkti.support/digital-medical-imaging-and-therapeutic-radiology/" class="second-nav-link-child">Digital Medical Imaging and Therapeutic Radiology</a>
                          <v-divider></v-divider>
                          <a href="http://web.nkti.support/integrated-vascular-services-complex-ivasc/" class="second-nav-link-child">Integrated Vascular Services Complex (IVaSC)</a>
                          <v-divider></v-divider>
                          <a href="http://web.nkti.support/neurophysiology/" class="second-nav-link-child">Neurophysiology</a>
                          <v-divider></v-divider>
                          <a href="http://web.nkti.support/nuclear-medicine-nucmed/" class="second-nav-link-child">Nuclear Medical (NucMed)</a>
                          <v-divider></v-divider>
                          <a href="http://web.nkti.support/pathology-and-laboratory-medicine/" class="second-nav-link-child">Pathology and Laboratory Medicine</a>
                          <v-divider></v-divider>
                          <a href="http://web.nkti.support/pet-ct/" class="second-nav-link-child">PET-CT</a>
                          <v-divider></v-divider>
                          <a href="http://web.nkti.support/physical-medicine-and-rehabilitation-section/" class="second-nav-link-child">Physical Medicine and Rehabilitation Section</a>
                          <v-divider></v-divider>
                          <a href="http://web.nkti.support/pulmonary-section/" class="second-nav-link-child">Pulmonary Section</a>
                          <v-divider></v-divider>
                          <a href="http://web.nkti.support/womens-health-2/" class="second-nav-link-child">Women's Health</a>
                      </div>
                  </div>
              </div>
          </span>

          <span class="dropdown" @mouseover="changeIcon('patientsVisitors')" @mouseleave="resetIcon('patientsVisitors')">
              <span class="icon-link ml-n3" @click="showPatientsVisitorsDropdown ? resetIcon('patientsVisitors') : changeIcon('patientsVisitors')">
                  <v-icon>{{ patientsVisitorsIcon }}</v-icon>
              </span>
              <a href="http://web.nkti.support/patients-and-visitors/" class="nav-link">Patients and Visitors</a>
              <div class="dropdown-content mt-4" v-if="showPatientsVisitorsDropdown">
                  <a href="http://web.nkti.support/frequently-asked-questions/" class="nav-link-child">Frequently Asked Questions</a>
                  <v-divider></v-divider>
                  <a href="http://web.nkti.support/maps-and-directions/" class="nav-link-child">Maps and Directions</a>
                  <v-divider></v-divider>
                  <a href="http://web.nkti.support/telehealth-services/" class="nav-link-child">Telehealth Services</a>
                  <v-divider></v-divider>
                  <a href="http://web.nkti.support/phone-directory/" class="nav-link-child">Phone Directory</a>
                  <v-divider></v-divider>
                  <a href="http://web.nkti.support/customer-service/" class="nav-link-child">Customer Service</a>
                  <v-divider></v-divider>
                  <a href="http://web.nkti.support/admitting-and-discharge/" class="nav-link-child">Admitting and Discharge</a>
                  <v-divider></v-divider>
                  <a href="http://web.nkti.support/emergency-room-services/" class="nav-link-child">Emergency Room Services</a>
                  <v-divider></v-divider>
                  <a href="http://web.nkti.support/outpatient-services/" class="nav-link-child">Outpatient Services</a>
                  <v-divider></v-divider>
                  <a href="http://web.nkti.support/nutrition-and-healthy-lifestyle-clinic/" class="nav-link-child">Nutrition and Healthy lifestyle Clinic</a>
                  <v-divider></v-divider>
                  <a href="http://web.nkti.support/palliative-care/" class="nav-link-child">Palliative Care</a>
                  <v-divider></v-divider>
                  <a href="http://web.nkti.support/pastoral-care/" class="nav-link-child">Pastoral Case</a>
                  <v-divider></v-divider>
                  <a href="http://web.nkti.support/security-and-parking/" class="nav-link-child">Security and Parking</a>
              </div>
          </span>
      </div>
      <v-spacer></v-spacer> <v-spacer></v-spacer> <v-spacer></v-spacer> <v-spacer></v-spacer>
  </v-app-bar>
</template>

<script>
  export default {
      data: () => ({
          healthcareIcon: "mdi-chevron-down",
          newsRoomIcon: "mdi-chevron-down",
          patientsVisitorsIcon: "mdi-chevron-down",
          ourServicesIcon: "mdi-chevron-down",
          coreServicesIcon: "mdi-chevron-right",
          medicalServicesIcon: "mdi-chevron-right",

          showHealthcareDropdown: false,
          showNewsRoomDropdown: false,
          showPatientsVisitorsDropdown: false,
          showOurServicessDropdown: false,
          showCoreServicesDropdown: false,
          showMedicalServicesDropdown: false,
      }),

      methods: {
          changeIcon(section) {
              if (section === "healthcare") {
                  if (!this.showHealthcareDropdown) {
                      this.healthcareIcon = "mdi-close";
                      this.showHealthcareDropdown = true;
                  }
              }
              if (section === "newsroom") {
                  if (!this.showNewsRoomDropdown) {
                      this.newsRoomIcon = "mdi-close";
                      this.showNewsRoomDropdown = true;
                  }
              }
              if (section === "patientsVisitors") {
                  if (!this.showPatientsVisitorsDropdown) {
                      this.patientsVisitorsIcon = "mdi-close";
                      this.showPatientsVisitorsDropdown = true;
                  }
              }
              if (section === "ourServices") {
                  if (!this.showOurServicessDropdown) {
                      this.ourServicesIcon = "mdi-close";
                      this.showOurServicessDropdown = true;
                  }
              }
              if (section === "coreServices") {
                  if (!this.showCoreServicesDropdown) {
                      this.coreServicesIcon = "mdi-close";
                      this.showCoreServicesDropdown = true;
                  }
              }
              if (section === "medicalServices") {
                  if (!this.showMedicalServicesDropdown) {
                      this.medicalServicesIcon = "mdi-close";
                      this.showMedicalServicesDropdown = true;
                  }
              }
          },
          resetIcon(section) {
              if (section === "healthcare") {
                  this.healthcareIcon = "mdi-chevron-down";
                  this.showHealthcareDropdown = false;
              }
              if (section === "newsroom") {
                  this.newsRoomIcon = "mdi-chevron-down";
                  this.showNewsRoomDropdown = false;
              }
              if (section === "patientsVisitors") {
                  this.patientsVisitorsIcon = "mdi-chevron-down";
                  this.showPatientsVisitorsDropdown = false;
              }
              if (section === "ourServices") {
                  this.ourServicesIcon = "mdi-chevron-down";
                  this.showOurServicessDropdown = false;
              }
              if (section === "coreServices") {
                  this.coreServicesIcon = "mdi-chevron-right";
                  this.showCoreServicesDropdown = false;
              }
              if (section === "medicalServices") {
                  this.medicalServicesIcon = "mdi-chevron-right";
                  this.showMedicalServicesDropdown = false;
              }
          },
      },
  };
</script>

<style scoped>
  .custom-app-bar {
      z-index: 50 !important;
  }
  .nav-link {
      text-decoration: none;
      color: rgb(85, 82, 82) !important;
      padding: 6px 12px;
      font-size: 13px;
      font-weight: 700;
      margin-top: -17px;
      float: right;
  }

  .icon-link {
      text-decoration: none;
      color: rgb(85, 82, 82) !important;
      padding: 6px 12px;
      font-size: 13px;
      font-weight: 700;
      margin-top: -20px;
      float: right;
  }

  .nav-link-child {
      text-decoration: none;
      color: rgb(85, 82, 82) !important;
      padding: 6px 12px;
      font-size: 13px;
      font-weight: 500;
  }

  .dropdown {
      position: relative;
      display: inline-block;
  }

  .dropdown-content {
      display: none;
      position: absolute;
      background-color: #f9f9f9;
      min-width: 200px;
      z-index: 1000 !important;
      border: 1px solid #ddd;
      border-radius: 5px;
      right: -120px; /* Adjust the value as needed */
  }
  .dropdown-content a {
      color: black;
      padding: 12px 16px;
      text-decoration: none;
      display: block;
  }

  .dropdown:hover .dropdown-content {
      display: block;
      z-index: 1000 !important;
  }

  .number {
      font-size: 13px;
      font-weight: 500;
      margin-top: -17px;
      float: right;
  }

  .nav-link:hover {
      color: #5d5d5400;
      z-index: 1000 !important;
      overflow-x: hidden;
  }

  input[type="search"] {
      border-radius: 0.25rem;
      border: 1px solid #e0e0e5;
      font-size: 12px;
      width: 120px;
      padding: 0.375rem 1.25rem;
      transition: border-color 0.2s;
      height: 30px;
  }

  .second-dropdown {
      position: relative;
      display: inline-block;
  }

  .core-second-dropdown-content {
      display: none;
      position: absolute;
      background-color: #f9f9f9;
      min-width: 250px;
      z-index: 1000 !important;
      border: 1px solid #ddd;
      border-radius: 5px;
      right: -250px;
      top: -17px;
  }

  .medical-second-dropdown-content {
      display: none;
      position: absolute;
      background-color: #f9f9f9;
      max-width: 250px;
      z-index: 1000 !important;
      border: 1px solid #ddd;
      border-radius: 5px;
      right: -250px;
      top: 27.5px;
  }

  .second-dropdown-content a {
      color: black;
      padding: 12px 16px;
      text-decoration: none;
      display: block;
  }

  .core-services:hover .core-second-dropdown-content {
      display: block;
      z-index: 1000 !important;
  }

  .medical-services:hover .medical-second-dropdown-content {
      display: block;
      z-index: 1000 !important;
  }

  .second-nav-link-child {
      text-decoration: none;
      color: rgb(85, 82, 82) !important;
      padding: 6px 12px;
      font-size: 13px;
      font-weight: 500;
  }
  .govph {
      color: #000;
      font-size: 1.5rem;
  }

  .core-position-icon {
      margin-top: 25px;
  }
  .medical-position-icon {
      margin-top: 25px;
  }

  .nav-link-child:hover {
      color: black !important;
  }

  .second-nav-link-child:hover {
      color: black !important;
  }
</style>
