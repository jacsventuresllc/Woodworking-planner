-- Woodworking Project Planner - MVP Database Schema
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE "User" (
    id              UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
    email           VARCHAR(255) UNIQUE NOT NULL,
    name            VARCHAR(255),
    image           TEXT,
    createdAt       TIMESTAMP   DEFAULT NOW(),
    updatedAt       TIMESTAMP   DEFAULT NOW(),
    subscription    VARCHAR(50) DEFAULT 'free' CHECK (subscription IN ('free', 'pro'))
);

-- Projects table
CREATE TABLE "Project" (
    id            UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
    userId        UUID        NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
    name          VARCHAR(255) NOT NULL,
    imageUrl      TEXT,
    status        VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'complete')),

    -- JSON fields for AI-generated content
    components    JSONB,
    bom           JSONB,
    cutList       JSONB,
    instructions  JSONB,

    -- Settings
    skillLevel    VARCHAR(50) DEFAULT 'beginner' CHECK (skillLevel IN ('beginner', 'intermediate')),
    kerfWidth     FLOAT       DEFAULT 3.0,

    createdAt     TIMESTAMP   DEFAULT NOW(),
    updatedAt     TIMESTAMP   DEFAULT NOW()
);

-- Indexes for common queries
CREATE INDEX idx_project_userId ON "Project"(userId);
CREATE INDEX idx_project_status ON "Project"(status);
CREATE INDEX idx_user_email ON "User"(email);

-- Row Level Security (RLS) - optional, enable as needed
-- ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE "Project" ENABLE ROW LEVEL SECURITY;

-- Policy examples (uncomment and customize as needed):
-- CREATE POLICY "Users can view their own data" ON "User" FOR SELECT USING (auth.uid() = id);
-- CREATE POLICY "Users can CRUD their own projects" ON "Project" FOR ALL USING (auth.uid() = userId);