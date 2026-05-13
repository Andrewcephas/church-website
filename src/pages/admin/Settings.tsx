import { useState, useEffect } from "react";
import { useSiteSettings, type SiteSettings } from "@/hooks/use-site-settings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { 
  Save, 
  Palette, 
  Image as ImageIcon, 
  RefreshCw,
  Plus,
  Trash2
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export default function Settings() {
  const { settings: initialSettings } = useSiteSettings();
  const updateSettings = (_s: any) => {};
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [colorSettings, setColorSettings] = useState<any[]>([]);
  const [formData, setFormData] = useState(initialSettings);

  const normalizeHsl = (value: string) => value.replace(/^hsl\(/, "").replace(/\)$/, "").trim();

  useEffect(() => {
    const root = getComputedStyle(document.documentElement);
    const savedColors = initialSettings.theme_colors || {};
    const colors = [
      { name: 'Primary', key: '--primary', value: root.getPropertyValue('--primary').trim(), category: 'primary', hsl: '217 100% 50%' },
      { name: 'Primary Light', key: '--primary-light', value: root.getPropertyValue('--primary-light').trim(), category: 'primary', hsl: '217 100% 60%' },
      { name: 'Primary Dark', key: '--primary-dark', value: root.getPropertyValue('--primary-dark').trim(), category: 'primary', hsl: '217 100% 35%' },
      { name: 'Secondary', key: '--secondary', value: root.getPropertyValue('--secondary').trim(), category: 'secondary', hsl: '43 80% 50%' },
      { name: 'Accent', key: '--accent', value: root.getPropertyValue('--accent').trim(), category: 'accent', hsl: '270 30% 25%' },
      { name: 'Background', key: '--background', value: root.getPropertyValue('--background').trim(), category: 'background', hsl: '0 0% 100%' },
      { name: 'Foreground', key: '--foreground', value: root.getPropertyValue('--foreground').trim(), category: 'text', hsl: '240 10% 10%' },
    ];
    setColorSettings(colors.map(c => ({ ...c, hsl: normalizeHsl((savedColors as any)[c.key] || c.value || c.hsl) })));
    setFormData(initialSettings);
  }, [initialSettings]);

  const handleColorChange = (key: string, hslValue: string) => {
    setColorSettings(prev => 
      prev.map(c => c.key === key ? { ...c, hsl: hslValue } : c)
    );
    
    if (previewMode) {
      document.documentElement.style.setProperty(key, `hsl(${hslValue})`);
    }
  };

  const resetToDefault = () => {
    const defaults = [
      { key: '--primary', hsl: '217 100% 50%' },
      { key: '--primary-light', hsl: '217 100% 60%' },
      { key: '--primary-dark', hsl: '217 100% 35%' },
      { key: '--secondary', hsl: '43 80% 50%' },
      { key: '--accent', hsl: '270 30% 25%' },
      { key: '--background', hsl: '0 0% 100%' },
      { key: '--foreground', hsl: '240 10% 10%' },
    ];
    
    defaults.forEach(d => {
      document.documentElement.style.setProperty(d.key, `hsl(${d.hsl})`);
    });
    
    setColorSettings(prev => 
      prev.map(c => {
        const def = defaults.find(d => d.key === c.key);
        return def ? { ...c, hsl: def.hsl } : c;
      })
    );
    
    toast({
      title: "Colors Reset",
      description: "All theme colors restored to defaults.",
    });
  };

  const saveSettings = async () => {
    setLoading(true);
    try {
      const colorVars = colorSettings.reduce((acc, c) => {
        acc[c.key] = `hsl(${c.hsl})`;
        return acc;
      }, {} as any);
      const settingsToSave = { ...formData, theme_colors: colorVars };
      const rows = Object.entries(settingsToSave).map(([key, value]) => ({ key, value: value as any }));
      const { error } = await supabase.from('site_settings').upsert(rows, { onConflict: 'key' });
      if (error) throw error;
      updateSettings(settingsToSave);
      
      // Apply all colors permanently
      Object.entries(colorVars).forEach(([key, value]) => {
        document.documentElement.style.setProperty(key, value as string);
      });
      
      toast({
        title: "Settings Saved",
        description: "Your website settings have been updated.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save settings.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const categoryColors = {
    primary: 'border-l-4 border-l-primary bg-primary/5',
    secondary: 'border-l-4 border-l-secondary bg-secondary/5',
    accent: 'border-l-4 border-l-accent bg-accent/5',
    background: 'border-l-4 border-l-muted bg-muted/5',
    text: 'border-l-4 border-l-foreground bg-foreground/5',
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Configure appearance and content</p>
      </div>

      <div className="grid gap-6">
        {/* Color Palette */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Color Configuration
            </CardTitle>
            <div className="flex items-center gap-2">
              <Switch
                id="preview"
                checked={previewMode}
                onCheckedChange={setPreviewMode}
              />
              <Label htmlFor="preview" className="cursor-pointer">
                Live Preview
              </Label>
              <Button variant="ghost" size="sm" onClick={resetToDefault}>
                <RefreshCw className="h-4 w-4 mr-1" />
                Reset
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {['primary', 'secondary', 'accent', 'background', 'text'].map(category => (
                <div key={category} className="space-y-3">
                  <h3 className="text-sm font-medium capitalize text-muted-foreground">{category}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {colorSettings
                      .filter(c => c.category === category)
                      .map((color) => (
                        <div
                          key={color.key}
                          className={`p-3 rounded-lg border ${categoryColors[color.category]} space-y-2`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">{color.name}</span>
                            <div 
                              className="w-6 h-6 rounded-full border border-border"
                              style={{ backgroundColor: `hsl(${color.hsl})` }}
                            />
                          </div>
                          <Input
                            type="text"
                            value={color.hsl}
                            onChange={(e) => handleColorChange(color.key, e.target.value)}
                            placeholder="217 100% 50%"
                            className="font-mono text-sm"
                          />
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Site Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5" />
              Site Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="youtube_url">YouTube Channel</Label>
                <Input
                  id="youtube_url"
                  name="youtube_url"
                  value={formData.youtube_url}
                  onChange={(e) => setFormData({...formData, youtube_url: e.target.value})}
                  placeholder="https://youtube.com/@church"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="facebook_url">Facebook Group</Label>
                <Input
                  id="facebook_url"
                  name="facebook_url"
                  value={formData.facebook_url}
                  onChange={(e) => setFormData({...formData, facebook_url: e.target.value})}
                  placeholder="https://facebook.com/groups/church"
                />
              </div>
            </div>
            
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="whatsapp">WhatsApp</Label>
                <Input
                  id="whatsapp"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                  placeholder="254712345678"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="+254 712 345 678"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="info@church.org"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5" />
              Ministries
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {(formData.ministries || []).map((ministry, index) => (
              <div key={index} className="grid gap-3 rounded-lg border border-border p-3 sm:grid-cols-[1fr_2fr_auto]">
                <div className="space-y-2">
                  <Label>Ministry name</Label>
                  <Input value={ministry.title} onChange={(e) => {
                    const ministries = [...(formData.ministries || [])];
                    ministries[index] = { ...ministries[index], title: e.target.value };
                    setFormData({ ...formData, ministries });
                  }} />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea value={ministry.description} onChange={(e) => {
                    const ministries = [...(formData.ministries || [])];
                    ministries[index] = { ...ministries[index], description: e.target.value };
                    setFormData({ ...formData, ministries });
                  }} rows={2} />
                </div>
                <Button type="button" variant="ghost" size="icon" className="self-end" onClick={() => setFormData({ ...formData, ministries: (formData.ministries || []).filter((_, i) => i !== index) })}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={() => setFormData({ ...formData, ministries: [...(formData.ministries || []), { title: "", description: "" }] })}>
              <Plus className="h-4 w-4 mr-2" />Add Ministry
            </Button>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={resetToDefault}>
            Reset Colors
          </Button>
          <Button onClick={saveSettings} disabled={loading}>
            <Save className="h-4 w-4 mr-2" />
            {loading ? 'Saving...' : 'Save All'}
          </Button>
        </div>
      </div>
    </div>
  );
}
