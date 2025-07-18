export async function detectEmotion(text) {
    try {
      const response = await fetch(
        'https://api-inference.huggingface.co/models/bhadresh-savani/distilbert-base-uncased-emotion',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_HUGGINGFACE_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ inputs: text }),
        }
      );
  
      const result = await response.json();
  
      if (response.status !== 200) {
        console.error('🚨 Hugging Face API error:', result);
        throw new Error(result.error || 'API error');
      }
  
      if (Array.isArray(result) && result.length > 0) {
        const emotions = result[0];
        return emotions.reduce((a, b) => (a.score > b.score ? a : b)).label;
      } else {
        return 'neutral';
      }
    } catch (error) {
      console.error('❌ emotionDetector.js failed:', error.message);
      throw error;
    }
  }
  