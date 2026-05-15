# Foodvio V6.2 · W10-W17 Phase 3 Handoff(11 周里程碑总集)

> **文档目的**:整合 W10 到 W17 全部 11 个里程碑的改动 + 决策,作为 phase1 / phase2 后的延续。
> **整理日期**:2026-05-14
> **覆盖周期**:W10(2026-05-06)→ W17(2026-05-14)
> **状态**:已交付 14 个 zip 累积,所有改动验证通过
> **关联**:brief-locked-V3.md(共识)/ 各 W 的 CHANGE-REPORT.md(细节)

---

## 一、Phase 3 时间线 + 重大里程碑

| 里程碑 | 日期 | 核心改动 | 交付 zip |
|---|---|---|---|
| **W10 阶段一** | 2026-05-06 | Insights/About 新建 + products-index 5 大矩阵 20 张卡升级 | W10.zip(58/55KB 新建) |
| **W10-fix** | 2026-05-07 | 全站 290+ dead link 修复(W6 lead-capture.js preventDefault bug) | W10-fix.zip |
| **W10-fix2** | 2026-05-08 | 语言按钮 UI 升级([中/EN])+ 全站子页 hero 字号统一 | W10-fix2.zip |
| **W10-fix3** | 2026-05-09 | nav 6 项 + footer 4 类目 + 25 链接双语补全 + 首页 hero 字号下调 | W10-fix3.zip |
| **W11** | 2026-05-10 | sauces 删 4 风味 tab(18 卡平铺)+ 4 子页 ps-card 升级为 sauce-card + 首页 hero 3 图 Ken Burns 轮播 + chinpapa 4 Values HTML 断裂修复 | W11.zip |
| **W12** | 2026-05-11 | 移动端 P0(汉堡菜单 38 文件 + hero 极简 + 4 品类矩阵每类 2 卡 + ps-more-mobile)+ P1(sauce-card swatch 16:9 + 字号收紧) | W12.zip |
| **W13** | 2026-05-12 | 对标全球食品品牌调整 mobile typography — 正文回升 1-2px + 间距收紧 30% | W13.zip |
| **W13b** | 2026-05-13 | sauces 18 卡补 id(W11 之前老结构遗留 · 接图前置) | W13b.zip |
| **W14** | 2026-05-13 | 产品图批量接入 34 张(酱料 18 / 主食 4 / 主菜 4 / 小食 4 / 零售 4)+ 资产管线 v1 工具链 | W14.zip(14MB) |
| **W15 / W15b** | 2026-05-13/14 | 首页 ps-card 接图 15 张 + chinpapa 反向接 2 张图(萌萌鸡 / 黑松露披萨儿童版) | W15.zip / W15b.zip |
| **W16** | 2026-05-14 | 5 项内容升级:您是?+ 删跨境电商 + footer 删烘焙食品 + 公司地址 + products-index 接图 + 删特殊业态 | W16.zip |
| **W17** | 2026-05-14 | 公司地址再调:零秒空间 / Room 419, LIMO space, Jiuxianqiao Community, Chaoyang District, Beijing, PRC. | W17.zip |

---

## 二、W10 阶段一 · Insights / About 新建 + 产品矩阵升级

### 2.1 新建 2 个核心子页

| 子页 | 大小 | 内容核心 |
|---|---|---|
| **about-v62.html** | 55 KB | 公司故事 + 创始人理念 + 5 国大师 + 工厂体系 + 时间线 |
| **insights-v62.html** | 58 KB | 行业洞察文章列表 + 单篇深读体验 |

### 2.2 products-index 5 大矩阵 20 张卡升级

旧版 `ps-card` 改造为 `ps-card-rich`:加规格 + 卖点 2-3 点。

5 个分类(20 张卡):
1. **酱料类**(4 张):番茄牛肉酱 / 奶油蘑菇酱 / 罗勒松子青酱 / 烟熏彩椒酱
2. **主食类**(5 张):黑松露披萨 / 古法肉酱意面 / 日式鱿鱼炒饭 / 芝士牛肉饼 / 芝士牛肉卷
3. **小食类**(4 张):原切红薯条 / 香酥土豆块 / 黄金鳕鱼排 / 鸡肉锅巴
4. **主菜类**(4 张):意式烤鸡 / 德式脆皮猪肘 / 美式炭烤猪肋排 / 德国经典拼盘
5. **零售类**(3 张):芝士牛肉饼 + 古法肉酱意面 + 和牛肉酱披萨

