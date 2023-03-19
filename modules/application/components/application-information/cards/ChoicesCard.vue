<template>
	<v-card>
		<v-card-text v-for="(form, formIndex) in choices" :key="formIndex">
			<v-row>
				<v-col v-if="form.hasTitle" cols="12">
					<p>
						<strong>{{ form.questionNumber }}</strong> {{ form.questionTitle }}
					</p>
				</v-col>
				<v-col cols="12">
					<v-row class="ps-3" v-for="(choice, index) in form.choices" :key="index">
						<v-col cols="12" md="6">
							<p><strong>{{index == 0 && !form.hasTitle ? form.questionNumber : ''}}</strong> {{ choice.subQuestionTitle }}</p>
						</v-col>
						<v-col cols="12" md="6">
							<v-container fluid>
								<v-radio-group v-model="choice.value" :rules="form.rules">
									<v-row>
										<v-col md="6" v-for="(choiceInfo, index) in choice.choiceInfo" :key="index">
											<v-radio :label="choiceInfo.label" :value="choiceInfo.value" ></v-radio>
										</v-col>
									</v-row>
								</v-radio-group>
								<v-text-field v-if="choice.hasChoiceDetails" v-model="choice.choiceDetails.value" :label="choice.choiceDetails.label" :rules="choice.value == 'yes' ? choice.choiceDetails.rules : []" outlined dense :disabled="!(choice.value == 'yes')"></v-text-field>
							</v-container>
						</v-col>
					</v-row>
				</v-col>
			</v-row>
		</v-card-text>
	</v-card>
</template>

<script>
export default {
	name: 'ChoicesCard',
	props: ['choices'],
};
</script>

<style></style>
