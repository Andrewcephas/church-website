
-- Members table
CREATE TABLE public.members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  gender TEXT,
  department TEXT,
  join_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can manage members" ON public.members FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Attendance table
CREATE TABLE public.attendance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  service TEXT NOT NULL,
  date DATE NOT NULL,
  count INTEGER NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can manage attendance" ON public.attendance FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Finance table
CREATE TABLE public.finance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  type TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  date DATE NOT NULL,
  giver TEXT,
  method TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.finance ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can manage finance" ON public.finance FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Events table
CREATE TABLE public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  date DATE NOT NULL,
  time TEXT,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can manage events" ON public.events FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Public can view events" ON public.events FOR SELECT TO anon USING (true);

-- Sermons table
CREATE TABLE public.sermons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  speaker TEXT DEFAULT 'Bishop Paul Ndolo Mulu',
  date DATE NOT NULL,
  topic TEXT,
  video_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.sermons ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can manage sermons" ON public.sermons FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Public can view sermons" ON public.sermons FOR SELECT TO anon USING (true);

-- Communications table
CREATE TABLE public.communications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.communications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can manage communications" ON public.communications FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Prayer requests table
CREATE TABLE public.prayer_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT,
  request TEXT NOT NULL,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.prayer_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit prayer requests" ON public.prayer_requests FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can view prayer requests" ON public.prayer_requests FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can update prayer requests" ON public.prayer_requests FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

-- Site settings table (for admin-editable content)
CREATE TABLE public.site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read site settings" ON public.site_settings FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Authenticated users can manage site settings" ON public.site_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);
