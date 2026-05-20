# Foodvio V6.2 · Brief 锁定项 V3.2(W27 后整合版)

> **文档目的**:整合 phase1 + phase2 + W9 + W17 + **W18-W27 累积变更**的所有锁定项,作为**单一权威来源(Single Source of Truth)**。下次新对话时,**优先读这个文档**,再读历史 phase 文档作为参考。
> **整理日期**:2026-05-19
> **当前版本**:V3.2(W27 后整合)
> **上一版本**:V3.0(W17 后整合,2026-05-14)
> **下一版本**:V3.3(待定)
> **优先级**:本文档 > AMENDMENTS 文档 > phase1/2 原文

---

## V3.0 → V3.2 关键差异速查(10 周变更摘要)

| 类别 | V3.0(W17)| V3.2(W27)|
|---|---|---|
| SKU 库 | 47 个 | **44 个**(W18 +1 烟熏彩椒酱 / W24 -4 酱料)|
| 国家大师 | 5 个 | **6 个**(W23 加 SEA · 无独立子页) |
| 中国产地数 | 5 个(W22 已 lock) | 5 个(不变) |
| 业务页面数 | 38 | **38 业务 + 1 careers = 39**(W26 新增)|
| 全站 HTML 文件 | 44(含 6 法律页)| **45**(+careers)|
| CTA 类型 | 6 类 | **2 类**(general_contact + sample_request,W25 简化)|
| 全站 mega-menu 锚点 | 116 个 stale | **0 stale**(W22 修复)|
| 全站 footer 锚点失效 | 66+ 处 | **0 处**(W27 修复)|
| 全站标签平衡 | chinpapa/global-masters 有遗留 | **0 issues**(W27 清理)|
| 表单 phone 字段 | 可选 | **必填 + 中英双语动态 placeholder**(W24)|
| 海外采购商命名 | "海外采购商 / Global" | "**全球采购商 / Global Buyer**"(W24)|
| 全球采购商 CTA | 默认中文跳子页 | **强制英文切换 + 跳子页**(W24)|
| careers 简历按钮 | (无 careers 页)| **mailto URL encoded**(W27 修复)|
| 首页"最新动态" | 假数据卡 | **3 篇真实微信公众号文章**(W27)|
| 中国地图 SVG | (W22 加入)| **删除**(W25)|
| 世界地图 SVG | (W22 加入)| **删除**(W25)|
| 主导航顺序 | ...关于我们(末尾)| ...**加入我们 → 关于我们**(W26b)|

---

## 一、公司基础信息(不可变 brief)

| 项 | 值 |
|---|---|
| 公司全称 | 北京花花食界食品科技有限公司 |
| 创立日期 | 2021 年 8 月 |
| 总部地址(中) | 北京市朝阳区零秒空间酒仙桥社区419房间 |
| 总部地址(英) | Room 419, LIMO space, Jiuxianqiao Community, Chaoyang District, Beijing, PRC. |
| 客服邮箱 | huahuakefu1@foodvio.com.cn |
| 客服电话 | 400-6879-568 |
| ICP 备案 | 京 ICP 备 2022025117 号-1 |
| **首页 stat-strip 对外口径(W26b 同步)** | **2021 创立 / 100+ SKUs / 3,000+ 合作伙伴 / 100,000㎡ 自建及托管 / FOB × 4 出口港口** |
| 网站实际 SKU 数(W27)| **44 个**(对外仍宣称 100+) |
| 服务客户(对外)| 3,000+ |
| 销售网络 | 全国 10 余个省市 |

### ⚠️ 地址变更历史(锁定 · 不再变更)
- W6 原版:北京望京 SOHO T3A 1008
- W16:北京市朝阳区灵妙空间...(误改)
- **W17 最终**:北京市朝阳区零秒空间酒仙桥社区419房间 / LIMO space ✓

法律页(privacy/terms/cookie × zh/en)地址已同步。

---

## 二、品牌结构(W9 锁定 · 不变)

| 品牌 | 定位 | 网站状态 |
|---|---|---|
| 花花食界 Foodvio | B2B 西餐食品供应链品牌 | ✅ 主站 |
| 华仔爸爸 ChinnPaPa | B2C 儿童健康营养品牌 | ✅ 主站窗口页 |

