# Foodvio V6.2 · W18 阿里云部署方案(完整规划版)

> **文档目的**:规划花花食界官网从 GitHub Pages 迁移到阿里云的完整部署方案,作为陈总/Jerome 决策与执行的单一权威来源。
> **整理日期**:2026-05-19
> **当前版本**:V1.0(规划版,待 5 个待定项确认后升 V1.1 执行版)
> **上游文档**:brief-locked-V3.md / foodvio-V62-w10-w17-handoff_phase3.md / foodvio-V62-w9-legal-launch-record.md
> **下游产出**:V1.1 执行版(确认决策后)/ 实际执行记录(上线后)

---

## 一、迁移背景与目标

### 1.1 当前部署现状(W17 锁定)

| 组件 | 当前选型 | 上线状态 |
|---|---|---|
| 网站托管 | GitHub Pages | ✅ 已上线 https://jeromechen01.github.io/foodvio-website/ |
| 仓库地址 | github.com/jeromechen01/foodvio-website | ✅ 14 MB,44 个 HTML + 34 张产品图 |
| 数据库 | Supabase(境外) | ✅ leads 表已接入 lead-capture.js |
| 域名 | foodvio.com.cn | ⚠️ 当前未绑定到 GitHub Pages(GitHub 拒绝 .com.cn HTTPS) |
| ICP 备案 | 京 ICP 备 2022025117 号-1 | ✅ 已备案(原备案服务商待核查) |
| 公安联网备案 | — | ⏳ 待办(独立于 ICP 备案) |

### 1.2 为什么必须迁移到阿里云(4 个核心原因)

| 痛点 | GitHub Pages 限制 | 阿里云解决 |
|---|---|---|
| **国内访问稳定性** | 境外节点偶发延迟/被墙 | 国内 CDN 节点,首屏 < 1.5s |
| **.com.cn 域名 HTTPS** | GitHub 拒绝中国大陆备案域名 | ICP 备案号直接生效 |
| **B2B 国央企访问** | 部分政企防火墙拦截 GitHub | 国内访问 100% 可达 |
| **公安联网备案** | 无境内服务器锚点 | 备案合规链条完整 |

### 1.3 迁移目标(SMART 化)

- **S 具体**:把 44 个 HTML + 14MB 静态资产迁移到阿里云,绑定 www.foodvio.com.cn(HTTPS)
- **M 可衡量**:全国首屏加载 < 1.5s,可用性 ≥ 99.5%
- **A 可达成**:不改任何现有代码,纯托管层迁移
- **R 相关**:为后续公安联网备案 + 法务上线提供合规基础
- **T 时限**:4-6 周完成(主要等备案接入)

---

## 二、阿里云部署架构方案

### 2.1 架构选型对比

| 方案 | 适用场景 | 月成本 | 复杂度 | 推荐度 |
|---|---|---|---|---|
| **A · OSS+CDN 静态托管** | 纯静态站(当前) | ¥35-95 | 低 | ⭐⭐⭐⭐⭐ |
| B · ECS 云服务器 | 未来需要后端服务 | ¥300-800 | 中 | ⭐⭐ |
| C · 函数计算 FC + OSS | Serverless 不确定流量 | ¥50-200 | 高 | ⭐⭐ |

**🔒 W18 锁定:走方案 A**(理由:花花食界官网是纯静态站,Supabase 已承担动态数据,无需 ECS)

### 2.2 方案 A 架构图

```
┌──────────────────────────────────────────────────┐
│           用户浏览器(国内 / 海外)              │
└────────────────┬─────────────────────────────────┘
                 │ HTTPS (TLS 1.2+)
                 ↓
┌──────────────────────────────────────────────────┐
│      阿里云 CDN(全国加速节点 · 强缓存)        │
│  - HTML 缓存 60s / 资产缓存 30 天                │
│  - HTTP→HTTPS 强制跳转 / HTTP/2 / HSTS           │
└────────────────┬─────────────────────────────────┘
                 │ 回源
                 ↓
┌──────────────────────────────────────────────────┐
│      OSS 对象存储(华北 2 北京)                 │
│  - 44 HTML + 14MB 资产                           │
│  - 静态网站托管模式                              │
│  - 私有 Bucket(仅 CDN 回源访问)                │
└──────────────────────────────────────────────────┘

询盘表单数据流(独立链路):
浏览器 → lead-capture.js → Supabase(境外)→ leads 表
       ↑ 已在隐私政策 5.2 明确告知(PIPL 第 38 条单独同意)
```

