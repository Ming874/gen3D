# Contributing to gen3D

Thank you for your interest in contributing to the **2D to 3D Stylized Avatar Generation System**! We are building a state-of-the-art platform leveraging WebGPU, FLAME models, and modern AI stylization.

By participating in this project, you agree to abide by our code of conduct and engineering standards.

## Development Philosophy

We follow a **Research -> Strategy -> Execution** lifecycle for all major changes.
1.  **Research**: Understand the 3D math (FLAME) or the specific AI architecture (StyleMM/LeGO) before coding.
2.  **Strategy**: Propose a plan that prioritizes **Edge-first inference** (WebGPU/WASM).
3.  **Execution**: Implement surgical, idiomatic changes with comprehensive validation.

## Technical Stack & Standards

- **Frontend**: Next.js, React Three Fiber (R3F), Three.js, Zustand.
- **Backend**: FastAPI (Python), GCP (Cloud Run, G2 Instances).
- **Core Models**: FLAME (3DMM), ONNX Runtime Web.
- **Language**: TypeScript (Mandatory for frontend), Python 3.10+ (Backend).

### Coding Guidelines
- **Type Safety**: No `any` types. Use explicit interfaces for all 3D data structures and API responses.
- **Performance**: 3D rendering must maintain 60 FPS on modern hardware. Use `useFrame` and `useMemo` hooks strategically in R3F.
- **Styling**: Prefer Vanilla CSS or Tailwind CSS. Ensure all UI components follow the **Bento Grid** and **Responsive Aesthetics** defined in our design system.

## How to Contribute

### 1. Reporting Bugs
- Use the GitHub Issue tracker.
- Provide a clear description of the bug, including steps to reproduce, browser version, and hardware specs (GPU is critical for this project).

### 2. Feature Requests
- Open an issue to discuss the feature before implementing.
- Ensure the feature aligns with our **"Local-First, Cloud-Later"** and **"Edge-Inference"** mandates.

### 3. Pull Requests
1.  **Fork the repository** and create your branch from `main`.
2.  **Ensure your code passes linting**: Run `npm run lint` or the equivalent backend check.
3.  **Update Documentation**: If you change an API or a 3D pipeline, update the `docs/SDD.md` accordingly.
4.  **Testing**: Include unit tests or a reproduction scene for 3D logic.
5.  **Description**: Clearly explain *what* you changed and *why*.

## Licensing

By contributing, you agree that your contributions will be licensed under the project's **PolyForm Noncommercial License 1.0.0**.

---

Need help? Reach out to the project maintainers or refer to the `SDD.md` for architectural deep-dives.
