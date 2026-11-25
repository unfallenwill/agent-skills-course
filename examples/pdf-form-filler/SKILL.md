---
name: pdf-form-filler
description: Fill fillable PDF forms from a CSV or JSON mapping of field names to values, validating every field before writing. Use when the user needs to fill one or many PDF forms, especially batch jobs where wrong or missing fields are costly.
license: Proprietary. LICENSE.txt has complete terms
compatibility: Requires Python 3.10+, pypdf, and a local shell.
metadata:
  author: example-org
  version: "1.0"
---

## 何时使用 / 不适用

当用户需要填写一份或多份可填写 PDF 表单，尤其是字段不匹配代价高的批量任务时使用。不适用于扫描件、加密 PDF、签名字段，或需要 OCR 猜测字段的场景；遇到这些情况应停止并说明。

# PDF Form Filler

## 前置检查

1. 确认 PDF 可填写：`python scripts/analyze_form.py input.pdf`。
   - 若字段数为 0：这是扫描件或纯图片 PDF。停止，请用户提供可填写版本；不要用 OCR 猜测后直接盖章。
2. 确认值文件存在且为 UTF-8 编码。
3. 若输出文件已存在，先复制到 `output/backup/<timestamp>/`，不要覆盖。

## 计划—校验—执行

按顺序执行，不得跳过校验：

1. **提取字段**：`python scripts/analyze_form.py input.pdf` → `form_fields.json`
   （字段名、类型、是否必填、所在页）。
2. **建立映射**：创建 `field_values.json`，把每个字段名映射到值。
   - 字段名必须与 `form_fields.json` 完全一致，区分大小写。
   - 不要按位置或顺序猜测字段。
3. **校验**：`python scripts/validate_fields.py form_fields.json field_values.json`
   - 退出码 0 才能继续。
   - 非 0 时读 stderr，修正映射后重跑；最多 3 轮。
4. **填写**：`python scripts/fill_form.py input.pdf field_values.json output.pdf`。
5. **复核**：`python scripts/verify_output.py output.pdf form_fields.json field_values.json`
   - 检查页数未变、已填字段数与预期一致、必填字段无空值。

## 停止条件

出现以下任一情况，停止并报告，不要自行处理：

- PDF 无表单字段或已加密。
- 值文件中有字段名在表单中不存在。
- 必填字段缺少值。
- 校验连续 3 轮失败。
- 输出页数与输入不一致。

## 报告模板

```markdown
## 填写结果
- 输入：<input.pdf>（<n> 页，<m> 个字段）
- 输出：<output.pdf>
- 已填字段：<filled>/<total>
- 未填必填项：<none 或列表>
- 校验：PASS / FAIL（附错误摘要）
- 备注：跳过的项目与原因
```

## Gotchas

- 同名字段可能出现在多页。`analyze_form.py` 会列出页码；映射按“字段名 + 页码”核对，不要只按名字。
- 复选框的值通常是导出值（如 `/Yes`、`/1`），不是 `true`。未知类型先读 `references/field-types.md`。
- 签名字段不能通过程序填写；遇到时报告“需人工签署”，不要生成空白签名框。
- 部分阅读器不显示新填的值，除非压平外观流（flatten）。只有在用户明确要求时才压平，因为压平后不可再编辑。
- 加密 PDF 需要先解密；没有密码时停止，不要尝试破解。

## 参考文件

- 当遇到未知字段类型、复选框/单选组，或值格式报错时，读 `references/field-types.md`，按类型选择值的写法。
- 当用户提供 CSV 值时，参照 `assets/value-template.csv` 的列结构；列名不是字段名时先建立映射表，不要直接按列序填写。
