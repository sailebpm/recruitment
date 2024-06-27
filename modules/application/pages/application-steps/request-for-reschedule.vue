<template>
  <div>
    <v-dialog v-model="requestModal" width="530">
      <v-card>
        <v-card-title class="text-h6 font-weight-regular lighten-2">
          <v-col class=""> Reason for Reschedule </v-col>
          <v-btn class="ms-auto" icon @click="requestModal = !requestModal">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-divider></v-divider> 

        <slot name="dialog_content"></slot>

        <v-divider></v-divider>

        <v-card-actions class="d-flex flex-row-reverse">
          <slot name="dialog_actions"></slot>
        </v-card-actions>

      </v-card>
    </v-dialog>
    <v-btn elevation="0" color="primary darken-3" class="text-capitalize" @click="requestModal = !requestModal">
            Request For Reschedule
    </v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
        requestModal: false,
    };
  },
};
</script>

<style></style>
