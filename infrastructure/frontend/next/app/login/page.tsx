"use client";

import { useState, type FormEvent } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("ludo@example.com");
  const [password, setPassword] = useState("Str0ngPass!");
  const [status, setStatus] = useState("");

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("Connexion...");

    try {
      const response = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("Succès ! Connecté.");
        console.log("Token reçu :", data);
      } else {
        setStatus(`Erreur : ${data.error || "Identifiants invalides"}`);
      }
    } catch (err) {
      setStatus("Erreur : Impossible de contacter le serveur.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form 
        onSubmit={handleLogin} 
        className="p-8 bg-white shadow-md rounded-lg space-y-4 w-80"
      >
        <h2 className="text-xl font-bold">Connexion</h2>
        
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />

        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Se connecter
        </button>

        {status && (
          <p className="text-sm text-center mt-2 text-gray-600">{status}</p>
        )}
      </form>
    </div>
  );
}