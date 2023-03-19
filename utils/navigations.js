import Vue from 'vue'

Vue.prototype.$navs = [
  {
    icon : 'home',
    title : 'Home',
    path : 'dashboard',
    exact : true,
    showNav : false,
    regex : /dashboard.*/i,
    allowed : [],
    submenu : []
  },
  {
    title : 'HR Management',
    icon : 'account-group',
    show : true,
    showNav : false,
    regex : /^[^.]*hr./i,
    allowed : [],
    submenu : [
      {
        text : 'Employee Profile',
        path : 'hr.employee_profile.list_of_active_employees',
        allowed : []
      },
      {
        text : 'Position & Salary Grade',
        path : 'hr.position_salary',
        allowed : []
      },
      {
        text : 'Seminars & Trainings',
        path : 'hr.trainings.invite_training',
        allowed : []
      },
      {
        text : 'Loans',
        path : 'hr.loans',
        allowed : []
      }
    ]
  },
  {
    title : 'Timekeeping',
    icon : 'clipboard-text-clock',
    show : true,
    showNav : false,
    regex : null,
    allowed : [],
    submenu : [
      {
        text : 'Schedules',
        path : 'schedule',
        allowed : []
      },
      {
        text : 'Attendance',
        path : 'attendance',
        allowed : []
      },
    ]
  },
  {
    title : 'Payroll',
    icon : 'cash',
    show : true,
    showNav : false,
    regex : null,
    allowed : [],
    submenu : []
  },
  {
    title : 'Recruitment',
    icon : 'account-search',
    show : true,
    showNav : false,
    regex : null,
    allowed : [],
    submenu : []
  },
  {
    title : 'Reports',
    icon : 'text-box-multiple',
    show : true,
    showNav : false,
    regex : null,
    allowed : [],
    submenu : []
  },
  {
    title : 'Approvals',
    icon : 'text-box-check',
    show : true,
    showNav : false,
    regex : null,
    allowed : [],
    submenu : []
  },
  {
    icon : 'cog',
    title : 'Setup',
    path : 'maintenance',
    exact : true,
    showNav : false,
    regex : /maintenance.*/i,
    allowed : [],
    submenu : []
  },
]