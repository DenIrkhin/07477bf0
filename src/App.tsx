import './App.css'
import { CallList } from '@components/CallList'
import { useCalls } from '@hooks/useCalls'

function App() {
  const { data: calls, isLoading, error } = useCalls()

  return (
    <>
      <div style={{ marginTop: '2rem', width: '100%' }}>
        <CallList calls={calls} isLoading={isLoading} error={error as Error | null} />
      </div>
    </>
  )
}

export default App