**双品牌不变**。

---

## 三、Slogan / 视觉系统(W9 锁定 · 不变)

### 3.1 Slogan
- **中**:花花食界 — 源自中国的专业西餐食品品牌
- **英**:Western Food, Made in China.(待陈总最终确认)

### 3.2 配色(C 级别 4 设计语言)
- `--forest` #1B4332(主色)
- `--ink` #0a1f17(深色 hero 背景)
- `--terra` rust 红(强调色)
- `--gold` #F5C82E / #B8860B(金色 · 高端)
- `--sage` 灰绿
- `--cream` / `--paper`(背景)
- 字体:Cormorant Garamond(衬线英文)+ font-serif-sc(衬线中文)

---

## 四、网站架构(W27 最新)

### 4.1 全站文件清单(45 个 HTML)

**主页 + 4 大产品系列(5)**:
- index.html(首页)
- products-index-v62.html
- products-staples-v62.html(11 SKU 西式主食)
- products-snacks-v62.html(? SKU 炸品小食)
- products-mains-v62.html(? SKU 主菜大餐)
- products-sauces-v62.html(15 SKU 西式酱料 · W24 删 4 → 15)
- products-chinpapa-v62.html(8 SKU 儿童 · W22 平铺合并)

**4 大客户方案(5)**:
- solutions-index-v62.html
- for-foodservice-v62.html(连锁餐饮)
- for-industrial-v62.html(机构团餐)
- for-retail-v62.html(新零售)
- for-online-sales-v62.html(线上销售)
- for-global-v62.html(全球采购商 · W24 命名调整)

**品牌故事(7)**:
- our-story-index-v62.html
- our-story-chinese-roots-v62.html(5 产地总览 · W25 删地图)
  - our-story-chinese-roots-gannan-chili-v62.html(江西赣南 · ⭐ 主推)
  - our-story-chinese-roots-yunnan-v62.html(云南)
  - our-story-chinese-roots-wuchang-v62.html(东北五常)
  - our-story-chinese-roots-inner-mongolia-v62.html(内蒙古)
  - our-story-chinese-roots-xinjiang-v62.html(新疆)
- our-story-global-masters-v62.html(6 国总览 · W25 删地图 · W23 加 SEA)
  - our-story-global-masters-italy-v62.html(意大利 ⭐)
  - our-story-global-masters-spain-v62.html(西班牙)
  - our-story-global-masters-korea-v62.html(韩国)
  - our-story-global-masters-japan-v62.html(日本)
  - our-story-global-masters-mexico-v62.html(墨西哥)
  - ❌ **SEA 无独立子页**(W23 用越南菜场景图作 master-card 背景)
- our-story-china-insight-v62.html(中国洞察)

**能力体系(7)**:
- capabilities-index-v62.html
- capabilities-ganzhou-factory-v62.html
- capabilities-huairou-factory-v62.html
- capabilities-zhangjiakou-factory-v62.html
- capabilities-supply-chain-v62.html
- capabilities-rd-team-v62.html
- capabilities-certifications-v62.html

**洞察 + 关于我们 + 加入我们(3)**:
- insights-v62.html(行业洞察)
- about-v62.html(关于我们)
- **careers-v62.html**(加入我们 · **W26 新增**)

**法律页(6)**:
- privacy-zh.html / privacy-en.html
- terms-zh.html / terms-en.html
- cookie-zh.html / cookie-en.html

### 4.2 主导航顺序(W26b 后锁定)

```
产品 → 方案 → 品牌故事 → 能力体系 → 行业洞察 → 加入我们 → 关于我们
```

注意:**"加入我们"在"关于我们"左边**(W26b 用户调换决策)。

### 4.3 移动端 nav-drawer
- 全站 38 业务页 + 1 careers = **39 文件**同步
- careers 页 active class 标在 careers 链接

---

## 五、关键内容决策(W18-W27 新增)

### 5.1 产品命名变更(W23)
- ❌ "德国经典拼盘 / German Classic Platter"
- ✅ "**德式经典香肠品牌 / German Classic Sausage Brand**"
- 全站 92 处替换(中文 + 英文)

