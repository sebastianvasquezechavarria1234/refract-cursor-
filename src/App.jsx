import React from 'react'

function App() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center selection:bg-cyan-500/30">
      <h1 className="text-6xl font-bold tracking-tighter bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
        Lumina Cursor
      </h1>
      <p className="mt-4 text-neutral-400 font-light">
        Move your mouse to experience the effect.
      </p>
      
      {/* 
        The cursor effect logic will go here.
        Ready for implementation!
      */}
      
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Effect container */}
      </div>
    </div>
  )
}

export default App
