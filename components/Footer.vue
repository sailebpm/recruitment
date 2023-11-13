<template>
  <v-footer class="footer" color="#f0f0f0">
      <v-container>
          <v-row class="mt-5">
              <v-col cols="4">
                  <div class="our-loc">
                      <h5>Our Location</h5>
                      <div class="google-map">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3643.508749679762!2d121.04590429848342!3d14.646686941863031!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b708d2e4822b%3A0x1a460e28b95b701e!2sNational%20Kidney%20and%20Transplant%20Institute!5e0!3m2!1sen!2sph!4v1699415696558!5m2!1sen!2sph" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                      </div>
                  </div>
              </v-col>
              <v-col cols="4">
                  <div class="contact-us ml-10">
                      <h5>Contact Us</h5>
                      <p>
                          National Kidney & Transplant Institute <br />
                          East Avenue, Diliman Quezon City 1101 Philippines <br />
                          Phone: (63) (2) 8981-0300, 8981-0400 <br />
                          Fax: (63) (2) 8922-5608 / <br />
                          (63) (2) 8928-0355 <br />
                          Email Address: pro@nkti.gov.ph <br />
                          Emergency Room Tel. No. (63) (2) 8981-0300, 8981-0400 local 1430/1431
                      </p>
                  </div>
              </v-col>
              <v-col cols="4">
                  <div class="links">
                      <h5>Links</h5>
                      <h5>Stay Connected</h5>
                      <v-row class="social-media">
                        <v-col>
                            <a href="YOUR_IG_LINK_HERE">
                                <v-img src="http://web.nkti.support/wp-content/uploads/2023/06/IG_Logo-removebg-preview-e1687838386174.png" width="50" height="50"></v-img>
                            </a>
                        </v-col>
                        <v-col class="ml-n12">
                            <a href="https://www.facebook.com/nkti.gov.ph">
                                <img border="0" src="http://web.nkti.support/wp-content/uploads/2023/06/Facebook_logo-removebg-preview-e1687838500464.png" width="50" height="50" />
                            </a>
                        </v-col>
                        <v-col class="ml-n12">
                            <a href="YOUR_TWITTER_LINK_HERE">
                                <img border="0" src="http://web.nkti.support/wp-content/uploads/2023/06/Twitter_Logo-removebg-preview-e1687838467810.png" width="50" height="50" />
                            </a>
                        </v-col>
                        <v-col class="ml-n12">
                            <a href="YOUR_YOUTUBE_LINK_HERE">
                                <img border="0" src="http://web.nkti.support/wp-content/uploads/2023/06/Youtube_Logo-removebg-preview-e1687838431961.png" width="50" height="50" />
                            </a>
                        </v-col>
                        <v-col class="ml-n12">
                            <a href="YOUR_LINKEDIN_LINK_HERE">
                                <img border="0" src="http://web.nkti.support/wp-content/uploads/2023/06/Linkin_Logo-removebg-preview-e1687836581661.png" width="50" height="50" />
                            </a>
                        </v-col>
                        <v-spacer></v-spacer>
                    </v-row>
                  </div>
              </v-col>
          </v-row>
          <v-row>
              <v-col cols="3">
                  <v-img src="http://web.nkti.support/wp-content/themes/g5_helium/custom/images/header/govph-seal-mono-footer.jpg" alt=""></v-img>
              </v-col>
              <v-col cols="3">
                  <h5>Republic of the Philippines</h5>
                  <p>All content is in the public domain unless otherwise stated.</p>
              </v-col>
              <v-col cols="3">
                  <h5>About GOVPH</h5>
                  <p>Learn more about the Philippine government, its structure, how government works and the people behind it.</p>
              </v-col>
              <v-col cols="3">
                  <h5>Government Links</h5>
                  <p>
                      Office of the President<br />
                      Office of the Vice President<br />
                      Senate of the Philippines<br />
                      House of Representatives<br />
                      Supreme Court<br />
                      Court of Appeals<br />
                      Sandiganbayan
                  </p>
              </v-col>
          </v-row>
      </v-container>
  </v-footer>
</template>

<script>
  export default {
      name: "App",
  };
</script>

<style>

  .footer {
      overflow-x: hidden;
      font-family: "Lato", "Helvetica", "Tahoma", "Geneva", "Arial", sans-serif;
      font-weight: 400;
  }


 h5 {
      margin: 0.75rem 0 1.5rem 0;
      text-rendering: optimizeLegibility;
      font-family: "Lato", "Helvetica", "Tahoma", "Geneva", "Arial", sans-serif;
      font-weight: 400;
      font-size: 1rem;
      margin-block-start: 1.67em;
      margin-block-end: 1.67em;
      margin-inline-start: 0px;
      margin-inline-end: 0px;
  }
  
  .contact-us {
      line-height: 1.5;
      word-spacing: 3px;
      line-height: 26px;
  }

  .google-map {
     padding-bottom: 50%;
     position: relative;
}

.google-map iframe {
     height: 250px;
     width: 100%;
     left: 0;
     top: 0;
     position: absolute;
}

</style>
