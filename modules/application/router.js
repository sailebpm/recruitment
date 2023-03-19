const path = require('path')

module.exports = function registerModule(moduleOptions) {

    this.nuxt.hook('components:dirs', (dirs) => {
        dirs.push({
            path: path.resolve(__dirname, 'components')
        })
    })

    this.extendRoutes((routes) => {
        routes.unshift(
            {
                name: 'application',
                path: '/application',
                component: path.resolve(__dirname, 'pages/index.vue'),
                children: [
                    { 
                        path: '/',
                        redirect: { name: 'application.applicant-info' },
                    },
                    { 
                        path: 'applicant-information',
                        name: 'application.applicant-info',
                        component: path.resolve(__dirname, 'pages/application-steps/applicant-information.vue')
                    },

                    //step 1.1

                    { 
                        path: 'initial_interview_schedule',
                        name: 'application.initial_interview_schedule',
                        component: path.resolve(__dirname, 'pages/application-steps/initial_interview_schedule.vue')
                    },

                    { 
                        path: 'initial-interview-status',
                        name: 'application.initial-interview-status',
                        component: path.resolve(__dirname, 'pages/application-steps/initial-interview-status.vue')
                    },

                    { 
                        path: 'exam-schedule',
                        name: 'application.exam-schedule',
                        component: path.resolve(__dirname, 'pages/application-steps/exam-schedule.vue')
                    },
                    { 
                        path: 'exam-status',
                        name: 'application.exam-status',
                        component: path.resolve(__dirname, 'pages/application-steps/exam-status.vue')
                    },
                    
                    { 
                        path: 'interview-schedule',
                        name: 'application.interview-schedule',
                        component: path.resolve(__dirname, 'pages/application-steps/interview-schedule.vue')
                    },
                    { 
                        path: 'interview-status',
                        name: 'application.interview-status',
                        component: path.resolve(__dirname, 'pages/application-steps/interview-status.vue')
                    },
                    { 
                        path: 'congratulatory',
                        name: 'application.congratulatory',
                        component: path.resolve(__dirname, 'pages/application-steps/congratulatory.vue')
                    },

                    { 
                        path: 'submission_of_requirements',
                        name: 'application.submission_of_requirements',
                        component: path.resolve(__dirname, 'pages/application-steps/submission_of_requirements.vue')
                    },
                    { 
                        path: 'appointment-schedule',
                        name: 'application.appointment-schedule',
                        component: path.resolve(__dirname, 'pages/application-steps/appointment-schedule.vue')
                    },
                ]
            }
        )
    })
}