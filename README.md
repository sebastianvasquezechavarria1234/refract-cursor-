# Lumina Cursor: Fluid Glass & Refractive Physics 🫧🔍💎

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-19-blue.svg)](https://reactjs.org/)
[![Three.js](https://img.shields.io/badge/Three.js-r184-black.svg)](https://threejs.org/)

**Lumina Cursor** is an ultra-premium 3D cursor experience built with **React Three Fiber** and **Three.js**. It transforms the standard mouse pointer into a physically-simulated glass lens that refracts, distorts, and interacts with the digital environment in real-time.

![Preview](./public/646_1x_shots_so.png)

---

## 🌟 Core Experience

Lumina is not just a cursor; it's a study in **Physical Interaction Design**. Every movement is calculated to provide a tactile, high-end feel that bridges the gap between digital interfaces and physical glass properties.

### 1. Advanced Refraction Physics
Using `MeshTransmissionMaterial`, the project simulates real-world light transmission, including:
*   **IOR (Index of Refraction):** Set to 1.45 (simulating high-quality crown glass).
*   **Chromatic Aberration:** Dynamic RGB splitting that intensifies based on cursor velocity.
*   **Temporal Distortion:** Subtle fluctuations that make the glass feel "alive" rather than static.

### 2. Velocity-Based Dynamics (Squash & Stretch)
The geometry isn't rigid. It responds to your movement speed:
*   **Inertia:** The glass has perceived weight, following the mouse with a smooth dampening effect.
*   **Deformation:** Moving the cursor fast "stretches" the geometry along the axis of movement, while slowing down "squashes" it back to its original form.

### 3. Reactive Glow Tail
A hidden point light follows the cursor with a slight lag (trailing effect), creating dynamic highlights and shadows on the glass surfaces as it moves across the dark void.

---

## 🎮 Interactive Modes

Click to cycle through **6 distinct geometric lenses**, each with its own refractive signature:

| Mode | Geometry | Visual Vibe |
| :--- | :--- | :--- |
| `Lens` | Cylinder/Concave | Classic optical magnifying glass 🫧 |
| `Cube` | Box | Sharp, architectural refractive block ⏹️ |
| `Star` | Extruded Star | Complex prismatic light scattering ⭐ |
| `Crystal` | Icosahedron | Diamond-like multifaceted brilliance 💎 |
| `Donut` | Torus | Continuous fluid refraction loops 🍩 |
| `Pyramid` | Tetrahedron | Brutalist geometric distortion 🔼 |

---

## 🛠️ Technical Stack

*   **React 19:** Utilizing the latest concurrent rendering features.
*   **React Three Fiber (R3F):** A powerful React reconciler for Three.js.
*   **@react-three/drei:** Premium helpers for materials and environment setup.
*   **Maath:** Used for precision mathematical smoothing (`easing.damp3`) to ensure 60fps fluid motion.
*   **Vite:** For ultra-fast development and optimized production builds.
*   **Tailwind CSS:** Handling the minimal UI layer.

---

## 🚀 Getting Started

### Prerequisites
*   Node.js 18+ 
*   npm or yarn

### Installation
1.  **Clone the Repository**
    ```bash
    git clone https://github.com/sebastianvasquezechavarria1234/lumina-cursor.git
    cd lumina-cursor
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Run Development Server**
    ```bash
    npm run dev
    ```

4.  **Build for Production**
    ```bash
    npm run build
    ```

---

## 📂 Project Structure

```text
lumina-cursor/
├── public/              # Static assets (3D models, textures)
├── src/
│   ├── FluidGlass.jsx   # Core 3D Logic & R3F Scene
│   ├── App.jsx          # Application entry point
│   └── main.jsx         # React mounting
├── vite.config.js       # Vite configuration
└── tailwind.config.js   # Tailwind styling tokens
```

---

## ⚡ Performance Optimization

To ensure a smooth experience even on mid-range devices, Lumina implements:
*   **Dynamic DPR:** Automatically scales resolution between 1x and 2x based on device capability.
*   **Suspense:** Asynchronous loading of 3D models to prevent render blocking.
*   **Geometry Memoization:** Mathematical shapes (Star, Crystal, etc.) are computed once and reused.
*   **Pointer Throttling:** Logic is tied to the R3F `useFrame` loop for synchronization with monitor refresh rates.

---

## 🗺️ Roadmap

- [ ] **Custom Background Support:** Allow users to upload images to refract.
- [ ] **Mobile Touch Support:** Adapt the "hover" logic for touch drag.
- [ ] **Configuration UI:** A side panel to tweak IOR, Roughness, and Speed on the fly.
- [ ] **Multi-Light Setup:** Support for colored reactive lights.

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git origin push feature/AmazingFeature`)
5. Open a Pull Request

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 💎 Credits

Created with passion by **Sebastian Vasquez Echavarria** 🚀

*   Inspiration: Modern high-end landing pages and physical optics.
*   3D Models: Custom modeled for optimized performance.

---

<p align="center">
  <i>"Redefining the way we interact with the digital void."</i>
</p>
