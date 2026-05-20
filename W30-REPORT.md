# Foodvio V6.2 · W30 报告

> **日期**:2026-05-20
> **任务**:抖音原图 + 标签改 + 全站 QR 同步 + 联系我们滚到 footer
> **结果**:✅ 全部完成,0 死链,0 锚点失效

---

## 🎯 4 项任务完成清单

| # | 任务 | 状态 |
|---|---|---|
| 1 | 抖音二维码用原图(不裁剪)| ✅ |
| 2 | "花花食界官方公众号" → "官方公众号";"小程序" → "官方商城" | ✅ |
| 3 | 3 个二维码出现在所有有 footer 的页面(39 文件)| ✅ |
| 4 | 右上角"联系我们"按钮 → 滚到 footer 底部 | ✅ |

---

## 任务 1 · 抖音二维码原图

### 改动
- 删掉 W29 裁剪后的版本
- 使用**完整原图**(1125×1192 → 等比缩到 600×635)
- 保留:抖音 logo + 头像 + @花花食界餐饮创业说 + 抖音号 85342969766

### 视觉
抖音二维码现在比另外 2 个二维码**略高 5%**(因为是 600×635 vs 600×600),但在 footer 容器里几乎看不出来 — 容器是 84×84(高度由内容决定,object-fit:contain)。

---

## 任务 2 · 标签调整

| 二维码 | W29 标签 | **W30 标签** |
|---|---|---|
| 公众号 | 花花食界官方公众号 / Official WeChat | **官方公众号** / Official WeChat |
| 小程序 | 小程序 / Mini Program | **官方商城** / **Official Store** |
| 抖音 | 抖音旗舰店 / Douyin | 抖音旗舰店 / Douyin(不变) |

**说明**:小程序标签语义化为"官方商城"更明确告诉用户这是购物入口。

---

## 任务 3 · 全站 QR 同步(39 文件)

### 覆盖范围
- **全站 39 个有 footer 的页面**全部加上 3 个二维码
- 排除 6 个法律页(privacy/terms/cookie × zh/en — 这些页面本来就没有完整 footer)

### Footer 结构多样性挑战
全站 footer 实际有 **3 种不同结构**:
1. **标准版**(index/about/careers/products 等):logo + slogan `<p>` + 4 栏(产品/方案/探索/联系)
2. **多行紧凑版**(our-story-*):跟标准版一样但 div 之间没有换行
3. **单行简化版**(capabilities-* × 5):没有 slogan `<p>`,logo 直接接 4 栏(每栏单行压缩)

我用 4 轮不同的 regex 模式逐步覆盖所有变体,最终 **39/39 文件全部成功**。

### 视觉效果(全站统一)
- 3 个 84×84 白色圆角二维码,横向排列
- 下方斜体 Cormorant 标签(白色 75% 透明)
- 桌面 hover 缩放 1.08 + 金色光晕
- 移动端 < 480px 自动缩到 72×72

---

## 任务 4 · 联系我们 → footer-contact 锚点(关键 UX 改造)

### 改动前(W29)
- **桌面端 nav 联系我们按钮**:`href="#" data-foodvio-cta="general_contact"` → 弹 lead-capture 表单
- **移动端 drawer 联系我们**:同上

### 改动后(W30)
- **桌面端 nav 联系我们按钮**:`href="#footer-contact"` → 平滑滚动到 footer 联系栏
- **移动端 drawer 联系我们**:同上 + `onclick` 关闭 drawer 后再滚动
- **新增 `id="footer-contact"` 锚点**:在 footer "联系" 标题上(39 文件全部加上)

### 用户点击后体验
1. 点击右上角"联系我们" → 页面**平滑滚动到底部**
2. 用户看到:
   - 3 个二维码(官方公众号 / 官方商城 / 抖音旗舰店)
   - 电话:400-6879-568
   - 邮箱:huahuakefu1@foodvio.com.cn
   - 地址:北京市朝阳区零秒空间酒仙桥社区419房间
   - "申请 VIP" 按钮

### 顺便修复的死链
桌面端 nav 原 `href="#"` 是**死链**(点击会跳到页面顶部) — 现在变成实际 footer 锚点,**0 死链**。

### Smooth Scroll
- 39 业务页都已有 `scroll-behavior: smooth` CSS → 自动平滑滚动
- 6 个法律页没有此 CSS,但法律页也没有"联系我们"按钮,无影响

---

## ✅ 全站完整自检

