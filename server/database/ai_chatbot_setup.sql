CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS ai_chat_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id INT NULL REFERENCES users(id) ON DELETE SET NULL,
  session_key VARCHAR(120) UNIQUE NOT NULL,
  memory JSONB DEFAULT '{}'::jsonb,
  summary TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ai_chat_messages (
  id BIGSERIAL PRIMARY KEY,
  session_id UUID REFERENCES ai_chat_sessions(id) ON DELETE CASCADE,
  role VARCHAR(20) NOT NULL,
  content TEXT NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS ai_chat_messages_session_idx
ON ai_chat_messages (session_id, created_at DESC);

CREATE TABLE IF NOT EXISTS ai_chat_analytics (
  id BIGSERIAL PRIMARY KEY,
  session_id UUID REFERENCES ai_chat_sessions(id) ON DELETE SET NULL,
  user_message TEXT,
  detected_intent VARCHAR(100),
  retrieved_count INT DEFAULT 0,
  latency_ms INT DEFAULT 0,
  error TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS tours_fts_idx
ON tours USING GIN (
  to_tsvector('simple', coalesce(name, '') || ' ' || coalesce(description, '') || ' ' || coalesce(duration, ''))
);

CREATE INDEX IF NOT EXISTS blogs_fts_idx
ON blogs USING GIN (
  to_tsvector('simple', coalesce(title, '') || ' ' || coalesce(content, ''))
);

CREATE INDEX IF NOT EXISTS countries_fts_idx
ON countries USING GIN (
  to_tsvector('simple', coalesce(name, '') || ' ' || coalesce(description, ''))
);
