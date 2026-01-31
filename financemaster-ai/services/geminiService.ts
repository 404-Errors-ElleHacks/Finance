import { GoogleGenAI } from "@google/genai";
import { Stock, MarketNews } from '../types';

let ai: GoogleGenAI | null = null;

try {
  if (process.env.API_KEY) {
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
} catch (error) {
  console.error("Failed to initialize Gemini client:", error);
}

const SAFETY_TIP_FALLBACK = "Always keep an emergency fund of 3-6 months of expenses.";

export const getFinancialTip = async (topic: string = 'general'): Promise<string> => {
  if (!ai) return Promise.resolve(SAFETY_TIP_FALLBACK);

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Provide a single, concise, and actionable financial tip about ${topic} for a beginner. Max 30 words.`,
    });
    return response.text?.trim() || SAFETY_TIP_FALLBACK;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return SAFETY_TIP_FALLBACK;
  }
};

export const getMarketAnalysis = async (stock: Stock): Promise<string> => {
  if (!ai) return "Market analysis unavailable.";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a 1-sentence fictional financial news headline explaining why ${stock.name} stock moved ${stock.changePercent.toFixed(2)}% today. Be creative but realistic.`,
    });
    return response.text?.trim() || "Market volatility continues as investors digest new data.";
  } catch (error) {
    return "Analyst data currently unavailable.";
  }
};

export const getContextualTip = async (userBalance: number, equity: number): Promise<string> => {
    if (!ai) return "Review your portfolio regularly to ensure it matches your goals.";
    
    const context = userBalance > equity 
        ? "The user has a lot of uninvested cash." 
        : "The user is heavily invested in the market.";

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: `Context: ${context} User Balance: $${userBalance}. User Equity: $${equity}. 
            Give a 1-sentence piece of advice for this simulated trading game player.`,
        });
        return response.text?.trim() || "Keep an eye on market trends.";
    } catch (e) {
        return "Diversify your investments to manage risk.";
    }
}
