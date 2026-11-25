# Agent Skills 来源分析与课程覆盖表

- **检索日期：** 2026-11-25
- **检索方式：** 直接请求各页面的 Markdown 版本（`.md`），读取完整正文；补充资料另行访问确认。
- **主要来源：** <https://agentskills.io/home.md> 及其索引 <https://agentskills.io/llms.txt> 列出的全部 9 个页面。
- **结论：** 9 个来源页面全部映射到课程页面，无静默遗漏；1 个页面（Client Showcase）因内容动态渲染只能部分覆盖，1 个页面（客户端实现指南）按“理解机制”而非“编写客户端”覆盖。出范围项均在第 6 节说明理由。

---

## 1. 来源站点结构总览

`llms.txt` 给出的站点索引正好是 9 个页面，分为四组：

| 组 | 页面 | 定位 |
| - | - | - |
| 总览 | `home.md` | 什么是 Agent Skills、为何存在、如何工作、生态与入口 |
| 规范 | `specification.md` | 完整格式规范：目录、frontmatter、正文、可选目录、渐进披露、文件引用、校验 |
| 生态 | `clients.md` | 支持该格式的客户端展示（动态） |
| 创建指南 | `skill-creation/quickstart.md` | 在 VS Code 中创建第一个技能 |
| 创建指南 | `skill-creation/best-practices.md` | 如何写出范围合理、控制得当的技能 |
| 创建指南 | `skill-creation/optimizing-descriptions.md` | 如何让描述可靠触发 |
| 创建指南 | `skill-creation/evaluating-skills.md` | 如何用评估驱动迭代输出质量 |
| 创建指南 | `skill-creation/using-scripts.md` | 如何在技能中运行命令与打包脚本 |
| 实现指南 | `client-implementation/adding-skills-support.md` | 如何为 Agent 或开发工具添加技能支持 |

**结构特征：**

1. **规范与指南分离。** 只有 `specification.md` 定义“必须/可选/限制”；其余页面是方法建议。课程严格保留这一区分，不把建议写成硬性要求。
2. **创建流程形成闭环。** quickstart（做出第一个）→ best-practices（写好内容）→ optimizing-descriptions（触发）→ evaluating-skills（输出质量）→ using-scripts（执行层能力）。
3. **实现指南是“另一侧”的视角。** 它描述客户端如何发现、解析、披露、激活与管理技能，能解释创建指南中的许多“为什么”。
4. **交叉链接密集。** 各指南反复回链规范的具体锚点（如 `#progressive-disclosure`、`#description-field`），并把评估、脚本、描述优化互相连接。

---

## 2. 逐页清点：章节顺序与交叉链接

### 2.1 `home.md` — Agent Skills Overview

**章节顺序：**

1. What are Agent Skills?（定义、目录树、示例）
2. Why Agent Skills?（领域专长、可重复工作流、跨产品复用）
3. How do Agent Skills work?（Discovery / Activation / Execution 三阶段）
4. Where can I use Agent Skills?
5. Open development（Anthropic 起源、开放标准、GitHub / Discord）
6. Get started with Agent Skills（Quickstart、Specification 两张卡片）

**主要知识点：** 技能是包含 `SKILL.md` 的文件夹；frontmatter 至少含 name 与 description；可捆绑 scripts / references / assets；渐进披露三阶段；开放标准与生态。

**交叉链接：** `clients.md`、`skill-creation/quickstart.md`、`specification.md`、Anthropic 官网、GitHub 仓库、Discord。

**课程映射：** 首页、`b1-agent`、`b5-progressive`、`c4-lifecycle`、`sources`。

---

### 2.2 `specification.md` — Specification

**章节顺序：**

1. Directory structure
2. `SKILL.md` format
   1. Frontmatter（字段表；name / description / license / compatibility / metadata / allowed-tools 六个小节，含合法与非法示例）
   2. Body content（推荐分步指令、输入输出示例、常见边界）
