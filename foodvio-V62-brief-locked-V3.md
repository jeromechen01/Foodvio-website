# Foodvio V6.2 · Brief 锁定项 V3.0(W17 后整合版)

> **文档目的**:整合 phase1 + phase2 + W9 + **W10-W17 累积变更**的所有锁定项,作为**单一权威来源(Single Source of Truth)**。下次新对话时,**优先读这个文档**,再读历史 phase 文档作为参考。
> **整理日期**:2026-05-14
> **当前版本**:V3.0(W17 后整合)
> **上一版本**:V2.0(W9 后整合,2026-05-05)
> **下一版本**:V3.1(第二批资产 — 工厂/原产地/国家图接入后)
> **优先级**:本文档 > AMENDMENTS 文档 > phase1/2 原文

---

## 一、公司基础信息(不可变 brief)

| 项 | 值 |
|---|---|
| 公司全称 | 北京花花食界食品科技有限公司 |
| 创立日期 | 2021 年 8 月 |
| **总部地址(中)** | **北京市朝阳区零秒空间酒仙桥社区419房间** ⚠️ W17 更新 |
| **总部地址(英)** | **Room 419, LIMO space, Jiuxianqiao Community, Chaoyang District, Beijing, PRC.** ⚠️ W17 更新 |
| 客服邮箱 | huahuakefu1@foodvio.com.cn |
| 客服电话 | 400-6879-568 |
| ICP 备案 | 京 ICP 备 2022025117 号-1 |
| SKU 总数 | 100+(实际网站精修 47 个 SKU,详见七章) |
| 服务客户 | 3000+ |
| 销售网络 | 全国 10 余个省市 |

### ⚠️ 地址变更历史(W6 至今 3 次)
- W6 原版:北京望京 SOHO T3A 1008
- W16 调整:北京市朝阳区灵妙空间酒仙桥社区419房间(误改,实际公司搬迁)
- **W17 最终**:北京市朝阳区零秒空间酒仙桥社区419房间 / LIMO space ✓

法律页(privacy/terms/cookie)地址已同步更新。**请陈总最终敲定后,后续不再变更**(避免备案+客户邮件签名混乱)。

---

## 二、品牌结构(W9 锁定 · 双品牌不变)

| 品牌 | 定位 | 网站状态 |
|---|---|---|
| 花花食界 Foodvio | B2B 西餐食品供应链品牌 | ✅ 主站 |
| 华仔爸爸 ChinnPaPa | B2C 儿童健康营养品牌 | ✅ 主站窗口页 / 未来独立站 |

**未来候选(暂不进站)**:
- 宁都州宴·米肆1295(客家菜)— W9 决策暂不进站

---

## 三、Slogan / 视觉系统

### 3.1 Slogan(W9 锁定 · 不变)

| 语种 | Slogan |
|---|---|
| 中文 | 花花食界 — 源自中国的专业西餐食品品牌 |
| 英文 | Foodvio — Western Cuisine. Chinese Roots. Global Palate. |

### 3.2 主色(W9 锁定 · 不变)

| 色 | 值 |
|---|---|
| Ink | #0d2a1f |
| Forest | #1B4332 |
| Terra | #E07A5F |
| Rust | #C73E3A |
| Gold | #F5C82E |

### 3.3 字体(W9 锁定 · 不变)

- 中文标题:Noto Serif SC(简体衬线)
- 英文衬线:Cormorant Garamond(主标题/斜体)
- 中英正文:Tailwind 默认 sans

### 3.4 ⚡ Hero 3 图轮播 Ken Burns(W11 新增)

**首页 Hero 现在是 3 图轮播,不再是渐变 + 噪点**:

| 路径 | 内容建议 |
|---|---|
| `assets/hero/hero-01.jpg` | BBQ 餐桌 |
| `assets/hero/hero-02.jpg` | 6 杯酱料 |
| `assets/hero/hero-03.jpg` | 披萨汉堡 |

**技术规范**:
- 切换效果:Ken Burns 缓慢放大(1.00 → 1.08)
- 每张停留:5 秒
- 总循环:15 秒
- 切换衔接:fade
- 暗化遮罩:linear-gradient(135deg, rgba(13,42,31,0.55) 0%, ...)
- 浮在上面的文字层 z-index: 10
- 移动端 hero 高度:`100svh`(iOS Safari 安全高度,避免地址栏遮挡)

**未来替换**:把新图覆盖到 `assets/hero/hero-XX.jpg` 同名文件即可,不用动 HTML。

