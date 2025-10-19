// src/utils/askGroq.js

// Use environment variable or fallback to localhost for development
const API_URL = 'https://deport-backend.onrender.com';

export async function askGroq(message) {
  try {
    const res = await fetch(`${API_URL}/api/chat`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json" 
      },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();

    // Handle error responses
    if (!res.ok) {
      console.error("API Error:", data.error);
      return data.error || "⚠️ Something went wrong. Please try again.";
    }

    return data.reply;
  } catch (err) {
    console.error("Network Error:", err);
    return "⚠️ Unable to connect to AI. Please check your connection.";
  }
}