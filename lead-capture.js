/* ════════════════════════════════════════════════
   Foodvio V6.2 · Supabase Lead Capture (GitHub Pages 版)
   ════════════════════════════════════════════════
   文件路径:/lead-capture.js (放在 repo 根目录)
   引用方式:每个 HTML 的 </head> 之前加一行:
   <script src="lead-capture.js" defer></script>
   ════════════════════════════════════════════════
   修改 SUPABASE 配置:只需改下面 2 行(SUPABASE_URL 和 SUPABASE_ANON_KEY)
   修改后:git commit + push,17 页全部自动生效
   ════════════════════════════════════════════════ */

window.FoodvioLeads = (function() {

  // ⚠️ 修改这里 ⚠️ —— 部署前必须替换为你的真实值
  const SUPABASE_URL  = 'https://kaqdluhhrlkogpecrwbx.supabase.co';
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImthcWRsdWhocmxrb2dwZWNyd2J4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcyNzA3MDEsImV4cCI6MjA5Mjg0NjcwMX0.Tq1yWsrnc8CBfBwmo6druKlRAolSLYM977TWgqu6j00';

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
      cta_type: formData.cta_type
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

      console.log('[Foodvio Leads] ✓ 提交成功', { subsite, quality, cta_type: formData.cta_type });
      return { success: true };
    } catch (err) {
      console.error('[Foodvio Leads] 网络错误:', err);
      return { success: false, error: err.message };
    }
  }

  // 自动绑定所有 CTA 按钮
  function autoAttach() {
    document.querySelectorAll('[data-foodvio-cta]').forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        openModal(btn.dataset.foodvioCta);
      });
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
    const qualityBadge = quality === 'hot' ? '🔥 Hot Lead' :
                         quality === 'warm' ? '🌡 Warm Lead' : '❄️ Cold Lead';
    const qualityColor = quality === 'hot' ? '#C73E3A' :
                         quality === 'warm' ? '#E07A5F' : '#81B29A';

    const modalHTML = `
      <div id="foodvio-modal" style="position:fixed;inset:0;background:rgba(13,42,31,0.85);z-index:9999;display:flex;align-items:center;justify-content:center;padding:20px;backdrop-filter:blur(8px);font-family:'Noto Sans SC',sans-serif">
        <div style="background:#FAF7F0;border-radius:24px;padding:36px;max-width:480px;width:100%;position:relative">
          <div style="position:absolute;top:18px;right:18px;background:${qualityColor};color:#fff;padding:4px 10px;border-radius:999px;font-size:10px;letter-spacing:0.1em;font-family:'Cormorant Garamond',serif;font-style:italic">${qualityBadge}</div>
          <div style="font-family:'Cormorant Garamond',serif;font-style:italic;color:#E07A5F;font-size:12px;letter-spacing:0.15em;text-transform:uppercase;margin-bottom:6px">— ${ctaType.toUpperCase().replace('_',' ')}</div>
          <h3 style="font-family:'Noto Serif SC',serif;font-weight:700;color:#1B4332;font-size:24px;margin-bottom:20px">${label}</h3>
          <form id="foodvio-form" style="display:flex;flex-direction:column;gap:12px">
            <input name="name" required placeholder="您的姓名 *" style="padding:12px 14px;border:1px solid rgba(27,67,50,0.2);border-radius:8px;font-size:14px;background:#fff;font-family:inherit" />
            <input name="company" placeholder="公司名称(可选)" style="padding:12px 14px;border:1px solid rgba(27,67,50,0.2);border-radius:8px;font-size:14px;background:#fff;font-family:inherit" />
            <input name="email" type="email" required placeholder="邮箱 *" style="padding:12px 14px;border:1px solid rgba(27,67,50,0.2);border-radius:8px;font-size:14px;background:#fff;font-family:inherit" />
            <input name="phone" placeholder="电话(可选)" style="padding:12px 14px;border:1px solid rgba(27,67,50,0.2);border-radius:8px;font-size:14px;background:#fff;font-family:inherit" />
            <textarea name="message" rows="3" placeholder="补充说明(可选)" style="padding:12px 14px;border:1px solid rgba(27,67,50,0.2);border-radius:8px;font-size:14px;background:#fff;resize:vertical;font-family:inherit"></textarea>
            <div style="display:flex;gap:10px;margin-top:6px">
              <button type="button" id="foodvio-cancel" style="flex:1;padding:14px;border:1px solid rgba(27,67,50,0.3);background:transparent;border-radius:999px;font-size:14px;cursor:pointer;color:#1B4332;font-family:inherit">取消</button>
              <button type="submit" id="foodvio-submit" style="flex:2;padding:14px;background:#C73E3A;color:#fff;border:none;border-radius:999px;font-size:14px;cursor:pointer;font-weight:500;font-family:inherit">提交</button>
            </div>
            <div id="foodvio-status" style="font-size:13px;text-align:center;min-height:20px"></div>
          </form>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    document.getElementById('foodvio-cancel').onclick = () => document.getElementById('foodvio-modal').remove();
    document.getElementById('foodvio-modal').onclick = (e) => {
      if (e.target.id === 'foodvio-modal') e.target.remove();
    };

    document.getElementById('foodvio-form').onsubmit = async function(e) {
      e.preventDefault();
      const submitBtn = document.getElementById('foodvio-submit');
      const status = document.getElementById('foodvio-status');
      submitBtn.disabled = true;
      submitBtn.textContent = '提交中...';
      status.textContent = '';
      const formData = Object.fromEntries(new FormData(e.target));
      formData.cta_type = ctaType;
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
      }
    };
  }

  return { submitLead, openModal, autoAttach, detectSubsite };
})();

// DOM Ready 自动绑定
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', FoodvioLeads.autoAttach);
} else {
  FoodvioLeads.autoAttach();
}

console.log('%c[Foodvio V6.2] Lead Capture 已加载', 'color:#F5C82E;background:#0d2a1f;padding:6px 12px;border-radius:4px');
