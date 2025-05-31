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
  SERVICE_ROLEWISEMENUS: 'menu/getrole-wise-menu',
  SERVICE_GETALLSTATUS: 'auth/getall-status',
  SERVICE_SEND_CHECK_INS_OTP: 'attendence/send-check-ins-otp',
  SERVICE_VERIFY_CHECK_INS_OTP: 'attendence/verify-check-ins-otp',
  SERVICE_CHECK_OUT_ATTENDENCE: 'attendence/check-out',
  SERVICE_WORK_SUMMARY_ATTENDENCE: 'attendence/work-summary',
  SERVICE_GET_USER_ATTENDENCE: 'attendence/get-attendence-list',
  SERVICE_GET_USER_ATTENDENCE_TODAY_SUMMARY: 'attendence/get-attendence-summary',
};

// Use regex for JavaScript ('\' is a escape charector hence use it twice)
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
