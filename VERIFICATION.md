# VERIFICATION — SKILLS-COURSE-20261125-01

- **Task:** SKILLS-COURSE-20261125-01
- **Revision verified:** **3** (rev 2 floors all stand; rev 3 changes A11.9 only)
- **Verified by:** Supervisor, from the files, independently of the Executor's self-report
- **Date:** 2026-11-25
- **Verdict:** A1–A11 all PASS

## Counting method (stated explicitly, because two recounts disagreed)

**Scope.** Only the text inside `<article class="content">`. Excluded entirely: site header and navigation, the sidebar table of contents, breadcrumb, the previous/next pager, and the site footer.

**Excluded blocks.** `<pre>`, `<table>`, `<blockquote>`, `<script>`, `<style>`, as the amendment requires.

**What counts as a character.** Only CJK Unified Ideographs (`U+4E00`–`U+9FFF`). Chinese punctuation (`，。、：；！？""''（）`) and Latin characters are **not** counted. HTML entities are collapsed to a space.

**Why my numbers are lower than Main's recount.** The ladder for the four tutorials, same files, same moment:

| Page | whole page | `<article>` only | − `<pre>` | − `<pre><table>` (mine) |
|---|---|---|---|---|
| t1 | 2460 | 1750 | 1625 | **1292** |
| t2 | 3889 | 3197 | 1669 | **1231** |
| t3 | 2759 | 2064 | 1553 | **1248** |
| t4 | 3591 | 2885 | 1978 | **1454** |
| case1 | 3575 | 2907 | 2299 | **1546** |
| case2 | 3498 | 2854 | 2252 | **1567** |
| case3 | 3585 | 2928 | 2329 | **1615** |

Main's recount (1923 / 2002 / 1943 / 2160 for tutorials; 2214 / 2211 / 2272 for cases) sits between the `<article>` and `<article>−<pre>` columns, which is what you get if Chinese punctuation is counted as a character and/or the article boundary is drawn slightly differently. The dispute does not change any verdict: every tutorial clears 1200 and every case clears 1500 under **every** column above, including the strictest one I use.

## A1–A11 results

| ID | Result | Command run | Output excerpt |
|---|---|---|---|
| A1 | **PASS** | `node diff-topics.js TOPIC_INVENTORY.md` | `inventory table rows: 114 / without URL: 0 / without date: 0`; `my topics: 96 covered: 87 missing: 9` → all 9 mapped by hand (below) |
| A2 | **PASS** | `grep -rl "源:agentskills.io\|补充:外部资料" docs README.md SOURCE_ANALYSIS.md` | 0 legacy labels; four-marker legend in README/about/sources; 9 URLs + 2026-11-25 in `sources.html` and the inventory |
| A3 | **PASS** | manual read of `docs/path.html` | 5 stages × (entry/exit, prerequisite, time, pages, capability); 12-item gate, 4 mandatory |
| A4 | **PASS** | `node a11-audit.js docs` | 5 background pages 2336–2561 CJK, `unmarkedP=0`, `shortSections=0` |
| A5 | **PASS** | `node a11-audit.js docs` + `node extract-run.js t3` | `t1 1292 / t2 1231 / t3 1248 / t4 1454`, each `预期结果=true 检查点=true 如果出错了=true pairs=3`; script run: `rows=4 columns=4 mean=1176.67`, bad row → exit 4 |
| A6 | **PASS** | `node a11-audit.js docs` | `case1 1546 / case2 1567 / case3 1615`, `failureRows=7/7/8`, rejected alternatives 10–11 per page |
| A7 | **PASS** | `node a11-audit.js docs` | 26/26 pages `基础=2 进阶=2 挑战=1 scoring=true`; `dimensionRows=7 bands=true` |
| A8 | **PASS** | `verify-links.js`, `serve-check.js`, `offline-cdp.js`, `mechanics.js` | `pages=34 links=1381 broken=0 rootAbsolute=0`; `served=34 http200=34 failures=0`; `site-originated external requests: 0`; `search 34/34`, `chain visited=34 coversAll=true` |
| A9 | **PASS** | `a11-audit.js`, glossary check | `lang="zh-CN"` on 34/34, one `h1` each; glossary 111 entries |
| A10 | **PASS** | `grep -rhoE '(href\|src)="/[^"]*"' docs` | 0; `.nojekyll` present; README documents branch → `/docs` |
| A11.1 | **PASS** | `node a11-audit.js docs` | as A5 |
| A11.2 | **PASS** | `node a11-audit.js docs` | as A6 |
| A11.3 | **PASS** | `node a11-audit.js docs` | 19/19 concept pages `unmarkedP=0/N shortSections=0` |
| A11.4 | **PASS** | `node a11-audit.js docs` | 26/26 at 2/2/1 with scoring |
| A11.5 | **PASS** | `node a11-audit.js docs` | 7 dimensions × 3 bands, observable wording |
| A11.6 | **PASS** | `node skill-structure.js examples docs` | 7/7 `use=true notUse=true refs>=1 trigger=true`; `skillsWithoutMatch=0` |
| A11.7 | **PASS** | `node cjk-audit.js docs` | 26 teaching pages; max 3052 CJK (`e3-output-eval`) |
| A11.8 | **PASS** | `vocab-check.js`, `a118-audit.js`, glossary parse | 111 entries; 12 previously missing terms added and glossed at first use; **51/51** curated technical terms defined |
| A11.9 | **PASS** | `node a119-placeholders.js docs` | **TOTAL 4 / EXCLUDED 4 / REMAINING 0**; excluded at `t2:163`, `t2:360`, `t4:145` (inside `<pre>`) and `e3:274` (quoted value) |

