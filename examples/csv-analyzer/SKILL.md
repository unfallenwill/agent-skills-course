---
name: csv-analyzer
description: Analyze CSV and tabular data files — profile columns, clean missing values, compute summary statistics, add derived columns, and generate labeled charts. Use when the user has a CSV, TSV, or Excel export and wants to explore, transform, or visualize it, even if they don't mention "CSV" or "analysis".
compatibility: Requires Python 3.10+ with pandas and matplotlib.
---

## 何时使用 / 不适用

当用户提供 CSV、TSV 或 Excel 导出，想要探索、清洗、统计或可视化数据时使用。不适用于修改工作簿公式与格式、执行数据库 ETL，或在币种/时区口径不明时强行汇总。

# CSV Analyzer

## 流程

1. **先做概要**：运行 `python scripts/profile.py <file>`，记录行数、列数、缺失值与疑似类型。
   - 行数为 0 或列名为空时停止，报告文件问题。
2. **确认口径**：金额、日期、百分比的处理方式不明确时先询问；不要自行假设币种或时区。
3. **清洗**：按下方默认规则处理，并在报告中列出每一步改动。
4. **分析**：计算用户要求的指标；未指定时给出数量、缺失、数值分布与前三类分组。
5. **图表**：每张图必须有标题、坐标轴标签与单位；类别过多时取 Top N 并注明。
6. **自检**：运行 `python scripts/check_output.py output/`，确认图表文件与报告字段齐全。

## 清洗默认

- 完全重复行：删除，并报告删除数量。
- 数值列缺失：保留缺失，不自动填 0；在报告中列明。
- 文本列：去除首尾空格；不自动统一大小写。
- 日期：先尝试 ISO 8601；其他格式列出样例后再解析。
- 货币：识别 `$`、`¥`、`€` 与千分位逗号；无法判断币种时停止并询问。
- 异常值：不自动删除；在报告中标记并给出判断依据。

## 输出模板

```markdown
## 数据概览
- 文件：<path>；行数：<n>；列数：<m>
- 时间范围：<start> 至 <end>（若适用）

## 清洗记录
- <操作>：影响 <n> 行

## 关键发现
- <发现>（附数值与口径）

## 图表
- <chart.png>：<说明>

## 局限
- <缺失、口径不明或样本过小的部分>
```

## Gotchas

- 中文 CSV 常见 GBK/GB18030 编码；UTF-8 读取失败时按 `utf-8-sig → gb18030` 重试，并在报告中注明。
- Excel 导出的“日期”可能是序列号（如 45292）；先确认再转换，不要直接当字符串。
- 金额列可能混有 `1,200`、`$1200`、`1200元`；统一清洗后再求和，否则会得到字符串拼接。
- 分组均值在分母为 0 时会产生 inf/NaN；输出前替换为“无数据”并说明。
- 图表不要使用默认英文标题；标题与轴标签必须与用户语言一致。

## 参考文件

- 当需要理解列含义、指标口径或表之间的关系时，读 `references/schema.md`；不要根据列名猜测业务含义。
- 当用户要求特定图表样式时，读 `assets/chart-style.md`，按其配色与标注规则生成。
