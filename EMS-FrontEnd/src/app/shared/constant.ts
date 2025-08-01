const API_ENDPOINTS = {
  SERVICE_LOGIN: 'auth/login',
  SERVICE_VERIFYEMAIL: 'auth/verify-email',
  SERVICE_SENDOTP: 'auth/send-otp',
  SERVICE_RESENDOTP: 'auth/resend-otp',
  SERVICE_VERIFYOTP: 'auth/verify-otp',
  SERVICE_RESETPASSWORD: 'auth/reset-password',
  SERVICE_LOG_OUT: 'auth/log-out',
  SERVICE_SAVE_NEW_USER: 'auth/register-user',
  SERVICE_GET_USER_LIST: 'auth/get-user-list',
  SERVICE_UPDATE_EMPLOYEE_LIST: 'auth/update-employee-list',
  SERVICE_DELETE_EMPLOYEE_LIST: 'auth/delete-employee-list',
  SERVICE_SAVEROLETYPE: 'auth/save-type-list',
  SERVICE_GETROLETYPE: 'auth/get-type-list',
  SERVICE_UPDATEROLETYPE: 'auth/update-type-list',
  SERVICE_DELETEROLETYPE: 'auth/delete-type-list',
  SERVICE_SAVE_MENU: 'menu/create-menu',
  SERVICE_GETMENUS: 'menu/getmenu', 
  SERVICE_SAVE_ROLE_WISE_MENUS: 'menu/create-role-wise-menu',
  SERVICE_ROLEWISEMENUS: 'menu/getrole-wise-menu',
  SERVICE_GETALLSTATUS: 'auth/getall-status',
  SERVICE_SEND_CHECK_INS_OTP: 'attendence/send-check-ins-otp',
  SERVICE_VERIFY_CHECK_INS_OTP: 'attendence/verify-check-ins-otp',
  SERVICE_CHECK_OUT_ATTENDENCE: 'attendence/check-out',
  SERVICE_WORK_SUMMARY_ATTENDENCE: 'attendence/work-summary',
  SERVICE_GET_USER_ATTENDENCE: 'attendence/get-attendence-list',
  SERVICE_GET_USER_ATTENDENCE_TODAY_SUMMARY: 'attendence/get-attendence-summary',
  SERVICE_GET_UPCOMING_HOLIDAYS: 'leave/get-upcoming-holidays',
  SERVICE_SAVE_EMPLOYEE_LEAVE: 'leave/save-employee-leave',
  SERVICE_GET_EMPLOYEE_LEAVE: 'leave/get-employee-all-leave',
  SERVICE_GET_EMPLOYEE_LEAVE_REQUEST_LIST: 'leave/get-empployee-leave-request-list',
  SERVICE_SAVE_EMPLOYEE_LEAVE_APPLICATION_APPROVE_REJECT: 'leave/employee-leave-application-approve-reject',
  SERVICE_APPLICATION_APPROVAL_FLOW: 'leave/application-approval-flow',
};

const REGEX = {

  MOBILE_NUMBER_REGEX: /^\d{10}$/,
  EMAIL_REGEX: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
};





enum ForgotPasswordStep {
  VERIFY_EMAIL,
  SEND_OTP,
  VERIFY_OTP,
  RESET_PASSWORD,
}

enum CheckInsStep {
  INITIAL,
  SEND_OTP
}

export { API_ENDPOINTS, REGEX, ForgotPasswordStep, CheckInsStep };
