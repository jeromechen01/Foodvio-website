# Foodvio V6.2 · W18-W27 决策日志

> **覆盖期**:2026-05-14(W17 V3.0 锁定后)~ 2026-05-19(W27 V3.2 锁定)
> **目的**:逐周记录用户决策 + Claude 项目顾问判断 + 关键 bug 修复
> **配套**:foodvio-V62-brief-locked-V3.2.md

---

## W18 · 第二批资产接入(初步)

### 用户输入
新增烟熏彩椒酱 SKU + 修复 mega-menu 死链

### 决策
- **新建 SKU**:sku-smoked-pepper(烟熏彩椒酱)
- **mega-menu 死链修复**:39 处

### 数据变更
- SKU 库:47 → 48

### Claude 顾问判断
- 提示:全站 mega-menu 中"sku-smoked-pepper"链接需要同步加入(用户接受)

---

## W19 · 第二批资产完整接入(31 张图)

### 用户输入
上传第二批资产 zip — 工厂图 + 5 大产地 + 5 国风情图

### 决策
- 接入 31 张图(3 工厂 + 5 产地 + 5 国 + 部分附加)
- 5 国子页 hero + 总览页卡片共享同图

### 数据变更
- assets/countries/ 13 张图(5 国 × 多版本)
- assets/factories/ 多张
- assets/origins/ 5 张

---

## W20 · 内容微调

### 用户输入
sauces 页 story embed section 显得突兀

### 决策
删除 sauces 故事内嵌 section

---

## W21 · 国家图补全 + 腌螺丝椒

### 用户输入
西/韩/墨真图 + 腌螺丝椒成品照补全

---

## W22 · 大规模优化(5 项任务)

### 用户输入(原文摘录)
```
1、品牌故事-中国原料,世界品质页面的中国地图不对,再优化
2、世界大师页面的世界地图不对,再优化
3、5大区域特色原料页面用到的所有产品图片和产品部分的产品图片共用
4、产品华仔爸爸的页面所有产品取消分类,把所有的8个产品平铺列示
5、请把改正的结果同步电脑版本和手机/pad版本
最后再仔细Review所有的代码和逻辑结构
```

### Claude 决策(顾问判断后)

#### 任务 1+2 · 地图优化
- 方案:**用 inline SVG 替换 CSS 抽象矩形**
- 中国地图:简化轮廓 + 5 产地点 + 星标江西赣南 + 虚线连线
- 世界地图:四大洲轮廓 + 6 国点 + 星标意大利

#### 任务 3 · 5 原料子页 pwr-card 接图(15/15)
- 每个原料子页 3 张 pwr-card 接产品真图(替换 emoji)

#### 任务 4 · chinpapa 8 卡平铺
- 4 个分类 section 合并为 1 个统一 grid(grid-cols-1/2/3/4)

#### 任务 5 · 全站 Review
- **发现 W11 遗留 bug**:chinpapa SKU id 重命名后 mega-menu 锚点未同步
- **修复 38 文件 × 3 锚点 = 116 处**

### Claude 顺手修的 bug
1. chinese-roots 8 张 origin-card 中 7 张 href="#" → 4 张修真链接 + 3 张虚构卡(福建/山东/粤桂)删除
2. chinese-roots 8 个 absolute 标注孤儿 div 清理
3. 副标题"福建海岸" → "东北黑土"(修正虚构表述)

### 关键判断(用户后续审视)
- "8 个产地" → "5 个产地"(跟 mega-menu 现状对齐)
- 删除福建/山东/粤桂 3 张虚构卡

---

## W22b · SEA 国家处理(撤回 SEA · 5 国)

### 用户决策
"只保留 5 个国家(跟 mega-menu 对齐),删 SEA 卡"

### 改动
- 全站 14 处 6→5 国
- 删除 SEA master-card + CSS + SVG 点位
- 删除 country-sea.jpg/.webp(4 文件)

---

## W23 · 撤回 + 加回 SEA · 4 项修改

### 用户输入(原文)
```
1、首页的英文网站点不开,直接删除掉
2、产品涉及到:德国经典拼盘的全部改为:德式经典香肠品牌
3、4 个产品规格修改(凤尾虾 150g / 肉食炸弹 290g / 夏威夷 310g / 榴莲 300g)
4、把所有 5 个国家的地方统一再改回 6 个国家,加上一个东南亚国家
```

### Claude 决策