3. Optional directories（`scripts/`、`references/`、`assets/`）
4. Progressive disclosure（三层与 token 参考值；500 行建议）
5. File references（相对路径、一层深度）
6. Validation（`skills-ref validate ./my-skill`）

**主要知识点：** 六字段约束（name ≤64、字符集、连字符、与父目录一致；description 1–1024；compatibility ≤500；metadata 为字符串映射；allowed-tools 为空格分隔且实验性）；正文无格式限制；三个可选目录的职责；三层 token 预算；引用路径规则；官方校验工具。

**交叉链接：** `skills-ref` 参考库（GitHub）；客户端实现指南与最佳实践页回链本页的 `#progressive-disclosure`、`#description-field`、`#compatibility-field`、`#file-references`、`#validation` 等锚点。本页自身外链较少。

**课程映射：** `c1-anatomy`、`c2-frontmatter`、`c3-budgets`、`c5-validation`、`t3-scripts`、`glossary`。

---

### 2.3 `clients.md` — Client Showcase

**章节顺序：** 仅有标题、副标题与 “Shuffle / Alphabetical” 排序控件。

**实际情况：** 客户端列表由客户端脚本动态渲染，Markdown 静态取回时没有具体条目。课程**没有**据此编造客户端名单，也没有声称覆盖完整生态；在来源页与关于页中如实说明。

**交叉链接：** 由 `home.md` 链接进入；页面内的具体客户端链接未能静态取回。

**课程映射：** 仅在 `c5-validation`（跨客户端差异）与 `sources`（检索说明）中作为背景提及。

---

### 2.4 `skill-creation/quickstart.md` — Quickstart

**章节顺序：**

1. Prerequisites（VS Code + GitHub Copilot）
2. Create the skill（`.agents/skills/roll-dice/SKILL.md` 全文；解释 name / description / body）
3. Try it out（Agent 模式、`/skills`、输入 “Roll a d20”、权限提示）
4. How it works（Discovery / Activation / Execution）
5. Next steps（Best practices、Optimizing descriptions、Specification、Example skills）

**主要知识点：** 目录位置；description 驱动激活；`/skills` 验证发现；工具使用可靠性因模型而异；同一技能可跨客户端使用；完整的最小技能示例。

**交叉链接：** VS Code、Copilot 扩展、Claude Code、OpenAI Codex、best-practices、optimizing-descriptions、specification、`anthropics/skills` 示例仓库。

**课程映射：** `t1-roll-dice`（完整复现）、`c4-lifecycle`（发现—激活—执行）、`e1-description`（描述驱动触发）。

---

### 2.5 `skill-creation/best-practices.md` — Best practices for skill creators

**章节顺序：**

1. Start from real expertise
   1. Extract from a hands-on task
   2. Synthesize from existing project artifacts
2. Refine with real execution（读执行轨迹；三类浪费）
3. Spending context wisely
   1. Add what the agent lacks, omit what it knows
   2. Design coherent units
   3. Aim for moderate detail
   4. Structure large skills with progressive disclosure
4. Calibrating control
   1. Match specificity to fragility
   2. Provide defaults, not menus
   3. Favor procedures over declarations
5. Patterns for effective instructions
   1. Gotchas sections
   2. Templates for output format
   3. Checklists for multi-step workflows
   4. Validation loops
   5. Plan-validate-execute
   6. Bundling reusable scripts
6. Next steps（evaluating、optimizing）

**主要知识点：** 真实专长来源；执行打磨；上下文预算与减法；连贯单元；适中细节；加载触发；控制校准；默认值；程序优于声明；六种指令模式；脚本打包信号。

**交叉链接：** spec 的 `#progressive-disclosure`、`#file-references` 等锚点；evaluating-skills；using-scripts；optimizing-descriptions。

**课程映射：** `a1`–`a6` 六个设计方法页、`07-capstone`（评分维度与反模式）、`t2`/`t3`（结构、脚本）、`c3`（预算）。

---

### 2.6 `skill-creation/optimizing-descriptions.md` — Optimizing skill descriptions

**章节顺序：**

