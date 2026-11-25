---
name: changelog-writer
description: 把一段 git 提交整理成面向用户的更新日志，按 Features、Improvements、Fixes 分组。当用户要求发布说明、更新日志、版本变更摘要，或只是问“上次发布以来改了什么”时使用，即使用户没有提到 changelog 或 release notes。
---

## 何时使用 / 不适用

当用户要求发布说明、更新日志、版本变更摘要，或问“上次发布以来改了什么”时使用。不适用于解释单条提交、改写 commit message 或执行回滚。

## 参考文件

当提交类型不明确（chore、refactor、perf），或需要判断是否属于 Breaking 时，读 `references/commit-conventions.md`，按分类规则处理。

# Changelog Writer

## 流程

1. 明确范围：两个 tag 之间、某个日期之后，或“上次发布以来”。用户没说清时先询问，不要猜。
2. 获取提交：`git log --no-merges --pretty=format:'%h %s' <range>`。
3. 逐条判断是否用户可见。内部重构、测试、依赖清理默认不写。
4. 按下方规则分类，每条以动词开头，面向结果。
5. 按模板输出；没有用户可见变更时，明确写“本次无用户可见变更”，不要编造。
6. 自检后输出。

## 分类

- **Features**：用户能做以前做不到的事。
- **Improvements**：能力不变，但更快、更顺或信息更清楚。
- **Fixes**：以前是错的，现在对了。
- **Breaking**：升级后用户的代码或流程可能失败；必须写迁移步骤。

## 输出模板

```markdown
# Changelog

## Features
- ...

## Improvements
- ...

## Fixes
- ...

## Breaking changes
- ...（若无写 None）
```

## Gotchas

- 不要根据提交信息猜测用户影响；看不出来就跳过或标注“需确认”。
- 不要把 `chore:`、`test:`、`docs:` 提交直接当成用户可见变更，除非它们改变了用户行为。
- 合并提交默认跳过（`--no-merges`）；否则会出现重复条目。
- 不要写“若干修复”这类占位条目。

## 自检

- [ ] 每条都能对应至少一个提交或 PR
- [ ] 没有内部工单号、人员姓名或未验证的数字
- [ ] Breaking 条目包含迁移步骤
- [ ] 无变更时明确说明，而不是留空或编造
