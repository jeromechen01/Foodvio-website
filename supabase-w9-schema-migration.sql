-- ════════════════════════════════════════════════
-- Foodvio V6.2 W9 · Supabase leads 表 schema 增补
-- ════════════════════════════════════════════════
-- 执行方式:
--   1. 登录 Supabase Dashboard → 项目 Foodvio-Website
--   2. 左侧 SQL Editor → New query
--   3. 粘贴本文件全部内容 → Run
--   4. 在 Table Editor 验证 leads 表多出 3 个字段
--
-- 时机要求:
--   ⚠️ 必须在新版 lead-capture.js 上线 *之前* 执行 ALTER
--   否则前端会发出含未知字段的 payload,Supabase 会报 400 错误
-- ════════════════════════════════════════════════

-- 1. 增加同意版本号字段(记录用户同意的隐私政策版本)
ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS consent_version TEXT;

-- 2. 增加同意时间戳字段(用于审计追溯)
ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS consent_timestamp TIMESTAMPTZ;

-- 3. 增加华仔爸爸子站专属年龄/监护人确认字段
ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS age_consent_chinpapa BOOLEAN DEFAULT FALSE;

-- ════════════════════════════════════════════════
-- 验证 SQL(运行上面 ALTER 后跑这个看结果)
-- ════════════════════════════════════════════════
SELECT
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_name = 'leads'
  AND column_name IN ('consent_version', 'consent_timestamp', 'age_consent_chinpapa')
ORDER BY ordinal_position;

-- ════════════════════════════════════════════════
-- 上线后健康检查 SQL(可选)
-- ════════════════════════════════════════════════
-- 跑过几个测试询盘后,验证字段被正确填充:
--
-- SELECT id, name, cta_type, consent_version, consent_timestamp, age_consent_chinpapa, created_at
-- FROM leads
-- ORDER BY created_at DESC
-- LIMIT 10;
--
-- 期望:
-- - 所有新提交的 lead 都有 consent_version='V1.0'
-- - consent_timestamp 不为 NULL
-- - chinpapa 子站(page_path 含 'chinpapa')的 lead,age_consent_chinpapa=true
-- ════════════════════════════════════════════════
