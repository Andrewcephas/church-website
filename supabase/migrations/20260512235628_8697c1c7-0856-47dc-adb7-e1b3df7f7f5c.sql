ALTER TABLE public.notices
ADD COLUMN IF NOT EXISTS image_url text;

INSERT INTO storage.buckets (id, name, public)
VALUES ('notice-images', 'notice-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

DROP POLICY IF EXISTS "Notice images are publicly viewable" ON storage.objects;
CREATE POLICY "Notice images are publicly viewable"
ON storage.objects
FOR SELECT
USING (bucket_id = 'notice-images');

DROP POLICY IF EXISTS "Authenticated leaders can upload notice images" ON storage.objects;
CREATE POLICY "Authenticated leaders can upload notice images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'notice-images'
  AND (
    public.has_role(auth.uid(), 'super_admin')
    OR public.has_role(auth.uid(), 'branch_admin')
    OR public.has_role(auth.uid(), 'secretary')
    OR public.has_role(auth.uid(), 'teacher')
  )
);

DROP POLICY IF EXISTS "Authenticated leaders can update notice images" ON storage.objects;
CREATE POLICY "Authenticated leaders can update notice images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'notice-images'
  AND (
    public.has_role(auth.uid(), 'super_admin')
    OR public.has_role(auth.uid(), 'branch_admin')
    OR public.has_role(auth.uid(), 'secretary')
    OR public.has_role(auth.uid(), 'teacher')
  )
)
WITH CHECK (
  bucket_id = 'notice-images'
  AND (
    public.has_role(auth.uid(), 'super_admin')
    OR public.has_role(auth.uid(), 'branch_admin')
    OR public.has_role(auth.uid(), 'secretary')
    OR public.has_role(auth.uid(), 'teacher')
  )
);

DROP POLICY IF EXISTS "Authenticated leaders can delete notice images" ON storage.objects;
CREATE POLICY "Authenticated leaders can delete notice images"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'notice-images'
  AND (
    public.has_role(auth.uid(), 'super_admin')
    OR public.has_role(auth.uid(), 'branch_admin')
    OR public.has_role(auth.uid(), 'secretary')
    OR public.has_role(auth.uid(), 'teacher')
  )
);