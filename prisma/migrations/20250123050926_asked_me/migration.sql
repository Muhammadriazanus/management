-- Create the AskedMe table
CREATE TABLE "AskedMe" (
    "id" SERIAL PRIMARY KEY, -- Shortcut for a primary key on an auto-incrementing integer
    "Question" TEXT NOT NULL, -- Represents the question, required field
    "searchText" TEXT NOT NULL, -- Represents the search text, required field
    "startTime" TIMESTAMP(3) NOT NULL, -- Start time with millisecond precision
    "endTime" TIMESTAMP(3) NOT NULL, -- End time with millisecond precision
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Default to current timestamp
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP -- Default to current timestamp
);

-- Create a function to update the updatedAt column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW."updatedAt" = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to call the function before any row is updated
CREATE TRIGGER set_updated_at
BEFORE UPDATE ON "AskedMe"
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
