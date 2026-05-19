# Foodvio V6.2 · W25 最终报告 v3(C 方案 · 原文字 + 联系客服)

> **日期**:2026-05-19
> **任务**:删 2 地图 + 63 个按钮转不可点文字(保留原文字)+ 加"联系客服"提示
> **结果**:✅ 全部完成,0 死链,0 锚点失效

---

## 🎯 用户反馈澄清后的最终方案

| CTA 类型 | 数量 | 处理 |
|---|---|---|
| **申请样品**(sample_request)| 60 | ✅ **保留可点击**,弹表单 |
| **商务联系**(general_contact)| 1343 | ✅ **保留可点击**,弹表单 |
| **下载手册/PDF/报告 等**(原 catalog_download)| ~30 | ⚠️ **改为不可点击文字** + "· 联系客服" |
| **启动咨询/定制 等**(原 custom_inquiry)| ~16 | ⚠️ **改为不可点击文字** + "· 联系客服" |
| **预约工厂/通话/审核**(原 meeting_booking)| ~10 | ⚠️ **改为不可点击文字** + "· 联系客服" |
| **预约产地参观**(原 origin_tour)| 6 | ⚠️ **改为不可点击文字** + "· 联系客服" |

---

## 🎯 3 项任务完成清单

| # | 任务 | 状态 |
|---|---|---|
| 1 | 删除 chinese-roots 中国地图块 | ✅ |
| 2 | 删除 global-masters 世界地图块 | ✅ |
| 3 | **63 个按钮 → 不可点击文字(保留原文字 + 加"联系客服")** | ✅ |

---

## 任务 3 · C 方案最终实施

### 改动前(W25 第一轮 · 已修正)
- 63 个按钮文字被我硬改为 4 种通用词:"了解详情/商务咨询/商务洽谈/了解原料故事"
- 视觉:不可点击的灰色斜体小字

### 改动后(W25 最终版)
- **文字恢复为原文字**(从 W24 zip 提取)+ **加"· 联系客服"提示**
- HTML 结构:`<span class="cta-as-text">` 包裹双语 span
- **不可点击**(去除 a/button 标签,无 href,无 onclick)

### 实际效果(抽样)

| 位置 | 中文显示 | 英文显示 |
|---|---|---|
| products-staples | 下载产品目录 · 联系客服 | Product Catalog PDF · Contact us |
| products-staples | 定制开发咨询 · 联系客服 | Custom Inquiry · Contact us |
| products-staples | 下载产品手册 · 联系客服 | Catalog PDF · Contact us |
| capabilities-ganzhou | 预约赣州工厂参观 · 联系客服 | Book Ganzhou factory tour · Contact us |
| our-story-yunnan | 预约云南产区参观 · 联系客服 | Book Yunnan field visit · Contact us |

### CSS 样式(继承自 W25 第一轮)
```css
.cta-as-text {
  display: inline-block;
  color: rgba(27,67,50,0.55);
  font-size: 14px;
  font-style: italic;
  font-family: 'Cormorant Garamond', serif;
  padding: 8px 0;
  cursor: default;
  user-select: none;
}
```

---

## ✅ 完整自检

| 项 | 数据 | 状态 |
|---|---|---|
| sample_request CTA(可点击)| 60 | ✅ |
| general_contact CTA(可点击)| 1343 | ✅ |
| cta-as-text span(不可点击)| 63 | ✅ |
| 含"· 联系客服"的 span | 63 | ✅ |
| 旧通用词残留 | 0 | ✅ |
| 404 链接 | 0 | ✅ |
| mega-menu 锚点失效 | 0 | ✅ |
| 中国/世界地图残留 | 0 | ✅ |

---

## 📦 W25 最终版交付

| 文件 | 大小 |
|---|---|
| **Foodvio-website-W25.zip** | **34 MB** |
| **W25-FINAL-REPORT-v3.md** | 本文档(覆盖 v1 A 方案 / v2 C 方案首版)|

---

## 🚀 一键上线

```bash
unzip Foodvio-website-W25.zip -d /tmp/w25
cd /tmp/w25
git add .
git commit -m "W25: 删2地图 + 63按钮转不可点文字(保留原文字+联系客服) · 仅样品+商务联系可点"
git push origin main
```

---

## ✅ 上线后请重点验证

### 1. 可点击按钮(应正常工作)
- 任意页面"申请样品"按钮(60 个)→ 弹出 lead-capture 表单
- 任意页面"商务联系"/"立即洽谈"等(1343 个 general_contact)→ 弹出表单

### 2. 不可点击文字(应是灰色斜体)
- products-staples / products-mains / products-sauces 等页面底部
- 应看到:
  - 灰色斜体 "**下载产品目录 · 联系客服**"
  - 灰色斜体 "**定制开发咨询 · 联系客服**"
  - 灰色斜体 "**下载产品手册 · 联系客服**"
- 点击 → 无反应(因为是 span,不是 a/button)
- hover → 不变色(普通文字)

### 3. 双地图
- chinese-roots 第一屏 → 右侧地图区空白
- global-masters 第一屏 → 右侧地图区空白

### 4. 手机端
- 上述全部生效
- 不可点击文字在小屏上仍可读

---

## ⚠️ 我的失误澄清

**W25 第一轮**(A 方案 → 撤回)我把 63 个按钮文字硬改为 4 种通用词,**这是错的** — 因为:
1. 你的原意是"**保留语境**"(让用户知道原来是申请什么)
2. 我硬改文字丢失了原本"下载产品手册/预约工厂参观"等具体描述

**修正过程**:从 W24 zip(W25 第一轮之前)精确提取 63 个原文字 + 加"联系客服"提示 → 现在完全符合你的需求。

---

## ⏳ 累积 PENDING(8 周)

**强烈建议本次上线 OK 后做知识库 V3 → V3.2 同步**:
- SKU 库 48→44
- 国家 5→6(加 SEA)
- 4 产品规格变更
- 全球采购商命名 + 强制英文切换
- 德式经典香肠品牌
- 表单 phone 必填 + 中英双语
- 删 2 地图
- **63 按钮转不可点击文字 + 联系客服**
- 全站只剩 2 类可点击 CTA

---

**文档版本**:V3.0(最终,C 方案 + 原文字 + 联系客服)
**日期**:2026-05-19
