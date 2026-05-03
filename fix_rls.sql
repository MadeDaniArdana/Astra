-- Tambahkan izin INSERT, UPDATE, DELETE untuk publik (karena kita menggunakan anon key untuk seeding)
CREATE POLICY "Anyone can insert cultural assets." 
ON cultural_assets FOR INSERT 
WITH CHECK ( true );

CREATE POLICY "Anyone can update cultural assets." 
ON cultural_assets FOR UPDATE 
USING ( true );

CREATE POLICY "Anyone can delete cultural assets." 
ON cultural_assets FOR DELETE 
USING ( true );
