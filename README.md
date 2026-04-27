# Foodvio 花花食界 V6.2 网站

> 北京花花食界食品科技有限公司官方网站(GitHub Pages 部署版)
> Beijing Foodvio Food Technology Co., Ltd.

## 🌐 在线访问

- 主站:https://YOUR_USERNAME.github.io/foodvio-website/
- 自定义域名(待配):www.foodvio.com.cn

## 📁 项目结构

```
foodvio-website/
├── index.html                                   # 首页
├── lead-capture.js                              # ⭐ Supabase 表单接入(全站共用)
│
├── for-foodservice-v62.html                     # 角色着陆 1:餐饮品牌方
├── for-industrial-v62.html                      # 角色着陆 2:食品工业 / 团餐
├── for-retail-v62.html                          # 角色着陆 3:商超连锁 / OEM
├── for-online-sales-v62.html                    # 角色着陆 4:跨境电商
├── for-global-v62.html                          # 角色着陆 5:海外贸易商
│
├── products-index-v62.html                      # Products 总站
├── products-sauces-v62.html                     #   - Innovation Sauces 18 款酱料
│
├── solutions-index-v62.html                     # Solutions 总站(双视图)
├── solutions-light-kitchen-v62.html             #   - 轻后厨场景大类
├── solutions-coffee-shops-v62.html              #   - 咖啡馆场景细分
│
├── our-story-index-v62.html                     # ⭐ Our Story 总站
├── our-story-chinese-roots-v62.html             #   - 故事 1:中国原料(8 大产地导航)
├── our-story-chinese-roots-gannan-chili-v62.html  #   - 故事 1.1:赣南螺丝椒(杂志风样板)
├── our-story-global-masters-v62.html            #   - 故事 2:世界大师(6 国导航)
├── our-story-global-masters-italy-v62.html      #   - 故事 2.1:意大利(杂志风样板)
└── our-story-china-insight-v62.html             #   - 故事 3:中国洞察(4 大洞察)
```

## 🚀 部署方式:GitHub Pages

本仓库通过 GitHub Pages 部署。**任何 push 到 main 分支的修改会自动重新部署**(约 30-90 秒)。

启用方式:Settings → Pages → Source: `main` / Folder: `/ (root)`

## 🔧 修改 Supabase 配置

**只需改 1 个文件**:`lead-capture.js` 顶部 2 行:

```javascript
const SUPABASE_URL  = 'https://YOUR_PROJECT.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIs...YOUR_ANON_KEY';
```

修改后 `git push`,17 个页面**自动全部更新**(因为它们都引用同一个 lead-capture.js)。

## 📊 数据看板

线索数据流向:
```
访客点击 CTA 按钮 → lead-capture.js 弹窗
              ↓
         Supabase leads 表
              ↓
    ┌─────────┴─────────┐
    ↓                   ↓
客服每天看 hot 线索   陈总每月看子站 ROI
```

参考文档:
- 《V6.2 Supabase 完整部署指南》
- 《V6.2 Supabase 补丁与表单接入》(含客服 SQL Q10.x)

## ⚙️ 技术栈

- **前端**:纯静态 HTML + Tailwind CSS(CDN)+ 原生 JS
- **托管**:GitHub Pages(免费)
- **CDN**:Cloudflare(可选,推荐用于国内访问加速)
- **后端**:Supabase(Lead Capture)
- **域名**:foodvio.com.cn(待绑定)

## 📞 联系

- 客服热线:400-6879-568
- 客服邮箱:huahuakefu1@foodvio.com.cn
- 总部:北京望京 SOHO T3A 1008

---

© 2026 Beijing Foodvio Food Technology Co., Ltd. · 京 ICP 备 2022025117 号-1
