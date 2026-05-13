# Foodvio 花花食界 V6.2 项目纪要

> **覆盖范围**:W6 Phase 1 → W8 Phase 9 完整工作
> **生成日期**:2026-05-02
> **项目**:北京花花食界食品科技有限公司官网(B2B)+ 华仔爸爸窗口页雏形(B2C)
> **协作模式**:Jerome(首尔) ↔ Claude vibe code,GitHub Pages 部署

---

## 一、项目背景与定位

### 公司基本信息(brief 锁定 · 不可变)

- **法人**:北京花花食界食品科技有限公司 / Beijing Foodvio Food Technology Co., Ltd.
- **创立**:2021 年 8 月,北京
- **定位**:国内领先的专业西餐餐饮服务商
- **产品理念**:"还原世界味道,享受美食乐趣"
- **创始团队**:原国内食品上市公司总裁及核心成员

### 双品牌结构

| 品牌 | 类型 | 定位 | 站点状态 |
|---|---|---|---|
| **Foodvio 花花食界** | B2B | 西餐食品供应链 | ✅ 主站(本项目) |
| **华仔爸爸 ChinnPaPa** | B2C | 中国儿童健康营养早餐品牌 | 🟡 主站内有窗口页 + 未来独立站 |

### 规模事实(brief 锁定)

- **100+ SKUs / 3,000+ 客户 / 近 10 万平米自建及托管厂房 / 3 工厂**
- **3 自营工厂**:
  - 江西赣州(主力,6.66 万㎡,**HACCP / ISO 22000 / BSCI**,无 US FDA)
  - 河北张家口(1.6 万㎡,US FDA 注册,30+ 烘焙品类)
  - 北京怀柔(本地化产能,研发与试产一体化)
- **认证组合**:HACCP / ISO 22000 / BSCI / US FDA(张家口持有) / 8 大类 SC
- **出口 4 港口**:天津 / 青岛 / 上海 / 深圳

### 品牌资产(锁定不可变)

| 项 | 内容 |
|---|---|
| Slogan CN | 花花食界 - 源自中国的专业西餐食品品牌 |
| Slogan EN | Foodvio - Western Cuisine. Chinese Roots. Global Palate. |
| 主色 | ink #0d2a1f / forest #1B4332 / terra #E07A5F / rust #C73E3A / gold #F5C82E |
| 辅色 | sage #81B29A / sky #4A90E2 / steel #4A6271 / cream #F5F1EA / paper #FAF7F0 |
| 字体 | Cormorant Garamond(意大利体) / Inter / Noto Sans SC / Noto Serif SC |

### 5 大原料 + 5 国大师叙事(锁定)

**5 大原料产地**:
- 🌶️ 江西赣南螺丝椒
- 🍅🌾 新疆 · 番茄 + 面粉
- 🐑 内蒙古 · 牛羊肉
- 🌾 黑龙江 · 五常大米
- 🍄🌿 云南 · 松露 + 迷迭香

**5 国大师**:🇮🇹 意大利 · 🇪🇸 西班牙 · 🇰🇷 韩国 · 🇯🇵 日本 · 🇲🇽 墨西哥
*(brief 里"德/东南亚"是未来计划,本项目不展示)*

### 6 国全球海洋蛋白进口

🇳🇴 挪威 / 🇩🇰 丹麦 / 🇷🇺 俄罗斯 / 🇺🇸 美国 / 🇦🇺 澳大利亚 / 🇨🇱 智利

---

## 二、已确定的决策(按时间顺序)

### W6 Phase 1-5 核心决策

| Phase | 决策 | 内容 |
|---|---|---|
| Phase 1 | 旧术语清理 | 8 大产地→**5 大原料** / 6 国大师→**5 国大师** / 4 大洞察→**5 大洞察** |
| Phase 2 | 子页扩展 | 创建 5 原料 × 5 国子页(共 10 个三级页) |
| Phase 3 | 公司介绍 PPT 入站 | light-kitchen 重写 7 章节 / supply-chain 加 Global Sourcing + Domestic Network |
| Phase 4 | 全站链接修复 | M1-M6 = mega 5+5 统一 / 372 处 dead link 路由 / CTA 合规 |
| Phase 5 任务 1 | 河北酱料厂 → 赣州 | brief 锁定为赣州主力工厂 |
| Phase 5 100,000㎡ 口径 | "近 10 万平米自建及托管厂房" | 全站 11 处统一变更口径(从"自营"改"自建及托管") |
| Phase 5 BRC A | **不加** | brief 没列,公司实际不一定有 |
| Phase 5 赣州 US FDA | **不加** | brief 写 FDA 是张家口持有 |