---

## 四、网站架构(W10-W17 累积更新)

### 4.1 全站 38 业务页 + 6 法律页

```
首页:index.html
产品:products-index, products-sauces, products-staples, products-snacks, products-mains, products-chinpapa (6)
方案:solutions-index, solutions-coffee-shops, solutions-light-kitchen, for-foodservice, for-industrial, for-retail, for-global, for-online-sales (8) ⚠️ for-online-sales 保留但首页和方案首页不再有入口
品牌故事:our-story-index, our-story-chinese-roots(主+5 子), our-story-global-masters(主+5 子) (12)
能力体系:capabilities-index, capabilities-rd-team, capabilities-ganzhou-factory, capabilities-zhangjiakou-factory, capabilities-huairou-factory, capabilities-supply-chain, capabilities-certifications (7)
其他:about, insights (2)
法律:privacy-policy(zh/en), terms-of-service(zh/en), cookie-policy(zh/en) (6)
```

**核心子页总数:38 + 6 = 44**

### 4.2 顶部 nav(W10-fix3 双语补全 + W16 删特殊业态)

6 项:
1. 产品 / Products(mega menu 5 子分类)
2. 方案 / Solutions(mega menu 4 子分类)⚠️ **W16 删"🟣 特殊业态(2)"**
3. 品牌故事 / Our Story
4. 能力体系 / Capabilities
5. 行业洞察 / Insights
6. 关于我们 / About

### 4.3 footer(W10-fix3 双语 + W16 删烘焙)

产品分类:4 个(原 5 个,W16 删"烘焙食品"链接)
- 西式酱料 / Western Sauces
- 西式主食 / Staples
- 炸品小食 / Snacks
- 主菜大餐 / Mains
- ~~烘焙食品 / Bakery~~ ⚠️ W16 删除

### 4.4 ⚡ 移动端汉堡菜单(W12 新增)

**全站 38 文件全部有汉堡菜单**:
- 显示规则:`@media (max-width: 1023px)`
- 按钮位置:nav utility 区(search + 🍔 + lang-toggle)
- Drawer 宽度:280px,从右侧 slide-in,400ms
- Drawer 内容:6 个 nav 项 + Active 高亮(按文件名前缀自动判定)+ Contact CTA + 联系方式
- 点击 backdrop / ESC / 点链接 → 关闭
- body 锁滚动 + backdrop 模糊背景

CSS 标记:`/* W12 P0-1 · Mobile Hamburger Menu */`

---

## 五、关键内容决策

### 5.1 首页"您是?"区(W16 更新)

**5 卡 → 4 卡**(W16 删"跨境电商"):

| 序 | 卡片 | 跳转 |
|---|---|---|
| 01 | 餐饮运营商 / Foodservice | for-foodservice-v62.html |
| 02 | 团餐机构 / Industrial | for-industrial-v62.html |
| 03 | 零售品牌方 / Retail | for-retail-v62.html |
| ~~04~~ | ~~跨境电商 / Online Sales~~ | ⚠️ W16 删除卡片(子页文件保留) |
| 05 | 海外采购商 / Global | for-global-v62.html |

副标题"四种合作伙伴,四条专属路径"对应现 4 张卡。

### 5.2 R&D 6 国并存(W9 锁定 · 不变)

意大利 / 西班牙 / 韩国 / 日本 / 东南亚 / 墨西哥 — 全部 R&D 大师并存,**5 国大师 + 东南亚**(国家页只展 5 国大师,东南亚作 R&D 维度展示)。

### 5.3 9 项禁词(W9 锁定 · 不变)

预制菜 / 半成品 / 西餐发源地 / 江西辣椒 / 30天打样 / 商超自有品牌 / 麦肯薯角 / 麻辣牛肉 / 即食鸡丝

### 5.4 0 推测数据红线(W9 锁定 · 不变)

只引用画册原文数据,不擅自添加比例 / 占比 / 排名等表述。

---

## 六、工厂体系(W9 锁定 · brief 微调)

| 工厂 | 面积 | 关键事实 |
|---|---|---|
| 江西赣州 | 6.66 万㎡ | — |
| 河北张家口 | 1.6 万㎡ | FDA + 6 条数字化产线 + 30+ 烘焙品类 |
| 北京怀柔 | 自建及托管近 10 万㎡ | "紧邻北京朝阳区零秒空间总部"(W17 更新表述)|

