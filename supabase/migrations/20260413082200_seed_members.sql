-- Seed sample members for each branch (10 members per branch)
-- This will add dummy data with varied genders, categories, and birthdays

-- First, get branch IDs and create members for each
DO $$
DECLARE
  branch RECORD;
  member_count INT := 0;
  member_genders TEXT[] := ARRAY['Male', 'Female'];
  member_categories TEXT[] := ARRAY['Adult', 'Youth', 'Sunday School'];
  member_departments TEXT[] := ARRAY['Choir', 'Praise & Worship', 'Dance', 'Youth', 'Women', 'Men', 'Hospitality', 'Crusades'];
  first_names_male TEXT[] := ARRAY['John', 'David', 'Michael', 'James', 'Robert', 'William', 'Daniel', 'Joseph', 'Thomas', 'George'];
  first_names_female TEXT[] := ARRAY['Mary', 'Grace', 'Faith', 'Hope', 'Joy', 'Sarah', 'Ruth', 'Esther', 'Rebecca', 'Deborah'];
  last_names TEXT[] := ARRAY['Mwangi', 'Ndungu', 'Ochieng', 'Kimani', 'Omondi', 'Wambui', 'Kariuki', 'Onyango', 'Mutua', 'Njoroge'];
  locations TEXT[] := ARRAY['Kawangware', 'Kasarani', 'Mombasa Road', 'Industrial Area', 'Westlands', 'Eastleigh', 'Karen', 'Ruiru', 'Kiambu', 'Thika'];
BEGIN
  FOR branch IN SELECT id, branch_name FROM branches LOOP
    member_count := 0;
    FOR i IN 1..10 LOOP
      DECLARE
        is_male BOOLEAN := (i <= 5);
        gender TEXT;
        first_name TEXT;
        category TEXT;
        dept TEXT;
        dob DATE;
        join_date DATE;
        addr TEXT;
      BEGIN
        gender := member_genders[1 + (i % 2)];
        first_name := CASE WHEN gender = 'Male' THEN first_names_male[i] ELSE first_names_female[i] END;
        category := member_categories[1 + (i % 3)];
        dept := member_departments[1 + (i % 8)];
        dob := DATE '1990-01-01' + (random() * 13000)::INT;
        join_date := DATE '2023-01-01' + (random() * 730)::INT;
        addr := locations[1 + (i % 10)] || ', Nairobi';
        
        INSERT INTO members (name, phone, email, gender, department, date_of_birth, branch_id, address, member_category, join_date, created_at)
        VALUES (
          first_name || ' ' || last_names[1 + (i % 10)],
          '+2547' || LPAD((700000000 + (branch.id::int % 10000000) + i)::TEXT, 8, '0'),
          LOWER(first_name) || '.' || last_names[1 + (i % 10)] || '@email.com',
          gender,
          dept,
          dob,
          branch.id,
          addr,
          category,
          join_date,
          NOW()
        );
      END;
    END LOOP;
    RAISE NOTICE 'Added 10 members for branch: %', branch.branch_name;
  END LOOP;
END $$;