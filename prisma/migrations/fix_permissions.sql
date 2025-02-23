-- Grant usage on schema
GRANT USAGE ON SCHEMA public TO anon, authenticated;

-- Grant access to all existing tables
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL ROUTINES IN SCHEMA public TO anon, authenticated;

-- Grant specific permissions for master_currency table
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.master_currency TO anon, authenticated;

-- Grant specific permissions for currency table
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.currency TO anon, authenticated;

-- Grant specific permissions for documentinteractive tables
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.documentinteractive TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.documentinteractive_variable TO anon, authenticated;

-- Set up default privileges for future tables
ALTER DEFAULT PRIVILEGES IN SCHEMA public 
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO anon, authenticated;

ALTER DEFAULT PRIVILEGES IN SCHEMA public 
GRANT ALL ON SEQUENCES TO anon, authenticated;

-- Enable RLS (Row Level Security) on tables
ALTER TABLE public.master_currency ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.currency ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documentinteractive ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documentinteractive_variable ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Enable read access for all users" ON public.master_currency
    FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON public.currency
    FOR SELECT USING (true);

CREATE POLICY "Enable all access for authenticated users" ON public.documentinteractive
    FOR ALL USING (auth.uid() = "userId");

CREATE POLICY "Enable all access for authenticated users" ON public.documentinteractive_variable
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.documentinteractive
            WHERE id = documentinteractive_variable.documentId
            AND "userId" = auth.uid()
        )
    ); 