⚠️ "烘焙"业务事实(张家口 FDA 烘焙工厂 + 30+ 烘焙品类)**保留**,只是 footer 不再列"烘焙食品"分类(W16 决策)。

---

## 七、完整 SKU 库(W11-W14 锁定)

**47 个 SKU 完整归档**(去掉烘焙后的最终数量)。所有 SKU 都有规范 `id="sku-XXX"`,可被脚本批量匹配 / 接图。

### 7.1 sauces 18(W11 sauces 删 4 风味 tab 后平铺)

| id | 中文 | 英文 |
|---|---|---|
| sku-tomato-bolognese | 番茄牛肉酱 | Tomato Bolognese |
| sku-creamy-mushroom | 奶油蘑菇酱 | Creamy Mushroom |
| sku-classic-bolognese-sauce | 古法肉酱 | Classic Bolognese |
| sku-basil-pesto | 罗勒青酱 | Basil Pesto |
| sku-porcini-sauce | 牛肝菌酱 | Porcini Sauce |
| sku-bacon-black-pepper | 培根黑椒酱 | Bacon Black Pepper |
| sku-black-pepper-sauce | 美式黑椒汁 | Black Pepper Sauce |
| sku-honey-mustard | 蜂蜜芥末 | Honey Mustard |
| sku-caesar | 凯撒酱 | Caesar |
| sku-thousand-island | 千岛酱 | Thousand Island |
| sku-yellow-curry | 黄咖喱酱 | Yellow Curry |
| sku-sweet-sour-thai | 泰式酸辣酱 | Sweet & Sour Thai |
| sku-satay | 沙茶酱 | Satay Sauce |
| sku-yuzu-pepper | 柚子椒酱 | Yuzu Pepper |
| sku-korean-gochujang | 韩式辣酱 | Korean Gochujang |
| sku-teriyaki | 日式照烧酱 | Teriyaki |
| sku-tartar | 鞑靼酱 | Tartar Sauce |
| sku-salsa | 莎莎酱 | Salsa |

### 7.2 staples 11

| id | 中文 | 英文 |
|---|---|---|
| sku-black-truffle-pizza | 黑松露披萨 | Black Truffle Pizza |
| sku-meat-bomb-pizza | 肉食炸弹披萨 | Meat Bomb Pizza |
| sku-hawaiian-pizza | 夏威夷披萨 | Hawaiian Pizza |
| sku-wagyu-bolognese-pizza | 和牛肉酱披萨(主食版) | Wagyu Bolognese Pizza |
| sku-durian-pizza | 榴莲披萨 | Durian Pizza |
| sku-cheese-beef-patty | 芝士牛肉饼(墨西哥风味) | Cheese Beef Quesadilla |
| sku-cheese-beef-roll | 芝士牛肉卷 | Cheese Beef Roll |
| sku-classic-bolognese | 古法肉酱意面 | Classic Bolognese Pasta |
| sku-creamy-mushroom-pasta | 奶油蘑菇意面 | Creamy Mushroom Pasta |
| sku-japanese-squid-rice | 日式鱿鱼炒饭 | Japanese Squid Fried Rice |
| sku-angus-beef-burger | 安格斯牛肉汉堡 | Angus Beef Burger |

### 7.3 snacks 6

| id | 中文 | 英文 |
|---|---|---|
| sku-crispy-potato | 香酥土豆块 | Crispy Potato Cubes |
| sku-sweet-potato-fries | 原切红薯条 | Cut Sweet Potato Fries |
| sku-golden-cod | 黄金鳕鱼排 | Golden Cod Fillet |
| sku-golden-shrimp | 黄金凤尾虾 | Golden Phoenix Shrimp |
| sku-thai-chicken-wing | 泰式香茅鸡翅根 | Thai Lemongrass Wing |
| sku-chicken-bites | 鸡肉锅巴 | Chicken Crispy Bites |

### 7.4 mains 4

| id | 中文 | 英文 |
|---|---|---|
| sku-italian-roast-chicken | 意式香草烤鸡 | Italian Herb Roast Chicken |
| sku-german-pork-knuckle | 德式脆皮猪肘 | German Crispy Pork Knuckle |
| sku-american-bbq-ribs | 美式炭烤猪肋排 | American BBQ Pork Ribs |
| sku-german-classic-platter | 德国经典拼盘 | German Classic Platter |

### 7.5 chinpapa 8(7 复用 + 1 独有)

⚠️ chinpapa 子页 SKU 多数复用 staples,id 加 `-cp` 后缀。

