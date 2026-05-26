# System Design Document (SDD) - 2D to 3D Stylized Avatar Generation System

## 1. Introduction
This document outlines the technical architecture and design details for the "Parameterized 2D to 3D Stylized Avatar Generation System." The system aims to transcend the limitations of traditional geometric deformation by leveraging the **FLAME** parametric model and **WebGPU** edge computing, enabling efficient, high-fidelity, and stylized 3D avatar generation.

## 2. System Architecture

The system follows a hybrid architecture: **Edge-based Neural Inference** for real-time tracking and **Cloud-based Generative AI** for high-quality stylization.

### 2.1 High-level Architecture
- **Frontend (Client-side):**
    - **UI Layer:** Built with **Next.js** and **Zustand** for state management.
    - **Inference Engine:** Integrates **ONNX Runtime Web**, utilizing **WebGPU** to run FLAME parameter regression models.
    - **Rendering Engine:** Uses **React Three Fiber (R3F)** to drive 3D scenes, skeletons, and Morph Targets.
- **Backend (Server-side):**
    - **API Gateway:** **FastAPI** provides asynchronous endpoints.
    - **Stylization Engine:** Executes compute-intensive Diffusion models (**StyleMM** / **LeGO**) on GPU clusters.
    - **Asset Management:** Handles storage and distribution of GLTF models, textures, and user configurations.
- **Infrastructure:**
    - **Database:** **PostgreSQL** (via Google Cloud SQL) for metadata and user data.
    - **Storage:** **Google Cloud Storage (GCS)** for 3D assets and high-resolution textures.

## 3. Technical Pipeline

### 3.1 Core Generation Workflow
1.  **Image Capture:** User uploads a portrait or starts a live video stream.
2.  **Face Detection & Landmarks:** Use MediaPipe (WASM) for robust face detection and initial 468 landmarks.
3.  **Edge Inference (Client-side):** 
    - The ONNX model regresses FLAME parameters: Shape ($\beta$), Expression ($\psi$), and Pose ($\theta$).
    - **Analysis-by-Neural-Synthesis:** Utilizing SMIRK-inspired techniques to bridge the domain gap between 2D pixels and 3D geometry.
4.  **Real-time Base Rendering:** R3F receives parameters and adjusts the FLAME base mesh instantly.
5.  **Stylization Request (Server-side):**
    - Client sends optimized FLAME parameters and style selection to the backend.
    - Backend **StyleMM** engine generates style-specific **Displacement Maps** and **Albedo Maps**.
6.  **Asset Delivery:** Backend returns an optimized GLB containing the stylized geometry and Morph Targets.
7.  **Interactive Customization:** User fine-tunes the result via UI sliders, with GPU-accelerated vertex interpolation.

## 4. API Endpoints

### 4.1 Authentication (Google OAuth 2.0)
The system integrates Google OAuth 2.0 and does not store user passwords.
- `POST /api/v1/auth/google`: Receives Google ID Token, validates it, and issues a system JWT.
- `POST /api/v1/auth/logout`: Invalidates the session.

### 4.2 Avatar Management
- `GET /api/v1/avatars`: Retrieve a list of all avatars owned by the user.
- `POST /api/v1/avatars`: Save a new avatar configuration (FLAME params + Style ID).
- `GET /api/v1/avatars/{avatar_id}`: Get the full GLTF download link and configuration.
- `DELETE /api/v1/avatars/{avatar_id}`: Delete an avatar.

### 4.3 Stylization Tasks
- `POST /api/v1/stylize`: Start an asynchronous stylization task.
    - **Request Body:** `{ "flame_params": {...}, "style_type": "anime", "resolution": 1024 }`
    - **Response:** `{ "task_id": "uuid", "status": "pending" }`
- `GET /api/v1/stylize/status/{task_id}`: Query the generation progress.

## 5. Database Schema

### 5.1 Users Table
| Field | Type | Description |
| :--- | :--- | :--- |
| id | UUID (PK) | Unique user identifier |
| google_id | VARCHAR(100) | Unique Google Account ID (Unique) |
| email | VARCHAR(100) | User email |
| full_name | VARCHAR(100) | User full name |
| picture_url | TEXT | Google profile picture URL |
| created_at | TIMESTAMP | Creation timestamp |

### 5.2 Avatars Table
| Field | Type | Description |
| :--- | :--- | :--- |
| id | UUID (PK) | Unique avatar identifier |
| user_id | UUID (FK) | Owner identifier |
| name | VARCHAR(50) | Avatar name |
| base_flame_params | JSONB | FLAME parameters (Shape, Pose) |
| style_id | VARCHAR(50) | Selected style tag (e.g., disney, anime) |
| model_url | TEXT | Path to the final GLTF/GLB in GCS |
| thumbnail_url | TEXT | Path to the preview image |
| created_at | TIMESTAMP | Creation timestamp |