1. How skill triggering works（描述承担全部触发负担；简单任务可能不触发）
2. Writing effective descriptions（祈使、意图、主动覆盖、简洁）
3. Designing trigger eval queries（should-trigger、should-not-trigger、realism）
4. Testing whether a description triggers（多次运行、触发率、脚本骨架）
5. Avoiding overfitting with train/validation splits（60/40、固定划分）
6. The optimization loop（五步、按失败类型修改、避免堆词、1024 限制）
7. Applying the result（更新、长度检查、新查询检验、改前/改后示例）
8. Next steps（evaluating-skills）

**主要知识点：** 触发机制与描述的唯一入口地位；四条写作原则；约 20 条查询、正负各半、近邻负例；每条 3 次、阈值 0.5；训练/验证划分；五轮循环；验证集选版本；避免过拟合与关键词堆砌。

**交叉链接：** spec 的 `#progressive-disclosure`、`#description-field`；evaluating-skills；`skill-creator` 技能仓库。

**课程映射：** `e1-description`、`e2-trigger-eval`、`t4-description-eval`、`07-capstone`（触发描述维度）。

---

### 2.7 `skill-creation/evaluating-skills.md` — Evaluating skill output quality

**章节顺序：**

1. Designing test cases（prompt / expected output / files；存放于 `evals/evals.json`）
2. Running evals（workspace 结构、有/无技能、干净上下文、timing）
3. Writing assertions（强/弱断言）
4. Grading outputs（PASS/FAIL + 证据；评分原则；盲评）
5. Aggregating results（benchmark、delta）
6. Analyzing patterns（总是通过/总是失败/仅技能通过/不稳定/异常值）
7. Reviewing results with a human（具体反馈）
8. Iterating on the skill（三类信号、四条原则、循环）

**主要知识点：** 评估用例结构；基线对照；token/耗时记录；断言可验证性；证据要求；通过率与成本差值；模式分析；人工评审；迭代原则（泛化、精简、解释原因、打包重复工作）。

**交叉链接：** using-scripts（打包重复逻辑）；`skill-creator`；Claude Code 任务通知文档（timing 数据来源）；optimizing-descriptions。

**课程映射：** `e3-output-eval`、`t4-description-eval`（3 个用例）、`07-capstone`（验证闭环）、`t3-scripts`（验证循环）。

---

### 2.8 `skill-creation/using-scripts.md` — Using scripts in skills

**章节顺序：**

1. One-off commands（uvx、pipx、npx、bunx、deno run、go run；固定版本、声明前置、复杂命令移入脚本）
2. Referencing scripts from SKILL.md（相对路径、脚本清单、运行示例）
3. Self-contained scripts（Python PEP 723、Deno、Bun、Ruby）
4. Designing scripts for agentic use
   1. Avoid interactive prompts（硬性要求）
   2. Document usage with `--help`
   3. Write helpful error messages
   4. Use structured output（stdout 数据 / stderr 诊断）
   5. Further considerations（幂等、输入约束、dry-run、退出码、安全默认、输出体积）

**主要知识点：** 一次性命令与脚本的边界；版本固定；自包含依赖；非交互；帮助信息；可操作错误；结构化输出；幂等；试运行；退出码；输出上限与截断。

**交叉链接：** uv、pipx、npm/npx、Bun、Deno、Go、RubyGems、PEP 723；best-practices 与 evaluating-skills 回链本页。

**课程映射：** `a6-patterns`（脚本设计八条）、`t3-scripts`（完整脚本与验证循环）、`glossary`。

---

### 2.9 `client-implementation/adding-skills-support.md` — How to add skills support to your agent

**章节顺序：**

1. The core principle: progressive disclosure（三层表）
2. Step 1: Discover skills（扫描位置、扫描对象、名称冲突、信任、云端/沙箱）
3. Step 2: Parse `SKILL.md`（frontmatter 提取、畸形 YAML、宽松校验、存储字段）
4. Step 3: Disclose available skills（目录、放置位置、行为指令、过滤、无技能时）
5. Step 4: Activate skills（模型驱动、用户显式、模型收到什么、结构化包装、资源清单、权限白名单）
6. Step 5: Manage skill context over time（防压缩、去重、子代理）

