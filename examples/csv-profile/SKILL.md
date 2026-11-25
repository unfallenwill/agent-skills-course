---
name: csv-profile
description: Profile a CSV file before analysis — row and column counts, missing values, duplicate headers, and numeric summaries. Use when the user asks to inspect, sanity-check, or summarize a CSV or tabular file.
compatibility: Requires Node.js 18+ and a local shell.
---

## 何时使用 / 不适用

当用户要在分析前检查 CSV 结构、缺失与数值分布时使用。不适用于清洗数据、修改文件或处理 Excel 工作簿。

## 参考文件

当需要解释输出字段、缺失值口径或退出码时，读 `references/profile-output.md`，按其中的 schema 与错误码说明汇报。

# CSV Profile

## 流程

1. 运行 `node scripts/profile.js <file>`。
2. 若退出码非 0，读 stderr 并在报告中说明；不要继续分析部分数据。
3. 检查 `rows` 与 `columns` 是否合理；`rows` 为 0 时直接报告空文件并停止。
4. 用下方模板报告；必须包含 missing 与 numeric 摘要。
5. 若某列含货币符号、百分号或千分位逗号，说明它未被识别为数值，需要先清洗。

## 输出模板

```markdown
## 数据概览
- 文件：<path>
- 行数：<rows>，列数：<columns>
- 列名：<headers>

## 缺失值
- <column>：<missing>

## 数值列摘要
- <column>：min=<min>，max=<max>，mean=<mean>

## 注意事项
- 未识别为数值的列及原因
```

## 验证循环

1. 在 `assets/sample.csv` 上运行，期望 `rows=4`、`columns=4`、`amount.mean=1176.67`。
2. 若不一致，核对脚本版本与输入文件；不要修改期望值来迁就输出。
3. 失败路径：用缺列文件运行，应退出码 4，且 stderr 包含行号与期望字段数。

## Gotchas

- 脚本按 UTF-8 读取。GBK 文件会得到乱码，先用编辑器或 `iconv` 转成 UTF-8。
- 重复列名会直接以退出码 4 拒绝。不要重命名后静默继续，先让用户确认。
- 只有纯数字（如 `1200`、`-3.5`）会被识别为数值；`$1,200`、`15%` 不会，需先清洗。
- 行尾多一个逗号会产生一个空字段，并被计为缺失值；这通常是导出问题，不是真实缺失。

## Scripts

- `scripts/profile.js` — 输出 JSON 概要；`--format csv` 输出逐列摘要；`--help` 查看用法与退出码。