### 2.3 阿里云组件清单与成本

| 组件 | 规格 | 月成本估算 | 说明 |
|---|---|---|---|
| OSS 标准存储 | 1 GB | ¥0.12 | 当前 14MB 远低于 1GB |
| OSS 外网流量 | 0(走 CDN) | ¥0 | 流量都从 CDN 回源,OSS 几乎零流量费 |
| OSS 请求次数 | < 10 万次/月 | ¥0.5 | |
| CDN 流量(国内) | 50 GB/月预估 | ¥12-15 | ¥0.24/GB(阶梯) |
| CDN HTTPS 请求 | < 100 万次 | ¥5 | ¥0.05/万次 |
| SSL 证书 DV 免费版 | 1 年 | ¥0 | 阿里云 DigiCert 免费 |
| 云解析 DNS 基础版 | — | ¥0 | 域名在阿里云免费 |
| **月成本合计** | | **¥18-30** | 比初版预估 ¥35-95 更乐观 |
| **年成本合计** | | **¥220-360** | |

> ⚠️ **流量预估假设**:月 PV 1 万 / 每 PV 加载 ~5MB(含图片)= 50GB/月。若实际流量更大,CDN 成本会等比上升。建议开通"流量包"预付费更划算。

---

## 三、完整执行 SOP(11 步 · 4 阶段)

### 📋 阶段 1 · 准备工作(预计 1-3 周,主要等备案)

#### Step 1 · 域名归属核查

```bash
# Jerome 操作:在浏览器查
# ① ICP 备案查询
打开 https://beian.miit.gov.cn → 搜索 foodvio.com.cn
确认:京 ICP 备 2022025117 号-1 主体是"北京花花食界食品科技有限公司"
确认:原备案服务商是哪家(阿里云/腾讯云/西部数码/万网等)

# ② 域名注册商查询
打开 https://whois.aliyun.com → 搜索 foodvio.com.cn
确认:注册商 + 到期日 + DNS 服务器
```

**决策树**:
- 若域名 + 备案都在阿里云 → ✅ 跳过 Step 2,直接到 Step 3
- 若域名在阿里云但备案在他云 → 走"**备案接入阿里云**"流程(3-20 工作日)
- 若域名不在阿里云 → 走"**域名转入**"(7-14 天)+ 备案接入(3-20 工作日)

#### Step 2 · 备案接入阿里云(若需要)

```
阿里云控制台 → 备案 → 备案接入
├── 主体信息:北京花花食界食品科技有限公司
├── 主体证件:营业执照(陈总持有)
├── 法人/负责人:陈总(法人本人)
├── 网站负责人:Jerome(运维负责人)
├── 接入服务:OSS(华北 2 北京)
└── 提交后等待:阿里云初审 1-3 天 + 管局审核 1-20 工作日
```

⚠️ **关键约束**:
- 备案接入期间,**网站不能用 .com.cn 域名访问 OSS**(阿里云强制管控)
- 可以先在 OSS 用临时域名(如 `foodvio-website.oss-cn-beijing.aliyuncs.com`)做测试
- 建议在 GitHub Pages 仍正常运行的情况下做准备工作,**等备案接入完成再切换 DNS**

#### Step 3 · 阿里云账号准备

```
阿里云控制台 → 账号设置
├── 必须企业实名认证(陈总公司营业执照)
├── 创建 RAM 子账号(给 Jerome 操作权限)
│   ├── 权限:OSS / CDN / SSL / DNS 操作权限
│   └── 排除:账单/支付/账号注销权限(留陈总主账号)
├── 开通服务:OSS、CDN、SSL 证书、云解析 DNS
└── 充值预付费余额 ¥500(够用半年)
```

#### Step 4 · 文件准备 + 自检

```bash
# Jerome 在 Mac 本地操作
cd ~/foodvio-website
git pull origin main  # 拉最新 W17 版本

# 自检文件清单(参考 W9-W17 累积成果)
ls -lh index.html  # ~73 KB
ls -lh lead-capture.js cookie-banner.js
ls -lh privacy-policy-*.html terms-of-service-*.html cookie-policy-*.html
du -sh assets/  # 应约 14MB
find . -name "*.html" | wc -l  # 应 44

# 清理无关文件(不上传到 OSS)
echo "
.git/
*.md
*.zip
*.py
__pycache__/
.DS_Store
README*
" > .ossignore
```

