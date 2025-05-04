import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const FLASK_API_URL = process.env.FLASK_API_URL;
    if (!FLASK_API_URL) {
      throw new Error("Flask API URL is not defined");
    }

    const response = await fetch(`${FLASK_API_URL}/api/feedback`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    // Log response text for debugging
    const text = await response.text();

    try {
      const resData = JSON.parse(text);
      if (!response.ok) {
        return NextResponse.json(
          { error: resData.error || "Error from Flask API" },
          { status: response.status }
        );
      }
      return NextResponse.json(resData, { status: 200 });
    } catch (jsonError) {
      // If JSON.parse fails, return error with the text
      return NextResponse.json(
        { error: "Invalid JSON received from Flask API", raw: text },
        { status: 500 }
      );
    }

  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Unknown error" },
      { status: 500 }
    );
  }
}