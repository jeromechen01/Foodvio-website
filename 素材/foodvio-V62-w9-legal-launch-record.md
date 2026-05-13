# Foodvio V6.2 · W9 法律合规接入完整记录

> **文档目的**:完整记录 W9 法律合规接入工作的所有产出、技术方案、上线步骤、回滚方案。
> **整理日期**:2026-05-05
> **W9 主题**:6 法律 HTML + lead-capture.js 改造 + cookie-banner.js 新建 + 36 业务 HTML 全站接入
> **完成状态**:✅ 全部完成,等待 Jerome 上线操作

---

## 一、产出物总览

### 1.1 新增文件(8 个)

| 文件 | 大小 | 用途 |
|---|---|---|
| privacy-policy-zh.html | ~19 KB | 隐私政策中文 V1.0(12 节) |
| privacy-policy-en.html | ~19 KB | 隐私政策英文 V1.0(12 节 + GDPR 兜底) |
| terms-of-service-zh.html | ~18 KB | 用户协议中文 V1.0(12 节) |
| terms-of-service-en.html | ~17 KB | 用户协议英文 V1.0 |
| cookie-policy-zh.html | ~13 KB | Cookie 说明中文 V1.0(7 节) |
| cookie-policy-en.html | ~12 KB | Cookie 说明英文 V1.0 |
| cookie-banner.js | ~7.8 KB | 首次访问弹底部 banner 组件 |
| supabase-w9-schema-migration.sql | ~1 KB | leads 表 ALTER TABLE 脚本 |

### 1.2 改造文件(37 个)

| 文件 | 改造内容 |
|---|---|
| lead-capture.js | 询盘 modal 加同意勾选 + chinpapa 年龄勾选 + consent metadata 注入 |
| 36 业务 HTML | footer 法律链接(3 种 footer 模式)+ cookie-banner.js 引用 |
| 6 法律 HTML | 顶部"返回主站"导航 + cookie-banner.js 引用 |

### 1.3 工作底稿(知识库可选存档)

| 文件 | 内容 |
|---|---|
| product-catalog-image-inventory.md | 画册产品图盘点清单 |
| legal-pages-integration-guide.md | 法律页接入指南 |
| W9-CHANGE-REPORT.md | 改动 diff 报告 |
| Foodvio-website-W9.zip | 完整改造后仓库包 |

---

## 二、法律文档 V1.0 核心条款摘要

### 2.1 隐私政策(12 节)

| 节 | 关键条款 |
|---|---|
| 01 引言 | 适用 PIPL + GDPR 兜底 |
| 02 收集信息 | 询盘 6 类(name/company/email/phone/role/message) + 自动收集 IP/UA |
| 03 使用方式 | 询盘响应 / 服务提供 / 客户支持 / 网站改进 / 法律合规 |
| 04 共享转让 | 不出售;关联实体(华仔爸爸团队)+ 服务商(Supabase/GitHub Pages) |
| 05 数据存储 | **明确告知 Supabase 境外存储 + PIPL 第 38 条单独同意** |
| 06 保留期限 | 询盘 24 个月 / 客户合同期 + 法律期 / 访问日志 6 个月 |
| 07 用户权利 | PIPL 8 项权利 + GDPR 6 项权利 |
| 08 未成年人 | **14 岁门槛 + 华仔爸爸专属处理** |
| 09 Cookie | 引用独立 Cookie 政策 |
| 10 数据安全 | HTTPS / TLS 1.3 + Supabase RLS + 最小化原则 + 员工保密 |
| 11 政策变更 | 重大变更通知机制 |
| 12 联系方式 | huahuakefu1@foodvio.com.cn / 400-6879-568 |

### 2.2 用户协议(12 节)

