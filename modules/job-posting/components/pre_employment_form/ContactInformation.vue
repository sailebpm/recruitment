<template>
    <v-container fluid>
        <v-row class="px-3 pt-3">
            <v-col cols="12">
                <p>{{ contactInformation.title }}</p>
                <v-card class="pa-5">
                    <v-row class="pt-2">
                        <v-col v-for="(form, formIndex) in contactInformation.contactInformationForm.info" :key="formIndex" :cols=form.cols class="py-0">
                            <v-text-field v-if="!form.skip" v-model.lazy="form.value" :label="form.label" :readonly="form.readonly" :rules="form.rules" :type="form.type" outlined dense></v-text-field>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
	name: 'ContactInformation',
	props: ['register'],
	data() {
		return {
			contactInformation: {
				title: 'I. Contact Information',
				contactInformationForm: {
					tableName: 'contact_information',
					info: [
						{
							entityName: 'date_of_application',
							label: 'Date of Application',
							value: '',
							cols: 4,
							skip: false,
							rules: [(v) => !!v || 'Date of Application is a required field'],
							errorMessage: 'Date of Application is a required field',
							type: 'date',
						},
						{
                            entityName: 'mobile_phone_no',
							label: 'Mobile Phone No.',
							value: '',
							cols: 4,
							skip: false,
							rules: [(v) => !!v || 'Mobile Phone No is a required field'],
							errorMessage: 'Mobile Phone No is a required field',
							type: 'text',
						},
						{
							entityName: 'residence_landline_phone_no.',
							label: 'Residence Landline Phone No.',
							value: '',
							cols: 4,
							skip: false,
							rules: [(v) => !!v || 'Residence Landline Phone No is a required field'],
							errorMessage: 'Residence Landline Phone No is a required field',
							type: 'text',
						},
						{
							entityName: 'business_phone_no.',
							label: 'Business Phone No.',
							value: '',
							cols: 4,
							skip: false,
							rules: [(v) => !!v || 'Business Phone No. is a required field'],
							errorMessage: 'Business Phone No. is a required field',
							type: 'text',
						},
						{
                            entityName: 'email_address',
							label: 'Email Address',
							value: '',
							cols: 4,
							skip: false,
							rules: [(v) => !!v || 'Email Address No is a required field'],
							errorMessage: 'Email Address No is a required field',
							type: 'text',
							readonly: true
						},
						{
							entityName: 'other_contact_phone_no.',
							label: 'Other Contact Phone No..',
							value: '',
							cols: 4,
							skip: false,
							rules: [(v) => !!v || 'Other Contact Phone No. is a required field'],
							errorMessage: 'Other Contact Phone No. is a required field',
							type: 'text',
						},
					],
				},
			},
			timer: null
		};
	},
	created() {
		this.contactInformation.contactInformationForm.info[4].value = this.register.email
	},
	watch: {
		contactInformation: {
			handler(){
				clearTimeout(this.timer);

				this.timer = setTimeout(() => {
					this.$emit('getContactInformation', this.contactInformation);
				}, 1000)
			},
			deep: true,
			immediate: true
		}
	}
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
