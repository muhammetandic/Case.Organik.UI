import { apiRequest } from './client.js'

export const login = (credentials) => apiRequest('/login', { body: credentials })

export const register = (payload) => apiRequest('/register', { body: payload })

export const sendCode = (payload) => apiRequest('/send-code', { body: payload })

export const checkCode = (payload) => apiRequest('/check-code', { body: payload })