**主要知识点：** 生命周期五步；项目级/用户级与 `.agents/skills/` 约定；冲突覆盖与信任；宽松校验；目录约 50–100 token；两种激活机制；上下文压缩保护；子代理隔离。

**交叉链接：** specification（格式与字段）、spec 的 `#compatibility-field`、XDG 规范；其他页面未直接回链本页。

**课程映射：** `c4-lifecycle`（主要）、`c5-validation`（宽松校验）、`b5-progressive`（目录成本）、`c3-budgets`（token 预算）、`glossary`。

---

## 3. 覆盖与溯源表（每页一行）

| # | 来源页面 | 主要主题 | 覆盖本课程页面 | 覆盖方式 | 缺口 / 出范围理由 |
| - | - | - | - | - | - |
| 1 | `home.md` | 定义、目录、动机、三阶段加载、开放标准 | `index`、`b1-agent`、`b5-progressive`、`c4-lifecycle`、`sources` | 完整讲解并复现目录结构；三阶段在 b5 与 c4 分别从概念与实现角度展开 | 无实质缺口。生态入口（GitHub/Discord）仅作归属说明，不展开社区运营 |
| 2 | `specification.md` | 目录、六字段、正文、可选目录、渐进披露、文件引用、校验 | `c1-anatomy`、`c2-frontmatter`、`c3-budgets`、`c5-validation`、`glossary`、三个案例 | 字段逐条制表并配合法/非法示例；预算与拆分单列一页；校验给出官方与本地两种方式 | `skills-ref` 的内部实现不展开（属工具源码，非格式规范） |
| 3 | `clients.md` | 客户端展示 | `c5-validation`、`sources` | 仅说明生态存在与跨客户端差异 | **部分覆盖**：列表动态渲染，静态取回无条目；不编造名单 |
| 4 | `quickstart.md` | 第一个技能、`/skills`、发现—激活—执行、工具可靠性 | `t1-roll-dice`、`c4-lifecycle`、`e1-description` | 教程 1 完整复现文件与步骤，并补充检查点与常见错误 | 仅覆盖 VS Code + Copilot；其他客户端的行为差异在 c5 说明，不逐一复现 |
| 5 | `best-practices.md` | 真实专长、执行打磨、上下文经济、范围、细节、控制、六种模式 | `a1`–`a6`、`07-capstone`、`t2`、`t3`、`c3` | 每个主题簇一页，配坏/好对比；评分维度直接取自七个准则 | 无实质缺口。来源的示例代码按主题改写为中文案例，未逐字复制 |
| 6 | `optimizing-descriptions.md` | 触发机制、描述写作、查询集、触发率、划分、循环 | `e1-description`、`e2-trigger-eval`、`t4-description-eval` | 原则、脚本骨架、五步循环完整落地；教程 4 做 6 条查询的最小版 | 自动化脚本仅给结构与 Claude Code 示例；其他客户端的检测逻辑不逐一实现（见第 6 节） |
| 7 | `evaluating-skills.md` | 用例、有/无对照、断言、评分、基准、模式、人工评审、迭代 | `e3-output-eval`、`t4-description-eval`、`07-capstone`、`t3-scripts` | 结构、断言强弱、证据要求、benchmark 字段与迭代原则均覆盖；教程给出 3 个用例 | 不提供跨客户端的评估运行器；子代理/任务通知等客户端能力只作说明 |
| 8 | `using-scripts.md` | 一次性命令、引用、自包含依赖、代理友好设计 | `a6-patterns`、`t3-scripts`、`glossary` | 八条脚本设计要求表格化；教程 3 提供完整可运行脚本、退出码、失败路径 | uvx/pipx/npx/bunx/deno/go 等只做选择性举例，未逐一教学；语言生态属外部工具文档范围 |
| 9 | `adding-skills-support.md` | 五步生命周期、目录、冲突、信任、宽松校验、激活、上下文管理 | `c4-lifecycle`、`c5-validation`、`b5-progressive`、`c3-budgets`、`glossary` | 以“技能作者需要知道的实现行为”为视角讲解；保留宽松校验与冲突规则 | **按设计部分覆盖**：不教如何编写客户端代码（超出本课程目标）；不覆盖全部扫描位置与云架构 |