| id | 中文 | 英文 | 来源 |
|---|---|---|---|
| sku-black-pepper-beef-pizza | 黑椒牛肉披萨 | Black Pepper Beef Pizza | 独有 |
| sku-wagyu-pizza | 和牛肉酱披萨(儿童版) | Wagyu Bolognese Pizza | 独有 |
| sku-black-truffle-pizza-kids | 黑松露披萨(儿童版) | Black Truffle Pizza | 复用 sku-black-truffle-pizza |
| sku-cheese-beef-roll-cp | 芝士牛肉卷 | Cheese Beef Roll | 复用 sku-cheese-beef-roll |
| sku-cheese-beef-patty-cp | 芝士牛肉饼 | Cheese Beef Quesadilla | 复用 sku-cheese-beef-patty |
| sku-classic-bolognese-cp | 古法肉酱意面 | Classic Bolognese Pasta | 复用 sku-classic-bolognese |
| sku-italian-mini-chicken | 意式香草萌萌鸡 | Italian Herb Mini Chicken | 复用 sku-italian-roast-chicken 视觉 |
| sku-fermented-chili | 健康发酵辣椒 | Healthy Fermented Chili | 独有 |

---

## 八、卡片设计系统(W11 锁定 · sauce-card 22 色系)

### 8.1 sauce-card 通用结构(全站 5 产品子页 + chinpapa 统一)

```html
<a id="sku-XXX" class="sauce-card" data-foodvio-cta="sample_request" data-product="...">
  <div class="sauce-swatch sw-XXX [has-image]">
    [<picture class="sauce-swatch-img">  ← W14 接图后才有
       <source type="image/webp" srcset="assets/products/sku-XXX.webp">
       <img src="assets/products/sku-XXX.jpg" alt="..." loading="lazy">
    </picture>]
    <div class="badge">⭐ Bestseller</div>
    <span class="emoji-overlay">🍕</span>  ← 图加载失败的 fallback
  </div>
  <div class="info">
    <h3>中文 / 英文</h3>
    <div class="name-en">English / 中文</div>
    <p class="desc">卖点描述...</p>
    <div class="spec">规格</div>
    <div class="tags"><span class="tag">tag1</span>...</div>
    <span class="view-link">申请样品 →</span>
  </div>
</a>
```

### 8.2 22 色系 swatch(W11 锁定)

| swatch class | 渐变 | 适用 SKU |
|---|---|---|
| **酱料**(W11 老版 sauce-XXX,sauces 18 卡用)| | |
| sauce-tomato | #D84040 → #A92020 | 番茄牛肉酱 |
| sauce-basil | #5A8F3B → #2F5920 | 罗勒青酱 |
| sauce-bacon | #3A3A3A → #1A1A1A | 培根黑椒 |
| sauce-gochu | #C72D1F → #801515 | 韩式辣酱 |
| ...(共 18 色,详见 products-sauces-v62.html CSS) | | |
| **食物色系**(W11 新版 sw-XXX,4 子页用)| | |
| sw-pizza-truffle | #4A3520 → #1A0F08 | 黑松露披萨 |
| sw-pizza-meat | #8B3A1F → #4A1C0E | 肉食炸弹 / 黑椒牛肉 |
| sw-pizza-hawaiian | #F5A623 → #C9711A | 夏威夷披萨 |
| sw-pizza-wagyu | #B33232 → #6E1C1C | 和牛肉酱披萨 |
| sw-pizza-durian | #D9C247 → #8F7E2A | 榴莲披萨 |
| sw-quesadilla | #C28828 → #6E4A14 | 芝士牛肉饼 |
| sw-burrito | #B87841 → #6E4422 | 芝士牛肉卷 |
| sw-pasta-bolognese | #C13A2A → #75180E | 古法肉酱意面 |
| sw-pasta-cream | #E8D9A9 → #A89262 | 奶油蘑菇意面 |
| sw-fried-rice | #D9B670 → #8B6F30 | 日式鱿鱼炒饭 |
| sw-burger | #6B4423 → #3E2712 | 安格斯汉堡 |
| sw-potato | #E8B458 → #A87B22 | 香酥土豆块 |
| sw-sweet-potato | #D9722E → #8F3F10 | 原切红薯条 |
| sw-cod | #E8C898 → #A8884F | 黄金鳕鱼排 |
| sw-shrimp | #F0996B → #B0552C | 黄金凤尾虾 |
| sw-chicken-thai | #D9923A → #8B5614 | 泰式香茅鸡翅根 |
| sw-chicken-bite | #C28233 → #75481A | 鸡肉锅巴 |
| sw-roast-chicken | #B8762E → #6E3F10 | 意式烤鸡 / 萌萌鸡 |
| sw-pork-knuckle | #8B4A1F → #4A2410 | 德式猪肘 |
| sw-bbq-ribs | #8C2A1F → #4A1009 | 美式肋排 |
| sw-sausage-platter | #6F3A1F → #3F1E0E | 德国香肠拼盘 |
| sw-fermented-chili | #B83232 → #6E1818 | 健康发酵辣椒 |

