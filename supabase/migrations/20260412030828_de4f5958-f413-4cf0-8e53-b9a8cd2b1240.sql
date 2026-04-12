
-- Add new roles to the enum
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'secretary';
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'member';

-- Add address and member_category to members
ALTER TABLE public.members ADD COLUMN IF NOT EXISTS address text;
ALTER TABLE public.members ADD COLUMN IF NOT EXISTS member_category text DEFAULT 'Adult';

-- Add is_conference to events
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS is_conference boolean DEFAULT false;

-- Create notices table
CREATE TABLE IF NOT EXISTS public.notices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  branch_id uuid REFERENCES public.branches(id),
  is_global boolean DEFAULT false,
  user_id uuid NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE public.notices ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated can manage notices" ON public.notices FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Create private messages table
CREATE TABLE IF NOT EXISTS public.private_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id uuid NOT NULL,
  receiver_id uuid NOT NULL,
  message text NOT NULL,
  is_read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE public.private_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own messages" ON public.private_messages FOR SELECT TO authenticated
USING (sender_id = auth.uid() OR receiver_id = auth.uid());
CREATE POLICY "Users can send messages" ON public.private_messages FOR INSERT TO authenticated
WITH CHECK (sender_id = auth.uid());
CREATE POLICY "Receiver can update read status" ON public.private_messages FOR UPDATE TO authenticated
USING (receiver_id = auth.uid()) WITH CHECK (receiver_id = auth.uid());

-- Create login activity table
CREATE TABLE IF NOT EXISTS public.login_activity (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  user_email text,
  login_at timestamptz DEFAULT now()
);
ALTER TABLE public.login_activity ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated can manage login activity" ON public.login_activity FOR ALL TO authenticated USING (true) WITH CHECK (true);
