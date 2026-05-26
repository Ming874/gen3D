"use client"

import { useFlameStore } from "@/store/useFlameStore"

export default function ParameterPanel() {
  const { shape, expression, setShape, setExpression, resetParameters } = useFlameStore()

  return (
    <div className="flex-1 bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-y-auto max-h-[calc(100vh-250px)]">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Avatar Controls</h2>
        <button 
          onClick={resetParameters}
          className="text-xs text-zinc-500 hover:text-black dark:hover:text-white transition-colors"
        >
          Reset All
        </button>
      </div>

      <div className="space-y-8">
        {/* Shape Parameters */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400">Shape (Identity)</h3>
          {shape.slice(0, 5).map((val, i) => (
            <div key={`shape-${i}`} className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Principal Component {i + 1}</span>
                <span className="font-mono text-zinc-500">{val.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="-3"
                max="3"
                step="0.01"
                value={val}
                onChange={(e) => setShape(i, parseFloat(e.target.value))}
                className="w-full h-1.5 bg-zinc-100 rounded-lg appearance-none cursor-pointer accent-black dark:bg-zinc-800 dark:accent-white"
              />
            </div>
          ))}
        </div>

        {/* Expression Parameters */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400">Expression</h3>
          {expression.slice(0, 5).map((val, i) => (
            <div key={`exp-${i}`} className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Expression Component {i + 1}</span>
                <span className="font-mono text-zinc-500">{val.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="-2"
                max="2"
                step="0.01"
                value={val}
                onChange={(e) => setExpression(i, parseFloat(e.target.value))}
                className="w-full h-1.5 bg-zinc-100 rounded-lg appearance-none cursor-pointer accent-black dark:bg-zinc-800 dark:accent-white"
              />
            </div>
          ))}
        </div>
      </div>

      <button className="w-full mt-10 bg-black text-white py-4 rounded-2xl font-bold transition-transform hover:scale-[1.02] active:scale-[0.98] dark:bg-white dark:text-black">
        Generate Stylized
      </button>
    </div>
  )
}
