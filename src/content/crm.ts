/**
 * CRM User Types and Mock Data
 */

export interface User {
  id: number
  name: string
}

// Current user
export const CURRENT_USER_ID = 2

// Mock CRM Users
export const users: User[] = [
  { id: 1, name: 'John Smith' },
  { id: 2, name: 'Den Irkhin' }, // Current user
  { id: 3, name: 'Emily Johnson' },
  { id: 4, name: 'Michael Williams' },
  { id: 5, name: 'Sarah Davis' },
  { id: 6, name: 'David Miller' },
  { id: 7, name: 'Jessica Wilson' },
  { id: 8, name: 'James Taylor' },
  { id: 9, name: 'Jennifer Brown' },
  { id: 10, name: 'Robert Anderson' },
]

// Helper function to get user by ID
export const getUserById = (id: number): User | undefined => {
  return users.find((user) => user.id === id)
}

// Helper function to get current user
export const getCurrentUser = (): User | undefined => {
  return getUserById(CURRENT_USER_ID)
}
