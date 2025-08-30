import "./globals.css";
import React from "react";

export const metadata = {
  title: "Smart MCQ Quiz Generator",
  description: "Generate MCQs from text using Ollama LLaMA3",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
      </head>
      <body className="bg-gradient-to-r from-purple-100 to-pink-50 min-h-screen">
        <div className="flex flex-col items-center justify-center p-4">
          {children}
        </div>
      </body>
    </html>
  );
}