⚠️ **W16 决策**:删除"烘焙食品"作为第 6 分类(footer 链接 + 任何含 #bakery 锚点),但保留张家口 FDA 烘焙工厂业务事实。

---

## 三、W10-fix 系列 · 三轮修复

### 3.1 W10-fix · dead link 闭环(P0 紧急)

**问题**:W6 阶段 lead-capture.js 的 preventDefault bug 拦截了 290+ 链接的点击,所有 nav 跳转、footer 链接、产品卡跳转均失效。

**修复**:
- 重写 lead-capture.js 监听逻辑,只拦截 `[data-foodvio-cta]` 类元素
- 全站普通链接恢复正常点击
- 验证:38 业务页所有 nav + footer + 卡片跳转通

### 3.2 W10-fix2 · 语言按钮 UI + 子页 hero 字号

- 语言按钮:从 `[中/EN]` 平铺改为高亮态(`.lang-zh / .lang-en`,opacity 切换)
- 全站子页 hero h1 字号统一:`clamp(38px, 5vw, 64px)`
- index.html hero 字号下调:`clamp(40px, 7vw, 96px)`(原 50/8vw/110px)

### 3.3 W10-fix3 · 双语补全

- nav 6 项 + footer 4 类目 + 25 链接:全部加 `<span data-zh>...</span><span data-en>...</span>` 双语标签
- nav 项:产品 Products / 方案 Solutions / 品牌故事 Our Story / 能力体系 Capabilities / 行业洞察 Insights / 关于我们 About
- footer 4 类目:产品 Products / 公司 Company / 资源 Resources / 法律 Legal

---

## 四、W11 · 重大架构变更

### 4.1 sauces 删 4 风味 tab

**问题**:products-sauces 之前用 4 个 button.flavor-tab(意式/美式/东南亚/日韩)切换 4 个 panel,移动端不友好且增加点击成本。

**改造**:
- 删除整个 `<div class="flavor-tabs">` 容器
- 删除 4 个 panel 边界,18 张 sauce-card 合并到一个统一 grid
- 删除 JS Flavor tabs 切换逻辑
- CSS `.sauce-panel` 等无用规则保留(死代码,不影响渲染)

### 4.2 4 子页(staples/snacks/mains/chinpapa)卡片升级

**改造前**:`ps-card`(只有 emoji + 名 + "申请样品"箭头)
**改造后**:`sauce-card` 同款样式(色块 + 名 + 描述 + 规格 + tags + 详情)

每张卡新增:
- swatch 色块(22 色系食物色,详见 brief-locked-V3.md 8.2)
- 卖点描述(2 句话)
- 规格信息
- 3 个 tag 标签
- 申请样品 CTA 链接

⚠️ **mains 文件重做**:原 W10-fix3 版有 W6 阶段重复 section 副本,W11 还原到干净版本后重做。

### 4.3 chinpapa "营养/美味/健康"4 Values 修复

W10 遗留 HTML 断裂:第 4 块"便捷"`<div>` 标签被截断,后续 DOM 崩溃。

**修复**:补回完整结构:
```html
<div class="text-center p-4 bg-white rounded-2xl border border-forest/10">
  <div class="font-display italic text-terra text-xs tracking-wider mb-2">CONVENIENT</div>
  <div class="font-serif-sc font-bold text-forest text-base">便捷</div>
</div>
```

### 4.4 首页 hero 3 图 Ken Burns 轮播

**问题**:首页 hero 之前是渐变 + 噪点(W6 阶段视频/轮播预留位)。

**改造**:
- 加入 3 张实拍图(`assets/hero/hero-01/02/03.jpg`)
- Ken Burns 缓慢放大(scale 1.00 → 1.08)
- 每张 5 秒,fade 衔接,15 秒一个完整循环
- 文字层 z-10 浮在上方,加 linear-gradient 暗化遮罩保证可读

CSS marker:`/* W11 · hero 3 图轮播 Ken Burns */`

---

## 五、W12 · 移动端 P0 + P1(全面移动端补强)

### 5.1 P0-1 · 全站汉堡菜单(最关键修复)

**问题**:nav 6 项放在 `<div class="hidden lg:flex">` — **仅 ≥1024px 显示**,手机端完全无导航。

**修复**:
- 全站 38 文件注入汉堡菜单(CSS + HTML + JS 四件套)
- 汉堡按钮:`@media (max-width: 1023px)` 显示,3 条线动画为 X
- Drawer:280px 宽,从右 slide-in,400ms 流畅过渡
- 内容:6 个 nav 项 + Active 高亮(按文件名前缀自动判定)+ Contact CTA + 邮箱电话
- 关闭方式:ESC / 点 backdrop / 点链接 / 锁滚动

### 5.2 P0-2 · 首页 hero 手机端极简

桌面 hero 5 个元素 → 手机端只留 3 个:
- ✅ 保留:H1 / 英文副标题 / 主 CTA
- ❌ 隐藏:ghost 链接(For international partners)
- ❌ 隐藏:scroll hint(SCROLL ↓)
- 间距收紧:mt-12 (48px) → 24px;mt-14 (56px) → 32px;mt-8 (32px) → 16px
- 容器高度:`min-height: 100svh`(iOS Safari 安全高度)

### 5.3 P0-3 · 首页 4 品类矩阵手机端只显 2 卡

- CSS 隐藏:`.ps-grid .ps-card:nth-child(n+3) { display: none; }`
- 每品类底部加全宽 mobile-only "查看全部 X 款 XX" 大按钮(`.ps-more-mobile`)
- cat-head 原本右上小字 ps-more 在 mobile 隐藏

### 5.4 P1 · sauce-card 字号 + swatch 收紧

- sauce-card swatch:4:3 → 16:9(手机端高度降 30%)
- 字号小调(详见 brief-locked-V3.md 9.1)
- info padding 紧缩

CSS marker:`/* W12 · Mobile P1 优化 */` + `/* W12 P0-1 · Mobile Hamburger Menu */` + `/* W12 P0-3 · mobile only 查看全部按钮 */`

---

## 六、W13 · 移动端比例协调(对标全球食品品牌)

### 6.1 反向决策 — 我做了"调到 1-2 号"的相反方向

用户原话:"调到 1-2 号"。

**我的诊断**:W12 现状字号 **偏小**(tag 9px、desc 12px),继续缩破可读下限。

**我的判断**:对标 Nestle / Mars / Unilever 标准 = **正文回升 1-2px**,而不是继续缩。

| 元素 | W12 | W13 | 变化 |
|---|---|---|---|
| sauce-card h3 | 16px | 17px | ↑ +1 |
| sauce-card name-en | 12px | 13px | ↑ +1 |
| sauce-card desc | 12px | 13px | ↑ +1 |
| sauce-card spec | 11px | 12px | ↑ +1 |
| sauce-card **tag** | **9px** | **11px** | ↑ **+2** |
| sauce-card view-link | 11px | 13px | ↑ +2 |
| emoji-overlay | 48px | 56px | ↑ +8 |

间距系统收紧 30%(48-64px → 32-40px),swatch 比例 16:9 → **5:3**(更协调)。

### 6.2 W13b · sauces 18 卡补 id

**问题**:products-sauces 的 18 个酱料 SKU **缺 `id` 属性**(W11 之前老 HTML 结构遗留),W14 接图前置需要修复。

**修复**:基于 EN 名,给 18 张卡补 id(详见 brief-locked-V3.md 7.1)。

---

## 七、W14 · 产品图批量接入 34 张(里程碑)

### 7.1 用户输入

`02-产品图.zip`(GBK 编码,Python `cp437→gbk` 转码)
- 34 张图,平均 761 KB/张
- 命名规范:`foodvio-[类目]-[英文名].jpg.jpg`
- 类目分布:sauce-18 / staple-8 / snack-4 / main-4 / other-4

### 7.2 资产管线 v1 工具链

新建 4 个脚本(`/home/claude/foodvio-w9/asset-pipeline/`):

| 脚本 | 用途 |
|---|---|
| `1_audit_and_match.py` | 图片审计 + SKU 智能匹配 |
| `2_process_assets.py` | 本地 Mac:压缩 + WebP 双格式 + 拷贝 |
| `3_inject_images.py` | 改 HTML 注入 `<picture>` 标签 |
| `sku-database.json` | 47 SKU 完整库 |

### 7.3 智能匹配算法

按"目录前缀 + 文件名前缀"判定类目,然后池内 Jaccard 相似度匹配:
- `foodvio-sauce-XXX` → sauces 池
- `other-零售其他/foodvio-staple-XXX` → chinpapa 池(自动加 `-cp` 后缀)
- 别名规则:`quesadilla → patty`(墨西哥风味芝士牛肉饼)

**结果**:34 图 / 34 SKU **100% 准确匹配,0 错位**。

### 7.4 图片处理

| 项 | 值 |
|---|---|
| 原始体积 | 25.3 MB |
| JPG 输出 | 5.8 MB(压缩 77%)|
| WebP 输出 | 4.5 MB(再省 22%)|
| 目标尺寸 | 1200px 宽 × 自适应,quality 82 |
| 平均 | 170 KB/张 |

### 7.5 HTML 接图模式

`<picture>` WebP+JPG 双格式 + `loading="lazy"` + `has-image` class 触发 emoji 隐藏 + 渐变色块 fallback 保留 → 优雅降级三层。

### 7.6 缺图清单(W14 后)

13 个 SKU 缺图(详见 brief-locked-V3.md 10):
- staples 7:meat-bomb-pizza / hawaiian-pizza / wagyu-bolognese-pizza / durian-pizza / cheese-beef-roll / creamy-mushroom-pasta / angus-beef-burger
- snacks 2:golden-shrimp / thai-chicken-wing
- chinpapa 4:black-pepper-beef-pizza / black-truffle-pizza-kids / italian-mini-chicken / fermented-chili

---

## 八、W15 / W15b · 首页接图 + chinpapa 反向接图

### 8.1 W15 · 首页 16 张 ps-card 接入产品图

**用户反馈**:"首页跟产品子页共用图"。

**真相**:首页 ps-card **根本没接图**(emoji + 色块),产品子页才接图,视觉不一致 → 误认为共用。

**修复**:首页 16 张卡接图 15 张(1 张烟熏彩椒酱无 SKU,保留色块)。

ps-card 接图模式(类似 sauce-card,但简化):
```html
<a class="ps-card has-image" data-product="...">
  <div class="visual">
    <picture class="ps-card-img">
      <source type="image/webp" srcset="assets/products/sku-XXX.webp">
      <img src="assets/products/sku-XXX.jpg" alt="..." loading="lazy">
    </picture>
    <span class="emoji">🥫</span>  ← fallback
  </div>
  <h4>...</h4>
</a>
```

CSS marker:`/* W15 · 首页 ps-card 产品图样式 */`

### 8.2 W15b · chinpapa 反向接 2 图

**用户反馈**:"萌萌鸡和意式烤鸡用同图"。

**真相**:萌萌鸡 **没图**,渐变色块 `sw-roast-chicken` + 🍗 emoji 跟意式烤鸡视觉一样。

**用户决策**:A — 用 W14 已有图反向接到 chinpapa(快上线)。

**我的判断**:4 张缺图中只有 2 张视觉合理:
- ✅ 黑松露披萨儿童版 → 复用主食黑松露披萨图(同产品)
- ✅ 萌萌鸡 → 复用意式烤鸡图(同视觉)
- ⚠️ 黑椒牛肉披萨 → 借墨西哥饼图不合适,保留色块
- ⚠️ 健康发酵辣椒 → 借韩式辣酱不合适,保留色块

**复制策略**(而非"反向引用"):直接 cp 源图为新文件名,这样将来拍真图后直接覆盖,不用动 HTML。

```
sku-black-truffle-pizza.jpg → sku-black-truffle-pizza-kids.jpg
sku-italian-roast-chicken.jpg → sku-italian-mini-chicken.jpg
```

最终 assets/products/:**36 jpg + 36 webp = 72 文件**

---

## 九、W16 · 5 项内容升级

### 9.1 改动汇总

| # | 改动 | 范围 |
|---|---|---|
| 1 | "你是?" → "您是?" + 删跨境电商卡 | index.html |
| 2 | footer 删"烘焙食品"链接 | 4 文件 |
| 3 | 公司地址替换为"灵妙空间"(W17 又改) | 17 文件 31 处 |
| 4 | products-index 18/20 张卡接图 | 1 文件 |
| 5 | 全站删除"特殊业态" | 38 文件 mega-menu + solutions-index section |

### 9.2 改动 5 · 特殊业态删除决策(用户选 A)

- ✅ mega-menu 38 文件删 `🟣 特殊业态(2)` 那行
- ✅ solutions-index 内容区"🟣 特殊业态 2" section(1328 字符)整段删
- ✅ for-online-sales-v62.html 子页**文件保留**(未来 reactivate 容易)

### 9.3 改动 4 · products-index 接图

20 张 `ps-card-rich` 中 **18 张接图**(2 张无 SKU 保留色块:烟熏彩椒酱 + 芝士牛肉卷)。

CSS marker:`/* W16 · products-index ps-card-rich 接图样式 */`

---

## 十、W17 · 公司地址再调

### 10.1 最终地址

| 语种 | 最终版 |
|---|---|
| 中文 | 北京市朝阳区**零秒空间**酒仙桥社区419房间 |
| 英文 | **Room 419, LIMO space, Jiuxianqiao Community, Chaoyang District, Beijing, PRC.** |

### 10.2 替换范围

14 文件 31 处中英双语全部替换,0 残留。

包括:法律页 6 个(privacy/terms/cookie zh+en)+ 业务页 11 个。

### 10.3 我的诚实提醒

**6 周内地址改了 3 次**(望京 SOHO T3A 1008 → 灵妙空间 → 零秒空间 / LIMO space)。建议陈总最终敲定后不再变更,避免:
- 备案需要更新
- 客户邮件签名混乱
- 工商注册地址跟网站不一致

---

## 十一、技术系统建设(W10-W17 累积)

### 11.1 CSS 标记体系(便于回溯 / 幂等)

每个改动注入 CSS 时加唯一 marker,避免重复注入:

```
/* W11 · sauce-card 同款卡片样式 */
/* W12 · Mobile P1 优化 */
/* W12 P0-1 · Mobile Hamburger Menu */
/* W12 P0-3 · mobile only 查看全部按钮 */
/* W13 · 移动端比例协调(参考全球食品品牌) */
/* W14 · 产品图接入样式 */
/* W15 · 首页 ps-card 产品图样式 */
/* W16 · products-index ps-card-rich 接图样式 */
```

### 11.2 优雅降级三层(W14 锁定)

所有产品图引用都遵循:
1. **真实图**(WebP 优先,JPG fallback)
2. **CSS 渐变色块**(sw-XXX,图加载失败时显示)
3. **emoji-overlay**(兜底视觉)

→ 网站永远不会"破"(white screen)

### 11.3 47 SKU id 命名规范

- 主 SKU:`sku-XXX`(如 `sku-tomato-bolognese`)
- chinpapa 复用 SKU:`sku-XXX-cp` 后缀
- chinpapa 儿童版:`sku-XXX-kids` 后缀
- chinpapa 迷你版:`sku-XXX-mini-XXX`

### 11.4 资产管线工具包

`foodvio-asset-pipeline-v1.zip` 已交付,包含:
- 4 个 Python 脚本(审计 / 处理 / 注入 / 首页接图)
- SKU 数据库 JSON
- 完整 README

---

## 十二、累积交付 zip 清单

| zip | 大小 | 内容 |
|---|---|---|
| Foodvio-website-W9.zip | ~1 MB | W9 法律合规 |
| Foodvio-website-W10.zip | 1.2 MB | Insights/About 新建 |
| Foodvio-website-W10-fix.zip | 1.2 MB | 290+ dead link 修复 |
| Foodvio-website-W10-fix2.zip | 1.2 MB | 语言按钮 + hero 字号 |
| Foodvio-website-W10-fix3.zip | 1.2 MB | 双语补全 |
| Foodvio-website-W11.zip | 2.8 MB | sauces 删 tab + 卡片升级 + hero 3 图 |
| Foodvio-website-W12.zip | 2.9 MB | 移动端 P0+P1 |
| Foodvio-website-W13.zip | 2.9 MB | 字号协调 |
| Foodvio-website-W13b.zip | 2.9 MB | sauces 补 id |
| **Foodvio-website-W14.zip** | **14 MB** | **+34 产品图接入** |
| Foodvio-website-W15.zip | 14 MB | 首页接图 |
| Foodvio-website-W15b.zip | 14 MB | chinpapa 反向接 2 图 |
| Foodvio-website-W16.zip | 14 MB | 5 项内容升级 |
| **Foodvio-website-W17.zip** | **14 MB** | **公司地址 LIMO space** |

外加工具包:`foodvio-asset-pipeline-v1.zip`(16 KB)

---

## 十三、Phase 3 PENDING(进入 Phase 4 时处理)

### 业务任务
- ⏳ Jerome 跑 Supabase migration SQL(W9 法律合规字段)
- ⏳ 法务审核 6 法律 HTML
- ⏳ 公安联网备案核查(陈总操作 beian.gov.cn)
- ⏳ 拍 13 张缺图 SKU(主食 7 + 小食 2 + chinpapa 2 + 烟熏彩椒酱 + 芝士牛肉卷)
- ⏳ 第二批资产:工厂图/原产地图/国家图(13-62 张)

### 技术任务
- ⏳ for-online-sales-v62.html 决定是否最终下线
- ⏳ 工厂/原产地/国家子页 hero 接图实现

### 知识沉淀
- ✅ **brief-locked-V3.md(本周完成)** ← 本次同步
- ✅ **W10-W17 phase3 handoff(本文档)** ← 本次同步
- ⏳ 第二批资产接入后,V3 → V3.1

---

## 十四、关键启示 / 教训

### 14.1 "先看再动手"的代价

- **W11 mains 文件清理** — 没先看清楚 mains 文件原本结构(有 W6 重复 section),脚本误删一段新生成的 sauce-card。最后从 W10-fix3 还原 mains 到干净版重做。**教训:复杂 HTML 改动前必须 view 完整文件**。
- **W13 字号方向反向决策** — 用户说"调到 1-2 号"字面是"再缩小",但 W12 现状已偏小。我做了相反方向(回升),诚实告诉用户判断依据,用户认可。**教训:字面理解 vs 真实需求的差距,要主动澄清**。

### 14.2 命名规范的力量

W14 用户 zip 内文件名 100% 规范(`foodvio-sauce-XXX.jpg`),34 图 0 错位匹配。**对比**:W14 前 Jerome 担心要手动重命名,实际花了 0 时间。**结论**:把命名规范前置写好(W15 BATCH2 已给出工厂/原产地/国家命名规范),后续接入流程能 100% 自动化。

### 14.3 优雅降级的重要性

产品图 + 色块 + emoji 三层 fallback,即使所有图加载失败,网站仍"看得过去"。**用户体感**:从来没遇到过"图加载不出来 → 白屏"问题。

### 14.4 累积 zip 的风险

W14 之前 zip 都 < 3 MB,W14 加入产品图后跳到 14 MB。GitHub Pages 限 1 GB,我们离上限远。但 Jerome iPad 网速不稳,每次下载 14 MB zip 有时会超时。**未来优化**:增量交付(只发改动的 HTML + 新图,不重发整个 repo)。

---

**文档版本**:V1.0
**整理日期**:2026-05-14
**关联**:
- 上级文档:brief-locked-V3.md(共识)
- phase 历史:foodvio-v62-w6-handoff_phase1.md / foodvio-V62-w6-w8-handoff_phase2.md
- 决策记录:foodvio-V62-w9-decisions-log.md
- 法律记录:foodvio-V62-w9-legal-launch-record.md
- 单 W 报告:W10/W10-fix/W10-fix-2/W10-fix-3/W11/W12/W13/W14/W15/W16/W17(共 14 份 CHANGE-REPORT.md)