### W7 视觉/结构改造决策

| 决策项 | 选项 | 说明 |
|---|---|---|
| **R1 logo 替换** | 全站 nav + footer 替换为"花花食界 / FOODVIO"上下排列(CSS 排版) | 中文 letter-spacing .08em / 英文 letter-spacing .46em / padding-right 对齐 |
| **R2-A 产品瀑布** | 主页 Hero 后加 4 分类 × 4 SKU 网格 | 仅主页加,其他页不加 |
| **R2-B 电商系统** | ❌ **否决** | 守 B2B 品牌定位,商业电商等 ChinnPaPa B2C 站点 |
| **R2-A 产品卡点击** | → 产品类目子页 + sample_request CTA | 现阶段先跳类目,W8 升级到深锚点 |
| **R3 全站间距** | py-12 md:py-16(48-64px) | 类 Apple 网站节奏,hero 保留 py-24 md:py-36 |
| **R5 标题统一** | clamp(24px, 3vw, 36px) | 跟产品矩阵分类标题一致 |
| **删 hero-mark 大 logo** | ✅ | 跟 nav 上 brand-logo 视觉重叠的根源 |
| **nav 链接全跳子页** | Products/Solutions/Our Story/Capabilities → 子页;Insights/About 保留 # | brief P5/P6 才做 |
| **mega-menu 跨页一致性** | 用 index.html 作权威模板推送 | 4 个 mega 在 32 文件字节级一致 |

### W8 产品部分决策

