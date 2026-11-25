---
name: release-notes
description: 从 git 历史生成面向用户的发布说明，按 Features、Improvements、Fixes、Breaking Changes 分类。当用户要求编写发布说明、整理变更日志或在发布前汇总改动时使用。
---

## 何时使用 / 不适用

当用户要求编写发布说明、整理变更日志，或问“上次发布以来改了什么”时使用。不适用于解释单条提交、改写 commit message 或执行回滚。

# Release Notes

## 流程

1. 确认版本号与上一个标签。用户未提供时先询问，不要猜测。
2. 获取变更：`git log --oneline <prev>..<version>`；优先读合并的 PR 标题与描述。
3. 按下方默认规则分类；无法判断用户可见性的提交先跳过，不要编造。
4. 按模板撰写，每条以动词开头，面向用户描述结果。
5. 运行自检；不通过则修正后重跑。

## 分类默认

- **Features**：用户能做以前做不到的事。
- **Improvements**：能力不变，但更快、更顺或错误信息更清楚。
- **Fixes**：以前是错的，现在对了。
- **Breaking Changes**：升级后用户的代码或流程可能失败。同时属于多类时放这里，并写升级说明。

## 输出模板

```markdown
# Release vX.Y.Z

发布日期：YYYY-MM-DD

## Highlights
- 一到三条最重要的变化

## Features / Improvements / Fixes
- ...

## Breaking Changes
- ...（若无写 None）

## Upgrade notes
- ...
```

## Gotchas

- 不要写内部工单号；必须保留时放在条目末尾括号内。
- 不要写“若干问题修复”这类占位条目；合并小修复时必须说明影响范围。
- 不要承诺未来功能，也不要写未经验证的性能数字。
- 内部重构通常不写，除非影响性能、稳定性或对外行为。

## 自检

- [ ] 每条都有分类，且以动词开头
- [ ] 没有模糊词（various、some、minor）
- [ ] Breaking Changes 均有升级说明
- [ ] 版本号与日期正确

## 参考文件

- 当需要调整措辞、判断边界情况，或处理 Breaking Changes 的写法时，读 `references/style-guide.md`，按其中的规则与示例修改。
