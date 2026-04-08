import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const LOVABLE_API_URL = Deno.env.get("SUPABASE_URL")!.replace(
  ".supabase.co",
  ".functions.supabase.co"
);

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
      },
    });
  }

  try {
    const { theme } = await req.json();
    const apiKey = Deno.env.get("LOVABLE_API_KEY");

    const response = await fetch("https://api.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content:
              "You are a Christian quote generator for Global Power Church. Generate exactly 5 short, powerful, inspirational quotes for social media posting. Each quote should be 1-2 sentences. Return ONLY a JSON array of 5 strings, nothing else.",
          },
          {
            role: "user",
            content: `Generate 5 ${theme}-themed Christian quotes for social media. Return only a JSON array.`,
          },
        ],
        temperature: 0.8,
      }),
    });

    const result = await response.json();
    const content = result.choices?.[0]?.message?.content || "[]";
    // Extract JSON array from response
    const match = content.match(/\[[\s\S]*\]/);
    const quotes = match ? JSON.parse(match[0]) : [];

    return new Response(JSON.stringify({ quotes }), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message, quotes: [] }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
});
