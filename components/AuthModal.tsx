'use client'

import { useState } from 'react'
import { Button } from '@heroui/button'
import { Input } from '@heroui/input'
import { Link } from '@heroui/link'
import { Modal, ModalContent, ModalHeader, ModalBody } from '@heroui/react'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { useAuth } from '@/hooks/useAuth'
import { validators, type LoginCredentials, type SignUpCredentials } from '@/utils/auth'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  defaultMode?: 'login' | 'signup'
  onAuthSuccess?: () => void
}

export default function AuthModal({ isOpen, onClose, defaultMode = 'login', onAuthSuccess }: AuthModalProps) {
  const [isSignUp, setIsSignUp] = useState(defaultMode === 'signup')
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: ''
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isLoading, setIsLoading] = useState(false)
  const { login, signup } = useAuth()

  const toggleVisibility = () => setIsVisible(!isVisible)

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    // Email validation
    const emailError = validators.email(formData.email)
    if (emailError) newErrors.email = emailError

    // Password validation
    const passwordError = validators.password(formData.password)
    if (passwordError) newErrors.password = passwordError

    // Sign up specific validations
    if (isSignUp) {
      const firstNameError = validators.name(formData.firstName, 'First name')
      if (firstNameError) newErrors.firstName = firstNameError

      const lastNameError = validators.name(formData.lastName, 'Last name')
      if (lastNameError) newErrors.lastName = lastNameError

      const confirmPasswordError = validators.confirmPassword(formData.password, formData.confirmPassword)
      if (confirmPasswordError) newErrors.confirmPassword = confirmPasswordError
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    
    try {
      if (isSignUp) {
        const signUpData: SignUpCredentials = {
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          firstName: formData.firstName,
          lastName: formData.lastName
        }
        await signup(signUpData)
      } else {
        await login(formData.email, formData.password)
      }
      
      // Reset form on success
      setFormData({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: ''
      })
      
      // Call success callback
      onAuthSuccess?.()
      
      // Close modal
      onClose()
      
    } catch (error) {
      console.error('Authentication error:', error)
      setErrors({ 
        submit: error instanceof Error ? error.message : 'An error occurred. Please try again.' 
      })
    } finally {
      setIsLoading(false)
    }
  }

  const switchMode = () => {
    setIsSignUp(!isSignUp)
    setErrors({})
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: ''
    })
  }

  const handleClose = () => {
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: ''
    })
    setErrors({})
    setIsSignUp(defaultMode === 'signup')
    onClose()
  }

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={handleClose}
      placement="center"
      backdrop="blur"
      size="lg"
      classNames={{
        backdrop: "bg-black/50 backdrop-blur-sm",
        base: "border border-white/20 bg-gradient-to-br from-purple-900/90 via-blue-900/90 to-indigo-900/90 backdrop-blur-lg",
        header: "border-b border-white/20",
        body: "py-6",
        closeButton: "hover:bg-white/20 text-white"
      }}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <div className="flex items-center justify-between w-full">
            <div>
              <h2 className="text-2xl font-bold text-white">
                {isSignUp ? 'Create Account' : 'Welcome Back'}
              </h2>
              <p className="text-white/70 text-sm mt-1">
                {isSignUp 
                  ? 'Join Thrifty and start generating vampire characters'
                  : 'Sign in to your Thrifty account'
                }
              </p>
            </div>
          </div>
        </ModalHeader>
        
        <ModalBody>
          <form onSubmit={handleSubmit} className="space-y-4">
            {errors.submit && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3">
                <p className="text-red-200 text-sm">{errors.submit}</p>
              </div>
            )}

            {isSignUp && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="First Name"
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  isInvalid={!!errors.firstName}
                  errorMessage={errors.firstName}
                  classNames={{
                    input: "bg-white/10 text-white placeholder:text-white/50",
                    inputWrapper: "bg-white/10 border border-white/20 data-[hover=true]:border-white/40",
                    label: "text-white/80"
                  }}
                />
                <Input
                  label="Last Name"
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  isInvalid={!!errors.lastName}
                  errorMessage={errors.lastName}
                  classNames={{
                    input: "bg-white/10 text-white placeholder:text-white/50",
                    inputWrapper: "bg-white/10 border border-white/20 data-[hover=true]:border-white/40",
                    label: "text-white/80"
                  }}
                />
              </div>
            )}
            
            <Input
              label="Email"
              placeholder="Enter your email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              isInvalid={!!errors.email}
              errorMessage={errors.email}
              classNames={{
                input: "bg-white/10 text-white placeholder:text-white/50",
                inputWrapper: "bg-white/10 border border-white/20 data-[hover=true]:border-white/40",
                label: "text-white/80"
              }}
            />
            
            <Input
              label="Password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              isInvalid={!!errors.password}
              errorMessage={errors.password}
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <EyeSlashIcon className="h-5 w-5 text-white/60 pointer-events-none" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-white/60 pointer-events-none" />
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
              classNames={{
                input: "bg-white/10 text-white placeholder:text-white/50",
                inputWrapper: "bg-white/10 border border-white/20 data-[hover=true]:border-white/40",
                label: "text-white/80"
              }}
            />
            
            {isSignUp && (
              <Input
                label="Confirm Password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                isInvalid={!!errors.confirmPassword}
                errorMessage={errors.confirmPassword}
                type={isVisible ? "text" : "password"}
                classNames={{
                  input: "bg-white/10 text-white placeholder:text-white/50",
                  inputWrapper: "bg-white/10 border border-white/20 data-[hover=true]:border-white/40",
                  label: "text-white/80"
                }}
              />
            )}
            
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 transition-all duration-300"
              isLoading={isLoading}
              disabled={isLoading}
              size="lg"
            >
              {isLoading 
                ? (isSignUp ? 'Creating Account...' : 'Signing In...') 
                : (isSignUp ? 'Create Account' : 'Sign In')
              }
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-white/70">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}
              <Button
                variant="light"
                className="text-blue-300 hover:text-blue-200 ml-2 p-0 h-auto min-w-0 font-medium"
                onClick={switchMode}
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </Button>
            </p>
          </div>
          
          {!isSignUp && (
            <div className="mt-4 text-center">
              <Link 
                href="#" 
                className="text-blue-300 hover:text-blue-200 text-sm transition-colors"
              >
                Forgot your password?
              </Link>
            </div>
          )}
          
          <div className="mt-6 text-center">
            <p className="text-white/60 text-xs">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
