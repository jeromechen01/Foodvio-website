# Foodvio V6.2 · W11 改动报告

> **修复日期**:2026-05-14
> **任务**:1) sauces 删 4 风味 tab;2) 4 子页卡片升级为 sauce-card 同款;3) 首页 hero 3 图 Ken Burns 轮播
> **结果**:✅ 3 任务全部完成 + 修复 chinpapa "营养/美味/健康" tab HTML 断裂 bug

---

## 🎯 三件任务总览

| 任务 | 状态 | 影响范围 |
|---|---|---|
| **1. sauces 删 4 大风味分类** | ✅ 完成 | products-sauces-v62.html |
| **2. 4 子页卡片升级为 sauce-card 同款** | ✅ 完成 | staples / snacks / mains / chinpapa |
| **2.5. chinpapa "营养/美味/健康" tab 修复** | ✅ 完成 | products-chinpapa-v62.html |
| **3. 首页 hero 3 图 Ken Burns 轮播** | ✅ 完成 | index.html + assets/hero/*.jpg |

---

## 任务 1 · sauces 删 4 风味 tab,合并为统一网格

### 改动前
- 4 个 `<button class="flavor-tab">` (意式 / 美式 / 东南亚 / 日韩)
- 4 个 `<div class="sauce-panel">` 容器,18 张 sauce-card 分散
- JS 监听 tab click 切换 panel display

### 改动后
- ❌ 删除 `<div class="flavor-tabs">` 整个容器
- ❌ 删除 4 个 panel 边界,合并为 1 个统一 grid
- ❌ 删除 JS 中的 Flavor tabs 切换逻辑
- ✅ **18 张 sauce-card 全部保留**,平铺为一个 5 列大网格

### 验证
- ✅ flavor-tabs HTML 数:0(已删干净)
- ✅ sauce-card 总数:18(完整保留)

---

## 任务 2 · 4 子页 SKU 卡片升级

### 升级前后对比

| 子页 | SKU 数 | 改前卡片 | 改后卡片 |
|---|---|---|---|
| products-staples | 11 | ps-card(emoji + 名 + 申请样品箭头) | sauce-card(色块 + 名 + 描述 + 规格 + tags + 详情) |
| products-snacks | 6 | 同上 | 同上 |
| products-mains | 4 | 同上 | 同上 |
| products-chinpapa | 8 | 同上 | 同上 |

### 新卡片结构(sauce-card 同款)

```
┌──────────────────────────┐
│  [色块 swatch · 4:3]      │  ← 渐变色块 + 噪点纹理
│   🍕  ⭐ Bestseller       │  ← emoji 中心 + badge 左上
├──────────────────────────┤
│  产品中文名(粗体)          │
│  English Name(斜体)       │
│  ──                       │
│  卖点描述,2 句话           │  ← 来自画册
│  ──                       │
│  规格 · 240g 单人份        │  ← 灰色 + 虚线分隔
│  ──                       │
│  [tag1] [tag2] [tag3]    │  ← 金黄色 pill 标签
│                          │
│  申请样品 →               │  ← rust 红色,hover gap 变大
└──────────────────────────┘
```

### 品类分 section(保留)

#### Staples 11 SKU 分 4 section
- 01 · 🍕 西式披萨(5):黑松露 / 肉食炸弹 / 夏威夷 / 和牛肉酱 / 榴莲
- 02 · 🌯 墨西哥风味卷饼 & 饼(2):芝士牛肉饼 / 芝士牛肉卷
- 03 · 🍝 意大利面(2):古法肉酱 / 奶油蘑菇
- 04 · 🍱 炒饭 & 汉堡(2):日式鱿鱼炒饭 / 安格斯牛肉汉堡

#### Snacks 6 SKU 分 3 section
- 01 · 🥔 薯类(2):香酥土豆块 / 原切红薯条
- 02 · 🐟 海鲜(2):黄金鳕鱼排 / 黄金凤尾虾
- 03 · 🍗 禽类(2):泰式香茅鸡翅根 / 鸡肉锅巴

#### Mains 4 SKU 分 3 section
- 01 · 🍗 意式烤鸡(1):意式香草烤鸡
- 02 · 🍖 猪肘 · 肋排(2):德式脆皮猪肘 / 美式炭烤猪肋排
- 03 · 🌭 德国经典拼盘(1):德国经典拼盘

#### Chinpapa 8 SKU 分 4 section
- 02 · 🍕 美式/意式披萨(3):黑椒牛肉 / 和牛肉酱 / 黑松露
- 03 · 🌯 西式主食(3):芝士牛肉卷 / 芝士牛肉饼 / 古法肉酱意面
- 04 · 🍗 主菜大餐(1):意式香草萌萌鸡
- 05 · 🌶️ 健康小菜(1):健康发酵辣椒

### 自检通过

| 文件 | sauce-card | ps-card 残留 |
|---|---|---|
| products-staples | **11** | **0** |
| products-snacks | **6** | **0** |
| products-mains | **4** | **0** |
| products-chinpapa | **8** | **0** |

---

## 任务 2.5 · chinpapa "营养/美味/健康" tab 修复

### Bug 现象(W10 遗留)
第 799 行 HTML 严重断裂:第 4 个"便捷"块的 `<div>` 标签写到一半,被截断:

```html
<div class="text-center p-4 bg-white rounded-2xl border border-forest/
<!-- 美式/意式披萨 -->        ← 直接被新 section 截断
```

后续整个 DOM 结构都崩溃,4 Values 区只显示 3 块(营养/美味/健康),"便捷"消失。

### 修复
补回第 4 块 + CONVENIENT label + 闭合标签:

```html
<div class="text-center p-4 bg-white rounded-2xl border border-forest/10">
  <div class="font-display italic text-terra text-xs tracking-wider mb-2">CONVENIENT</div>
  <div class="font-serif-sc font-bold text-forest text-base">便捷</div>
</div>
```

### 自检
- ✅ NUTRITION / DELICIOUS / HEALTHY / CONVENIENT 4 块齐全
- ✅ 4 Values grid 完整闭合
- ✅ 后续产品 section 正常显示

---

## 任务 3 · 首页 hero 3 图 Ken Burns 轮播

### 设计参数(按你的指示)

| 参数 | 值 |
|---|---|
| 切换效果 | Ken Burns 缓慢放大 |
| 每张停留 | 5 秒 |
| 切换衔接 | fade 淡入淡出 |
| 循环 | 无限循环 |
| Ken Burns 缩放 | 1.00 → 1.08 |

### 文件就位

| 路径 | 大小 | 用途 |
|---|---|---|
| `assets/hero/hero-01.jpg` | 1.5 MB | BBQ 餐桌 |
| `assets/hero/hero-02.jpg` | 328 KB | 6 杯酱料 |
| `assets/hero/hero-03.jpg` | 382 KB | 披萨汉堡 |

### 技术实现

```css
/* 3 张图叠放,@keyframes 15s 一个完整循环(每张 5s) */
.hero-slide {
  position: absolute; inset: 0;
  background-size: cover;
  background-position: center;
  opacity: 0;
  animation: heroFade 15s infinite;
}
.hero-slide-1 { background-image: url('assets/hero/hero-01.jpg'); animation-delay: 0s; }
.hero-slide-2 { background-image: url('assets/hero/hero-02.jpg'); animation-delay: 5s; }
.hero-slide-3 { background-image: url('assets/hero/hero-03.jpg'); animation-delay: 10s; }

