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

  const toggleArchiveCall = async (callId: string) => {
    console.log(`Toggling archive status for call ${callId}`)

    // Get the current state of the call to determine the new archived state
    const currentCalls = queryClient.getQueryData<CallWithContact[]>([
      'calls',
      { userId: CURRENT_USER_ID },
    ])

    const callToUpdate = currentCalls?.find((call) => call.id === callId)
    const newArchivedState = callToUpdate ? !callToUpdate.is_archived : true

    // Optimistically update the cache
    queryClient.setQueryData(
      ['calls', { userId: CURRENT_USER_ID }],
      (oldData: CallWithContact[] | undefined) => {
        if (!oldData) return []
        return oldData.map((call) =>
          call.id === callId ? { ...call, is_archived: newArchivedState } : call,
        )
      },
    )

    try {
      const response = await fetch(`${config.apiUrl}/activities/${callId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          is_archived: newArchivedState,
        }),
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      // Invalidate the cache to refresh data
      await queryClient.invalidateQueries({ queryKey: ['calls', { userId: CURRENT_USER_ID }] })

      return response
    } catch (error) {
      console.error('Error updating call archive status:', error)

      // Revert the optimistic update if the API call fails
      queryClient.setQueryData(
        ['calls', { userId: CURRENT_USER_ID }],
        (oldData: CallWithContact[] | undefined) => {
          if (!oldData) return []
          return oldData.map((call) =>
            call.id === callId ? { ...call, is_archived: !newArchivedState } : call,
          )
        },
      )

      throw error
    }
  }

  const archiveAllCalls = async () => {
    console.log('Archiving all calls')
    // Get the current state of the call to determine the new archived state
    const currentCalls = queryClient.getQueryData<CallWithContact[]>([
      'calls',
      { userId: CURRENT_USER_ID },
    ])

    // Optimistically update the cache
    queryClient.setQueryData(
      ['calls', { userId: CURRENT_USER_ID }],
      (oldData: CallWithContact[] | undefined) => {
        if (!oldData) return []
        return oldData.map((call) => (!call.is_archived ? { ...call, is_archived: true } : call))
      },
    )

    try {
      const unarchivedCalls = currentCalls?.filter((call) => !call.is_archived) || []

      console.log('Unarchived calls:', unarchivedCalls)

      // Make API calls to archive each unarchived call
      const archivePromises = unarchivedCalls.map((call) =>
        fetch(`${config.apiUrl}/activities/${call.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            is_archived: true,
          }),
        }),
      )

      // Wait for all archive operations to complete
      const results = await Promise.all(archivePromises)

      // Check if any request failed
      const failed = results.some((response) => !response.ok)
      if (failed) {
        throw new Error('Failed to archive one or more calls')
      }

      // Invalidate the cache to refresh data
      await queryClient.invalidateQueries({ queryKey: ['calls', { userId: CURRENT_USER_ID }] })

      return results
    } catch (error) {
      console.error('Error archiving all calls:', error)

      // Revert the optimistic update if the API call fails
      queryClient.setQueryData(
        ['calls', { userId: CURRENT_USER_ID }],
        (oldData: CallWithContact[] | undefined) => {
          if (!oldData) return []
          // Restore previous state (this is a simplification - in a real app we'd need to store the original state)
          const currentCalls = queryClient.getQueryData(['calls', { userId: CURRENT_USER_ID }])
          return currentCalls || []
        },
      )

      throw error
    }
  }

  const { mutate: mutateToggleArchiveCall } = useMutation({
    mutationFn: toggleArchiveCall,
    // If we had a real API, we would add onError handling here
  })

  const { mutate: mutateArchiveAllCalls } = useMutation({
    mutationFn: archiveAllCalls,
    // If we had a real API, we would add onError handling here
  })

  return {
    data: useQuery<CallWithContact[], Error>({
      queryKey: ['calls', { userId: CURRENT_USER_ID }],
      queryFn: fetchCalls,
    }).data,
    isLoading: useQuery<CallWithContact[], Error>({
      queryKey: ['calls', { userId: CURRENT_USER_ID }],
      queryFn: fetchCalls,
    }).isLoading,
    error: useQuery<CallWithContact[], Error>({
      queryKey: ['calls', { userId: CURRENT_USER_ID }],
      queryFn: fetchCalls,
    }).error,
    archiveCall: mutateToggleArchiveCall,
    archiveAllCalls: mutateArchiveAllCalls,
  }
}
