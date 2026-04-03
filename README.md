# 💕 恋爱时光 - Love Memory

一个精美的恋爱记录应用，用于记录恋爱中的关键时间点和美好事件，支持上传照片保存珍贵回忆。

![Love Memory](https://img.shields.io/badge/Love-Memory-ff6b9d?style=for-the-badge&logo=heart)
![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-61dafb?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=for-the-badge&logo=tailwind-css)

## ✨ 功能特性

### 💑 恋爱天数统计
- 精美的渐变卡片展示恋爱天数
- 可自定义双方昵称
- 设置恋爱开始日期自动计算天数
- 实时更新的天数显示

### 📅 时间线展示
- 垂直时间线布局，带爱心节点装饰
- 按日期倒序排列（最新的在前）
- 显示完整的日期和星期信息
- 优雅的动画效果

### 📝 回忆管理
- **添加回忆**：记录标题、描述、日期和照片
- **编辑回忆**：随时修改已记录的内容
- **删除回忆**：支持删除不需要的记录（带确认提示）
- 数据本地存储，刷新不丢失

### 📸 照片功能
- 支持多张照片上传
- 照片预览和删除
- 时间线中展示照片缩略图
- 本地存储，保护隐私

## 🎨 设计风格

- **配色**：粉色/玫瑰色调，浪漫温馨
- **动画**：心跳动画、浮动效果、平滑过渡
- **布局**：移动端优先，响应式设计
- **交互**：流畅的用户体验，优雅的过渡效果

## 🚀 快速开始

### 在线访问
直接访问部署好的应用：
🔗 [https://zhangshilong1.github.io/love_storage](https://zhangshilong1.github.io/love_storage)

### 本地运行

#### 环境要求
- Node.js 16.0 或更高版本
- npm / yarn / pnpm

#### 安装步骤

1. **克隆仓库**
```bash
git clone https://github.com/zhangshilong1/love_storage.git
cd love_storage
```

2. **安装依赖**
```bash
npm install
```

3. **启动开发服务器**
```bash
npm run dev
```

4. **打开浏览器访问**
```
http://localhost:3000
```

#### 构建生产版本
```bash
npm run build
```

构建后的静态文件将位于 `dist` 目录。

## 📁 项目结构

```
love-memory/
├── app/                    # Next.js 应用目录
│   ├── globals.css        # 全局样式
│   ├── layout.tsx         # 根布局
│   └── page.tsx           # 主页面
├── components/            # 组件目录
│   ├── ui/               # UI 基础组件
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── dialog.tsx
│   ├── EventForm.tsx     # 事件表单组件
│   ├── LoveCounter.tsx   # 恋爱计数器组件
│   ├── SettingsForm.tsx  # 设置表单组件
│   └── Timeline.tsx      # 时间线组件
├── hooks/                # 自定义 Hooks
│   └── useStorage.ts     # localStorage 封装
├── lib/                  # 工具函数
│   └── utils.ts          # 通用工具函数
├── types/                # TypeScript 类型定义
│   └── index.ts
├── dist/                 # 构建输出目录
├── next.config.mjs       # Next.js 配置
├── tailwind.config.ts    # Tailwind CSS 配置
├── tsconfig.json         # TypeScript 配置
└── package.json          # 项目依赖
```

## 🛠️ 技术栈

- **框架**: [Next.js](https://nextjs.org/) 16 - React 框架
- **UI 库**: [React](https://react.dev/) 19 - 用户界面库
- **语言**: [TypeScript](https://www.typescriptlang.org/) - 类型安全的 JavaScript
- **样式**: [Tailwind CSS](https://tailwindcss.com/) - 实用优先的 CSS 框架
- **图标**: [Lucide React](https://lucide.dev/) - 精美图标库
- **工具**: 
  - clsx / tailwind-merge - 类名处理
  - class-variance-authority - 组件变体管理

## 🌟 核心功能详解

### 1. 恋爱计数器
- 设置恋爱开始日期后自动计算相恋天数
- 支持自定义双方昵称
- 精美的渐变背景和动画效果

### 2. 添加回忆
- 选择日期（默认为当天）
- 输入标题（如：第一次约会、周年纪念日）
- 添加详细描述
- 上传相关照片（支持多张）

### 3. 时间线展示
- 按时间倒序排列所有回忆
- 每个节点都有爱心图标装饰
- 显示完整的日期信息
- 支持编辑和删除操作

### 4. 数据存储
- 使用浏览器 localStorage 本地存储
- 数据完全保存在用户设备上
- 保护隐私，无需服务器

## 📝 使用说明

### 首次使用
1. 打开应用后，点击恋爱计数器右上角的设置按钮
2. 设置双方昵称和恋爱开始日期
3. 保存后即可看到恋爱天数统计

### 添加回忆
1. 点击"添加回忆"按钮
2. 选择日期、输入标题和描述
3. 可选：上传相关照片
4. 点击"添加回忆"保存

### 管理回忆
- **编辑**：点击回忆卡片上的"编辑"按钮
- **删除**：点击回忆卡片上的"删除"按钮（需确认）

## 🚀 部署

### 部署到 GitHub Pages

1. **Fork 或克隆仓库**

2. **修改 next.config.mjs**
```javascript
const nextConfig = {
  output: 'export',
  distDir: 'dist',
  assetPrefix: '.',
  images: {
    unoptimized: true,
  },
}
```

3. **构建项目**
```bash
npm run build
```

4. **推送到 gh-pages 分支**
```bash
git subtree push --prefix dist origin gh-pages
```

5. **在 GitHub 设置中启用 Pages**
   - 进入仓库 Settings > Pages
   - Source 选择 "Deploy from a branch"
   - Branch 选择 `gh-pages`，点击 Save

### 部署到 Vercel

点击下面按钮一键部署：

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/zhangshilong1/love_storage)

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

[MIT](LICENSE) License © 2024

---

💕 用 ❤️ 记录我们的故事
