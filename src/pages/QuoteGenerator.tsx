import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles, Download, Copy, RefreshCcw, Wand2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useSiteSettings } from "@/hooks/use-site-settings";

const themes = ["Faith", "Prayer", "Love", "Hope", "Worship", "Grace", "Strength", "Healing", "Salvation", "Peace", "Custom"];

const QuoteGenerator = () => {
  const [theme, setTheme] = useState("Faith");
  const [customPrompt, setCustomPrompt] = useState("");
  const [quotes, setQuotes] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [manualText, setManualText] = useState("");
  const { toast } = useToast();
  const { settings } = useSiteSettings();

  const text = manualText.trim() || quotes[activeIndex] || "";

  const generate = async () => {
    setLoading(true);
    try {
      const payload: any = { theme: theme === "Custom" ? customPrompt || "Faith" : theme };
      const { data, error } = await supabase.functions.invoke("generate-quotes", { body: payload });
      if (error) throw error;
      setQuotes(data.quotes || []);
      setActiveIndex(0);
      setManualText("");
    } catch {
      toast({ title: "Could not generate quotes. Try again.", variant: "destructive" });
    }
    setLoading(false);
  };

  // Auto-fit canvas renderer
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const SIZE = 1080;
    canvas.width = SIZE; canvas.height = SIZE;
    const ctx = canvas.getContext("2d")!;

    // Background gradient (brand)
    const grad = ctx.createLinearGradient(0, 0, SIZE, SIZE);
    grad.addColorStop(0, "#6b21a8");
    grad.addColorStop(1, "#3b0764");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, SIZE, SIZE);

    // Decorative gold border
    ctx.strokeStyle = "#d4a843";
    ctx.lineWidth = 14;
    ctx.strokeRect(36, 36, SIZE - 72, SIZE - 72);

    // Logo top center
    const logo = new Image();
    logo.crossOrigin = "anonymous";
    logo.src = "/images/gpc-logo.png";
    logo.onload = () => drawAll(logo);
    if (logo.complete) drawAll(logo);

    function drawAll(logoImg: HTMLImageElement) {
      ctx.fillStyle = grad as any;
      ctx.fillRect(0, 0, SIZE, SIZE);
      ctx.strokeStyle = "#d4a843"; ctx.lineWidth = 14;
      ctx.strokeRect(36, 36, SIZE - 72, SIZE - 72);

      // Logo
      const lw = 140;
      try { ctx.drawImage(logoImg, (SIZE - lw) / 2, 80, lw, lw); } catch {}

      // Church name under logo
      ctx.fillStyle = "#d4a843";
      ctx.font = "bold 24px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("GLOBAL POWER CHURCH", SIZE / 2, 250);

      // Compute auto-fit text
      const safeText = text || "Your inspirational quote will appear here.";
      const maxWidth = SIZE - 200;
      const topY = 290;
      const bottomY = SIZE - 220;
      const availH = bottomY - topY;

      // Binary search font size 28..120
      let lo = 28, hi = 120, bestSize = 28, bestLines: string[] = [safeText];
      while (lo <= hi) {
        const mid = Math.floor((lo + hi) / 2);
        ctx.font = `bold ${mid}px Georgia, serif`;
        const lines = wrapText(ctx, safeText, maxWidth);
        const lineH = mid * 1.25;
        const total = lines.length * lineH;
        if (total <= availH && lines.every(l => ctx.measureText(l).width <= maxWidth)) {
          bestSize = mid; bestLines = lines; lo = mid + 1;
        } else { hi = mid - 1; }
      }

      ctx.fillStyle = "#ffffff";
      ctx.font = `bold ${bestSize}px Georgia, serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const lineH = bestSize * 1.25;
      const totalH = bestLines.length * lineH;
      const startY = topY + (availH - totalH) / 2 + lineH / 2;
      bestLines.forEach((line, i) => ctx.fillText(line, SIZE / 2, startY + i * lineH));

      // Footer contact info
      ctx.fillStyle = "#d4a843";
      ctx.font = "bold 22px sans-serif";
      ctx.fillText(`📞 ${settings.phone}  ✉ ${settings.email}`, SIZE / 2, SIZE - 130);
      ctx.fillStyle = "#ffffff";
      ctx.font = "italic 20px sans-serif";
      ctx.fillText("globalpowerchurch.org", SIZE / 2, SIZE - 90);
    }
  }, [text, settings.phone, settings.email]);

  const download = () => {
    const c = canvasRef.current; if (!c) return;
    const a = document.createElement("a");
    a.download = `gpc-quote-${Date.now()}.png`;
    a.href = c.toDataURL("image/png");
    a.click();
  };

  const copyText = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    toast({ title: "Quote copied!" });
  };

  return (
    <div className="min-h-screen bg-background pt-28 pb-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-10 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold mb-4">
            <Sparkles className="h-4 w-4" /> AI Quote Generator
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Get a Quote</h1>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">Generate inspirational Christian quotes or design your own — perfectly fitted with the church logo, contact info and brand colors.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Controls */}
          <Card className="animate-fade-in">
            <CardContent className="p-6 space-y-5">
              <div>
                <Label>Theme</Label>
                <Select value={theme} onValueChange={setTheme}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{themes.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              {theme === "Custom" && (
                <div>
                  <Label>Custom prompt</Label>
                  <Input value={customPrompt} onChange={e => setCustomPrompt(e.target.value)} placeholder="e.g. encouragement for new believers" />
                </div>
              )}
              <Button onClick={generate} disabled={loading} className="w-full h-12 text-base">
                <Wand2 className="h-4 w-4 mr-2" />{loading ? "Generating..." : "Generate Quotes"}
              </Button>

              {quotes.length > 0 && (
                <div className="space-y-2 animate-fade-in">
                  <Label>Pick one</Label>
                  <div className="grid gap-2 max-h-60 overflow-y-auto pr-1">
                    {quotes.map((q, i) => (
                      <button key={i} onClick={() => { setActiveIndex(i); setManualText(""); }}
                        className={`text-left p-3 rounded-lg border transition-all hover-scale ${i === activeIndex && !manualText ? 'border-primary bg-primary/5' : 'border-border bg-card'}`}>
                        <p className="text-sm italic">"{q}"</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <Label>Or write your own text</Label>
                <Textarea rows={4} value={manualText} onChange={e => setManualText(e.target.value)} placeholder="Type any verse, message, or announcement…" />
                <p className="text-xs text-muted-foreground mt-1">Short text spreads large; long text auto-fits cleanly.</p>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={copyText}><Copy className="h-4 w-4 mr-2" />Copy</Button>
                <Button variant="outline" className="flex-1" onClick={() => { setManualText(""); setQuotes([]); }}><RefreshCcw className="h-4 w-4 mr-2" />Reset</Button>
                <Button className="flex-1" onClick={download}><Download className="h-4 w-4 mr-2" />Download</Button>
              </div>
            </CardContent>
          </Card>

          {/* Preview */}
          <div className="flex items-center justify-center animate-fade-in">
            <div className="w-full max-w-md aspect-square rounded-2xl overflow-hidden shadow-2xl ring-1 ring-border">
              <canvas ref={canvasRef} className="w-full h-full block" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let cur = "";
  for (const w of words) {
    const test = cur ? cur + " " + w : w;
    if (ctx.measureText(test).width > maxWidth && cur) {
      lines.push(cur); cur = w;
    } else cur = test;
  }
  if (cur) lines.push(cur);
  return lines;
}

export default QuoteGenerator;
