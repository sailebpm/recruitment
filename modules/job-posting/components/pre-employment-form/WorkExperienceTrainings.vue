<template>
	<v-container fluid>
		<WorkExperienceandTrainings :workexpetrainings="workexpetrainings" :referrals="referrals" @addMoreField="addMoreWorkExpeTrainingsField" @removeField="removeWorkExpeTrainingsField" />
		
	</v-container>
</template>

<script>
import WorkExperienceandTrainings from './WorkExperienceandTrainings.vue';

export default {
	name: 'WorkExperienceTrainings',
	components: { WorkExperienceandTrainings },
	data() {
		return {
			workexpetrainings: [
				{
					tableName: 'Work_Experience_Trainings',
					workexpetraining: {
						info: [
							{
								entityName: 'inclusive_dates ',
								label: 'Inclusive Dates ',
								value: '',
								cols: 6,
								skip: false,
								rules: [],
								errorMessage: '',
								type: 'date',
							},
							{
								entityName: 'position',
								label: 'Position',
								value: '',
								cols: 6,
								skip: false,
								rules: [],
								errorMessage: '',
								type: 'text',
							},
							{
								entityName: 'status',
								label: 'Status',
								value: '',
								cols: 6,
								skip: false,
								rules: [],
								errorMessage: '',
								type: 'text',
							},
							{
								entityName: 'name_of_company_agency ',
								label: 'Name of Company / Agency',
								value: '',
								cols: 6,
								skip: false,
								rules: [],
								errorMessage: '',
								type: 'text',
							},
							{
								entityName: 'reason_for_leaving ',
								label: 'Reason for Leaving',
								value: '',
								cols: 6,
								skip: false,
								rules: [],
								errorMessage: '',
								type: 'text',
							},
						],
					},
				
				},
			],
			referrals: [
				{
					tableName: 'referral',
					referral: {
						info: [
							{
								entityName: 'name',
								label: 'Enter Name ',
								value: '',
								cols: 12,
								skip: false,
								rules: [],
								errorMessage: '',
								type: 'text',
							},
						],
					},
				
				},
			],
		
            timerCivil: null,
			timerReferrals: null,
		
		};
	},
	watch: {
		workexpetrainings: {
			handler() {
				clearTimeout(this.timerCivil);

				this.timerCivil = setTimeout(() => {
					this.$emit('getWorkExperienceTraining', this.workexpetrainings);
				}, 1000);
			},
			deep: true,
			immediate: true,
		},
		referrals: {
			handler() {
				clearTimeout(this.timerReferrals);

				this.timerCivil = setTimeout(() => {
					this.$emit('getreferral', this.referrals);
				}, 1000);
			},
			deep: true,
			immediate: true,
		},
	},
	methods: {
		addMoreWorkExpeTrainingsField() {
			const workexpetraining = {
				tableName: 'Work_Experience_Trainings',
				workexpetraining: {
					info: [
					{
								entityName: 'inclusive_dates ',
								label: 'Inclusive Dates ',
								value: '',
								cols: 6,
								skip: false,
								rules: [],
								errorMessage: '',
								type: 'date',
							},
							{
								entityName: 'position',
								label: 'Position',
								value: '',
								cols: 6,
								skip: false,
								rules: [],
								errorMessage: '',
								type: 'text',
							},
							{
								entityName: 'status',
								label: 'Status',
								value: '',
								cols: 6,
								skip: false,
								rules: [],
								errorMessage: '',
								type: 'text',
							},
							{
								entityName: 'name_of_company_agency ',
								label: 'Name of Company / Agency',
								value: '',
								cols: 6,
								skip: false,
								rules: [],
								errorMessage: '',
								type: 'text',
							},
							{
								entityName: 'reason_for_leaving ',
								label: 'Reason for Leaving',
								value: '',
								cols: 6,
								skip: false,
								rules: [],
								errorMessage: '',
								type: 'text',
							},
					],
				},
			};
			this.workexpetrainings.push(workexpetraining);
		},
        removeWorkExpeTrainingsField(index) {
			this.workexpetrainings.splice(index, 1);
		},

	},
};
</script>

<style></style>
