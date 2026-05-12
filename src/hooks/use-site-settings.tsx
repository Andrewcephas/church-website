import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface SiteSettings {
  phone: string;
  email: string;
  whatsapp: string;
  website_url: string;
  youtube_url: string;
  facebook_url: string;
  theme_colors?: Record<string, string>;
  services: { title: string; day: string; time: string; description: string }[];
  ministries: { title: string; description: string }[];
}

const defaults: SiteSettings = {
  phone: "0704129211",
  email: "paulndolo1972@gmail.com",
  whatsapp: "254704129211",
  website_url: "https://globalpowerchurch.co.ke",
  youtube_url: "https://www.youtube.com/@GLOBALPOWERCHURCH",
  facebook_url: "https://www.facebook.com/groups/1202497280341977",
  theme_colors: {},
  services: [
    { title: "Sunday Service", day: "Every Sunday", time: "Main Service", description: "Main Sunday Service" },
    { title: "Thursday Prayers", day: "Every Thursday", time: "4:00–6:00 PM", description: "Prayer Meeting" },
    { title: "Friday Kesha", day: "Every Friday", time: "Night Service", description: "All-Night Prayer" },
    { title: "Saturday Devotion", day: "Every Saturday", time: "6:00–7:00 AM", description: "Morning Devotion" },
  ],
  ministries: [
    { title: "Choir", description: "Worship through music and song" },
    { title: "Praise & Worship", description: "Leading the congregation in praise" },
    { title: "Dancers", description: "Dancing for the glory of God" },
    { title: "Youth Ministry", description: "Empowering the next generation" },
    { title: "Women Ministry", description: "Growing together in faith" },
    { title: "Men Ministry", description: "Building men of God" },
    { title: "Crusades", description: "Evangelism and outreach" },
    { title: "Hospitality", description: "Welcoming and serving guests" },
    { title: "Conferences", description: "Annual conferences and events" },
  ],
};

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings>(defaults);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from("site_settings").select("key, value");
      if (data && data.length > 0) {
        const merged = { ...defaults };
        data.forEach((row) => {
          if (row.key in merged) {
            (merged as any)[row.key] = row.value;
          }
        });
        if (merged.theme_colors && typeof merged.theme_colors === "object") {
          Object.entries(merged.theme_colors).forEach(([key, value]) => {
            if (key.startsWith("--") && typeof value === "string") document.documentElement.style.setProperty(key, value);
          });
        }
        setSettings(merged);
      }
      setLoading(false);
    };
    fetch();
  }, []);

  return { settings, loading };
}

export { defaults as siteSettingsDefaults };
