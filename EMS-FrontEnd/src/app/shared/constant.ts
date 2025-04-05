const API_ENDPOINTS = {
  serviceName_login: 'auth/login',
  serviceNaame_VerifyEmail: 'auth/verify-email',
  serviceNaame_sendOtp: 'auth/send-otp',
  serviceNaame_resendOtp: 'auth/resend-otp',
  serviceNaame_verifyOtp: 'auth/verify-otp',
  serviceNaame_resetPassword: 'auth/reset-password',
  serviceNaame_createRole: 'auth/create-role',
  serviceNaame_getAllRoles: 'auth/getall-roles',
  serviceNaame_roleWise_Menu: 'menu/getrole-wise-menu',
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
