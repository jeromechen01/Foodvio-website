# Foodvio V6.2 · phase1.md 修订标注(AMENDMENTS)

> **文档目的**:对原文 `foodvio-v62-w6-handoff_phase1.md`(整理日期 2026-05-05)中的过时/已反转条款进行修订标注。
> **修订日期**:2026-05-05(W9 启动会话)
> **修订原则**:**保留原文不动**,本文档作为"勘误表"独立存放,与原文并行使用。
> **使用建议**:阅读 phase1.md 时,同时打开本文档比对。

---

## 一、修订项总览

| # | 原文位置 | 状态 | 反转来源 |
|---|---|---|---|
| A1 | 1.1 节 Story 2 · 5 国大师清单 | 🔴 **整体废弃** | W9 决策 #1(冲突拍板) |
| A2 | 2.3 节 P3 任务"5 国子页第二批样板" | 🔴 **任务作废** | 同 A1 |
| A3 | 4.2 节 "近 10 万㎡ 自营生产空间" | 🟡 **口径过时** | W9 决策 #3 |
| A4 | 4.3 节 lead-capture.js 配置 | 🟡 **W9 已升级** | W9 决策 #5 |
| A5 | 5 节 "下次新对话第一条消息建议结构" | 🟢 **新增 W9 接力建议** | W9 工作模式 |

---

## 二、修订详情

### 🔴 A1 · 1.1 节 Story 2 · 5 国大师清单 — 整体废弃

#### 原文(已过时)

> Story 2 · 5 国大师(从原 6 国调整)
>
> | # | 旗帜 | 国家 | 备注 |
> |---|------|------|------|
> | 1 | 🇮🇹 | 意大利 | ✅ 已交付杂志样板 |
> | 2 | 🇩🇪 | 德国 | 新增 |
> | 3 | 🌏 | 东南亚 | 保留(代表泰国/越南/马来) |
> | 4 | 🇰🇷 | 韩国 | 保留 |
> | 5 | 🇲🇽 | 墨西哥 | 保留 |
>
> > ⚠️ 西班牙、日本从 Story 子站清单移除...

#### 🔒 W9 修订(以此为准)

**Story 2 · 5 国大师**(W9 锁定:**意 / 西 / 韩 / 日 / 墨**)

| # | 旗帜 | 国家 | 备注 |
|---|------|------|------|
| 1 | 🇮🇹 | 意大利 | ✅ 已交付杂志样板 |
| 2 | 🇪🇸 | 西班牙 | 已上线 |
| 3 | 🇰🇷 | 韩国 | 已上线 |
| 4 | 🇯🇵 | 日本 | 已上线 |
| 5 | 🇲🇽 | 墨西哥 | 已上线 |

**移除**:🇩🇪 德国 / 🌏 东南亚 — **不在 5 国清单**
**保留**:Capabilities R&D 6 国学艺事实(意/西/韩/日/东南亚/墨)— **场景独立**
**反转原因**:phase1 当时是讨论中状态,phase2 + 实际路由跑的是这版,W9 锁定与之对齐

---

### 🔴 A2 · 2.3 节 P3 任务"5 国子页第二批样板" — 任务作废

#### 原文(已过时)

> P3 待完成任务清单
> - 5 国子页第二批样板(德国 / 东南亚 / 韩国 / 墨西哥)

#### 🔒 W9 修订

**任务作废**。
**理由**:5 国清单已锁定为意/西/韩/日/墨,德国 / 东南亚不在新清单中,西班牙 / 日本子页已交付。
**当前状态**:5 国子页全部已上线(详见 phase2.md 路由表 our-story-global-masters-{italy,spain,korea,japan,mexico}-v62.html)。
**未来开关**:6 国大师模式如要切回(扩展东南亚 / 德国 / 中国),需 Jerome 单独决策启动。

---

### 🟡 A3 · 4.2 节 "近 10 万㎡ 自营生产空间" — 口径过时

#### 原文(已过时)

> 公司事实:近 10 万㎡ **自营**生产空间...

#### 🔒 W9 修订

