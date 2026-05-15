# 法律文档接入网站 · 集成说明

> **生成日期**:2026-05-05
> **配套文件**:6 份法律 HTML(privacy/terms/cookie 各中英)
> **目标**:把法律页接入 32 个 V6.2 HTML 文件 + lead-capture.js + 新增 cookie banner

---

## 📦 文件清单

| 文件名 | 内容 | 上线路径建议 |
|---|---|---|
| `privacy-policy-zh.html` | 隐私政策 中文 | `/privacy-policy-zh.html` |
| `privacy-policy-en.html` | Privacy Policy 英文 | `/privacy-policy-en.html` |
| `terms-of-service-zh.html` | 用户协议 中文 | `/terms-of-service-zh.html` |
| `terms-of-service-en.html` | Terms of Service 英文 | `/terms-of-service-en.html` |
| `cookie-policy-zh.html` | Cookie 说明 中文 | `/cookie-policy-zh.html` |
| `cookie-policy-en.html` | Cookie Policy 英文 | `/cookie-policy-en.html` |

放在 GitHub 仓库根目录,与现有 V6.2 HTML 同级。

---

## 🔧 改造任务 1 · Footer 链接接入(32 个 HTML)

### 现状评估

phase2.md 路由表显示现有 36 个 HTML 文件。这些文件都需要在 footer 加入 3 个法律页链接。

### 接入方案

在每个 HTML 文件的 `<footer>` 区域,找到 nav 链接区,加入法律页链接。

**建议位置**:footer 底部"copyright + 备案号"那一行附近。

**接入代码**(标准模板):
```html
<div class="footer-legal-links">
  <a href="privacy-policy-zh.html" data-zh>隐私政策</a>
  <a href="privacy-policy-en.html" data-en>Privacy</a>
  <span class="sep">·</span>
  <a href="terms-of-service-zh.html" data-zh>用户协议</a>
  <a href="terms-of-service-en.html" data-en>Terms</a>
  <span class="sep">·</span>
  <a href="cookie-policy-zh.html" data-zh>Cookie 说明</a>
  <a href="cookie-policy-en.html" data-en>Cookies</a>
</div>
```

**配套 CSS**:
```css
.footer-legal-links {
  margin-top: 16px;
  font-size: 12px;
  color: var(--steel);
  letter-spacing: .05em;
}
.footer-legal-links a {
  color: var(--steel);
  text-decoration: none;
  margin: 0 4px;
  transition: color .2s;
}
.footer-legal-links a:hover {
  color: var(--forest);
}
.footer-legal-links .sep {
  margin: 0 4px;
  opacity: .5;
}
```

### 推送方式建议

参考 W6 Phase 4 的"Python 脚本批量更新"做法。

---

## 🔧 改造任务 2 · lead-capture.js 加同意勾选

### 法律要求

- 个保法第 14 条:个人信息处理基于个人同意的,该同意应当由个人在充分知情的前提下自愿、明确作出
- 第 17 条:取得同意应当公开易得
- GDPR 第 7 条:同意必须是清晰、肯定的行为(opt-in,不能默认勾选)

### 实现要求

询盘表单提交前,必须满足:
1. 用户**主动勾选**"我已阅读并同意《隐私政策》和《用户协议》"
2. 未勾选时,提交按钮**禁用**(不能 hidden,要可见但不可点)
3. 表单数据中携带 `consent_version: "V1.0"` 与 `consent_timestamp` 用于审计

### HTML 模板

在每个询盘表单内、提交按钮前,加入:

```html
<div class="form-consent">
  <label class="consent-checkbox">
    <input type="checkbox" id="foodvio-consent" name="consent" value="1" required>
    <span class="checkbox-label">
      <span data-zh>
        我已阅读并同意
        <a href="privacy-policy-zh.html" target="_blank">《隐私政策》</a>
        和
        <a href="terms-of-service-zh.html" target="_blank">《用户协议》</a>,
        并同意花花食界处理我的询盘信息(包括存储于境外的 Supabase 数据库)。
      </span>
      <span data-en>
        I have read and agree to the
        <a href="privacy-policy-en.html" target="_blank">Privacy Policy</a>
        and
        <a href="terms-of-service-en.html" target="_blank">Terms of Service</a>,
        and consent to Foodvio processing my inquiry information (including storage on Supabase outside Mainland China).
      </span>
    </span>
  </label>
</div>

<!-- 华仔爸爸专属:监护人/年龄确认 -->
<div class="form-consent" data-form-context="chinpapa">
  <label class="consent-checkbox">
    <input type="checkbox" id="foodvio-age-consent" name="age_consent" value="1" required>
    <span class="checkbox-label">
      <span data-zh>我已年满 14 周岁,或为代未成年人填写表单的监护人。</span>
      <span data-en>I am at least 14 years of age, or I am a guardian filling this form on behalf of a minor.</span>
    </span>
  </label>
</div>
```

### CSS 样式

