<template>
	<v-row>
		<v-col cols="12">
			<p>VI. Voluntary Work or Involvement</p>
			<v-card class="pa-5">
				<v-row class="pt-2" v-for="(form, formIndex) in voluntaryWorks" :key="formIndex">
					<v-col v-if="formIndex > 0" class="py-0 my-3" cols="12">
						<v-btn class="float-right" color="red" dark @click="removeField(formIndex)">Remove this field</v-btn>
					</v-col>
					<v-col class="py-0 pl-1 pt-md-9" cols="12" md="6">
						<v-row>
							<v-col class="py-0 pl-1" v-for="(info, index) in form.voluntaryWork.info" :key="index" cols="12">
								<v-text-field v-model="info.value" :rules="info.rules" v-if="!info.skip" class="pt-5 pl-5 shrink" :label="info.label" :type="info.type" outlined dense></v-text-field>
							</v-col>
						</v-row>
					</v-col>
					<v-col class="py-0 pl-1" cols="12" md="6">
						<p class="ps-3">{{ form.periodAttendance.title }}</p>
						<v-row>
							<v-col class="py-0 pl-1" v-for="(periodAttendance, index) in form.periodAttendance.info" :key="index" cols="6">
								<v-text-field v-model="periodAttendance.value" :rules="periodAttendance.rules" v-if="!periodAttendance.skip" class="pt-5 pl-5 shrink" :label="periodAttendance.label" :type="periodAttendance.type" outlined dense></v-text-field>
							</v-col>
						</v-row>
					</v-col>
					<v-col v-if="formIndex === voluntaryWorks.length - 1" class="py-0 pl-1" cols="12">
						<v-btn class="float-right" color="secondary" @click="addMoreField()">Add more field</v-btn>
					</v-col>
				</v-row>
			</v-card>
		</v-col>
	</v-row>
</template>

<script>
export default {
	name: 'VoluntaryWorkCard',
	props: ['voluntaryWorks'],
    methods: {
        addMoreField(){
            this.$emit('addMoreField');
        },
        removeField(index){
            this.$emit('removeField', index);
        }
    }
};
</script>

<style></style>
