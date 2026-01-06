
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateCatchyDescription = async (productName: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Escribe una descripción irresistible y gourmet de máximo 150 caracteres para un postre llamado "${productName}". Usa un tono elegante y apetecible. No incluyas hashtags.`,
    });
    return response.text?.trim() || "Una delicia artesanal preparada con los mejores ingredientes.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Una delicia artesanal preparada con los mejores ingredientes.";
  }
};

export interface AddressSuggestion {
  address: string;
  lat: number;
  lng: number;
}

export const searchAddresses = async (query: string): Promise<AddressSuggestion[]> => {
  if (!query || query.length < 4) return [];
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Suggest 5 real-world addresses matching this partial location: "${query}". Return the result as a simple list of addresses.`,
      config: {
        tools: [{ googleMaps: {} }],
      },
    });

    // Extracting addresses from grounding metadata if available, otherwise parsing text
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    const suggestions: AddressSuggestion[] = [];

    if (chunks && chunks.length > 0) {
      chunks.forEach((chunk: any) => {
        if (chunk.maps) {
          suggestions.push({
            address: chunk.maps.title || chunk.maps.uri,
            lat: 0, // In a real scenario we might get coords from a specific place search
            lng: 0
          });
        }
      });
    }

    // Fallback: Parse the model's text response if grounding chunks are not explicit
    if (suggestions.length === 0) {
      const textLines = response.text?.split('\n').filter(l => l.trim().length > 5).slice(0, 5) || [];
      return textLines.map(line => ({
        address: line.replace(/^\d+\.\s*/, '').trim(),
        lat: 19.4326, // Default CDMX base for calculation if precise coords fail
        lng: -99.1332
      }));
    }

    return suggestions;
  } catch (error) {
    console.error("Address search error:", error);
    return [];
  }
};
