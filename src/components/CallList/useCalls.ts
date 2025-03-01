import { useQuery } from '@tanstack/react-query'

// Mock data
const mockCalls = [
  {
    id: '1',
    from: '+33 1 23 45 67 89',
    to: '+33 9 87 65 43 21',
    duration: 123,
    is_archived: false,
    call_type: 'answered',
    created_at: '2025-03-01T14:00:00.000Z',
    direction: 'inbound'
  },
  {
    id: '2',
    from: '+33 6 78 90 12 34',
    to: '+33 1 23 45 67 89',
    duration: 45,
    is_archived: true,
    call_type: 'missed',
    created_at: '2025-03-01T13:45:00.000Z',
    direction: 'inbound'
  },
  {
    id: '3',
    from: '+33 1 23 45 67 89',
    to: '+33 7 65 43 21 09',
    duration: 67,
    is_archived: false,
    call_type: 'voicemail',
    created_at: '2025-03-01T12:30:00.000Z',
    direction: 'outbound'
  }
] as const

// Mock API function
const fetchCalls = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Simulate API response
  return [...mockCalls]
}

export type Call = typeof mockCalls[number]

export function useCalls() {
  return useQuery({
    queryKey: ['calls'],
    queryFn: fetchCalls
  })
}
