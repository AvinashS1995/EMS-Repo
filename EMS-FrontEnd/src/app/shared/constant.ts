const API_ENDPOINTS = {
    serviceName_login: 'api/auth/Login',
}

// Use regex for JavaScript ('\' is a escape charector hence use it twice)
const REGEX = {
    PASSWORD_REGEX: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
}

export {API_ENDPOINTS, REGEX}