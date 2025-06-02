import { useState } from 'react'
import Timer from "./components/timer.jsx"
import { ThemeProvider } from './context/ThemeContext'

function App() {
  return (
    <ThemeProvider>
      <div style={{ 
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        padding: '20px'
      }}>
        <Timer />
      </div>
    </ThemeProvider>
  )
}

export default App