## A11.9 detail (rev 3 rule)

I implemented the exclusion rule rather than rewording. The original "占位条目" phrasing was **restored verbatim** in all five places; nothing was reworded to dodge the check.

```
TOTAL hits: 4
EXCLUDED hits: 4
   05-tutorials/t2-references.html:163 "占位"  [inside <pre>/<code>: quoted reference or model skill, not prose]
   05-tutorials/t2-references.html:360 "占位"  [inside <pre>/<code>: quoted reference or model skill, not prose]
   05-tutorials/t4-description-eval.html:145 "占位"  [inside <pre>/<code>: quoted reference or model skill, not prose]
   04-trigger-eval/e3-output-eval.html:274 "待定"  [quoted value: a literal the output must contain, not a marker]
REMAINING (learner-facing prose): 0
```

The three 占位 lines are the restored prohibition bullets inside quoted reference/skill documents: t2's `<pre>` opens at line 93 and closes at 226 (so 163 is inside), t2's second `<pre>` opens at 311, t4's opens at 91 and closes at 152 (so 145 is inside). No `class="anti-pattern"` was added — Main withdrew that instruction after checking the DOM, and marking a whole model skill would have been a false label.

Two judgment calls, stated so they can be challenged:

- **Code blocks are not prose.** This uses the same scope as the CJK rule, which also excludes code. The three occurrences are inside quoted reference/skill documents whose sentence is itself the negative guidance ("don't write placeholder entries"). Marking a whole model skill as an anti-pattern block would have been false labelling, so I classified them as quoted artifacts instead.
- **A quoted value is not a marker.** `待定` appears inside ‘’, as the literal value an evaluation expects the output to contain. It stands for nothing missing.

The checker identifies negative-example blocks structurally: an ancestor with `class` matching `anti-pattern|bad-example|negative-example|wrong-example|cap-anti`, or a section whose current `h2`/`h3` matches `反模式|错误示例|常见错误|不推荐|负面示例`. Excluded hits are printed with page and line.

## A11.8 detail

The Executor reported this as not audited, so I audited it, found a real gap, and had it closed. **This was a deliberate expansion beyond the narrow rev-3 order, disclosed here rather than left unmentioned**: the glossary went from 99 to 111 entries. Twelve technical terms taught in the course were absent and are now defined: 加载条件, 模型驱动, 用户显式, 内置技能, 严格校验, 宽松校验, 权限白名单, 结构化包装, 资源清单, 上下文压缩, 去重, 子任务. Each now carries an English original, a definition and a teaching link, and each is glossed where it is first used (e.g. `模型驱动（model-driven activation）` in `c4-lifecycle`, `宽松校验` in `c2-frontmatter`).

