
"use client";
import { useState } from "react";

export default function AdminPage() {
  const [email, setEmail] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleCreateLicense(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const apiKey = (typeof window !== "undefined" ? window.NEXT_PUBLIC_ADMIN_API_KEY : undefined) || process.env.NEXT_PUBLIC_ADMIN_API_KEY || "";
      const res = await fetch("/api/admin/licenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setResult(`Licens skapad! Nyckel: ${data.license.licenseKey}`);
      } else {
        setResult(data.error || "Något gick fel");
      }
    } catch (err) {
      setResult("Fel vid anrop: " + err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-lg mx-auto mt-16 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Adminpanel – Skapa licens</h1>
      <form onSubmit={handleCreateLicense} className="space-y-4">
        <input
          type="email"
          className="border p-2 w-full"
          placeholder="Användarens e-post"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Skapar..." : "Skapa licens och skicka mail"}
        </button>
      </form>
      {result && <div className="mt-4 text-center">{result}</div>}
    </div>
  );
}
