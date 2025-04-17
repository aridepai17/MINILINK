// components/URLShortener.js
import { useState } from "react";

export default function URLShortener({ userEmail, onLinkCreated }) {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const validateUrl = (inputUrl) => {
    const regex = /^(https?:\/\/[^\s$.?#].[^\s]*)$/i;
    return regex.test(inputUrl);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url || !title || !userEmail) {
      setErrorMessage("All fields are required.");
      return;
    }
    if (!validateUrl(url)) {
      setErrorMessage("Please enter a valid URL.");
      return;
    }

    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const res = await fetch("/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url,
          title,
          email: userEmail,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setUrl("");
        setTitle("");
        setSuccessMessage("URL shortened successfully!");

        if (onLinkCreated) {
          onLinkCreated(data.newLink); // Make sure your API returns newLink
        }
      } else {
        setErrorMessage(data.error || "Failed to shorten URL");
      }
    } catch (error) {
      console.error("Error shortening URL:", error);
      setErrorMessage("An unexpected error occurred.");
    }

    setLoading(false);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {successMessage && (
        <div className="text-green-500 font-semibold">{successMessage}</div>
      )}
      {errorMessage && (
        <div className="text-red-500 font-semibold">{errorMessage}</div>
      )}

      <input
        type="text"
        placeholder="Enter title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full px-4 py-2 border rounded"
        required
      />
      <input
        type="url"
        placeholder="Enter URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full px-4 py-2 border rounded"
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 transition"
      >
        {loading ? "Shortening..." : "Shorten URL"}
      </button>
    </form>
  );
}
