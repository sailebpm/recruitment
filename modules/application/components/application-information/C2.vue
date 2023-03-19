<template>
	<v-container fluid>
		<CivilServiceCard :civilServices="civilServices" @addMoreField="addMoreCivilServiceField" @removeField="removeCivilServiceField" />
		<WorkExperienceCard :workExperiences="workExperiences" @addMoreField="addMoreWorkExperienceField" @removeField="removeWorkExperienceField" />
	</v-container>
</template>

<script>
import CivilServiceCard from './cards/CivilServiceCard.vue';
import WorkExperienceCard from './cards/WorkExperienceCard.vue';

export default {
	name: 'C2',
	components: { WorkExperienceCard, CivilServiceCard },
	data() {
		return {
			civilServices: [
				{
					tableName: 'civil_services',
					civilService: {
						info: [
							{
								entityName: 'career_service',
								label: 'Career Service',
								value: '',
								cols: 12,
								skip: false,
								rules: [(v) => !!v || 'This is a required field.'],
								errorMessage: '',
								type: 'text',
							},
							{
								entityName: 'rating',
								label: 'Rating (If applicable)',
								value: '',
								cols: 12,
								skip: false,
								rules: [(v) => !!v || 'This is a required field.'],
								errorMessage: '',
								type: 'text',
							},
							{
								entityName: 'date_examination',
								label: 'Date of Examination/Conferment',
								value: '',
								cols: 12,
								skip: false,
								rules: [(v) => !!v || 'This is a required field.'],
								errorMessage: '',
								type: 'date',
							},
							{
								entityName: 'place_examination',
								label: 'Place of Examination',
								value: '',
								cols: 12,
								skip: false,
								rules: [(v) => !!v || 'This is a required field.'],
								errorMessage: '',
								type: 'text',
							},
						],
					},
					periodAttendance: {
						title: 'License (If applicable)',
						info: [
							{
								entityName: 'license_number',
								label: 'Number',
								value: '',
								cols: 6,
								skip: false,
								rules: [(v) => !!v || 'This is a required field.'],
								errorMessage: '',
								type: 'text',
							},
							{
								entityName: 'date_validity',
								label: 'Date of Validity',
								value: '',
								cols: 6,
								skip: false,
								rules: [(v) => !!v || 'This is a required field.'],
								errorMessage: '',
								type: 'date',
							},
						],
					},
				},
			],
			workExperiences: [
				{
					tableName: 'work_experience',
					workExperience: {
						info: [
							{
								entityName: 'position',
								label: 'Position Title (Write in full/Do not abbreviate)',
								value: '',
								cols: 12,
								skip: false,
								rules: [(v) => !!v || 'This is a required field.'],
								errorMessage: '',
								type: 'text',
							},
							{
								entityName: 'department',
								label: 'Department/Agency/Company (Write in full/Do not abbreviate)',
								value: '',
								cols: 12,
								skip: false,
								rules: [(v) => !!v || 'This is a required field.'],
								errorMessage: '',
								type: 'text',
							},
							{
								entityName: 'monthly_salary',
								label: 'Monthly Salary',
								value: '',
								cols: 12,
								skip: false,
								rules: [(v) => !!v || 'This is a required field.'],
								errorMessage: '',
								type: 'number',
							},
							{
								entityName: 'salary_grade',
								label: 'Salary/Job/Pay Grade (If applicable) & Step (Format "00-0")/increment',
								value: '',
								cols: 12,
								skip: false,
								rules: [(v) => !!v || 'This is a required field.'],
								errorMessage: '',
								type: 'text',
							},
							{
								entityName: 'status_appointment',
								label: 'Status of Appointment',
								value: '',
								cols: 12,
								skip: false,
								rules: [(v) => !!v || 'This is a required field.'],
								errorMessage: '',
								type: 'text',
							},
							{
								entityName: 'government_service',
								label: '(y/n)',
								value: '',
								cols: 12,
								skip: false,
								rules: [(v) => !!v || 'This is a required field.'],
								errorMessage: '',
								type: 'text',
							},
						],
					},
					periodAttendance: {
						title: 'Inclusive Dates (mm/dd/yyyy)',
						info: [
							{
								entityName: 'from',
								label: 'From',
								value: '',
								cols: 6,
								skip: false,
								rules: [],
								errorMessage: '',
								type: 'date',
							},
							{
								entityName: 'to',
								label: 'To',
								value: '',
								cols: 6,
								skip: false,
								rules: [],
								errorMessage: '',
								type: 'date',
							},
						],
					},
				},
			],
            timerCivil: null,
			timerWorkExperience: null
		};
	},
	watch: {
		civilServices: {
			handler() {
				clearTimeout(this.timerCivil);

				this.timerCivil = setTimeout(() => {
					this.$emit('getCivilServices', this.civilServices);
				}, 1000);
			},
			deep: true,
			immediate: true,
		},
        workExperiences: {
            handler(){
                clearTimeout(this.timerWorkExperience);

				this.timerWorkExperience = setTimeout(() => {
					this.$emit('getWorkExperiences', this.workExperiences);
				}, 1000);
            },
            deep: true,
            immediate: true
        }
	},
	methods: {
		addMoreCivilServiceField() {
			const civilService = {
				tableName: 'civil_services',
				civilService: {
					info: [
						{
							entityName: 'career_service',
							label: 'Career Service',
							value: '',
							cols: 12,
							skip: false,
							rules: [(v) => !!v || 'This is a required field.'],
							errorMessage: '',
							type: 'text',
						},
						{
							entityName: 'rating',
							label: 'Rating (If applicable)',
							value: '',
							cols: 12,
							skip: false,
							rules: [(v) => !!v || 'This is a required field.'],
							errorMessage: '',
							type: 'text',
						},
						{
							entityName: 'date_examination',
							label: 'Date of Examination/Conferment',
							value: '',
							cols: 12,
							skip: false,
							rules: [(v) => !!v || 'This is a required field.'],
							errorMessage: '',
							type: 'date',
						},
						{
							entityName: 'place_examination',
							label: 'Place of Examination',
							value: '',
							cols: 12,
							skip: false,
							rules: [(v) => !!v || 'This is a required field.'],
							errorMessage: '',
							type: 'text',
						},
					],
				},
				periodAttendance: {
					title: 'License (If applicable)',
					info: [
						{
							entityName: 'license_number',
							label: 'Number',
							value: '',
							cols: 6,
							skip: false,
							rules: [(v) => !!v || 'This is a required field.'],
							errorMessage: '',
							type: 'text',
						},
						{
							entityName: 'date_validity',
							label: 'Date of Validity',
							value: '',
							cols: 6,
							skip: false,
							rules: [(v) => !!v || 'This is a required field.'],
							errorMessage: '',
							type: 'date',
						},
					],
				},
			};
			this.civilServices.push(civilService);
		},
        removeCivilServiceField(index) {
			this.civilServices.splice(index, 1);
		},
		addMoreWorkExperienceField() {
			const workExperience = {
				tableName: 'work_experience',
				workExperience: {
					info: [
						{
							entityName: 'position',
							label: 'Position Title (Write in full/Do not abbreviate)',
							value: '',
							cols: 12,
							skip: false,
							rules: [(v) => !!v || 'This is a required field.'],
							errorMessage: '',
							type: 'text',
						},
						{
							entityName: 'department',
							label: 'Department/Agency/Company (Write in full/Do not abbreviate)',
							value: '',
							cols: 12,
							skip: false,
							rules: [(v) => !!v || 'This is a required field.'],
							errorMessage: '',
							type: 'text',
						},
						{
							entityName: 'monthly_salary',
							label: 'Monthly Salary',
							value: '',
							cols: 12,
							skip: false,
							rules: [(v) => !!v || 'This is a required field.'],
							errorMessage: '',
							type: 'number',
						},
						{
							entityName: 'salary_grade',
							label: 'Salary/Job/Pay Grade (If applicable) & Step (Format "00-0")/increment',
							value: '',
							cols: 12,
							skip: false,
							rules: [(v) => !!v || 'This is a required field.'],
							errorMessage: '',
							type: 'text',
						},
						{
							entityName: 'status_appointment',
							label: 'Status of Appointment',
							value: '',
							cols: 12,
							skip: false,
							rules: [(v) => !!v || 'This is a required field.'],
							errorMessage: '',
							type: 'text',
						},
						{
							entityName: 'government_service',
							label: '(y/n)',
							value: '',
							cols: 12,
							skip: false,
							rules: [(v) => !!v || 'This is a required field.'],
							errorMessage: '',
							type: 'text',
						},
					],
				},
				periodAttendance: {
					title: 'Inclusive Dates(mm/dd/yyyy)',
					info: [
						{
							entityName: 'from',
							label: 'From',
							value: '',
							cols: 6,
							skip: false,
							rules: [],
							errorMessage: '',
							type: 'date',
						},
						{
							entityName: 'to',
							label: 'To',
							value: '',
							cols: 6,
							skip: false,
							rules: [],
							errorMessage: '',
							type: 'date',
						},
					],
				},
			};
			this.workExperiences.push(workExperience);
		},
		removeWorkExperienceField(index) {
			this.workExperiences.splice(index, 1);
		},
	},
};
</script>

<style></style>
