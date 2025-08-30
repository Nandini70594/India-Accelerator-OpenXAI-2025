import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { text } = await req.json();

  if (!text?.trim()) {
    return NextResponse.json({ error: "No text provided" }, { status: 400 });
  }

  try {
    const response = await fetch("http://localhost:11434/v1/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama3:latest",
        prompt: `
Generate 5 multiple-choice questions from this text.
Mix question types: Meaning, Fill-in-the-blank, True/False.
Each question must be in this exact JSON format ONLY (no explanations, no extra text):

[
  {
    "question": "Your question here",
    "options": ["Option 1","Option 2","Option 3","Option 4"],
    "correct": 0
  }
]

Text:
"""${text}"""
        `,
        max_tokens: 600,
      }),
    });

    const data = await response.json();
    let rawText = data.choices?.[0]?.text || "";

    const jsonMatch = rawText.match(/\[.*\]/s);
    let questions = [];

    if (jsonMatch) {
      try {
        questions = JSON.parse(jsonMatch[0]);
      } catch {
        questions = [];
      }
    }

    if (!questions.length) {
      const sentences = text
        .split(".")
        .map((s) => s.trim())
        .filter((s) => s.length > 8);
      questions = sentences.slice(0, 5).map((s, i) => ({
        question: s + "?",
        options: [s, ...sentences.filter((x) => x !== s).slice(0, 3)],
        correct: 0,
      }));
    }

    return NextResponse.json({ questions });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to generate questions" }, { status: 500 });
  }
}
