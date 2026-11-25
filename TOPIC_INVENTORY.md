# TOPIC_INVENTORY

- 编译日期：2026-11-25
- 来源：agentskills.io 的 9 个页面 + llms.txt，检索日期 2026-11-25
- 行数：114

> 排序说明：本清单在修订版（rev 2）审计阶段补编，晚于 rev-1 教学页的首次完成。不声称它先于教学页定稿；它用于核对既有页面是否覆盖了每个主题，并记录缺口。

| ID | 来源页面 URL | 检索日期 | 主题 | 课程覆盖页面 | 覆盖方式 | 缺口/出范围理由 |
| - | - | - | - | - | - | - |
| T001 | https://agentskills.io/llms.txt | 2026-11-25 | 站点索引与 9 页清单 | index-all, path | 目录页复现 | — |
| T002 | https://agentskills.io/home.md | 2026-11-25 | Skill 定义：目录 + SKILL.md | b1, c1 | 概念与结构 | — |
| T003 | https://agentskills.io/home.md | 2026-11-25 | 为什么需要 Skill：领域专长/可重复/跨产品复用 | b1, a1, a3 | 动机与写作方法 | — |
| T004 | https://agentskills.io/home.md | 2026-11-25 | 渐进披露三阶段：发现/激活/执行 | b5, c4 | 概念与生命周期 | — |
| T005 | https://agentskills.io/home.md | 2026-11-25 | 客户端支持与生态 | c5, sources | 跨客户端差异 | 展示页动态渲染，具体名单未取回 |
| T006 | https://agentskills.io/home.md | 2026-11-25 | 开放标准与 Anthropic 起源 | sources, about | 归属说明 | — |
| T007 | https://agentskills.io/home.md | 2026-11-25 | 快速入门与规范入口 | index, path | 导航 | — |
| T008 | https://agentskills.io/specification.md | 2026-11-25 | 目录结构（必选/可选） | c1 | 逐项讲解 | — |
| T009 | https://agentskills.io/specification.md | 2026-11-25 | SKILL.md 格式：YAML + Markdown | c1 | 格式解析 | — |
| T010 | https://agentskills.io/specification.md | 2026-11-25 | frontmatter 字段总表 | c2 | 表格与说明 | — |
| T011 | https://agentskills.io/specification.md | 2026-11-25 | name 字段约束 | c2 | 合法/非法示例 | — |
| T012 | https://agentskills.io/specification.md | 2026-11-25 | description 字段约束 | c2, e1 | 约束与写作方法 | — |
| T013 | https://agentskills.io/specification.md | 2026-11-25 | license 字段 | c2 | 示例 | — |
| T014 | https://agentskills.io/specification.md | 2026-11-25 | compatibility 字段 | c2 | 示例与长度 | — |
| T015 | https://agentskills.io/specification.md | 2026-11-25 | metadata 字段 | c2 | 字符串映射与 YAML 坑 | — |
| T016 | https://agentskills.io/specification.md | 2026-11-25 | allowed-tools 字段（实验性） | c2, b2 | 示例与限制 | — |
| T017 | https://agentskills.io/specification.md | 2026-11-25 | 正文内容与推荐小节 | c1 | 骨架与示例 | — |
| T018 | https://agentskills.io/specification.md | 2026-11-25 | scripts/ 目录 | c1, t3 | 职责与脚本设计 | — |
| T019 | https://agentskills.io/specification.md | 2026-11-25 | references/ 目录 | c1, t2 | 分工与加载触发 | — |
| T020 | https://agentskills.io/specification.md | 2026-11-25 | assets/ 目录 | c1 | 静态资源 | — |
| T021 | https://agentskills.io/specification.md | 2026-11-25 | 任意附加文件与目录 | c1 | 说明 | — |
| T022 | https://agentskills.io/specification.md | 2026-11-25 | 渐进披露三层与 token 预算 | c3, b5 | 预算表与拆分 | — |
| T023 | https://agentskills.io/specification.md | 2026-11-25 | 500 行 / 5000 token 建议 | c3 | 测量与拆分 | — |
| T024 | https://agentskills.io/specification.md | 2026-11-25 | 文件引用：相对路径与一层深度 | c1, a4 | 规则与反例 | — |
| T025 | https://agentskills.io/specification.md | 2026-11-25 | 校验：skills-ref validate | c5 | 命令与输出 | — |
| T026 | https://agentskills.io/specification.md | 2026-11-25 | skills-ref 参考库内部实现 | c5（仅链接） | 只给入口 | 源码实现属工具文档，未展开 |
| T027 | https://agentskills.io/clients.md | 2026-11-25 | Client Showcase 页面存在 | c5, sources | 跨客户端差异 | — |
| T028 | https://agentskills.io/clients.md | 2026-11-25 | 具体客户端名单与截图 | sources（说明） | 仅说明未取回 | 动态内容不可静态取回；不编造名单 |
| T029 | https://agentskills.io/skill-creation/quickstart.md | 2026-11-25 | 前置条件：VS Code + Copilot | t1 | 步骤复现 | — |
| T030 | https://agentskills.io/skill-creation/quickstart.md | 2026-11-25 | 技能位置 .agents/skills/<name>/SKILL.md | t1, c4 | 路径与目录 | — |
| T031 | https://agentskills.io/skill-creation/quickstart.md | 2026-11-25 | 创建最小 SKILL.md | t1 | 完整文件 | — |
| T032 | https://agentskills.io/skill-creation/quickstart.md | 2026-11-25 | name / description / body 的作用 | t1, c2, e1 | 逐部分解释 | — |
| T033 | https://agentskills.io/skill-creation/quickstart.md | 2026-11-25 | Agent 模式与 /skills 验证 | t1, c4 | 操作步骤 | — |
| T034 | https://agentskills.io/skill-creation/quickstart.md | 2026-11-25 | 触发与执行观察 | t1, c4 | 预期与检查点 | — |
| T035 | https://agentskills.io/skill-creation/quickstart.md | 2026-11-25 | 工具可靠性因模型而异 | t1, c5 | 常见错误 | — |
| T036 | https://agentskills.io/skill-creation/quickstart.md | 2026-11-25 | 跨客户端可用性 | t1, c5 | 说明与冒烟测试 | — |
| T037 | https://agentskills.io/skill-creation/quickstart.md | 2026-11-25 | 示例技能仓库 anthropics/skills | sources（链接） | 外部入口 | 不属于 9 页规范语料 |
| T038 | https://agentskills.io/skill-creation/best-practices.md | 2026-11-25 | 从真实专长出发 | a1 | 主题页与对比 | — |
| T039 | https://agentskills.io/skill-creation/best-practices.md | 2026-11-25 | 从亲手任务提取：步骤/纠正/格式/上下文 | a1 | 四类信息 | — |
| T040 | https://agentskills.io/skill-creation/best-practices.md | 2026-11-25 | 从项目材料综合：文档/规范/评审/历史/故障 | a1 | 材料清单 | — |
| T041 | https://agentskills.io/skill-creation/best-practices.md | 2026-11-25 | 用真实执行打磨 | a2 | 循环与方法 | — |
| T042 | https://agentskills.io/skill-creation/best-practices.md | 2026-11-25 | 读执行轨迹与三类浪费 | a2 | 轨迹分析 | — |
| T043 | https://agentskills.io/skill-creation/best-practices.md | 2026-11-25 | 上下文经济：补缺省已知 | a3 | 准则与 PDF 例 | — |
| T044 | https://agentskills.io/skill-creation/best-practices.md | 2026-11-25 | 连贯单元与范围 | a3 | 范围表 | — |
| T045 | https://agentskills.io/skill-creation/best-practices.md | 2026-11-25 | 适中细节 | a3 | 决策覆盖率 | — |
| T046 | https://agentskills.io/skill-creation/best-practices.md | 2026-11-25 | 渐进披露与加载触发 | a4 | 触发写法 | — |
| T047 | https://agentskills.io/skill-creation/best-practices.md | 2026-11-25 | 控制校准：具体度匹配脆弱性 | a5 | 自由/规定 | — |
| T048 | https://agentskills.io/skill-creation/best-practices.md | 2026-11-25 | 默认值而非菜单 | a5 | 对比 | — |
| T049 | https://agentskills.io/skill-creation/best-practices.md | 2026-11-25 | 程序优先于声明 | a5 | 对比 | — |
| T050 | https://agentskills.io/skill-creation/best-practices.md | 2026-11-25 | Gotchas | a6 | 模式与示例 | — |
| T051 | https://agentskills.io/skill-creation/best-practices.md | 2026-11-25 | 输出模板 | a6 | 模式与示例 | — |
| T052 | https://agentskills.io/skill-creation/best-practices.md | 2026-11-25 | 多步清单 | a6 | 模式与示例 | — |
| T053 | https://agentskills.io/skill-creation/best-practices.md | 2026-11-25 | 验证循环 | a6 | 模式与示例 | — |
| T054 | https://agentskills.io/skill-creation/best-practices.md | 2026-11-25 | 计划—校验—执行 | a6 | 模式与示例 | — |
| T055 | https://agentskills.io/skill-creation/best-practices.md | 2026-11-25 | 打包可复用脚本 | a6 | 信号与设计 | — |
| T056 | https://agentskills.io/skill-creation/best-practices.md | 2026-11-25 | 评估与描述优化入口 | e2, e3 | 导航 | — |
| T057 | https://agentskills.io/skill-creation/optimizing-descriptions.md | 2026-11-25 | 触发机制与描述的负担 | e1 | 机制与写作 | — |
| T058 | https://agentskills.io/skill-creation/optimizing-descriptions.md | 2026-11-25 | 简单任务可能不触发 | e1 | 适用边界 | — |
| T059 | https://agentskills.io/skill-creation/optimizing-descriptions.md | 2026-11-25 | 描述写作四原则 | e1 | 原则与对比 | — |
| T060 | https://agentskills.io/skill-creation/optimizing-descriptions.md | 2026-11-25 | 1024 字符限制 | e1, c2 | 约束 | — |
| T061 | https://agentskills.io/skill-creation/optimizing-descriptions.md | 2026-11-25 | 触发查询集设计 | e2 | 正负例与轴 | — |
| T062 | https://agentskills.io/skill-creation/optimizing-descriptions.md | 2026-11-25 | 近邻负例与真实性 | e2 | 方法 | — |
| T063 | https://agentskills.io/skill-creation/optimizing-descriptions.md | 2026-11-25 | 多次运行与触发率 | e2 | 阈值与记录 | — |
| T064 | https://agentskills.io/skill-creation/optimizing-descriptions.md | 2026-11-25 | 训练/验证划分 | e2 | 60/40 | — |
| T065 | https://agentskills.io/skill-creation/optimizing-descriptions.md | 2026-11-25 | 优化循环与过拟合 | e2 | 五步循环 | — |
| T066 | https://agentskills.io/skill-creation/optimizing-descriptions.md | 2026-11-25 | 应用结果与新查询检验 | e2 | 应用步骤 | — |
| T067 | https://agentskills.io/skill-creation/optimizing-descriptions.md | 2026-11-25 | skill-creator 自动化 | e2（提及） | 只提及 | 不引入外部技能或依赖 |
| T068 | https://agentskills.io/skill-creation/evaluating-skills.md | 2026-11-25 | 评估用例三部分 | e3 | 结构与 evals.json | — |
| T069 | https://agentskills.io/skill-creation/evaluating-skills.md | 2026-11-25 | 提示写法建议 | e3 | 四条建议 | — |
| T070 | https://agentskills.io/skill-creation/evaluating-skills.md | 2026-11-25 | 有/无技能对照 | e3 | 基线 | — |
| T071 | https://agentskills.io/skill-creation/evaluating-skills.md | 2026-11-25 | 工作区与迭代目录 | e3 | 结构 | — |
| T072 | https://agentskills.io/skill-creation/evaluating-skills.md | 2026-11-25 | token/耗时记录 | e3 | timing | — |
| T073 | https://agentskills.io/skill-creation/evaluating-skills.md | 2026-11-25 | 断言强弱 | e3 | 对比 | — |
| T074 | https://agentskills.io/skill-creation/evaluating-skills.md | 2026-11-25 | 评分与证据 | e3 | PASS/FAIL | — |
| T075 | https://agentskills.io/skill-creation/evaluating-skills.md | 2026-11-25 | 基准汇总与 delta | e3 | 字段 | — |
| T076 | https://agentskills.io/skill-creation/evaluating-skills.md | 2026-11-25 | 模式分析 | e3 | 五类模式 | — |
| T077 | https://agentskills.io/skill-creation/evaluating-skills.md | 2026-11-25 | 人工评审 | e3 | 反馈写法 | — |
| T078 | https://agentskills.io/skill-creation/evaluating-skills.md | 2026-11-25 | 迭代信号与原则 | e3 | 循环 | — |
| T079 | https://agentskills.io/skill-creation/evaluating-skills.md | 2026-11-25 | skill-creator 自动化 | e3（提及） | 只提及 | 不引入外部技能 |
| T080 | https://agentskills.io/skill-creation/using-scripts.md | 2026-11-25 | 一次性命令与版本固定 | a6 | 原则与示例 | — |
| T081 | https://agentskills.io/skill-creation/using-scripts.md | 2026-11-25 | uvx / pipx | a6 | 选择性示例 | — |
| T082 | https://agentskills.io/skill-creation/using-scripts.md | 2026-11-25 | npx / bunx | a6 | 选择性示例 | — |
| T083 | https://agentskills.io/skill-creation/using-scripts.md | 2026-11-25 | deno run / go run | a6 | 选择性示例 | — |
| T084 | https://agentskills.io/skill-creation/using-scripts.md | 2026-11-25 | 脚本引用与相对路径 | a6, t3 | 规则 | — |
| T085 | https://agentskills.io/skill-creation/using-scripts.md | 2026-11-25 | 自包含脚本 PEP 723 | a6（提及） | 原则 | 不展开各语言打包细节 |
| T086 | https://agentskills.io/skill-creation/using-scripts.md | 2026-11-25 | Deno / Bun / Ruby 自包含 | sources（链接） | 未展开 | 外部工具文档 |
| T087 | https://agentskills.io/skill-creation/using-scripts.md | 2026-11-25 | 非交互要求 | a6, t3 | 八条设计表 | — |
| T088 | https://agentskills.io/skill-creation/using-scripts.md | 2026-11-25 | --help 与错误信息 | a6, t3 | 设计表与脚本 | — |
| T089 | https://agentskills.io/skill-creation/using-scripts.md | 2026-11-25 | 结构化输出与 stdout/stderr | a6, t3 | 设计表 | — |
| T090 | https://agentskills.io/skill-creation/using-scripts.md | 2026-11-25 | 幂等 / dry-run / 退出码 | a6, t3 | 设计表与示例 | — |
| T091 | https://agentskills.io/skill-creation/using-scripts.md | 2026-11-25 | 输出体积与截断 | a6 | 设计表 | — |
| T092 | https://agentskills.io/client-implementation/adding-skills-support.md | 2026-11-25 | 渐进披露三层表 | b5, c4 | 机制 | — |
| T093 | https://agentskills.io/client-implementation/adding-skills-support.md | 2026-11-25 | 扫描项目级/用户级目录 | c4 | 路径表 | — |
| T094 | https://agentskills.io/client-implementation/adding-skills-support.md | 2026-11-25 | .agents/skills 约定 | c4 | 路径表 | — |
| T095 | https://agentskills.io/client-implementation/adding-skills-support.md | 2026-11-25 | 客户端原生目录与 .claude/skills | c4 | 兼容说明 | — |
| T096 | https://agentskills.io/client-implementation/adding-skills-support.md | 2026-11-25 | 扫描规则与深度限制 | c4 | 规则 | — |
| T097 | https://agentskills.io/client-implementation/adding-skills-support.md | 2026-11-25 | 同名冲突覆盖 | c4 | 规则 | — |
| T098 | https://agentskills.io/client-implementation/adding-skills-support.md | 2026-11-25 | 项目信任边界 | c4 | 规则 | — |
| T099 | https://agentskills.io/client-implementation/adding-skills-support.md | 2026-11-25 | 云端/沙箱发现 | c4 | 三种来源 | — |
| T100 | https://agentskills.io/client-implementation/adding-skills-support.md | 2026-11-25 | 解析 frontmatter | c4 | 步骤 | — |
| T101 | https://agentskills.io/client-implementation/adding-skills-support.md | 2026-11-25 | 畸形 YAML 兜底 | c5 | 常见坑 | — |
| T102 | https://agentskills.io/client-implementation/adding-skills-support.md | 2026-11-25 | 宽松校验 | c5 | 严格 vs 宽松 | — |
| T103 | https://agentskills.io/client-implementation/adding-skills-support.md | 2026-11-25 | 存储 name/description/location | c4 | 字段 | — |
| T104 | https://agentskills.io/client-implementation/adding-skills-support.md | 2026-11-25 | 技能目录披露 | c4 | 示例 | — |
| T105 | https://agentskills.io/client-implementation/adding-skills-support.md | 2026-11-25 | 目录放置与过滤 | c4 | 规则 | — |
| T106 | https://agentskills.io/client-implementation/adding-skills-support.md | 2026-11-25 | 行为指令与无技能时 | c4 | 说明 | — |
| T107 | https://agentskills.io/client-implementation/adding-skills-support.md | 2026-11-25 | 激活：文件读取 vs 专用工具 | c4 | 两种方式 | — |
| T108 | https://agentskills.io/client-implementation/adding-skills-support.md | 2026-11-25 | 用户显式激活 | c4 | 语法 | — |
| T109 | https://agentskills.io/client-implementation/adding-skills-support.md | 2026-11-25 | 模型收到什么（全文/剥离） | c4 | 差异 | — |
| T110 | https://agentskills.io/client-implementation/adding-skills-support.md | 2026-11-25 | 结构化包装与资源清单 | c4 | 机制 | — |
| T111 | https://agentskills.io/client-implementation/adding-skills-support.md | 2026-11-25 | 权限白名单 | c4 | 机制 | — |
| T112 | https://agentskills.io/client-implementation/adding-skills-support.md | 2026-11-25 | 上下文压缩保护与去重 | c4 | 机制 | — |
| T113 | https://agentskills.io/client-implementation/adding-skills-support.md | 2026-11-25 | 子代理委派 | c4 | 可选模式 | — |
| T114 | https://agentskills.io/client-implementation/adding-skills-support.md | 2026-11-25 | 编写客户端代码 | sources（说明） | 未展开 | 课程面向技能作者 |