@keyframes heroFade {
  0%    { opacity: 0; transform: scale(1.00); }
  6%    { opacity: 1; transform: scale(1.01); }   /* 淡入 0.9s */
  26%   { opacity: 1; transform: scale(1.05); }   /* 高潮停留 */
  33%   { opacity: 1; transform: scale(1.07); }
  40%   { opacity: 0; transform: scale(1.08); }   /* 淡出 1.05s */
  100%  { opacity: 0; transform: scale(1.00); }
}
```

### HTML 结构

```html
<section class="relative h-screen min-h-[760px] flex items-center overflow-hidden">
  <div class="hero-bg">
    <div class="hero-slide hero-slide-1"></div>
    <div class="hero-slide hero-slide-2"></div>
    <div class="hero-slide hero-slide-3"></div>
  </div>
  ...
</section>
```

### 文字层叠加

文字层(z-10)叠在轮播图(z-0)上方,加 `linear-gradient` 暗化遮罩(0.55→0.35→0.65)保证文字可读。

### 后续替换

如需换图:把新图覆盖到 `assets/hero/hero-01.jpg / hero-02.jpg / hero-03.jpg` 同名即可。

---

## 📦 交付文件

| 文件 | 大小 | 内容 |
|---|---|---|
| `Foodvio-website-W11.zip` | 2.8 MB | 57 文件(含 3 张 hero 图 2.2 MB) |
| `W11-CHANGE-REPORT.md` | 本文档 | W11 改动详情 |

---

## 🚀 上线步骤

```bash
unzip Foodvio-website-W11.zip -d /tmp/w11
cd /tmp/w11
git add .
git commit -m "W11: sauces 删 tab + 4 子页卡片升级 + 首页 3 图轮播"
git push origin main
```

---

## ✅ 上线后请验证

1. **首页 hero 轮播**
   - 加载首页 → 看到 BBQ 餐桌图(hero-01)
   - 5 秒后 → 淡出至 6 杯酱料图(hero-02),并伴随缓慢放大
   - 再 5 秒 → 淡出至披萨汉堡图(hero-03)
   - 总循环 15 秒

2. **sauces 子页**
   - 点 nav → 产品 → 西式酱料
   - 看到 18 张 sauce-card 平铺在一个 grid(不再有"意式/美式/东南亚/日韩"4 个 tab)

3. **staples / snacks / mains / chinpapa 子页**
   - 点 nav → 产品 → 西式主食
   - 看到 4 个品类 section(披萨 5 / 卷饼饼 2 / 意面 2 / 炒饭汉堡 2)
   - 每张卡片是 sauce-card 同款样式(色块 + 名 + 描述 + 规格 + tags + 详情)

4. **chinpapa 4 Values**
   - 点 nav → 产品 → 华仔爸爸
   - "愿中国小朋友们健康快乐成长"section 下,看到 4 个白色卡片:营养 / 美味 / 健康 / 便捷(不再缺"便捷")

---

## 💡 我顺手做的事

### chinpapa 4 Values 修复(任务 2.5)
你只让我"修改 tab 不对",我深入查看后发现是 HTML 标签断裂导致第 4 块消失。直接补回。

### sauce-card 22 色系完整库
为了让卡片背景跟 SKU 内容呼应,我建了 22 个食物色系 swatch:
- 披萨类:sw-pizza-truffle / meat / hawaiian / wagyu / durian
- 主食:sw-quesadilla / burrito / pasta-bolognese / pasta-cream / fried-rice / burger
- 小食:sw-potato / sweet-potato / cod / shrimp / chicken-thai / chicken-bite
- 主菜:sw-roast-chicken / pork-knuckle / bbq-ribs / sausage-platter
- 其他:sw-fermented-chili

每个 SKU 都对应了语义化的颜色(比如猪肋排是深红 #8C2A1F→#4A1009)。

---

## ⏳ 累积的 PENDING 任务

距 W9 启动至今累积了 6 项知识库同步任务,等你 push 上线后批量处理:

| # | 文档 | 内容 |
|---|---|---|
| 1 | 新建 `foodvio-V62-w10-stage1-record.md` | W10 阶段一 |
| 2 | 新建 `foodvio-V62-w10-fix-record.md` | W10-fix 链接闭环 |
| 3 | 新建 `foodvio-V62-w10-fix2-record.md` | W10-fix-2 语言+banner |
| 4 | 新建 `foodvio-V62-w10-fix3-record.md` | W10-fix-3 双语+hero |
| 5 | **新建 `foodvio-V62-w11-record.md`(本次)** | sauces 删 tab + 卡片升级 + hero 轮播 |
| 6 | 更新 `foodvio-V62-brief-locked-V2.md` | sauce-card 22 色系 + hero 路径 + nav 双语映射 + W11 决策 |

不急在今天。等你 push 上线测试反馈无误后,我们一起同步。

---

**文档版本**:V1.0
**修复日期**:2026-05-14
**关联文档**:W10-CHANGE-REPORT.md / W10-FIX-REPORT.md / W10-FIX2-REPORT.md / W10-FIX3-REPORT.md