---

### 📋 阶段 2 · OSS 静态托管搭建(1-2 小时)

#### Step 5 · 创建 OSS Bucket

```
阿里云控制台 → 对象存储 OSS → 创建 Bucket
├── Bucket 名称:foodvio-website(全局唯一,与 GitHub repo 名一致)
├── 区域:华北 2(北京)cn-beijing
│   理由:与公司所在地一致 + CDN 北京节点回源延迟最低
├── 存储类型:标准存储
├── 同城冗余存储:关闭(节省 50% 成本,纯静态站可容忍)
├── 版本控制:开启(防误删,可恢复历史版本)
├── 读写权限:私有(后续仅 CDN 回源访问)
├── 服务端加密:OSS 完全托管(KMS)
├── 实时日志:开启 7 天(便于调试)
└── 标签:project=foodvio / env=prod
```

#### Step 6 · 开启静态网站托管

```
Bucket → 数据管理 → 静态页面
├── 默认主页:index.html
├── 默认 404 页:404.html(若无则用 index.html 兜底)
├── 子目录首页:开启(访问 /products/ 等价于 /products/index.html)
└── 镜像回源:暂不配置
```

⚠️ **URL 结构待定**(待定项 4):
- **方案 X · 保持现状**:URL 形如 `/products-sauces-v62.html`,0 工作量,SEO 略差
- **方案 Y · 优化为目录**:URL 形如 `/products/sauces/`,SEO 更友好,需批量重命名 + 改全站内链(预估 100+ 处)

**🔒 推荐**:**先按方案 X 上线,SEO 优化作为 W19 单独任务**(避免上线和重构一锅炖)

#### Step 7 · 上传文件

**方式 A · ossutil 命令行(推荐 · Mac 一次性传 14MB)**

```bash
# Mac 安装
brew install ossutil

# 配置(用 RAM 子账号 AccessKey)
ossutil config
# 输入:Endpoint = oss-cn-beijing.aliyuncs.com
# 输入:AccessKeyId / AccessKeySecret(从 RAM 控制台获取)

# 同步上传整个仓库(增量同步)
ossutil sync ~/foodvio-website oss://foodvio-website/ \
  --exclude ".git/*" \
  --exclude "*.md" \
  --exclude "*.zip" \
  --exclude "*.py" \
  --exclude "__pycache__/*" \
  --exclude ".DS_Store" \
  --update

# 验证上传
ossutil ls oss://foodvio-website/ | head -20
ossutil du oss://foodvio-website/  # 应显示 ~14MB
```

**方式 B · OSS Browser 图形客户端**(iPad/Mac 拖拽)

```
下载:https://help.aliyun.com/zh/oss/developer-reference/oss-browser
登录:用 RAM 子账号 AccessKey
拖拽:本地 foodvio-website 文件夹 → 整个上传
```

**设置 Content-Type**(关键,否则浏览器不识别):

```
OSS 控制台 → 文件管理 → 批量设置
├── *.html → text/html; charset=utf-8
├── *.css  → text/css; charset=utf-8
├── *.js   → application/javascript; charset=utf-8
├── *.jpg/*.jpeg → image/jpeg
├── *.webp → image/webp
└── *.json → application/json; charset=utf-8
```

---

### 📋 阶段 3 · CDN 加速 + HTTPS(2-4 小时)

#### Step 8 · 申请免费 SSL 证书

```
阿里云控制台 → 数字证书管理 → SSL 证书 → 免费证书 → 立即购买
├── 证书品牌:DigiCert(免费 DV)
├── 域名:申请 1 张证书覆盖 2 个域名
│   ├── 主域名:www.foodvio.com.cn
│   └── 附加:foodvio.com.cn(裸域名,做 301 跳转用)
├── 验证方式:DNS 自动验证(因域名在阿里云,30 秒内完成)
└── 签发:5-30 分钟
```

**备选**(若免费证书申请失败):
- 阿里云付费 DV 证书 ¥0/年(常年免费版可用)
- Let's Encrypt 自助申请(需要本地 certbot,Jerome 操作复杂)

#### Step 9 · 配置 CDN 加速域名

