# Foodvio V6.2 · W26b 报告(careers 页面 4 项修改)

> **日期**:2026-05-19
> **任务**:careers 数据同步 + 薪资改面议 + 简历按钮改 mailto + nav 顺序调换
> **结果**:✅ 全部完成,0 死链

---

## 🎯 4 项任务完成清单

| # | 任务 | 状态 |
|---|---|---|
| 1 | careers 数据带与首页同步(不再造数) | ✅ |
| 2 | 3 岗位薪资全改"面议 / Negotiable" | ✅ |
| 3 | 投递简历 + 发送简历改 mailto 链接 | ✅ |
| 4 | 全站 nav 调换"关于我们" ↔ "加入我们" | ✅ |

---

## 任务 1 · careers 数据带同步

### 改动前(我硬造的错数据)
```
2021 创立年份 / 3 自营工厂 / 100+ 合作客户 / 44 SKU 产品
```

### 改动后(与首页 stat-strip 100% 一致)
```
2021 创立 / 100+ SKUs / 3,000+ 合作伙伴 / 100,000㎡ 自建及托管
```

按你的截图为准(4 个数据,不含 FOB×4 出口港口)。如果想加 FOB 港口告诉我。

---

## 任务 2 · 薪资改"面议"

| 岗位 | 改动前 | 改动后 |
|---|---|---|
| 食品研发专员 | 5-8K | **面议 / Negotiable** |
| 大客户销售代表/经理 | 8-13K | **面议 / Negotiable** |
| 管培生 | 面议 · 有竞争力 / Competitive | **面议 / Negotiable**(简化统一)|

---

## 任务 3 · 简历按钮 → mailto

### 改动前
3 个"投递简历"按钮:`href="#" data-foodvio-cta="general_contact"` → 弹 lead-capture 表单

### 改动后
3 个"投递简历"按钮 + 1 个"发送简历"按钮 → 直接打开邮箱客户端:
```html
<a href="mailto:huahuakefu1@foodvio.com.cn?subject=求职申请 · Job Application" ...>
```

**用户点击** → 直接打开 Mac 邮件 / Gmail 网页版 / 手机邮件 App,**自动填好收件人 + 主题**,用户写正文 + 附简历即可。

### 4 个按钮汇总
| 位置 | 改动后 mailto subject |
|---|---|
| 食品研发专员卡 | 求职申请 · Job Application |
| 大客户销售卡 | 求职申请 · Job Application |
| 管培生卡 | 求职申请 · Job Application |
| 底部"发送简历"按钮 | Careers Inquiry · 求职咨询(本来就是 mailto) |

---

## 任务 4 · 全站 nav 调换"关于我们" ↔ "加入我们"

### 改动前(W26)
```
产品 / 方案 / 品牌故事 / 能力体系 / 行业洞察 / 关于我们 / 加入我们
```

### 改动后(W26b)
```
产品 / 方案 / 品牌故事 / 能力体系 / 行业洞察 / 加入我们 / 关于我们
```

### 影响范围
- **39 个文件桌面 nav** ✓
- **39 个文件移动端 nav-drawer** ✓
- 含 about-v62 / careers-v62 本身的 active class 处理

---

## ✅ 全站完整自检

| 项 | 数据 | 状态 |
|---|---|---|
| careers 数据带与首页一致 | ✓ | ✅ |
| careers '5-8K'/'8-13K' 残留 | 0 | ✅ |
| 3 个 '面议' + 3 个 'Negotiable' | ✓ | ✅ |
| 3 个 '投递简历' mailto | 3 | ✅ |
| 1 个 '发送简历' mailto | 1 | ✅ |
| 投递简历 data-foodvio-cta 残留 | 0 | ✅ |
| 39 文件桌面 nav 调换 | 39 | ✅ |
| 39 文件 nav-drawer 调换 | 39 | ✅ |
| 404 链接 | 0 | ✅ |
| mega-menu 锚点失效 | 0 | ✅ |

---

## 📦 W26b 交付

| 文件 | 大小 |
|---|---|
| **Foodvio-website-W26.zip** | **34 MB** |
| **W26b-REPORT.md** | 本文档 |

---

## 🚀 一键上线

```bash
unzip Foodvio-website-W26.zip -d /tmp/w26
cd /tmp/w26
git add .
git commit -m "W26b: careers数据同步首页+薪资改面议+简历按钮mailto+nav调换关于/加入"
git push origin main
```

---

## ✅ 上线后请重点验证

### 1. careers 数据带
访问 https://jeromechen01.github.io/foodvio-website/careers-v62.html
- 滚到 "Who We Are" section 底部 → 看到 4 个数据:
  - **2021 / 创立**
  - **100+ / SKUs**
  - **3,000+ / 合作伙伴**
  - **100,000㎡ / 自建及托管**

### 2. 3 个岗位薪资
- 食品研发专员 → **面议 / Negotiable**
- 大客户销售 → **面议 / Negotiable**
- 管培生 → **面议 / Negotiable**

### 3. 投递简历按钮(关键)
- 任意岗位卡的"投递简历"按钮 → **点击应打开邮件客户端**
  - 收件人:huahuakefu1@foodvio.com.cn
  - 主题:求职申请 · Job Application
- 底部 CTA 区"发送简历"按钮 → 同上

### 4. 顶部主导航顺序
- 任意页面顶部 nav → 顺序:
  ```
  产品 / 方案 / 品牌故事 / 能力体系 / 行业洞察 / 加入我们 / 关于我们
  ```
- "加入我们"在"关于我们"**左边**(更靠前)

### 5. 移动端汉堡菜单
- 同上,加入我们 在 关于我们 上面

---

## ⏳ 累积 PENDING

W18-W26b 累积变更建议在 git push 后做一次知识库 V3 → V3.2 同步。

---

**文档版本**:V1.0
**日期**:2026-05-19