| 项 | 数据 | 状态 |
|---|---|---|
| qr-douyin 原图(矩形)| 600×635 | ✅ |
| "官方公众号" / "官方商城" 标签 | ✓ | ✅ |
| "花花食界官方公众号" 老标签残留 | 0 | ✅ |
| 全站 footer 含 QR | 39/39 | ✅ |
| 桌面 nav-cta 链接到 #footer-contact | 9 | ✅ |
| 桌面 nav-cta 死链残留 | 0 | ✅ |
| 移动 drawer 链接到 #footer-contact | 39 | ✅ |
| id="footer-contact" 锚点 | 39 | ✅ |
| 404 链接 | 0 | ✅ |
| 锚点失效 | 0 | ✅ |
| index.html 标签平衡 | issues=0 | ✅ |

---

## 📦 W30 交付

| 文件 | 大小 |
|---|---|
| **Foodvio-website-W30.zip** | **36 MB** |
| **W30-REPORT.md** | 本文档 |

---

## 🚀 一键上线

```bash
unzip Foodvio-website-W30.zip -d /tmp/w30
cd /tmp/w30
git add .
git commit -m "W30: 抖音原图 + 标签官方公众号/官方商城 + 39页 QR + 联系我们→footer-contact 锚点"
git push origin main
```

---

## ✅ 上线后请重点验证

### 1. 任务 1+2 · index.html footer QR
访问 https://jeromechen01.github.io/foodvio-website/
- 滚到底部 footer
- 3 张二维码,标签应为:**官方公众号 / 官方商城 / 抖音旗舰店**
- 抖音二维码应**包含完整画面**(蓝底 + 抖音 logo + 头像 + @账号 + 抖音号)

### 2. 任务 3 · 全站任意页面 footer
随机访问几个页面验证 QR 都在:
- https://jeromechen01.github.io/foodvio-website/about-v62.html
- https://jeromechen01.github.io/foodvio-website/products-sauces-v62.html
- https://jeromechen01.github.io/foodvio-website/capabilities-rd-team-v62.html
- https://jeromechen01.github.io/foodvio-website/our-story-index-v62.html
- 每个 footer 底部都应有 3 个二维码

### 3. 任务 4 · 联系我们按钮(关键!)
- 任意页面**顶部右上角红色"联系我们"按钮** → 点击 → **页面应平滑滚动到 footer "联系" 栏**
- 看到:3 个二维码 + 电话 + 邮箱 + 地址
- **不再弹表单**(原 lead-capture 表单弹窗已删)

### 4. 手机端
- 用手机打开任意页面
- 点击顶部汉堡菜单 → 展开 drawer → 底部"联系我们" → 点击
- drawer 应**自动关闭** + 页面**滚到 footer**
- footer 二维码自动缩到 72×72

### 5. 二维码扫码测试(关键!)
- 用手机微信扫桌面屏幕 公众号二维码 → 跳到关注页 ✓
- 用手机微信扫 小程序二维码 → 打开小程序 ✓
- 用手机抖音扫 抖音二维码 → 跳到 @花花食界餐饮创业说 ✓

---

## 💡 我的判断 + 顾问 notes

### 1. 抖音原图保留
你说"不要改动" → 我用完整原图(含 logo + 头像 + @账号 + 抖音号底部文字)。
**视觉权衡**:三个二维码内容风格其实不太统一(公众号/小程序简洁,抖音华丽),但都是各平台的官方分享样式,**用户能一眼识别"这是抖音"**,识别成本最低。

### 2. "官方商城" vs "小程序"
"小程序"在中国用户语境是通用名词(微信小程序),"官方商城"更**强调购物属性**。但海外用户可能不懂"商城" → 英文用 **"Official Store"**(店铺,跟苹果 App Store 同义)。

### 3. footer-contact 锚点位置选择
我把锚点 id 放在 footer **"联系"标题上**(而不是 footer 整体),这样:
- 滚动后用户**正好看到"联系" 栏标题**(电话/邮箱在标题下)
- 同时**二维码区在该栏上方**(用户向上一点就能看到)
- 最佳视角

### 4. 移动端 drawer 联系我们关闭逻辑
我加了 `onclick="document.body.classList.remove('nav-drawer-open')"` — 点击后 drawer 自动关闭再滚动,避免 drawer 挡住视线。

### 5. 8 个文件没有桌面"联系我们"按钮?
全站只有 **9 个文件**有右上角"联系我们"红色 nav-cta(index + 8 个),其他 30 文件没有这个按钮 — 这是 W6 phase1 设计决策(避免每页都有此按钮过于突兀)。**W30 我没改这个设计**,只修改了已有的 9 个按钮的行为。

如果你想让**所有 39 文件**右上角都加这个按钮,告诉我我做 30 分钟。

---

## ⏳ 累积 PENDING

- 知识库 V3.2 → V3.3 同步(累积 W28-W30 共 3 周变更)
- 微信文章持续追加(用户每发新文章给 Claude → 5 分钟更新)

---

**文档版本**:V1.0
**日期**:2026-05-20
