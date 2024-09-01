import type { ActionFailure } from '@sveltejs/kit'

export interface User {
  dob?: {
    date?: number
    month?: number
    year?: number
  }
  gender?: 'male' | 'female' | 'other'
  bloodType?: 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-'
}

export interface Health {
  error: false
  date: Date
  user: User
}

export type HealthSuccess = {
  data: Health
}

export type HealthError = ActionFailure<{
  error: true
  message: string
}>

export type HealthResponse = HealthSuccess | HealthError
