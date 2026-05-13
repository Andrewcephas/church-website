import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const fallbackQuotes = (theme: string) => [
  `${theme} rises when we trust God beyond what we can see.`,
  `Let your ${theme.toLowerCase()} speak louder than fear today.`,
  `God is still writing powerful testimony through every season of ${theme.toLowerCase()}.`,
  `A heart anchored in Christ will always find strength for the next step.`,
  `May your life reflect God's power, grace, and transforming love today.`,
];

const parseQuotes = (content: string, theme: string): string[] => {
  const cleaned = content.replace(/```json|```/gi, "").trim();
  try {
    const parsed = JSON.parse(cleaned);
    if (Array.isArray(parsed)) return parsed.map(String).filter(Boolean).slice(0, 5);
  } catch (_) {}

  const match = cleaned.match(/\[[\s\S]*\]/);
  if (match) {
    try {
      const parsed = JSON.parse(match[0]);
      if (Array.isArray(parsed)) return parsed.map(String).filter(Boolean).slice(0, 5);
    } catch (_) {}
  }

  const lines = cleaned.split(/\n+/).map((line) => line.replace(/^[-\d.)\s"]+|"$/g, "").trim()).filter(Boolean);
  return lines.length ? lines.slice(0, 5) : fallbackQuotes(theme);
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: corsHeaders,
    });
  }

  try {
    const { theme: rawTheme } = await req.json().catch(() => ({ theme: "Faith" }));
    const theme = String(rawTheme || "Faith").slice(0, 120);
    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!apiKey) return new Response(JSON.stringify({ quotes: fallbackQuotes(theme) }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

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
    const quotes = parseQuotes(content, theme);

    return new Response(JSON.stringify({ quotes }), {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
  } catch (_) {
    return new Response(JSON.stringify({ quotes: fallbackQuotes("Faith") }), {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
  }
});
