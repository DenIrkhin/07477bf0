import { useQuery } from '@tanstack/react-query'
import { config } from '@config/env'

// Define Call type
export type Call = {
  id: string
  created_at: string
  direction: 'inbound' | 'outbound'
  from: string
  to: string
  via: string
  duration: number
  is_archived: boolean
  call_type: 'missed' | 'answered' | 'voicemail'
}

const fetchCalls = async () => {
  const response = await fetch(`${config.apiUrl}/activities`)
  
  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`)
  }
  
  return await response.json()
  
}



export function useCalls() {
  return useQuery({
    queryKey: ['calls'],
    queryFn: fetchCalls
  })
}
