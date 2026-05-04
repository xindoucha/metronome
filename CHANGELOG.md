# Changelog

## v1.0.4 — 2026-05-04

### Bug Fixes
- **iOS 无声音（根本修复）**：将 `c.createBuffer` / `src.start(0)` 提前到 `startM()` 同步代码中执行，确保在用户手势调用栈内触发真实音频播放；iOS Safari 要求 AudioContext 的首次 play 必须发生在同步用户手势帧内，`resume().then(...)` 回调已脱离手势帧，在其中调用 `start()` 无效

---

## v1.0.3 — 2026-05-04

### Debug
- 添加 Web Audio 全链路诊断日志（脚本加载、Context 创建/状态变更、resume、begin、sched 调度），用于定位 iOS 无声问题，排查后将移除

---

## v1.0.2 — 2026-05-04

### Bug Fixes
- **iOS 无声音**：将预热 silent buffer 移入 `begin()` 回调内，与调度逻辑严格串行（resume → 预热 → 调度），消除原来两段代码分离导致的顺序不可控问题
- 移除 document 级 `touchstart`/`touchend`/`click` unlock 监听器，改为在 `startM` 内统一处理；保留首次 `touchstart` 用于预创建 AudioContext

---

## v1.0.1 — 2026-05-04

### Bug Fixes
- **iOS 无声音**：将首拍调度偏移从 60ms 增加到 300ms，解决 iOS 音频硬件启动延迟导致首拍被丢弃的问题
- **iOS 无声音**：移除 `_audioUnlocked` 标志位，改为每次检查 `c.state`，确保后台返回 / 锁屏后重新预热音频引擎
- **iOS 无声音**：预热静音 buffer 从 1 帧延长至 0.1s，保证触发至少一个完整 render quantum
- **iOS 布局错位**：`body` 改用 `align-items: stretch`，解决 iOS Safari flex 列布局下 `width:100%` 收缩问题，卡片改用 `margin: 0 auto` 居中

---

## v1.0.0 — 2026-05-04

### Features
- BPM 调节（20–240），支持滑块、按钮单步、长按步进、直接输入
- Tap Tempo：连续点击取最近 6 次均值
- 细分拍：四分 / 八分 / 三连 / 十六分，SVG 音符图标
- 拍号抽屉：独立调节拍数（1–16）与音符时值，8 种快速预设
- 音色抽屉：9 种合成音色（经典 / 木块 / 铃声 / 电子 / 拍手 / 踢鼓 / 口哨 / 三角铁 / 钢琴）
- 节拍强弱抽屉：每拍独立设置重音 / 普通 / 弱拍 / 静音
- 拍子指示器：彩色方块实时高亮当前拍位与轻重音
- 音量滑块
- 深浅色主题，自动跟随系统偏好
- 键盘快捷键：`Space` 播放/停止，`↑↓` BPM ±1，`T` Tap Tempo，`Esc` 关闭抽屉
- iOS Safari / Android Chrome 移动端适配
- GitHub Actions 自动部署到 GitHub Pages
