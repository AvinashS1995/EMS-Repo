const API_ENDPOINTS = {
    serviceName_login: 'auth/Login',
    serviceNaame_VerifyEmail: 'auth/VerifyEmail',
    serviceNaame_sendOtp: 'auth/sendOtp',
    serviceNaame_resendOtp: 'auth/resendOtp',
    serviceNaame_verifyOtp: 'auth/verifyOtp',
    serviceNaame_resetPassword: 'auth/resetPassword',

}

// Use regex for JavaScript ('\' is a escape charector hence use it twice)
const REGEX = {
    PASSWORD_REGEX: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
}

export {API_ENDPOINTS, REGEX}