```
阿里云控制台 → CDN → 域名管理 → 添加域名
├── 加速域名:www.foodvio.com.cn
├── 业务类型:网页加速(图片小文件)
├── 加速区域:中国内地
│   理由:海外访客占比 < 5%,内地版便宜
│   反转开关:若海外客户多,可改"全球(不包括中国内地)"或"全球"
├── 源站类型:OSS 域名
├── 源站地址:foodvio-website.oss-cn-beijing-internal.aliyuncs.com
│   ⚠️ 必须用 `-internal` 内网域名,免回源流量费
├── 端口:443
└── 加速区域备注:必须备案完成后才能审核通过
```

**HTTPS 配置**(关键):
```
CDN 域名详情 → HTTPS 配置
├── 上传 Step 8 的证书(选择"云盾证书"自动同步)
├── 强制跳转:HTTP → HTTPS(301)
├── HTTP/2:开启
├── HSTS:开启(max-age 31536000 = 1 年)
└── TLS 版本:最低 TLS 1.2(兼容性最佳)
```

**缓存策略**(关键 · 避免改了文件用户看不到):
```
CDN → 缓存配置 → 缓存过期时间(按优先级排序)
├── 文件类型 *.html → 60 秒(短缓存,便于更新)
├── 文件类型 *.css, *.js → 1 天
├── 目录 /assets/* → 30 天(产品图基本不变)
├── 文件类型 *.json → 1 小时(products.json 偶尔更新)
└── 自定义 404 页面:配置 404.html
```

**回源配置**:
```
CDN → 回源配置
├── 回源 HOST:foodvio-website.oss-cn-beijing.aliyuncs.com
├── 回源协议:HTTPS(更安全)
└── 回源 SNI:foodvio-website.oss-cn-beijing.aliyuncs.com
```

#### Step 10 · DNS 解析切换(关键)

```
阿里云控制台 → 云解析 DNS → foodvio.com.cn → 解析设置
├── 记录 1:CNAME 主记录
│   ├── 记录类型:CNAME
│   ├── 主机记录:www
│   ├── 记录值:[CDN 控制台分配的 cname,形如 xxx.aliyuncdn.com]
│   ├── TTL:600 秒(默认)
│   └── 状态:启用
│
├── 记录 2:裸域名 301 跳转(@→www)
│   方式 A · 用 OSS 重定向(推荐):
│     额外创建一个 OSS Bucket(foodvio-redirect),
│     在静态网站托管设置 301 跳转到 www.foodvio.com.cn,
│     CDN 加速这个 Bucket,DNS @ 记录指向它
│   方式 B · 在阿里云 WAF 做转发(更贵)
│
└── 记录 3:邮件 MX 记录(huahuakefu1@foodvio.com.cn 用)
   ⚠️ 不要动!检查现有 MX 记录指向(可能是腾讯企业邮 / 阿里云邮箱)
   迁移过程中绝对不要改 MX 记录,否则邮箱断
```

⚠️ **DNS 生效时间**:
- 阿里云 DNS:5 分钟内中国大陆生效
- 全球递归 DNS:1-24 小时
- 建议非高峰期(深夜)切换

---

### 📋 阶段 4 · 上线切换 + 备案合规

#### Step 11 · 切换日检查清单

**T-7 天(准备就绪)**:
- [ ] Step 1-9 全部完成
- [ ] 测试 URL 可访问:`https://[临时 CDN 域名]/index.html`
- [ ] 跑 W9 浏览器 5 项验证清单(见下方)
- [ ] 提交一条测试 lead,验证 Supabase 收到 + consent_version='V1.0'

**T-1 天(双跑期)**:
- [ ] DNS 暂时双指向:GitHub Pages CNAME 保留 + 新增阿里云 CDN
- [ ] 在新链接做最终验证
- [ ] 通知陈总 + Jerome + 关键客户"明日切换"

**T-0 上线日**:
- [ ] DNS 完全切换到阿里云 CDN(改 CNAME 记录值)
- [ ] 关闭 GitHub Pages 自定义域名(保留仓库作为代码备份)
- [ ] 监控 CDN 控制台首小时流量曲线 + 错误率
- [ ] 内部访问测试:陈总 + Jerome + 5 个关键客户

**T+1 周**:
- [ ] **公安联网备案**(独立于 ICP):
  - 登录 https://www.beian.gov.cn
  - 提交主体信息 + 网站信息 + 阿里云 OSS+CDN 服务器信息
  - 审核 20 工作日