**正确口径**:近 10 万㎡ **自建及托管**生产空间
**理由**:phase2.md 已用此口径,W9 锁定与之统一
**全站状态**:抽查 grep "自营",**0 命中**(说明实际网站 HTML 已经在 phase2 阶段更新过,只是 phase1 文档过时)
**操作建议**:无需改动 HTML,仅本文档纪要修订

---

### 🟡 A4 · 4.3 节 lead-capture.js 配置 — W9 已升级

#### 原文

> lead-capture.js 接入路径:每个 HTML 的 </head> 之前加一行 `<script src="lead-capture.js" defer></script>`
>
> 弹窗 modal 字段:name / company / role / email / phone / message / cta_type

#### 🔒 W9 升级

**新增 modal 字段**:
- `consent`(同意《隐私政策》《用户协议》勾选,**必勾**才能提交)
- `age_consent_chinpapa`(华仔爸爸子站专属,**必勾**才能提交)

**新增 payload 字段**:
- `consent_version: 'V1.0'`
- `consent_timestamp: ISO timestamp`
- `age_consent_chinpapa: boolean`

**对应 Supabase leads 表**:增 3 个 ALTER TABLE 字段(详见 `foodvio-V62-w9-legal-launch-record.md`)

**详细说明**:见 `foodvio-V62-w9-legal-launch-record.md` 第 3.1 节

---

### 🟢 A5 · 5 节 "下次新对话第一条消息建议结构" — 新增 W9 接力建议

#### 原文(W6 阶段建议)

> ```markdown
> [项目背景 - 1 段]
> Foodvio 花花食界 V6.2 项目 / B2B 西餐食品品牌 / 上一对话工具切换需要接力
>
> [当前任务 - P1 优先]
> 完成 W6 Phase 1 收尾的 9 处文本替换...
> ```

#### 🆕 W9 后接力建议(增量)

```markdown
[项目背景 - 1 段]
Foodvio 花花食界 V6.2 W9 项目 / B2B + B2C 双品牌 / 已完成法律合规接入,等待 git push + 法务审核

[必读知识库文档]
1. foodvio-v62-w6-handoff_phase1.md(W6 P1 历史)
2. foodvio-v62-w6-handoff_phase1-AMENDMENTS.md(本文档,phase1 修订)
3. foodvio-V62-w6-w8-handoff_phase2.md(W6-W8 决策)
4. foodvio-V62-w6-w8-handoff_phase2-AMENDMENTS.md(phase2 修订)
5. foodvio-V62-w9-decisions-log.md(W9 拍板记录)
6. foodvio-V62-w9-legal-launch-record.md(W9 法律接入完整记录)
7. foodvio-V62-brief-locked-V2.md(brief V2 最新锁定项)

[当前阶段]
W9 已完成,等待:
- Supabase migration 跑 ALTER TABLE
- git push Foodvio-website-W9.zip
- 法务审核 6 法律 HTML

[下一阶段(W10)候选]
- 25 个 draft SKU 真实文案补完
- 画册产品图接入(20+ 款,已确认版权)
- nav 占位 # 修复(Insights / About)
```

---

## 三、本修订文档与原文的关系

```
原文(只读,保留历史):
foodvio-v62-w6-handoff_phase1.md

         ↓ 阅读时同时打开

修订标注(本文档):
foodvio-v62-w6-handoff_phase1-AMENDMENTS.md

         ↓ 综合得出

实际生效的版本(以本文档为准的部分用本文档):
- A1 / A2 用本文档 5 国清单
- A3 用本文档"自建及托管"口径
- A4 用 W9 法律接入版 lead-capture.js
- A5 用本文档新接力建议
```

---

## 四、未来再次修订时的入口

如果 phase1 还有内容被反转,继续以"A6 / A7 / ..."编号在本文档追加。
本文档版本号每次更新时递增(V1.0 → V1.1)。
原文 phase1.md 永远不动,作为历史档案。

---

**文档版本**:V1.0
**修订日期**:2026-05-05
**修订人**:Jerome(决策) + Claude(整理)
**关联**:foodvio-V62-w9-decisions-log.md(本修订的决策来源)
