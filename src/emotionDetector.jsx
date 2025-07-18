export async function detectEmotion(text) {
    const response = await fetch(
      'https://api-inference.huggingface.co/models/arpanghoshal/EmoRoBERTa',
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
    console.log('🔍 API raw result:', result); // 👈 log the exact response
  
    // Handle known good response format
    if (Array.isArray(result)) {
      const top = result[0].reduce((a, b) => (a.score > b.score ? a : b));
      return top.label.toLowerCase();
    }
  
    // Handle unexpected format (object)
    if (result && result.label) {
      return result.label.toLowerCase();
    }
  
    return 'neutral';
  }
  