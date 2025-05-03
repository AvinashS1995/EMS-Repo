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
};

// Use regex for JavaScript ('\' is a escape charector hence use it twice)
const REGEX = {
  PASSWORD_REGEX:
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$',
};

enum ForgotPasswordStep {
  VERIFY_EMAIL,
  SEND_OTP,
  VERIFY_OTP,
  RESET_PASSWORD,
}

export { API_ENDPOINTS, REGEX, ForgotPasswordStep };
