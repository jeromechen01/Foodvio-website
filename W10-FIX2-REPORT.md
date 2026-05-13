# Foodvio V6.2 · W10-fix-2 修复报告

> **修复日期**:2026-05-06
> **触发**:用户反馈"中英文切换没反应 + Banner 字体大小不一致"
> **修复结果**:✅ 38 文件语言按钮升级 + 37 子页 hero 字号统一 + 首页 hero 标记视频位

---

## 🎯 三件修复

### 1. 中英文切换按钮 — 加入"当前语言高亮"视觉反馈

#### 问题诊断
- `toggleLang()` JS 函数其实**一直工作正常**,会切换 `body.lang-en` class
- 但**按钮 UI 永远显示"中 / EN"**,用户点击后**视觉上没有变化指示**
- 用户感知 = "按钮没反应"

#### 修复方案
按钮 UI 升级为**两个独立状态指示**:

| 状态 | UI 显示 |
|---|---|
| 中文模式(默认) | **中** / EN(中文加粗,EN 淡灰) |
| 英文模式 | 中 / **EN**(EN 加粗,中文淡灰) |

#### 技术实现
```html
<!-- 旧 -->
<button onclick="toggleLang()" class="lang-toggle">中 / EN</button>

<!-- 新 -->
<button onclick="toggleLang()" class="lang-toggle" id="lang-toggle-btn">
  <span class="lang-zh">中</span>
  <span class="lang-sep"> / </span>
  <span class="lang-en">EN</span>
</button>
```

```css
/* 默认:中文高亮 */
.lang-toggle .lang-zh { font-weight: 600; opacity: 1; }
.lang-toggle .lang-en { opacity: .5; }
.lang-toggle .lang-sep { opacity: .4; }

/* lang-en class 时:英文高亮 */
body.lang-en .lang-toggle .lang-zh { opacity: .5; font-weight: 400; }
body.lang-en .lang-toggle .lang-en { opacity: 1; font-weight: 600; }
```

**覆盖**:38 个 HTML 全部升级。

---

### 2. 全站子页 Hero Banner 字号统一

#### 问题诊断
| 页面 | W10-fix 前字号 | 视觉效果 |
|---|---|---|
| about | clamp(38px, 5vw, 64px) | ✅ 标准 |
| insights | clamp(38px, 5vw, 64px) | ✅ 标准 |
| products-index | clamp(36px, 4.5vw, 56px) | 略小 |
| capabilities-index | clamp(32px, 4vw, 52px) | 偏小 |
| solutions-index | clamp(28px, 3.5vw, 40px) | 偏小 |
| our-story-index | clamp(48px, 8vw, 112px) | 🚨 超大,3 行 |
| 5 国大师子页 | clamp(48px, 9vw, 128px) | 🚨 超大 |
| 5 原料子页 | clamp(48px, 9vw, 128px) | 🚨 超大 |
| 工厂子页 | clamp(32px, 4vw, 52px) | 偏小 |

#### 修复方案
**全站统一为 about 标准**:`clamp(38px, 5vw, 64px)`

- 移动端最小:38px(可读性)
- 视口缩放:5vw(响应式)
- 桌面端最大:64px(适中,不抢主视觉)

#### Our Story 特殊处理
原 hero 标题用 `<br>` 强制换行,改后去掉 `<br>` 让文字自由流动,争取 1 行布局:

```html
<!-- 旧 -->
<span data-zh>每一口花花食界,<br>背后都有一个<span class="em">中国故事</span></span>

<!-- 新 -->
<span data-zh>每一口花花食界,背后都有一个<span class="em">中国故事</span></span>
```

#### 覆盖
**37 个子页全部统一**(index.html 不动,留视频/动画位)

---

### 3. 首页 Hero — 视频/动画占位标记

#### 问题理解
你的指示:首页 banner 后续替换为视频/动画轮播,我现在不要动文字。

#### 修复方案
- **保留所有现有文字**(避免你看到空白)
- **加入开发标记**,告诉将来的我们(或下次会话的 Claude):此处需要替换

