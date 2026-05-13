# Foodvio V6.2 · Brief 锁定项 V2(W9 后整合版)

> **文档目的**:整合 phase1 + phase2 + W9 的所有锁定项,作为**单一权威来源(Single Source of Truth)**。下次新对话时,优先读这个文档,再读历史 phase 文档作为参考。
> **整理日期**:2026-05-05
> **当前版本**:V2.0(W9 后整合)
> **下一版本**:V2.1(法律 V1.1 修订后) / V3.0(W10 SKU 补完后)
> **优先级**:本文档 > AMENDMENTS 文档 > phase1/2 原文

---

## 一、公司基础信息(不可变 brief)

| 项 | 值 |
|---|---|
| 公司全称 | 北京花花食界食品科技有限公司 |
| 创立日期 | 2021 年 8 月 |
| 总部地址 | 北京望京 SOHO T3A 1008 |
| 客服邮箱 | huahuakefu1@foodvio.com.cn |
| 客服电话 | 400-6879-568 |
| ICP 备案 | 京 ICP 备 2022025117 号-1 |
| SKU 总数 | 100+(实际网站列 33) |
| 服务客户 | 3000+ |
| 销售网络 | 全国 10 余个省市 |

---

## 二、品牌结构(W9 锁定:双品牌)

| 品牌 | 定位 | 网站状态 |
|---|---|---|
| 花花食界 Foodvio | B2B 西餐食品供应链品牌 | ✅ 主站 |
| 华仔爸爸 ChinnPaPa | B2C 儿童健康营养品牌 | ✅ 主站窗口页 / 未来独立站 |

**未来候选(暂不进站)**:
- 宁都州宴·米肆1295(客家菜)— 画册中提到的第三品牌,W9 决策暂不进站,留待陈总未来决策

---

## 三、Slogan / 视觉系统

### 3.1 Slogan

| 语种 | Slogan |
|---|---|
| 中文 | 花花食界 — 源自中国的专业西餐食品品牌 |
| 英文 | Foodvio — Western Cuisine. Chinese Roots. Global Palate. |

### 3.2 主色

| 色 | 值 |
|---|---|
| ink(墨绿,主体文字) | #0d2a1f |
| forest(深绿,主调) | #1B4332 |
| terra(陶土橙) | #E07A5F |
| rust(锈红,CTA) | #C73E3A |
| gold(暖金,强调) | #F5C82E |

### 3.3 辅色

| 色 | 值 |
|---|---|
| sage(鼠尾草绿) | #81B29A |
| sky(天蓝) | #4A90E2 |
| steel(钢蓝灰) | #4A6271 |
| cream(奶白) | #F5F1EA |
| paper(纸黄) | #FAF7F0 |

### 3.4 字体

| 用途 | 字体 |
|---|---|
| 中文 serif(标题) | Noto Serif SC |
| 中文 sans(正文) | Noto Sans SC |
| 英文 serif(标题/eyebrow) | Cormorant Garamond |
| 英文 sans(正文) | Inter |

### 3.5 Logo CSS 标准

```css
.brand-logo .zh{font-family:'Noto Serif SC',serif;font-weight:900;font-size:18px;letter-spacing:.08em;color:var(--forest);line-height:1.1;display:block}
.brand-logo .en{font-family:'Inter',sans-serif;font-weight:600;font-size:9.5px;letter-spacing:.46em;color:var(--forest);line-height:1;margin-top:4px;display:block;padding-right:.46em}
```

### 3.6 标题字号

`clamp(24px, 3vw, 36px)` — 跟产品矩阵分类标题统一

### 3.7 间距

`py-12 md:py-16`(48-64px) — 类 Apple 网站节奏
hero 保留 `py-24 md:py-36`

---

## 四、内容架构(W9 锁定)

### 4.1 5 大特色原料

| # | Emoji | 原料 + 产地 |
|---|---|---|
| 1 | 🌶️ | 赣南螺丝椒(江西) |
| 2 | 🍅🌾 | 番茄 + 高筋面粉(新疆) |
| 3 | 🐑 | 草原牛羊肉(内蒙古) |
| 4 | 🌾 | 五常大米(东北) |
| 5 | 🍄🌿 | 黑松露 + 迷迭香(云南) |

