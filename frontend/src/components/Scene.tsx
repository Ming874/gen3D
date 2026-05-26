"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Stage } from "@react-three/drei"
import { Suspense } from "react"
import FlameModel from "./FlameModel"

export default function Scene() {
  return (
    <div className="h-full w-full bg-zinc-100 dark:bg-zinc-950">
      <Canvas shadows camera={{ position: [0, 0, 4], fov: 50 }}>
        <Suspense fallback={null}>
          <Stage intensity={0.5} environment="city" adjustCamera={false}>
            {/* Placeholder path for the FLAME model - in real dev, this would be a public/ asset */}
            <FlameModel url="/models/flame_base.glb" />
          </Stage>
          <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 1.75} />
        </Suspense>
      </Canvas>
    </div>
  )
}