### 8.3 接图模式(W14 锁定)

**优雅降级三层**:
1. 真实产品图(WebP + JPG 双格式)
2. CSS 渐变色块(sw-XXX)— 图加载失败的 fallback
3. emoji-overlay — 兜底视觉

`<picture>` 标签:
```html
<picture class="sauce-swatch-img">
  <source type="image/webp" srcset="assets/products/sku-XXX.webp">
  <img src="assets/products/sku-XXX.jpg" alt="..." loading="lazy">
</picture>
```

**WebP 比 JPG 小 22%**,Chrome/Safari 14+ 自动选 WebP,老浏览器 fallback JPG。

---

## 九、移动端规范(W12-W13 锁定)

### 9.1 字号系统(W13 对标全球食品品牌)

| 元素 | 桌面 | ≤768px | ≤520px | ≤380px |
|---|---|---|---|---|
| 首页 hero H1 | clamp(40, 7vw, 96) | clamp(34, 9vw, 56) | clamp(30, 8vw, 44) | clamp(26, 7.5vw, 36) |
| 子页 hero H1 | clamp(38, 5vw, 64) | (默认) | clamp(26, 6.5vw, 36) | (默认) |
| section h2 | clamp(26, 3.2vw, 38) | (默认) | clamp(22, 5.2vw, 28) | (默认) |
| sauce-card h3 | 18px | 17px | 16px | 15px |
| sauce-card desc | 13px | 13px | 13px | 13px |
| sauce-card spec | 12px | 12px | 11px | (默认) |
| sauce-card tag | 10px | 11px | 10px | (默认) |
| sauce-card view-link | 12px | 13px | 12px | (默认) |
| nav-drawer-link | - | 16px | (默认) | (默认) |

### 9.2 间距系统(W13 收紧 30%)

- `section.py-12`:桌面 48px → 手机 32px
- `section.py-16`:桌面 64px → 手机 40px

### 9.3 swatch 比例(W13 调整)

- 桌面:4/3
- 手机 ≤768px:**5/3**(W12 用 16/9 太扁,W13 改 5/3 协调)

### 9.4 首页 4 品类矩阵手机端(W12 决策)

- 每品类只显 2 张卡(隐藏 nth-child(3) (4))
- 每品类底部加全宽"查看全部"大按钮(`.ps-more-mobile`)

### 9.5 hero 极简(W12 决策)

桌面端 hero 元素:
- H1 主标题
- 英文副标题
- 主 CTA(红色按钮)
- ghost 链接(For international partners)
- scroll hint

**手机端隐藏**:
- ghost 链接(`hidden md:block`)
- scroll hint(`hidden md:block`)
- 间距收紧(mt-12 → 24px,mt-14 → 32px,mt-8 → 16px)

---

## 十、当前接图状态(W14-W17 累积)

| 类目 | 子页接图 | 首页接图 | 产品主页接图 |
|---|---|---|---|
| sauces 18 | 18/18 ✅ | 3/4(1 无 SKU) | 3/4 |
| staples 11 | 4/11 | 4/4 | 4/5(1 无图) |
| snacks 6 | 4/6 | 4/4 | 4/4 |
| mains 4 | 4/4 ✅ | 4/4 ✅ | 4/4 |
| chinpapa 8 | 6/8 | (无首页矩阵) | (无主页矩阵) |

**总:34 个独立产品图文件 + 2 张 chinpapa 复用版(.kids/.mini-chicken),共 36 张 jpg + 36 张 webp**

### 缺图清单(13 个 SKU 需要补)

**主食 7**:meat-bomb-pizza / hawaiian-pizza / wagyu-bolognese-pizza / durian-pizza / cheese-beef-roll / creamy-mushroom-pasta / angus-beef-burger

**小食 2**:golden-shrimp / thai-chicken-wing