```css
.form-consent {
  margin: 16px 0;
  font-size: 13px;
  line-height: 1.5;
  color: var(--steel);
}
.consent-checkbox {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  cursor: pointer;
}
.consent-checkbox input[type="checkbox"] {
  margin-top: 3px;
  flex-shrink: 0;
  cursor: pointer;
}
.consent-checkbox a {
  color: var(--forest);
  text-decoration: underline;
  text-underline-offset: 2px;
}
.consent-checkbox a:hover {
  color: var(--ink);
}
```

### lead-capture.js 改造

```javascript
// 在 lead-capture.js 的 submit handler 中加入:

document.querySelectorAll('form[data-foodvio-form]').forEach(form => {
  const submitBtn = form.querySelector('[type="submit"]');
  const consentBox = form.querySelector('#foodvio-consent');
  const ageBox = form.querySelector('#foodvio-age-consent'); // 仅 chinpapa 表单有

  // 实时禁用 / 启用提交按钮
  function updateSubmitState() {
    const consented = consentBox && consentBox.checked;
    const ageOk = !ageBox || ageBox.checked; // ageBox 不存在视为通过
    submitBtn.disabled = !(consented && ageOk);
    submitBtn.style.opacity = submitBtn.disabled ? '0.5' : '1';
    submitBtn.style.cursor = submitBtn.disabled ? 'not-allowed' : 'pointer';
  }

  if (consentBox) consentBox.addEventListener('change', updateSubmitState);
  if (ageBox) ageBox.addEventListener('change', updateSubmitState);
  updateSubmitState(); // 初始状态

  // 提交时附加合规 metadata
  form.addEventListener('submit', e => {
    if (!consentBox || !consentBox.checked) {
      e.preventDefault();
      alert('请先阅读并同意《隐私政策》和《用户协议》后再提交');
      return;
    }
    // 在 payload 中带上版本号与时间戳(写入 leads 表 metadata 字段)
    const consentMeta = {
      consent_version: 'V1.0',
      consent_timestamp: new Date().toISOString(),
      consent_url_zh: 'privacy-policy-zh.html',
      consent_url_en: 'privacy-policy-en.html'
    };
    // 注入隐藏字段或在 fetch payload 里附加 consentMeta
    // (具体实现取决于现有 lead-capture.js 的提交方式)
  });
});
```

### Supabase leads 表 schema 增补

```sql
ALTER TABLE leads ADD COLUMN consent_version TEXT;
ALTER TABLE leads ADD COLUMN consent_timestamp TIMESTAMPTZ;
ALTER TABLE leads ADD COLUMN age_consent_chinpapa BOOLEAN DEFAULT false;
```

---

## 🔧 改造任务 3 · Cookie Banner 组件(新增)

### 设计目标

- 首次访问弹底部 banner
- 用户点"接受全部 / 仅必要 / 自定义"后,记住选择 1 年
- 不阻塞用户阅读内容(不全屏遮罩)

### 完整方案 cookie-banner.js

```javascript
// cookie-banner.js — 添加到所有 HTML 文件 <head> 末尾或 <body> 末尾
(function() {
  'use strict';

  const CONSENT_KEY = 'foodvio_consent';
  const CONSENT_VERSION = 'V1.0';

  // 检查是否已同意
  const stored = localStorage.getItem(CONSENT_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (parsed.version === CONSENT_VERSION) return; // 已同意当前版本
    } catch(e) {}
  }

  // 创建 banner DOM
  const banner = document.createElement('div');
  banner.className = 'foodvio-cookie-banner';
  const isZh = document.documentElement.lang.startsWith('zh') ||
               document.querySelector('[data-zh]');

  banner.innerHTML = isZh ? `
    <div class="cb-content">
      <div class="cb-text">
        <strong>🍪 Cookie 偏好</strong>
        <p>本网站使用必要 Cookie 保持基本功能。您可选择是否启用分析类 Cookie 以帮助我们改进。详见<a href="cookie-policy-zh.html" target="_blank">《Cookie 使用说明》</a>。</p>
      </div>
      <div class="cb-actions">
        <button class="cb-btn cb-btn-secondary" data-action="essential">仅必要</button>
        <button class="cb-btn cb-btn-primary" data-action="all">接受全部</button>
      </div>
    </div>
  ` : `
    <div class="cb-content">
      <div class="cb-text">
        <strong>🍪 Cookie Preferences</strong>
        <p>This Site uses essential cookies for basic functionality. You can choose whether to enable analytics cookies to help us improve. See our <a href="cookie-policy-en.html" target="_blank">Cookie Policy</a>.</p>
      </div>
      <div class="cb-actions">
        <button class="cb-btn cb-btn-secondary" data-action="essential">Essential Only</button>
        <button class="cb-btn cb-btn-primary" data-action="all">Accept All</button>
      </div>
    </div>
  `;

  document.body.appendChild(banner);

  // 处理点击
  banner.querySelectorAll('[data-action]').forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.getAttribute('data-action');
      const consent = {
        version: CONSENT_VERSION,
        timestamp: new Date().toISOString(),
        essential: true,
        analytics: action === 'all',
        marketing: false
      };
      localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
      banner.classList.add('cb-hide');
      setTimeout(() => banner.remove(), 300);
    });
  });

  // 暴露给其他脚本检查
  window.foodvioConsent = function() {
    const s = localStorage.getItem(CONSENT_KEY);
    return s ? JSON.parse(s) : null;
  };
  window.foodvioWithdrawConsent = function() {
    localStorage.removeItem(CONSENT_KEY);
    location.reload();
  };
})();
```

