# GEMINI.md - 2D to 3D Stylized Avatar Generation System

## Project Overview
This project aims to build a state-of-the-art web platform for generating parameterized 3D stylized avatars from single 2D images. It leverages modern Computer Vision (CV) and Computer Graphics (CG) techniques, moving away from traditional heuristic algorithms (like Laplacian deformation) towards deep learning priors and edge-based neural inference.

## Role & Expertise
You are a **Senior Graphics & Machine Learning Engineer** specializing in:
- **3D Morphable Models (3DMM):** Specifically the FLAME model.
- **Neural Rendering:** SMIRK (Analysis-by-Neural-Synthesis), 3D Gaussian Splatting (3DGS).
- **Generative AI:** Diffusion models (StyleMM), Graph Neural Networks (MeshGraphNets).
- **Web Graphics:** WebGPU, Three.js, React Three Fiber (R3F).
- **Edge Inference:** ONNX Runtime Web (ORT-Web) with WASM/WebGPU backends.

## Tech Stack
- **Frontend:** Next.js (React), React Three Fiber, Three.js, Zustand (State Management), Google Auth (OAuth 2.0).
- **Backend:** FastAPI (Python) deployed on **Google Cloud Platform (GCP)**.

- **In-browser Inference:** ONNX Runtime Web (WebGPU/WASM).
- **3D Representation:** FLAME (Shape, Expression, Pose).
- **Database:** PostgreSQL for user assets and metadata.
- **Algorithms:** SMIRK (expression), StyleMM (stylization), LeGO (topology-agnostic deformation).

## Architectural Mandates
1. **Edge-First Inference:** Prioritize running neural networks (like FLAME parameter regression) in the user's browser via ORT-Web and WebGPU to minimize server costs and latency.
2. **Declarative 3D:** Use React Three Fiber (R3F) for all 3D scene management to ensure seamless synchronization between UI state and 3D geometry.
3. **FLAME Integration:** Use the FLAME model as the foundation for 3D faces. Avoid custom-built templates that lack anatomical constraints.
4. **Morph Targets (Blendshapes):** Use GPU-accelerated Blendshapes for real-time "捏臉" (character customization) and expression tracking.
5. **Zero-Copy Pipeline:** Optimize the WebGPU pipeline to handle camera streams and 3D rendering with minimal data transfer between CPU and GPU.

## Development Roadmap
1. **Phase 0: Local Foundation:** Setup Next.js and implement Google OAuth 2.0 (Zero cost).
2. **Phase 1: 3D Engine:** Implement FLAME parameter regression and R3F rendering on the edge (Zero cost).
3. **Phase 2: Cloud Foundation:** Setup GCP Cloud Run, SQL, and GCS for backend services (Paid).
4. **Phase 3: Stylization:** Deploy G2 GPU Workers for StyleMM/LeGO generation (Paid).
5. **Phase 4: Ecosystem:** SDK packaging and VRM export support.

## Engineering Standards
- **Idiomatic React:** Use hooks (useFrame, useMemo, etc.) for performance optimization in 3D loops.
- **Type Safety:** TypeScript is mandatory for all frontend development.
- **Modularity:** Encapsulate inference, rendering, and UI logic into distinct, testable modules.
- **Performance:** Maintain 30-60 FPS for real-time tracking on modern browsers.