**汇总：** 9/9 页面有明确课程落点；7 页完整覆盖，2 页部分覆盖且理由已说明；无“主要主题静默缺失”。

---

## 4. 反向索引：课程页面到来源

| 课程模块 | 页面 | 主要来源 |
| - | - | - |
| 首页 / 路径 | `index`、`path`、`about`、`sources` | 全部 9 页（总览与元信息） |
| 预备知识 | `b1` Agent | home；外部：Anthropic agents |
| 预备知识 | `b2` 工具调用 | using-scripts（非交互）、quickstart（可靠性）、spec（allowed-tools）；外部：OpenAI function calling、MCP |
| 预备知识 | `b3` 上下文 | spec（预算）、best-practices（上下文经济）；外部：OpenAI tokens、Lost in the Middle |
| 预备知识 | `b4` 提示词与文件 | spec（SKILL.md 格式）；外部：YAML |
| 预备知识 | `b5` 渐进披露 | home（三阶段）、spec（三层与预算）、adding-support（目录成本） |
| 规范 | `c1` 解剖 | spec（目录、正文、可选目录、文件引用） |
| 规范 | `c2` frontmatter | spec（六字段）、adding-support（宽松校验） |
| 规范 | `c3` 预算 | spec（500 行/5000 token）、best-practices（拆分与触发）、adding-support（目录成本） |
| 规范 | `c4` 生命周期 | adding-support（五步、目录、冲突、激活）、home、quickstart |
| 规范 | `c5` 校验 | spec（validation）、adding-support（宽松校验、畸形 YAML） |
| 设计 | `a1`–`a6` | best-practices（各主题簇）、evaluating、using-scripts |
| 触发与评估 | `e1` 描述 | optimizing-descriptions（原则与改前/改后） |
| 触发与评估 | `e2` 触发评估 | optimizing-descriptions（查询、触发率、划分、循环） |
| 触发与评估 | `e3` 输出评估 | evaluating-skills（用例、断言、评分、基准、迭代） |
| 教程 | `t1`–`t4` | quickstart；best-practices；using-scripts；optimizing；evaluating |
| 案例 | `case1`–`case3` | best-practices（模式与校准）；spec（格式）；evaluating（验证思路） |
| 毕业项目 | `07-capstone` | best-practices（七准则）、optimizing、evaluating |
| 参考 | `glossary`、`checklist`、`sources` | spec、best-practices、using-scripts、adding-support |

---

## 5. 来源中的“建议”与“硬性要求”

课程在写作时严格区分，以下为关键清单：

**硬性要求（规范明确）：**

- 技能目录至少包含 `SKILL.md`。
- `SKILL.md` 含 YAML frontmatter 与 Markdown 正文。
- `name` 必选，1–64 字符，只含 `a-z`、`0-9`、`-`，不以连字符开头/结尾，无连续连字符，与父目录一致。
- `description` 必选，1–1024 字符，非空。
- `compatibility` 若提供，1–500 字符。
- `metadata` 为字符串键到字符串值的映射。
- `allowed-tools` 若提供，为空格分隔字符串（字段本身实验性）。

**建议（规范用 “recommended” 或指南表述）：**

- 正文少于 500 行、约 5000 token。
- 元数据约 100 token；客户端指南给出每技能约 50–100 token。
- 文件引用一层深度。
- 正文推荐包含分步指令、输入输出示例、边界情况。
- 描述应说明做什么与何时用、包含关键词。
- 所有最佳实践、触发评估与输出评估方法。

课程没有把任何“建议”写成校验器会拒绝的硬门槛；在涉及数字时保留“建议”“参考值”的限定。

