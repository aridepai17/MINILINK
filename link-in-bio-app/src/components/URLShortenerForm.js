import { useState } from "react";

export default function URLShortenerForm({ userEmail, onLinkCreated }) {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!url || !title) {
      alert("Please enter a title and URL.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/shortenurl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: userEmail, title, url }),
      });

      if (!res.ok) {
        throw new Error("Failed to create short link");
      }

      const data = await res.json();
      onLinkCreated(data.link); // Pass the created link to parent component

      setUrl(""); // Reset form
      setTitle("");
    } catch (err) {
      console.error("Error:", err.message);
      alert("Error creating short link.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 w-full mb-4"
      />
      <input
        type="url"
        placeholder="URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="border p-2 w-full mb-4"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? "Creating..." : "Create Short Link"}
      </button>
    </form>
  );
}
