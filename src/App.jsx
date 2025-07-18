import { useState, useEffect, useRef } from 'react';
import { detectEmotion } from './emotionDetector';
import { playlistMap } from './playlistMap';
import * as THREE from 'three';
import WAVES from 'vanta/src/vanta.waves';
import { motion } from 'framer-motion';
import BreathingCircle from './BreathingCircle';

const emotionVisuals = {
  joy: {
    color: '#FFD93D',
    quote: 'Joy is contagious — share it freely ✨',
  },
  sadness: {
    color: '#3B82F6',
    quote: 'You are allowed to feel and heal 💙',
  },
  anger: {
    color: '#EF4444',
    quote: 'Pause. Breathe. Then decide. 🔥',
  },
  fear: {
    color: '#7C3AED',
    quote: 'Even your fears are trying to protect you 🌌',
  },
  love: {
    color: '#F472B6',
    quote: "Love begins with self. You're doing great ❤️",
  },
  surprise: {
    color: '#06B6D4',
    quote: 'The unexpected is often magical 🎇',
  },
  excitement: {
    color: '#F97316',
    quote: 'This is your moment. Own it 🚀',
  },
  disgust: {
    color: '#6B7280',
    quote: 'Let it pass. You are in control 💫',
  },
  neutral: {
    color: '#9CA3AF',
    quote: 'A neutral mind is a powerful mind 🧘',
  },
};

// 💡 Enhancer for short emotion words
function enrichInput(text) {
  const lower = text.trim().toLowerCase();
  const baseEmotions = {
    happy: "I'm feeling happy and energized today.",
    sad: "I'm feeling sad and emotionally low.",
    angry: "I'm feeling frustrated and angry about something.",
    fear: "I'm nervous and feeling uncertain.",
    disgust: "I'm uncomfortable and turned off by something.",
    love: "I'm feeling warm, close, and affectionate.",
    excitement: "I'm thrilled and full of energy!",
    surprise: "I'm amazed and didn't see this coming.",
    calm: "I'm relaxed and mentally clear.",
    tired: "I'm emotionally and physically drained.",
    neutral: "I feel okay, not too high or low.",
  };

  return baseEmotions[lower] || text;
}

function App() {
  const [mood, setMood] = useState('');
  const [emotion, setEmotion] = useState('');
  const [loading, setLoading] = useState(false);
  const [showMusic, setShowMusic] = useState(false);

  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);

  useEffect(() => {
    if (!vantaEffect.current) {
      vantaEffect.current = WAVES({
        el: vantaRef.current,
        THREE,
        color: 0x6a11cb,
        shininess: 70,
        waveHeight: 25,
        waveSpeed: 0.6,
        zoom: 1,
        backgroundColor: 0x000000,
      });
    }
    return () => {
      if (vantaEffect.current) vantaEffect.current.destroy();
    };
  }, []);

  const handleMoodSubmit = async () => {
    if (mood.trim()) {
      setLoading(true);
      setShowMusic(false);
      try {
        const enriched = enrichInput(mood);
        const result = await detectEmotion(enriched);
        setEmotion(result);
        setTimeout(() => setShowMusic(true), 6000);
      } catch (error) {
        console.error('Emotion detection error:', error.message);
        setEmotion('neutral');
        setShowMusic(true);
      }
      setLoading(false);
    }
  };

  const { color, quote } = emotionVisuals[emotion] || {
    color: '#999999',
    quote: '',
  };

  return (
    <div
      ref={vantaRef}
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: '#000000',
        color: '#ffffff',
        overflow: 'hidden',
        position: 'relative',
        fontFamily: 'Poppins, sans-serif',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 2,
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          style={{
            backdropFilter: 'blur(20px)',
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '20px',
            padding: '2rem',
            color: '#fff',
            textAlign: 'center',
            maxWidth: '520px',
            width: '90%',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.4)',
          }}
        >
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.8rem' }}>🎵 Feelify</h1>
          <p style={{ marginBottom: '1.2rem', fontSize: '1.1rem' }}>
            Let your feelings guide your music.
          </p>

          <input
            type="text"
            placeholder="Type how you're feeling..."
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            style={{
              padding: '0.75rem 1rem',
              borderRadius: '10px',
              border: 'none',
              width: '100%',
              fontSize: '1rem',
              marginBottom: '1rem',
              color: '#333',
            }}
          />

          <button
            onClick={handleMoodSubmit}
            disabled={loading}
            style={{
              backgroundColor: '#ffffff',
              color: '#333',
              padding: '0.6rem 1.4rem',
              borderRadius: '10px',
              border: 'none',
              fontWeight: '600',
              fontSize: '1rem',
              cursor: 'pointer',
            }}
          >
            {loading ? 'Detecting...' : 'Suggest Music'}
          </button>

          {emotion && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              style={{ marginTop: '2rem' }}
            >
              <p style={{ fontSize: '1.2rem' }}>
                Emotion: <strong>{emotion}</strong>
              </p>

              <p
                style={{
                  fontStyle: 'italic',
                  marginTop: '1rem',
                  fontSize: '1rem',
                  opacity: 0.85,
                }}
              >
                {quote}
              </p>

              <BreathingCircle show={!showMusic} color={color} />

              {showMusic && playlistMap[emotion] && (
                <div style={{ marginTop: '1.5rem' }}>
                  <p style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>
                    {playlistMap[emotion].title}
                  </p>
                  <iframe
                    width="360"
                    height="215"
                    src={playlistMap[emotion].embedUrl}
                    title="Mood Playlist"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ borderRadius: '12px' }}
                  ></iframe>
                </div>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default App;
