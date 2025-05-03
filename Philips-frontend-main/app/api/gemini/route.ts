// app/api/gemini/route.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { pageContext } = await req.json();
    const { initialResponse } = req as any;

    if (!pageContext) {
      return NextResponse.json({ error: "Missing pageContext" }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-preview-04-17" });
    
    const prompt = `
    A user has just interacted with: "${pageContext}".
    The initial response is for question: "${initialResponse}".
    
    Generate 3 user feedback questions tailored to this context.
    
    IMPORTANT:
    - Return ONLY a raw JSON array of strings.
    - Do NOT include any explanation.
    - Do NOT wrap the JSON in markdown formatting (no backticks or 'json').
    - Output format example: ["Question 1", "Question 2", "Question 3"]
    `;
    
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    let raw = result.response.text().trim();

    // Remove markdown code block markers if present
    if (raw.startsWith("```")) {
      raw = raw.replace(/```json|```/g, "").trim();
    }
    
    let questions;
    try {
      questions = JSON.parse(raw);
      if (!Array.isArray(questions)) throw new Error("Gemini response is not an array");
    } catch (err) {
      return NextResponse.json({ error: "Invalid Gemini response", raw }, { status: 500 });
    }
    return NextResponse.json({ questions });
  } catch (err: any) {
    console.error("Gemini route error:", err);
    return NextResponse.json({ error: err.message || "Unknown error" }, { status: 500 });
  }
}