| 决策项 | 选项 | 说明 |
|---|---|---|
| **mega-products 5 列横排** | 🥫西式酱料 / 🍕西式主食 / 🍟炸品小食 / 🍖主菜大餐 / 👶华仔爸爸 | 删原 mega 的 By Brand / Featured / Quick Access 冗余 |
| **西式主食三级页 SKU** | 11 个全做 | 黑松露/肉食炸弹/夏威夷/和牛肉酱/榴莲披萨 + 芝士牛肉饼/卷 + 古法肉酱意面 + 奶油蘑菇意面 + 日式鱿鱼炒饭 + 安格斯牛肉汉堡 |
| **炸品小食三级页 SKU** | 6 个 | 原切红薯条/香酥土豆块/黄金鳕鱼排/黄金凤尾虾/泰式香茅鸡翅根/鸡肉锅巴 |
| **主菜大餐三级页 SKU** | 4 个 | 意式烤鸡/德式脆皮猪肘/美式炭烤猪肋排/德国经典拼盘 |
| **华仔爸爸窗口页** | ✅ 本轮做骨架版 | 后续 B2C 独立站还会做,需要先有这个窗口 |
| **华仔爸爸 8 SKU** | "肋骨"→美式炭烤猪肋排 / "干呀"→古法肉酱意面 | OCR 错误,从上下文推断 |
| **华仔爸爸 5 大分类** | 披萨 / 主菜 / 意面炒饭 / 烤鸡 / 健康小菜 | "健康发酵辣椒"是健康小菜代表 |
| **产品页 SKU 卡点击** | → 对应类目页深锚点(#sku-xxx) | 替换 sample_request CTA |
| **后台数据库方案** | A1 极简版 | 写 JSON schema + 使用文档,前端不动(推荐) |
| **products-index 改造** | 5 大分类各 4 SKU + 各"查看全部"按钮 | 主页 + 子页一致 |

### CTA 体系(锁定 6 种合法值)

| CTA | 用途 |
|---|---|
| `sample_request` | 申请样品 / 样品组合 |
| `catalog_download` | 下载产品手册 / 出口能力书 / Catalog PDF |
| `custom_inquiry` | 定制开发 / 菜单咨询 / RFP |
| `meeting_booking` | 预约通话 / 预约工厂参观 / 审核 |
| `origin_tour` | 原料产区参观 / Field visit |
| `general_contact` | 兜底 / 看更多 / 全览 |

⚠️ `other_countries` 是**非法值**,Phase 4 全部改为 `general_contact`。

---

## 三、待解决的问题

### 🔴 高优先级(下一轮必做)

1. **华仔爸爸完整产品手册**
   - 现状只收到 2 张图(品牌故事 + 美式/意式披萨页)
   - 缺其他 7 类产品资料(主菜/意面炒饭/烤鸡/健康小菜的卖点/规格/工艺)
   - chinpapa 页现有 8 SKU 中只有 3 个有真实卖点(黑椒牛肉披萨 / 和牛肉酱披萨 / 健康发酵辣椒)+ 5 个 placeholder
   - **下一轮你传完整手册 → 我补内容**

2. **25 个 draft SKU 的真实文案**
   - 西式主食 11 个 / 炸品小食 6 个 / 主菜大餐 4 个 / 华仔爸爸 4 个 = 25 个全 placeholder
   - 缺:卖点 / 工艺 / 规格 / MOQ / 适用场景
   - **你提供 → 我接到三级页 + JSON**

3. **33 张产品照片**(设计审稿报告 Top 1 致命短板)
   - 全站现状 0 真实图片 / 928 emoji 占位
   - 优先级:16 SKU 各 1 张 + 3 工厂各 3 张 + 5 原料各 2 张 = 共 35 张
   - 这是整站从 78→88 分的唯一杠杆

### 🟠 中优先级

4. **华仔爸爸品牌专属视觉**
   - 现在只有"营养/美味/健康/便捷"4 个 value tag
   - 缺专属配色 / 品牌元素 / 卡通形象 / 定向移动端样式

5. **JSON A1 → A2 升级**
   - A1 已完成(schema + 文档,前端不动)
   - A2 = 写 JS 脚本读 JSON 渲染前端,改 JSON 即生效
   - 建议先把 SKU 内容补完再做 A2,否则要改两次

6. **信任锚点缺失**(设计审稿 Top 2)
   - 0 张真实客户 logo
   - 0 个真实客户名(brief 锁定 3,000+ 客户没有证据)
   - 没有创始人 / 团队照片
   - 没有营业执照展示

### 🟡 低优先级

7. **Insights / About 子页**(brief 写"P5/P6 才做")
   - 现状 nav 这两项保留 `#` 占位
   - Insights 文章卡也是 dead link

8. **products-index 章节锚点**
   - `products-index-v62.html#staples` 等锚点不存在
   - 跳过去会停页顶 fallback(功能可用,体验不完美)

9. **移动端深度断点**
   - 1120 处 md: 断点 + 62 处 lg: + 0 处 sm: 断点
   - iPhone SE(375px)和 iPad mini(768px)用同一套布局
   - 需真机测试 + 加 sm: 断点

10. **5 国大师跟产品矩阵脱节**(设计审稿 Top 4)
    - 5 国子页底部应加"该国大师做的产品"模块
    - 例:意大利大师 → 番茄牛肉酱 / 罗勒松子青酱 / 古法肉酱意面

---

## 四、关键讨论点

### 重要的边界守护

1. **0 推测数据红线**(brief 锁定)
   - 不写员工数 / 产线条数 / 慢炖时长 / 打样周期等
   - 跟 RATIONAL 一致(事实导向)
   - 多次轮次中严格执行,让站点叙事不浮夸

2. **0 禁词红线**
   - 预制菜 / 半成品 / 西餐发源地 / 江西辣椒 / 30 天打样 / 商超自有品牌 / 麦肯薯角 / 麻辣牛肉 / 即食鸡丝
   - 全站 0 命中

3. **B2B 定位守护**
   - 否决 R2-B 电商系统(购物车/微信支付)
   - 华仔爸爸 B2C 走未来独立站,主站只做品牌窗口

4. **vibe code 协作模式**
   - Jerome 提需求 → Claude 改文件 → Jerome 集成 zip
   - 极度依赖"基准 zip 一致性"
   - 多次出现"传给 Claude 的 zip 不是上轮交付版本"问题

### 多轮反复出现的问题

1. **mega-menu 跨页一致性 bug**
   - Phase 4 时只统一了 mega-story
   - W7 修订 4 时发现 mega-products / mega-solutions / mega-capabilities **5 个版本不一致**
   - 用 index.html 作权威模板推送解决

2. **logo 替换不彻底**
   - W7 第 1 轮:32/32 文件 nav + footer 应替换,但 4 个 capabilities 文件用单行格式没匹配上
   - 后续多次补丁修复

3. **padding 反向 bug**
   - 多次累加修改导致 7 处 `py-20 md:py-16` 反向(本应 md 比 mobile 大)

4. **SKU 清单错乱 / OCR 错误**
   - 华仔爸爸"肋骨""干呀"是 OCR 错误
   - 主页 mega 第 5 列(品类速览 4 个)≠ 详情页 8 SKU(实际产品)
   - 多次清单不一致需要澄清

### 设计审稿核心结论

**综合评分:B+ (78/100)**

| 维度 | 评分 | 评语 |
|---|---|---|
| 品牌叙事 | A- (88) | 5+5+5 结构 + 5 大洞察,密度跟 Eataly 同档 |
| 信息架构 | B+ (82) | 32 文件互链清晰,但首页跟 hub 页角色重叠 |
| **视觉美感** | **C+ (72)** | **致命短板** — 0 真实图片,emoji 占位让所有页面"差临门一脚" |
| B2B 转化 | B (78) | 6 种 CTA 体系完整,但缺客户决策路径地图 |
| 技术质量 | B+ (84) | meta / h1 / md 断点扎实,但缺 sm: 断点 |

**3 对标差距**:
- vs Eataly:叙事密度同档,但视觉差 50 分(0 食物大图)
- vs RATIONAL:叙事温度高,但缺规格速查表
- vs 中国头部 B2B:视觉/英文版/认证陈列高一档,但缺信任锚点(客户 logo wall / 工厂实拍)

**Top 5 优先修复**:
1. 🔴 0 张真实图片(致命)
2. 🔴 缺信任锚点(客户 logo / 媒体 / 团队 / 营业执照)
3. 🟠 首页/Products 子页角色重叠
4. 🟠 5 国大师跟产品矩阵脱节
5. 🟡 移动端 sm: 断点缺失

---

## 五、重要数据和参考

### 全站统计(W8 Phase 9 完成后)

| 项 | 数值 |
|---|---|
| HTML 文件 | 36 个(+ products.json + README.md + lead-capture.js)|
| 总大小 | ~2 MB |
| 中文字符 | ~22,000 |
| 英文词 | ~12,000 |
| 真实 `<img>` | **0**(全 emoji 占位)|
| Emoji 数 | ~928 |
| md: 断点 | 1,120 处 |
| sm: 断点 | 0 处 |
| CTA 总数 | 113+ 个 |

### CTA 分布(Phase 5 时)

| CTA | 数量 |
|---|---|
| general_contact | 47 |
| sample_request | 20 |
| catalog_download | 20 |
| custom_inquiry | 11 |
| meeting_booking | 9 |
| origin_tour | 6 |

### 产品 SKU 总览(33 个)

| 分类 | SKU 数 | active | draft | 完整内容率 |
|---|---|---|---|---|
| 西式酱料 | 4 | 4 | 0 | 100% |
| 西式主食 | 11 | 0 | 11 | 0% |
| 炸品小食 | 6 | 0 | 6 | 0% |
| 主菜大餐 | 4 | 0 | 4 | 0% |
| 华仔爸爸 | 8 | 4 | 4 | 50% |
| **合计** | **33** | **8** | **25** | **24%** |

### 产品分类 SKU 详细清单

**🥫 西式酱料**(4 个主推 / 全部 18+ 款):
- 番茄牛肉酱 / 奶油蘑菇酱 / 罗勒松子青酱 / **烟熏彩椒酱**(替换万能辣椒酱)

**🍕 西式主食**(11 SKU):
- 披萨 5:黑松露 / 肉食炸弹 / 夏威夷 / 和牛肉酱 / 榴莲
- 卷饼 2:芝士牛肉饼 / 芝士牛肉卷
- 意面 2:古法肉酱 / 奶油蘑菇
- 主食 2:日式鱿鱼炒饭 / 安格斯牛肉汉堡

**🍟 炸品小食**(6 SKU):
- 薯类 2:原切红薯条 / 香酥土豆块
- 海鲜 2:黄金鳕鱼排 / 黄金凤尾虾
- 禽类 2:泰式香茅鸡翅根 / 鸡肉锅巴

**🍖 主菜大餐**(4 SKU):
- 意式烤鸡 / 德式脆皮猪肘 / 美式炭烤猪肋排 / 德国经典拼盘

**👶 华仔爸爸**(8 SKU,按 5 分类组织):
- 披萨 3:黑椒牛肉披萨 (HOT) / 和牛肉酱披萨 (HOT) / 黑松露披萨
- 主菜 1:美式炭烤猪肋排
- 意面炒饭 2:古法肉酱意面 / 日式鱿鱼炒饭
- 烤鸡 1:意式香草萌萌鸡 (NEW)
- 健康小菜 1:健康发酵辣椒 (FEATURED · HEALTHY)

### 路由表(关键链接)

| URL | 内容 |
|---|---|
| `index.html` | 首页(Hero + 产品瀑布 + 角色路由 + 故事卡 + Insights) |
| `products-index-v62.html` | 5 大产品矩阵入口页 |
| `products-sauces-v62.html` | 西式酱料 18+ SKU(4 风味家族 tab) |
| `products-staples-v62.html` | 西式主食 11 SKU |
| `products-snacks-v62.html` | 炸品小食 6 SKU |
| `products-mains-v62.html` | 主菜大餐 4 SKU |
| `products-chinpapa-v62.html` | 华仔爸爸窗口页(8 SKU)|
| `our-story-index-v62.html` | Story hub 页 |
| `our-story-chinese-roots-v62.html` | 5 大原料总入口 |
| `our-story-chinese-roots-{gannan-chili,xinjiang,inner-mongolia,wuchang,yunnan}-v62.html` | 5 原料各自子页 |
| `our-story-global-masters-v62.html` | 5 国大师总入口 |
| `our-story-global-masters-{italy,spain,korea,japan,mexico}-v62.html` | 5 国各自子页 |
| `our-story-china-insight-v62.html` | 中国客户洞察 |
| `capabilities-index-v62.html` | Capabilities hub 页 |
| `capabilities-{ganzhou,zhangjiakou,huairou}-factory-v62.html` | 3 工厂详情页 |
| `capabilities-supply-chain-v62.html` | 供应链页 |
| `capabilities-rd-team-v62.html` | 米其林研发团队 |
| `capabilities-certifications-v62.html` | 认证页 |
| `solutions-index-v62.html` | Solutions hub 页 |
| `solutions-light-kitchen-v62.html` | 轻厨房解决方案 |
| `solutions-coffee-shops-v62.html` | 咖啡馆解决方案 |
| `for-{foodservice,industrial,retail,online-sales,global}-v62.html` | 5 大客户角色页 |

### 设计系统标准模板

**logo CSS**:
```css
.brand-logo .zh{font-family:'Noto Serif SC',serif;font-weight:900;font-size:18px;letter-spacing:.08em;color:var(--forest);line-height:1.1;display:block}
.brand-logo .en{font-family:'Inter',sans-serif;font-weight:600;font-size:9.5px;letter-spacing:.46em;color:var(--forest);line-height:1;margin-top:4px;display:block;padding-right:.46em}
```

**R5 标准 H2 块结构**:
```html
<div class="h2-block">
  <span class="h2-eyebrow">02 / Products</span>
  <h2 class="h2-main">
    <span data-zh>四大产品矩阵</span>
    <span data-en>Four product families.</span>
  </h2>
</div>
```

**章节编号规范**:`01 / 02 / 03 ...` 各页内独立递增,章节标题用 `class="section-no"` 或 `class="article-num"`。

### Supabase 现状

- ✅ `leads` 表已建,接入 lead-capture.js
- ⏳ products 表(JSON A2 阶段才需要)

### 后台 JSON 方案路径

| 阶段 | 内容 | 状态 |
|---|---|---|
| **A1 · 极简版**(本轮) | products.json + README,前端不动 | ✅ 完成 |
| **A2 · 动态渲染**(下阶段) | JS 脚本读 JSON 渲染前端 | ⏳ 待启动 |
| **未来 · Supabase** | 数据迁移到 Supabase 表 + 简单后台 | 📋 规划中 |
| **更未来 · 完整 CMS** | Strapi / Sanity / Directus | 📋 长期规划 |

### 交付物历程

| 文件 | 阶段 | 内容 |
|---|---|---|
| phase1-cleaned.zip / phase1-strict.zip | W6 P1 | 旧术语清理 |
| phase2-new-pages.zip / phase2-countries.zip | W6 P2 | 5 原料 + 5 国子页 |
| phase3-light-kitchen.zip / phase3-batch1.zip / phase3-batch23.zip | W6 P3 | 公司介绍 PPT 入站 |
| w62-link-fixed.zip | W6 P4 | 372 处链接修复 |
| phase5-complete.zip | W6 P5 | 32 文件 完整版 |
| w7-final.zip → w7-revised.zip → w7-revised2.zip → w7-revised3.zip → w7-revised4.zip | W7 多轮修订 | logo + 间距 + 产品瀑布 + h2 字号 + mega 一致性 |
| w8-products.zip | W8 早期 | mega-products 5 列重构 + 3 新三级页 |
| **w8-phase9.zip**(最新) | **W8 P9** | **chinpapa 重构 + products-index 改造 + JSON A1 + 文档** |

---

## 六、协作模式与最佳实践

### Jerome 工作流

1. 提出需求 → Claude 提问澄清
2. 拍板 Q1/Q2/... → Claude 动手
3. Claude 出 zip → 解压覆盖本地 → hard refresh 测试
4. 反馈问题 → Claude 修订

### Claude 自我约束

- **绝不擅自做超出范围的事**(多次教训:Phase 5 时擅自下调 padding 太狠 / 擅自改 SKU 名)
- **遇模糊地带必先问** → 用 ask_user_input_v0
- **每次动手前先核对 zip 基准**(多次"传错版本"事件)
- **守 brief 锁定**(0 推测 / 0 禁词 / B2B 定位)
- **大改前先扫现状**(避免把已存在的元素当不存在,如 chinpapa 页已存在却没意识到)

### 高频踩坑(写下来下次避免)

1. **HTML 结构散乱时 patch 容易漏匹配**(单行 vs 多行格式 / class 顺序 / newline)
2. **CSS 类名碰撞**(`ps-card` 在 light-kitchen 是"痛点-解决",在 R2-A 是"product showcase")
3. **多轮叠加导致反向 bug**(`py-20 md:py-16` 反向)
4. **CSS 定义残留 ≠ HTML 实例残留**(grep 时要区分)

---

## 七、下一步路径建议(按 ROI 排)

### 立即可做(下一轮)

1. **🔴 补全 25 个 draft SKU 内容**(staples 11 + snacks 6 + mains 4 + chinpapa 4)
   - 你提供:卖点 / 工艺 / 规格 / 适用场景
   - 我接到:对应三级页 + chinpapa 页 + products.json

2. **🔴 华仔爸爸完整产品手册接入**
   - 等你传完整手册
   - 替换 chinpapa 页 placeholder + 补充其他 4 类产品(主菜/意面炒饭/烤鸡内容)

### 中期(2-3 轮内)

3. **🟠 33 张产品照片接入**(替换 emoji 占位)
4. **🟠 信任锚点系统**(客户 logo wall / 媒体报道 / 创始人页 / 工厂实拍)
5. **🟡 JSON A2 升级**(动态渲染前端)

### 长期(W9+)

6. About 页 + Insights 博客 + 5 国/5 原料关联收紧
7. SEO / 完整英文版 / 移动端 sm: 断点
8. 华仔爸爸 B2C 独立站(电商 + 微信支付)
9. Supabase 后台对接 / 完整 CMS

---

## 八、附录:关键文件清单

### 本轮(W8 Phase 9)交付

```
w8-phase9.zip 内容:
├─ index.html(首页)
├─ products-index-v62.html(5 大分类入口,本轮重构)
├─ products-sauces-v62.html
├─ products-staples-v62.html
├─ products-snacks-v62.html
├─ products-mains-v62.html
├─ products-chinpapa-v62.html(本轮 5 分类重构)
├─ our-story-*.html(11 个故事页)
├─ capabilities-*.html(5 个能力页)
├─ solutions-*.html / for-*.html(8 个客户角色 + 解决方案页)
├─ lead-capture.js
├─ products.json(本轮新增,33 SKU 数据)
└─ products.json.README.md(本轮新增,使用文档)

合计 36 HTML + 3 资源文件 = 39 文件,~2 MB
```

### 已锁定但**不能改**的事

- 公司事实(创立日期 / 法人 / 工厂数 / SKU 数 / 客户数)
- 0 禁词列表(9 项)
- 0 推测数据红线
- 5 大原料 / 5 国大师清单
- 6 种合法 CTA 值
- 双品牌结构(Foodvio B2B / ChinnPaPa B2C)
- 设计系统(主色 / 字体 / 100,000㎡ 口径)

---

**END · 文档生成完毕**

> 这份纪要可以直接保存到项目知识库(Notion / Obsidian / Wiki),作为以后任何会话的"项目记忆基线"使用。
> 下次新开会话时上传这份文档,Claude 立刻知道你在哪一阶段、要做什么、约束是什么。
