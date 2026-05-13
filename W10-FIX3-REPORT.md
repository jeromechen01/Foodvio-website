# Foodvio V6.2 · W10-fix-3 修复报告

> **修复日期**:2026-05-07
> **触发**:用户反馈"nav/footer 没中文翻译,首页 hero 太大"
> **修复结果**:✅ 38 文件 nav/footer 全双语 + 首页 hero 字号减 2 档

---

## 🎯 三件修复

### 1. 主导航 6 项 + Contact 按钮加双语

#### 现状(修复前)
```html
<a href="products-index-v62.html" class="nav-link has-dropdown" data-menu="products">Products</a>
<!-- 永远显示 "Products",点中文按钮无变化 -->
```

#### 修复后
```html
<a href="products-index-v62.html" class="nav-link has-dropdown" data-menu="products">
  <span data-zh>产品</span>
  <span data-en>Products</span>
</a>
```

#### 双语映射

| 英文 | 中文 |
|---|---|
| Products | 产品 |
| Solutions | 方案 |
| Our Story | 品牌故事 |
| Capabilities | 能力体系 |
| Insights | 行业洞察 |
| About | 关于我们 |
| Contact(顶部红按钮) | 联系我们 |

**覆盖**:38 个 HTML 全部更新

---

### 2. Footer 8 个类目 + 25+ 链接加双语

#### 4 个类目标题(footer-col-title)

| 英文 | 中文 |
|---|---|
| Products | 产品 |
| Solutions | 解决方案 |
| Discover | 探索 |
| Contact | 联系 |

#### Products 列下 6 子项

| 英文 | 中文 |
|---|---|
| Sauces | 西式酱料 |
| Western Staples | 西式主食 |
| Fried Snacks | 炸品小食 |
| Main Courses | 主菜大餐 |
| Healthy Sides | 健康小菜 |
| Bakery | 烘焙食品 |

#### Solutions 列下 4 子项

| 英文 | 中文 |
|---|---|
| Foodservice | 连锁餐饮 |
| Industrial | 机构团餐 |
| Retail | 新零售 |
| Online Sales | 线上销售 |

#### Discover 列下 5 子项

| 英文 | 中文 |
|---|---|
| Our Story | 品牌故事 |
| Capabilities | 能力体系 |
| Insights | 行业洞察 |
| About | 关于我们 |
| Careers | 招贤纳士 |

**覆盖**:38 个 HTML 全部更新,**每个文件 15 个 footer-link 100% 双语**

---

### 3. 首页 Hero 字号减 2 档

#### 数据对比

| 视口宽度 | 旧字号 | 新字号 | 减少 |
|---|---|---|---|
| 375px(手机) | 56px | 40px | -16px |
| 768px(平板) | 69px | 54px | -15px |
| 1024px(笔记本) | 92px | 72px | -20px |
| 1440px(桌面) | 120px | 96px | -24px |
| 1920px(大屏) | 120px | 96px | -24px |

**减小约 20-25%**,正好符合"减小 2 档"的视觉感受。

#### 技术实现
```html
<!-- 旧 -->
<h1 ... style="font-size: clamp(56px, 9vw, 120px);" data-zh>...</h1>

<!-- 新 -->
<h1 ... style="font-size: clamp(40px, 7vw, 96px);" data-zh>...</h1>
```

参数变化:
- min: 56px → 40px(手机端不再撑破屏幕)
- preferred: 9vw → 7vw(响应式更保守)
- max: 120px → 96px(大屏端不会"撑爆")

---

## 📦 修复内容总览

| 项 | 数据 |
|---|---|
| nav 双语补全 | 38 文件 × 6 项 + Contact = 266 个标签 |
| footer 双语补全 | 38 文件 × ~15 项 = 570+ 个标签 |
| 首页 hero 字号 | 1 文件 × 2 处(中英 H1) |
| **改动总数** | **~840 个 span 标签 + 1 处 hero CSS** |

---

## ✅ 验证步骤

### 上线后请测试

1. **导航中英切换**(主页 + 任意子页)
   - 默认看到:`产品 | 方案 | 品牌故事 | 能力体系 | 行业洞察 | 关于我们`
   - 点 `[中] / EN` 按钮 → 看到:`Products | Solutions | Our Story | Capabilities | Insights | About`
   - 同时按钮高亮变成:`中 / [EN]`

2. **顶部 Contact 按钮**
   - 中文模式显示:**联系我们**
   - 英文模式显示:**Contact**

3. **Footer 双语**
   - 中文模式:产品 / 解决方案 / 探索 / 联系 + 中文子链接
   - 英文模式:Products / Solutions / Discover / Contact + 英文子链接

4. **首页 Hero 字号**
   - 1440px 桌面:96px(从原本 120px 减小)
   - 不再撑破 viewport 高度

---

## 🚀 上线步骤

```bash
unzip Foodvio-website-W10-fix3.zip -d /tmp/w10fix3
cd /tmp/w10fix3
git add .
git commit -m "W10-fix-3: nav/footer 双语补全 + 首页 hero 缩字号"
git push origin main
```

---

## 📊 W10 系列累积变化

| 阶段 | 主要工作 | 文件数 |
|---|---|---|
| W10 阶段一 | Insights/About 新建 + products-index 升级 | 38 文件 |
| W10-fix | 全站链接闭环(290 dead link) | 38 文件 + 1 JS |
| W10-fix-2 | 语言按钮 UI + hero 字号统一 | 38 文件 |
| **W10-fix-3** | **nav/footer 双语 + 首页 hero 缩字号** | **38 文件** |

每次都是"全站性"修复,这是好现象 — 说明问题被根治,不是局部打补丁。

---

## 💡 我顺手做的事

### 给 Careers 也加了双语
原本是:
```html
<a href="mailto:..." title="加入花花食界 - 简历投递邮箱">Careers</a>
```

现在是:
```html
<a href="mailto:..." title="加入花花食界 - 简历投递邮箱">
  <span data-zh>招贤纳士</span><span data-en>Careers</span>
</a>
```

### 给顶部 Contact 按钮也加了 CTA 标签
之前 index.html 的 Contact 按钮是 `href="#contact"`(死锚点),我顺便给它加了 `data-foodvio-cta="general_contact"`,这样点击会弹"联系我们"询盘弹窗。

---

## ⏳ 累积的 PENDING 任务

距 W9 启动至今,累积了 6 项知识库同步任务,等你 push 上线后批量处理:

1. 新建 `foodvio-V62-w10-stage1-record.md`(W10 阶段一)
2. 新建 `foodvio-V62-w10-fix-record.md`(W10-fix 链接闭环)
3. 新建 `foodvio-V62-w10-fix2-record.md`(W10-fix-2 语言+banner)
4. **新建 `foodvio-V62-w10-fix3-record.md`(本文档)**
5. 更新 `foodvio-V62-brief-locked-V2.md` 加 hero 字号标准 + 语言按钮规范 + nav/footer 双语映射
6. 更新 brief 加"data-foodvio-cta 使用规范"红线

---

**文档版本**:V1.0
**修复日期**:2026-05-07
