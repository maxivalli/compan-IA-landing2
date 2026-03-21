import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

export const getGeminiResponse = async (prompt: string) => {
  if (!apiKey) {
    console.error("GEMINI_API_KEY is not set.");
    return "Lo siento, no puedo responder en este momento.";
  }

  const ai = new GoogleGenAI({ apiKey });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: "Eres Rosita, una compañera de IA cálida y empática para adultos mayores. Tu objetivo es combatir la soledad, ofrecer compañía y ayudar con recordatorios. Hablas en español rioplatense (voseo) con un tono familiar y cariñoso.",
      },
    });

    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Hubo un problema al procesar tu solicitud.";
  }
};
