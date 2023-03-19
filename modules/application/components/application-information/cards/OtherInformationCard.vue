<template>
	<v-row>
		<v-col cols="12">
			<p>VIII. Other Information</p>
			<v-card class="pa-5">
				<v-row class="pt-2" v-for="(form, formIndex) in otherInformation" :key="formIndex">
					<v-col v-if="formIndex > 0" class="py-0 my-3" cols="12">
						<v-btn class="float-right" color="red" dark @click="removeField(formIndex)">Remove this field</v-btn>
					</v-col>
					<v-col class="py-0 pl-1" cols="12" md="6">
						<v-row>
							<v-col class="py-0 pl-1" v-for="(otherInfo, index) in form.otherInfo.info" :key="index" cols="12">
								<v-text-field v-model="otherInfo.value" :rules="otherInfo.rules" v-if="!otherInfo.skip" class="pt-5 pl-5 shrink" :label="otherInfo.label" :type="otherInfo.type" outlined dense></v-text-field>
							</v-col>
						</v-row>
					</v-col>
					<v-col class="py-0 pl-1" cols="12" md="6">
						<v-row>
							<v-col class="py-0 pl-1" v-for="(periodAttendance, index) in form.periodAttendance.info" :key="index" cols="12">
								<v-text-field v-model="periodAttendance.value" :rules="periodAttendance.rules" v-if="!periodAttendance.skip" class="pt-5 pl-5 shrink" :label="periodAttendance.label" :type="periodAttendance.type" outlined dense></v-text-field>
							</v-col>
						</v-row>
					</v-col>
					<v-col v-if="formIndex === otherInformation.length - 1" class="py-0 pl-1" cols="12">
						<v-btn class="float-right" color="secondary" @click="addMoreField()">Add more field</v-btn>
					</v-col>
				</v-row>
			</v-card>
		</v-col>
	</v-row>
</template>

<script>
export default {
    name: 'OtherInformationCard',
    props: ['otherInformation'],
    methods: {
        addMoreField() {
			this.$emit('addMoreField');
		},
		removeField(index) {
			this.$emit('removeField', index);
		},
    }
};
</script>

<style></style>
