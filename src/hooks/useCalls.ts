import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { config } from '@config/env'
import { CURRENT_USER_ID, getContactById, Contact } from '@content/crm'

export enum CallType {
  MISSED = 'missed',
  ANSWERED = 'answered',
  VOICEMAIL = 'voicemail',
}

export enum Direction {
  INBOUND = 'inbound',
  OUTBOUND = 'outbound',
}

export type Call = {
  id: string
  created_at: string
  direction: Direction
  from: number
  to: number
  via: number
  duration: number
  is_archived: boolean
  call_type: CallType
}

export type CallWithContact = Call & {
  fromContact?: Contact
  toContact?: Contact
}

const fetchCalls = async () => {
  const response = await fetch(`${config.apiUrl}/activities`)

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`)
  }

  const data = await response.json()

  // Filter calls where from or to equals CURRENT_USER_ID
  // as an alternative we could use `select` options in useQuery, but this way we keep all unnecessary data in cache, so it's better to filter on data fetch
  const filteredCalls = data.filter(
    (call: Call) => call.from === CURRENT_USER_ID || call.to === CURRENT_USER_ID,
  )

  // Enrich calls with contact information
  const enrichedCalls = filteredCalls.map((call: Call) => ({
    ...call,
    fromContact: getContactById(call.from),
    toContact: getContactById(call.to),
  }))

  return enrichedCalls
}

export function useCalls() {
  const queryClient = useQueryClient()
  
  const archiveCall = async (callId: string) => {
    // In a real app, this would be an API call
    // For now, we'll just simulate it
    console.log(`Archiving call ${callId}`)
    
    // Simulate API call
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        // Optimistically update the cache
        queryClient.setQueryData(
          ['calls', { userId: CURRENT_USER_ID }],
          (oldData: CallWithContact[] | undefined) => {
            if (!oldData) return []
            return oldData.map((call) => 
              call.id === callId ? { ...call, is_archived: true } : call
            )
          }
        )
        resolve()
      }, 300)
    })
  }
  
  const archiveAllCalls = async () => {
    // In a real app, this would be an API call
    // For now, we'll just simulate it
    console.log('Archiving all calls')
    
    // Simulate API call
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        // Optimistically update the cache
        queryClient.setQueryData(
          ['calls', { userId: CURRENT_USER_ID }],
          (oldData: CallWithContact[] | undefined) => {
            if (!oldData) return []
            return oldData.map((call) => 
              !call.is_archived ? { ...call, is_archived: true } : call
            )
          }
        )
        resolve()
      }, 300)
    })
  }
  
  const { mutate: mutateArchiveCall } = useMutation({
    mutationFn: archiveCall,
    // If we had a real API, we would add onError handling here
  })
  
  const { mutate: mutateArchiveAllCalls } = useMutation({
    mutationFn: archiveAllCalls,
    // If we had a real API, we would add onError handling here
  })
  
  return {
    data: useQuery({
      queryKey: ['calls', { userId: CURRENT_USER_ID }],
      queryFn: fetchCalls,
    }).data,
    isLoading: useQuery({
      queryKey: ['calls', { userId: CURRENT_USER_ID }],
      queryFn: fetchCalls,
    }).isLoading,
    error: useQuery({
      queryKey: ['calls', { userId: CURRENT_USER_ID }],
      queryFn: fetchCalls,
    }).error,
    archiveCall: mutateArchiveCall,
    archiveAllCalls: mutateArchiveAllCalls
  }
}
