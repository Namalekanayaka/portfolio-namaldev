# Namal Ekanayake - 3D Cinematic Portfolio

A high-end, immersive 3D portfolio website built with React, Three.js, and Framer Motion.

## 🚀 Getting Started

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Start Development Server:**
    ```bash
    npm run dev
    ```

3.  **Build for Production:**
    ```bash
    npm run build
    ```

## 🛠 Tech Stack

*   **React** (Vite)
*   **Three.js** / **React Three Fiber** (3D Rendering)
*   **GSAP** (Camera & Timeline Animations)
*   **Framer Motion** (UI Animations)
*   **Tailwind CSS** (Styling)
*   **Zustand** (State Management - via simple props in this version)

## 📂 Project Structure

*   `src/components/Experience.jsx`: Main 3D scene coordinator. Handles camera movement and GSAP timelines wrapped in `ScrollControls`.
*   `src/components/HeroStage.jsx`: The 3D geometry of the room and character. **Replace the placeholder primitive shapes here with your `.glb` models using `useGLTF`.**
*   `src/components/Overlay.jsx`: The HTML scrollable interface. To add more sections, update this file and increase `pages` count in `App.jsx`.
*   `src/components/LoadingScreen.jsx`: A cinematic loading overlay.

## 🎨 Customization Guide

### Replacing the 3D Character
1.  Place your `.glb` or `.gltf` model in `public/models/`.
2.  In `HeroStage.jsx`:
    ```jsx
    import { useGLTF } from '@react-three/drei'
    
    function Character() {
      const { scene } = useGLTF('/models/character.glb')
      return <primitive object={scene} />
    }
    ```

### Adjusting Scroll Animations
*   Animations are defined in `src/components/Experience.jsx` inside the `useLayoutEffect` hook using GSAP.
*   The timeline is synced to the scroll offset (0 to 1) in the `useFrame` loop.

## 📱 Responsiveness
*   The HTML overlay is fully responsive via Tailwind classes.
*   The 3D camera path is currently optimized for Desktop aspect ratios. For mobile, consider adding a `useThree` check in `Experience.jsx` to adjust the camera coordinates (e.g., move camera further back).

Enjoy building your portfolio!
