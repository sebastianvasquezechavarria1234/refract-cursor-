# Lumina Cursor 🌌

A high-performance, interactive fluid simulation cursor effect built with React, WebGL, and Tailwind CSS. Experience a fluid, cinematic splash that follows your movement and reacts to your interactions.

![Lumina Cursor Preview](https://raw.githubusercontent.com/sebastianvasquezechavarria1234/lumina-cursor/main/preview.png) *(Note: Add a real preview image to your repo for maximum impact)*

## ✨ Features

- **Fluid Dynamics**: High-fidelity fluid simulation using WebGL shaders.
- **Interactive Explosions**: Multi-directional color splashes on mouse click.
- **Optimized Performance**: Capped at 60FPS with balanced resolutions for a silky-smooth experience.
- **Modern UI**: Minimalist editorial design featuring thin typography and dark aesthetics.
- **Customizable**: Easily tweak parameters like curl, dissipation, and pressure iterations.

## 🛠️ Tech Stack

- **Framework**: [React](https://reactjs.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Graphics**: [WebGL](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API)
- **Fonts**: [Google Sans Flex](https://fonts.google.com/specimen/Google+Sans+Flex)

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/sebastianvasquezechavarria1234/lumina-cursor.git
   ```
2. Navigate to the project directory:
   ```bash
   cd lumina-cursor
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running Locally

To start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

## 🎨 Configuration

You can customize the splash effect in `src/App.jsx` by modifying the `SplashCursor` props:

```jsx
<SplashCursor 
  DYE_RESOLUTION={512}
  PRESSURE_ITERATIONS={24}
  CURL={30}
  SPLAT_RADIUS={0.25}
  RAINBOW_MODE={true}
/>
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Created by [Sebastian Vasquez Echavarria](https://sebas-dev.vercel.app/)**
