import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { CallList } from './components/CallList'
import { useCalls } from './components/CallList/useCalls'



function App() {
  const [count, setCount] = useState(0)
  const { data: calls, isLoading, error } = useCalls()

  return (
    <>
      <div>
        <a
          href="https://vite.dev"
          target="_blank"
        >
          <img
            src={viteLogo}
            className="logo"
            alt="Vite logo"
          />
        </a>
        <a
          href="https://react.dev"
          target="_blank"
        >
          <img
            src={reactLogo}
            className="logo react"
            alt="React logo"
          />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
      
      <div style={{ marginTop: '2rem', width: '100%' }}>
        <CallList calls={calls} isLoading={isLoading} error={error as Error | null} />
      </div>
    </>
  )
}

export default App
