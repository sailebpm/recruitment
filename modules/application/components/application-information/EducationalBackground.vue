<template>
	<v-container fluid>
		<v-row class="px-3 pt-3">
			<v-col cols="12">
				<p>{{ educationalBackground.title }}</p>
				<EducationalCard @addMoreField="addMoreElementary" @removeField="removeElementary" :educationalBackground="educationalBackground.elementary" />
				<EducationalCard @addMoreField="addMoreHighSchool" @removeField="removeSecondary" :educationalBackground="educationalBackground.secondary" />
				<EducationalCard @addMoreField="addMoreVocational" @removeField="removeVocational" :educationalBackground="educationalBackground.vocational" />
				<EducationalCard @addMoreField="addMoreCollege" @removeField="removeCollege" :educationalBackground="educationalBackground.college" />
				<EducationalCard @addMoreField="addMoreGraduate" @removeField="removeGraduate" :educationalBackground="educationalBackground.graduate" />
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import EducationalCard from './cards/EducationalCard.vue';
export default {
	name: 'EducationalBackground',
	components: { EducationalCard },
	data() {
		return {
			educationalBackground: {
				title: 'III. Educational Background',
				elementary: [
					{
						education: {
							title: 'Elementary',
							
							info: [
								{
									entityName: 'name',
									label: 'Name of School (Write in full)',
									value: '',
									cols: 12,
									skip: false,
									rules: [(v) => !!v || 'This is a required field.'],
									errorMessage: '',
									type: 'text',
									
								},
								{
									entityName: 'basic_education',
									label: 'Basic Education/Degree/Course (Write in full)',
									value: '',
									cols: 12,
									skip: false,
									rules: [(v) => !!v || 'This is a required field.'],
									errorMessage: '',
									level: 'elementary'
								},
								{
									entityName: 'highest_level',
									label: 'Highest Level/Units Earned (If not graduated)',
									value: '',
									cols: 12,
									skip: false,
									rules: [(v) => !!v || 'This is a required field.'],
									errorMessage: '',
									type: 'text',
								},
								{
									entityName: 'scholarship',
									label: 'Scholarship/Academic Honors Received',
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
							title: 'Period of Attendance',
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
						year_graduated: {
						title: 'Year Graduated',
						info: [
						{
							entityName: 'year_graduated',
							label: 'Year',
							value: '',
							cols: 6,
							skip: false,
							rules: [(v) => !!v || 'This is a required field.'],
							errorMessage: '',
							type: 'text',
						}
					],
						},
					},
				],
				secondary: [
					{
						education: {
							title: 'Secondary',
							info: [
								{
									entityName: 'name',
									label: 'Name of School (Write in full)',
									value: '',
									cols: 12,
									skip: false,
									rules: [(v) => !!v || 'This is a required field.'],
									errorMessage: '',
									type: 'text',
								},
								{
									entityName: 'basic_education',
									label: 'Basic Education/Degree/Course (Write in full)',
									value: '',
									cols: 12,
									skip: false,
									rules: [(v) => !!v || 'This is a required field.'],
									errorMessage: '',
									type: 'text',
									level: 'secondary'
								},
								{
									entityName: 'highest_level',
									label: 'Highest Level/Units Earned (If not graduated)',
									value: '',
									cols: 12,
									skip: false,
									rules: [(v) => !!v || 'This is a required field.'],
									errorMessage: '',
									type: 'text',
								},
								{
									entityName: 'scholarship',
									label: 'Scholarship/Academic Honors Received',
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
							title: 'Period of Attendance',
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
						year_graduated: {
						title: 'Year Graduated',
						info: [
						{
							entityName: 'year_graduated',
							label: 'Year',
							value: '',
							cols: 6,
							skip: false,
							rules: [(v) => !!v || 'This is a required field.'],
							errorMessage: '',
							type: 'text',
						}
					],
						},
					},
				],
				vocational: [
					{
						education: {
							title: 'Vocational',
							info: [
								{
									entityName: 'name',
									label: 'Name of School (Write in full)',
									value: '',
									cols: 12,
									skip: false,
									rules: [(v) => !!v || 'This is a required field.'],
									errorMessage: '',
									type: 'text',
								},
								{
									entityName: 'basic_education',
									label: 'Basic Education/Degree/Course (Write in full)',
									value: '',
									cols: 12,
									skip: false,
									rules: [(v) => !!v || 'This is a required field.'],
									errorMessage: '',
									type: 'text',
									level: 'vocational'
								},
								{
									entityName: 'highest_level',
									label: 'Highest Level/Units Earned (If not graduated)',
									value: '',
									cols: 12,
									skip: false,
									rules: [(v) => !!v || 'This is a required field.'],
									errorMessage: '',
									type: 'text',
								},
								{
									entityName: 'scholarship',
									label: 'Scholarship/Academic Honors Received',
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
							title: 'Period of Attendance',
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
						year_graduated: {
						title: 'Year Graduated',
						info: [
						{
							entityName: 'year_graduated',
							label: 'Year',
							value: '',
							cols: 6,
							skip: false,
							rules: [(v) => !!v || 'This is a required field.'],
							errorMessage: '',
							type: 'text',
						}
					],
						},
					},
				],
				college: [
					{
						education: {
							title: 'College',
							info: [
								{
									entityName: 'name',
									label: 'Name of School (Write in full)',
									value: '',
									cols: 12,
									skip: false,
									rules: [(v) => !!v || 'This is a required field.'],
									errorMessage: '',
									type: 'text',
								},
								{
									entityName: 'basic_education',
									label: 'Basic Education/Degree/Course (Write in full)',
									value: '',
									cols: 12,
									skip: false,
									rules: [(v) => !!v || 'This is a required field.'],
									errorMessage: '',
									type: 'text',
									level: 'college'
								},
								{
									entityName: 'highest_level',
									label: 'Highest Level/Units Earned (If not graduated)',
									value: '',
									cols: 12,
									skip: false,
									rules: [(v) => !!v || 'This is a required field.'],
									errorMessage: '',
									type: 'text',
								},
								{
									entityName: 'scholarship',
									label: 'Scholarship/Academic Honors Received',
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
							title: 'Period of Attendance',
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
						year_graduated: {
						title: 'Year Graduated',
						info: [
						{
							entityName: 'year_graduated',
							label: 'Year',
							value: '',
							cols: 6,
							skip: false,
							rules: [(v) => !!v || 'This is a required field.'],
							errorMessage: '',
							type: 'text',
						}
					],
				},
					},
				],
				graduate: [
					{
						education: {
							title: 'Graduate Studies',
							info: [
								{
									entityName: 'name',
									label: 'Name of School (Write in full)',
									value: '',
									cols: 12,
									skip: false,
									rules: [(v) => !!v || 'This is a required field.'],
									errorMessage: '',
									type: 'text',
								},
								{
									entityName: 'basic_education',
									label: 'Basic Education/Degree/Course (Write in full)',
									value: '',
									cols: 12,
									skip: false,
									rules: [(v) => !!v || 'This is a required field.'],
									errorMessage: '',
									type: 'text',
									level: 'graduate'
								},
								{
									entityName: 'highest_level',
									label: 'Highest Level/Units Earned (If not graduated)',
									value: '',
									cols: 12,
									skip: false,
									rules: [(v) => !!v || 'This is a required field.'],
									errorMessage: '',
									type: 'text',
								},
								{
									entityName: 'scholarship',
									label: 'Scholarship/Academic Honors Received',
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
							title: 'Period of Attendance',
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
						year_graduated: {
						title: 'Year Graduated',
						info: [
						{
							entityName: 'year_graduated',
							label: 'Year',
							value: '',
							cols: 6,
							skip: false,
							rules: [(v) => !!v || 'This is a required field.'],
							errorMessage: '',
							type: 'text',
						}
					],
				},
					},
				],
			},
			timer: null,
			education: []
		};
	},
	watch: {
		educationalBackground: {
			handler() {
				clearTimeout(this.timer);

				this.timer = setTimeout(() => {
					this.$emit('getEducationalBackground', this.educationalBackground);
				}, 1000)	
			},
			deep: true,
			immediate: true,
		},
	},
	async created(){
		await this.$axios.post("applicant/pre-employment/fetching_pre_employment").then((res) => {
			var value = res.data.data
			this.education = value[3].pre_employment_column
			this.educationalBackground.college[0].periodAttendance.info[0].value = this.education[1].field_value
			this.educationalBackground.college[0].periodAttendance.info[1].value =this.education[2].field_value 
			this.educationalBackground.college[0].education.info[0].value = this.education[3].field_value 
			this.educationalBackground.college[0].education.info[1].value = this.education[0].field_value
		});
	},
	methods: {
		addMoreElementary() {
			const elementary = {
				education: {
					title: 'Elementary',
					info: [
						{
							entityName: 'name',
							label: 'Name of School (Write in full)',
							value: '',
							cols: 12,
							skip: false,
							rules: [(v) => !!v || 'This is a required field.'],
							errorMessage: '',
							type: 'text',
						},
						{
							entityName: 'basic_education',
							label: 'Basic Education/Degree/Course (Write in full)',
							value: '',
							cols: 12,
							skip: false,
							rules: [(v) => !!v || 'This is a required field.'],
							errorMessage: '',
							type: 'text',
						},
						{
							entityName: 'highest_level',
							label: 'Highest Level/Units Earned (If not graduated)',
							value: '',
							cols: 12,
							skip: false,
							rules: [(v) => !!v || 'This is a required field.'],
							errorMessage: '',
							type: 'text',
						},
						{
							entityName: 'scholarship',
							label: 'Scholarship/Academic Honors Received',
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
					title: 'Period of Attendance',
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
				year_graduated: {
					title: 'Year Graduated',
					info: [
						{
							entityName: 'year_graduated',
							label: 'Year Graduated',
							value: '',
							cols: 6,
							skip: false,
							rules: [(v) => !!v || 'This is a required field.'],
							errorMessage: '',
							type: 'date',
						}
					],
				},
			};
			this.educationalBackground.elementary.push(elementary);
		},
		removeElementary(index) {
			this.educationalBackground.elementary.splice(index, 1);
		},
		addMoreHighSchool() {
			const secondary = {
				education: {
					title: 'Secondary',
					info: [
						{
							entityName: 'name',
							label: 'Name of School (Write in full)',
							value: '',
							cols: 12,
							skip: false,
							rules: [(v) => !!v || 'This is a required field.'],
							errorMessage: '',
							type: 'text',
						},
						{
							entityName: 'basic_education',
							label: 'Basic Education/Degree/Course (Write in full)',
							value: '',
							cols: 12,
							skip: false,
							rules: [(v) => !!v || 'This is a required field.'],
							errorMessage: '',
							type: 'text',
						},
						{
							entityName: 'highest_level',
							label: 'Highest Level/Units Earned (If not graduated)',
							value: '',
							cols: 12,
							skip: false,
							rules: [(v) => !!v || 'This is a required field.'],
							errorMessage: '',
							type: 'text',
						},
						{
							entityName: 'scholarship',
							label: 'Scholarship/Academic Honors Received',
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
					title: 'Period of Attendance',
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
			this.educationalBackground.secondary.push(secondary);
		},
		removeSecondary(index) {
			this.educationalBackground.secondary.splice(index, 1);
		},
		addMoreVocational() {
			const vocational = {
				education: {
					title: 'Vocational',
					info: [
						{
							entityName: 'name',
							label: 'Name of School (Write in full)',
							value: '',
							cols: 12,
							skip: false,
							rules: [(v) => !!v || 'This is a required field.'],
							errorMessage: '',
							type: 'text',
						},
						{
							entityName: 'basic_education',
							label: 'Basic Education/Degree/Course (Write in full)',
							value: '',
							cols: 12,
							skip: false,
							rules: [(v) => !!v || 'This is a required field.'],
							errorMessage: '',
							type: 'text',
						},
						{
							entityName: 'highest_level',
							label: 'Highest Level/Units Earned (If not graduated)',
							value: '',
							cols: 12,
							skip: false,
							rules: [(v) => !!v || 'This is a required field.'],
							errorMessage: '',
							type: 'text',
						},
						{
							entityName: 'scholarship',
							label: 'Scholarship/Academic Honors Received',
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
					title: 'Period of Attendance',
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
							type: 'text',
						},
					],
				},
			};
			this.educationalBackground.vocational.push(vocational);
		},
		removeVocational(index) {
			this.educationalBackground.vocational.splice(index, 1);
		},
		addMoreCollege() {
			const college = {
				education: {
					title: 'College',
					info: [
						{
							entityName: 'name',
							label: 'Name of School (Write in full)',
							value: '',
							cols: 12,
							skip: false,
							rules: [(v) => !!v || 'This is a required field.'],
							errorMessage: '',
							type: 'text',
						},
						{
							entityName: 'basic_education',
							label: 'Basic Education/Degree/Course (Write in full)',
							value: '',
							cols: 12,
							skip: false,
							rules: [(v) => !!v || 'This is a required field.'],
							errorMessage: '',
							type: 'text',
						},
						{
							entityName: 'highest_level',
							label: 'Highest Level/Units Earned (If not graduated)',
							value: '',
							cols: 12,
							skip: false,
							rules: [(v) => !!v || 'This is a required field.'],
							errorMessage: '',
							type: 'text',
						},
						{
							entityName: 'scholarship',
							label: 'Scholarship/Academic Honors Received',
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
					title: 'Period of Attendance',
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
			this.educationalBackground.college.push(college);
		},
		removeCollege(index) {
			this.educationalBackground.college.splice(index, 1);
		},
		addMoreGraduate() {
			const graduate = {
				education: {
					title: 'Graduate Studies',
					info: [
						{
							entityName: 'name',
							label: 'Name of School (Write in full)',
							value: '',
							cols: 12,
							skip: false,
							rules: [(v) => !!v || 'This is a required field.'],
							errorMessage: '',
							type: 'text',
						},
						{
							entityName: 'basic_education',
							label: 'Basic Education/Degree/Course (Write in full)',
							value: '',
							cols: 12,
							skip: false,
							rules: [(v) => !!v || 'This is a required field.'],
							errorMessage: '',
							type: 'text',
						},
						{
							entityName: 'highest_level',
							label: 'Highest Level/Units Earned (If not graduated)',
							value: '',
							cols: 12,
							skip: false,
							rules: [(v) => !!v || 'This is a required field.'],
							errorMessage: '',
							type: 'text',
						},
						{
							entityName: 'scholarship',
							label: 'Scholarship/Academic Honors Received',
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
					title: 'Period of Attendance',
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
			this.educationalBackground.graduate.push(graduate);
		},
		removeGraduate(index) {
			this.educationalBackground.graduate.splice(index, 1);
		},
	},
	
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
</style>
