import './App.css'
import { CallList } from '@components/CallList'
import { useCalls } from '@hooks/useCalls'
import { Header } from '@components/Header'

export function App() {
  const { data: calls, isLoading, error } = useCalls()

  return (
    <>
      <div className="container">
        <Header title="Aircall App" />
      </div>
      <div className="container" style={{ marginTop: '2rem' }}>
        <CallList calls={calls} isLoading={isLoading} error={error as Error | null} />
      </div>
    </>
  )
}
