
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getGamingAdvice = async (query: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: query,
      config: {
        systemInstruction: "You are the 'PlayStation.lk Gaming Assistant'. You help Sri Lankan gamers choose consoles, games, and troubleshoot basic technical issues. Keep responses enthusiastic, tech-forward, and concise. Use PlayStation branding where appropriate."
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm having trouble connecting to the PSN network. Please try again later!";
  }
};

export const diagnoseRepair = async (issue: string, device: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Device: ${device}\nIssue: ${issue}`,
      config: {
        systemInstruction: "You are a technical repair diagnostic expert. Analyze the provided device and issue and give a short, professional estimated diagnosis and whether it likely needs a physical component replacement or just a software reset. Don't give price estimates."
      }
    });
    return response.text;
  } catch (error) {
    console.error("Diagnosis Error:", error);
    return "Please bring your device to our service center for a manual inspection.";
  }
};