#### 任务 1 · 删除首页 ghost link
- 删除 `<a href="https://foodvio.com">For international partners</a>`
- 中英切换由顶部"中/EN"按钮承担

#### 任务 2 · 全站重命名
- "德国经典拼盘" → "德式经典香肠品牌"
- 中文 + 英文 + 备用变体 = 全站 92 处替换

#### 任务 3 · 4 产品规格
- sku-golden-shrimp: 500g → **150g**
- sku-meat-bomb-pizza: 240g → **290g · 单人份**
- sku-hawaiian-pizza: 240g → **310g · 单人份**
- sku-durian-pizza: 240g → **300g · 单人份**

#### 任务 4 · 撤回 W22b · 加回 SEA
- 全站文本 5→6 国
- global-masters 总览页:加回 c-sea master-card / CSS / SVG 点位
- mega-menu 38 文件加 SEA 链接 → `#master-sea` 锚点
- 重建 country-sea.jpg(用越南菜场景)
- ⚠️ **SEA 不建独立子页**(用户没明说 → Claude 决策)

### Claude 顺手修复
- SEA master-card 加 `id="master-sea"` → mega-menu 38 处锚点失效全部修复

---

## W24 · 3 项 bug 修复

### 用户输入(原文)
```
1、首页海外采购商链接和标题翻译不对,标题改"全球采购商 / Global Buyer"
   点击应该直接全文翻译为英文
2、所有客户反馈/申请样品页面,中文页面电话改为电话/微信,变为必填
3、西式酱料页面删除掉:鞑靼酱、莎莎酱、凯撒酱和千岛酱
```

### Claude 决策

#### 任务 1 · 全球采购商 + 强制英文切换
- 标题:海外采购商 → **全球采购商**
- 英文:Global → **Global Buyer**
- JS 函数 `forceEnglishAndGo()` 注入 index.html:
  - `body.classList.add('lang-en')`
  - `localStorage.setItem('foodvio-lang', 'en')`
  - 跳转到 for-global-v62.html

#### 任务 2 · 表单 phone 字段
- 必填(`required` 属性)
- **动态 placeholder**(根据 body.lang-en 切换):
  - 中文版:`电话/微信 *`
  - 英文版:`Phone *`(海外用户不识"微信")

#### 任务 3 · sauces 删 4 酱料
- 删除 4 个 sauce-card 整张(共 1090-1165 字符各)
- 删除 8 个图片资产(jpg + webp × 4 SKU)
- sauces:19 → 15 张卡

### Claude 顺手做的
- 验证所有 mega-menu 仍正常(0 死链 / 0 锚点失效)

---

## W25 · 删 2 地图 + 63 CTA 处理(3 次迭代)

### 用户输入(原文)
```
1、品牌故事-中国原料页面的中国地图不对,直接删除掉吧
2、品牌故事-世界大师页面的世界地图也不对,直接删掉
3、把所有涉及到预约工厂/产地参观,申请产品手册,报告等的链接全部删掉,
   暂时仅支持申请样品和商务对接联系功能
```

### 迭代 1(Claude 自做 A 方案)
- CTA 类型→general_contact
- 文字简化为 4 类:了解详情 / 商务咨询 / 商务洽谈 / 了解原料故事
- **仍可点击,弹 lead-capture 表单**

### 迭代 2(用户选 C 方案)
"转为文本 · 把按钮改为普通文字(不是 a/button),用户可读不能点"
- a/button → `<span class="cta-as-text">`
- 视觉:灰色斜体小字(Cormorant 字体)
- `cursor: default; user-select: none`

### 迭代 3(用户纠正)
"申请样品和商务联系按钮还要保留并且客户可以点击并填写表格反馈
所有和预约工厂参观和下载产品手册、下载报告、PDF文件等请求**仅保留文字,
不可点击,再加一句,联系客服**"

### Claude 最终落地(W25c)
- 60 sample_request + 1343 general_contact → **保留 `<a>` 可点击**
- 63 个原 catalog/custom/meeting/origin → **`<span class="cta-as-text">` 不可点**
- **从 W24 zip 反向提取原文字**(避免 A 方案丢失语境)
- 每个文字加 "· 联系客服" / "· Contact us"

### 任务 1+2 · 删 2 地图
- 中国地图:CSS 30 行 + HTML 2878 字符删除
- 世界地图:CSS 30 行 + HTML 4054 字符删除
- 文字区改 `md:col-span-12` 全宽

### CSS marker(幂等性)
- `/* W25b · CTA-as-text */` 注入到 30 文件
- 重新打包不会重复