```html
<!-- ⚠️ W10-fix-2 标记 · 此 hero 为"视频/动画轮播预留位"
     未来 Jerome 会替换为:
       1) 全屏视频背景:
          <video autoplay muted loop playsinline class="hero-video">
            <source src="hero-video.mp4" type="video/mp4">
          </video>
       2) 或图片轮播:swiper.js + 3-5 张高清品牌图
     文字内容暂保留,可叠在视频/轮播上(z-10 层) -->
```

#### 你后续替换的方法
当你拿到视频文件后:
```html
<!-- 把这一行 -->
<div class="hero-bg"></div>

<!-- 替换为 -->
<video autoplay muted loop playsinline class="hero-bg" style="object-fit:cover;width:100%;height:100%;">
  <source src="hero-video.mp4" type="video/mp4">
</video>
```

或者改为 swiper 图片轮播,我可以届时帮你接入。

---

## 📦 修复内容清单

| 文件 | 改动 |
|---|---|
| **38 业务/法律 HTML** | 语言按钮 UI 升级(高亮当前语言) |
| **37 子页 HTML** | hero h1 字号统一为 clamp(38px, 5vw, 64px) |
| **our-story-index** | hero 文字去掉 `<br>` 强制换行 |
| **index.html** | hero 加入"视频/动画占位"开发注释 |

---

## ✅ 验证步骤

### 上线后请测试

1. **语言切换按钮**(任意页面)
   - 默认看到 `[中] / EN`(中文加粗)
   - 点击 → 看到 `中 / [EN]`(英文加粗)
   - 同时页面文字从中文 → 英文
   - 再点击 → 回到中文

2. **Banner 字号**
   - 打开 `about-v62.html` 看 banner 字号
   - 打开 `our-story-index-v62.html` → 字号应跟 about 一致(不再是巨大字)
   - 打开 `our-story-global-masters-italy-v62.html` → 字号应跟 about 一致
   - 打开 `capabilities-rd-team-v62.html` → 字号应跟 about 一致

3. **首页 hero**
   - 暂时跟之前一样(文字)
   - 等你给视频后,我们一起替换

---

## 📊 W10-fix-2 影响面

| 项 | 数据 |
|---|---|
| 修复的页面 | 38 个(全部业务页) |
| 改动行数 | ~80 行(集中在 button HTML、CSS、h1 style) |
| 自检通过 | 37/37 子页 hero 字号统一 |
| 下次会话能找到的"视频位"标记 | ✅ index.html 顶部有开发注释 |

---

## 🚀 上线步骤

```bash
unzip Foodvio-website-W10-fix2.zip -d /tmp/w10fix2
cd /tmp/w10fix2
git add .
git commit -m "W10-fix-2: 语言按钮 UI + hero 字号统一 + 视频位标记"
git push origin main
```

---

## 💡 我顺手做了 / 没做的事

### 顺手做的
- ✅ 给 our-story-index 去掉 `<br>` 让标题更可能 1 行布局
- ✅ Hero h1 都加了 `font-serif-sc font-black text-white leading-[1.05]` 类,确保排版一致
- ✅ index.html 加了清晰的开发注释,告诉将来怎么替换 hero

### 没做的(等你下指令)
- ❌ 没真的接入视频(等你给文件)
- ❌ 没动首页 hero 字号(你说留视频位)
- ❌ 没改首页"专业西餐"那个橙色描红高亮(那是设计意图,不是 bug)

---

## ⏳ 累积的 PENDING 任务

距 W9 启动至今,累积了 5 项知识库同步任务,等你 push 上线后批量处理:

1. 新建 `foodvio-V62-w10-stage1-record.md` (W10 阶段一)
2. 新建 `foodvio-V62-w10-fix-record.md` (W10-fix 链接闭环)
3. 新建 `foodvio-V62-w10-fix2-record.md` (W10-fix-2 语言+banner)
4. 更新 `foodvio-V62-brief-locked-V2.md` 加 hero 字号标准 + 语言按钮规范
5. 更新 brief 加"data-foodvio-cta 使用规范"红线

---

**文档版本**:V1.0
**修复日期**:2026-05-06
