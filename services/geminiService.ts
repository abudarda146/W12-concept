import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateAIResponse = async (prompt: string, context?: string): Promise<string> => {
  try {
    const systemInstruction = `
      You are "Laptop-Five AI", the integrated OS assistant for the Windows 12 Concept.
      Your personality is helpful, concise, and futuristic.
      The user is currently in "${context || 'General'}" mode.
      Keep answers short and relevant to an operating system context.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction,
      }
    });

    return response.text || "I'm processing that request but couldn't generate a text response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I am currently offline or experiencing connection issues.";
  }
};
