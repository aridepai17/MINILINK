import { signIn, signOut, useSession } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="p-4 border-b shadow-sm flex justify-between items-center bg-white">
      <h1 className="text-xl font-bold">🔗 Link-in-Bio</h1>
      <div className="flex items-center gap-4">
        {session ? (
          <>
            <img
              src={session.user.image}
              alt="profile"
              className="w-8 h-8 rounded-full"
            />
            <span className="text-sm">{session.user.name}</span>
            <button
              onClick={() => signOut()}
              className="text-sm text-red-500 hover:underline"
            >
              Sign Out
            </button>
          </>
        ) : (
          <button
            onClick={() => signIn("github")}
            className="text-sm text-blue-600 hover:underline"
          >
            Sign In with GitHub
          </button>
        )}
      </div>
    </header>
  );
}
