# 🎵 Feelify – AI-Powered Emotion Music Companion

**Feelify** is a beautifully designed, AI-powered web app that detects how you're feeling and plays music to match your mood.  
It brings together emotional intelligence, music, and calming visuals to help you **breathe, reflect, and feel better**.

---

## 💡 Features

- 🧠 Emotion detection from your typed mood using Hugging Face AI
- 🌈 Breathing animation with color based on emotion
- 💬 Motivational quote that fits your current state
- 🎧 Music recommendations matched to your emotion
- 🎥 Smooth transitions, calming animations, Vanta.js wave background
- 🔒 Safe & secure — secrets kept in `.env`

---

## 🖼️ Demo

> 🔗 [Live Demo (Vercel)](https://your-vercel-link.vercel.app)

---

## 🛠 Tech Stack

- **Frontend**: React, Framer Motion, Vite, CSS
- **Emotion Detection**: Hugging Face Inference API  
- **Animations**: Framer Motion + Vanta.js (WAVES)
- **YouTube Music Embeds** for mood-based soundscapes

---

## 🧪 How It Works

1. You type how you're feeling.
2. The app sends your input to a Hugging Face emotion classification model.
3. Based on your emotion:
   - A **custom quote** is shown
   - A **colorful breathing circle** guides your calm
   - A **curated playlist** plays after a short reflection

---

## 🔐 Environment Variables

Create a `.env` file in the root:

```env
VITE_HUGGINGFACE_API_KEY=your_huggingface_token_here

## 📦 Installation

git clone https://github.com/John27052001/feelify.git
cd feelify
npm install
npm run dev
