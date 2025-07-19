console.log("🚀 Using token:", import.meta.env.VITE_HUGGINGFACE_API_KEY);
export async function detectEmotion(text) {
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
    console.log('🔍 Hugging Face result:', result);
  
    if (result && result.label) {
      return result.label.toLowerCase(); // ✅ works for arpanghoshal/EmoRoBERTa
    }
  
    if (Array.isArray(result) && result.length > 0 && Array.isArray(result[0])) {
      const top = result[0].reduce((a, b) => (a.score > b.score ? a : b));
      return top.label.toLowerCase();
    }
  
    return 'neutral';
  }
  