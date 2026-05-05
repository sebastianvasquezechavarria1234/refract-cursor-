import React from 'react'
import SplashCursor from './components/SplashCursor'

function App() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center selection:bg-cyan-500/30">
      <SplashCursor 
        SIM_RESOLUTION={128}
        DYE_RESOLUTION={512}
        PRESSURE_ITERATIONS={24}
        DENSITY_DISSIPATION={3.0}
        VELOCITY_DISSIPATION={2.0}
        PRESSURE={0.8}
        CURL={30}
        SPLAT_RADIUS={0.25}
        SPLAT_FORCE={6000}
        COLOR_UPDATE_SPEED={15}
        SHADING={true}
        RAINBOW_MODE={true}
      />
      
      <h1 className="text-8xl font-[100] tracking-tighter font-sans-flex bg-gradient-to-t from-neutral-600 to-white bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(255,255,255,0.1)] animate-breathe select-none">
        Lumina Cursor
      </h1>
      <p className="mt-4 text-neutral-400 font-sans-flex font-[300] text-lg tracking-widest uppercase opacity-70">
        Move your mouse to experience the fluid splash effect.
      </p>

      <footer className="absolute bottom-10 w-full text-center">
        <a 
          href="https://sebas-dev.vercel.app/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-neutral-600 hover:text-white transition-all duration-500 font-sans-flex font-[200] text-sm italic underline decoration-neutral-800 hover:decoration-white underline-offset-8 tracking-wider"
        >
          Created by Sebastian Vasquez Echavarria
        </a>
      </footer>
      
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Effect container is now handled by SplashCursor */}
      </div>
    </div>
  )
}

export default App
