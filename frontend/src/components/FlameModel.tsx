"use client"

import { useGLTF } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef, useEffect } from "react"
import * as THREE from "three"
import { useFlameStore } from "@/store/useFlameStore"

interface FlameModelProps {
  url: string
}

export default function FlameModel({ url }: FlameModelProps) {
  const { scene, animations } = useGLTF(url)
  const meshRef = useRef<THREE.Group>(null)
  
  const shape = useFlameStore((state) => state.shape)
  const expression = useFlameStore((state) => state.expression)

  useEffect(() => {
    // Traverse the scene to find the head mesh and its morph targets
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh && (child as THREE.Mesh).morphTargetInfluences) {
        const mesh = child as THREE.Mesh
        
        // Map shape parameters to morph targets (assuming naming convention: shape_0, shape_1...)
        shape.forEach((val, i) => {
          const index = mesh.morphTargetDictionary?.[`shape_${i}`]
          if (index !== undefined && mesh.morphTargetInfluences) {
            mesh.morphTargetInfluences[index] = val
          }
        })

        // Map expression parameters (assuming naming convention: exp_0, exp_1...)
        expression.forEach((val, i) => {
          const index = mesh.morphTargetDictionary?.[`exp_${i}`]
          if (index !== undefined && mesh.morphTargetInfluences) {
            mesh.morphTargetInfluences[index] = val
          }
        })
      }
    })
  }, [scene, shape, expression])

  return <primitive object={scene} ref={meshRef} scale={2} position={[0, -2, 0]} />
}
