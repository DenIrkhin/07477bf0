import { useQuery } from '@tanstack/react-query'
import { config } from '@config/env'
import { getContactById } from '@content/crm'
import { CallWithContact } from './useCalls'

// Function to fetch a single call by ID
const fetchCallById = async (callId: string): Promise<CallWithContact> => {
  const response = await fetch(`${config.apiUrl}/activities/${callId}`)

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`)
  }

  const call = await response.json()

  // Enrich call with contact information
  const enrichedCall = {
    ...call,
    fromContact: getContactById(call.from),
    toContact: getContactById(call.to),
  }

  return enrichedCall
}

export function useCallDetails(callId: string | null) {
  return useQuery({
    queryKey: ['call', callId],
    queryFn: () => (callId ? fetchCallById(callId) : null),
    enabled: !!callId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}