## 6. Frontend Component Design

### 6.1 AvatarViewer (R3F)
- **Props:** `flameParams`, `morphInfluences`, `textureUrl`.
- **Function:** Handles GLTF loading, lighting, and per-frame Morph Target updates.

### 6.2 InferenceProvider (Context/Zustand)
- **Function:** Initializes ONNX Runtime Web, manages WebGPU cache, and provides the `predict(image)` function.

### 6.3 ControlPanel (UI)
- **Function:** Renders dynamic sliders bound to the Zustand store, triggering `morphTargetInfluences` changes.

## 7. Sequence Flow

### 7.1 Initialization & Edge Inference
1.  **Client:** `InferenceProvider` initializes and downloads quantized ONNX weights (10-20MB).
2.  **Client:** Captures video stream via `navigator.mediaDevices`.
3.  **Client:** Every frame (~33ms), the video texture is passed to ONNX via **WebGPU IO Binding**.
4.  **Inference:** Model regresses the FLAME parameter matrix ($\beta, \psi, \theta$).
5.  **R3F:** Parameters are mapped to the FLAME mesh's **Skeleton** and **MorphTargets**.

### 7.2 Stylization Flow (Asynchronous)
1.  **User:** Clicks "Generate Stylized Avatar".
2.  **Client:** Sends current optimal FLAME parameters to `POST /api/v1/stylize`.
3.  **Backend:** Task is pushed to a Celery/Redis queue.
4.  **Worker (GCP G2):** Executes **StyleMM** diffusion inference to generate displacement and albedo maps.
5.  **Backend:** Packages assets into a GLB, uploads to GCS, and updates status to `completed`.
6.  **Client:** Detects completion via WebSocket/Polling and hot-swaps the model.

## 8. Technical Deep-dives

### 8.1 WebGPU Zero-copy Pipeline
To achieve real-time performance on browsers:
- **Image Acquisition:** `importExternalTexture` brings `HTMLVideoElement` directly into the GPU.
- **Neural Input:** ORT-Web executes tensor operations directly on GPU buffers, avoiding CPU-GPU copies.
- **Rendering Binding:** Inference results (vertex offsets) are used directly as Vertex Buffer inputs.

### 8.2 Consistent Displacement Loss (CDL)
In **StyleMM**, CDL ensures that the learned stylization patterns (e.g., eye scaling, jawline curvature) remain semantically consistent across different identities, preventing mesh self-intersection during animation.

### 8.3 Error Handling & Robustness
- **Face Not Found:** Frontend provides visual cues (bounding box indicators) and halts inference if face confidence is low.
- **WebGPU Fallback:** Automatically switches to **WASM + SIMD** if WebGPU is unavailable, with a reduced-resolution model.

## 9. Implementation Challenges & Optimization

### 9.1 Multi-tier Inference
- **Full Model:** For high-end PCs with discrete GPUs.
- **Lite Model:** For mobile/integrated GPUs, utilizing 8-bit quantization and model distillation.

### 9.2 Hybrid Morph Targets
- **Universal Expressions:** Pre-built into the base GLB for zero-latency lip-sync and blinking.
- **Style-specific Details:** Injected as secondary displacement maps or vertex offsets generated by the cloud worker.

## 10. Hardware & Environment Requirements

### 10.1 Server-side (GCP)
- **GPU:** NVIDIA **RTX 3090 / 4090** or **L4/A100** (Min 24GB VRAM).
- **CPU:** 8+ Cores (e.g., Intel i7-13700 / AMD Ryzen 7).
- **RAM:** 64GB DDR5.

### 10.2 Client-side
- **Browser:** Chrome 113+, Edge 113+, Safari 17.4+ (with WebGPU enabled).
- **Minimum Hardware:** Intel Iris Xe / Apple M1.
- **Recommended Hardware:** NVIDIA RTX 3050+.

## 11. Deployment Architecture

### 11.1 Frontend (Next.js)
- Deployed on **Vercel** or **GCP Cloud Run**.
- Utilizes SSR/ISR for SEO and fast initial load.

### 11.2 Backend (GCP)
- **API Services:** **GCP Cloud Run** with auto-scaling.
- **GPU Workers:** **GCP Compute Engine G2 Instances** (NVIDIA L4).
- **Database:** **Google Cloud SQL (PostgreSQL)**.
- **Storage:** **Google Cloud Storage (GCS)** for assets.

## 12. Future Extensions
- **3D Gaussian Splatting (Snapmoji):** Future support for splat-based rendering for ultra-realistic hair and skin.
- **VRM Export:** Integrated `GLTF-to-VRM` converter for Vtuber ecosystem compatibility.
- **Lip-sync (Wav2Lip):** Speech-to-animation integration for audio-driven mouth movements.
