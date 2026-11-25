# Agent Skills 中文学习课程

一套从零基础到独立设计 Agent Skills 的静态学习站点，共 34 个页面，包含五阶段学习路径、5 个预备知识页、5 个规范页、6 个设计方法页、3 个触发与评估页、4 个动手教程、3 个跨领域案例、毕业项目评分表，以及术语表与可打印清单。

站点为纯静态 HTML5，无框架、无构建步骤、无 npm 依赖、无 CDN。可以直接双击打开，也可以部署到 GitHub Pages 的项目子路径。

## 内容来源

课程以 [agentskills.io](https://agentskills.io/home.md) 的九个页面为主要依据，检索日期 **2026-11-25**。完整 URL、每页覆盖内容、外部补充资料以及“哪些不是来源内容”见站点内的 `docs/sources.html` 与根目录的 `SOURCE_ANALYSIS.md`。

正文使用四种固定标注：

- `[源站]`：可在 agentskills.io 非规范页面找到依据的事实。
- `[规范]`：来自 `specification.md` 的规范性内容与硬性约束。
- `[外部: https://…]`：来源之外的权威资料，URL 必填。
- `[本课程观点]`：本课程的类比、练习、时间估计、评分权重等教学设计。

## 本地预览

不需要安装任何依赖，也不需要构建。

**方式一：直接打开**

打开 `docs/index.html` 即可。搜索、目录、上一页/下一页均可工作；所有资源都是相对路径，因此 `file://` 下也能正常阅读。

**方式二：本地 HTTP 服务（推荐，便于验证链接与路径）**

```bash
cd docs
python3 -m http.server 8000
# Windows 若使用 Python Launcher：py -m http.server 8000
```

然后访问 <http://localhost:8000/>。

也可以用任意静态服务器，例如 Node.js 自带的临时服务或 VS Code 的 Live Server。站点不依赖服务端能力。

## 部署到 GitHub Pages（项目子路径）

本站已按“项目站点”设计：所有页面与资源引用均为相对路径（例如 `../assets/style.css`、`05-tutorials/t1-roll-dice.html`），没有根绝对路径；`docs/.nojekyll` 已存在，避免 Jekyll 处理带来意外。

1. 把整个仓库推送到 GitHub（本仓库当前**未**执行 `git init`、未推送，也未启用 Pages）。
2. 打开仓库的 **Settings → Pages**。
3. 在 **Build and deployment** 下，将 **Source** 设为 **Deploy from a branch**。
4. **Branch** 选择你的默认分支（例如 `main`），**Folder** 选择 **`/docs`**，点击 **Save**。
5. 等待发布完成。项目站点地址形如：

   ```text
   https://<你的用户名>.github.io/<仓库名>/
   ```

   首页即 `docs/index.html`。

不需要自定义域名、DNS、构建命令或 GitHub Actions。因为使用相对路径，站点在根路径与子路径下都能工作。

> 参考：GitHub 文档《Configuring a publishing source for your GitHub Pages site》说明可从分支的根目录或 `/docs` 目录发布。

## 目录结构

```text
.
├── README.md                  # 本文件
├── SOURCE_ANALYSIS.md         # 来源结构清单与覆盖/溯源表
├── TOPIC_INVENTORY.md         # 114 行逐主题覆盖清单（A1 门禁）
├── docs/                      # 站点根目录（GitHub Pages 发布目录）
│   ├── index.html             # 首页 + 学习路径总览
│   ├── path.html              # 五阶段路径 + 毕业自检门禁
│   ├── about.html             # 课程说明、技术实现、已知限制
│   ├── sources.html           # 来源 URL、检索日期、溯源说明
│   ├── glossary.html          # 术语表
│   ├── checklist.html         # 可打印检查清单
│   ├── index-all.html         # 全站索引
│   ├── 01-background/         # 预备知识（5 页）
│   ├── 02-core/               # 规范与机制（5 页）
│   ├── 03-authoring/          # 设计方法（6 页）
│   ├── 04-trigger-eval/       # 触发与评估（3 页）
│   ├── 05-tutorials/          # 动手教程（4 页）
│   ├── 06-cases/              # 实战案例（3 页）
│   ├── 07-capstone.html       # 毕业项目 + 评分表 + 反模式清单
│   ├── .nojekyll              # 禁用 Jekyll，按原样发布静态文件
│   └── assets/                # style.css、app.js、search-index.js、favicon.svg
├── examples/                  # 7 个示例 Skill（教程技能自包含，案例为设计稿）
│   ├── roll-dice/
│   ├── release-notes/
│   ├── csv-profile/
│   ├── changelog-writer/
│   ├── pdf-form-filler/
│   ├── code-review/
│   └── csv-analyzer/
└── tools/
    ├── check-links.js         # 内部链接、锚点、离线与可达性检查（零依赖）
    └── validate-skills.js     # frontmatter 校验（零依赖）
```

## 检查工具

两个脚本都只依赖 Node.js，不需要 `npm install`，没有 `package.json`。

**内部链接与站点机制检查**

```bash
node tools/check-links.js
```

检查 `docs/**/*.html` 中的所有 `href`/`src`：目标文件存在、`#fragment` 在目标页有对应 `id`/`name`、没有根绝对路径、没有外部 `link`/`script`/`img`，并验证每页有 `lang="zh-CN"`、一个 `h1`、非空 `title`、viewport；同时检查所有页面可从首页到达、且都出现在搜索索引中。

输出示例：

```text
SUMMARY pages=34 links=1357 broken=0 rootAbsolute=0 externalAssets=0 orphans=0 notIndexed=0
```

**示例 Skill 的 frontmatter 校验**

```bash
node tools/validate-skills.js examples
```

校验 `name` 是否存在、字符集、长度、连字符规则、是否与父目录一致；`description` 是否非空且为 1–1024 字符；`compatibility`、`metadata`、`allowed-tools` 的类型与长度；并解析 YAML 中的常见错误（未加引号的冒号、Tab 缩进、重复键等）。

## 示例 Skill 的使用

`examples/<skill-name>/` 是教程与案例中展示的完整技能目录。四个教程技能在磁盘上自包含，可直接复制到项目的 `.agents/skills/<skill-name>/`；三个案例技能是设计稿，不能直接运行。

- `roll-dice`：教程 1，最小可用技能，无依赖。
- `release-notes`：教程 2，自包含；`references/style-guide.md` 与 SKILL.md 中的加载触发配套。
- `csv-profile`：教程 3，自包含；含 `scripts/profile.js` 与 `assets/sample.csv`，可在技能目录内直接运行。
- `changelog-writer`：教程 4，自包含；含 `evals/trigger_queries.json` 与 `evals/evals.json`。
- `pdf-form-filler`、`code-review`、`csv-analyzer`：三个案例的设计稿，展示结构、流程、Gotchas 与验证方法。案例中引用的业务脚本未随站点提供，不能直接运行；请把它们当作设计参考，而不是可执行包。

四个教程技能可直接复制并在本地运行（`csv-profile` 的脚本已实际验证）。案例技能未在客户端中执行；使用前请用你自己的真实任务与数据验证。

## 已知限制

- 客户端行为不同：目录、用户调用语法、日志形态、frontmatter 处理都可能不同；教程以 VS Code + GitHub Copilot 为主。
- 模型行为非确定：触发率与输出质量会随模型和运行波动；课程中的数字是方法示例，不是普遍结论。
- 来源可能更新：课程以 2026-11-25 的页面内容为准，不保证与未来版本一致。
- 客户端展示页为动态渲染，课程未列出具体客户端名单。
- 教程 4 用 6 条查询、3 个用例压缩流程；真实项目建议约 20 条查询并多轮评估。
- 搜索为标题/模块/关键词的子串匹配，不理解同义词。
- 搜索索引是预生成的静态文件；新增或重命名页面时，需要同步更新 `docs/assets/search-index.js` 以及导航和上一页/下一页链接（或重新生成页面）。
- 无障碍只实现了基础项（语义标签、跳转链接、焦点样式），未做完整 WCAG 审计。
- 本仓库未执行 `git init`、未推送、未部署。

## 许可与归属

课程文本与示例代码可自由用于学习、教学与内部培训；转载或再发布时请注明本课程名称与来源页链接。Agent Skills 格式最初由 Anthropic 开发并作为开放标准发布；本课程是独立学习材料，与 agentskills.io、Anthropic 或任何客户端厂商无隶属关系。来源页面与第三方资料的版权归其各自作者所有。
