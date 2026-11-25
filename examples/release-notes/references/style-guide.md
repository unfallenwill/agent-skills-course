# 发布说明风格指南

## 动词表

| 场景 | 使用 | 不要使用 |
| - | - | - |
| 新增 | Add | Added, Introducing |
| 增强 | Improve | Enhance, Optimize（除非有数据） |
| 修复 | Fix | Resolve, Patch |
| 移除 | Remove | Delete（除非指数据删除） |
| 弃用 | Deprecate | Discontinue |

## 句子规则

1. 现在时、主动语态、动词开头。
2. 一条只讲一件事；不超过 120 字符。
3. 面向结果，不写实现。反例：“Refactor exporter module”；正例：“Support CSV export for reports over 10,000 rows”。
4. 数字必须来自已验证的来源；没有数据就不写。
5. 不写内部代号、工单号、人员姓名。

## 边界情况

### 破坏性变更

必须包含：受影响的对象、旧行为、新行为、迁移步骤。示例：

- **Breaking:** Remove `GET /v1/users`. Use `GET /v2/users`; the response shape is unchanged.

### 安全修复

可以写“Fix an authorization bypass in project sharing”，但不要公开利用细节，直到修复版本广泛部署。

### 依赖升级

只有当用户可感知（性能、兼容性、安全）时才写；否则省略。

### 实验性功能

标注 “Experimental”，并说明可能变化。

## 分类歧义

- 性能提升但用户无感：不写。
- 修复了错误但改变输出格式：归入 Breaking Changes。
- 新增配置项但默认关闭：Features，并说明如何启用。