| 节 | 关键条款 |
|---|---|
| 01 协议主体 | 北京花花食界食品科技有限公司 vs 用户 |
| 02 网站性质 | **B2B 不含电商** + 双品牌结构 |
| 03 用户使用规范 | 真实性义务 + 违规处理 |
| 04 询盘性质 | **不构成法律要约或承诺** |
| 05 知识产权 | 商标 + 著作权 + 限制使用 + 用户反馈许可 |
| 06 第三方链接 | GitHub Pages + Supabase 服务条款另适用 |
| 07 免责声明 | **责任限额 RMB 1000(故意/重大过失除外)** |
| 08 不可抗力 | 标准条款 |
| 09 协议终止 | 用户终止 + 我方终止 + 条款存续 |
| 10 协议变更 | 公告生效机制 |
| 11 争议解决 | **中国法 + 北京管辖**(国际用户特别说明) |
| 12 其他 | 完整协议 + 可分割性 + 弃权 |

### 2.3 Cookie 使用说明(7 节)

| 类别 | 名称 | 用途 | 是否需要同意 |
|---|---|---|---|
| 必要 | foodvio_lang | 语言偏好 | ❌ 无需 |
| 必要 | foodvio_consent | 同意状态 | ❌ 无需 |
| 必要 | foodvio_form_token | 表单防 CSRF | ❌ 无需 |
| 必要 | cf_* / github_* | 托管必需 | ❌ 无需 |
| 分析 | foodvio_analytics_* | 聚合统计 | ✅ 需要 |
| 营销 | (当前不使用) | — | — |

---

## 三、技术接入方案详细

### 3.1 lead-capture.js 改造点

**询盘 modal 内核改动**:

```diff
+ const CONSENT_VERSION = 'V1.0';
+ function isChinpapaContext() {
+   return window.location.pathname.toLowerCase().includes('chinpapa');
+ }

  payload {
    ...原有字段...
+   consent_version: 'V1.0',
+   consent_timestamp: new Date().toISOString(),
+   age_consent_chinpapa: formData.age_consent_chinpapa || false
  }

  modal HTML 加:
+ <label> [同意《隐私政策》《用户协议》] </label>
+ {chinpapa 时} <label> [年满 14 岁/监护人] </label>

  默认提交按钮:
+ disabled = true(opacity .5 + cursor not-allowed)

  勾选监听:
+ consentBox.addEventListener('change', updateSubmitState)
+ ageBox.addEventListener('change', updateSubmitState)

  提交校验:
+ 二次防御(F12 改 disabled 也校验)
```

### 3.2 cookie-banner.js 关键设计

| 项 | 设计 |
|---|---|
| 弹出条件 | 首次访问 + 非法律页 + localStorage 无 V1.0 同意记录 |
| 位置 | 底部固定 banner(z-index 9998,低于询盘 9999) |
| 动作 | "仅必要" / "接受全部"(无"自定义",简化决策) |
| 持久化 | localStorage `foodvio_consent` 记 1 年 |
| 中英自适应 | 监听 `body.lang-en` class |
| 移动端 | <640px 自动转竖排 |
| 法律页豁免 | path 含 privacy/terms/cookie 时直接 return 不弹 |
| 公共 API | `window.foodvioConsent()` / `window.foodvioWithdrawConsent()` |

### 3.3 Footer 法律链接接入(3 种 footer 模式)

| Footer 类型 | 文件数 | 原状 | 接入方案 |
|---|---|---|---|
| **A 类** | 1 (`index.html`) | 隐私+协议占位 (href="#") | 替换 # 为真实路径 + 加 Cookie |
| **B 类** | 6 (for-* + products-index) | 仅隐私占位 (href="#") | 替换 # + 补 Terms + Cookie |
| **C 类** | 29(其他) | 仅 ICP 备案号 | 在 ICP 容器内追加 3 类法律链接 |

**改后样例 HTML**(C 类):
```html
<div class="flex items-center gap-5 flex-wrap">
  <span>京 ICP 备 2022025117 号-1</span>
  <a href="privacy-policy-zh.html" class="hover:text-gold transition" data-zh>隐私政策</a>
  <a href="privacy-policy-en.html" class="hover:text-gold transition" data-en>Privacy</a>
  <a href="terms-of-service-zh.html" class="hover:text-gold transition" data-zh>用户协议</a>
  <a href="terms-of-service-en.html" class="hover:text-gold transition" data-en>Terms</a>
  <a href="cookie-policy-zh.html" class="hover:text-gold transition" data-zh>Cookie</a>
  <a href="cookie-policy-en.html" class="hover:text-gold transition" data-en>Cookies</a>
</div>
```

