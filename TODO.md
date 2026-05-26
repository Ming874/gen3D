# Project TODO List & Development Roadmap

## 專案開發流程與驗收準則 (Workflow & Acceptance)

本專案採用 **"Local-First, Cloud-Later"** 開發模式。優先完成零成本的本地開發與 Google Auth，最後再進行付費雲端資源的部署。

---

## Phase 0: 本地基礎建置與認證 (Local Foundation & Auth - 零成本)
- [x] **Next.js 前端腳手架建立**
    - [x] 整合 TypeScript, Tailwind CSS, Zustand。
    - [x] 重構專案架構 (frontend/)。
- [x] **Google OAuth 2.0 整合 (免費)**
    - [x] 配置 Auth.js (NextAuth) 與 API 路由。
    - [x] 實作登入/登出 UI 組件。
    - [ ] 填寫 GCP Google Client ID 憑證。

## Phase 1: 本地 3D 引擎與邊緣推理 (Local 3D Engine - 零成本)
- [ ] **FLAME 模型整合 (R3F)**
    - [ ] 在瀏覽器載入基礎 FLAME GLTF。
    - [ ] 實現 Morph Target 本地控制介面。
- [ ] **WebGPU ONNX 推理管線 (瀏覽器端計算)**
    - [ ] 整合 ONNX Runtime Web。
    - [ ] 實現相機視訊流與即時臉部追蹤。
    - **驗收細節:** 視訊中的臉部運動能即時同步至 3D 模型，全程於使用者瀏覽器運算。

## Phase 2: 雲端基礎建設 (Cloud Infrastructure - 付費啟動)
- [ ] **GCP 後端環境配置**
    - [ ] 建立 Cloud Run 服務 (FastAPI)。
    - [ ] 建立 Cloud SQL (PostgreSQL) 與 GCS Bucket。
    - **驗收細節:** 前端能成功呼叫雲端 API 並讀寫資料庫。

## Phase 3: 風格化生成流水線 (AI Stylization - 高性能 GPU 需求)
- [ ] **GCP GPU Worker 部署**
    - [ ] 租用 G2 執行個體 (NVIDIA L4 GPU)。
    - [ ] 實作 StyleMM / LeGO 的非同步生成任務。
    - **驗收細節:** 點擊生成後，雲端 GPU 在 20 秒內產出風格化資源並回傳。

## Phase 4: 平台整合與 Final Polish
- [ ] **資產管理與 SDK**
    - [ ] 實現雲端存檔功能與預覽圖。
    - [ ] 封裝 `@gen3d/engine` 前端套件。
- [ ] **VRM 格式匯出功能**
    - [ ] 實作 GLTF 轉 VRM。
- [ ] **正式環境部署**
    - [ ] GitHub Actions CI/CD 配置。
