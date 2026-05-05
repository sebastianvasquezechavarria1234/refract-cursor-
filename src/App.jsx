import React from 'react'
import SplashCursor from './components/SplashCursor'

function App() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center selection:bg-cyan-500/30">
      <SplashCursor 
        SIM_RESOLUTION={128}
        DYE_RESOLUTION={512}
        PRESSURE_ITERATIONS={14}
        DENSITY_DISSIPATION={3.5}
        VELOCITY_DISSIPATION={2}
        PRESSURE={0.1}
        CURL={30}
        SPLAT_RADIUS={0.15}
        SPLAT_FORCE={6000}
        COLOR_UPDATE_SPEED={10}
        SHADING
        RAINBOW_MODE={true}
        COLOR="#A855F7"
      />
      
      <h1 className="text-8xl font-[100] tracking-tighter font-sans-flex bg-gradient-to-b from-white to-neutral-500 bg-clip-text text-transparent">
        Lumina Cursor
      </h1>
      <p className="mt-4 text-neutral-400 font-sans-flex font-[300] text-lg">
        Move your mouse to experience the fluid splash effect.
      </p>

      <footer className="absolute bottom-10 w-full text-center">
        <a 
          href="https://sebas-dev.vercel.app/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-neutral-600 hover:text-white transition-colors duration-300 font-sans-flex font-[200] text-sm"
        >
          creado por sebastian vasquez echavarria
        </a>
      </footer>
      
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Effect container is now handled by SplashCursor */}
      </div>
    </div>
  )
}

export default App
