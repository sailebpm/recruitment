<template>
	<v-container fluid>
		<v-row class="px-3 pt-3">
			<v-col cols="12">
				<p>{{ familyBackground.title }}</p>
				<v-card :class="`pa-5`">
					<v-row class="pt-2">
						<v-col cols="12" md="6" class="pa-0">
							<v-container class="pa-5">
								<v-row>
									<v-col cols="12">
										<p class="ps-1">{{ familyBackground.spouse.title }}</p>
									</v-col>
									<v-col cols="12" v-for="(spouse, formIndex) in familyBackground.spouse.info" :key="formIndex">
										<v-text-field v-if="!spouse.skip" v-model.lazy="spouse.value" :label="spouse.label" :rules="spouse.rules" :type="spouse.type" outlined dense></v-text-field>
									</v-col>
								</v-row>
							</v-container>
						</v-col>
						<v-col cols="12" md="6" class="pa-0">
							<v-container class="pa-5">
								<v-row v-for="(form, formIndex) in familyBackground.children" :key="formIndex" class="animate-add">
									<v-col cols="12">
										<p class="ps-1">{{ form.title }}</p>
									</v-col>
									<v-col cols="12" v-for="(children, index) in form.info" :key="index">
										<v-text-field v-if="!children.skip" v-model.lazy="children.value" :label="children.label" :rules="children.rules" :type="children.type" outlined dense></v-text-field>
									</v-col>
									<v-col v-if="formIndex > 0" class="py-0 my-3" cols="12">
										<v-btn class="float-right" color="red" dark @click="removeChildren(formIndex)">Remove this field</v-btn>
									</v-col>
									<v-col v-if="familyBackground.children.length - 1 === formIndex" class="py-0" cols="12">
										<v-btn class="float-right" color="secondary" @click="addChildren()">Add more field</v-btn>
									</v-col>
								</v-row>
							</v-container>
						</v-col>
						<v-col cols="12" md="6" class="pa-0">
							<v-container class="pa-5">
								<v-row>
									<v-col cols="12">
										<p class="ps-1">{{ familyBackground.father.title }}</p>
									</v-col>
									<v-col cols="12" v-for="(father, index) in familyBackground.father.info" :key="index">
										<v-text-field v-if="!father.skip" v-model.lazy="father.value" :label="father.label" :rules="father.rules" :type="father.type" outlined dense></v-text-field>
									</v-col>
								</v-row>
							</v-container>
						</v-col>
						<v-col cols="12" md="6" class="pa-0">
							<v-container class="pa-5">
								<v-row>
									<v-col cols="12">
										<p class="ps-1">{{ familyBackground.mothersMaiden.title }}</p>
									</v-col>
									<v-col cols="12" v-for="(maiden, index) in familyBackground.mothersMaiden.info" :key="index">
										<v-text-field v-if="!maiden.skip" v-model.lazy="maiden.value" :label="maiden.label" :rules="maiden.rules" :type="maiden.type" outlined dense></v-text-field>
									</v-col>
								</v-row>
							</v-container>
						</v-col>
					</v-row>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
