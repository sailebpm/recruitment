<template>
	<v-container fluid>
		<ChoicesCard :choices="choices" />
		<ReferenceCard :references="references"/>
        <GovernmentIDCard :governmentID="governmentID"/>
		<FileAttachmentCard :attachments="attachments"/>
	</v-container>
</template>

<script>
import ChoicesCard from './cards/ChoicesCard.vue';
import ReferenceCard from './cards/ReferenceCard.vue';
import GovernmentIDCard from './cards/GovernmentIDCard.vue';
import FileAttachmentCard from './cards/FileAttachmentCard.vue';
export default {
	name: 'C4',
	components: { ChoicesCard, ReferenceCard, GovernmentIDCard, FileAttachmentCard },
	data() {
		return {
			choices: [
				{
					questionNumber: '34.',
					questionTitle: 'Are you related by consanguinity or affinity to the appointing or recommending authority, or to the chief of bureau of office or the person who has immediate supervision over you in the Office, Bureau or Department where you will be appointed.',
					choices: [
						{
							entityName: 'thirty_four_a',
							subQuestionTitle: 'a. Within the third degree?',
							choiceInfo: [
								{
									label: 'Yes',
									value: 'yes',
								},
								{
									label: 'No',
									value: 'no',
								},
							],
							choiceDetails: {
								entityName: '',
								label: '',
								rules: [(v) => !!v || 'This is a required field.'],
								value: '',
							},
							hasChoiceDetails: false,
							value: '',
						},
						{
							entityName: 'thirty_four_b',
							subQuestionTitle: 'b. Within the fourth degree (for Local Government Unit - Career Employees)?',
							choiceInfo: [
								{
									label: 'Yes',
									value: 'yes',
								},
								{
									label: 'No',
									value: 'no',
								},
							],
							choiceDetails: {
								entityName: 'thirty_four_b_details',
								label: 'If Yes, give details:',
								rules: [(v) => !!v || 'Please provide additional details.'],
								value: '',
							},
							hasChoiceDetails: true,
							value: '',
						},
					],
					rules: [(v) => !!v || "This is a required field"],
					hasTitle: true,
				},
				{
					questionNumber: '35.',
					questionTitle: '',
					choices: [
						{
							entityName: 'thirty_five_a',
							subQuestionTitle: 'a. Have you even been found guilty of any administrative offense?',
							choiceInfo: [
								{
									label: 'Yes',
									value: 'yes',
								},
								{
									label: 'No',
									value: 'no',
								},
							],
							choiceDetails: {
								entityName: 'thirty_five_a_details',
								label: 'If Yes, give details:',
								rules: [(v) => !!v || 'Please provide additional details.'],
								value: '',
							},
							hasChoiceDetails: true,
							value: '',
						},
						{
							entityName: 'thirty_five_b',
							subQuestionTitle: 'b. Have you been criminally charge before any court?',
							choiceInfo: [
								{
									label: 'Yes',
									value: 'yes',
								},
								{
									label: 'No',
									value: 'no',
								},
							],
							choiceDetails: {
								entityName: 'thirty_five_b_details',
								label: 'If Yes, give details:',
								rules: [(v) => !!v || 'Please provide additional details.'],
								value: '',
							},
							hasChoiceDetails: true,
							value: '',
						},
					],
					rules: [(v) => !!v || "This is a required field"],
					hasTitle: false,
				},
				{
					questionNumber: '36.',
					questionTitle: 'Have you even been convicted of any crime or violation of any law, decree, ordinance or regulation by any court of tribunal?',
					choices: [
						{
							entityName: 'thirty_six',
							subQuestionTitle: '',
							choiceInfo: [
								{
									label: 'Yes',
									value: 'yes',
								},
								{
									label: 'No',
									value: 'no',
								},
							],
							choiceDetails: {
								entityName: 'thirty_six_details',
								label: 'If Yes, give details:',
								rules: [(v) => !!v || 'Please provide additional details.'],
								value: '',
							},
							hasChoiceDetails: true,
							value: '',
						},
					],
					rules: [(v) => !!v || "This is a required field"],
					hasTitle: true,
				},
				{
					questionNumber: '37.',
					questionTitle: 'Have you even been separated from the service in any of the following modes: resignation, retirement, dropped from the rolls, dismissal, termination, end of term, finished contract or phased out (abolition) in the public or private sector?',
					choices: [
						{
							entityName: 'thirty_seven',
							subQuestionTitle: '',
							choiceInfo: [
								{
									label: 'Yes',
									value: 'yes',
								},
								{
									label: 'No',
									value: 'no',
								},
							],
							choiceDetails: {
								entityName: 'thirty_seven_details',
								label: 'If Yes, give details:',
								rules: [(v) => !!v || 'Please provide additional details.'],
								value: '',
							},
							hasChoiceDetails: true,
							value: '',
						},
					],
					rules: [(v) => !!v || "This is a required field"],
					hasTitle: true,
				},
				{
					questionNumber: '38.',
					questionTitle: '',
					choices: [
						{
							entityName: 'thirty_eight_a',
							subQuestionTitle: 'a. Have you even been a candidate in a national or local election held within the last year (except Barangay election)?',
							choiceInfo: [
								{
									label: 'Yes',
									value: 'yes',
								},
								{
									label: 'No',
									value: 'no',
								},
							],
							choiceDetails: {
								entityName: 'thirty_eight_a_details',
								label: 'If Yes, give details:',
								rules: [(v) => !!v || 'Please provide additional details.'],
								value: '',
							},
							hasChoiceDetails: true,
							value: '',
						},
						{
							entityName: 'thirty_eight_b',
							subQuestionTitle: 'b. Have you resigned from the government service during the three (3)-month period before the last election to promote/actively campaign for a national or locatl candidate?',
							choiceInfo: [
								{
									label: 'Yes',
									value: 'yes',
								},
								{
									label: 'No',
									value: 'no',
								},
							],
							choiceDetails: {
								entityName: 'thirty_eight_b_details',
								label: 'If Yes, give details:',
								rules: [(v) => !!v || 'Please provide additional details.'],
								value: '',
							},
							hasChoiceDetails: true,
							value: '',
						},
					],
					rules: [(v) => !!v || "This is a required field"],
					hasTitle: false,
				},
				{
					questionNumber: '39.',
					questionTitle: 'Have you acquired the status of an immigrant or permanent resident of another country',
					choices: [
						{
							entityName: 'thirty_nine',
							subQuestionTitle: '',
							choiceInfo: [
								{
									label: 'Yes',
									value: 'yes',
								},
								{
									label: 'No',
									value: 'no',
								},
							],
							choiceDetails: {
								entityName: 'thirty_nine_details',
								label: 'If Yes, give details (country):',
								rules: [(v) => !!v || 'Please provide additional details.'],
								value: '',
							},
							hasChoiceDetails: true,
							value: '',
						},
					],
					rules: [(v) => !!v || "This is a required field"],
					hasTitle: true,
				},
				{
					questionNumber: '40.',
					questionTitle: `Pursuant to: (a) Indigenous People's Act (RA 8371); (b) Magna Carta for Disabled Persons (RA 7277); and (c) Solo Parents Welfare Act of 2000 (RA 8971), please answer the following items:`,
					choices: [
						{
							entityName: 'forty_a',
							subQuestionTitle: 'a. Are you a member of any indigenous group?',
							choiceInfo: [
								{
									label: 'Yes',
									value: 'yes',
								},
								{
									label: 'No',
									value: 'no',
								},
							],
							choiceDetails: {
								entityName: 'forty_a_details',
								label: 'If Yes, give specify:',
								rules: [(v) => !!v || 'Please provide additional details.'],
								value: '',
							},
							hasChoiceDetails: true,
							value: '',
						},
						{
							entityName: 'forty_b',
							subQuestionTitle: 'b. Are you a person with disability?',
							choiceInfo: [
								{
									label: 'Yes',
									value: 'yes',
								},
								{
									label: 'No',
									value: 'no',
								},
							],
							choiceDetails: {
								entityName: 'forty_b_details',
								label: 'If Yes, give specify:',
								rules: [(v) => !!v || 'Please provide additional details.'],
								value: '',
							},
							hasChoiceDetails: true,
							value: '',
						},
						{
							entityName: 'forty_c',
							subQuestionTitle: 'c. Are you a solo parent?',
							choiceInfo: [
								{
									label: 'Yes',
									value: 'yes',
								},
								{
									label: 'No',
									value: 'no',
								},
							],
							choiceDetails: {
								entityName: 'forty_c_details',
								label: 'If Yes, give specify:',
								rules: [(v) => !!v || 'Please provide additional details.'],
								value: '',
							},
							hasChoiceDetails: true,
							value: '',
						},
					],
					rules: [(v) => !!v || "This is a required field"],
					hasTitle: true,
				},
			],
			references: [
				{
					tableName: 'reference',
					info: [
                        {	entityName: 'name',
							label: 'Name',
							value: '',
							skip: false,
							type: 'text',
						},
						{	entityName: 'address',
							label: 'Address',
							value: '',
							skip: false,
							type: 'text',
						},
						{	entityName: 'tel_no',
							label: 'Tel No',
							value: '',
							skip: false,
							type: 'text'
						},
					],
				},
                {
					tableName: 'reference',
					info: [
                        {	entityName: 'name',
							label: 'Name',
							value: '',
							skip: false,
							type: 'text',
						},
						{	entityName: 'address',
							label: 'Address',
							value: '',
							skip: false,
							type: 'text',
						},
						{	entityName: 'tel_no',
							label: 'Tel No',
							value: '',
							skip: false,
							type: 'text'
						},
					],
				},
                {
					tableName: 'reference',
					info: [
                        {	entityName: 'name',
							label: 'Name',
							value: '',
							skip: false,
							type: 'text',
						},
						{	entityName: 'address',
							label: 'Address',
							value: '',
							skip: false,
							type: 'text',
						},
						{	entityName: 'tel_no',
							label: 'Tel No',
							value: '',
							skip: false,
							type: 'text'
						},
					],
				},
			],
            governmentID: [
                {
					entityName: 'government_issued_id',
                    label: 'Government Issued ID',
                    value: '',
					skip: false,
					type: 'text',
					rules: [(v) => !!v || 'This is a required field']
                },
                {
					entityName: 'government_id_no',
                    label: 'ID/License/Passport No.',
                    value: '',
					skip: false,
					type: 'text',
					rules: [(v) => !!v || 'This is a required field']
                },
                {
					entityName: 'data_place_issuance',
                    label: 'Date/Place of Issuance',
                    value: '',
					skip: false,
					type: 'text',
					rules: [(v) => !!v || 'This is a required field']
                },
            ],
			attachments: [
				{	entityName: 'diploma_file',
					label: 'Diploma',
					rules: [],
					value: null,
					type: 'file',
					skip: false,
					rules: []
				},
				{	entityName: 'birth_file',
					label: 'Birth Certificate',
					rules: [],
					value: null,
					type: 'file',
					skip: false,
					rules: []
				},
				{	entityName: 'civil_file',
					label: 'Certificate of Eligibility for Civil Service',
					rules: [],
					value: null,
					type: 'file',
					skip: false,
					rules: []
				},
				{	entityName: 'nbi_file',
					label: 'NBI Clearance',
					rules: [],
					value: null,
					type: 'file',
					skip: false,
					rules: []
				},
				{	entityName: 'training_file',
					label: 'Certificate of Training',
					rules: [],
					value: null,
					type: 'file',
					skip: false
				},
				{	entityName: 'resume_file',
					label: 'Resume',
					rules: [],
					value: null,
					type: 'file',
					skip: false,
					rules: []
				},
				{	entityName: 'work_file',
					label: 'Work Experience Sheet',
					rules: [],
					value: null,
					type: 'file',
					skip: false,
					rules: []
				},
				{	entityName: 'pre_employment_form',
					label: 'Pre-employment Form',
					rules: [(v) => !!v || 'This is a required field.'],
					value: null,
					type: 'file',
					skip: false
				},
			],
			timerChoices: null,
			timerReferences: null,
			timerGovernmentID: null,
			timerAttachments: null,
			ref: []
		};
	},
	async created(){
			await this.$axios.post("applicant/pre-employment/fetching_pre_employment").then((res) => {
				var value = res.data.data
				this.ref = value[8].pre_employment_column
				this.references[0].info[0].value = this.ref[0].field_value // name 1
				this.references[0].info[1].value = this.ref[1].field_value 
				this.references[0].info[2].value = this.ref[2].field_value 
				this.references[1].info[0].value = this.ref[3].field_value // name 1
				this.references[1].info[1].value = this.ref[4].field_value 
				this.references[1].info[2].value = this.ref[5].field_value 
				this.references[2].info[0].value = this.ref[6].field_value // name 1
				this.references[2].info[1].value = this.ref[7].field_value 
				this.references[2].info[2].value = this.ref[8].field_value 
				
			});

	},
	watch: {
		choices: {
			handler() {
				clearTimeout(this.timerChoices);

				this.timerChoices = setTimeout(() => {
					this.$emit('getChoices', this.choices);
				}, 1000);
			},
			deep: true,
			immediate: true,
		},
		references: {
			handler() {
				clearTimeout(this.timerReferences);

				this.timerReferences = setTimeout(() => {
					this.$emit('getReferences', this.references);
				}, 1000);
			},
			deep: true,
			immediate: true,
		},
		governmentID: {
			handler() {
				clearTimeout(this.timerGovernmentID);

				this.timerGovernmentID = setTimeout(() => {
					this.$emit('getGovernmentID', this.governmentID);
				}, 1000);
			},
			deep: true,
			immediate: true,
		},
		attachments: {
			handler() {
				clearTimeout(this.timerAttachments);

				this.timerAttachments = setTimeout(() => {
					this.$emit('getAttachments', this.attachments);
				}, 1000);
			},
			deep: true,
			immediate: true,
		},
	},
	methods: {
		handleFileUploads(event){
			this.attachments[event.index].value = event.event;
		}
	}
};
</script>

<style scope lang="scss">
li {
	list-style: none;
}
</style>
