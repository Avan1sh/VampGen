// Authentication utility functions

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  createdAt: Date
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface SignUpCredentials extends LoginCredentials {
  firstName: string
  lastName: string
  confirmPassword: string
}

export interface AuthResponse {
  user: User
  token: string
}

// Mock authentication functions - replace with real API calls
export const authService = {
  // Login function
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Mock validation
    if (credentials.email === 'test@example.com' && credentials.password === 'password123') {
      return {
        user: {
          id: '1',
          email: credentials.email,
          firstName: 'Test',
          lastName: 'User',
          createdAt: new Date()
        },
        token: 'mock-jwt-token'
      }
    }
    
    throw new Error('Invalid credentials')
  },

  // Sign up function
  async signUp(credentials: SignUpCredentials): Promise<AuthResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Mock user creation
    return {
      user: {
        id: Date.now().toString(),
        email: credentials.email,
        firstName: credentials.firstName,
        lastName: credentials.lastName,
        createdAt: new Date()
      },
      token: 'mock-jwt-token'
    }
  },

  // Logout function
  async logout(): Promise<void> {
    // Clear local storage or cookies
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken')
      localStorage.removeItem('user')
    }
  },

  // Get current user from storage
  getCurrentUser(): User | null {
    if (typeof window === 'undefined') return null
    
    const userStr = localStorage.getItem('user')
    return userStr ? JSON.parse(userStr) : null
  },

  // Save auth data to storage
  saveAuthData(response: AuthResponse): void {
    if (typeof window === 'undefined') return
    
    localStorage.setItem('authToken', response.token)
    localStorage.setItem('user', JSON.stringify(response.user))
  },

  // Check if user is authenticated
  isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false
    
    const token = localStorage.getItem('authToken')
    return !!token
  }
}

// Form validation utilities
export const validators = {
  email: (email: string): string | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email) return 'Email is required'
    if (!emailRegex.test(email)) return 'Please enter a valid email address'
    return null
  },

  password: (password: string): string | null => {
    if (!password) return 'Password is required'
    if (password.length < 6) return 'Password must be at least 6 characters'
    if (password.length > 128) return 'Password must be less than 128 characters'
    return null
  },

  confirmPassword: (password: string, confirmPassword: string): string | null => {
    if (!confirmPassword) return 'Please confirm your password'
    if (password !== confirmPassword) return 'Passwords do not match'
    return null
  },

  name: (name: string, fieldName: string): string | null => {
    if (!name) return `${fieldName} is required`
    if (name.length < 2) return `${fieldName} must be at least 2 characters`
    if (name.length > 50) return `${fieldName} must be less than 50 characters`
    return null
  }
}
