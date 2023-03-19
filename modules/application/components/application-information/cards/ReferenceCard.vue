<template>
	<v-row class="mt-5">
		<v-col cols="12">
			<p>References</p>
			<p>(Person not related by consanguinity or affinity to applicant/appointee)</p>
			<v-card class="px-10">
				<v-row class="pt-2">
					<v-col cols="12" md="6" class="pa-2" v-for="(form, formIndex) in references" :key="formIndex">
						<v-container>
							<v-row>
								<v-col cols="12">
									<p>Reference #{{formIndex + 1}}</p>
								</v-col>
								<v-col cols="12" class="py-0" v-for="(reference, index) in form.info" :key="index">
									<v-text-field :label="reference.label" v-model="reference.value" outlined dense></v-text-field>
								</v-col>
							</v-row>
						</v-container>
					</v-col>
				</v-row>
			</v-card>
		</v-col>
	</v-row>
</template>

<script>
export default {
    name: 'ReferenceCard',
    props: ['references']
};
</script>

<style></style>
