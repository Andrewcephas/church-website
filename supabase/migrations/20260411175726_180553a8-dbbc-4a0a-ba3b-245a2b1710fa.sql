
-- 1. Create app role enum
CREATE TYPE public.app_role AS ENUM ('super_admin', 'branch_admin');

-- 2. Create branches table
CREATE TABLE public.branches (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  branch_name TEXT NOT NULL,
  location TEXT,
  pastor_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
ALTER TABLE public.branches ENABLE ROW LEVEL SECURITY;

-- 3. Create user_roles table
CREATE TABLE public.user_roles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  branch_id UUID REFERENCES public.branches(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 4. Security definer function to check roles (avoids RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Function to get user's branch_id
CREATE OR REPLACE FUNCTION public.get_user_branch_id(_user_id UUID)
RETURNS UUID
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT branch_id FROM public.user_roles
  WHERE user_id = _user_id LIMIT 1
$$;

-- Function to check if user can access a branch
CREATE OR REPLACE FUNCTION public.can_access_branch(_user_id UUID, _branch_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id
    AND (role = 'super_admin' OR branch_id = _branch_id)
  )
$$;

-- 5. Add branch_id and date_of_birth to members
ALTER TABLE public.members ADD COLUMN IF NOT EXISTS branch_id UUID REFERENCES public.branches(id) ON DELETE SET NULL;
ALTER TABLE public.members ADD COLUMN IF NOT EXISTS date_of_birth DATE;

-- 6. Add branch_id to other tables
ALTER TABLE public.attendance ADD COLUMN IF NOT EXISTS branch_id UUID REFERENCES public.branches(id) ON DELETE SET NULL;
ALTER TABLE public.finance ADD COLUMN IF NOT EXISTS branch_id UUID REFERENCES public.branches(id) ON DELETE SET NULL;
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS branch_id UUID REFERENCES public.branches(id) ON DELETE SET NULL;
ALTER TABLE public.sermons ADD COLUMN IF NOT EXISTS branch_id UUID REFERENCES public.branches(id) ON DELETE SET NULL;
ALTER TABLE public.communications ADD COLUMN IF NOT EXISTS branch_id UUID REFERENCES public.branches(id) ON DELETE SET NULL;

-- 7. Sunday school tables
CREATE TABLE public.sunday_school_classes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  class_name TEXT NOT NULL,
  age_group TEXT,
  teacher_name TEXT,
  branch_id UUID REFERENCES public.branches(id) ON DELETE SET NULL,
  user_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
ALTER TABLE public.sunday_school_classes ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.sunday_school_members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  class_id UUID NOT NULL REFERENCES public.sunday_school_classes(id) ON DELETE CASCADE,
  member_id UUID NOT NULL REFERENCES public.members(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(class_id, member_id)
);
ALTER TABLE public.sunday_school_members ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.sunday_school_attendance (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  class_id UUID NOT NULL REFERENCES public.sunday_school_classes(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  present_count INTEGER NOT NULL DEFAULT 0,
  notes TEXT,
  user_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
ALTER TABLE public.sunday_school_attendance ENABLE ROW LEVEL SECURITY;

-- 8. RLS Policies for branches
CREATE POLICY "Authenticated can read branches" ON public.branches FOR SELECT TO authenticated USING (true);
CREATE POLICY "Super admin can manage branches" ON public.branches FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'super_admin'))
  WITH CHECK (public.has_role(auth.uid(), 'super_admin'));

-- 9. RLS for user_roles
CREATE POLICY "Users can read own role" ON public.user_roles FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.has_role(auth.uid(), 'super_admin'));
CREATE POLICY "Super admin can manage roles" ON public.user_roles FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'super_admin'))
  WITH CHECK (public.has_role(auth.uid(), 'super_admin'));

-- 10. RLS for sunday school tables
CREATE POLICY "Authenticated can manage sunday school classes" ON public.sunday_school_classes FOR ALL TO authenticated
  USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated can manage sunday school members" ON public.sunday_school_members FOR ALL TO authenticated
  USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated can manage sunday school attendance" ON public.sunday_school_attendance FOR ALL TO authenticated
  USING (true) WITH CHECK (true);

-- 11. Allow authenticated to delete prayer requests
CREATE POLICY "Authenticated users can delete prayer requests" ON public.prayer_requests FOR DELETE TO authenticated
  USING (true);
