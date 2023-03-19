<template>
	<v-card class="pa-5">
		<v-row class="pt-2" v-for="(form, formIndex) in educationalBackground" :key="formIndex">
			<v-col v-if="formIndex > 0" class="py-0 my-3" cols="12">
				<v-btn class="float-right text-capitalize" color="red" dark @click="removeField(formIndex)">Remove this field</v-btn>
			</v-col>
			<v-col class="py-0 pl-1" cols="12" md="6">
				<p class="ps-3">{{ form.education.title }}</p>
				<v-row>
					<v-col class="py-0 pl-1" v-for="(info, index) in form.education.info" :key="index" cols="12">
						<div v-if="info.entityName == 'basic_education' && info.level != 'elementary'">
							<span v-if="info.level == 'secondary'">
								<v-autocomplete v-model="info.value" :rules="info.rules" v-if="!info.skip" class="pt-5 pl-5 shrink" :items="select.secondary" :label="info.label" :type="info.type" outlined dense></v-autocomplete>
							</span>

							<span v-if="info.level == 'vocational'">
								<v-autocomplete v-model="info.value" :rules="info.rules" v-if="!info.skip" class="pt-5 pl-5 shrink" :items="select.vocational" :label="info.label" :type="info.type" outlined dense></v-autocomplete>
							</span>

							<span v-if="info.level == 'college'">
								<v-autocomplete v-model="info.value" :rules="info.rules" v-if="!info.skip" class="pt-5 pl-5 shrink" :items="select.college" :label="info.label" :type="info.type" outlined dense></v-autocomplete>
							</span>

							<span v-if="info.level == 'graduate'">
								<v-autocomplete v-model="info.value" :rules="info.rules" v-if="!info.skip" class="pt-5 pl-5 shrink" :items="select.graduate" :label="info.label" :type="info.type" outlined dense></v-autocomplete>
							</span>
						</div>

						<div v-else>
							<v-text-field v-model="info.value" :rules="info.rules" v-if="!info.skip" class="pt-5 pl-5 shrink" :label="info.label" :type="info.type" outlined dense></v-text-field>
						</div>
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
				<p class="ps-3">{{ form.year_graduated.title }}</p>
				<v-row >
					<v-col class="py-0 pl-1" v-for="(year_graduated, index) in form.year_graduated.info" :key="index" cols="6">
						<v-text-field v-model="year_graduated.value" :rules="year_graduated.rules" v-if="!year_graduated.skip" class="pt-5 pl-5 shrink" :label="year_graduated.label" :type="year_graduated.type" outlined dense></v-text-field>
					</v-col>
				</v-row>
			</v-col>
			<v-col v-if="formIndex === educationalBackground.length - 1" class="py-0 pl-1" cols="12">
				<v-btn class="float-right text-capitalize" color="primary" @click="addMoreField()">Add more field</v-btn>
			</v-col>
		</v-row>
	</v-card>
</template>

