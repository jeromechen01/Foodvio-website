# Foodvio V6.2 · W9 法律合规接入改动报告

> **版本**:V6.2 → V6.2-W9
> **改动日期**:2026-05-05
> **改动范围**:全站 36 业务 HTML + 6 法律 HTML + 2 JS 脚本 + 1 SQL
> **自检结果**:✅ 全站 0 问题通过

---

## 📁 文件变动总览

### ✅ 新增文件(3 个)

| 文件 | 大小 | 用途 |
|---|---|---|
| `cookie-banner.js` | 7.8 KB | 首次访问弹底部 banner 组件 |
| `supabase-w9-schema-migration.sql` | ~1 KB | leads 表 ALTER 脚本(含 3 个新字段) |
| (法律页 6 份此前已合并入仓) | — | privacy/terms/cookie 各中英 |

### 🔄 修改文件(37 个)

| 文件 | 改动 |
|---|---|
| `lead-capture.js` | 询盘 modal 加同意勾选 + chinpapa 年龄勾选 + 提交按钮联动 + consent metadata 注入 payload |
| 36 个业务 HTML | footer 法律链接(3 种 footer 模式)+ `<script src="cookie-banner.js" defer>` 注入 |
| 6 个法律 HTML | 顶部"返回主站"导航条 + cookie-banner.js 引用 |

### ❌ 删除文件(0 个)

无文件删除。所有 W6-W8 改动完整保留。

---

## 🔧 主要改造细节

### 1. 36 业务 HTML Footer 法律链接(3 种结构分类处理)

