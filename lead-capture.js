/* ════════════════════════════════════════════════
   Foodvio V6.2 · Supabase Lead Capture (W9 法律合规版)
   ════════════════════════════════════════════════
   文件路径:/lead-capture.js (放在 repo 根目录)
   引用方式:每个 HTML 的 </head> 之前加一行:
   <script src="lead-capture.js" defer></script>
   ════════════════════════════════════════════════
   W9 改动(2026-05-05):
   - ✅ 询盘表单加"同意《隐私政策》《用户协议》"勾选框
   - ✅ chinpapa 子站表单加"年满 14 岁/监护人代填"勾选框
   - ✅ 未勾选时提交按钮禁用
   - ✅ 提交时附加 consent_version + consent_timestamp 到 leads 表
   - ⚠️ Supabase leads 表需要先 ALTER TABLE 增加 3 个字段(详见上线说明)
   ════════════════════════════════════════════════ */

window.FoodvioLeads = (function() {

  // ⚠️ 修改这里 ⚠️ —— 部署前必须替换为你的真实值
  const SUPABASE_URL  = 'https://kaqdluhhrlkogpecrwbx.supabase.co';
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImthcWRsdWhocmxrb2dwZWNyd2J4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcyNzA3MDEsImV4cCI6MjA5Mjg0NjcwMX0.Tq1yWsrnc8CBfBwmo6druKlRAolSLYM977TWgqu6j00';

  // 法律文档版本号(改动时同步更新)
  const CONSENT_VERSION = 'V1.0';

  // 子站自动识别(根据当前页面文件名)
  function detectSubsite() {
    const path = window.location.pathname.toLowerCase();
    if (path === '/' || path.endsWith('/index.html') || path.endsWith('index.html')) return 'homepage';
    if (path.includes('for-foodservice') || path.includes('for-industrial') ||
        path.includes('for-retail') || path.includes('for-online') ||
        path.includes('for-global')) return 'role_landing';
    if (path.includes('products')) return 'products';
    if (path.includes('solutions')) return 'solutions';
    if (path.includes('our-story')) return 'story';
    if (path.includes('capabilities')) return 'capabilities';
    if (path.includes('insights')) return 'insights';
    if (path.includes('about')) return 'about';
    return 'homepage';
  }

  // chinpapa 子站识别(决定是否需要年龄勾选)
  function isChinpapaContext() {
    return window.location.pathname.toLowerCase().includes('chinpapa');
  }

  // 线索质量自动判断
  function detectQuality(subsite, ctaType) {
    if (subsite === 'story' &&
        ['sample_request', 'custom_inquiry', 'origin_tour'].includes(ctaType)) return 'hot';
    if (subsite === 'solutions' && ctaType === 'sample_request') return 'hot';
    if (['products', 'role_landing'].includes(subsite) &&
        ['sample_request', 'catalog_download'].includes(ctaType)) return 'warm';
    return 'cold';
  }

  // 提交线索到 Supabase
  async function submitLead(formData) {
    const subsite = detectSubsite();
    const quality = detectQuality(subsite, formData.cta_type);

    const payload = {
      name: formData.name,
      company: formData.company || null,
      role: formData.role || null,
      email: formData.email,
      phone: formData.phone || null,
      message: formData.message || null,
      source: 'website',
      subsite: subsite,
      traffic_quality: quality,
      page_path: window.location.pathname,
      cta_type: formData.cta_type,
      // W9 新增合规字段(需要 Supabase 提前 ALTER TABLE)
      consent_version: CONSENT_VERSION,
      consent_timestamp: new Date().toISOString(),
      age_consent_chinpapa: formData.age_consent_chinpapa || false
    };

    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('[Foodvio Leads] 提交失败:', errorText);
        return { success: false, error: errorText };
      }

      console.log('[Foodvio Leads] ✓ 提交成功', { subsite, quality, cta_type: formData.cta_type, consent: CONSENT_VERSION });
      return { success: true };
    } catch (err) {
      console.error('[Foodvio Leads] 网络错误:', err);
      return { success: false, error: err.message };
    }
  }

  // 自动绑定所有 CTA 按钮
  function autoAttach() {
    // W10-fix · 区分"真实弹窗按钮"和"误标签的跳转链接"
    // 规则:
    //   1. data-foodvio-cta="sample_request/catalog_download/custom_inquiry/meeting_booking/origin_tour"
    //      → 永远弹询盘弹窗(用户的明确意图)
    //   2. data-foodvio-cta="general_contact"(历史遗留宽泛标签)
    //      → 只在 href 是 "#" / 空 / 不存在 时弹窗;
    //         否则保持普通链接行为(让浏览器去跳)
    const POPUP_CTAS = new Set([
      'sample_request', 'catalog_download', 'custom_inquiry',
      'meeting_booking', 'origin_tour'
    ]);

    document.querySelectorAll('[data-foodvio-cta]').forEach(btn => {
      const ctaType = btn.dataset.foodvioCta;
      const href = btn.getAttribute('href') || '';
      const isPopupCta = POPUP_CTAS.has(ctaType);
      const isPlaceholderHref = (href === '' || href === '#');

      // 只在以下情况拦截并弹窗:
      //   - 真正的弹窗 CTA(sample_request 等)
      //   - 或 general_contact + href 是占位(没有真链接)
      const shouldOpenModal = isPopupCta || (ctaType === 'general_contact' && isPlaceholderHref);

      if (shouldOpenModal) {
        btn.addEventListener('click', function(e) {
          e.preventDefault();
          openModal(ctaType);
        });
      }
      // else: 保持原生 <a href="..."> 跳转行为,不绑事件
    });
  }

  // 弹窗 UI
  function openModal(ctaType) {
    const ctaLabels = {
      'sample_request':    '申请样品组合',
      'catalog_download':  '下载产品目录',
      'custom_inquiry':    '启动定制开发',
      'meeting_booking':   '预约通话',
      'origin_tour':       '预约产地访查',
      'general_contact':   '联系我们'
    };
    const label = ctaLabels[ctaType] || '联系我们';
    const subsite = detectSubsite();
    const quality = detectQuality(subsite, ctaType);
    const isChinpapa = isChinpapaContext();
    const qualityBadge = quality === 'hot' ? '🔥 Hot Lead' :
                         quality === 'warm' ? '🌡 Warm Lead' : '❄️ Cold Lead';
    const qualityColor = quality === 'hot' ? '#C73E3A' :
                         quality === 'warm' ? '#E07A5F' : '#81B29A';

    // chinpapa 专属年龄勾选
    const ageConsentBlock = isChinpapa ? `
            <label style="display:flex;align-items:flex-start;gap:8px;font-size:12px;color:#4A6271;line-height:1.5;cursor:pointer;margin-top:4px">
              <input type="checkbox" name="age_consent_chinpapa" id="foodvio-age-consent" required style="margin-top:3px;flex-shrink:0;cursor:pointer" />
              <span style="flex:1">
                <span data-zh>我已年满 14 周岁,或为代未成年人填写表单的监护人。</span>
                <span data-en>I am at least 14 years of age, or I am a guardian filling this form on behalf of a minor.</span>
              </span>
            </label>
    ` : '';

    const modalHTML = `
      <div id="foodvio-modal" style="position:fixed;inset:0;background:rgba(13,42,31,0.85);z-index:9999;display:flex;align-items:center;justify-content:center;padding:20px;backdrop-filter:blur(8px);font-family:'Noto Sans SC',sans-serif">
        <div style="background:#FAF7F0;border-radius:24px;padding:36px;max-width:480px;width:100%;position:relative;max-height:90vh;overflow-y:auto">
          <div style="position:absolute;top:18px;right:18px;background:${qualityColor};color:#fff;padding:4px 10px;border-radius:999px;font-size:10px;letter-spacing:0.1em;font-family:'Cormorant Garamond',serif;font-style:italic">${qualityBadge}</div>
          <div style="font-family:'Cormorant Garamond',serif;font-style:italic;color:#E07A5F;font-size:12px;letter-spacing:0.15em;text-transform:uppercase;margin-bottom:6px">— ${ctaType.toUpperCase().replace('_',' ')}</div>
          <h3 style="font-family:'Noto Serif SC',serif;font-weight:700;color:#1B4332;font-size:24px;margin-bottom:20px">${label}</h3>
          <form id="foodvio-form" style="display:flex;flex-direction:column;gap:12px">
            <input name="name" required placeholder="您的姓名 *" style="padding:12px 14px;border:1px solid rgba(27,67,50,0.2);border-radius:8px;font-size:14px;background:#fff;font-family:inherit" />
            <input name="company" placeholder="公司名称(可选)" style="padding:12px 14px;border:1px solid rgba(27,67,50,0.2);border-radius:8px;font-size:14px;background:#fff;font-family:inherit" />
            <input name="email" type="email" required placeholder="邮箱 *" style="padding:12px 14px;border:1px solid rgba(27,67,50,0.2);border-radius:8px;font-size:14px;background:#fff;font-family:inherit" />
            <input name="phone" required placeholder="${document.body.classList.contains('lang-en') ? 'Phone *' : '电话/微信 *'}" style="padding:12px 14px;border:1px solid rgba(27,67,50,0.2);border-radius:8px;font-size:14px;background:#fff;font-family:inherit" />
            <textarea name="message" rows="3" placeholder="补充说明(可选)" style="padding:12px 14px;border:1px solid rgba(27,67,50,0.2);border-radius:8px;font-size:14px;background:#fff;resize:vertical;font-family:inherit"></textarea>

            <!-- W9 合规:同意勾选框 -->
            <label style="display:flex;align-items:flex-start;gap:8px;font-size:12px;color:#4A6271;line-height:1.5;cursor:pointer;margin-top:4px">
              <input type="checkbox" name="consent" id="foodvio-consent" required style="margin-top:3px;flex-shrink:0;cursor:pointer" />
              <span style="flex:1">
                <span data-zh>我已阅读并同意 <a href="privacy-policy-zh.html" target="_blank" style="color:#1B4332;text-decoration:underline;text-underline-offset:2px">《隐私政策》</a> 和 <a href="terms-of-service-zh.html" target="_blank" style="color:#1B4332;text-decoration:underline;text-underline-offset:2px">《用户协议》</a>,并同意花花食界处理我的询盘信息(包括存储于境外的 Supabase 数据库)。</span>
                <span data-en>I have read and agree to the <a href="privacy-policy-en.html" target="_blank" style="color:#1B4332;text-decoration:underline;text-underline-offset:2px">Privacy Policy</a> and <a href="terms-of-service-en.html" target="_blank" style="color:#1B4332;text-decoration:underline;text-underline-offset:2px">Terms of Service</a>, and consent to Foodvio processing my inquiry (including storage on Supabase outside Mainland China).</span>
              </span>
            </label>
            ${ageConsentBlock}

            <div style="display:flex;gap:10px;margin-top:6px">
              <button type="button" id="foodvio-cancel" style="flex:1;padding:14px;border:1px solid rgba(27,67,50,0.3);background:transparent;border-radius:999px;font-size:14px;cursor:pointer;color:#1B4332;font-family:inherit">取消</button>
              <button type="submit" id="foodvio-submit" disabled style="flex:2;padding:14px;background:#C73E3A;color:#fff;border:none;border-radius:999px;font-size:14px;cursor:not-allowed;font-weight:500;font-family:inherit;opacity:0.5;transition:opacity 0.2s">提交</button>
            </div>
            <div id="foodvio-status" style="font-size:13px;text-align:center;min-height:20px"></div>
          </form>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // 关闭按钮
    document.getElementById('foodvio-cancel').onclick = () => document.getElementById('foodvio-modal').remove();
    document.getElementById('foodvio-modal').onclick = (e) => {
      if (e.target.id === 'foodvio-modal') e.target.remove();
    };

    // W9 合规:勾选框联动提交按钮启用/禁用
    const consentBox = document.getElementById('foodvio-consent');
    const ageBox = document.getElementById('foodvio-age-consent'); // 仅 chinpapa 才有
    const submitBtn = document.getElementById('foodvio-submit');

    function updateSubmitState() {
      const consented = consentBox && consentBox.checked;
      const ageOk = !ageBox || ageBox.checked; // ageBox 不存在(非 chinpapa 页面)视为通过
      const enabled = consented && ageOk;
      submitBtn.disabled = !enabled;
      submitBtn.style.opacity = enabled ? '1' : '0.5';
      submitBtn.style.cursor = enabled ? 'pointer' : 'not-allowed';
    }

    if (consentBox) consentBox.addEventListener('change', updateSubmitState);
    if (ageBox) ageBox.addEventListener('change', updateSubmitState);

    // 提交处理
    document.getElementById('foodvio-form').onsubmit = async function(e) {
      e.preventDefault();
      // 二次防御:即使按钮被绕过(F12 改 disabled)也校验
      if (!consentBox.checked) {
        alert('请先阅读并同意《隐私政策》和《用户协议》');
        return;
      }
      if (ageBox && !ageBox.checked) {
        alert('请确认年龄/监护人身份');
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = '提交中...';
      const status = document.getElementById('foodvio-status');
      status.textContent = '';
      const formData = Object.fromEntries(new FormData(e.target));
      formData.cta_type = ctaType;
      formData.age_consent_chinpapa = ageBox ? ageBox.checked : false;
      const result = await submitLead(formData);
      if (result.success) {
        status.style.color = '#1B4332';
        status.textContent = '✓ 提交成功!客服会在 24 小时内联系您';
        setTimeout(() => document.getElementById('foodvio-modal').remove(), 2500);
      } else {
        status.style.color = '#C73E3A';
        status.textContent = '✗ 提交失败,请稍后重试或拨 400-6879-568';
        submitBtn.disabled = false;
        submitBtn.textContent = '提交';
        submitBtn.style.opacity = '1';
        submitBtn.style.cursor = 'pointer';
      }
    };
  }

  return { submitLead, openModal, autoAttach, detectSubsite, CONSENT_VERSION };
})();

// DOM Ready 自动绑定
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', FoodvioLeads.autoAttach);
} else {
  FoodvioLeads.autoAttach();
}

console.log('%c[Foodvio V6.2 · W9] Lead Capture 已加载 · 合规版 ' + FoodvioLeads.CONSENT_VERSION, 'color:#F5C82E;background:#0d2a1f;padding:6px 12px;border-radius:4px');