<script>
export default {
	name: 'EducationalCard',
	props: ['educationalBackground'],

	data(){
		return{
			select:{
				secondary:
				[
					{
						text: 'Accountancy, Business,  Management (ABM)',
						value: 'Accountancy, Business,  Management (ABM)'
					},
					{
						text: 'Humanities, Social Sciences (HUMSSS)',
						value: 'Humanities, Social Sciences (HUMSS)'
					},
					{
						text: 'Science, Technology, Engineering, Mathematics (STEM)',
						value: 'Science, Technology, Engineering, Mathematics (STEM)'
					},
					{
						text: 'General Academic Strand (GAS)',
						value: 'General Academic Strand (GAS)'
					},
					{
						text: 'Technical-Vocational-Livelihood (TVL)',
						value: 'Technical-Vocational-Livelihood (TVL)'
					}
					,
					{
						text: 'N/A',
						value: 'N/A'
					},
				],
				vocational:
          		[
					{
						text: 'Bachelor of Science in Medical Technology (BS Med Tech)',
						value: 'Bachelor of Science in Medical Technology (BS Med Tech)'
					},
					{
						text: 'Bachelor of Science in Midwifery (BS Midwifery)',
						value: 'Bachelor of Science in Midwifery (BS Midwifery)'
					},
					{
						text: 'Bachelor of Science in Nursing (BSN)',
						value: 'Bachelor of Science in Nursing (BSN)'
					},
					{
						text: 'Bachelor of Science in Occupational Therapy (BSOT)',
						value: 'Bachelor of Science in Occupational Therapy (BSOT)'
					},
					{
						text: 'Bachelor of Science in Pharmacy (BS Pharmacy)',
						value: 'Bachelor of Science in Pharmacy (BS Pharmacy)'
					},
					{
						text: 'Bachelor of Science in Physical Therapy (BSPT)',
						value: 'Bachelor of Science in Physical Therapy (BSPT)'
					},
					{
						text: 'Bachelor of Science in Radiologic Technology (BS Rad Tech)',
						value: 'Bachelor of Science in Radiologic Technology (BS Rad Tech)'
					},
					{
						text: 'Bachelor of Science in Respiratory Therapy (BSRT)',
						value: 'Bachelor of Science in Respiratory Therapy (BSRT)'
					},
					{
						text: 'Bachelor of Science in Speech-Language Pathology',
						value: 'Bachelor of Science in Speech-Language Pathology'
					},
					{
						text: 'Bachelor of Science in Sports Science',
						value: 'Bachelor of Science in Sports Science'
					},
					{
						text: 'Bachelor of Science in Computer Science (BSCS)',
						value: 'Bachelor of Science in Computer Science (BSCS)'
					},
					{
						text: 'Bachelor of Science in Information Technology (BSIT)',
						value: 'Bachelor of Science in Information Technology (BSIT)'
					},
					{
						text: 'Bachelor of Science in Information Systems (BSIS)',
						value: 'Bachelor of Science in Information Systems (BSIS)'
					},
					{
						text: 'Bachelor of Science in Mathematics (BS Mathematics)',
						value: 'Bachelor of Science in Mathematics (BS Mathematics)'
					},
					{
						text: 'Bachelor of Science in Applied Mathematics (BS Applied Math)',
						value: 'Bachelor of Science in Applied Mathematics (BS Applied Math)'
					},
					{
						text: 'Bachelor of Science in Statistics (BS Stat)',
						value: 'Bachelor of Science in Statistics (BS Stat)'
					},
					{
						text: 'Bachelor of Science in Agriculture',
						value: 'Bachelor of Science in Agriculture'
					},
					{
						text: 'Bachelor of Science in Agribusiness (BS Agribusiness)',
						value: 'Bachelor of Science in Agribusiness (BS Agribusiness)'
					},
					{
						text: 'Bachelor of Science in Agroforestry (BS Agroforestry)',
						value: 'Bachelor of Science in Agroforestry (BS Agroforestry)'
					},
					{
						text: 'Bachelor of Science in Architecture (BS Architecture)',
						value: 'Bachelor of Science in Architecture (BS Architecture)'
					},
					{
						text: 'Bachelor in Landscape Architecture (BLA)',
						value: 'Bachelor in Landscape Architecture (BLA)'
					},
					{
						text: 'Bachelor of Science in Interior Design (BS Interior Design)',
						value: 'Bachelor of Science in Interior Design (BS Interior Design)'
					},
					{
						text: 'Bachelor of Science in Accountancy (BSA)',
						value: 'Bachelor of Science in Accountancy (BSA)'
					},
					{
						text: 'Bachelor of Science in Accounting Technology (BSAcT)',
						value: 'Bachelor of Science in Accounting Technology (BSAcT)'
					},
					{
						text: 'Bachelor of Science in Business Administration ',
						value: 'Bachelor of Science in Business Administration '
					},
					{
						text: 'Bachelor of Science in Business Administration Major in Business Economics (BSBA)',
						value: 'Bachelor of Science in Business Administration Major in Business Economics (BSBA)'
					},
					{
						text: 'Bachelor of Science in Business Administration Major in Financial Management (BSBA major in FM)',
						value: 'Bachelor of Science in Business Administration Major in Financial Management (BSBA major in FM)'
					},
					{
						text: 'Bachelor of Science in Business Administration Major in Human Resource Development (BSBA major in HRDM)',
						value: 'Bachelor of Science in Business Administration Major in Human Resource Development (BSBA major in HRDM)'
					},
					{
						text: 'Bachelor of Science in Business Administration Major in Marketing Management (BSBA major in MM)',
						value: 'Bachelor of Science in Business Administration Major in Marketing Management (BSBA major in MM)'
					},
					{
						text: 'Bachelor of Science in Business Administration Major in Operations Management (BSBA major in OM)',
						value: 'Bachelor of Science in Business Administration Major in Operations Management (BSBA major in OM)'
					}
					,
					{
						text: 'Bachelor of Science in Bachelor of Science in Hotel and Restaurant Management (BS HRM)',
						value: 'Bachelor of Science in Bachelor of Science in Hotel and Restaurant Management (BS HRM)'
					}
					,
					{
						text: 'Bachelor of Science in Entrepreneurship (BS Entrep)',
						value: 'Bachelor of Science in Entrepreneurship (BS Entrep)'
					}
					,
					{
						text: 'Bachelor of Science in Office Administration (BSOA)',
						value: 'Bachelor of Science in Office Administration (BSOA)'
					},
					{
						text: 'Bachelor of Science in Real Estate Management (BS REM)',
						value: 'Bachelor of Science in Real Estate Management (BS REM)'
					}
					,
					{
						text: 'Bachelor of Science in Tourism Management (BSTM)',
						value: 'Bachelor of Science in Tourism Management (BSTM)'
					}
					,
					{
						text: 'Bachelor in Secondary Education (BSED)',
						value: 'Bachelor in Secondary Education (BSED)'
					}
					,
					{
						text: 'Bachelor in Elementary Education (BEED)',
						value: 'Bachelor in Elementary Education (BEED)'
					},
					{
						text: 'Bachelor in Secondary Education Major in Technology and Livelihood Education (BSED)',
						value: 'Bachelor in Secondary Education Major in Technology and Livelihood Education (BSED)'
					}
					,
					{
						text: 'Bachelor in Secondary Education Major in Biological Sciences (BSED)',
						value: 'Bachelor in Secondary Education Major in Biological Sciences (BSED)'
					}
					,
					{
						text: 'Bachelor in Secondary Education Major in English (BSED)',
						value: 'Bachelor in Secondary Education Major in English (BSED)'
					}
					,
					{
						text: 'Bachelor in Secondary Education Major in Filipino (BSED)',
						value: 'Bachelor in Secondary Education Major in Filipino (BSED)'
					},
					{
						text: 'Bachelor in Secondary Education Major in Mathematics (BSED)',
						value: 'Bachelor in Secondary Education Major in Mathematics (BSED)'
					}
					,
					{
						text: 'Bachelor in Secondary Education Major in Islamic Studies (BSED)',
						value: 'Bachelor in Secondary Education Major in Islamic Studies (BSED)'
					}
					,
					{
						text: 'Bachelor in Secondary Education Major in Music, Arts, Physical and Health Education (BSED)',
						value: 'Bachelor in Secondary Education Major in Music, Arts, Physical and Health Education (BSED)'
					}
					,
					{
						text: 'Bachelor in Secondary Education Major in Physical Sciences (BSED)',
						value: 'Bachelor in Secondary Education Major in Physical Sciences (BSED)'
					},
					{
						text: 'Bachelor in Secondary Education Major in Social Studies (BSED)',
						value: 'Bachelor in Secondary Education Major in Social Studies (BSED)'
					}
					,
					{
						text: 'Bachelor in Secondary Education Major in Values Education (BSED)',
						value: 'Bachelor in Secondary Education Major in Values Education (BSED)'
					}
					,
					{
						text: 'Bachelor in Elementary Education Major in Preschool Education (BEED)',
						value: 'Bachelor in Elementary Education Major in Preschool Education (BEED)'
					}
					,
					{
						text: 'Bachelor in Elementary Education Major in Special Education (BEED)',
						value: 'Bachelor in Elementary Education Major in Special Education (BEED)'
					},
					{
						text: 'Bachelor of Library and Information Science in the Philippines (BLIS)',
						value: 'Bachelor of Library and Information Science in the Philippines (BLIS)'
					}
					,
					{
						text: 'Bachelor of Physical Education (BPE)',
						value: 'Bachelor of Physical Education (BPE)'
					}
					,
					{
						text: 'Bachelor of Science in Aeronautical Engineering (BS AeroE)',
						value: 'Bachelor of Science in Aeronautical Engineering (BS AeroE)'
					}
					,
					{
						text: 'Bachelor of Science in Ceramic Engineering (BSCerE)',
						value: 'Bachelor of Science in Ceramic Engineering (BSCerE)'
					}
					,
					{
						text: 'Bachelor of Science in Chemical Engineering (BSChE)',
						value: 'Bachelor of Science in Chemical Engineering (BSChE)'
					}
					,
					{
						text: 'Bachelor of Science in Civil Engineering (BSCE)',
						value: 'Bachelor of Science in Civil Engineering (BSCE)'
					}
					,
					{
						text: 'Bachelor of Science in Computer Engineering (BSCpE)',
						value: 'Bachelor of Science in Computer Engineering (BSCpE)'
					}
					,
					{
						text: 'Bachelor of Science in Electrical Engineering (BSEE)',
						value: 'Bachelor of Science in Electrical Engineering (BSEE)'
					}
					,
					{
						text: 'Bachelor of Science in Electronics and Communications Engineering (BSECE)',
						value: 'Bachelor of Science in Electronics and Communications Engineering (BSECE)'
					}
					,
					{
						text: 'Bachelor of Science in Geodetic Engineering (BSGE)',
						value: 'Bachelor of Science in Geodetic Engineering (BSGE)'
					}
					,
					{
						text: 'Bachelor of Science in Geological Engineering (BSGeoE)',
						value: 'Bachelor of Science in Geological Engineering (BSGeoE)'
					}
					,
					{
						text: 'Bachelor of Science in Marine Engineering in (BSMarE)',
						value: 'Bachelor of Science in Marine Engineering in (BSMarE)'
					}
					,
					{
						text: 'Bachelor of Science in Materials Engineering (BSMatE)',
						value: 'Bachelor of Science in Materials Engineering (BSMatE)'
					}
					,
					{
						text: 'Bachelor of Science in Mechanical Engineering (BSME)',
						value: 'Bachelor of Science in Mechanical Engineering (BSME)'
					}
					,
					{
						text: 'Bachelor of Science in Metallurgical Engineering (BSMetE)',
						value: 'Bachelor of Science in Metallurgical Engineering (BSMetE)'
					}
					,
					{
						text: 'Bachelor of Science in Mining Engineering (BSEM)',
						value: 'Bachelor of Science in Mining Engineering (BSEM)'
					}
					,
					{
						text: 'Bachelor of Science in Petroleum Engineering (BSPetE)',
						value: 'Bachelor of Science in Petroleum Engineering (BSPetE)'
					}
					,
					{
						text: 'Bachelor of Science in Sanitary Engineering (BSSE)',
						value: 'Bachelor of Science in Sanitary Engineering (BSSE)'
					}
					,
					{
						text: 'Bachelor of Arts in Broadcasting (AB Broadcasting)',
						value: 'Bachelor of Arts in Broadcasting (AB Broadcasting)'
					}
					,
					{
						text: 'Bachelor of Arts in Communication (AB Communication)',
						value: 'Bachelor of Arts in Communication (AB Communication)'
					}
					,
					{
						text: 'Bachelor of Science in in Development Communication (BS DevComm)',
						value: 'Bachelor of Science in in Development Communication (BS DevComm)'
					}
					,
					{
						text: 'Bachelor of Arts in Journalism (AB Journalism)',
						value: 'Bachelor of Arts in Journalism (AB Journalism)'
					}
					,
					{
						text: 'Bachelor of Arts in Mass Communication',
						value: 'Bachelor of Arts in Mass Communication'
					}
					,
					{
						text: 'Bachelor of Science in Community Development (BS Community Development)',
						value: 'Bachelor of Science in Community Development (BS Community Development)'
					}
					,
					{
						text: 'Bachelor of Science in Customs Administration (BSCA)',
						value: 'Bachelor of Science in Customs Administration (BSCA)'
					}
					,
					{
						text: 'Bachelor of Science in Foreign Service (BS Foreign Service)',
						value: 'Bachelor of Science in Foreign Service (BS Foreign Service)'
					}
					,
					{
						text: 'Bachelor of Science in International Studies(BSIS)',
						value: 'Bachelor of Science in International Studies(BSIS)'
					}
					,
					{
						text: 'Bachelor of Public Administration (BPA)',
						value: 'Bachelor of Public Administration (BPA)'
					}
					,
					{
						text: 'Bachelor of Science in Public Safety (BSPS)',
						value: 'Bachelor of Science in Public Safety (BSPS)'
					}
					,
					{
						text: 'Bachelor of Science in Social Work (BS Social Work)',
						value: 'Bachelor of Science in Social Work (BS Social Work)'
					}
					,
					{
						text: 'Bachelor of Science in Marine Transportation (BSMT)',
						value: 'Bachelor of Science in Marine Transportation (BSMT)'
					}
					,
					{
						text: 'Bachelor of Science in Food Technology (BS Food Tech)',
						value: 'Bachelor of Science in Food Technology (BS Food Tech)'
					}
					,
					{
						text: 'Bachelor of Science in Nutrition and Dietetics (BS Nutrition and Dietetics)',
						value: 'Bachelor of Science in Nutrition and Dietetics (BS Nutrition and Dietetics)'
					},
					{
						text: 'N/A',
						value: 'N/A'
					},
				],
				college:
				[
					{
						text: 'Bachelor of Science in Medical Technology (BS Med Tech)',
						value: 'Bachelor of Science in Medical Technology (BS Med Tech)'
					},
					{
						text: 'Bachelor of Science in Midwifery (BS Midwifery)',
						value: 'Bachelor of Science in Midwifery (BS Midwifery)'
					},
					{
						text: 'Bachelor of Science in Nursing (BSN)',
						value: 'Bachelor of Science in Nursing (BSN)'
					},
					{
						text: 'Bachelor of Science in Occupational Therapy (BSOT)',
						value: 'Bachelor of Science in Occupational Therapy (BSOT)'
					},
					{
						text: 'Bachelor of Science in Pharmacy (BS Pharmacy)',
						value: 'Bachelor of Science in Pharmacy (BS Pharmacy)'
					},
					{
						text: 'Bachelor of Science in Physical Therapy (BSPT)',
						value: 'Bachelor of Science in Physical Therapy (BSPT)'
					},
					{
						text: 'Bachelor of Science in Radiologic Technology (BS Rad Tech)',
						value: 'Bachelor of Science in Radiologic Technology (BS Rad Tech)'
					},
					{
						text: 'Bachelor of Science in Respiratory Therapy (BSRT)',
						value: 'Bachelor of Science in Respiratory Therapy (BSRT)'
					},
					{
						text: 'Bachelor of Science in Speech-Language Pathology',
						value: 'Bachelor of Science in Speech-Language Pathology'
					},
					{
						text: 'Bachelor of Science in Sports Science',
						value: 'Bachelor of Science in Sports Science'
					},
					{
						text: 'Bachelor of Science in Computer Science (BSCS)',
						value: 'Bachelor of Science in Computer Science (BSCS)'
					},
					{
						text: 'Bachelor of Science in Information Technology (BSIT)',
						value: 'Bachelor of Science in Information Technology (BSIT)'
					},
					{
						text: 'Bachelor of Science in Information Systems (BSIS)',
						value: 'Bachelor of Science in Information Systems (BSIS)'
					},
					{
						text: 'Bachelor of Science in Mathematics (BS Mathematics)',
						value: 'Bachelor of Science in Mathematics (BS Mathematics)'
					},
					{
						text: 'Bachelor of Science in Applied Mathematics (BS Applied Math)',
						value: 'Bachelor of Science in Applied Mathematics (BS Applied Math)'
					},
					{
						text: 'Bachelor of Science in Statistics (BS Stat)',
						value: 'Bachelor of Science in Statistics (BS Stat)'
					},
					{
						text: 'Bachelor of Science in Agriculture',
						value: 'Bachelor of Science in Agriculture'
					},
					{
						text: 'Bachelor of Science in Agribusiness (BS Agribusiness)',
						value: 'Bachelor of Science in Agribusiness (BS Agribusiness)'
					},
					{
						text: 'Bachelor of Science in Agroforestry (BS Agroforestry)',
						value: 'Bachelor of Science in Agroforestry (BS Agroforestry)'
					},
					{
						text: 'Bachelor of Science in Architecture (BS Architecture)',
						value: 'Bachelor of Science in Architecture (BS Architecture)'
					},
					{
						text: 'Bachelor in Landscape Architecture (BLA)',
						value: 'Bachelor in Landscape Architecture (BLA)'
					},
					{
						text: 'Bachelor of Science in Interior Design (BS Interior Design)',
						value: 'Bachelor of Science in Interior Design (BS Interior Design)'
					},
					{
						text: 'Bachelor of Science in Accountancy (BSA)',
						value: 'Bachelor of Science in Accountancy (BSA)'
					},
					{
						text: 'Bachelor of Science in Accounting Technology (BSAcT)',
						value: 'Bachelor of Science in Accounting Technology (BSAcT)'
					},
					{
						text: 'Bachelor of Science in Business Administration ',
						value: 'Bachelor of Science in Business Administration '
					},
					{
						text: 'Bachelor of Science in Business Administration Major in Business Economics (BSBA)',
						value: 'Bachelor of Science in Business Administration Major in Business Economics (BSBA)'
					},
					{
						text: 'Bachelor of Science in Business Administration Major in Financial Management (BSBA major in FM)',
						value: 'Bachelor of Science in Business Administration Major in Financial Management (BSBA major in FM)'
					},
					{
						text: 'Bachelor of Science in Business Administration Major in Human Resource Development (BSBA major in HRDM)',
						value: 'Bachelor of Science in Business Administration Major in Human Resource Development (BSBA major in HRDM)'
					},
					{
						text: 'Bachelor of Science in Business Administration Major in Marketing Management (BSBA major in MM)',
						value: 'Bachelor of Science in Business Administration Major in Marketing Management (BSBA major in MM)'
					},
					{
						text: 'Bachelor of Science in Business Administration Major in Operations Management (BSBA major in OM)',
						value: 'Bachelor of Science in Business Administration Major in Operations Management (BSBA major in OM)'
					}
					,
					{
						text: 'Bachelor of Science in Bachelor of Science in Hotel and Restaurant Management (BS HRM)',
						value: 'Bachelor of Science in Bachelor of Science in Hotel and Restaurant Management (BS HRM)'
					}
					,
					{
						text: 'Bachelor of Science in Entrepreneurship (BS Entrep)',
						value: 'Bachelor of Science in Entrepreneurship (BS Entrep)'
					}
					,
					{
						text: 'Bachelor of Science in Office Administration (BSOA)',
						value: 'Bachelor of Science in Office Administration (BSOA)'
					},
					{
						text: 'Bachelor of Science in Real Estate Management (BS REM)',
						value: 'Bachelor of Science in Real Estate Management (BS REM)'
					}
					,
					{
						text: 'Bachelor of Science in Tourism Management (BSTM)',
						value: 'Bachelor of Science in Tourism Management (BSTM)'
					}
					,
					{
						text: 'Bachelor in Secondary Education (BSED)',
						value: 'Bachelor in Secondary Education (BSED)'
					}
					,
					{
						text: 'Bachelor in Elementary Education (BEED)',
						value: 'Bachelor in Elementary Education (BEED)'
					},
					{
						text: 'Bachelor in Secondary Education Major in Technology and Livelihood Education (BSED)',
						value: 'Bachelor in Secondary Education Major in Technology and Livelihood Education (BSED)'
					}
					,
					{
						text: 'Bachelor in Secondary Education Major in Biological Sciences (BSED)',
						value: 'Bachelor in Secondary Education Major in Biological Sciences (BSED)'
					}
					,
					{
						text: 'Bachelor in Secondary Education Major in English (BSED)',
						value: 'Bachelor in Secondary Education Major in English (BSED)'
					}
					,
					{
						text: 'Bachelor in Secondary Education Major in Filipino (BSED)',
						value: 'Bachelor in Secondary Education Major in Filipino (BSED)'
					},
					{
						text: 'Bachelor in Secondary Education Major in Mathematics (BSED)',
						value: 'Bachelor in Secondary Education Major in Mathematics (BSED)'
					}
					,
					{
						text: 'Bachelor in Secondary Education Major in Islamic Studies (BSED)',
						value: 'Bachelor in Secondary Education Major in Islamic Studies (BSED)'
					}
					,
					{
						text: 'Bachelor in Secondary Education Major in Music, Arts, Physical and Health Education (BSED)',
						value: 'Bachelor in Secondary Education Major in Music, Arts, Physical and Health Education (BSED)'
					}
					,
					{
						text: 'Bachelor in Secondary Education Major in Physical Sciences (BSED)',
						value: 'Bachelor in Secondary Education Major in Physical Sciences (BSED)'
					},
					{
						text: 'Bachelor in Secondary Education Major in Social Studies (BSED)',
						value: 'Bachelor in Secondary Education Major in Social Studies (BSED)'
					}
					,
					{
						text: 'Bachelor in Secondary Education Major in Values Education (BSED)',
						value: 'Bachelor in Secondary Education Major in Values Education (BSED)'
					}
					,
					{
						text: 'Bachelor in Elementary Education Major in Preschool Education (BEED)',
						value: 'Bachelor in Elementary Education Major in Preschool Education (BEED)'
					}
					,
					{
						text: 'Bachelor in Elementary Education Major in Special Education (BEED)',
						value: 'Bachelor in Elementary Education Major in Special Education (BEED)'
					},
					{
						text: 'Bachelor of Library and Information Science in the Philippines (BLIS)',
						value: 'Bachelor of Library and Information Science in the Philippines (BLIS)'
					}
					,
					{
						text: 'Bachelor of Physical Education (BPE)',
						value: 'Bachelor of Physical Education (BPE)'
					}
					,
					{
						text: 'Bachelor of Science in Aeronautical Engineering (BS AeroE)',
						value: 'Bachelor of Science in Aeronautical Engineering (BS AeroE)'
					}
					,
					{
						text: 'Bachelor of Science in Ceramic Engineering (BSCerE)',
						value: 'Bachelor of Science in Ceramic Engineering (BSCerE)'
					}
					,
					{
						text: 'Bachelor of Science in Chemical Engineering (BSChE)',
						value: 'Bachelor of Science in Chemical Engineering (BSChE)'
					}
					,
					{
						text: 'Bachelor of Science in Civil Engineering (BSCE)',
						value: 'Bachelor of Science in Civil Engineering (BSCE)'
					}
					,
					{
						text: 'Bachelor of Science in Computer Engineering (BSCpE)',
						value: 'Bachelor of Science in Computer Engineering (BSCpE)'
					}
					,
					{
						text: 'Bachelor of Science in Electrical Engineering (BSEE)',
						value: 'Bachelor of Science in Electrical Engineering (BSEE)'
					}
					,
					{
						text: 'Bachelor of Science in Electronics and Communications Engineering (BSECE)',
						value: 'Bachelor of Science in Electronics and Communications Engineering (BSECE)'
					}
					,
					{
						text: 'Bachelor of Science in Geodetic Engineering (BSGE)',
						value: 'Bachelor of Science in Geodetic Engineering (BSGE)'
					}
					,
					{
						text: 'Bachelor of Science in Geological Engineering (BSGeoE)',
						value: 'Bachelor of Science in Geological Engineering (BSGeoE)'
					}
					,
					{
						text: 'Bachelor of Science in Marine Engineering in (BSMarE)',
						value: 'Bachelor of Science in Marine Engineering in (BSMarE)'
					}
					,
					{
						text: 'Bachelor of Science in Materials Engineering (BSMatE)',
						value: 'Bachelor of Science in Materials Engineering (BSMatE)'
					}
					,
					{
						text: 'Bachelor of Science in Mechanical Engineering (BSME)',
						value: 'Bachelor of Science in Mechanical Engineering (BSME)'
					}
					,
					{
						text: 'Bachelor of Science in Metallurgical Engineering (BSMetE)',
						value: 'Bachelor of Science in Metallurgical Engineering (BSMetE)'
					}
					,
					{
						text: 'Bachelor of Science in Mining Engineering (BSEM)',
						value: 'Bachelor of Science in Mining Engineering (BSEM)'
					}
					,
					{
						text: 'Bachelor of Science in Petroleum Engineering (BSPetE)',
						value: 'Bachelor of Science in Petroleum Engineering (BSPetE)'
					}
					,
					{
						text: 'Bachelor of Science in Sanitary Engineering (BSSE)',
						value: 'Bachelor of Science in Sanitary Engineering (BSSE)'
					}
					,
					{
						text: 'Bachelor of Arts in Broadcasting (AB Broadcasting)',
						value: 'Bachelor of Arts in Broadcasting (AB Broadcasting)'
					}
					,
					{
						text: 'Bachelor of Arts in Communication (AB Communication)',
						value: 'Bachelor of Arts in Communication (AB Communication)'
					}
					,
					{
						text: 'Bachelor of Science in in Development Communication (BS DevComm)',
						value: 'Bachelor of Science in in Development Communication (BS DevComm)'
					}
					,
					{
						text: 'Bachelor of Arts in Journalism (AB Journalism)',
						value: 'Bachelor of Arts in Journalism (AB Journalism)'
					}
					,
					{
						text: 'Bachelor of Arts in Mass Communication',
						value: 'Bachelor of Arts in Mass Communication'
					}
					,
					{
						text: 'Bachelor of Science in Community Development (BS Community Development)',
						value: 'Bachelor of Science in Community Development (BS Community Development)'
					}
					,
					{
						text: 'Bachelor of Science in Customs Administration (BSCA)',
						value: 'Bachelor of Science in Customs Administration (BSCA)'
					}
					,
					{
						text: 'Bachelor of Science in Foreign Service (BS Foreign Service)',
						value: 'Bachelor of Science in Foreign Service (BS Foreign Service)'
					}
					,
					{
						text: 'Bachelor of Science in International Studies(BSIS)',
						value: 'Bachelor of Science in International Studies(BSIS)'
					}
					,
					{
						text: 'Bachelor of Public Administration (BPA)',
						value: 'Bachelor of Public Administration (BPA)'
					}
					,
					{
						text: 'Bachelor of Science in Public Safety (BSPS)',
						value: 'Bachelor of Science in Public Safety (BSPS)'
					}
					,
					{
						text: 'Bachelor of Science in Social Work (BS Social Work)',
						value: 'Bachelor of Science in Social Work (BS Social Work)'
					}
					,
					{
						text: 'Bachelor of Science in Marine Transportation (BSMT)',
						value: 'Bachelor of Science in Marine Transportation (BSMT)'
					}
					,
					{
						text: 'Bachelor of Science in Food Technology (BS Food Tech)',
						value: 'Bachelor of Science in Food Technology (BS Food Tech)'
					}
					,
					{
						text: 'Bachelor of Science in Nutrition and Dietetics (BS Nutrition and Dietetics)',
						value: 'Bachelor of Science in Nutrition and Dietetics (BS Nutrition and Dietetics)'
					}
					,
					{
						text: 'N/A',
						value: 'N/A'
					},

				],
				graduate:
				[
					{
						text: 'Anthropology (MA, PhD)',
						value: 'Anthropology (MA, PhD)'
					},
					{
						text: 'Applied Mathematics (MS, PhD)',
						value: 'Applied Mathematics (MS, PhD)'
					},
					{
						text: 'Applied Mathematics/Actuarial Science (PM)',
						value: 'Applied Mathematics/Actuarial Science (PM)'
					},
					{
						text: 'Araling Pilipino (MA)',
						value: 'Araling Pilipino (MA)'
					},
					{
						text: 'Archaeology (Dip, MA, MS, PhD)',
						value: 'Archaeology (Dip, MA, MS, PhD)'
					},
					{
						text: 'Architecture (M)',
						value: 'Architecture (M)'
					},
					{
						text: 'Archives and Records Management (M)',
						value: 'Archives and Records Management (M)'
					},
					{
						text: 'Art History, Art Theory and Criticism, Curatorial Studies (MA)',
						value: 'Art History, Art Theory and Criticism, Curatorial Studies (MA)'
					},
					{
						text: 'Artificial Intelligence (MEng, PhD)',
						value: 'Artificial Intelligence (MEng, PhD)'
					},
					{
						text: 'Asian Studies (M, MA)',
						value: 'Asian Studies (M, MA)'
					},
					{
						text: 'Biology (Dip, MS, PhD)',
						value: 'Biology (Dip, MS, PhD)'
					},
					{
						text: 'Business Administration (MBA, DBA)',
						value: 'Business Administration (MBA, DBA)'
					},
					{
						text: 'Chemical Engineering (MS, PhD)',
						value: 'Chemical Engineering (MS, PhD)'
					},
					{
						text: 'Chemistry (Dip, MS, PhD)',
						value: 'Chemistry (Dip, MS, PhD)'
					},{
						text: 'Chemical Education (MS, PhD)',
						value: 'Chemical Education (MS, PhD)'
					},
					{
						text: 'Civil Engineering (MS, PhD)',
						value: 'Civil Engineering (MS, PhD)'
					},
					{
						text: 'Communication (MA, PhD)',
						value: 'Communication (MA, PhD)'
					},
					{
						text: 'Community Development (Dip, M)',
						value: 'Community Development (Dip, M)'
					},
					{
						text: 'Comparative Literature (MA, PhD)',
						value: 'Comparative Literature (MA, PhD)'
					},
					{
						text: 'Computer Science (MS, PhD)',
						value: 'Computer Science (MS, PhD)'
					},
					{
						text: 'Creative and Musical Performing Arts (Dip)',
						value: 'Creative and Musical Performing Arts (Dip)'
					},
					{
						text: 'Creative Writing (MA, PhD)',
						value: 'Creative Writing (MA, PhD)'
					},
					{
						text: 'Data Science (PhD)',
						value: 'Data Science (PhD)'
					},
					{
						text: 'Demography (MA)',
						value: 'Demography (MA)'
					},
					{
						text: 'Development Economics (M)',
						value: 'Development Economics (M)'
					},
					{
						text: 'Early Childhood Development (Dip)',
						value: 'Early Childhood Development (Dip)'
					},
					{
						text: 'Economics (MA, PhD)',
						value: 'Economics (MA, PhD)'
					},
					{
						text: 'Education (MA, PhD)',
						value: 'Education (MA, PhD)'
					},
					{
						text: 'Electrical Engineering (M, MS, PhD)',
						value: 'Electrical Engineering (M, MS, PhD)'
					},
					{
						text: 'English Studies: Anglo-American Literature (MA, PhD)',
						value: 'English Studies: Anglo-American Literature (MA, PhD)'
					},
					{
						text: 'English Studies: Language (MA, PhD)',
						value: 'English Studies: Language (MA, PhD)'
					},
					{
						text: 'Environmental Engineering (MS, PhD)',
						value: 'Environmental Engineering (MS, PhD)'
					},
					{
						text: 'Environmental Science (MS, PhD)',
						value: 'Environmental Science (MS, PhD)'
					},
					{
						text: 'European Languages (MA French, German, Spanish)',
						value: 'European Languages (MA French, German, Spanish)'
					},
					{
						text: 'Exercise and Sport Science (Dip)',
						value: 'Exercise and Sport Science (Dip)'
					},
					{
						text: 'Family Life and Child Development (MA)',
						value: 'Family Life and Child Development (MA)'
					},
					{
						text: 'Filipino: Pagsasalin, Wika (MA, PhD)',
						value: 'Filipino: Pagsasalin, Wika (MA, PhD)'
					},
					{
						text: 'Finance (MS)',
						value: 'Finance (MS)'
					},
					{
						text: 'Fine Arts (M)',
						value: 'Fine Arts (M)'
					},
					{
						text: 'Food Science (MS, PhD),/p',
						value: 'Food Science (MS, PhD),/p'
					},
					{
						text: 'Geomatics Engineering (MS: Remote Sensing and Photogrammetry, Applied Geodesy, Geoinformatics)',
						value: 'Geomatics Engineering (MS: Remote Sensing and Photogrammetry, Applied Geodesy, Geoinformatics)'
					},
					{
						text: 'Geography (MS)',
						value: 'Geography (MS)'
					},
					{
						text: 'Hispanic Literature (PhD)',
						value: 'Hispanic Literature (PhD)'
					},
					{
						text: 'History (MA, PhD)',
						value: 'History (MA, PhD)'
					},
					{
						text: 'Home Economics (MA, PhD)',
						value: 'Home Economics (MA, PhD)'
					},
					{
						text: 'Hotel, Restaurant and Institution Management (M)',
						value: 'Hotel, Restaurant and Institution Management (M)'
					},
					{
						text: 'Human Movement Science (MS)',
						value: 'Human Movement Science (MS)'
					},
					{
						text: 'Industrial Engineering (Dip, MS)',
						value: 'Industrial Engineering (Dip, MS)'
					},
					{
						text: 'Industrial Relations (Dip, M)',
						value: 'Industrial Relations (Dip, M)'
					},
					{
						text: 'Interior Design (MA)',
						value: 'Interior Design (MA)'
					},
					{
						text: 'International Studies (MA)',
						value: 'International Studies (MA)'
					},
					{
						text: 'Islamic Studies (MA)',
						value: 'Islamic Studies (MA)'
					},
					{
						text: 'Journalism (MA)',
						value: 'Journalism (MA)'
					},
					{
						text: 'Librarianship (Dip)',
						value: 'Librarianship (Dip)'
					},
					{
						text: 'Library and Information Science (M, MS)',
						value: 'Library and Information Science (M, MS)'
					},
					{
						text: 'Linguistics (MA, PhD)',
						value: 'Linguistics (MA, PhD)'
					},
					{
						text: 'Malikhaing Pagsulat (MA, PhD)',
						value: 'Malikhaing Pagsulat (MA, PhD)'
					},
					{
						text: 'Management (M)',
						value: 'Management (M)'
					},
					{
						text: 'Marine Science (MS, PhD)',
						value: 'Marine Science (MS, PhD)'
					},
					{
						text: 'Materials Science and Engineering (MS, PhD)',
						value: 'Materials Science and Engineering (MS, PhD)'
					},
					{
						text: 'Mathematics (MS, PhD)',
						value: 'Mathematics (MS, PhD)'
					},
					{
						text: 'Media Studies (MA, PhD)',
						value: 'Media Studies (MA, PhD)'
					},
					{
						text: 'Mechanical Engineering (MS, PhD)',
						value: 'Mechanical Engineering (MS, PhD)'
					},
					{
						text: 'Metallurgical Engineering (MS)',
						value: 'Metallurgical Engineering (MS)'
					},
					{
						text: 'Meteorology (MS, PhD)',
						value: 'Meteorology (MS, PhD)'
					},
					{
						text: 'Microbiology (MS)',
						value: 'Microbiology (MS)'
					},
					{
						text: 'Molecular Biology and Biotechnology (MS, PhD)',
						value: 'Molecular Biology and Biotechnology (MS, PhD)'
					},
					{
						text: 'Music (MA, PhD)',
						value: 'Music (MA, PhD)'
					},
					{
						text: 'Nutrition (MA)',
						value: 'Nutrition (MA)'
					},
					{
						text: 'Pagsasalin (MA)',
						value: 'Pagsasalin (MA)'
					},
					{
						text: 'Panitikan (MA)',
						value: 'Panitikan (MA)'
					},
					{
						text: 'Panitikan ng Pilipinas (MA)',
						value: 'Panitikan ng Pilipinas (MA)'
					},
					{
						text: 'Performance Studies (PhD)',
						value: 'Performance Studies (PhD)'
					},
					{
						text: 'Philippine Studies (MA, PhD)',
						value: 'Philippine Studies (MA, PhD)'
					},
					{
						text: 'Philosophy (MA, PhD)',
						value: 'Philosophy (MA, PhD)'
					},
					{
						text: 'Physics (MA, MS, PhD)',
						value: 'Physics (MA, MS, PhD)'
					},
					{
						text: 'Political Science (MA, PhD)',
						value: 'Political Science (MA, PhD)'
					},
					{
						text: 'Population Studies (M)',
						value: 'Population Studies (M)'
					},
					{
						text: 'Psychology (MA, PhD)',
						value: 'Psychology (MA, PhD)'
					},
					{
						text: 'Public Administration (MPA, DPA)',
						value: 'Public Administration (MPA, DPA)'
					},
					{
						text: 'Public Management (Dip)',
						value: 'Public Management (Dip)'
					},
					{
						text: 'Regional Development Planning (MS)',
						value: 'Regional Development Planning (MS)'
					},
					{
						text: 'Social Development (DSD)',
						value: 'Social Development (DSD)'
					},
					{
						text: 'Social Work (Dip, MA)',
						value: 'Social Work (Dip, MA)'
					},
					{
						text: 'Sociology (MA, PhD)',
						value: 'Sociology (MA, PhD)'
					},
					{
						text: 'Speech Communication (MA)',
						value: 'Speech Communication (MA)'
					},
					{
						text: 'Statistics (M, MS, PhD)',
						value: 'Statistics (M, MS, PhD)'
					},
					{
						text: 'Technology Management (M)',
						value: 'Technology Management (M)'
					},
					{
						text: 'Theatre Arts (MA)',
						value: 'Theatre Arts (MA)'
					},
					{
						text: 'Tourism Development and Management (Dip, MS)',
						value: 'Tourism Development and Management (Dip, MS)'
					},
					{
						text: 'Tropical Landscape Architecture (M)',
						value: 'Tropical Landscape Architecture (M)'
					},
					{
						text: 'Urban and Regional Planning (Dip, MA, PhD)',
						value: 'Urban and Regional Planning (Dip, MA, PhD)'
					},
					{
						text: 'Voluntary Sector Management (Dip)',
						value: 'Voluntary Sector Management (Dip)'
					},
					{
						text: 'Women and Development (Dip, MA)',
						value: 'Women and Development (Dip, MA)'
					},
					{
						text: 'Wika (MA, PhD)',
						value: 'Wika (MA, PhD)'
					},
					{
						text: 'N/A',
						value: 'N/A'
					},
					
				]
			},
		};
	},
	methods: {
		addMoreField() {
			this.$emit('addMoreField');
		},
		removeField(index){
			this.$emit('removeField', index);
		}
	},

};
</script>

<style></style>
