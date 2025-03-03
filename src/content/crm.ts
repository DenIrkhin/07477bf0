/**
 * CRM Contact Types and Mock Data
 */

export interface Contact {
  id: number
  name: string
}

// Current user (you)
export const CURRENT_USER_ID = 2

// Mock CRM Contacts
export const contacts: Contact[] = [
  { id: 1, name: 'John Smith' },
  { id: 2, name: 'Den Irkhin' }, // Current user (you)
  { id: 3, name: 'Emily Johnson' },
  { id: 4, name: 'Michael Williams' },
  { id: 5, name: 'Sarah Davis' },
  { id: 6, name: 'David Miller' },
  { id: 7, name: 'Jessica Wilson' },
  { id: 8, name: 'James Taylor' },
  { id: 9, name: 'Jennifer Brown' },
  { id: 10, name: 'Robert Anderson' },
  { id: 123456, name: 'Unknown Caller with another very long name' },
]

// Helper function to get contact by ID
export const getContactById = (id: number): Contact | undefined => {
  return contacts.find((contact) => contact.id === id)
}

// Helper function to get current user
export const getCurrentUser = (): Contact | undefined => {
  return getContactById(CURRENT_USER_ID)
}
