import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='search_box'>
        <button className='search_filter_button'>
          <span className='search_filter_text'>
            카테고리
          </span>
          <span className='search_filter_icon'>
            V
          </span>
        </button>

        <button className="search_button">
          검색
        </button>
      </div>

      <h1>Vite Only</h1>
      
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
