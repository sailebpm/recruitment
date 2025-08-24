<template>
	<v-row>
		<v-col cols="12">
			<p>IV.Work Experience and Trainings </p>
			<v-card class="pa-5">
				<v-row class="pt-2" v-for="(form, formIndex) in workexpetrainings" :key="formIndex">
					<v-col v-if="formIndex > 0" class="py-0 my-3" cols="12">
						<v-btn class="float-right" color="red" dark @click="removeField(formIndex)">Remove this field</v-btn>
					</v-col>
					<v-col class="py-0 pl-1 pt-md-9" cols="12" md="12">
						<v-row>
							<v-col class="py-0 pl-1" v-for="(info, index) in form.workexpetraining.info" :key="index" :cols="form.workexpetraining.cols">
								<v-text-field v-model="info.value" :rules="info.rules" v-if="!info.skip" class="pt-5 pl-5 shrink" :label="info.label" :type="info.type" outlined dense></v-text-field>
							</v-col>
						</v-row>
					</v-col>
					<v-col v-if="formIndex === workexpetrainings.length - 1" class="py-0 pl-1" cols="12">
						<v-btn class="float-right" color="secondary" @click="addMoreField()">Add more field</v-btn>
					</v-col>
				</v-row>
				<v-row class="pt-2" v-for="(form, formIndex) in referrals" :key="formIndex">
					<v-col class="py-0 pl-1 pt-md-9" cols="12" md="12">
						<p class="ps-3"><b>Person/s who referred you to COMPANY</b></p>
						<v-row>
							<v-col class="py-0 pl-1" v-for="(info, index) in form.referral.info" :key="index" :cols="form.referral.cols">
								<v-text-field v-model="info.value" :rules="info.rules" v-if="!info.skip" class="pt-5 pl-5 shrink" :label="info.label" :type="info.type" outlined dense></v-text-field>
							</v-col>
						</v-row>
					</v-col>
				</v-row>
			</v-card>
		</v-col>
	</v-row>
</template>

<script>
export default {
	name: 'WorkExperienceandTrainings',
	props: ['workexpetrainings','referrals'],
	methods: {
		addMoreField() {
			this.$emit('addMoreField');
		},
		removeField(index) {
			this.$emit('removeField', index);
		},
	},
};
</script>

<style></style>
