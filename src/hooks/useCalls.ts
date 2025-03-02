import { useQuery } from '@tanstack/react-query'
import { config } from '@config/env'
import { CURRENT_USER_ID } from '@content/crm'

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

  return filteredCalls
}

export function useCalls() {
  return useQuery({
    queryKey: ['calls', { userId: CURRENT_USER_ID }],
    queryFn: fetchCalls,
  })
}