### 3.4 法律页顶部"返回主站"导航

| 元素 | 中文版 | 英文版 |
|---|---|---|
| 返回链接 | "← 返回花花食界主站" | "← Back to Foodvio" |
| 法律页快捷链 | 隐私 / 用户协议 / Cookie | Privacy / Terms / Cookies |
| 中英对照切换 | "EN" → 对应英文 | "中文" → 对应中文 |
| 样式 | sticky 顶部 + paper 背景 + 模糊毛玻璃 | 同上,改 Inter 字体 |

---

## 四、Supabase Schema 增补

### 4.1 ALTER TABLE 命令

```sql
-- 增加同意版本号
ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS consent_version TEXT;

-- 增加同意时间戳
ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS consent_timestamp TIMESTAMPTZ;

-- 增加华仔爸爸子站专属年龄勾选
ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS age_consent_chinpapa BOOLEAN DEFAULT FALSE;
```

### 4.2 验证 SQL

```sql
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'leads'
  AND column_name IN ('consent_version', 'consent_timestamp', 'age_consent_chinpapa')
ORDER BY ordinal_position;
```

期望:返回 3 行(分别对应 3 个新字段)。

---

## 五、上线步骤(关键时序)

### ⚠️ 严格按这个顺序操作,否则会出现 400 错误

```
Step 1 → Supabase Dashboard 跑 ALTER TABLE SQL
         ↓ (验证字段存在)
Step 2 → 解压 Foodvio-website-W9.zip 到本地
         ↓
Step 3 → git add . && git commit && git push
         ↓ (GitHub Pages 自动部署 ~2 分钟)
Step 4 → 浏览器测试 5 项验证(详见下文)
         ↓
Step 5 → 联系法务审核 6 份法律 HTML
```

### 浏览器测试 5 项验证清单

| # | 测试 | 预期结果 |
|---|---|---|
| 1 | 首次访问主页 | 底部弹 cookie banner |
| 2 | 点"接受全部"后刷新 | banner 不再出现 |
| 3 | 任一页 footer | 6 个法律链接(中英各 3) |
| 4 | 点 CTA 按钮弹询盘 modal | 提交按钮**默认禁用**,勾选后启用 |
| 5 | products-chinpapa-v62.html 弹询盘 | 多一个年龄/监护人勾选 |

### 提交一条测试 lead 后验证

```sql
SELECT id, name, cta_type,
       consent_version, consent_timestamp,
       age_consent_chinpapa, created_at
FROM leads
ORDER BY created_at DESC
LIMIT 5;
```

期望:
- consent_version = 'V1.0'
- consent_timestamp 不为 NULL
- chinpapa 子站(page_path 含 'chinpapa')age_consent_chinpapa = true

---

## 六、上线前必做(法务关 + 备案关)

### 6.1 法务审核重点

- [ ] **责任限额** RMB 1000 是否合适(用户协议 7.3)
- [ ] **跨境数据传输** Supabase 表述准确性(隐私政策 5.2)
- [ ] **未成年人 14 岁门槛** vs 美国 COPPA 13 岁(隐私政策 8.2)
- [ ] **管辖条款** 北京 vs 国际用户冲突(用户协议 11.3)
- [ ] **数据保留 24 个月** 是否合理(隐私政策 6)

### 6.2 公安联网备案核查

- [ ] 查询 https://www.beian.gov.cn
- [ ] .com.cn 域名是否已备(本网站 ICP 备案号 京 ICP 备 2022025117 号-1 已备案)
- [ ] 公安联网备案是否需要补办(独立于 ICP 备案)

### 6.3 数据出境合规自查

- [ ] 累计个人信息 < 50 万人(豁免严格评估门槛)
- [ ] 敏感个人信息 < 1 万人
- [ ] 重要数据(无)

