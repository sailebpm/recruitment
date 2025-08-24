<template>
    <v-container fluid>
        <v-row class="px-3 pt-3">
            <v-col cols="12">
                <p>{{ backgroundchecknotice.title }}</p>
                <v-card class="pa-5">
                    <v-row class="pt-2">
						<v-col cols="12">
						<p>I agree and authorize the COMPANY to obtain the background information for employment purpose</p>
						</v-col>
						
                        <v-col cols="5">
						<p>I am</p>
						</v-col>
						<v-col cols="5">
						<p>applying for the position of</p>
						</v-col>
						<v-col v-for="(form, formIndex) in backgroundchecknotice.fullname_positionform.info" :key="formIndex" :cols="form.cols" class="py-0">
							<v-text-field v-if="!form.skip" v-model.lazy="form.value" :label="form.label" :rules="form.rules" :readonly="form.readonly" :type="form.type" outlined dense></v-text-field>
                        </v-col>
						<v-col>
							<p>at the COMPANY.	</p>
						</v-col>
						<v-col cols="12">
							<p>I understand that COMPANY will use this information for employment purposes only and not furnish this information to a third party without my written consent.</p>
						</v-col>

						<v-col cols="12">
							<p>For all future time. I waive and release from any legal obligation, any person or organization for any result of providing, obtaining, or acting upon on the result of the employment verification. I understand that such information is sought with confidentiality, and I will not request for the copy of that information.</p>
						</v-col>

						<v-col cols="12">
							<p>Write three references with email address and contact number.</p>
						</v-col>

						<v-col v-for="(form, formIndex) in backgroundchecknotice.references.info" :key="formIndex" :cols="form.cols" class="py-0">
							<v-text-field v-if="!form.skip" v-model.lazy="form.value" :placeholder="form.placeholder" :label="form.label" :rules="form.rules" :type="form.type" outlined dense></v-text-field>
                        </v-col>
						
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
	name: 'BackgroundCheckNotice',
	props: ['register','firstchoice'],
	data() {
		return {
			backgroundchecknotice: {
				title: 'V. Background Check Notice to Applicant and Authorization for Employment Reference ',
				fullname_positionform: {
					tableName: 'background_check_notice',
					info: [
						{
							entityName: 'full_printed_name',
							label: 'FULL PRINTED NAME',
							value: '',
							cols: 5,
							skip: false,
							rules: [(v) => !!v || 'Full printed name is a required field'],
							errorMessage: '',
							type: 'text',
							readonly: true
						},
						{
							entityName: 'position',
							label: 'POSITION',
							value: '',
							cols: 4,
							skip: false,
							rules: [(v) => !!v || 'Position is a required field'],
							errorMessage: '',
							type: 'text',
							readonly: true
						},
						
					],
				},
				references: {
					tableName: 'references',
					info: [
						{
							entityName: 'name_one',
							label: 'Name',
							value: '',
							cols: 4,
							skip: false,
							rules: [(v) => !!v || 'This is a required field'],
							errorMessage: '',
							type: 'text',
						},
						{
							entityName: 'email_one',
							label: 'Email',
							value: '',
							cols: 4,
							skip: false,
							rules: [(v) => !!v || 'This is a required field'],
							errorMessage: '',
							type: 'email',
							placeholder: "Example@gmail.com"
						},
						{
							entityName: 'contact_one',
							label: 'Contact Number',
							value: '',
							cols: 4,
							skip: false,
							rules: [(v) => !!v || 'This is a required field'],
							errorMessage: '',
							type: 'text',
						},
						{
							entityName: 'name_two',
							label: 'Name',
							value: '',
							cols: 4,
							skip: false,
							rules: [(v) => !!v || 'This is a required field'],
							errorMessage: '',
							type: 'text',
						},
						{
							entityName: 'email_two',
							label: 'Email',
							value: '',
							cols: 4,
							skip: false,
							rules: [(v) => !!v || 'This is a required field'],
							type: 'email',
							placeholder: "Example@gmail.com"
						},
						{
							entityName: 'contact_two',
							label: 'Contact Number',
							value: '',
							cols: 4,
							skip: false,
							rules: [(v) => !!v || 'This is a required field'],
							errorMessage: '',
							type: 'text',
						},
						{
							entityName: 'name_three',
							label: 'Name',
							value: '',
							cols: 4,
							skip: false,
							rules: [(v) => !!v || 'This is a required field'],
							errorMessage: '',
							type: 'text',
						},
						{
							entityName: 'email_three',
							label: 'Email',
							value: '',
							cols: 4,
							skip: false,
							rules: [(v) => !!v || 'This is a required field'],
							errorMessage: '',
							type: 'email',
							placeholder: "Example@gmail.com"
						},
						{
							entityName: 'contact_three',
							label: 'Contact Number',
							value: '',
							cols: 4,
							skip: false,
							rules: [(v) => !!v || 'This is a required field'],
							errorMessage: '',
							type: 'text',
						},
						
					],
				},
			},
			timer: null
		};
	},
	created(){
		this.backgroundchecknotice.fullname_positionform.info[0].value = (this.register.firstname + " " + this.register.middlename.charAt()+"," + " " + this.register.lastname)
		this.backgroundchecknotice.fullname_positionform.info[1].value = this.firstchoice.firstChoice;
	},
	watch: {
		backgroundchecknotice: {
			handler(){
				clearTimeout(this.timer);
				this.timer = setTimeout(() => {
					this.$emit('getBackroundCheckNotice', this.backgroundchecknotice);
				}, 1000)
			},
			deep: true,
			immediate: true
		},

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
