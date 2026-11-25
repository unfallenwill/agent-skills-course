---
name: code-review
description: Review a pull request or diff for security, authorization, concurrency, data-loss, and error-leak risks, and report findings with file, line, severity, and evidence. Use when the user asks for a code review, PR review, or a pre-merge check, even if they only say "look over these changes".
---

## 何时使用 / 不适用

当用户要求评审 PR、diff 或合并前检查时使用。不适用于生成完整重构方案、替代 linter/typecheck，或评审未改动的历史代码。

## 参考文件

当需要判定严重级别，或 Blocker 与 Major 的边界不清时，读 `references/severity-guide.md`，按其中的触发条件与示例定级。

# Code Review

## 范围

只评审本次变更及其直接影响。不要重写整个仓库，不要评论未改动的历史代码，除非变更使其变得不安全。

## 流程

1. 读取 diff 与相关上下文（调用方、schema、配置）。
2. 按风险从高到低检查：
   - 认证与授权：每个新入口是否校验身份与权限？
   - 注入：SQL、命令、模板、路径拼接是否使用参数化/转义？
   - 并发：共享状态、锁、幂等性、竞态。
   - 数据丢失：删除、覆盖、迁移是否可回滚？
   - 错误泄露：错误信息是否暴露内部路径、SQL、堆栈或 PII？
3. 对照仓库约定（命名、分层、错误处理）检查一致性。
4. 只报告能指向具体行、并能说明后果的问题。
5. 按模板输出，按严重级别排序。

## 严重级别

- **Blocker**：会导致安全漏洞、数据丢失或生产故障，合并前必须修复。
- **Major**：在常见条件下会产生错误行为，应有明确修复计划。
- **Minor**：可维护性、可读性、边界防御；不阻塞合并。
- **Nit**：风格偏好；最多 3 条，且必须标注为可选。

## 输出模板

```markdown
## 结论
<Blocker 数量> 个阻塞项，<Major 数量> 个主要问题。

## 发现
### [Blocker] <标题>
- 位置：<file>:<line>
- 问题：<一句话说明缺陷>
- 证据：<引用 diff 中的代码或调用链>
- 影响：<具体失败场景>
- 建议：<最小修复方向>

## 未覆盖
- <未检查的部分及原因>
```

## Gotchas

- 行号必须来自本次 diff 的新文件行号；不要引用旧版本行号。
- 生成文件、锁文件、快照测试默认跳过；在“未覆盖”中说明。
- 测试代码中的硬编码密钥也应报告，但级别通常为 Major，不是 Blocker。
- 不要因为“可能有问题”就报 Blocker；必须能说出触发条件与后果。
- 仓库已有 lint/typecheck 能发现的问题不要重复报告，除非它同时是安全或数据问题。

## 自检

- [ ] 每条发现都有文件与行号
- [ ] 每条都有可复现的失败场景
- [ ] 没有把风格偏好写成 Blocker
- [ ] 明确列出未覆盖范围
