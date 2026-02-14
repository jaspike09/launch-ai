import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "API Key Missing" }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: "You are the Sovereign Business Architect. Your mission is to pivot user ideas into high-margin $39/mo digital products within 30 days. Be cold, analytical, and ROI-focused. Refuse low-margin physical business models."
    });

    const roles = [
      { name: "THE MENTOR", task: "Step in and force a high-margin pivot if the idea is weak." },
      { name: "THE COACH", task: "Design a 30-day viral growth and acquisition strategy." },
      { name: "THE ACCOUNTANT", task: "Set pricing tiers: Founder ($39) and Growth ($99) for maximum ROI." }
    ];

    const boardResults = await Promise.all(
      roles.map(async (role) => {
        const res = await model.generateContent(`Role: ${role.name}. Task: ${role.task}. Analyze this mission: ${prompt}`);
        return { name: role.name, text: res.response.text() };
      })
    );

    const architectRes = await model.generateContent(
      `Synthesize these board insights into a definitive 30-day Sovereign Roadmap to revenue: ${JSON.stringify(boardResults)}`
    );

    return NextResponse.json({
      architect: architectRes.response.text(),
      board: boardResults
    });

  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: "Architect recalibrating..." }, { status: 500 });
  }
}
