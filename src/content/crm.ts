/**
 * CRM Contact Types and Mock Data
 */

// Brand color enum for contacts
export enum ContactColor {
  GREEN = 'green',
  PURPLE = 'purple',
  BLUE = 'blue',
  YELLOW = 'yellow',
  PINK = 'pink',
  ORANGE = 'orange',
}

export interface Contact {
  id: number
  name: string
  color: ContactColor
}

// Current user (you)
export const CURRENT_USER_ID = 2

// Mock CRM Contacts
export const contacts: Contact[] = [
  { id: 1, name: 'John Smith', color: ContactColor.GREEN },
  { id: 2, name: 'Den Irkhin', color: ContactColor.BLUE }, // Current user (you)
  { id: 3, name: 'Emily Johnson', color: ContactColor.PURPLE },
  { id: 4, name: 'Michael Williams', color: ContactColor.YELLOW },
  { id: 5, name: 'Sarah Davis', color: ContactColor.PINK },
  { id: 6, name: 'David Miller', color: ContactColor.ORANGE },
  { id: 7, name: 'Jessica Wilson', color: ContactColor.GREEN },
  { id: 8, name: 'James Taylor', color: ContactColor.BLUE },
  { id: 9, name: 'Jennifer Brown', color: ContactColor.PURPLE },
  { id: 10, name: 'Robert Anderson', color: ContactColor.YELLOW },
  { id: 123456, name: 'Unknown Caller with another very long name', color: ContactColor.PINK },
]

// Helper function to get contact by ID
export const getContactById = (id: number): Contact | undefined => {
  return contacts.find((contact) => contact.id === id)
}

// Helper function to get current user
export const getCurrentUser = (): Contact | undefined => {
  return getContactById(CURRENT_USER_ID)
}
