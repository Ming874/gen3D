import Image from "next/image";
import UserButton from "@/components/UserButton";
import Scene from "@/components/Scene";

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
          <div className="md:col-span-8 bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-sm relative min-h-[500px]">
            <Scene />
            <div className="absolute bottom-6 left-6 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full text-xs font-medium dark:bg-zinc-800/80">
              Real-time Preview
            </div>
          </div>
          
          {/* Sidebar / Controls */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <div className="flex-1 bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm">
              <h2 className="text-2xl font-bold mb-6">Avatar Controls</h2>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-500">Base Identity</label>
                  <div className="h-2 w-full bg-zinc-100 rounded-full overflow-hidden dark:bg-zinc-800">
                    <div className="h-full w-1/3 bg-black dark:bg-white" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-500">Stylization Strength</label>
                  <div className="h-2 w-full bg-zinc-100 rounded-full overflow-hidden dark:bg-zinc-800">
                    <div className="h-full w-2/3 bg-black dark:bg-white" />
                  </div>
                </div>
              </div>
              
              <button className="w-full mt-12 bg-black text-white py-4 rounded-2xl font-bold transition-transform hover:scale-[1.02] active:scale-[0.98] dark:bg-white dark:text-black">
                Generate Stylized
              </button>
            </div>
            
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
