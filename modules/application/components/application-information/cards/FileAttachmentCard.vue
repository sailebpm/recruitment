<template>
	<v-row class="mt-5">
		<v-col cols="12">
			<p>Attachments</p>
			<p>(Please note that we only accept the following file type: <strong>.pdf, .docx, .doc</strong>)</p>
			<v-card class="px-10">
				<v-row class="pt-2">
					<v-col cols="12" md="6" class="pa-2" v-for="(attachment, index) in attachments" :key="index">
						<v-file-input @change="handleFileUploads($event, index)" :label="attachment.label" v-model="attachment.value" outlined dense accept=".pdf,.docx,.doc" :rules="attachment.rules"></v-file-input>
					</v-col>
				</v-row>
			</v-card>
		</v-col>
	</v-row>
</template>

<script>
export default {
	name: 'FileAttachmentCard',
    props: ['attachments'],
	methods: {
		handleFileUploads(event, index){
			const file = {
				event: event,
				index: index
			}
			this.$emit('handleFileUploads', file);
		}
	}
};
</script>

<style></style>