- [ ] 网站底部追加公安备案号(京公网安备 XXXXXXX 号)
- [ ] 数据出境合规自查文档化

#### W9 浏览器 5 项验证清单(必跑)

| # | 测试 | 预期结果 |
|---|---|---|
| 1 | 首次访问主页 | 底部弹 cookie banner |
| 2 | 点"接受全部"后刷新 | banner 不再出现 |
| 3 | 任一页 footer | 6 个法律链接(中英各 3) |
| 4 | 点 CTA 按钮弹询盘 modal | 提交按钮**默认禁用**,勾选后启用 |
| 5 | products-chinpapa.html 弹询盘 | 多一个年龄/监护人勾选 |

#### Supabase 验证 SQL

```sql
-- 提交一条测试 lead 后查询
SELECT id, name, cta_type,
       consent_version, consent_timestamp,
       age_consent_chinpapa, created_at
FROM leads
ORDER BY created_at DESC
LIMIT 5;

-- 期望:
-- consent_version = 'V1.0'
-- consent_timestamp 不为 NULL
-- chinpapa 子站(page_path 含 'chinpapa')age_consent_chinpapa = true
```

---

## 四、5 个待定项决策表(陈总/Jerome 拍板)

| # | 决策项 | 选项 A | 选项 B | Claude 推荐 |
|---|---|---|---|---|
| 1 | 云服务商 | 阿里云 | 腾讯云 / 华为云 | A · 阿里云(生态最成熟,B2B 国央企认知度高) |
| 2 | 域名归属 | 已在阿里云 | 需转入 | 先核查 Step 1,确认后填本表 |
| 3 | Supabase 去留 | 保留境外(走 PIPL 单独同意路径) | 迁阿里云 RDS PostgreSQL | A · 保留(隐私政策 5.2 已合规,迁移成本高) |
| 4 | URL 结构 | 保持 `xxx-v62.html`(0 改动) | 优化为 `xxx/`(SEO 友好) | A · 保持(上线后 W19 单独优化) |
| 5 | 上线时点 | 法务审完法律 V1.1 再上 | 先上线,法务后审 | B · 先上线(W9 决策日志已锁定此方向) |

---

## 五、风险点与回滚方案

### 5.1 风险矩阵

| 风险 | 概率 | 影响 | 缓解措施 |
|---|---|---|---|
| 备案接入失败 | 中 | 极高 | 提前 4 周提交,陈总配合阿里云电话核验 |
| 阿里云账号实名不通过 | 低 | 极高 | 用陈总公司营业执照,准备公章扫描件 |
| DNS 生效慢导致间歇 404 | 中 | 低 | T-1 双指向 + TTL 600s |
| Supabase 国内访问慢 | 中 | 中 | 表单加 loading 状态 + 重试机制 |
| CDN 缓存导致改动不生效 | 高 | 低 | HTML 缓存 60s + 紧急刷新预热 |
| 法律页地址不一致 | 低 | 中 | W17 已统一 LIMO space,无需重做 |
| 邮箱 MX 记录误改 | 低 | 极高 | DNS 切换时**只动 CNAME**,绝不动 MX |

### 5.2 三级回滚预案

**Level 1 · 仅回滚 DNS(15 分钟内恢复)**
```bash
# 在云解析 DNS 控制台
# 把 www 的 CNAME 记录值改回 GitHub Pages 的 cname
# 即:jeromechen01.github.io
# 等 5-10 分钟全球生效
```

**Level 2 · 回滚到 GitHub Pages + 临时域名**
```
GitHub Pages 仓库 → Settings → Pages
启用:Custom domain = www.foodvio.com.cn(临时)
注意:.com.cn 在 GitHub 不能开 HTTPS,只能用 HTTP,体验差但能用
```

**Level 3 · 整体停服 + 显示维护页**
```bash
# 上传一个简单的 maintenance.html 到 OSS 根目录
# 在 CDN 配置临时 302 跳转所有路径 → /maintenance.html
# 维护完成后取消跳转
```

---

## 六、时间表与责任分工

### 6.1 关键路径甘特图