### 4.2 5 国大师(W9 锁定:意/西/韩/日/墨)

| # | 旗帜 | 国家 |
|---|---|---|
| 1 | 🇮🇹 | 意大利 |
| 2 | 🇪🇸 | 西班牙 |
| 3 | 🇰🇷 | 韩国 |
| 4 | 🇯🇵 | 日本 |
| 5 | 🇲🇽 | 墨西哥 |

> ⚠️ **重要**:此 5 国是 Story 子站叙事用。Capabilities R&D 6 国学艺事实(意/西/韩/日/东南亚/墨)是另一套口径,**两套并存**。

### 4.3 5 大中国洞察

| # | 洞察 |
|---|---|
| 1 | 口感(嚼劲/Q弹/爽脆) |
| 2 | 口味(辣度/咸度/复合调味曲线) |
| 3 | 颜色("色香味"以色第一) |
| 4 | 锅气(高温快炒带来的镬气) |
| 5 | 还原度(半成品加热后还原现做的程度) |

### 4.4 3 大工厂

| 工厂 | 面积 | 关键资质 |
|---|---|---|
| 江西赣州 | 6.66 万㎡ | 8 大类 SC + 螺丝椒/黄鸡产地 |
| 河北张家口 | 1.6 万㎡ | FDA + 6 条数字化产线 + 30+ 烘焙品类 |
| 北京怀柔 | (未明示) | 日本设计理念 + 自动化/钝酶/真空锁鲜 |

**口径**:近 10 万㎡ **自建及托管**生产空间(W9 锁定)

### 4.5 双品牌战略图

| 版本 | 用途 | 状态 |
|---|---|---|
| 2 叶版(花花食界 + 华仔爸爸) | ✅ 主站使用 | W9 已锁定 |
| 3 叶版(含宁都州宴) | 归档备用 | 暂不进站 |

---

## 五、产品 SKU 锁定(33 款)

### 5.1 SKU 总览

| 分类 | SKU 数 | 完整内容 | 待补 |
|---|---|---|---|
| 西式酱料 | 4 | 100% | — |
| 西式主食 | 11 | 0% | 25 个 draft 全空 |
| 炸品小食 | 6 | 0% | 同上 |
| 主菜大餐 | 4 | 0% | 同上 |
| 华仔爸爸 | 8 | 50% | 同上 |
| **合计** | **33** | **24%** | **25 SKU 待补** |

### 5.2 西式酱料(4 个主推 / 全部 18+ 款)

**🔒 W9 锁定**:**网站版**(罗勒松子青/烟熏彩椒)
- 番茄牛肉酱(画册有图 ✅)
- 奶油蘑菇酱(画册有图 ✅)
- 罗勒松子青酱(画册无图 ⚠️ 需摄影)
- 烟熏彩椒酱(画册无图 ⚠️ 需摄影)

**反转开关**:可临时降级为画册版(培根黑椒/黄咖喱)作为过渡

### 5.3 西式主食(11 SKU)

披萨 5:黑松露 / 肉食炸弹 / 夏威夷 / 和牛肉酱 / 榴莲
卷饼 2:芝士牛肉饼 / 芝士牛肉卷
意面 2:古法肉酱 / 奶油蘑菇
主食 2:日式鱿鱼炒饭 / 安格斯牛肉汉堡

### 5.4 炸品小食(6 SKU)

薯类 2:原切红薯条 / 香酥土豆块
海鲜 2:黄金鳕鱼排 / 黄金凤尾虾
禽类 2:泰式香茅鸡翅根 / 鸡肉锅巴

### 5.5 主菜大餐(4 SKU)

意式烤鸡 / 德式脆皮猪肘 / 美式炭烤猪肋排 / 德国经典拼盘

> ⚠️ **命名待统一**:画册写"德式香肠拼盘",网站写"德国经典拼盘"

### 5.6 华仔爸爸(8 SKU,5 分类)

披萨 3:黑椒牛肉(HOT) / 和牛肉酱(HOT) / 黑松露
主菜 1:美式炭烤猪肋排
意面炒饭 2:古法肉酱意面 / 日式鱿鱼炒饭
烤鸡 1:意式香草萌萌鸡(NEW)
健康小菜 1:健康发酵辣椒(FEATURED · HEALTHY)