### 5.2 产品规格更新(W23 · 4 个 SKU)

| SKU | 旧规格 | 新规格 |
|---|---|---|
| sku-golden-shrimp(黄金凤尾虾)| 500g | **150g** |
| sku-meat-bomb-pizza(肉食炸弹披萨)| 240g · 单人份 | **290g · 单人份** |
| sku-hawaiian-pizza(夏威夷披萨)| 240g · 单人份 | **310g · 单人份** |
| sku-durian-pizza(榴莲披萨)| 240g · 单人份 | **300g · 单人份** |

### 5.3 sauces 删除 4 个酱料(W24)
- 删除:sku-caesar(凯撒酱)/ sku-thousand-island(千岛酱)/ sku-tartar(鞑靼酱)/ sku-salsa(莎莎酱)
- sauces 卡片:19 → **15** 张
- 资产文件:删除 8 个图片(4 jpg + 4 webp)

### 5.4 全球采购商命名 + 强制英文切换(W24)
**index.html role-card delay-5**:
- ❌ 海外采购商 / Global
- ✅ **全球采购商 / Global Buyer**
- CTA `onclick="forceEnglishAndGo(event, 'for-global-v62.html')"` → 触发:
  1. `body.classList.add('lang-en')`
  2. `localStorage.setItem('foodvio-lang', 'en')`
  3. `window.location.href` 跳转

JS 函数 `forceEnglishAndGo()` 在 index.html L1991 后(toggleLang 之后)。

### 5.5 表单 phone 字段必填(W24)
**lead-capture.js L180**:
```html
<input name="phone" required 
  placeholder="${document.body.classList.contains('lang-en') ? 'Phone *' : '电话/微信 *'}" />
```

- 中文版:`电话/微信 *`(必填)
- 英文版:`Phone *`(必填,海外用户不识"微信")

### 5.6 首页 news-card 真实化(W27)

3 张卡指向真实微信公众号文章:

| # | 日期 | 标题 | 微信链接 | 封面图 |
|---|---|---|---|---|
| 1 | 2026.01 | 花花食界载誉而行,三大爆款铸芬芳 | `_ZBu6HHyYP9RZWG9Z0CPGg` | news-01-brand-2026.jpg |
| 2 | 2025.12 | 喜报 · 入驻北京学校基地直供平台 | `Ba409T2wdVpTXy2u7j_V2w` | news-02-school-supplier.jpg |
| 3 | 2025.08 | 政策引领新消费 | `PQZ0jKZ7aUP20V6w-XJPuA` | news-03-policy-2025.jpg |

后续维护:用户给标题/日期/链接/封面图 → Claude 5 分钟改 + push。

### 5.7 careers 文案锁定(W27)
- ✅ "花花食界 Foodvio 创立于 2021 年,我们用 **5 年时间已经成长为**中国西餐食品的革新者。"
- ✅ "...可以做出与意大利、西班牙、美国同等水准的西餐食材**(无 1/8 / 无降级 / 无代工厂表述)**。"
- ✅ "**这是一次**基于深度本土供应链的创新。"

---

## 六、工厂体系(W9 锁定 · 不变)

3 个工厂(自营/合作):
- 赣州工厂(江西)— 主推
- 怀柔工厂(北京)
- 张家口工厂(河北)

---

## 七、完整 SKU 库(W27 最新 · 44 个)

**注**:V3.0 时是 47 个,W18 加 sku-smoked-pepper,W24 删 4 个酱料 = 44 个。

### 7.1 SKU 总数变化历史

| 版本 | SKU 数 | 变更 |
|---|---|---|
| W11 锁定 | 47 | 初始 |
| W18 | 48 | +sku-smoked-pepper(烟熏彩椒酱) |
| W24 | **44** | -4 酱料(凯撒/千岛/鞑靼/莎莎) |

### 7.2 chinpapa 8 SKU(W22 平铺 · W11 命名规范化)

W22 决策:**取消 4 分类 section,合并为 1 个 grid 4 列(8 张卡)**。

