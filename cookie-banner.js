/* ════════════════════════════════════════════════
   Foodvio V6.2 · Cookie Banner (W9 法律合规组件)
   ════════════════════════════════════════════════
   文件路径:/cookie-banner.js (放在 repo 根目录)
   引用方式:每个 HTML 的 </body> 之前加一行:
   <script src="cookie-banner.js" defer></script>
   ════════════════════════════════════════════════
   功能:
   - 首次访问弹底部 banner
   - 用户点"接受全部 / 仅必要"后,localStorage 记 1 年
   - 法律页(privacy/terms/cookie)上不弹,避免循环干扰阅读
   - 暴露 window.foodvioConsent() / window.foodvioWithdrawConsent()
   ════════════════════════════════════════════════ */

(function() {
  'use strict';

  const CONSENT_KEY = 'foodvio_consent';
  const CONSENT_VERSION = 'V1.0';

  // 在法律页上不弹 banner(避免阅读时干扰)
  const path = window.location.pathname.toLowerCase();
  if (path.includes('privacy-policy') || path.includes('terms-of-service') || path.includes('cookie-policy')) {
    return;
  }

  // 检查是否已同意当前版本
  const stored = localStorage.getItem(CONSENT_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (parsed.version === CONSENT_VERSION) return;
    } catch(e) {
      // 旧数据格式损坏,清掉重弹
      localStorage.removeItem(CONSENT_KEY);
    }
  }

  // 注入 CSS(避免依赖外部 stylesheet)
  const css = `
    .foodvio-cookie-banner {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(13, 42, 31, .98);
      color: rgba(245, 247, 240, .92);
      padding: 20px 24px;
      z-index: 9998;
      box-shadow: 0 -2px 20px rgba(0, 0, 0, .15);
      font-family: 'Noto Sans SC', 'Inter', -apple-system, sans-serif;
      font-size: 14px;
      line-height: 1.5;
      animation: cb-slide-up .4s ease-out;
    }
    @keyframes cb-slide-up {
      from { transform: translateY(100%); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    .foodvio-cookie-banner.cb-hide {
      transform: translateY(100%);
      opacity: 0;
      transition: all .3s ease-in;
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
      color: #F5C82E;
    }
    .foodvio-cookie-banner .cb-text p {
      margin: 0;
      color: rgba(245, 247, 240, .75);
    }
    .foodvio-cookie-banner .cb-text a {
      color: #F5C82E;
      text-decoration: underline;
      text-underline-offset: 2px;
    }
    .foodvio-cookie-banner .cb-text a:hover {
      opacity: .8;
    }
    .foodvio-cookie-banner .cb-actions {
      display: flex;
      gap: 12px;
      flex-shrink: 0;
    }
    .foodvio-cookie-banner .cb-btn {
      padding: 10px 20px;
      border: none;
      border-radius: 999px;
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
      transform: translateY(-1px);
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
      .foodvio-cookie-banner {
        padding: 16px 18px;
      }
      .foodvio-cookie-banner .cb-content {
        flex-direction: column;
        align-items: stretch;
        gap: 14px;
      }
      .foodvio-cookie-banner .cb-actions {
        justify-content: stretch;
      }
      .foodvio-cookie-banner .cb-btn {
        flex: 1;
        padding: 12px 16px;
      }
    }
    /* lang-en 模式下隐藏中文 */
    body.lang-en .foodvio-cookie-banner [data-zh] { display: none; }
    body:not(.lang-en) .foodvio-cookie-banner [data-en] { display: none; }
  `;
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  // 创建 banner DOM
  const banner = document.createElement('div');
  banner.className = 'foodvio-cookie-banner';
  banner.setAttribute('role', 'region');
  banner.setAttribute('aria-label', 'Cookie consent');

  banner.innerHTML = `
    <div class="cb-content">
      <div class="cb-text">
        <strong>
          <span data-zh>🍪 Cookie 偏好</span>
          <span data-en>🍪 Cookie Preferences</span>
        </strong>
        <p>
          <span data-zh>本网站使用必要 Cookie 保持基本功能。您可选择是否启用分析类 Cookie 以帮助我们改进。详见 <a href="cookie-policy-zh.html" target="_blank">《Cookie 使用说明》</a>。</span>
          <span data-en>This Site uses essential cookies for basic functionality. You can choose whether to enable analytics cookies to help us improve. See our <a href="cookie-policy-en.html" target="_blank">Cookie Policy</a>.</span>
        </p>
      </div>
      <div class="cb-actions">
        <button class="cb-btn cb-btn-secondary" data-action="essential">
          <span data-zh>仅必要</span>
          <span data-en>Essential Only</span>
        </button>
        <button class="cb-btn cb-btn-primary" data-action="all">
          <span data-zh>接受全部</span>
          <span data-en>Accept All</span>
        </button>
      </div>
    </div>
  `;

  // DOM ready 时再插入(等 body 准备好)
  function attachBanner() {
    if (!document.body) {
      setTimeout(attachBanner, 50);
      return;
    }
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
        try {
          localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
        } catch(e) {
          console.warn('[Foodvio Cookie] localStorage 不可用,本次会话内不再弹出');
        }
        banner.classList.add('cb-hide');
        setTimeout(() => {
          if (banner.parentNode) banner.parentNode.removeChild(banner);
        }, 350);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', attachBanner);
  } else {
    attachBanner();
  }

  // 暴露公共 API,供其他脚本检查 / 撤回
  window.foodvioConsent = function() {
    try {
      const s = localStorage.getItem(CONSENT_KEY);
      return s ? JSON.parse(s) : null;
    } catch(e) {
      return null;
    }
  };
  window.foodvioWithdrawConsent = function() {
    try {
      localStorage.removeItem(CONSENT_KEY);
    } catch(e) {}
    location.reload();
  };
})();

console.log('%c[Foodvio V6.2 · W9] Cookie Banner 已加载', 'color:#F5C82E;background:#0d2a1f;padding:6px 12px;border-radius:4px');
