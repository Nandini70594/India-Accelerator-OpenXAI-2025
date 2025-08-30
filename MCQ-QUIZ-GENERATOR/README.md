### 🎯 Smart MCQ Quiz Generator

Smart MCQ Quiz Generator is a web application that generates multiple-choice questions (MCQs) from any text input using Ollama LLaMA3 AI model. It supports various question types like meaning, fill-in-the-blank, and true/false while maintaining a sleek Tailwind CSS UI.

### Features

Generate 5 MCQs from any text input
Supports different question types: Meaning, Fill-in-the-blank, True/False
Category selection: Education, Religion, Science, Technology, General Knowledge
Difficulty selection: Easy, Medium, Hard
Interactive quiz UI with score tracking
Built with Next.js 15, Tailwind CSS, and TypeScript
Uses Ollama LLaMA3 API for AI-powered question generation
Fallback mechanism ensures questions are generated even if AI fails
Folder Structure

my-app/
├─ app/
│ ├─ layout.tsx # Layout wrapper with Tailwind styles
│ ├─ page.tsx # Quiz UI component
│ ├─ globals.css # Tailwind CSS imports and global styles
│ └─ api/
│ └─ generate-quiz/
│ └─ route.ts # API route for Ollama LLaMA3 integration
├─ package.json
├─ tsconfig.json
├─ next.config.js
├─ tailwind.config.js
└─ postcss.config.js

### Installation

Clone the repository:
git clone <your-repo-url>
cd my-app

Install dependencies:
npm install

Run the development server:
npm run dev

Start Ollama LLaMA3 server locally:
ollama serve llama3:latest

Open http://localhost:3000
 in your browser

### Usage

Select a category
Select a difficulty level
Paste your text into the textarea
Click Generate Quiz
Answer the MCQs and see your score at the end
Click Restart to generate a new quiz

### Technologies Used

Next.js 15+ – React framework for server-side rendering and routing
React 18 – Frontend UI
Tailwind CSS – Utility-first styling
TypeScript – Type safety
Ollama LLaMA3 – AI-powered question generation
Node.js – Backend API integration

### API Integration
The /api/generate-quiz endpoint sends user input to LLaMA3 and receives a JSON array of questions:
[
{
"question": "Sample question?",
"options": ["Option 1","Option 2","Option 3","Option 4"],
"correct": 0
}
]

The app parses the JSON and displays questions in the UI
If AI fails, a fallback mechanism generates questions locally

Tailwind CSS Setup

Installed via PostCSS

globals.css includes:

@tailwind base;
@tailwind components;
@tailwind utilities;

Configured in tailwind.config.js for app/ and components/ folders

### Notes
Ensure Ollama LLaMA3 server is running on http://localhost:11434
Max text length is limited by max_tokens in the API call (currently 600)
Works best with English text inputs