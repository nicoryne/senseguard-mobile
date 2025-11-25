/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate password strength
 */
export const isValidPassword = (password: string): boolean => {
  // At least 8 characters, one uppercase, one lowercase, one number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
  return passwordRegex.test(password)
}

/**
 * Validate phone number
 */
export const isValidPhone = (phone: string): boolean => {
  // Basic phone validation (10 digits)
  const phoneRegex = /^\d{10}$/
  return phoneRegex.test(phone.replace(/\D/g, ''))
}

/**
 * Validate required field
 */
export const isRequired = (value: string | null | undefined): boolean => {
  return value !== null && value !== undefined && value.trim().length > 0
}

/**
 * Validate pressure value
 */
export const isValidPressure = (pressure: number): boolean => {
  return pressure >= 0 && pressure <= 1000
}

/**
 * Validate gait score
 */
export const isValidGaitScore = (score: number): boolean => {
  return score >= 0 && score <= 100
}

