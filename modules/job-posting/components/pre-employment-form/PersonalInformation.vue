<template>
    <v-container fluid>
        <v-row class="px-3 pt-3">
            <v-col cols="12">
                <p>{{ personalInformation.title }}</p>
                <v-card class="pa-5">
                    <v-row class="pt-2">
						<v-col v-for="(form, formIndex) in personalInformation.personalInformationForm.info" :key="formIndex" :cols=form.cols class="py-0">
                            <div v-if="form.entityName == 'sex' || form.entityName == 'civil_status'">

                            <span v-if="form.level == 'sex'">
                                <v-autocomplete v-model="form.value" :rules="form.rules" v-if="!form.skip" class="pt-5 pl-5 shrink" :items="select.sex" :label="form.label" :type="form.type" outlined dense></v-autocomplete>
                            </span>

							<span v-if="form.level == 'civil_status'">
								<v-autocomplete v-model="form.value" :rules="form.rules" v-if="!form.skip" class="pt-5 pl-5 shrink" :items="select.civil_status" :label="form.label" :type="form.type" outlined dense></v-autocomplete>
							</span>
                            </div>

                            <div v-else>
                                <v-text-field v-if="!form.skip" v-model.lazy="form.value" :label="form.label" :rules="form.rules" :readonly="form.readonly" :type="form.type" outlined dense></v-text-field>
                            </div>
                        </v-col>
                    </v-row>       
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
	name: 'PersonalInformation',
	props: ['register'],
	data() {
		return {
			personalInformation: {
				title: 'II. Personal Information',
				personalInformationForm: {
					tableName: 'personal_information',
					info: [
						{
							entityName: 'surname',
							label: 'Surname',
							value: '',
							cols: 3,
							skip: false,
							rules: [(v) => !!v || 'Surname is a required field'],
							errorMessage: '',
							type: 'text',
							readonly: true
						},
						{	
							entityName: 'given_name',
							label: 'Given Name',
							value: '',
							cols: 3,
							skip: false,
							rules: [(v) => !!v || 'Middle Name is a required field'],
							errorMessage: '',
							type: '',
							readonly: true
						},
						{
							entityName: 'middle_name',
							label: 'Middle Name',
							value: '',
							cols: 3,
							skip: false,
							rules: [(v) => !!v || 'Middle Name is a required field'],
							errorMessage: '',
							type: 'text',
							readonly: true
						},
						{	
							entityName: 'Nickname_Alias',
							label: 'Nickname / Alias',
							value: '',
							cols: 3,
							skip: false,
							rules: [(v) => !!v || 'Nickname / Alias is a required field'],
							errorMessage: '',
							type: '',
						},
						{
							entityName: 'city_address',
							label: 'City Address',
							value: '',
							cols: 6,
							skip: false,
							rules: [(v) => !!v || 'City Address is a required field'],
							errorMessage: '',
							type: 'text',
						},
						{
							entityName: 'permanent_address',
							label: 'Permanent Address',
							value: '',
							cols: 6,
							skip: false,
							rules: [(v) => !!v || 'Permanent Address is a required field'],
							errorMessage: '',
							type: 'text',
						},
						{
							entityName: 'date_of_birth',
							label: 'Date of Birth',
							value: '',
							cols: 3,
							skip: false,
							rules: [(v) => !!v || 'Date of birth is a required field'],
							errorMessage: '',
							type: 'date',
						},
						{
							entityName: 'place_of_birth',
							label: 'Place of Birth',
							value: '',
							cols: 3,
							skip: false,
							rules: [(v) => !!v || 'Place of Birth is a required field'],
							errorMessage: '',
							type: 'text',
						},
						{
							entityName: 'religion',
							label: 'Religion',
							value: '',
							cols: 3,
							skip: false,
							rules: [(v) => !!v || 'Religion is a required field'],
							errorMessage: '',
							type: 'text',
						},
						{
							entityName: 'civil_status',
							label: 'Civil Status',
							value: '',
							cols: 3,
							skip: false,
							rules: [(v) => !!v || 'Civil Status is a required field'],
							errorMessage: '',
							type: 'text',
							level: 'civil_status',
						},
						{
							entityName: 'sex',
							label: 'Sex',
							value: '',
							cols: 3,
							skip: false,
							rules: [(v) => !!v || 'Sex is a required field'],
							errorMessage: '',
							type: 'text',
							level: 'sex'
						},
						{
							entityName: 'height',
							label: 'Height',
							value: '',
							cols: 3,
							skip: false,
							rules: [(v) => !!v || 'Height is a required field'],
							errorMessage: '',
							type: 'number',
						},
						{
							entityName: 'weight',
							label: 'Weight',
							value: '',
							cols: 3,
							skip: false,
							rules: [(v) => !!v || 'Weight is a required field'],
							errorMessage: '',
							type: 'number',
						},
						{
							entityName: 'blood_type',
							label: 'Blood Type',
							value: '',
							cols: 3,
							skip: false,
							rules: [(v) => !!v || 'Blood Type is a required field'],
							errorMessage: '',
							type: 'text',
						},

						{
							entityName: 'distinguishing_marks',
							label: 'Distinguishing Mark/s ',
							value: '',
							cols: 6,
							skip: false,
							rules: [(v) => !!v || 'Distinguishing Mark/s is a required field'],
							errorMessage: '',
							type: 'text',
						},
						{
							entityName: 'physical_defects',
							label: 'Physical Defects',
							value: '',
							cols: 6,
							skip: false,
							rules: [(v) => !!v || 'Physical Defects is a required field'],
							errorMessage: '',
							type: 'text',
						},
						{
							entityName: 'father_name ',
							label: 'Father`s Name',
							value: '',
							cols: 6,
							skip: false,
							rules: [(v) => !!v || 'Father`s Name is a required field'],
							errorMessage: '',
							type: 'text',
						},
						{
							entityName: 'father_occupation',
							label: 'Occupation',
							value: '',
							cols: 6,
							skip: false,
							rules: [(v) => !!v || 'Occupation is a required field'],
							errorMessage: '',
							type: 'text',
						},
						{
							entityName: 'mother_name',
							label: 'Mother`s Name',
							value: '',
							cols: 6,
							skip: false,
							rules: [(v) => !!v || 'Mother`s Name is a required field'],
							errorMessage: '',
							type: 'text',
						},
						{
							entityName: 'mother_occupation',
							label: 'Occupation',
							value: '',
							cols: 6,
							skip: false,
							rules: [(v) => !!v || 'Occupation is a required field'],
							errorMessage: '',
							type: 'text',
						},
						{
							entityName: 'no_siblings ',
							label: 'No. of Siblings in the Family ',
							value: '',
							cols: 6,
							skip: false,
							rules: [(v) => !!v || 'No. of Siblings in the Family is a required field'],
							errorMessage: '',
							type: 'number',
						},
						{
							entityName: 'ordinal_position',
							label: 'Ordinal Position in the Family',
							value: '',
							cols: 6,
							skip: false,
							rules: [(v) => !!v || 'Ordinal Position in the Family is a required field'],
							errorMessage: '',
							type: 'number',
						},
						{
							entityName: 'spouse_name',
							label: 'Spouse Name',
							value: '',
							cols: 4,
							skip: false,
							rules: [(v) => !!v || 'Spouse Name is a required field'],
							errorMessage: '',
							type: 'text',
						},
						{
							entityName: 'no_children',
							label: 'No. of Children',
							value: '',
							cols: 4,
							skip: false,
							rules: [(v) => !!v || 'No. of Children is a required field'],
							errorMessage: '',
							type: 'number',
						},
						{
							entityName: 'spouse_occupation',
							label: 'Occupation',
							value: '',
							cols: 4,
							skip: false,
							rules: [(v) => !!v || 'Occupation is a required field'],
							errorMessage: '',
							type: 'text',
						},
						{
							entityName: 'emergency',
							label: 'In case of emergency who will be notified ',
							value: '',
							cols: 6,
							skip: false,
							rules: [(v) => !!v || 'In case of emergency who will be notified is a required field'],
							errorMessage: '',
							type: 'text',
						},
						{
							entityName: 'relationship',
							label: 'Relationship',
							value: '',
							cols: 6,
							skip: false,
							rules: [(v) => !!v || 'Relationship is a required field'],
							errorMessage: '',
							type: 'text',
						},
						{
							entityName: 'address_contact',
							label: 'Address and Contact Phone No.',
							value: '',
							cols: 12,
							skip: false,
							rules: [(v) => !!v || 'Address and Contact Phone No. is a required field'],
							errorMessage: '',
							type: 'text',
						},

						
					],
				},
			},
			timer: null,
			select: {
				sex: [
					{
						text: "Male",
						value: "Male",
					},
					{
						text: "Female",
						value: "Female",
					}
				],
				civil_status: [
					{
						text: 'Single',
						value: 'single'
					},
					{
						text: 'Married',
						value: 'married'
					},
					{
						text: 'Widowed',
						value: 'widowed'
					},
					{
						text: 'Separated',
						value: 'separated'
					}
				]
			}
		};
	},
	created(){
		this.personalInformation.personalInformationForm.info[0].value = this.register.lastname
		this.personalInformation.personalInformationForm.info[1].value = this.register.firstname
		this.personalInformation.personalInformationForm.info[2].value = this.register.middlename
	},
	watch: {
		personalInformation: {
			handler(){
				clearTimeout(this.timer);

				this.timer = setTimeout(() => {
					this.$emit('getPersonalInformation', this.personalInformation);
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
