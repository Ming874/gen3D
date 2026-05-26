import Image from "next/image";
import UserButton from "@/components/UserButton";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <header className="flex w-full items-center justify-between py-6 px-16">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={80}
          height={16}
          priority
        />
        <UserButton />
      </header>
      
      <main className="flex flex-1 w-full max-w-4xl mx-auto flex-col items-center justify-center py-24 px-16 text-center sm:items-start sm:text-left">
        <div className="flex flex-col items-center gap-8 sm:items-start">
          <h1 className="text-5xl font-bold tracking-tight text-black dark:text-zinc-50 sm:text-6xl">
            2D to 3D <br />
            <span className="text-zinc-500">Stylized Avatar</span>
          </h1>
          <p className="max-w-lg text-xl leading-relaxed text-zinc-600 dark:text-zinc-400">
            Generate high-fidelity, animatable, and stylized 3D avatars from a single portrait using FLAME and WebGPU edge inference.
          </p>
          
          <div className="flex flex-col gap-4 sm:flex-row">
            <button className="flex h-12 items-center justify-center rounded-full bg-zinc-950 px-8 text-base font-medium text-white transition-all hover:scale-105 dark:bg-white dark:text-black">
              Get Started
            </button>
            <button className="flex h-12 items-center justify-center rounded-full border border-zinc-200 px-8 text-base font-medium text-zinc-900 transition-all hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-900">
              View Showcase
            </button>
          </div>
        </div>
      </main>
      
      <footer className="w-full py-8 text-center text-sm text-zinc-500">
        © 2026 Ming Chen. Powered by FLAME & WebGPU.
      </footer>
    </div>
  );
}
