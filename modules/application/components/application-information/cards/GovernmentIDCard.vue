<template>
	<v-row class="mt-5">
		<v-col cols="12">
			<p>Government Issued ID (i.e. Passport, GSIS, SSS, PRC, Driver's License, etc.)</p>
			<p>Please Indicate ID Number and Date of Issuance</p>
			<v-card class="px-10">
				<v-row class="pt-2">
					<v-col cols="12" md="6" class="pa-2">
						<v-container>
							<v-row>
								<v-col cols="12" class="py-0" v-for="(governmentID, index) in governmentID" :key="index">
									<v-text-field :label="governmentID.label" v-model="governmentID.value" :type="governmentID.label === 'Date of Expiration' ? 'date' : 'text'" outlined dense></v-text-field>
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
    name: 'GovernmentID',
    props: ['governmentID']
};
</script>

<style></style>
