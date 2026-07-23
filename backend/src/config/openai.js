import OpenAI from "openai";

if (!process.env.OPENAI_API_KEY) {
  console.warn("[ai] OPENAI_API_KEY is not set — AI stylist will return 501.");
}

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

export default openai;