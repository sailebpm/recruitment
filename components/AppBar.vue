<template>
  <v-app-bar dense class="custom-app-bar elevation-1">
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <span text color="black">
          <a href="http://web.nkti.support/" class="nav-link">Home</a>
      </span>
      <span text color="black">
          <a href="http://web.nkti.support/about-nkti/" class="nav-link">About NKTI</a>
      </span>
      <span class="dropdown" @mouseover="changeIcon('transparency')" @mouseleave="resetIcon('transparency')">
        <span class="icon-link ml-n5" @click="showTransparencyDropdown ? resetIcon('transparency') : changeIcon('transparency')">
                  <v-icon>{{ transparencyIcon }}</v-icon>
              </span>
          <a href="http://web.nkti.support/transparency/" class="nav-link mt-n2">Transparency</a>
          <div class="dropdown-content mt-5" v-if="showTransparencyDropdown">
              <a href="http://web.nkti.support/transparency-sealcompliance-to-goodgovernance-condition/" class="nav-link-child">Transparency Seal: Compliance to good governance condition</a>
              <v-divider></v-divider>
              <a href="http://web.nkti.support/bilis-aksiyon-partner/" class="nav-link-child">Bilis Aksiyon Partner</a>
          </div>
      </span>
      <span class="dropdown" @mouseover="changeIcon('specialist')" @mouseleave="resetIcon('specialist')">
        <span class="icon-link ml-n5" @click="showSpecialistDropdown ? resetIcon('specialist') : changeIcon('specialist')">
                  <v-icon>{{ specialistIcon }}</v-icon>
              </span>
          <a href="http://web.nkti.support/find-a-specialist/" class="nav-link mt-n2">Find a Specialist</a>
          <div class="dropdown-content mt-6" v-if="showSpecialistDropdown">
              <a href="http://web.nkti.support/adult-nephrology/" class="nav-link-child">Adult Nephrology</a>
              <v-divider></v-divider>
              <a href="http://web.nkti.support/general-surgery/" class="nav-link-child">General Surgery</a>
              <v-divider></v-divider>
              <a href="http://web.nkti.support/internal-medicine/" class="nav-link-child">Internal Medicine</a>
              <v-divider></v-divider>
              <a href="http://web.nkti.support/nuclear-medicine/" class="nav-link-child">Nuclear Medicine</a>
              <v-divider></v-divider>
              <a href="http://web.nkti.support/occupational-health/" class="nav-link-child">Occupational Health</a>
              <v-divider></v-divider>
              <a href="http://web.nkti.support/ophthalmology/" class="nav-link-child">Opthalmology</a>
              <v-divider></v-divider>
              <a href="http://web.nkti.support/organ-transplant-and-vascular-surgery/" class="nav-link-child">Organ Transplant and Vascular Surgery</a>
              <v-divider></v-divider>
              <a href="http://web.nkti.support/pediatric-nephrology/" class="nav-link-child">Pediatric Nephrology</a>
              <v-divider></v-divider>
              <a href="http://web.nkti.support/urology/" class="nav-link-child">Urology</a>
              <v-divider></v-divider>
              <a href="http://web.nkti.support/womens-health/" class="nav-link-child">Women's Health</a>
          </div>
      </span>
      <span text color="black">
          <a href="http://web.nkti.support/jobs-and-opportunities/" class="nav-link">Jobs and Opportunities</a>
      </span>
      <span text color="black">
          <a href="http://web.nkti.support/privacy-policy-2/" class="nav-link">Privacy Policy</a>
      </span>
      <span text color="black">
          <a href="http://web.nkti.support/contact-us/" class="nav-link">Contact Us</a>
      </span>
      <v-spacer></v-spacer>
      <span text color="black" class="number">(63) (2) 8981-0300, 8981-0400</span>
      <v-spacer></v-spacer>

      <input class="mt-n1" type="search" id="search-field" placeholder="Search for..." name="fname" value="" /><br />

      <v-spacer></v-spacer>
  </v-app-bar>
</template>

<script>
  export default {
      data: () => ({
          drawer: false,
          specialistIcon: "mdi-chevron-down",
          transparencyIcon: "mdi-chevron-down", 
          showSpecialistDropdown: false,
          showTransparencyDropdown: false
      }),
      methods: {
          changeIcon(section) {
              if (section === "specialist") {
                  if (!this.showSpecialistDropdown) {
                      this.showSpecialistDropdown = true;
                  }
              }
              if (section === "transparency") {
                  if (!this.showTransparencyDropdown) {
                      this.showTransparencyDropdown = true;
                  }
              }
  
          },
          resetIcon(section) {
              if (section === "specialist") {
                  this.showSpecialistDropdown = false;
              }
              if (section === "transparency") {
                  this.showTransparencyDropdown = false;
              }
             
          },
        }
  };
</script>

<style scoped lang="scss">
  .custom-app-bar {
      z-index: 100 !important;
  }
  .nav-link {
      text-decoration: none;
      color: black !important;
      padding: 6px 12px;
      font-size: 13px;
      font-weight: 500;
      margin-top: -10px;
      float: right;
  }

  .nav-link-child {
      text-decoration: none;
      color: black !important;
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
      margin-top: -10px;
      float: right;
  }

  .nav-link:hover {
      text-decoration: none;
      color: #424753 !important;
      padding: 6px 12px;
      font-size: 13px;
      font-weight: 600;
      margin-top: -10px;
      float: right;
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
  .nav-link-child:hover {
      color: #12498d !important;
  }

  .icon-link {
      text-decoration: none;
      color: rgb(85, 82, 82) !important;
      padding: 6px 12px;
      font-size: 13px;
      font-weight: 700;
      margin-top: -11px;
      float: right;
  }
</style>
