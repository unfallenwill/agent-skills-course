---
name: roll-dice
description: Roll dice using a random number generator. Use when asked to roll a die (d6, d20, etc.), roll dice, or generate a random dice roll.
---

## 何时使用 / 不适用

当用户要求掷骰、生成桌面游戏随机数（d6、d20、3d6 等）时使用。不适用于密码、验证码、抽奖等需要安全随机性或可审计公平性的场景；遇到这类请求应说明限制，不要用本技能的命令冒充安全随机源。

## 参考文件

当用户使用 3d6、4d6kh3 等骰子记号，或需要解释结果时，读 `references/dice-notation.md`，按其中的记号规则解析并逐项报告。

To roll a die, use the following command that generates a random number from 1
to the given number of sides:

```bash
echo $((RANDOM % <sides> + 1))
```

```powershell
Get-Random -Minimum 1 -Maximum (<sides> + 1)
```

Replace `<sides>` with the number of sides on the die (e.g., 6 for a standard
die, 20 for a d20).