```
W18 (本周)
├─ 5 个待定项决策 ────────────── 陈总 + Jerome
├─ 域名/备案归属核查 ─────────── Jerome
└─ 起草 W18 V1.0(本文档)────── Claude ✅

W19
├─ 阿里云账号实名 + RAM 子账号 ─── 陈总
├─ 备案接入申请(若需要)────────── Jerome
└─ OSS Bucket + 上传文件 ─────────── Jerome

W20-W21
├─ 等待备案审核(管局 20 工作日)── 等待
└─ 同时准备 CDN + SSL 配置 ─────── Jerome

W22
├─ DNS 切换上线(T-0)─────────── Jerome + Claude 远程支持
└─ 浏览器 5 项验证 ─────────────── Jerome

W23+
├─ 公安联网备案 ───────────────── 陈总 + Jerome
└─ 法务审核反馈 → 法律 V1.1 ──── 法务 + Claude

预计 4-6 周完成全部上线流程
```

### 6.2 责任矩阵(RACI)

| 任务 | 陈总 | Jerome | Claude | 备注 |
|---|---|---|---|---|
| 5 个待定项决策 | **R** | C | I | 陈总最终拍板 |
| 阿里云企业实名 | **R** | C | — | 法人本人 |
| RAM 子账号配置 | A | **R** | C | Jerome 操作 |
| 备案接入 | A | **R** | I | 陈总配合电话核验 |
| OSS + CDN + SSL | A | **R** | C | Claude 远程指导 |
| DNS 切换 | A | **R** | I | |
| 浏览器验证 | — | **R** | C | |
| 公安联网备案 | A | **R** | I | 陈总营业执照 |
| 应急回滚 | A | **R** | C | |

> R = Responsible(负责), A = Accountable(批准), C = Consulted(咨询), I = Informed(知会)

---

## 七、上线后运维清单

### 7.1 监控指标(每周看一次)

| 指标 | 阈值 | 工具 |
|---|---|---|
| CDN 月流量 | < 100 GB(超了升流量包) | CDN 控制台 |
| CDN 命中率 | > 90% | CDN 控制台 |
| 平均首字节时间 TTFB | < 200ms | CDN 实时监控 |
| HTTPS 失败率 | < 0.1% | CDN 日志 |
| 月新增 lead 数 | 跟踪趋势 | Supabase Dashboard |
| 月新增 consent 同意率 | > 80% | Supabase SQL |

### 7.2 SSL 证书续期(1 年到期)

```
阿里云免费证书 1 年有效,到期前 30 天会邮件提醒
建议设日历:上线日 + 11 个月 → 提前续期
免费证书可无限续期,流程同 Step 8
```

### 7.3 内容更新流程(替代 git push)

**当前流程**(GitHub Pages 时代):
```
本地改文件 → git add → git commit → git push → 2 分钟后 GitHub Pages 自动部署
```

**新流程**(阿里云时代):
```
本地改文件 → ossutil sync ~/foodvio-website oss://foodvio-website/ → CDN 刷新 → 立即生效

或者保留 git 工作流 + GitHub Action 自动同步到 OSS:
本地改文件 → git push → GitHub Action 触发 ossutil sync → 自动 CDN 刷新
```

⚠️ **强烈建议配置 GitHub Action**(W19 任务),保留 git 单一事实源 + 自动化部署。

### 7.4 紧急 CDN 刷新

```
阿里云 CDN → 刷新预热
├── 刷新 URL:https://www.foodvio.com.cn/index.html
├── 或刷新目录:https://www.foodvio.com.cn/
└── 5 分钟内全国节点失效
免费额度:每日 10000 URL / 100 目录
```

---

## 八、与现有合规体系的衔接

### 8.1 法律页面 V1.0 修订需求(部署后)

迁移到阿里云后,**6 法律 HTML 需要修订以下表述**:

| 法律页 | 节 | 原文(GitHub Pages 表述) | 修订为(阿里云表述) |
|---|---|---|---|
| privacy-policy-zh | 04 共享转让 | 服务商:Supabase / **GitHub Pages** | 服务商:Supabase / **阿里云 OSS+CDN** |
| privacy-policy-en | 04 Sharing | Vendors: Supabase / **GitHub Pages** | Vendors: Supabase / **Alibaba Cloud OSS+CDN** |
| privacy-policy-zh | 10 数据安全 | HTTPS / TLS 1.3 | HTTPS / TLS 1.2+(阿里云 CDN 默认) |
| cookie-policy | 必要 Cookie | github_* 托管必需 | 阿里云 CDN cookie(无 github_*) |
| terms-of-service | 06 第三方链接 | GitHub Pages 服务条款另适用 | 阿里云服务条款另适用 |

