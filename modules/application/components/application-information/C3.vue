<template>
	<v-container fluid>
		<VoluntaryWorkCard :voluntaryWorks="voluntaryWorks" @addMoreField="addMoreVoluntaryField" @removeField="removeVoluntaryField" />
		<LearningDevelopmentCard :learningDevelopments="learningDevelopments" @addMoreField="addMoreLearningField" @removeField="removeLearningField" />
		<OtherInformationCard :otherInformation="otherInformation" @addMoreField="addMoreOtherInfoField" @removeField="removeOtherInfoField" />
	</v-container>
</template>

<script>
import VoluntaryWorkCard from './cards/VoluntaryWorkCard.vue';
import LearningDevelopmentCard from './cards/LearningDevelopmentCard.vue';
import OtherInformationCard from './cards/OtherInformationCard.vue';
export default {
	name: 'C3',
	components: { VoluntaryWorkCard, LearningDevelopmentCard, OtherInformationCard },
	data() {
		return {
			voluntaryWorks: [
				{
					tableName: 'voluntary_work',
					voluntaryWork: {
						info: [
							{
								entityName: 'voluntary_name',
								label: 'Name & Address of Organization (Write in full)',
								value: '',
								cols: 12,
								skip: false,
								rules: [(v) => !!v || 'This is a required field.'],
								errorMessage: '',
								type: 'text',
							},
							{
								entityName: 'position',
								label: 'Position/Nature of Work',
								value: '',
								cols: 12,
								skip: false,
								rules: [(v) => !!v || 'This is a required field.'],
								errorMessage: '',
								type: 'text',
							},
							{
								entityName: 'number_of_hours',
								label: 'Number of Hours',
								value: '',
								cols: 12,
								skip: false,
								rules: [(v) => !!v || 'This is a required field.'],
								errorMessage: '',
								type: 'number',
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
			learningDevelopments: [
				{
					tableName: 'learning_development',
					learningDevelopment: {
						info: [
							{
								entityName: 'title_learning',
								label: 'Title of Learning & Development Interventions/Training Programs (Write in full)',
								value: '',
								cols: 12,
								skip: false,
								rules: [(v) => !!v || 'This is a required field.'],
								errorMessage: '',
								type: 'text',
							},
							{
								entityName: 'conducted_sponsored_by',
								label: 'Conducted/Sponsored by (Write in full)',
								value: '',
								cols: 12,
								skip: false,
								rules: [(v) => !!v || 'This is a required field.'],
								errorMessage: '',
								type: 'text',
							},
							{
								entityName: 'type_of_learning',
								label: 'Type of L&D (Managerial/Supervisory/Technical/etc)',
								value: '',
								cols: 12,
								skip: false,
								rules: [(v) => !!v || 'This is a required field.'],
								errorMessage: '',
								type: 'text',
							},
							{
								entityName: 'number_of_hours',
								label: 'Number of Hours',
								value: '',
								cols: 12,
								skip: false,
								rules: [(v) => !!v || 'This is a required field.'],
								errorMessage: '',
								type: 'number',
							},
						],
					},
					periodAttendance: {
						title: 'Inclusive Dates of Attendance (mm/dd/yyyy)',
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
			otherInformation: [
				{
					tableName: 'skills_hobbies',
					otherInfo: {
						info: [
							{
								entityName: 'special_skills_hobbies',
								label: 'Special Skills and Hobbies',
								value: '',
								cols: 12,
								skip: false,
								rules: [(v) => !!v || 'This is a required field.'],
								errorMessage: '',
								type: 'text',
							},
							{
								entityName: 'membership_association',
								label: 'Membership in Association/Organization (Write in full)',
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
						info: [
							{
								entityName: 'recognition',
								label: 'Non-academic distinctions/Recognition (Write in full)',
								value: '',
								cols: 12,
								skip: false,
								rules: [(v) => !!v || 'This is a required field.'],
								errorMessage: '',
								type: 'text',
							},
						],
					},
				},
			],
			timerVoluntary: null,
			timerLearning: null,
			timerOther: null,
		};
	},
	watch: {
		voluntaryWorks: {
			handler() {
				clearTimeout(this.timerVoluntary);

				this.timerVoluntary = setTimeout(() => {
					this.$emit('getVoluntaryWorks', this.voluntaryWorks);
				}, 1000);
			},
            deep: true,
            immediate: true
		},
		learningDevelopments: {
			handler() {
				clearTimeout(this.timerLearning);

				this.timerLearning = setTimeout(() => {
					this.$emit('getLearningDevelopments', this.learningDevelopments);
				}, 1000);
			},
            deep: true,
            immediate: true
		},
        otherInformation: {
            handler(){
                clearTimeout(this.timerOther);

				this.timerOther = setTimeout(() => {
					this.$emit('getOtherInformation', this.otherInformation);
				}, 1000);
            },
            deep: true,
            immediate: true
        }
	},
	methods: {
		addMoreVoluntaryField() {
			const voluntaryWork = {
				tableName: 'voluntary_work',
				voluntaryWork: {
					info: [
						{
							entityName: 'voluntary_name',
							label: 'Name & Address of Organization (Write in full)',
							value: '',
							cols: 12,
							skip: false,
							rules: [(v) => !!v || 'This is a required field.'],
							errorMessage: '',
							type: 'text',
						},
						{
							entityName: 'position',
							label: 'Position/Nature of Work',
							value: '',
							cols: 12,
							skip: false,
							rules: [(v) => !!v || 'This is a required field.'],
							errorMessage: '',
							type: 'text',
						},
						{
							entityName: 'number_of_hours',
							label: 'Number of Hours',
							value: '',
							cols: 12,
							skip: false,
							rules: [(v) => !(v <= 0) || 'Number of hours should not be a negative number'],
							errorMessage: '',
							type: 'number',
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
							rules: [(v) => !!v || 'This is a required field.'],
							errorMessage: '',
							type: 'date',
						},
					],
				},
			};
			this.voluntaryWorks.push(voluntaryWork);
		},
		removeVoluntaryField(index) {
			this.voluntaryWorks.splice(index, 1);
		},
		addMoreLearningField() {
			const learningDevelopment = {
				tableName: 'learning_development',
				learningDevelopment: {
					info: [
						{
							entityName: 'title_learning',
							label: 'Title of Learning & Development Interventions/Training Programs (Write in full)',
							value: '',
							cols: 12,
							skip: false,
							rules: [(v) => !!v || 'This is a required field.'],
							errorMessage: '',
							type: 'text',
						},
						{
							entityName: 'conducted_sponsored_by',
							label: 'Conducted/Sponsored by (Write in full)',
							value: '',
							cols: 12,
							skip: false,
							rules: [(v) => !!v || 'This is a required field.'],
							errorMessage: '',
							type: 'text',
						},
						{
							entityName: 'type_of_learning',
							label: 'Type of L&D (Managerial/Supervisory/Technical/etc)',
							value: '',
							cols: 12,
							skip: false,
							rules: [(v) => !!v || 'This is a required field.'],
							errorMessage: '',
							type: 'text',
						},
						{
							entityName: 'number_of_hours',
							label: 'Number of Hours',
							value: '',
							cols: 12,
							skip: false,
							rules: [(v) => !!v || 'This is a required field.'],
							errorMessage: '',
							type: 'number',
						},
					],
				},
				periodAttendance: {
					title: 'Inclusive Dates of Attendance (mm/dd/yyyy)',
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
			this.learningDevelopments.push(learningDevelopment);
		},
		removeLearningField(index) {
			this.learningDevelopments.splice(index, 1);
		},
		addMoreOtherInfoField() {
			const otherInformation = {
				tableName: 'skills_hobbies',
				otherInfo: {
					info: [
						{
							entityName: 'special_skills_hobbies',
							label: 'Special Skills and Hobbies',
							value: '',
							cols: 12,
							skip: false,
							rules: [(v) => !!v || 'This is a required field.'],
							errorMessage: '',
							type: 'text',
						},
						{
							entityName: 'membership_association',
							label: 'Membership in Association/Organization (Write in full)',
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
					info: [
						{
							entityName: 'recognition',
							label: 'Non-academic distinctions/Recognition (Write in full)',
							value: '',
							cols: 12,
							skip: false,
							rules: [(v) => !!v || 'This is a required field.'],
							errorMessage: '',
							type: 'text',
						},
					],
				},
			};
			this.otherInformation.push(otherInformation);
		},
		removeOtherInfoField(index) {
            this.otherInformation.splice(index, 1);
        },
	},
};
</script>

<style></style>
