const API_ENDPOINTS = {
  SERVICE_LOGIN: 'auth/login',
  SERVICE_VERIFYEMAIL: 'auth/verify-email',
  SERVICE_SENDOTP: 'auth/send-otp',
  SERVICE_RESENDOTP: 'auth/resend-otp',
  SERVICE_VERIFYOTP: 'auth/verify-otp',
  SERVICE_RESETPASSWORD: 'auth/reset-password',
  SERVICE_LOG_OUT: 'auth/log-out',
  SERVICE_CREATEROLE: 'auth/create-role',
  SERVICE_GETALLROLES: 'auth/getall-roles',
  SERVICE_ROLEWISEMENUS: 'menu/getrole-wise-menu',
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
