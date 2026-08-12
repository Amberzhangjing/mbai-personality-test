# MBAI — AI 时代人格测试

> AI 时代，你是哪种人？

[English](README.md) · [在线测试](https://amberzhangjing.github.io/mbai-personality-test/)

MBAI（Mindset & Behavior in the AI Era Indicator）是一套开源、中英双语的 AI 时代人格测试。它通过 30 个短场景，观察一个人如何主导、信任、采用、分享和筛选 AI，最终生成五位人格代码与 32 种可分享结果之一。

MBAI 是娱乐与自我探索项目，不是心理诊断、招聘工具，也不衡量智力、创造力或 AI 熟练度。

## 五个维度

| 维度 | 正向端 | 反向端 | 核心问题 |
| --- | --- | --- | --- |
| AI 主导权 | **D** Director 主导 | **C** Co-creator 共创 | 你指挥 AI，还是与它共同思考？ |
| 信任路径 | **F** Fact 实证 | **I** Intuition 直觉 | 你依靠证据验证，还是依靠模式感探索？ |
| 时代速度 | **P** Pioneer 尝鲜 | **S** Stabilizer 稳健 | 你抢先试前沿能力，还是等待稳定方案？ |
| 数字边界 | **O** Open 开放 | **G** Guarded 守界 | 你倾向共享工作流，还是保护语境与数据？ |
| 成品标准 | **T** Taste-led 品味 | **U** Utility-led 效用 | 你优先风格与原创，还是速度与实用？ |

例如：`DFPOT` 代表主导 · 实证 · 尝鲜 · 开放 · 品味。

第五维不是“有审美/没审美”，而是测量：当 AI 输出已经能用时，你会让多少审美判断介入最终取舍。

## 仓库内容

- 30 道原创中英双语场景题
- 用户界面隐藏的多维交叉计分
- 16 个核心人格 × 2 种成品模式 = 32 种结果
- 测试前填写报告名称并选择中/英文
- 五维比例与完整人格报告
- 复制、系统分享与结果卡下载
- 人格可达性与结果分布自动验证
- 无后端、无账号、无统计追踪，答案不上传

## 本地运行

直接用现代浏览器打开 `index.html` 即可，无需安装依赖或编译。

也可以启动一个本地预览：

```bash
python3 -m http.server 8080
```

然后访问 `http://localhost:8080`。

## 验证测评

建议使用 Node.js 18 或以上版本：

```bash
npm test
```

验证程序会检查数据结构、中英文完整性、32 种典型路径、维度覆盖，以及 20 万条固定随机答题路径的结果分布。

## 项目结构

```text
.
├── index.html                 # 产品页面
├── assets/
│   ├── styles.css             # 移动端优先视觉系统
│   └── app.js                 # 答题、计分、报告和分享卡
├── data/
│   └── mbai-data.js           # 维度、30 道题和 32 种结果
├── docs/
│   ├── METHODOLOGY.md         # 测评方法与验证说明
│   └── QUESTIONNAIRE.md       # 便于阅读的题目地图
└── validation/
    └── validate.mjs           # 零依赖验证程序
```

## 参与贡献

欢迎改进场景表达、双语自然度、权重公平性、无障碍体验和结果文案。提交 Issue 或 Pull Request 前请阅读 [CONTRIBUTING.md](CONTRIBUTING.md)。

## 原创说明

MBAI 借鉴轻量人格测试常见的产品节奏：短题目 → 计分 → 结果 → 分享。本仓库的维度、题目、权重、代码体系、结果文案与视觉设计均为原创，不包含 SBTI 的题目、人格文案、插画或视觉资产。

## 许可

- 程序代码：[MIT License](LICENSE)
- 题目、维度定义、结果文案、文档与原创媒体：[CC BY 4.0](LICENSE-CONTENT.md)
- MBAI 名称与官方品牌标识：[TRADEMARKS.md](TRADEMARKS.md)

