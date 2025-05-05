import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const FLASK_API_URL = process.env.FLASK_API_URL;
    if (!FLASK_API_URL) {
      throw new Error("Flask API URL is not defined");
    }
    
    // Get the requested type (default "pie")
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type") || "pie";
    
    const response = await fetch(`${FLASK_API_URL}/api/stats?type=${type}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

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