### 5.7 画册新增 SKU(W9 决策:暂不上线)

候选 14+ 款:玛格丽特披萨 / 至尊披萨 / 蓝莓草莓披萨 / 培根黑椒意面 / 酸菜蛋炒饭 / 牛肉芝士薄饼 / 日式烧鸟鲍鱼卷 / 黄玉米饼 / 洋葱圈 / 薯条(雪域龙渊) / 盐酥鸡 / 黑椒汁 / 酸辣酱汁 / 意式肉酱 / 调味毛豆 / 西式甜点

**反转开关**:W10 SKU 内容补完后可重启评估

---

## 六、不可变红线

### 6.1 0 推测数据红线

不写以下类型的具体数字(避免"虚假精确"):
- 员工人数(280/80 等)
- 产线条数 / 具体面积(8000/6000/12000㎡)
- 流程时长(14 个月 FDA / 7-14 天打样 / 14 小时慢炖 / 24 小时报告)
- 海拔 / 距离(200km / 700-800m)
- 主厨人数(8 位常驻)
- 产能(100+ 吨/年)
- 具体年份(2022/2023/2024)— 仅保留 ICP 备案号

### 6.2 9 项禁词

| 禁词 | 类型 |
|---|---|
| 预制菜 | 业界敏感 |
| 半成品 | 业界敏感 |
| 西餐发源地 | 不实表述 |
| 江西辣椒 | 用"赣南螺丝椒"替代 |
| 30天打样 | 推测数据 |
| 商超自有品牌 | 商业敏感 |
| 麦肯薯角 | 第三方品牌 |
| 麻辣牛肉 | 命名敏感 |
| 即食鸡丝 | 命名敏感 |

### 6.3 6 种合法 CTA

| CTA | 用途 |
|---|---|
| sample_request | 申请样品 |
| catalog_download | 下载产品手册 |
| custom_inquiry | 定制开发咨询 |
| meeting_booking | 预约通话 / 工厂参观 |
| origin_tour | 原料产区参观 |
| general_contact | 兜底 |

⚠️ `other_countries` 为非法值,Phase 4 已全部清理。

### 6.4 B2B 定位守护

- 否决电商系统(购物车 / 微信支付)
- 华仔爸爸 B2C 走未来独立站
- 主站只做品牌窗口

---

## 七、技术架构

### 7.1 部署

| 组件 | 选型 | 状态 |
|---|---|---|
| 网站托管 | GitHub Pages | ✅ 上线 |
| 数据库 | Supabase(境外) | ✅ leads 表 |
| 仓库 URL | https://github.com/jeromechen01/foodvio-website | — |
| 网站 URL | https://jeromechen01.github.io/foodvio-website/ | — |
| Supabase 项目 | Foodvio-Website(独立于 CRM) | — |

### 7.2 文件结构

| 类型 | 数量 | 备注 |
|---|---|---|
| 业务 HTML | 36 | V6.2 版本(_v62.html 后缀) |
| 法律 HTML | 6(W9 新增) | privacy/terms/cookie 各中英 |
| JS 文件 | 2 | lead-capture.js + cookie-banner.js(W9 新增) |
| 数据文件 | 1 | products.json(33 SKU schema) |
| SQL 脚本 | 1(W9 新增) | supabase-w9-schema-migration.sql |
| **总计** | **46+** | 加 README / 文档 |

### 7.3 路由表

| URL | 内容 |
|---|---|
| index.html | 首页 |
| products-{index,sauces,staples,snacks,mains,chinpapa}-v62.html | 产品矩阵 |
| our-story-{index,china-insight,chinese-roots-*,global-masters-*}-v62.html | 故事子站(11 文件) |
| capabilities-{index,supply-chain,rd-team,certifications,*-factory}-v62.html | 能力子站(7 文件) |
| solutions-{index,light-kitchen,coffee-shops}-v62.html | 方案子站 |
| for-{foodservice,industrial,retail,online-sales,global}-v62.html | 客户角色页 |
| privacy-policy-{zh,en}.html(W9 新增) | 隐私政策 |
| terms-of-service-{zh,en}.html(W9 新增) | 用户协议 |
| cookie-policy-{zh,en}.html(W9 新增) | Cookie 说明 |

### 7.4 lead-capture.js(W9 升级)

