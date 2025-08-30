"use client";

import React, { useState } from "react";

type Question = {
  question: string;
  options: string[];
  correct: number;
};

export default function QuizApp() {
  const [text, setText] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [category, setCategory] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState<string | null>(null);

  const generateQuestions = async () => {
    if (!text.trim()) return;

    try {
      const res = await fetch("/api/generate-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();

      if (res.ok) {
        setQuestions(data.questions);
        setCurrentQ(0);
        setScore(0);
        setFinished(false);
      } else {
        alert(data.error || "Failed to generate quiz");
      }
    } catch (err) {
      console.error(err);
      alert("Error generating quiz");
    }
  };

  const handleAnswer = (i: number) => {
    if (i === questions[currentQ].correct) setScore(score + 1);
    if (currentQ + 1 < questions.length) setCurrentQ(currentQ + 1);
    else setFinished(true);
  };

  const restart = () => {
    setText("");
    setQuestions([]);
    setCurrentQ(0);
    setScore(0);
    setFinished(false);
    setCategory(null);
    setDifficulty(null);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <div className="bg-white/90 rounded-2xl shadow-xl p-8 w-full max-w-2xl text-center">
        <h1 className="text-3xl font-bold mb-6 text-purple-700">
          🎯 Smart MCQ Quiz Generator
        </h1>

        {/* Category Selection */}
        {!category && (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Select a Category</h2>
            <div className="grid grid-cols-2 gap-4">
              {["Education", "Religion", "General Knowledge", "Science", "Technology"].map(
                (cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className="p-4 bg-gradient-to-r from-pink-400 to-purple-500 text-white font-semibold rounded-xl shadow-md hover:scale-105 transition"
                  >
                    {cat}
                  </button>
                )
              )}
            </div>
          </div>
        )}

        {/* Difficulty Selection */}
        {category && !difficulty && (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Choose Difficulty Level</h2>
            <div className="flex justify-center gap-4">
              {["Easy", "Medium", "Hard"].map((level) => (
                <button
                  key={level}
                  onClick={() => setDifficulty(level)}
                  className="px-6 py-2 bg-purple-400 hover:bg-purple-600 text-white rounded-full shadow-md transition"
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Text Input */}
        {category && difficulty && !questions.length && !finished && (
          <div>
            <textarea
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none mb-4 mt-6"
              rows={5}
              placeholder={`Paste your ${category} related text here...`}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button
              onClick={generateQuestions}
              className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg shadow-md transition"
            >
              Generate Quiz
            </button>
          </div>
        )}

        {/* Quiz */}
        {!finished && questions.length > 0 && (
          <div className="mt-4">
            <div className="bg-gray-100 p-6 rounded-xl shadow-inner">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">{questions[currentQ].question}</h2>
              <div className="space-y-3">
                {questions[currentQ].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(i)}
                    className="w-full bg-white border border-gray-300 hover:bg-purple-100 text-gray-700 px-4 py-2 rounded-lg shadow-sm transition"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
            <p className="mt-4 text-gray-500">
              Question {currentQ + 1} of {questions.length}
            </p>
          </div>
        )}

        {/* Finished Screen */}
        {finished && (
          <div className="mt-6">
            <h2 className="text-2xl font-bold text-green-600 mb-4">🎉 Quiz Finished!</h2>
            <p className="text-lg text-gray-700 mb-4">
              Your Score: <span className="font-semibold">{score}</span> / {questions.length}
            </p>
            <button
              onClick={restart}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md transition"
            >
              Restart
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
