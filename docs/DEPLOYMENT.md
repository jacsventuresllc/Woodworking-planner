# Deployment

## Overview

- **Platform:** Vercel
- **Database:** Supabase (PostgreSQL)
- **Auth:** NextAuth.js (credentials)
- **Production URL:** https://woodworking-planner-neon.vercel.app

## GitHub Repository

**Repository:** (Need to confirm - likely under JACS Ventures account)

```
https://github.com/jacs-ventures/woodworking-planner
```

## Vercel Deployment Process

### Automatic Deployment

The app deploys automatically when changes are pushed to the `main` branch.

1. **Push to main** → Vercel detects change
2. **Build** → Next.js build runs
3. **Deploy** → App deployed to production URL

### Manual Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Link to project
vercel link

# Deploy to production
vercel --prod
```

### Pull Request Preview

Each PR gets a preview deployment automatically.
- URL: `https://woodworking-planner-[pr-number].vercel.app`
- Useful for testing changes before merging

## Supabase Configuration

### Connection

1. Create Supabase project at https://supabase.com
2. Get connection string from: **Settings → Database → Connection string**
3. Add to Vercel environment variables

### Environment Variables (Vercel)

| Variable | Value | Required |
|----------|-------|----------|
| `DATABASE_URL` | Supabase connection string | Yes |
| `NEXTAUTH_SECRET` | Random 32+ char string | Yes |
| `NEXTAUTH_URL` | `https://woodworking-planner-neon.vercel.app` | Yes |
| `OPENAI_API_KEY` | OpenAI API key | Yes (for AI features) |

### Setting Environment Variables

**Via Vercel Dashboard:**
1. Go to project Settings → Environment Variables
2. Add each variable
3. Redeploy to apply

**Via CLI:**
```bash
vercel env add DATABASE_URL
vercel env add NEXTAUTH_SECRET
# etc.
```

## Supabase Database Setup

### Apply Schema

```bash
# Generate Prisma client
pnpm prisma generate

# Push schema to database
pnpm prisma db push
```

### Fix Missing Columns (Current Blocker)

If User table is missing columns, run in Supabase SQL Editor:

```sql
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
ADD COLUMN IF NOT EXISTS "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
ADD COLUMN IF NOT EXISTS "subscription" TEXT DEFAULT 'free';
```

## Common Deployment Issues

### Issue: Build Fails

**Symptoms:** `pnpm build` fails on Vercel

**Resolution:**
1. Check build logs in Vercel dashboard
2. Common causes:
   - Missing environment variables
   - Node version mismatch (use Node 18+)
   - Missing dependencies

**Fix:**
```bash
# Ensure package.json has correct engines
echo '"engines": { "node": ">=18" }' >> package.json

# Rebuild lockfile
rm pnpm-lock.yaml
pnpm install
```

### Issue: Database Connection Failed

**Symptoms:** `Error: P1001` or connection timeout

**Resolution:**
1. Verify DATABASE_URL is correct
2. Check Supabase project is active (not paused)
3. Ensure IP allowlist includes Vercel (Supabase handles this automatically)
4. Check connection works locally

### Issue: NextAuth Redirect Errors

**Symptoms:** Infinite redirect on `/dashboard`

**Resolution:**
1. Verify NEXTAUTH_URL matches production URL exactly
2. Check NEXTAUTH_SECRET is set and valid

### Issue: Missing User Columns

**Symptoms:** `Unknown column 'createdAt' in 'users'`

**Resolution:**
Run the SQL ALTER TABLE statement above in Supabase SQL Editor.

## Recovery Procedures

### Accidental Data Deletion

1. **Check Supabase Dashboard → Table Editor** - may have soft delete
2. **Restore from Supabase Point-in-time Recovery** (if enabled)
3. **Recreate data** if no backup available

### Deployment Rollback

**Via Vercel Dashboard:**
1. Go to Deployments
2. Find last working deployment
3. Click "..." → Promote to Production

**Via CLI:**
```bash
vercel deployments
vercel promote <deployment-id>
```

### Database Rollback

Prisma doesn't support automatic rollback. To revert schema:

```bash
# Create reversal migration
pnpm prisma migrate resolve --drift
```

**Alternative (simpler):**
1. Manually drop tables in Supabase SQL Editor
2. Recreate with old schema

## Rollback Checklist

- [ ] Database schema matches code version
- [ ] Environment variables are correct
- [ ] Auth works after rollback
- [ ] Existing projects load correctly

## Monitoring

### Vercel Dashboard

- **Function Logs:** Real-time function execution logs
- **Analytics:** Page views, performance metrics
- **Speed Insights:** Core web vitals

### Supabase Dashboard

- **Table Editor:** View data directly
- **Logs:** Query and auth logs
- **Metrics:** Database performance

## SSL/HTTPS

Automatically enabled via Vercel's CDN.
- Custom domain: Add in Vercel Settings → Domains
- Certificate auto-provisioned

## Cron Jobs (Future)

If adding scheduled tasks (e.g., cleanup, notifications):

```json
{
  "crons": [
    {
      "path": "/api/cron/cleanup",
      "schedule": "0 2 * * *"
    }
  ]
}
```

Add to `vercel.json`.