⚠️ **触发条件**:Step 11 切换上线后,V1.0 → V1.0.1(小修订,不需要法务重审)。

### 8.2 公安联网备案信息表

```
网站名称:北京花花食界食品科技有限公司官网
网站域名:foodvio.com.cn / www.foodvio.com.cn
ICP 备案号:京 ICP 备 2022025117 号-1
托管服务商:阿里云计算有限公司
服务器位置:中国北京(华北 2 cn-beijing)
服务类型:OSS 对象存储 + CDN 内容分发
网站负责人:Jerome [姓名] / [身份证] / [手机] / huahuakefu1@foodvio.com.cn
单位负责人:陈总 [姓名] / [身份证] / [手机]
单位地址:北京市朝阳区零秒空间酒仙桥社区419房间
```

### 8.3 数据出境合规自查(配套文档)

```
| 项 | 自查结果 |
|---|---|
| 累计个人信息 | < 50 万人(豁免严格评估)|
| 敏感个人信息 | < 1 万人 |
| 重要数据 | 无 |
| 数据出境路径 | 询盘表单 → Supabase(美国/欧洲)|
| 合规依据 | PIPL 第 38 条 + 单独同意 + 隐私政策 5.2 |
| 用户同意机制 | cookie-banner + 询盘 modal consent 勾选 |
| 同意版本 | V1.0(consent_version 字段)|
| 同意时间戳 | consent_timestamp 字段 |
| 撤回机制 | foodvioWithdrawConsent() API |
```

---

## 九、知识库同步建议

### 9.1 文档更新清单

| 文档 | 更新内容 | 优先级 |
|---|---|---|
| **brief-locked-V3.md** | 七章"技术架构"小节,网站托管 GitHub Pages → 阿里云 OSS+CDN | 🔴 高(上线后立即) |
| **phase3 handoff** | 十三章 PENDING 加入"阿里云迁移"任务 | 🟠 中 |
| **新建 w18-deploy-record.md** | 实际执行过程 + 截图存档 | 🟠 中(上线后) |
| **legal-pages V1.0.1** | 6 法律 HTML 修订表述(8.1 节) | 🟡 低(上线后) |

### 9.2 反转开关清单(供未来变更参考)

| 决策点 | 反转难度 | 反转代价 |
|---|---|---|
| 云服务商(阿里云 → 腾讯云) | 中 | DNS 切换 + 重新备案接入 ~3 周 |
| URL 结构(扁平 → 目录化) | 中 | 批量重命名 100+ 处 + 301 跳转配置 |
| Supabase → 阿里云 RDS | 高 | 改 lead-capture.js + 数据迁移 + 法律 V1.1 |
| OSS → ECS(若未来加后端)| 中 | 加 Nginx + 改 CDN 回源 |
| CDN 加速区域(国内 → 全球)| 低 | CDN 控制台一键改 |

---

## 十、附录

### 10.1 阿里云相关链接

- 阿里云控制台:https://home.console.aliyun.com
- 备案系统:https://beian.aliyun.com
- OSS 控制台:https://oss.console.aliyun.com
- CDN 控制台:https://cdn.console.aliyun.com
- DNS 控制台:https://dns.console.aliyun.com
- SSL 证书:https://yundun.console.aliyun.com/?p=cas
- ossutil 工具:https://help.aliyun.com/zh/oss/developer-reference/ossutil-overview

### 10.2 合规链接

- ICP 备案查询:https://beian.miit.gov.cn
- 公安联网备案:https://www.beian.gov.cn
- 数据出境申报:https://sjcj.cac.gov.cn

### 10.3 关联文档索引

| 文档 | 用途 |
|---|---|
| brief-locked-V3.md | 全站锁定项 SSOT |
| foodvio-V62-w9-legal-launch-record.md | 法律合规接入全记录 |
| foodvio-V62-w10-w17-handoff_phase3.md | W10-W17 累积技术沉淀 |
| 本文档(W18 阿里云部署方案) | 部署阶段权威文档 |

---

**文档版本**:V1.0(规划版)
**整理日期**:2026-05-19
**状态**:⏳ 等待 5 个待定项决策 → 升级 V1.1 执行版
**下次更新**:陈总/Jerome 拍板 5 个待定项后 / 实际执行过程中
**作者**:Claude(网站规划顾问)
**审阅**:陈总 / Jerome