| 类型 | 文件数 | 原状 | 改后 |
|---|---|---|---|
| **A** | 1 (`index.html`) | 隐私政策 + 用户协议 (href=#) | 隐私 + 协议 + Cookie 真实路径,中英双链 |
| **B** | 6 (`for-* + products-index`) | 仅隐私政策 (href=#) | 加齐 3 类法律页中英双链 |
| **C** | 29 (其他全部) | 仅 ICP 备案号 | ICP 容器内追加 3 类法律页中英双链 |

**示例改后代码**(C 类型紧凑型):
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

### 2. lead-capture.js 改造

| 项 | 状态 |
|---|---|
| 询盘 modal 加合规勾选框 | ✅ |
| chinpapa 子站(`isChinpapaContext()` 判定)加年龄勾选 | ✅ |
| 未勾选时提交按钮禁用(opacity .5 + cursor not-allowed) | ✅ |
| 提交时 payload 携带 `consent_version: 'V1.0'` + `consent_timestamp` + `age_consent_chinpapa` | ✅ |
| 二次防御:即使 F12 改 disabled 也校验 consent | ✅ |
| 控制台日志增加 W9 标识 | ✅ |
| 旧版 SUPABASE_URL / ANON_KEY 不变 | ✅ |
| 旧版 detectQuality / detectSubsite 逻辑不变 | ✅ |

### 3. cookie-banner.js 新组件

| 特性 | 说明 |
|---|---|
| 弹出条件 | 首次访问 + 非法律页 + localStorage 无对应 V1.0 同意记录 |
| 法律页豁免 | path 含 `privacy-policy/terms-of-service/cookie-policy` 时 return,不弹 banner |
| 动作 | "仅必要" / "接受全部" 两个按钮(无"自定义",简化) |
| 持久化 | localStorage `foodvio_consent` 记 1 年 |
| 中英自适应 | 监听 `body.lang-en` class 切换文案 |
| 移动端响应式 | <640px 自动转竖排 |
| 公共 API | `window.foodvioConsent()` / `window.foodvioWithdrawConsent()` |
| z-index | 9998(低于 lead-capture modal 9999,不会遮挡询盘) |

### 4. 法律页顶部"返回首页"导航

| 元素 | 中文版 | 英文版 |
|---|---|---|
| 返回链接 | "← 返回花花食界主站" | "← Back to Foodvio" |
| 法律页快捷链 | 隐私 / 用户协议 / Cookie | Privacy / Terms / Cookies |
| 中英对照切换 | "EN" → 对应英文版 | "中文" → 对应中文版 |
| 样式 | sticky 顶部 + paper 背景 + 模糊毛玻璃 | 同上,改 Inter 字体 |

### 5. Supabase Schema 增补

```sql
ALTER TABLE leads ADD COLUMN IF NOT EXISTS consent_version TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS consent_timestamp TIMESTAMPTZ;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS age_consent_chinpapa BOOLEAN DEFAULT FALSE;
```

---

## ⏰ 上线顺序(关键)

**严格按这个顺序操作,否则会出问题**:

```
Step 1 → Supabase Dashboard 跑 supabase-w9-schema-migration.sql
         (确保 leads 表多出 3 个字段)
         ↓
Step 2 → git push 整个仓库到 GitHub
         (GitHub Pages 自动重新部署)
         ↓
Step 3 → 浏览器访问 https://jeromechen01.github.io/foodvio-website/
         - 验证底部弹 cookie banner
         - 点"接受全部",刷新后 banner 不再出现
         - 任意页面点 CTA 按钮 → 弹询盘 modal
         - 验证提交按钮**默认禁用**,勾选后启用
         - 提交一个测试 lead → Supabase 后台看新字段是否填充
         ↓
Step 4 → 在 chinpapa 子站(products-chinpapa-v62.html)同样测试
         - 应该多一个"年满 14 岁/监护人代填"勾选
         - 不勾年龄勾选则提交按钮禁用
         ↓
Step 5 → 检查 footer 6 个法律链接全部能跳转,法律页能返回首页
```

---

## 🚨 上线前必做(法务关 + 备案关)

按 phase2.md 既有要求:

1. **法务审核** 6 份法律 HTML
2. **公安联网备案核查**(查 https://www.beian.gov.cn 看 .com.cn 是否需要补)
3. **数据出境合规自查**(累计 < 50 万人门槛)
4. **生效日期调整**:把法律页顶部"生效日期 2026年5月5日"改为实际上线日
5. **删除开发提醒**:6 份法律 HTML 顶部 `<!-- ⚠️ LEGAL REVIEW REMINDER -->` 注释删掉

---

## 🛡️ 回滚方案

如果上线后发现问题:

### 仅回滚 cookie banner
```bash
# 在所有 HTML 中删除这一行
<script src="cookie-banner.js" defer></script>
# 然后删除 cookie-banner.js
```

### 仅回滚 lead-capture.js 改动
- Git 历史里恢复 W6-W8 版本的 lead-capture.js
- 但要先 ALTER TABLE 把 3 个新字段删掉(否则 V6.2 旧版不会写入,新字段全是 NULL)
- 或更稳妥:保留新字段,V6.2 旧版兼容(NULL 也能存)

### 整体回滚
```bash
git revert <W9 提交哈希>
```

但建议**至少把法律页保留**(它们是独立的,不影响其他页),只回滚 lead-capture / cookie-banner。

---

## 📊 全站统计变化

| 项 | W8 | W9 |
|---|---|---|
| HTML 文件总数 | 36(+products.json) | 36 + 6 法律页 = 42 |
| JS 文件 | lead-capture.js | + cookie-banner.js = 2 |
| SQL 文件 | 0 | + 1(schema migration) |
| Footer 法律链接覆盖率 | 1/36 完整 + 6/36 部分 | 36/36 完整 |
| 询盘合规勾选 | 0 | ✅ 全站 + chinpapa 专属 |
| Cookie banner | 无 | ✅ 全站(法律页除外) |
| consent 审计 | 无 | ✅ V1.0 + timestamp 记录到 leads 表 |

---

## ✅ 自检通过证明

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
  全部 ✓(footer 3 种法律链接齐全 + cookie-banner.js 引用 + lead-capture.js 引用)

=== 6 个法律 HTML 检查 ===
  全部 ✓(顶部返回导航 + 互链齐全 + 中英对照 + cookie-banner.js 引用)

=== 文件名拼写一致性 ===
  ✓ 全站文件名拼写一致(无 typo)

✅ 全站自检通过,0 个问题
```

---

**文档版本**:V1.0
**整理日期**:2026-05-05
**下游接力**:法务审稿 + 公安备案核查 + 实际上线