**chinpapa 2**:black-pepper-beef-pizza / fermented-chili

**首页酱料 1**:烟熏彩椒酱(W11 没建对应 SKU 库,只在首页有这张卡)
**产品主页 1**:芝士牛肉卷(W14 没接,W15 也没接)

### 第二批待接(工厂/原产地/国家)

参考 `W15-IMAGE-NAMING-GUIDE-BATCH2.md`:
- 工厂图 3-12 张(赣州/张家口/怀柔)
- 原产地图 5-25 张(赣南/内蒙/五常/新疆/云南)
- 国家风情图 5-25 张(意/西/韩/日/墨)
- **合计 13-62 张**

---

## 十一、技术栈 / 部署(W6-W9 锁定 · 不变)

| 项 | 选型 |
|---|---|
| 静态站托管 | GitHub Pages |
| 仓库 | https://github.com/jeromechen01/foodvio-website |
| 上线域名 | https://jeromechen01.github.io/foodvio-website/ |
| Backend | Supabase(Foodvio-Website 项目)|
| CSS | Tailwind CDN |
| 字体 | Google Fonts |
| 客户端 | claude.ai(Jerome 在首尔 iPad 操作) |

---

## 十二、CTA 体系(W9 锁定 · 不变)

`data-foodvio-cta` 6 类:
- `sample_request` — 申请样品
- `general_contact` — 普通联系
- `coffee_solution` — 咖啡馆方案
- `kitchen_solution` — 轻后厨方案
- `chain_solution` — 连锁方案
- `industrial_solution` — 团餐方案

所有 CTA 通过 `lead-capture.js` 收集到 Supabase。**W9 修复了 preventDefault bug**(W10-fix 全面闭环 290+ dead link)。

---

## 十三、法律合规(W9 锁定)

- PIPL(中国个人信息保护法)+ GDPR 双语合规
- 6 法律页:privacy(zh/en)/ terms(zh/en)/ cookie(zh/en)
- 同意勾选 + cookie-banner.js
- Supabase 字段:consent_given / consent_timestamp / ip_country
- **公安联网备案核查**:待陈总在 https://www.beian.gov.cn 操作

---

## 十四、W17 后 PENDING(下一阶段)

### 业务任务
- ⏳ Jerome 跑 Supabase migration SQL(W9 法律合规字段)
- ⏳ 法务审核 6 法律 HTML
- ⏳ 公安联网备案核查
- ⏳ 拍 13 张缺图 SKU(详见十、缺图清单)
- ⏳ 拍 chinpapa 2 张真图替换(black-pepper-beef-pizza / fermented-chili)
- ⏳ 第二批工厂/原产地/国家图(13-62 张,见 W15-IMAGE-NAMING-GUIDE-BATCH2.md)

### 技术任务
- ⏳ for-online-sales-v62.html 决定是否最终下线(W16 暂保留)
- ⏳ 工厂/原产地/国家子页 hero 接图(技术方案待定)

### 知识沉淀
- ✅ **本文档(brief-locked-V3.0)+ W10-W17 phase3 handoff** ← W17 同步完成
- ⏳ 第二批资产接入后再升 V3.1

---

## 十五、核心工作模式

### Jerome ↔ Claude 协作

- Jerome 在首尔,iPad 操作,0 传统编码经验,**vibe code** + git push 上线
- 中英双语,务实直接,期待诚实推回
- 验收链路:陈总 → Jerome → Claude

### 关键交付物流转

```
我(Claude)→ zip + 报告 → Jerome 下载 → 解压 → git push → GitHub Pages → 陈总验收
```

### 文件版本管理

- 累积 zip:Foodvio-website-W9 / W10 / W10-fix / W10-fix2 / W10-fix3 / W11 / W12 / W13 / W13b / W14 / W15 / W15b / W16 / W17(14 个)
- 每周更新 brief 锁定项(本文档)
- 资产管线工具:foodvio-asset-pipeline-v1.zip(给 Jerome 本地用)

---

**文档版本**:V3.0
**整理日期**:2026-05-14
**下次更新**:V3.1(第二批工厂/原产地/国家图接入完成时)
**关联文档**:
- foodvio-V62-w10-w17-handoff_phase3.md(本周同步新建,11 周里程碑总集)
- 各次 CHANGE-REPORT.md(W10 → W17,共 14 份)
- W15-IMAGE-NAMING-GUIDE-BATCH2.md(第二批资产命名规范)