---

## 6. 出范围清单与理由

| 项目 | 处理 | 理由 |
| - | - | - |
| `clients.md` 的具体客户端名单 | 不列 | 内容为动态渲染，静态检索无条目；编造名单会违反诚实性要求 |
| 编写一个完整的客户端实现 | 不教 | `adding-skills-support.md` 面向实现者；本课程目标是技能作者。课程只讲作者需要理解的加载行为 |
| `skills-ref` 的安装步骤与源码结构 | 只给命令与仓库链接 | 属工具文档与源码，非格式规范；环境差异大 |
| `anthropics/skills` 示例仓库内容 | 不复制 | quickstart 外链；不属于 9 页来源语料，未作为规范依据 |
| GitHub / Discord 社区运营与贡献流程 | 仅作归属说明 | 与学习目标无关 |
| 各客户端的具体 UI、命令与配置 | 仅以 VS Code/Copilot 为例 | 客户端众多且更新快；课程讲格式与机制，不追逐 UI |
| uvx / pipx / npx / bunx / deno / go / Ruby 的完整用法 | 选择性举例 | 属外部工具文档；课程给出选型原则与固定版本建议 |
| 跨客户端的评估自动化运行器 | 给脚本骨架与检测思路 | 依赖各客户端接口；课程强调方法而非特定实现 |
| 完整的技能供应链安全威胁模型 | 仅覆盖信任边界与权限提示 | 属安全专题；来源只给出信任检查建议，课程不扩展为未经验证的内容 |
| 第三方技能的许可证与合规 | 仅说明 `license` 字段 | 需逐案法律判断，超出课程范围 |
| 实际部署（GitHub Pages、DNS、远程仓库） | **不执行** | 执行令明确禁止任何对外发布行为；站点仅做到“可部署” |

---

## 7. 检索完整性与已知缺口

1. **9 页均成功访问。** 其中 8 页取得完整正文；`clients.md` 仅取得静态骨架（标题与排序控件），动态客户端列表未取回。无页面因失败而凭记忆补写。
2. **`clients.md` 动态内容缺口。** 已在上表与站点来源页说明；未虚构客户端。
3. **来源版本时效。** 规范与指南可能更新；课程以 2026-11-25 内容为准，并在多处提示“以官方页面为准”。
4. **示例可运行性边界。** `csv-profile` 的脚本已实际运行验证；三个案例的业务脚本未随站点提供，仅展示设计与流程，站点关于页已声明。
5. **评估数字的性质。** 教程 4 的触发表明确标为教学示例，不代表真实模型实测；方法可复现，数字不可引用为结论。
6. **跨客户端差异。** 课程覆盖了生命周期与常见差异，但未在每种客户端中逐一实测；这是“可迁移知识”与“具体操作手册”的取舍。

---

## 8. 课程设计映射（来源 → 五阶段）

| 阶段 | 来源支撑 | 课程新增（非来源） |
| - | - | - |
| S1 认知准备 | home、spec 的加载模型、adding-support 的目录成本；外部背景 | LLM/Agent/上下文的简化定义、类比、练习 |
| S2 读懂规范 | specification 全文、quickstart 的目录与验证、adding-support 的解析与宽松校验 | 字段表的中文化、合法/非法示例扩充、本地校验脚本 |
| S3 写出好内容 | best-practices 全部主题、using-scripts 的脚本设计 | 坏/好对比、教程 1–3、案例设计、练习 |
| S4 触发与评估 | optimizing-descriptions、evaluating-skills | 最小评估教程、记录表模板、阈值与划分的教学化 |
| S5 交付与迁移 | best-practices 的组合应用、evaluating 的迭代 | 三个跨领域案例、100 分评分表、反模式清单、同行评审协议 |

课程新增部分均以 `[本课程观点]` 标注，不冒充来源事实。逐主题（而非逐页）的 114 行覆盖清单见根目录 `TOPIC_INVENTORY.md`；本文件保留叙述式分析与 9 页汇总表。
