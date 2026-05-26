import Image from "next/image";
import UserButton from "@/components/UserButton";
import Scene from "@/components/Scene";
import ParameterPanel from "@/components/ParameterPanel";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <header className="flex w-full items-center justify-between py-4 px-8 border-b border-zinc-200 dark:border-zinc-800 bg-white/50 backdrop-blur-md dark:bg-black/50 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-black rounded-lg dark:bg-white" />
          <span className="font-bold text-xl tracking-tighter">gen3D</span>
        </div>
        <UserButton />
      </header>
      
      <main className="flex-1 p-4 md:p-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-4 h-full">
          {/* Main 3D Viewport */}
          <div className="md:col-span-8 bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-sm relative min-h-[600px]">
            <Scene />
            <div className="absolute bottom-6 left-6 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full text-xs font-medium dark:bg-zinc-800/80">
              Real-time Preview
            </div>
          </div>
          
          {/* Sidebar / Controls */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <ParameterPanel />
            
            <div className="bg-zinc-950 text-white rounded-3xl p-8 border border-zinc-800 shadow-lg">
              <h3 className="font-bold mb-2">Pro Tip</h3>
              <p className="text-sm text-zinc-400">
                Use your camera for real-time expression tracking. Your data stays on your device.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="w-full py-6 text-center text-xs text-zinc-500 border-t border-zinc-200 dark:border-zinc-800">
        © 2026 Ming Chen. Built with FLAME & WebGPU.
      </footer>
    </div>
  );
}
