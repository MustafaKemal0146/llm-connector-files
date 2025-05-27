/*
  # Create commits table for version control

  1. New Tables
    - `commits`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references users.id)
      - `message` (text)
      - `changes` (jsonb)
      - `created_at` (timestamp with time zone)

  2. Security
    - Enable RLS
    - Add policies for authenticated users
*/

CREATE TABLE IF NOT EXISTS commits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  message text NOT NULL,
  changes jsonb DEFAULT '{}'::jsonb NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE commits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read all commits"
  ON commits
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert own commits"
  ON commits
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE INDEX commits_user_id_idx ON commits(user_id);
CREATE INDEX commits_created_at_idx ON commits(created_at DESC);