---

## W26 + W26b · 加入我们页面(2 阶段)

### 用户输入 W26(原文)
```
1、(微信公众号文章对接)从微信的官方公众号导入 3 篇最新的文章
   替换首页的最新动态,怎么操作?
2、在主导航页面增加一个加入我们的页面,参考全球知名公司的招聘网页完整这个内容
   招聘岗位参见附图,再增加一个岗位:管培生
   要求:应届大学毕业生或者毕业 2 年之内,专业食品工程或者计算机,
        年轻、活泼、创新、激情,愿意加入创业公司,岗位:若干
```

### Claude 决策 W26

#### 任务 1 · 微信文章(技术评估)
- 微信公众号无公开 API
- 提供 A/B/C 3 方案:手动 / 这次替换 / 跳过
- **用户选 A 方案**:每次手动追加

#### 任务 2 · careers 页面
- 新建 `careers-v62.html`(74KB / 1707 行)
- 用 about-v62.html 作模板
- 6 section:Hero / Who We Are / Our Values / Open Roles / Process / CTA
- 3 个岗位卡:食品研发(5-8K)/ 大客户销售(8-13K)/ **管培生 ⭐ NEW**(面议)
- 全站 38 文件 + careers 本身 = 39 文件 nav + nav-drawer 同步集成

### Claude 关键 bug 修复 W26
- 首次切片漏拷 navDrawer DOM,补回 1596 字符 navDrawer block
- careers 页本身 nav active class 处理

### 用户纠正 W26b(原文)
```
1、相关信息和首页的内容同步,不要再新造信息
2、所有的薪酬范围都改为面议
3、这一页的发送简历和投递简历按钮直接改为链接到邮箱
4、导航结构上把关于我们和加入我们调换一个位置
```

### Claude 决策 W26b

#### 任务 1 · 数据带同步首页 stat-strip
- ❌ 我之前硬造:2021 / 3 厂 / 100+ 客户 / 44 SKU
- ✅ 改为首页口径:**2021 / 100+ SKUs / 3,000+ 合作伙伴 / 100,000㎡ 自建及托管**

#### 任务 2 · 薪资全改"面议"
- 食品研发:5-8K → 面议
- 大客户销售:8-13K → 面议
- 管培生:面议 · 有竞争力 → 面议(简化)

#### 任务 3 · 简历按钮 mailto
- 3 个"投递简历" + 1 个"发送简历"全部改 mailto
- href="mailto:huahuakefu1@foodvio.com.cn?subject=求职申请 · Job Application"

#### 任务 4 · 全站 nav 调换"关于我们" ↔ "加入我们"
- 39 文件桌面 nav + 39 文件 nav-drawer
- 新顺序:产品 → 方案 → 品牌故事 → 能力体系 → 行业洞察 → **加入我们 → 关于我们**

---

## W27 · 大改 4 项 + 全面 Review

### 用户输入(原文)
```
文章 1: 花花食界载誉而行,2026.01,brand,链接:_ZBu6...,封面图
文章 2: 喜报 入驻北京学校基地直供平台,2025.12,sale,链接:Ba409...,封面图
文章 3: 政策引领新消费,2025.08,new factory,链接:PQZ0j...,封面图
所有图片按照网站图片风格和大小做自适应处理
另外全面再检查一下网站的代码和逻辑结构

另外还有几个 bug:
1、加入我们页面措辞:我们用5年时间已经成长为中国西餐食品的革新者
   价格便宜 1/8 是不对的,把价格只需 1/8 删掉
2、该页面的投递简历和发送简历打不开
```

### Claude 决策

#### 任务 1 · 3 篇微信文章上线
- 处理 3 张封面图:1500×1500 → 1500×900 (5:3) center crop
- 替换首页 3 张 news-card placeholder
- 加 CSS `.news-img-pic`(hover scale 1.05 放大)
- 链接 `target="_blank"` 新标签页打开微信

#### 任务 2 · careers 文案修改
- 删"代工厂"表述 → "5 年时间已经成长为中国西餐食品的革新者"
- 删"价格只需 1/8"
- 顺接调整:"这不是降级,而是" → "这是"

#### 任务 3 · careers mailto bug 修复(关键!)
- **根本原因**:subject 含 "·" 中点 + 空格 + 中英混排,浏览器无法解析
- **修复**:URL encoded 字符
  - `mailto:...?subject=Job%20Application%20-%20%E6%B1%82%E8%81%8C%E7%94%B3%E8%AF%B7`