### 6.4 上线前清理动作

- [ ] 修改 6 法律 HTML "生效日期" 为实际上线日
- [ ] 删除 6 法律 HTML 顶部 `<!-- ⚠️ LEGAL REVIEW REMINDER -->` 注释
- [ ] 法律 V1.0 → V1.1 修订(法务审完后)

---

## 七、回滚方案

### 7.1 仅回滚 Cookie Banner

```bash
# 在所有 HTML 中删除这一行
<script src="cookie-banner.js" defer></script>

# 然后删除 cookie-banner.js
rm cookie-banner.js
```

### 7.2 仅回滚 lead-capture.js

```bash
# 从 git 历史恢复 W6-W8 版本
git checkout HEAD~1 -- lead-capture.js

# 但要先决定 Supabase 字段:
# 选项 A: 保留新字段(NULL 兼容,旧版能存)→ 推荐
# 选项 B: 删除新字段(更干净,但失去合规审计)
```

### 7.3 整体回滚

```bash
git revert <W9 commit hash>
```

**建议**:至少把 6 法律页保留,只回滚 lead-capture / cookie-banner / footer 链接。法律页是独立的,不影响业务。

---

## 八、自检结果(W9 上线前)

```
=== 检查必备文件存在性 ===
  ✓ index.html  (73,286 bytes)
  ✓ lead-capture.js  (13,879 bytes)
  ✓ cookie-banner.js  (7,835 bytes)
  ✓ privacy-policy-zh.html  (19,179 bytes)
  ✓ privacy-policy-en.html  (19,189 bytes)
  ✓ terms-of-service-zh.html  (18,575 bytes)
  ✓ terms-of-service-en.html  (16,761 bytes)
  ✓ cookie-policy-zh.html  (13,498 bytes)
  ✓ cookie-policy-en.html  (12,556 bytes)
  ✓ products.json  (20,913 bytes)

=== 36 个业务 HTML 检查 ===
  全部 ✓ (footer 6 法律链接齐全 + cookie-banner.js 引用 + lead-capture.js 引用)

=== 6 个法律 HTML 检查 ===
  全部 ✓ (顶部返回导航 + 互链齐全 + 中英对照 + cookie-banner.js 引用)

=== 文件名拼写一致性 ===
  ✓ 全站文件名拼写一致(无 typo)

✅ 全站自检通过,0 个问题
```

---

## 九、影响面统计

| 项 | W8 | W9 |
|---|---|---|
| HTML 文件总数 | 36 | 36 + 6 法律页 = 42 |
| JS 文件 | lead-capture.js | + cookie-banner.js = 2 |
| SQL 文件 | 0 | + 1(schema migration) |
| Footer 法律链接覆盖率 | 1/36 完整 + 6/36 部分 | 36/36 完整 |
| 询盘合规勾选 | 0 | ✅ 全站 + chinpapa 专属 |
| Cookie banner | 无 | ✅ 全站(法律页除外) |
| consent 审计 | 无 | ✅ V1.0 + timestamp 记录到 leads 表 |
| 法律页中英对照 | 0 | ✅ 6 页(zh/en × 3) |

---

## 十、待办事项追踪(W10 衔接)

### 紧急(本周)

- [ ] Jerome 跑 Supabase migration SQL
- [ ] Jerome git push W9 zip
- [ ] Jerome 浏览器 5 项验证测试
- [ ] Jerome 联系法务审核启动

### 短期(2-4 周)

- [ ] 法务审核反馈 → 法律 V1.1 修订
- [ ] 公安联网备案核查 + 补办
- [ ] 数据出境合规自查文档化
- [ ] 西式酱料 2 缺口 SKU 摄影(罗勒松子青/烟熏彩椒)

### 中期(W10+)

- [ ] 25 个 draft SKU 真实文案补完
- [ ] 画册产品图接入(20+ 款)
- [ ] About / Insights 子页启动(替代 nav 占位 #)

---

**文档版本**:V1.0
**整理日期**:2026-05-05
**下次更新**:法律 V1.1 修订时 / W10 SKU 补完时