| # | SKU id | 中文 | 类别 |
|---|---|---|---|
| 1 | sku-black-pepper-beef-pizza | 黑椒牛肉披萨 | 披萨 |
| 2 | sku-wagyu-pizza | 和牛肉酱披萨 | 披萨 |
| 3 | sku-black-truffle-pizza-kids | 黑松露披萨(儿童版)| 披萨 |
| 4 | sku-cheese-beef-roll-cp | 芝士牛肉卷 | 卷饼 |
| 5 | sku-cheese-beef-patty-cp | 芝士牛肉饼 | 主食 |
| 6 | sku-classic-bolognese-cp | 古法肉酱意面 | 意面 |
| 7 | sku-italian-mini-chicken | 意式香草萌萌鸡 | 烤鸡 |
| 8 | sku-fermented-chili | 健康发酵辣椒 | 小菜 |

**关键 bug 修复**:W11 重命名 chinpapa SKU id(加 -cp 后缀)后,mega-menu 锚点未同步,**W22 修复 38 文件 116 处**:
- sku-cheese-beef-roll → sku-cheese-beef-roll-cp
- sku-bolognese-pasta → sku-classic-bolognese-cp
- sku-herb-roast-chicken → sku-italian-mini-chicken

### 7.3 sauces 当前 15 SKU(W24 后)

W24 删除清单:
- ❌ sku-caesar(凯撒酱)
- ❌ sku-thousand-island(千岛酱)
- ❌ sku-tartar(鞑靼酱)
- ❌ sku-salsa(莎莎酱)

保留 15 个 SKU(含 W18 新增的 sku-smoked-pepper 烟熏彩椒酱)。

### 7.4 staples/snacks/mains SKU 分类
保持 V3.0 锁定不变,SKU id 列表略(参考 W11 报告)。

