<template>
<v-row class="mt-5">
		<v-col cols="12">
			<p>Government Issued ID (i.e. Passport, GSIS, SSS, PRC, Driver's License, etc.)</p>
            <p>Please Indicate ID Number and Date of Issuance</p>
			<v-card class="pa-5">
				<v-row v-for="(form, formIndex) in governmentID" :key="formIndex">
					<v-col v-if="formIndex !== 0" cols="7">
						<v-btn icon small class="float-right text-capitalize" color="red" dark @click="removeField(formIndex)">
							<v-icon>
                                mdi-close
                            </v-icon>
						</v-btn>
					</v-col>
					<v-col class="py-0 pl-1 pt-md-9" cols="12" md="6">
						<v-row>
							<v-radio-group class="mt-n3 ml-2 pr-8" v-model="data.otherIDs[formIndex]">
								<v-row>
									<v-col>
                        				<v-radio label='Other Government ID' :value="formIndex"> </v-radio>
									</v-col>
									<v-col v-if="data.otherIDs[formIndex] === formIndex">
										<v-radio label='Government ID Lists' value="Lists"> </v-radio>
									</v-col>
								</v-row>
                     		</v-radio-group>
							<v-col cols="12" class="py-0" v-for="(info, index) in form.govIDs.info" :key="index">
								<v-autocomplete v-if="info.label === 'Government Issued ID' && data.otherIDs[formIndex] !== formIndex" :label="info.label" v-model="info.value" :type="info.type" :items="info.items" :rules="info.rules" outlined dense item-text="name" item-value="name"></v-autocomplete>
                                <v-text-field v-else :label="info.label" v-model="info.value" :type="info.type" :rules="info.rules" outlined dense show ></v-text-field>
                            </v-col>
						</v-row>
						<v-col v-if="formIndex === governmentID.length - 1" class="py-0 pl-1" cols="12">
							<v-btn class="float-right text-capitalize" color="primary" @click="addMoreField()">Add more field</v-btn>
						</v-col>
					</v-col>
				</v-row>
			</v-card>
		</v-col>
	</v-row>
</template>

<script>
export default {
    name: 'GovernmentID',
    props: ['governmentID'],
	data() {
		return {
			data:{
				otherIDs: [],
			},
			otherIds:'Others'
		}
	},
    methods: {
        addMoreField() {
			this.$emit('addMoreField');
			this.data.otherIDs.push(null)
		},
		removeField(index) {
			this.$emit('removeField', index);
			if(this.data.otherIDs[index] === index){
			this.data.otherIDs[index] = null
			}
		},
    }
};
</script>

<style></style>