Broader check: 51 curated technical terms (frontmatter fields, progressive disclosure, activation, trigger, eval, assertion, gotcha, plan-validate-execute, exit code, stdout/stderr, RAG, MCP, …) → **51/51 defined**.

A caveat on method: scanning `<strong>` spans cannot establish this property, because this course uses emphasis for sentences and card titles ("Agent 运行脚本的环境通常是非交互的。" is bolded, and is not a term). The 143 "term-like" strings a naive scan produces are clauses; the curated vocabulary check and the twelve-term repair are the real evidence.

## A1 detail

`TOPIC_INVENTORY.md`: 114 rows, every row carrying source URL, retrieval date `2026-11-25`, topic, course pages, coverage method, and gap. 0 rows lack URL or date. All 9 source pages are represented.

Independent derivation: I built a 96-topic list from my own fetches. 87 matched automatically; 9 needed review and all exist under different wording:

| My topic | Inventory row |
|---|---|
| home: What are Agent Skills / SKILL.md folder | T002 |
| home: directory layout | T002 + T008 |
| quickstart: how it works (3 stages) | T034 + T004 |
| quickstart: next steps links | T007 + T037 |
| best-practices: add what it lacks, omit what it knows | T043 |
| best-practices: structure large skills | T046 |
| optimizing: writing effective descriptions | T059 |
| adding-support: when no skills are available | T106 |
| adding-support: what the model receives | T109 |

**Ordering honesty:** the amendment asked for the inventory before the teaching pages were finalised. It came afterwards; the artifact states this in its own header (line 7). I record the deviation rather than claim a sequence that did not happen.

## A8 offline detail

**Static:** 0 non-local `<link href>`, `<script src>`, `<img src>`, `<source src>`, CSS `@import` or `url()`. In-body `<a href="https://…">` citations remain, as intended.

**Dynamic:** the browser path was taken. Headless Chrome over CDP with `Fetch.enable` on `*`: every request to `127.0.0.1`, `data:` or `blob:` is continued, everything else `Fetch.failRequest(Aborted)`. Four pages rendered (`index`, `t1`, `07-capstone`, `glossary`), article paragraphs present (22/24/13/1), system font stack applied.

`TOTAL site-originated external requests (must be 0): 0`.

Caveat: AdGuard is force-installed machine-wide and injects `local.adguard.org` into both Chrome and Edge. Those are counted separately (`browserExtensionNoise=9`) and the strings `adguard` / `chrome-extension` appear nowhere in the deliverable.

## Pages expanded (before → after, my counting rule)

b1 1482→2336 · b2 1481→2561 · b3 1356→2403 · b4 1235→2371 · b5 1180→2491 · c1 991→2304 · c2 1212→2332 · c3 1111→2258 · c4 1760→2756 · c5 950→2406 · a1 1331→2459 · a2 1085→2277 · a3 1156→2261 · a4 967→2566 · a5 965→2664 · a6 1349→3018 · e1 1142→2650 · e2 1437→2598 · e3 1620→3052 · t1 995→1292 · t2 946→1231 · t3 1091→1248 · t4 1277→1454 · case1 1100→1546 · case2 1111→1567 · case3 1138→1615 · capstone 456→458.

Structural: 26 module pages 1/1/1 → 2/2/1 with 挑战 scoring; 19 concept pages 100 tags → 629 per-paragraph markers; three labels → four; glossary 99 → 111.

## Things the Executor's reports do not establish

Its rev-2 and rev-3 handbacks were routed to Main, not to me, and were not used as evidence. Every result above was re-run against the files at rev 3. Two false failures in my own tooling were found and fixed during this pass (the `[外部: URL]` marker regex, and treating the tutorial's deliberate v1 as a sync mismatch); both are disclosed because they affected earlier interim counts.

## Limitations

1. Two case skills remain design sketches; their referenced business scripts are deliberately absent and labelled non-runnable.
2. `clients.md` is JavaScript-rendered, so no client list is asserted.
3. No live agent client: trigger and pass-rate figures are labelled teaching examples.
4. Search is substring matching; accessibility is basic; terminology mixes "Skill" and "技能".
5. Nothing was published — no `git init`, remote, or Pages activation.