### 配套 CSS

```css
.foodvio-cookie-banner {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(13, 42, 31, .98);
  color: rgba(245, 247, 240, .92);
  padding: 20px 24px;
  z-index: 9999;
  box-shadow: 0 -2px 20px rgba(0, 0, 0, .15);
  font-family: 'Noto Sans SC', 'Inter', sans-serif;
  font-size: 14px;
  line-height: 1.5;
  animation: cb-slide-up .4s ease-out;
}
@keyframes cb-slide-up {
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
}
.foodvio-cookie-banner.cb-hide {
  transform: translateY(100%);
  transition: transform .3s ease-in;
}
.foodvio-cookie-banner .cb-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
}
.foodvio-cookie-banner .cb-text {
  flex: 1;
  min-width: 280px;
}
.foodvio-cookie-banner .cb-text strong {
  display: block;
  margin-bottom: 4px;
  font-size: 15px;
}
.foodvio-cookie-banner .cb-text p {
  margin: 0;
  color: rgba(245, 247, 240, .75);
}
.foodvio-cookie-banner .cb-text a {
  color: #F5C82E;
  text-decoration: underline;
}
.foodvio-cookie-banner .cb-actions {
  display: flex;
  gap: 12px;
  flex-shrink: 0;
}
.foodvio-cookie-banner .cb-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
  transition: all .2s;
  white-space: nowrap;
}
.foodvio-cookie-banner .cb-btn-primary {
  background: #F5C82E;
  color: #0d2a1f;
}
.foodvio-cookie-banner .cb-btn-primary:hover {
  background: #FFD84A;
}
.foodvio-cookie-banner .cb-btn-secondary {
  background: transparent;
  color: rgba(245, 247, 240, .85);
  border: 1px solid rgba(245, 247, 240, .25);
}
.foodvio-cookie-banner .cb-btn-secondary:hover {
  background: rgba(245, 247, 240, .08);
}
@media (max-width: 640px) {
  .foodvio-cookie-banner .cb-content {
    flex-direction: column;
    align-items: stretch;
  }
  .foodvio-cookie-banner .cb-actions {
    justify-content: stretch;
  }
  .foodvio-cookie-banner .cb-btn {
    flex: 1;
  }
}
```

### 在 32 个 HTML 中接入

在每个 HTML 的 `</body>` 之前加入:
```html
<script src="cookie-banner.js" defer></script>
```

(或者把 CSS 内联到 cookie-banner.js,变成单文件部署)

---

## ✅ 接入完成验证清单

### 法律页面访问性
- [ ] 6 个法律 HTML 都能直接访问,无 404
- [ ] 中英版本互相链接正确
- [ ] 法律页之间互相链接正确(隐私 ↔ 协议 ↔ Cookie)
- [ ] 顶部 H1 / Meta 都正确

### Footer 链接
- [ ] 32 个 HTML 都加上了 footer 法律链接
- [ ] data-zh / data-en 双语切换正常工作
- [ ] 没有用错链接(privacy-policy 不要拼成 privacy_policy)

### 表单合规
- [ ] 所有询盘表单加上同意勾选框
- [ ] 未勾选时提交按钮禁用
- [ ] 华仔爸爸表单额外加年龄/监护人勾选
- [ ] 同意 metadata 写入 leads 表
- [ ] Supabase leads 表 schema 已 ALTER

### Cookie Banner
- [ ] 首次访问 banner 出现
- [ ] 点"接受全部"/"仅必要"后 banner 消失
- [ ] localStorage 正确写入
- [ ] 重新访问 banner 不再出现
- [ ] 移动端 banner 显示正常(竖排布局)

### 删除开发提醒
- [ ] 上线前删除 6 个 HTML 顶部的 `<!-- ⚠️ LEGAL REVIEW REMINDER -->` 注释

---

## 🚨 上线前必做(法务关)

1. **法务审核** — 把 6 份 HTML 给法务/法律顾问过一遍。重点关注:
   - 责任限额条款(RMB 1000 是否合适)
   - 跨境数据传输的 Supabase 表述准确性
   - 出口业务管辖与 GDPR 合规边界
   - 未成年人 14 岁门槛是否需要调整为 13(美国 COPPA)

2. **公安联网备案核查** — 查 https://www.beian.gov.cn,看 .com.cn 域名是否已备

3. **数据出境合规自查** — 累计个人信息 < 10 万人 + 敏感信息 < 1 万人 = 豁免严格评估

4. **生效日期调整** — 实际上线时把 6 份 HTML 的"生效日期"和"最近更新"改为实际上线日

---

**文档版本**:V1.0
**整理日期**:2026-05-05
**适用场景**:法律页接入工作底稿 + 接力提示词
