import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const ApiKey = "AIzaSyDwzIf2B0EuuIinZZSFzo8bjRRxWXK973k"; // Replace with your actual API key
  // const ApiKey = "AIzaSyCkP_hJpgrWURhfqAPO6StRMX-6MJhg800"; // Replace with your actual API key

  try {
    // Parse the request body as JSON
    const body = await req.json();
    const { prompt } = body;
    console.log("🚀 ~ POST ~ body:", body)

    // Validate the prompt
    if (!prompt) {
      return NextResponse.json(
        { message: "Prompt is required" },
        { status: 400 }
      );
    }

    // Initialize the Gemini API client
    const genAI = new GoogleGenerativeAI(ApiKey);
    console.log("🚀 ~ POST ~ genAI:", genAI)
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    console.log("🚀 ~ POST ~ model:", model)
    // Generate content using the Gemini API
    const result = await model.generateContent(prompt);
    const response = result.response;
    console.log("🚀 ~ POST ~ response:", response)
    
    // Assuming response.text() returns raw text, let's structure it
    const text =  response.text();
    console.log("🚀 ~ POST ~ text:", text)

    // Define a way to parse and format the text into structured content
    const structuredText = text
      .split("\n")
      .map(line => {
        // Check if the line starts with a heading pattern like "Geography:"
        if (line.endsWith(":")) {
          return `**${line}**`;  // Add a heading indicator
        }
        return line;  // Regular content
      })
      .join("\n");

    console.log("🚀 ~ POST ~ structuredText:", structuredText);

    // Return the structured text as a JSON response
    return NextResponse.json({ text: structuredText }, { status: 200 });
  } catch (error) {
    console.error("Error generating content:", error);

    // Return a 500 error with a descriptive message
    return NextResponse.json(
      { message: "Failed to generate content" },
      { status: 500 }
    );
  }
}