| 特性 | 状态 |
|---|---|
| 自动绑定 `[data-foodvio-cta]` 按钮 | ✅ |
| 6 种 CTA 类型识别 | ✅ |
| 子站识别 + 线索质量评分 | ✅ |
| **同意勾选框 + 提交联动**(W9) | ✅ |
| **chinpapa 年龄勾选**(W9) | ✅ |
| **consent metadata 注入 payload**(W9) | ✅ |

### 7.5 Supabase leads 表 schema

| 字段 | 类型 | 来源 |
|---|---|---|
| name / company / role / email / phone / message | TEXT | W6 |
| source / subsite / traffic_quality / page_path / cta_type | TEXT | W6 |
| consent_version | TEXT | **W9 新增** |
| consent_timestamp | TIMESTAMPTZ | **W9 新增** |
| age_consent_chinpapa | BOOLEAN | **W9 新增** |

### 7.6 法律 V1.0(W9)

| 法律页 | 中文 | 英文 |
|---|---|---|
| 隐私政策 | 12 节 / 397 行 | 12 节 + GDPR 兜底 |
| 用户协议 | 12 节 / 416 行 | 12 节 |
| Cookie 说明 | 7 节 / 366 行 | 7 节 |

**核心条款**:
- PIPL 第 38 条 Supabase 跨境告知
- 数据保留:询盘 24 个月
- 未成年人:14 岁门槛
- 责任限额:RMB 1000(故意/重大过失除外)

---

## 八、协作模式

### 8.1 Jerome 工作流

1. 提需求 → Claude 提问澄清
2. 拍板 Q1/Q2/... → Claude 动手
3. Claude 出 zip → Jerome git push 上线
4. 浏览器测试 → 反馈

### 8.2 Claude 自我约束

- 绝不擅自做超出范围的事
- 遇模糊地带必先问(用 ask_user_input_v0)
- 每次动手前先核对 zip 基准
- 守 brief 锁定(0 推测 / 0 禁词 / B2B 定位)
- 大改前先扫现状

### 8.3 验收链路

陈总 → Jerome → Claude

### 8.4 Jerome 工作环境

- 首尔做中国餐饮研究
- iPad 移动端用户
- 0 传统编码经验,熟练 vibe code + git push 模式
- 中英双语,务实直接,期待诚实推回

---

## 九、关联文档

| 文档 | 作用 |
|---|---|
| **本文档(brief V2)** | **单一权威来源,优先读** |
| foodvio-V62-w9-decisions-log.md | W9 决策追溯 |
| foodvio-V62-w9-legal-launch-record.md | W9 法律接入完整记录 |
| foodvio-v62-w6-handoff_phase1.md | W6 历史档案(只读) |
| foodvio-v62-w6-handoff_phase1-AMENDMENTS.md | phase1 反转标注 |
| foodvio-V62-w6-w8-handoff_phase2.md | W6-W8 历史档案(只读) |
| foodvio-V62-w6-w8-handoff_phase2-AMENDMENTS.md | phase2 反转标注 |
| product-catalog-image-inventory.md | 画册图清单(B 线工作底稿) |
| W9-CHANGE-REPORT.md | W9 改动 diff(工作底稿) |

---

## 十、新对话第一条消息建议(W10+)

```markdown
[项目背景]
Foodvio 花花食界 V6.2 W10 项目 / 双品牌 B2B+B2C 窗口
W9 法律合规已完成,等待 git push + 法务审核
准备启动 W10 — [具体任务]

[必读知识库]
- foodvio-V62-brief-locked-V2.md(单一权威来源,优先读)
- foodvio-V62-w9-decisions-log.md(最新决策)
- 其他 phase1/phase2 + AMENDMENTS(必要时翻阅)

[当前任务]
[具体描述任务 + 优先级 + 期望输出]

[关键约束]
- 守 brief V2 全部锁定项
- 0 推测 / 0 禁词 / B2B 定位
- vibe code + git push 模式
- 守 W9 法律 V1.0 不动(除非法务来稿)
```

---

**文档版本**:V2.0
**整理日期**:2026-05-05
**适用场景**:W10+ 新会话快速启动 / 项目交接 / 长期归档
**下次更新触发**:法律 V1.1 修订 / W10 SKU 补完 / 新决策反转
