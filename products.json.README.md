# Foodvio 产品数据 JSON · 使用说明 (v1.0)

> **方案 A1 极简版** · 数据 schema + 文档 · 前端不动 · 你随时改 JSON 看一下

## 1. 总览

这个 `products.json` 文件是**全部产品数据的单一真相源**。Foodvio 5 大产品分类(西式酱料/西式主食/炸品小食/主菜大餐/华仔爸爸)+ 33 个 SKU 全部在这一个文件里。

**当前阶段**:JSON 文件已生成,前端 HTML **暂时还是手写的静态版本**(没有动态读 JSON)。这一版主要让你**看清楚数据结构、提前规划字段、检验内容完整性**。

**下一阶段**(可选,A2 版):写一个 JS 脚本让前端动态读 JSON 渲染产品卡——这样改 JSON 就自动更新前端。

## 2. 数据结构

### 顶层字段

| 字段 | 含义 |
|---|---|
| `_schema_version` | schema 版本号(改结构时升)|
| `_generated_at` | 这个 JSON 文件生成日期 |
| `_notes` | 给人看的说明 |
| `categories` | 5 大产品分类(数组)|
| `products` | 33 个 SKU(数组)|

### 单个 category 字段

```json
{
  "id": "sauces",                    // 唯一 ID,也是页面 URL 参数
  "brand": "foodvio",                // foodvio | chinpapa
  "icon": "🥫",                       // emoji 图标
  "name_zh": "西式酱料",
  "name_en": "Sauces",
  "page_url": "products-sauces-v62.html",  // 对应前端页面
  "tagline_zh": "意式 / 美式 / 东南亚 / 日韩 4 大风味体系",
  "tagline_en": "4 flavor families",
  "sku_count": 18,                   // 该分类下 SKU 总数(展示用)
  "sort_order": 1                    // 排序
}
```

### 单个 product 字段

```json
{
  "id": "tomato-bolognese",          // 唯一 SKU ID,也是 URL 锚点(#sku-xxx)
  "category_id": "sauces",           // 对应 categories[].id
  "brand": "foodvio",                // foodvio | chinpapa
  "name_zh": "番茄牛肉酱",
  "name_en": "Tomato Bolognese",
  "emoji_placeholder": "🥫",          // 没真图时的 emoji 占位
  "image": null,                     // 真实图片路径,有了之后填这里
  "tagline_zh": "意式经典 · 慢炖牛肉风味",
  "tagline_en": "Italian classic · slow-simmered beef",
  "specs": {                         // 规格(B2B 关心的核心信息)
    "weight": "1kg / 5kg",
    "shelf_life": "12 个月",
    "moq": "* 待定",
    "shu": "30,000-50,000"           // 仅辣椒类有
  },
  "highlights_zh": ["新疆加工番茄", "慢炖工艺锁住肉香"],
  "highlights_en": ["Xinjiang tomatoes", "Slow-simmered for depth"],
  "scenarios": ["foodservice", "industrial"],  // 适用场景
  "featured": true,                  // 是否首页/索引页主推
  "sort_order": 1,                   // 同分类内排序
  "status": "active",                // active | draft | discontinued

  // 仅华仔爸爸 SKU 有的字段:
  "kid_friendly": true,
  "tags": ["HOT", "FEATURED", "NEW", "HEALTHY"]
}
```

### 字段值约定

| 字段 | 允许值 | 说明 |
|---|---|---|
| `brand` | `foodvio` / `chinpapa` | 双品牌区分 |
| `status` | `active` / `draft` / `discontinued` | active = 正式上架 / draft = 草稿(待补内容) |
| `scenarios` | `foodservice` / `industrial` / `retail` / `global` / `online` | 适用客户场景 |
| `featured` | `true` / `false` | true = 首页/索引页主推 |
| `tags` | `HOT` / `NEW` / `FEATURED` / `HEALTHY` 等 | 标签云,展示在卡片右上角 |
| `image` | `null` 或图片路径(如 `images/products/tomato-bolognese.jpg`)| 暂时全 null,后期补 |

### 占位符约定

- `"* 待定"` / `"* 待补充"` / `"* TBD"`:还没写但要补的位
- `null`:这个字段暂时为空(图片、规格等)

## 3. 你怎么改这个文件

### 场景 1:改一个产品的卖点

打开 `products.json`,找到对应 SKU(用 Ctrl+F 搜中文名),改 `tagline_zh` / `tagline_en` / `highlights_zh` / `highlights_en`,**保存,推到 GitHub Pages → 5 分钟前端部署成功 → 没生效**。

⚠️ 当前是 A1 阶段,**前端还没动态读 JSON**。这一版仅作为数据规划+检查用。要让 JSON 改动直接生效需要做 A2 版(下一阶段)。

### 场景 2:加一个新 SKU

```json
// 在 products[] 数组里加一项:
{
  "id": "new-pizza-id",          // 唯一 ID,小写连字符
  "category_id": "staples",
  "brand": "foodvio",
  "name_zh": "新披萨",
  "name_en": "New Pizza",
  "emoji_placeholder": "🍕",
  "image": null,
  "tagline_zh": "...",
  "tagline_en": "...",
  "specs": {},
  "highlights_zh": [],
  "highlights_en": [],
  "scenarios": [],
  "featured": false,
  "sort_order": 12,
  "status": "draft"
}
```

然后**告诉我"加了个新 SKU 'new-pizza-id'"**,我把它接到对应前端页(staples 三级页 + mega-menu)。

### 场景 3:下架一个产品

把 `status` 改成 `discontinued`。下次我做 A2 版动态渲染时,前端会自动隐藏它。

## 4. JSON 编辑注意事项

- **逗号**:每个键值对之间要有逗号,**最后一个之后不要有逗号**(JSON 严格语法)
- **引号**:中文/英文都用**英文双引号** `"..."`
- **特殊字符**:中文里如果有英文双引号,要转义 → `\"`
- **校验**:改完粘贴到 https://jsonlint.com/ 验证一下,免得损坏文件

## 5. 后续路径

| 阶段 | 内容 | 工作量 |
|---|---|---|
| **现在(A1)** | products.json 已生成,前端静态 | ✅ 完成 |
| **A2 · 动态渲染** | 写 JS 脚本读 JSON 渲染前端,改 JSON 即生效 | 1-2 个会话 |
| **未来 · Supabase** | JSON 数据迁到 Supabase 表,开发简单后台 | 几个会话 |
| **更未来 · 完整 CMS** | Strapi/Sanity/Directus,图形化后台 | 1-2 个月 |

升级路径**线性**:今天 JSON,明天 Supabase,后天 CMS。**前面做的不浪费**。

## 6. 当前 33 SKU 状态(截至 2026-05-02)

| 分类 | SKU 数 | active | draft | 完整内容率 |
|---|---|---|---|---|
| 西式酱料 | 4 | 4 | 0 | 100% |
| 西式主食 | 11 | 0 | 11 | 0% — 全 placeholder |
| 炸品小食 | 6 | 0 | 6 | 0% — 全 placeholder |
| 主菜大餐 | 4 | 0 | 4 | 0% — 全 placeholder |
| 华仔爸爸 | 8 | 4 | 4 | 50% — 披萨 3 + 健康发酵辣椒 1 有真实卖点 |
| **合计** | **33** | **8** | **25** | **24%** |

## 7. 安全提示

⚠️ `products.json` 是**前端可见文件**——任何人 F12 都能看到内容。**不要在这里放敏感字段**,例如:
- 真实成本/毛利
- 大客户合同价
- 内部员工名

适合放的字段:产品名、卖点、规格、MOQ、保质期、面向公众的客户场景。
