import { auth, signIn, signOut } from "@/auth"

export default async function UserButton() {
  const session = await auth()

  if (!session?.user) {
    return (
      <form
        action={async () => {
          "use server"
          await signIn("google")
        }}
      >
        <button className="rounded-full bg-zinc-950 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200">
          Sign In
        </button>
      </form>
    )
  }

  return (
    <div className="flex items-center gap-4">
      <div className="flex flex-col items-end">
        <span className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
          {session.user.name}
        </span>
        <span className="text-xs text-zinc-500 dark:text-zinc-400">
          {session.user.email}
        </span>
      </div>
      {session.user.image && (
        <img
          src={session.user.image}
          alt={session.user.name ?? "User Avatar"}
          className="h-10 w-10 rounded-full border border-zinc-200 dark:border-zinc-800"
        />
      )}
      <form
        action={async () => {
          "use server"
          await signOut()
        }}
      >
        <button className="rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-900">
          Sign Out
        </button>
      </form>
    </div>
  )
}