### 7.5 全站产品图资产(W27 完整性)
- assets/products/*.jpg:44 张
- assets/products/*.webp:44 张(配对完整)

### 7.6 SKU 图片三级降级(W18 锁定)
- 真图 → CSS 渐变色块 → emoji
- `<picture><source type="image/webp" srcset="..."><img src="..." loading="lazy"></picture>`

---

## 八、卡片设计系统(W11 锁定 · sauce-card 22 色系)

不变,详见 V3.0 第八章。

---

## 九、移动端规范(W12-W13 锁定)

不变,详见 V3.0 第九章。

**W22 新增移动端:chinpapa 8 卡 grid 响应式**:
```
grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
```
桌面 4 列 / 平板 2-3 列 / 手机 1 列。

---

## 十、当前接图状态(W27 最新)

### 10.1 产品图(44 SKU)
- ✅ 完整接图:44/44(W22 5 子页 pwr-card × 3 = 15 张接图完成)

### 10.2 第二批资产(W19 接入 · 31 张)
- 工厂图(3 工厂 × 多张)
- 5 大产地图(W19)
- 5 国风情图(意/西/韩/日/墨)
- W23 SEA:country-sea.jpg(越南菜场景)+ country-sea-cuisine.jpg(泰国摆盘)

### 10.3 国家大师卡背景图共享(W22 → W23)

| 国家 | 子页 hero | 总览卡 | 共享文件 |
|---|---|---|---|
| 🇮🇹 意大利 | ✓ | ✓ | country-italy.jpg |
| 🇪🇸 西班牙 | ✓ | ✓ | country-spain.jpg |
| 🇰🇷 韩国 | ✓ | ✓ | country-korea.jpg |
| 🇯🇵 日本 | ✓ | ✓ | country-japan.jpg |
| 🇲🇽 墨西哥 | ✓ | ✓ | country-mexico.jpg |
| 🌏 SEA | ❌(无子页)| ✓ | country-sea.jpg |

### 10.4 新闻图(W27 新增)
- assets/news/news-01-brand-2026.jpg(1500×900 · 红色马艺术)
- assets/news/news-02-school-supplier.jpg(1500×900 · 喜报红)
- assets/news/news-03-policy-2025.jpg(751×450 · 绿色)
- 各配 webp 副本

### 10.5 删除的资产
- 中国地图 SVG(W22 加入 → W25 删除)
- 世界地图 SVG(W22 加入 → W25 删除)
- 4 个酱料图(W24 删除 · 8 文件)

---

## 十一、技术栈 / 部署(不变)

- 静态 HTML(Tailwind via CDN + 自定义 CSS)
- GitHub Pages 部署
- 仓库:github.com/jeromechen01/foodvio-website
- 上线:https://jeromechen01.github.io/foodvio-website/
- 后端:Supabase(lead-capture 表单)
- W24 起 lead-capture.js phone 字段必填

### 11.1 关键 JS 函数(W24+)
- `toggleLang()` - 中英切换(index.html L1985 起)
- `forceEnglishAndGo(event, targetUrl)` - 强制英文 + 跳转(index.html L1991 后)
- lead-capture.js - 表单 + Supabase 提交

---

## 十二、CTA 体系(W25 大改 · W27 验证)

### 12.1 CTA 类型(只剩 2 类)

| 类型 | 数量 | 表单/行为 |
|---|---|---|
| **general_contact** | 1376 | 弹 lead-capture 表单 |
| **sample_request** | 60 | 弹 lead-capture 表单 |
| ~~catalog_download~~ | 0 | ❌ W25 清理 |
| ~~custom_inquiry~~ | 0 | ❌ W25 清理 |
| ~~meeting_booking~~ | 0 | ❌ W25 清理 |
| ~~origin_tour~~ | 0 | ❌ W25 清理 |

### 12.2 cta-as-text(W25 不可点击文字 · 63 个)

W25 决策:**预约/下载/参观类**按钮转为**不可点击文字** + "联系客服"提示。

技术实现:
- `<a>/<button>` → `<span class="cta-as-text">`
- CSS:`cursor: default; user-select: none; color: rgba(27,67,50,0.55); font-style: italic;`

63 个文字保留**原描述**(从 W24 zip 提取)+ 加"· 联系客服":

| 中文 | 英文 |
|---|---|
| 下载产品手册 · 联系客服 | Catalog PDF · Contact us |
| 预约工厂参观 · 联系客服 | Schedule Factory Visit · Contact us |
| 定制开发咨询 · 联系客服 | Custom Inquiry · Contact us |
| 预约赣州农场参观 · 联系客服 | Book Ganzhou farm visit · Contact us |
| ... 等 63 类 | ... |

### 12.3 careers 简历按钮(W26 新增 · W27 修复 mailto)

4 个简历按钮 → **mailto URL encoded**:
```html
<a href="mailto:huahuakefu1@foodvio.com.cn?subject=Job%20Application%20-%20%E6%B1%82%E8%81%8C%E7%94%B3%E8%AF%B7">
  <span data-zh>投递简历</span><span data-en>Apply Now</span>
</a>
```

⚠️ **W26b 失败 → W27 修复**:之前 subject 含 "·" 中点 + 空格 + 中英混排,浏览器无法解析,导致按钮点击无反应。

---

## 十三、法律合规(W9 锁定)

不变,6 个法律页(privacy/terms/cookie × zh/en)。

---

## 十四、特殊页面规格

### 14.1 chinese-roots 总览页(W22+W25)
- 5 个产地(江西/新疆/内蒙古/东北/云南)
- 5 张 origin-card(全部真链接)
- **不带地图**(W25 删除 SVG)
- 副标题:"从赣南红土地到云南深山,从内蒙古草原到东北黑土"
- 删除虚构卡:福建/山东/粤桂(W22)

### 14.2 global-masters 总览页(W23+W25)
- **6 个国家**(意/西/韩/日/墨/SEA)
- 6 张 master-card(SEA 用越南菜图)
- **不带地图**(W25 删除 SVG)
- mega-menu 含 6 国链接,SEA 链接到 `#master-sea` 锚点

### 14.3 chinpapa 子页(W22 平铺)
- 8 SKU 平铺到 1 个 grid section
- 标题"🍕 8 款儿童产品"
- responsive grid-cols-1/2/3/4

### 14.4 careers 子页(W26+W26b+W27)
- Hero / Who We Are / Our Values / Open Roles / Process / CTA(6 section)
- 3 个岗位:食品研发专员(面议)/ 大客户销售(面议)/ **管培生 ⭐ NEW**(面议)
- 数据带与首页 stat-strip 同步(2021/100+ SKUs/3,000+ 合作伙伴/100,000㎡)
- 4 个简历按钮全部 mailto URL encoded
- nav active class 标在 careers 链接

---

## 十五、累积修复的隐藏 bug(W27 最终清理)

### 15.1 锚点失效(73 处 → 0)

**Footer 锚点(66 处)**:
- `products-index#staples/snacks/mains/sides` → 修复为独立子页
- 删除"健康小菜" footer 链接(W22 后无独立页)

**insights 锚点(5 处)**:
- `china-insight#texture/flavor/color/wok-hei/restoration` → 改为 china-insight 主页

**零散锚点(2 处)**:
- `about#contact` → about
- `chinpapa#sku-cheese-beef-patty` → `sku-cheese-beef-patty-cp`

### 15.2 HTML 标签碎屑

**chinpapa L1426-1432**(W22 平铺合并遗留):
- 半截"olor:var(--terra)...规格 · 90g · 芝士、淡奶油"碎片
- 3 个孤儿闭合标签 `</a></div></div>`
- W27 完整清理

**global-masters L835-838**(W25 删世界地图遗留):
- 3 个孤儿 `</div>`
- W27 清理

### 15.3 chinese-roots 8 张卡修复(W22)
- 删除虚构 origin-card:福建/山东/粤桂
- 修复 4 张真实卡 href="#" → 真链接(yunnan/wuchang/inner-mongolia/xinjiang)
- 删除 8 个 absolute 标注孤儿 div

---

## 十六、核心工作模式(不变)

### 验证链路
陈总 → Jerome → Claude

### Jerome 工作环境
- 首尔 iPad
- vibe code 模式(无传统编码经验)
- GitHub Pages 部署

### Claude 交付标准
- zip 包 + 报告 md
- 0 死链 / 0 锚点失效 + 完整自检
- 不破坏现有视觉(W12-W13 移动端规范)

### 沟通风格(继承)
- Jerome 偏好快速决策("就改吧,不要再问")
- Claude 主动 flag 风险,做"项目顾问"判断
- 不确定时 ask_user_input_v0 提供 2-4 个明确选项

### CSS marker 标记(幂等性)
- 每次大改用 `/* W## · xxx */` 标记
- 确保 zip 重新应用不重复 / 冲突

### 移动端 + 桌面端永远同步
- 所有改动同时检查:桌面 `<nav>` + 移动 `<aside class="nav-drawer">`
- W12 P0 mobile drawer + W13 字号对标全球品牌

---

## 十七、累积报告位置

| 文件 | 内容 |
|---|---|
| foodvio-V62-brief-locked-V3.md | V3.0 锁定(W17 后) |
| foodvio-V62-brief-locked-**V3.2**.md | **V3.2 锁定(W27 后,本文档)** |
| W19-FINAL-REPORT.md | 第二批资产接入 |
| W22-OPTIMIZATION-REPORT.md | 中国/世界地图 SVG(已被 W25 删) |
| W23-FIX-REPORT.md | SEA 加回 + 4 产品规格 + 德式经典香肠品牌 |
| W24-BUGFIX-REPORT.md | 全球采购商 + 表单字段 + sauces 删 4 |
| W25-FINAL-REPORT-v3.md | 删 2 地图 + 63 CTA 转不可点文字 |
| W26-CAREERS-REPORT.md | careers 页面 + 3 岗位 |
| W26b-REPORT.md | careers 数据同步 + 薪资面议 + nav 调换 |
| **W27-REPORT.md** | **3 微信文章 + careers bug + 锚点 73→0** |

---

## 十八、后续 PENDING(下一阶段)

1. **微信文章持续追加**(用户每发新文章给 Claude → 5 分钟更新)
2. **管培生岗位**:薪资数字可能要细化(W26b 现"面议",可加范围)
3. **SEA 子页**:如未来要给 SEA 建独立子页(像其他 5 国)→ Claude 用 italy 模板新建
4. **法律页内容审核**:陈总最终审定
5. **GitHub Pages 自定义域名**(可选)

---

**文档版本**:V3.2
**日期**:2026-05-19(W27 后)
**作者**:Claude + Jerome 协作
**下次更新触发**:再积累 3-5 周变更 / 重大架构变化 / 上线重大新页面
