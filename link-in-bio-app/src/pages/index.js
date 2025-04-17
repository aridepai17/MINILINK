import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import URLShortener from "../components/URLShortenerForm";

export default function Home() {
  const { data: session, status } = useSession();
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }

    const fetchLinks = async () => {
      if (!session?.user?.email) return;
      setLoading(true);

      try {
        const res = await fetch(`/api/getlinks?email=${session.user.email}`);
        const data = await res.json();
        setLinks(data.links || []);
      } catch (error) {
        console.error("Failed to fetch links:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLinks();
  }, [session]);

  const handleNewLink = (newLink) => {
    setLinks((prev) => [newLink, ...prev]);
  };

  const handleDeleteLink = async (linkId) => {
    if (!confirm("Are you sure you want to delete this link?")) return;

    try {
      const res = await fetch("/api/deletelink", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: session.user.email,
          linkId,
        }),
      });

      if (!res.ok) throw new Error("Failed to delete link");

      setLinks((prev) => prev.filter((link) => link._id !== linkId));
    } catch (error) {
      console.error("Delete error:", error.message);
      alert("Failed to delete link.");
    }
  };

  if (status === "loading") return <div>Loading...</div>;

  return (
    <main className="max-w-xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">🔗 URL Shortener</h1>

      {session ? (
        <>
          <div className="mb-4 text-center">
            Signed in as <strong>{session.user.email}</strong>{" "}
            <button
              className="ml-2 text-red-500 underline"
              onClick={() => signOut()}
            >
              Sign out
            </button>
          </div>

          <URLShortener
            userEmail={session.user.email}
            onLinkCreated={handleNewLink}
          />

          <h2 className="text-xl font-semibold mt-8 mb-2">Your Links</h2>

          {loading ? (
            <p>Loading links...</p>
          ) : links.length > 0 ? (
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link._id} className="border p-3 rounded relative">
                  <p className="font-medium">{link.title}</p>
                  <div className="text-sm text-gray-600">
                    Short link:{" "}
                    <a
                      href={`/${link.shortUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 underline"
                    >
                      {origin ? `${origin}/${link.shortUrl}` : "Loading..."}
                    </a>
                  </div>
                  <button
                    onClick={() => handleDeleteLink(link._id)}
                    className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No links found.</p>
          )}
        </>
      ) : (
        <div className="text-center">
          <p className="mb-2">You need to be signed in to use the app.</p>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={() => signIn()}
          >
            Sign in
          </button>
        </div>
      )}
    </main>
  );
}
