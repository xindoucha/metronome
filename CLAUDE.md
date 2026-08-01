# 项目规则

## 版本号规范

版本号遵循语义化版本（SemVer），格式为 `vMAJOR.MINOR.PATCH`：

| 类型 | 位置 | 示例 | 触发条件 |
|------|------|------|----------|
| patch | PATCH +1 | v1.0.0 → v1.0.1 | bug 修复 |
| minor | MINOR +1，PATCH 归零 | v1.0.1 → v1.1.0 | 新功能 |
| major | MAJOR +1，其余归零 | v1.1.0 → v2.0.0 | 破坏性变更 |

**每次改动必须同步更新：**
1. `index.html` 中 `.card-footer` 的版本号文字
2. `index.html` 中 CSS / JS 静态资源的版本查询参数
3. `CHANGELOG.md` 顶部新增对应条目
4. 功能发生变化时同步更新 `DESIGN.md`

## 提交信息格式

```
type(scope): 简短描述 (vX.Y.Z)   ← 有版本变更时附上版本号

- 具体改动说明
```

type 取值：`feat` / `fix` / `style` / `refactor` / `docs` / `chore`

## 项目结构

```
index.html      页面结构
css/style.css   所有样式
js/app.js       所有逻辑（Web Audio 调度、UI 交互）
js/practice.js  架子鼓练习谱数据与 VexFlow 渲染
js/transcription-demo.js  智能鼓谱交互原型与难度示例数据
vendor/vexflow/ VexFlow 本地 vendor 依赖（不要改为运行时 CDN）
DESIGN.md       功能与技术设计说明
CHANGELOG.md    版本历史
```

## 音频注意事项

- iOS Safari 需要在用户手势回调中调用 `AudioContext.resume()` 并播放预热 buffer
- 首拍调度偏移保持 ≥ 300ms，防止 iOS 硬件启动延迟导致音符丢弃
- 每次从 `suspended` 恢复都需重新预热，不能用全局 flag 跳过