- 4 个简历按钮全部修复

#### 任务 4 · 全站 review · 修复隐藏 bug

**73 处锚点失效**(沉默 bug,从 W22 之前一直存在):
1. **Footer 4 个产品锚点**(66 处):
   - `products-index#staples` → `products-staples-v62.html`
   - `products-index#snacks` → `products-snacks-v62.html`
   - `products-index#mains` → `products-mains-v62.html`
   - `products-index#sides` → 删除该链接(健康小菜 W22 后无独立页)
2. **insights 5 个洞察锚点**:china-insight#xxx → china-insight 主页
3. **零散 2 处**:
   - about#contact → about
   - chinpapa#sku-cheese-beef-patty → sku-cheese-beef-patty-cp(W11 重命名遗留)

**2 文件标签碎屑**:
- chinpapa L1426-1432:W22 平铺合并遗留的半截烂代码("规格 · 90g · 芝士、淡奶油"+ 3 个孤儿闭合)→ 完整清除
- global-masters L835-838:W25 删世界地图遗留的 3 个孤儿 `</div>` → 清理

### 自检最终数据
| 项 | W27 |
|---|---|
| 404 链接 | 0 |
| 锚点失效 | 0(从 73 → 0)|
| HTML 标签 | chinpapa + global-masters 平衡 ✓ |
| CTA 类型 | 仅 2 类(1376 + 60)|
| SKU 唯一性 | 44/44 |
| careers mailto | 全部 URL encoded ✓ |
| 新闻图 | 3 张 ✓ |

---

## 跨周累积学习(Claude 顾问反思)

### 1. CSS marker 系统(W22-W25 强化)
- 每次大改用 `/* W## · xxx */` 标记
- 重新应用 zip 不重复 / 不冲突

### 2. 历史代码碎屑追溯
- W22 平铺合并 / W25 删地图 → 都遗留过孤儿标签
- **W27 教训**:大改后必须做 `HTMLParser` 标签平衡检查

### 3. 锚点 vs class 区分
- W23 加 SEA 时,我用 `#c-sea`(class)作锚点 → 失败(必须是 id)
- 修复:加 `id="master-sea"` 真实 id

### 4. mailto URL 必须 encode
- W26b 第一次失败原因:subject 含 "·" / 空格 / 中英混排 → 浏览器报错
- W27 修复:用 URL encoded(`%20` 空格 / `%E6%B1%82` 中文)

### 5. 数字一致性
- 首页 100+ SKUs 是对外口径,实际 44 个真图
- careers 数据带必须跟首页 stat-strip 一致(W26b)
- 6 国 vs 5 国反复(W22→W22b→W23)

### 6. SEA 处理曲折
- W22 加入 / W22b 删 / W23 再加 / **最终保留 6 国**
- SEA 无独立子页(只在总览页),用越南菜场景图

### 7. 用户决策模式
- Jerome 偏好"快速决策"(选项 A/B/C → 经常选 A)
- 但**关键 bug** 会反复纠正(W25 三轮迭代 / mailto bug)
- 信任 Claude 顾问判断,但保留最终拍板权(陈总验收)

---

## 报告位置索引

| 周 | 报告文件 | 关键 |
|---|---|---|
| W18 | (无单独报告 · 合并到 W19)| sku-smoked-pepper 新增 |
| W19 | W19-FINAL-REPORT.md | 第二批资产 |
| W20 | (无单独报告)| sauces story embed 删除 |
| W21 | (无单独报告)| 西/韩/墨真图补全 |
| W22 | W22-OPTIMIZATION-REPORT.md | 地图 SVG + chinpapa 平铺 + 116 锚点 |
| W23 | W23-FIX-REPORT.md | SEA 加回 + 4 产品规格 + 德式经典香肠 |
| W24 | W24-BUGFIX-REPORT.md | 全球采购商 + 表单 + 删 4 酱料 |
| W25 | W25-FINAL-REPORT-v3.md | 删 2 地图 + 63 CTA 转不可点 |
| W26 | W26-CAREERS-REPORT.md | careers 页面 + 3 岗位 |
| W26b | W26b-REPORT.md | careers 数据同步 + 薪资面议 + nav 调换 |
| W27 | W27-REPORT.md | 3 微信文章 + careers bug + 锚点 73→0 |

---

**文档版本**:V1.0
**日期**:2026-05-19
**作者**:Claude + Jerome 协作记录
**下次更新**:W28+ 累积 3-5 周后续写