export default {
	name: 'FamilyBackground',
	data() {
		return {
			timer: null,
			familyBackground: {
				title: 'II. Family Background',
				spouse: {
					title: 'Spouse',
					tableName: 'spouse',
					info: [
						{
							entityName: 'last_name',
							label: 'Last Name',
							value: '',
							cols: 12,
							skip: false,
							rules: [],
							errorMessage: '',
							type: 'text',
						},
						{
							entityName: 'first_name',
							label: 'First Name',
							value: '',
							cols: 12,
							skip: false,
							rules: [],
							errorMessage: '',
							type: 'text',
						},
						{
							entityName: 'middle_name',
							label: 'Middle Name',
							value: '',
							cols: 12,
							skip: false,
							rules: [],
							errorMessage: '',
							type: 'text',
						},
						{
							entityName: 'name_extension',
							label: 'Name Extension (Jr.,Sr.)',
							value: '',
							cols: 12,
							skip: false,
							rules: [],
							errorMessage: '',
							type: 'text',
						},
						{
							entityName: 'occupation',
							label: 'occupation',
							value: '',
							cols: 12,
							skip: false,
							rules: [],
							errorMessage: '',
							type: 'text',
						},
						{
							entityName: 'employer_business_name',
							label: 'Employer/Business Name',
							value: '',
							cols: 12,
							skip: false,
							rules: [],
							errorMessage: '',
							type: 'text',
						},
						{
							entityName: 'business_address',
							label: 'Business Address',
							value: '',
							cols: 12,
							skip: false,
							rules: [],
							errorMessage: '',
							type: 'text',
						},
						{
							entityName: 'telephone_no',
							label: 'Telephone No.',
							value: '',
							cols: 12,
							skip: false,
							rules: [],
							errorMessage: '',
							type: 'text',
						},
					],
					cols: 6,
				},
				children: [
					{
						title: 'Name of Children',
						info: [
							{
								entityName: 'children_name',
								label: 'Name (Write full name and list all)',
								value: '',
								cols: 12,
								skip: false,
								rules: [],
								errorMessage: '',
								type: 'text',
							},
							{
								entityName: 'date_of_birth',
								label: 'Date of Birth',
								value: '',
								cols: 12,
								skip: false,
								rules: [],
								errorMessage: '',
								type: 'date',
							},
						],
						tableName: 'children',
						addMoreField: true,
						cols: 6,
					},
				],
				father: {
					title: 'Father',
					info: [
						{
							entityName: 'last_name',
							label: 'Last Name',
							value: '',
							cols: 12,
							skip: false,
							rules: [],
							errorMessage: '',
							type: 'text',
						},
						{
							entityName: 'first_name',
							label: 'First Name',
							value: '',
							cols: 12,
							skip: false,
							rules: [],
							errorMessage: '',
							type: 'text',
						},
						{
							entityName: 'middle_name',
							label: 'Middle Name',
							value: '',
							cols: 12,
							skip: false,
							rules: [],
							errorMessage: '',
							type: 'text',
						},
						{
							entityName: 'name_extension',
							label: 'Name Extension (Jr.,Sr.)',
							value: '',
							cols: 12,
							skip: false,
							rules: [],
							errorMessage: '',
							type: 'text',
						},
					],
					tableName: 'father',
					cols: 6,
				},
				mothersMaiden: {
					title: "Mother's Maiden Name",
					info: [
						{
							entityName: 'last_name',
							label: 'Last Name',
							value: '',
							cols: 12,
							skip: false,
							rules: [],
							errorMessage: '',
							type: 'text',
						},
						{
							entityName: 'first_name',
							label: 'First Name',
							value: '',
							cols: 12,
							skip: false,
							rules: [],
							errorMessage: '',
							type: 'text',
						},
						{
							entityName: 'middle_name',
							label: 'Middle Name',
							value: '',
							cols: 12,
							skip: false,
							rules: [],
							errorMessage: '',
							type: 'text',
						},
					],
					tableName: 'maiden_name',
					cols: 6,
				},
			},
		};
	},
	watch: {
		familyBackground: {
			handler(){
				clearTimeout(this.timer);

				this.timer = setTimeout(() => {
					this.$emit('getFamilyBackground', this.familyBackground);
				}, 1000)
			},
			deep: true,
			immediate: true
		}
	},
	methods: {
		addChildren() {
			const children = {
				title: 'Name of Children',
				info: [
					{
						entityName: 'children_name',
						label: 'Name (Write full name and list all)',
						value: '',
						cols: 12,
						skip: false,
						rules: [],
						errorMessage: '',
						type: 'text',
					},
					{
						entityName: 'date_of_birth',
						label: 'Date of Birth',
						value: '',
						cols: 12,
						skip: false,
						rules: [],
						errorMessage: '',
						type: 'date',
					},
				],
				addMoreField: true,
				tableName: 'children',
				cols: 6,
			};
			this.familyBackground.children.push(children);
		},
		removeChildren(index) {
			this.familyBackground.children.splice(index, 1);
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
.border-color {
	border-left: 1px black solid !important;
}
</style>
