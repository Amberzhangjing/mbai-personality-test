(function (root) {
  "use strict";

  const data = {
    version: "0.1.0",
    languages: ["zh", "en"],
    ui: {
      zh: {
        openSource: "开源项目", eyebrow: "AI ERA PERSONALITY", heroLine1: "AI 时代，", heroLine2: "你是哪种人？",
        heroCopy: "当 AI 成为日常搭档，你会指挥它、共创它、质疑它、守住它，还是替它消除那股 AI 味？",
        scenarios: "场景题", dimensions: "核心维度", archetypes: "人格结果", start: "开始测试",
        introNote: "约 5 分钟 · 没有标准答案 · 答案仅在本地处理", back: "返回", beforeStart: "BEFORE WE START",
        setupTitle: "先给这份报告一个名字", setupCopy: "可以使用真名、昵称或任何你想在结果卡上看到的名字。",
        nameLabel: "报告名称", namePlaceholder: "例如：Amber", nameHint: "最多 20 个字符，不会上传。",
        languageLabel: "测试与报告语言", privacy: "MBAI 没有后端、账号或统计追踪。姓名与答案只存在于当前页面。",
        begin: "进入第 1 题", previous: "上一题", next: "下一题", viewResult: "查看我的人格", scenario: "场景",
        portraitLabel: "AI 时代画像", edgeLabel: "你的时代红利", bugLabel: "你的时代 Bug", aiUseLabel: "适合的 AI 使用方式",
        workLabel: "工作模式", learnLabel: "学习模式", collabLabel: "人际 / 协作风格", tasteLabel: "你的 Taste OS",
        copyResult: "复制结果", shareResult: "分享", downloadCard: "下载结果卡", restart: "重新测试",
        disclaimer: "MBAI 用于娱乐与自我探索，不构成心理诊断、职业评价或能力判断。",
        reportFor: "{name} 的 MBAI 报告", balanced: "接近平衡", copied: "结果已复制", downloaded: "结果卡已下载",
        shareTitle: "我的 MBAI 人格", shareFallback: "当前设备暂不支持系统分享，已复制结果。", resultConnector: "｜"
      },
      en: {
        openSource: "OPEN SOURCE", eyebrow: "AI ERA PERSONALITY", heroLine1: "In the AI era,", heroLine2: "who are you?",
        heroCopy: "When AI becomes an everyday collaborator, do you direct it, think with it, challenge it, protect context, or edit the AI out of the final work?",
        scenarios: "scenarios", dimensions: "dimensions", archetypes: "results", start: "Start the test",
        introNote: "About 5 minutes · No right answers · Processed locally", back: "Back", beforeStart: "BEFORE WE START",
        setupTitle: "Name this report", setupCopy: "Use your real name, a nickname, or anything you want to see on the result card.",
        nameLabel: "Report name", namePlaceholder: "For example: Amber", nameHint: "20 characters max. Nothing is uploaded.",
        languageLabel: "Test and report language", privacy: "MBAI has no backend, account, or analytics. Your name and answers stay on this page.",
        begin: "Go to question 1", previous: "Previous", next: "Next", viewResult: "Reveal my type", scenario: "SCENARIO",
        portraitLabel: "YOUR AI-ERA PORTRAIT", edgeLabel: "YOUR ERA ADVANTAGE", bugLabel: "YOUR ERA BUG", aiUseLabel: "HOW AI WORKS BEST FOR YOU",
        workLabel: "WORK MODE", learnLabel: "LEARNING MODE", collabLabel: "PEOPLE / COLLABORATION", tasteLabel: "YOUR TASTE OS",
        copyResult: "Copy result", shareResult: "Share", downloadCard: "Download result card", restart: "Take it again",
        disclaimer: "MBAI is for entertainment and self-reflection. It is not a psychological diagnosis, career rating, or ability test.",
        reportFor: "{name}'s MBAI profile", balanced: "balanced", copied: "Result copied", downloaded: "Result card downloaded",
        shareTitle: "My MBAI personality", shareFallback: "System sharing is unavailable, so the result was copied instead.", resultConnector: " · "
      }
    },
    axes: [
      { id: "agency", positive: "D", negative: "C", zh: { name: "AI 主导权", positive: "主导", negative: "共创", description: "定义 AI 的角色，或在对话中共同形成方向" }, en: { name: "AI agency", positive: "Director", negative: "Co-creator", description: "Define AI's role or form direction through dialogue" } },
      { id: "trust", positive: "F", negative: "I", zh: { name: "信任路径", positive: "实证", negative: "直觉", description: "依靠证据验证，或依靠模式感探索" }, en: { name: "Trust mode", positive: "Fact", negative: "Intuition", description: "Verify through evidence or explore through patterns" } },
      { id: "tempo", positive: "P", negative: "S", zh: { name: "时代速度", positive: "尝鲜", negative: "稳健", description: "抢先试前沿能力，或等待可靠方案" }, en: { name: "Adoption tempo", positive: "Pioneer", negative: "Stabilizer", description: "Try the frontier or wait for a reliable pattern" } },
      { id: "boundary", positive: "O", negative: "G", zh: { name: "数字边界", positive: "开放", negative: "守界", description: "共享工作流，或保护语境、权限与数据" }, en: { name: "Digital boundary", positive: "Open", negative: "Guarded", description: "Share workflows or protect context, access, and data" } },
      { id: "taste", positive: "T", negative: "U", zh: { name: "成品标准", positive: "品味", negative: "效用", description: "优先风格与原创，或速度与实用" }, en: { name: "Output standard", positive: "Taste-led", negative: "Utility-led", description: "Prioritize voice and originality or speed and usefulness" } }
    ],
    tieBreakQuestions: { agency: 0, trust: 1, tempo: 2, boundary: 3, taste: 4 },
    questions: [
      { id: "Q01", primary: "agency", zh: { q: "公司刚开放一款强大的 AI 工具，你最先会？", a: ["先设定目标、规则和交付格式，让它进入我的流程", "先和它对话几轮，看看它能带来什么意外方向"] }, en: { q: "Your company unlocks a powerful new AI tool. What do you do first?", a: ["Set goals, rules, and delivery formats so it fits my workflow", "Talk with it for a few rounds and see what unexpected direction emerges"] }, weights: [[2, 0, 1, 0, 0], [-2, 0, -1, 0, 0]] },
      { id: "Q02", primary: "trust", zh: { q: "AI 给出的答案很自信，但你觉得哪里不对。", a: ["立刻找原始来源和反方证据", "沿着这份不对劲继续追问，看问题会走向哪里"] }, en: { q: "AI gives a confident answer, but something feels off.", a: ["Find primary sources and counter-evidence immediately", "Follow that uneasy feeling and keep questioning where it leads"] }, weights: [[0, 2, 0, -1, 0], [0, -2, 0, 1, 0]] },
      { id: "Q03", primary: "tempo", zh: { q: "一个新模型刚发布，评价很少，但能力看起来惊人。", a: ["当天就拿真实任务压测，尽快摸清上限", "先等稳定评测和真实案例，再决定是否迁移"] }, en: { q: "A new model launches with little evidence but impressive claims.", a: ["Stress-test it on real work that day and map the ceiling", "Wait for stable benchmarks and real cases before migrating"] }, weights: [[0, 0, 2, 0, 1], [0, 0, -2, 0, -1]] },
      { id: "Q04", primary: "boundary", zh: { q: "你发现了一个非常好用的 AI 工作流。", a: ["整理后公开，让更多人一起改进", "先留在自己的工具箱里，稳定一阵再说"] }, en: { q: "You discover an unusually effective AI workflow.", a: ["Document and publish it so others can improve it", "Keep it in my own toolkit until it proves stable"] }, weights: [[0, 0, 1, 2, 0], [0, 0, -1, -2, 0]] },
      { id: "Q05", primary: "taste", zh: { q: "AI 写出的方案逻辑完整、信息准确，但有明显的“AI 味”。", a: ["继续重写，直到它真正像我的表达", "只要目标能完成，就可以先交付"] }, en: { q: "An AI draft is accurate and complete, but unmistakably sounds like AI.", a: ["Keep rewriting until it genuinely sounds like me", "Ship it if it solves the actual problem"] }, weights: [[0, -1, 0, 0, 2], [0, 1, 0, 0, -2]] },

      { id: "Q06", primary: "agency", zh: { q: "AI 连续三次没理解你的意图，你通常会？", a: ["换成对话式引导，和它一起找到真正的问题", "重写指令、补充约束，让它准确执行"] }, en: { q: "AI misunderstands your intent three times in a row. You usually:", a: ["Switch to dialogue and discover the real problem together", "Rewrite the instruction and add constraints until it executes correctly"] }, weights: [[-2, 0, 1, 0, 0], [2, 0, -1, 0, 0]] },
      { id: "Q07", primary: "trust", zh: { q: "要让 AI 帮你做一个重要选择，你最需要它提供什么？", a: ["角色模拟、未来画面和我没意识到的盲点", "比较表、概率、来源和反方证据"] }, en: { q: "For an important decision, what do you most want AI to provide?", a: ["Role-play, future scenarios, and blind spots I have not felt yet", "Comparisons, probabilities, sources, and counter-evidence"] }, weights: [[0, -2, 1, 0, 0], [0, 2, -1, 0, 0]] },
      { id: "Q08", primary: "tempo", zh: { q: "面对一项从没做过的任务，你更可能？", a: ["先找成熟范例和可靠步骤，减少返工", "先做几个小原型，用结果逼近答案"] }, en: { q: "You face a task you have never done before. You are more likely to:", a: ["Find proven examples and reliable steps to reduce rework", "Build a few small prototypes and let results reveal the answer"] }, weights: [[1, 0, -2, 0, 0], [-1, 0, 2, 0, 0]] },
      { id: "Q09", primary: "boundary", zh: { q: "团队想把客户资料交给 AI 做分析。", a: ["坚持最小化输入，宁可少得到一些结论", "先匿名化和设定规则，再共享以获得更多洞察"] }, en: { q: "Your team wants AI to analyze customer material.", a: ["Minimize input even if that means fewer conclusions", "Anonymize it, set rules, then share enough for better insight"] }, weights: [[0, -1, 0, -2, 0], [0, 1, 0, 2, 0]] },
      { id: "Q10", primary: "taste", zh: { q: "AI 一次生成了十张视觉图，其中八张都很精致。", a: ["选择信息最清楚、最适合当前用途的一张", "快速淘汰大部分，因为好看不等于有判断"] }, en: { q: "AI generates ten polished images, and eight look impressive.", a: ["Choose the clearest image for the current purpose", "Reject most of them quickly; polished is not the same as considered"] }, weights: [[0, 0, 0, 1, -2], [0, 0, 0, -1, 2]] },

      { id: "Q11", primary: "agency", zh: { q: "AI 的建议与你的专业判断冲突。", a: ["要求它展示证据链，然后由我做最终裁决", "把冲突当作信号，重新检查双方的假设"] }, en: { q: "AI advice conflicts with your professional judgment.", a: ["Demand the evidence chain, then make the final call myself", "Treat the conflict as a signal and revisit both sets of assumptions"] }, weights: [[2, 1, 0, 0, 0], [-2, -1, 0, 0, 0]] },
      { id: "Q12", primary: "trust", zh: { q: "AI 建议你改变一个坚持多年的工作习惯。", a: ["先看数据、样本和适用条件", "如果很有启发，会先小范围试试看"] }, en: { q: "AI suggests changing a work habit you have kept for years.", a: ["Inspect the data, sample, and conditions first", "Try it on a small scale if the idea feels revealing"] }, weights: [[0, 2, 0, 0, 1], [0, -2, 0, 0, -1]] },
      { id: "Q13", primary: "tempo", zh: { q: "团队对一款新 AI 工具意见不一。", a: ["发起一个短周期公开试点，用结果说话", "先观察外部团队用稳后的经验，避免集体踩坑"] }, en: { q: "Your team disagrees about adopting a new AI tool.", a: ["Run a short, visible pilot and let results decide", "Observe mature external use before exposing the whole team"] }, weights: [[0, 0, 2, 1, 0], [0, 0, -2, -1, 0]] },
      { id: "Q14", primary: "boundary", zh: { q: "同事想看你的 AI 对话记录和提示词。", a: ["愿意展示完整过程，让大家一起优化", "会分享结论，但保留关键语境和私人记录"] }, en: { q: "A colleague asks to see your AI conversations and prompts.", a: ["Show the full process so the team can improve it together", "Share conclusions while keeping key context and private history"] }, weights: [[-1, 0, 0, 2, 0], [1, 0, 0, -2, 0]] },
      { id: "Q15", primary: "taste", zh: { q: "团队的 AI 内容模板效率很高，但所有成品越来越相似。", a: ["暂停扩量，先重新建立风格与表达标准", "保留模板，只有重要内容再单独优化"] }, en: { q: "Your AI content template is efficient, but every output is starting to look alike.", a: ["Pause scaling and rebuild the voice and style standard", "Keep the template and custom-polish only important pieces"] }, weights: [[1, 0, 0, 0, 2], [-1, 0, 0, 0, -2]] },

      { id: "Q16", primary: "agency", zh: { q: "如果创建一个个人 AI 助手，你最在意？", a: ["它逐渐理解我，并敢于提出不同意见", "它严格遵循我的偏好、格式和边界"] }, en: { q: "When building a personal AI assistant, what matters most?", a: ["It learns me over time and dares to offer a different view", "It follows my preferences, formats, and boundaries precisely"] }, weights: [[-2, 0, 0, 1, 0], [2, 0, 0, -1, 0]] },
      { id: "Q17", primary: "trust", zh: { q: "一款 AI 工具宣称能让效率提升 30%。", a: ["只要成本不高，直接用一周感受变化", "先研究它如何测量，以及对照组是什么"] }, en: { q: "An AI tool claims it improves productivity by 30%.", a: ["Try it for a week if the cost is low and feel the difference", "Study how it measured that and what the control was"] }, weights: [[0, -2, 0, 1, 0], [0, 2, 0, -1, 0]] },
      { id: "Q18", primary: "tempo", zh: { q: "AI 工具更新得越来越快，你的适应方式是？", a: ["挑一套稳定组合，把它打磨成可靠系统", "持续试新工具，让组合跟着能力一起进化"] }, en: { q: "AI tools keep changing faster. How do you adapt?", a: ["Choose a stable stack and turn it into a reliable system", "Keep trying new tools and let the stack evolve with capability"] }, weights: [[1, 0, -2, 0, 0], [-1, 0, 2, 0, 0]] },
      { id: "Q19", primary: "boundary", zh: { q: "团队准备建立共享 AI 知识库。", a: ["只上传整理后的模板与确认可共享的内容", "愿意贡献对话、失败案例和未完成思路"] }, en: { q: "Your team is creating a shared AI knowledge base.", a: ["Upload only refined templates and approved material", "Contribute conversations, failures, and unfinished ideas"] }, weights: [[1, 0, 0, -2, 0], [-1, 0, 0, 2, 0]] },
      { id: "Q20", primary: "taste", zh: { q: "AI 产出已经达到 80 分，而且还有时间。", a: ["快速生成几个版本，拿到真实反馈再决定", "继续调整节奏、语气和细节，做到真正属于我"] }, en: { q: "An AI output is already 80% good, and you still have time.", a: ["Generate a few versions and use real feedback to choose", "Refine rhythm, voice, and detail until it genuinely feels mine"] }, weights: [[0, 0, 1, 0, -2], [0, 0, -1, 0, 2]] },

      { id: "Q21", primary: "agency", zh: { q: "AI 交出的方案基本可用，你更自然的下一步是？", a: ["明确缺口和标准，让它继续迭代", "自己进入内容，与它一起重组和改写"] }, en: { q: "AI delivers a mostly usable proposal. Your natural next step is to:", a: ["Define gaps and standards, then make it iterate", "Enter the material myself and reshape it together"] }, weights: [[2, 0, 0, 0, 1], [-2, 0, 0, 0, -1]] },
      { id: "Q22", primary: "trust", zh: { q: "新闻说某个模型能力出现了巨大跃升。", a: ["先看评测方法、样本与真实差异", "马上试几个刁钻问题，感受它的能力边界"] }, en: { q: "News says a model has made a huge capability leap.", a: ["Inspect the benchmark method, sample, and real delta", "Immediately try a few difficult prompts and feel its limits"] }, weights: [[0, 2, 0, -1, 0], [0, -2, 0, 1, 0]] },
      { id: "Q23", primary: "tempo", zh: { q: "当 AI 可能替代一部分工作时，你首先会？", a: ["盘点可量化能力，制定一套稳健升级计划", "寻找尚未被定义的新角色，先进去再说"] }, en: { q: "When AI may replace part of your work, you first:", a: ["Inventory measurable skills and build a reliable upgrade plan", "Look for an undefined new role and enter before it has a title"] }, weights: [[0, 1, -2, 0, 0], [0, -1, 2, 0, 0]] },
      { id: "Q24", primary: "boundary", zh: { q: "朋友问你一个很私人的问题，AI 恰好可能帮得上忙。", a: ["得到同意后，用 AI 帮忙梳理更多角度", "倾向不用，人和人的信任不该默认外包"] }, en: { q: "A friend asks something deeply personal, and AI might help.", a: ["With consent, use AI to surface more perspectives", "Avoid it; human trust should not be outsourced by default"] }, weights: [[0, 0, 0, 2, -1], [0, 0, 0, -2, 1]] },
      { id: "Q25", primary: "taste", zh: { q: "十个 AI 方案都完成了任务，但风格不同。你通常先看？", a: ["哪个有自己的观点、节奏和记忆点", "哪个最清楚、最省成本、最容易执行"] }, en: { q: "Ten AI options all solve the task but differ in style. You first look for:", a: ["A point of view, rhythm, and something memorable", "Clarity, low cost, and ease of execution"] }, weights: [[0, -1, 0, 0, 2], [0, 1, 0, 0, -2]] },

      { id: "Q26", primary: "agency", zh: { q: "你更理想的 AI 搭档像？", a: ["会挑战我、经常带来意外联想的共创者", "执行力极强、能稳定交付的副驾驶"] }, en: { q: "Your ideal AI collaborator is more like:", a: ["A co-creator that challenges me and makes surprising connections", "A highly reliable copilot that executes consistently"] }, weights: [[-2, 0, 0, 0, 1], [2, 0, 0, 0, -1]] },
      { id: "Q27", primary: "trust", zh: { q: "用 AI 学习一个陌生领域时，你倾向？", a: ["从最感兴趣的问题出发，不断追问支线", "先建立知识地图、可信来源和检查题"] }, en: { q: "When learning a new field with AI, you prefer to:", a: ["Start with the most interesting question and follow side paths", "Build a knowledge map, trusted sources, and checks first"] }, weights: [[0, -2, 1, 0, 0], [0, 2, -1, 0, 0]] },
      { id: "Q28", primary: "tempo", zh: { q: "你刚做出一个效果很好的 AI 工作流。", a: ["尽快发出去，让真实使用帮助它继续进化", "自己稳定验证一阵，再决定是否扩大使用"] }, en: { q: "You have just built an AI workflow that works unusually well.", a: ["Release it quickly and let real use improve it", "Validate it privately for a while before expanding use"] }, weights: [[0, 0, 2, 1, 0], [0, 0, -2, -1, 0]] },
      { id: "Q29", primary: "boundary", zh: { q: "如果由你制定团队 AI 政策，你更接近？", a: ["默认最小权限，明确批准后才能扩大使用", "默认可协作，敏感内容再分级和脱敏"] }, en: { q: "If you wrote your team's AI policy, it would be closer to:", a: ["Least privilege by default, expanding only after explicit approval", "Collaborative by default, with sensitive content classified and redacted"] }, weights: [[0, 1, 0, -2, 0], [0, -1, 0, 2, 0]] },
      { id: "Q30", primary: "taste", zh: { q: "AI 已经能稳定复现品牌 90% 的表达风格。", a: ["接入流程并规模化，剩下 10% 留给重要内容", "继续校准细微语气，因为那 10% 才是品牌"] }, en: { q: "AI can now reproduce 90% of a brand voice consistently.", a: ["Scale it in the workflow and reserve the last 10% for key pieces", "Keep calibrating the nuance because the last 10% is the brand"] }, weights: [[1, 0, 0, 0, -2], [-1, 0, 0, 0, 2]] }
    ],
    camps: {
      DP: { zh: "未来定义者", en: "Future Definer" }, CP: { zh: "人机共生派", en: "Human–AI Symbiote" },
      DS: { zh: "互联网实干派", en: "Internet Operator" }, CS: { zh: "人类保留派", en: "Human-first Keeper" }
    },
    tasteProfiles: {
      T: {
        zh: { heading: "审美介入模式", copy: "你认为生成正在变便宜，选择、删减和定调才是稀缺能力。成品必须经过人的判断，不能只完成任务。", edge: "你能识别同质化、AI 味和细微的不协调，并建立可辨认的表达。", bug: "容易陷入完美主义，把已经有效的成果留在永远改不完的草稿里。", aiUse: "让 AI 负责发散、版本和素材，再由你策展、重写、定调并保留最终否决权。" },
        en: { heading: "Taste intervention mode", copy: "You see generation becoming cheap while selection, subtraction, and direction become scarce. Useful is not finished until human judgment enters.", edge: "You notice sameness, AI residue, and tiny inconsistencies, then turn them into a recognizable voice.", bug: "Perfectionism can trap already effective work in an endlessly refined draft.", aiUse: "Let AI expand options and raw material; keep curation, rewriting, direction, and final veto with you." }
      },
      U: {
        zh: { heading: "效用优先模式", copy: "你相信解决问题本身就是一种美。与其为了细节拖延，不如先让成果进入真实世界接受检验。", edge: "你擅长把 AI 变成速度、规模和稳定产出的现实优势。", bug: "容易接受过度通用的输出，让品牌、观点或人的独特性被效率磨平。", aiUse: "让 AI 承担标准化、高频和批量任务，用清晰指标与真实反馈决定是否继续优化。" },
        en: { heading: "Utility-first mode", copy: "You believe solving the problem is a form of beauty. Better to put work into the world than delay it for invisible polish.", edge: "You turn AI into practical speed, scale, and consistent output.", bug: "Generic output can quietly flatten brand, point of view, and human distinctiveness.", aiUse: "Give AI standardized, frequent, and high-volume work; use clear metrics and real feedback to decide what deserves more polish." }
      }
    },
    modules: {
      D: { zh: { collab: "你会自然地主动定方向、拆任务和设验收标准；提前说明哪些决定可以被挑战，合作会更顺。" }, en: { collab: "You naturally set direction, split tasks, and define acceptance. Collaboration improves when you state which decisions are open to challenge." } },
      C: { zh: { collab: "你擅长让人和 AI 在来回反馈中共同形成答案；关键节点记得明确谁负责最后决定。" }, en: { collab: "You help people and AI form answers through feedback. At key moments, name who owns the final decision." } },
      F: { zh: { learn: "先建立知识地图与可信来源，再让 AI 出题、对照和检验理解。" }, en: { learn: "Build a knowledge map and trusted sources, then use AI to quiz, compare, and test understanding." } },
      I: { zh: { learn: "从真正好奇的问题和情境模拟切入，让 AI 建立联想，最后补做事实核验。" }, en: { learn: "Start with genuine curiosity and simulations, use AI for connections, then add a deliberate fact-check pass." } },
      P: { zh: { learn: "用短周期实验接触新能力，边做边记录真正有效的模式。" }, en: { learn: "Learn new capability through short experiments and record only the patterns that actually work." } },
      S: { zh: { learn: "选择稳定工具与连续课程，把零散技巧沉淀成可以重复使用的体系。" }, en: { learn: "Choose stable tools and continuous learning paths, turning scattered tricks into a repeatable system." } },
      O: { zh: { collab: "你愿意共享过程、连接资源并公开复盘；先约定隐私、署名与数据分级，会让开放更可持续。" }, en: { collab: "You share process, connect resources, and debrief openly. Agreeing on privacy, credit, and data levels makes openness sustainable." } },
      G: { zh: { collab: "你偏好小范围深度合作，重视授权和信息边界；明确哪些内容可以流动，能减少团队误解。" }, en: { collab: "You prefer trusted, small-group collaboration and clear information boundaries. Define what may travel to reduce friction." } }
    },
    baseTypes: {
      DFPO: {
        zh: { name: "AI 开荒总指挥", portrait: "你把新模型看成等待被组织的基础设施。先试、再验、最后写成人人都能复用的系统，是你进入未来的方式。", edge: "能把前沿能力快速翻译成清晰规则、可靠流程和团队资产。", bug: "容易默认别人也应该立刻跟上，并把尚未成熟的实验推得过快。", aiUse: "适合模型对比、结构化提示、自动化链路、质量量表与公开复盘。", work: "最适合负责 AI 试点、流程设计和跨团队落地；拥有明确目标与验收权时发挥最好。" },
        en: { name: "AI Frontier Commander", portrait: "You see new models as infrastructure waiting to be organized. You test early, verify hard, then turn discoveries into systems other people can repeat.", edge: "You translate frontier capability into clear rules, reliable workflows, and team assets.", bug: "You may assume everyone should catch up immediately and push immature experiments too far.", aiUse: "Model comparisons, structured prompts, automation chains, quality rubrics, and public debriefs suit you.", work: "You thrive owning AI pilots, process design, and cross-team rollout with clear goals and acceptance authority." },
        variants: {
          T: { zh: { modifier: "风格定盘者", tagline: "别人还在问 AI 能干嘛，你已经开始嫌弃它的默认审美了。" }, en: { modifier: "Style Setter", tagline: "While others ask what AI can do, you are already rejecting its default taste." } },
          U: { zh: { modifier: "效率爆破手", tagline: "别人还在问 AI 能干嘛，你已经给全组发了第二版操作手册。" }, en: { modifier: "Throughput Breaker", tagline: "While others ask what AI can do, your team is already on version two of the playbook." } }
        }
      },
      DFPG: {
        zh: { name: "模型驯兽师", portrait: "你追前沿，但不把方向盘交出去。每个模型都要经过压力测试、权限检查和私人训练，才配进入你的核心工作。", edge: "能在新能力还很混乱时迅速识别真正可靠、可控的部分。", bug: "控制和保密可能让好方法困在个人工具箱，也容易低估协作反馈。", aiUse: "适合私有知识库、红队测试、受控自动化和高价值个人工作流。", work: "在高风险、强专业或敏感项目中表现最好，喜欢小团队和清晰责任。" },
        en: { name: "Model Tamer", portrait: "You pursue frontier capability without giving away the wheel. A model must survive stress tests, access checks, and personal training before entering core work.", edge: "You identify the reliable and controllable part of a chaotic new capability early.", bug: "Control and secrecy can trap useful methods in a private toolbox and reduce collaborative feedback.", aiUse: "Private knowledge bases, red-team tests, controlled automation, and high-value personal workflows fit you.", work: "You perform best in sensitive, expert, or high-risk projects with a small team and clear accountability." },
        variants: {
          T: { zh: { modifier: "私人美术馆馆长", tagline: "嘴上说模型不可信，手里已经把它调成了只懂你品味的私人兵器。" }, en: { modifier: "Private Gallery Keeper", tagline: "You call the model untrustworthy while quietly training it to understand only your taste." } },
          U: { zh: { modifier: "私域军火商", tagline: "模型更新不重要，能稳定替你干活才配留在收藏夹。" }, en: { modifier: "Private Arsenal Builder", tagline: "A model update means nothing until it reliably works for you." } }
        }
      },
      DFSO: {
        zh: { name: "AI 流程包工头", portrait: "你不追每一场发布会，只关心 AI 能不能变成稳定工程。你擅长把工具塞进表格、模板和责任链，最后真的交付。", edge: "能把技术热词拆成可执行步骤，让团队获得稳定的效率收益。", bug: "过度依赖成熟流程时，可能看不见新工具已经改变了问题本身。", aiUse: "适合标准作业程序、知识库、批量处理、检查清单和团队模板。", work: "适合运营、项目管理和规模化交付，是团队里让 AI 真正落地的人。" },
        en: { name: "AI Workflow Foreman", portrait: "You do not chase every launch; you care whether AI can become dependable operations. You put tools into templates, tables, and ownership chains until work ships.", edge: "You turn technology hype into executable steps and durable team efficiency.", bug: "Mature process can become a blind spot when a new tool changes the problem itself.", aiUse: "Standard procedures, knowledge bases, batch work, checklists, and team templates fit you.", work: "Operations, project management, and scaled delivery suit you; you make AI real after the demo ends." },
        variants: {
          T: { zh: { modifier: "交付洁癖版", tagline: "所有人都说能用了，只有你还在消灭最后 3% 的 AI 味。" }, en: { modifier: "Delivery Perfectionist", tagline: "Everyone says it is ready; you are still removing the last 3% of AI residue." } },
          U: { zh: { modifier: "流水线版", tagline: "在你眼里，能批量稳定交付，本身就是一种工业美学。" }, en: { modifier: "Assembly-line Edition", tagline: "For you, reliable output at scale is its own industrial aesthetic." } }
        }
      },
      DFSG: {
        zh: { name: "互联网老登 Pro", portrait: "你见过太多风口和翻车现场，所以只信经得起时间的工具。AI 可以上岗，但要先通过你的旧世界生存测试。", edge: "经验、风险意识和稳定性判断让你很少为技术幻觉买单。", bug: "可靠可能变成不变，过去成功的标准也可能阻止你看到新的工作方式。", aiUse: "适合可审计工具、权限明确的企业方案、成熟模型和人工复核流程。", work: "在需要连续性、合规与兜底的岗位非常可靠，是热潮里的刹车系统。" },
        en: { name: "Web 2.0 Veteran", portrait: "You have watched too many hype cycles and production failures to trust novelty alone. AI may join, but it must pass your old-internet survival test.", edge: "Experience, risk awareness, and operational judgment keep you from paying for technical illusions.", bug: "Reliability can become immobility, and yesterday's winning standard can hide a new way of working.", aiUse: "Auditable tools, permissioned enterprise systems, mature models, and human review suit you.", work: "You are dependable where continuity, compliance, and fallback matter—the brakes inside the hype cycle." },
        variants: {
          T: { zh: { modifier: "像素级洁癖", tagline: "工具可以新，字体、标点和文件名必须听老规矩的。" }, en: { modifier: "Pixel-level Purist", tagline: "The tool may be new; typography, punctuation, and file names still obey the old laws." } },
          U: { zh: { modifier: "能跑别动", tagline: "只要 Excel 还能打开，你就觉得 AI 革命多少有点营销成分。" }, en: { modifier: "If It Runs, Don't Touch It", tagline: "As long as the spreadsheet opens, the AI revolution still feels slightly like marketing." } }
        }
      },
      DIPO: {
        zh: { name: "赛博造浪家", portrait: "你靠直觉捕捉技术还没有名字的可能，并且愿意主动把它推到人群面前。AI 对你不是工具升级，而是新文化的原料。", edge: "能提前感知趋势、快速形成叙事，并让别人看见尚未成形的未来。", bug: "容易爱上可能性本身，忽略证据、维护成本和真正完成最后一公里。", aiUse: "适合概念原型、趋势扫描、创意发散、跨媒介实验与快速发布。", work: "适合创新、品牌、新产品和零到一项目；需要一位强执行伙伴帮你落地。" },
        en: { name: "Cyber Wave Maker", portrait: "You intuit possibilities before technology has language for them, then push those possibilities into public view. AI is not an upgrade to you; it is raw material for a new culture.", edge: "You sense trends early, build narratives quickly, and help others see an unfinished future.", bug: "You can fall for possibility itself and neglect evidence, maintenance, or the final mile.", aiUse: "Concept prototypes, trend scans, creative expansion, cross-media experiments, and rapid release fit you.", work: "Innovation, brand, new products, and zero-to-one work suit you; a strong operator helps ideas land." },
        variants: {
          T: { zh: { modifier: "风格发明者", tagline: "别人追风口，你顺手给风口设计了一套视觉识别系统。" }, en: { modifier: "Style Inventor", tagline: "Others chase the wave; you give the wave a visual identity." } },
          U: { zh: { modifier: "爆款加速器", tagline: "灵感是不是原创以后再说，先让它今天晚上跑起来。" }, en: { modifier: "Launch Accelerator", tagline: "Originality can be debated later. First, make it run tonight." } }
        }
      },
      DIPG: {
        zh: { name: "黑箱炼金术士", portrait: "你在私人空间里追逐最前沿的模型和最反常识的组合。别人看到的是成品，你保护的是让成品发生的秘密实验室。", edge: "能在低干扰环境中形成独特方法，并把直觉炼成别人难以复制的优势。", bug: "缺少外部反馈会放大盲点，神秘感也可能让方法难以协作和规模化。", aiUse: "适合私人代理、封闭原型、定制模型、深度提示链与敏感创作。", work: "适合独立研究、创意实验和高自主权项目，不喜欢过程被频繁围观。" },
        en: { name: "Black-box Alchemist", portrait: "You combine frontier models and unlikely ideas inside a private laboratory. Others see the output; you protect the experiments that made it possible.", edge: "Low-interruption exploration lets you turn intuition into methods competitors cannot easily copy.", bug: "Limited outside feedback amplifies blind spots, and mystery makes collaboration or scaling harder.", aiUse: "Private agents, closed prototypes, customized models, deep prompt chains, and sensitive creation suit you.", work: "Independent research, creative experiments, and high-autonomy projects fit you; constant observation does not." },
        variants: {
          T: { zh: { modifier: "密室策展人", tagline: "成品像魔法，审美依据和提示词都属于商业机密。" }, en: { modifier: "Closed-room Curator", tagline: "The result looks like magic; the taste logic and prompts are classified." } },
          U: { zh: { modifier: "隐形外挂", tagline: "没人知道你怎么做的，只知道你的交付速度不太像人类。" }, en: { modifier: "Invisible Upgrade", tagline: "Nobody knows how you work; they only know your delivery speed looks suspiciously nonhuman." } }
        }
      },
      DISO: {
        zh: { name: "赛博 PPT 主理人", portrait: "你不急着换掉已经可靠的工作方式，但很会让 AI 替旧流程增加表达力。你把灵感包装成别人能够理解和使用的成品。", edge: "能在稳定框架里加入创意，让新技术进入组织时不至于水土不服。", bug: "过度依赖熟悉载体，可能把真正的新能力压回旧模板。", aiUse: "适合提案、叙事结构、演示文稿、成熟内容流程和渐进式升级。", work: "适合策略、沟通和需要说服力的岗位，是新工具与旧组织之间的翻译层。" },
        en: { name: "Cyber Deck Director", portrait: "You do not rush to replace reliable work, but you use AI to add expression to established systems. You package intuition into something other people can understand and use.", edge: "You add creativity inside stable frames, helping new technology survive contact with organizations.", bug: "Familiar formats can compress genuinely new capability back into yesterday's template.", aiUse: "Proposals, narrative structure, presentations, mature content systems, and gradual upgrades suit you.", work: "Strategy, communication, and persuasion fit you; you translate between new tools and old institutions." },
        variants: {
          T: { zh: { modifier: "版式教父", tagline: "嘴上说 AI 没灵魂，转头把第十八版汇报的行距改了 0.1。" }, en: { modifier: "Layout Godparent", tagline: "You say AI has no soul, then adjust version eighteen's line spacing by 0.1." } },
          U: { zh: { modifier: "汇报加速器", tagline: "别人做 PPT 是创作，你做 PPT 已经接近工业化生产。" }, en: { modifier: "Deck Accelerator", tagline: "Others make presentations. You run a presentation production line." } }
        }
      },
      DISG: {
        zh: { name: "离线咒术师", portrait: "你愿意使用 AI，但最好在自己能看见边界的地方。熟悉工具、私人语境和不被打扰的判断，比追逐最新能力更重要。", edge: "能保护敏感信息、个人风格和长期积累，不容易被平台变化牵着走。", bug: "过度封闭会错过外部反馈、共享资源和已经足够安全的新方案。", aiUse: "适合本地模型、离线工具、私有资料库、手动工作流和最小数据输入。", work: "适合个人创作、机密项目和需要连续专注的工作，以自主权换取稳定产出。" },
        en: { name: "Offline Wizard", portrait: "You will use AI, preferably inside boundaries you can see. Familiar tools, private context, and uninterrupted judgment matter more than chasing the newest capability.", edge: "You protect sensitive information, personal voice, and long-term craft without depending on platform fashion.", bug: "Too much closure can miss useful feedback, shared resources, and new tools that are safe enough.", aiUse: "Local models, offline tools, private libraries, manual workflows, and minimal data input suit you.", work: "Personal creation, confidential projects, and deep-focus work fit you; autonomy produces your best consistency." },
        variants: {
          T: { zh: { modifier: "本地策展版", tagline: "能离线精修的东西，绝不让云端看见半个像素。" }, en: { modifier: "Local Curator", tagline: "If it can be refined offline, the cloud does not get to see a single pixel." } },
          U: { zh: { modifier: "本地能跑版", tagline: "不是不会用 AI，是你的安全感来自断网也能交付。" }, en: { modifier: "Runs Offline Edition", tagline: "You can use AI; you simply prefer knowing the work survives without Wi-Fi." } }
        }
      },
      CFPO: {
        zh: { name: "人机开源盟主", portrait: "你相信最好的 AI 方法来自公开实验、彼此纠错和共同维护。你既愿意尝新，也会用证据帮助社区把热闹变成知识。", edge: "能快速连接人、工具和案例，让个人发现变成群体能力。", bug: "开放速度过快时，隐私、署名和未成熟结论可能被一起扩散。", aiUse: "适合共享知识库、公开评测、协作提示词、社区实验和透明复盘。", work: "适合开发者关系、知识管理、研究协作和开放创新，是网络效应的发动机。" },
        en: { name: "Open-source AI Orchestrator", portrait: "You believe the best AI methods emerge through public experiments, correction, and shared maintenance. You try early and use evidence to turn excitement into knowledge.", edge: "You connect people, tools, and cases quickly, converting individual discovery into collective capability.", bug: "When openness moves too fast, privacy, credit, and immature conclusions may spread with it.", aiUse: "Shared knowledge bases, public evaluations, collaborative prompts, community experiments, and transparent debriefs fit you.", work: "Developer relations, knowledge management, research collaboration, and open innovation suit you." },
        variants: {
          T: { zh: { modifier: "社区品控官", tagline: "你最早把 AI 拉进群聊，也最先说这版还不配发布。" }, en: { modifier: "Community Quality Editor", tagline: "You bring AI into the group first—and reject the group's first release." } },
          U: { zh: { modifier: "工作流布道师", tagline: "最后全群都在用你的模板，连吐槽格式都统一了。" }, en: { modifier: "Workflow Evangelist", tagline: "Eventually the whole group uses your template, including the complaint format." } }
        }
      },
      CFPG: {
        zh: { name: "AI 红队猎人", portrait: "你喜欢和新模型对话，但信任要靠不断找茬建立。你探索边界、记录失败，并把敏感发现留在合适的人之间。", edge: "能发现模型表面流畅之下的漏洞、幻觉和风险条件。", bug: "持续怀疑可能消耗创造力，也容易让团队只看见风险而不敢试。", aiUse: "适合红队、事实核验、封闭测试、风险评估和高敏感领域辅助。", work: "适合安全、研究、审计和关键决策支持，以可信为第一生产力。" },
        en: { name: "AI Red-team Hunter", portrait: "You enjoy talking with new models, but trust is earned by finding failure. You explore boundaries, document breaks, and keep sensitive findings with the right people.", edge: "You reveal holes, hallucinations, and failure conditions beneath fluent output.", bug: "Constant skepticism can drain creative momentum and make a team afraid to experiment.", aiUse: "Red teaming, fact checks, closed testing, risk assessment, and high-sensitivity assistance suit you.", work: "Security, research, audit, and critical decision support fit you; trustworthiness is your productivity metric." },
        variants: {
          T: { zh: { modifier: "审美验尸官", tagline: "你和 AI 关系很好，主要因为你每天都在指出它哪里像 AI。" }, en: { modifier: "Aesthetic Coroner", tagline: "You and AI get along mainly because you tell it exactly where it still looks like AI." } },
          U: { zh: { modifier: "漏洞捕手", tagline: "AI 每省你十分钟，你会花八分钟确认它没埋雷。" }, en: { modifier: "Failure Catcher", tagline: "For every ten minutes AI saves, you spend eight checking that it planted no mines." } }
        }
      },
      CFSO: {
        zh: { name: "AI 带教班主任", portrait: "你希望 AI 不只是个人外挂，而是团队里人人都能安全使用的新同事。你用成熟工具、清晰示范和耐心反馈降低门槛。", edge: "能建立共同语言，让不同熟练度的人稳定协作而不掉队。", bug: "照顾整体节奏时，容易压低高手的探索空间或延迟必要变革。", aiUse: "适合团队培训、标准模板、渐进试点、知识问答和共同检查。", work: "适合带教、运营、教育和组织变革，是团队采用 AI 时的稳定器。" },
        en: { name: "AI Homeroom Mentor", portrait: "You want AI to become a safe teammate for everyone, not a private advantage. Mature tools, clear demonstrations, and patient feedback lower the barrier.", edge: "You create shared language so people with different skill levels can work together reliably.", bug: "Protecting the group's pace can limit advanced exploration or delay a necessary change.", aiUse: "Team training, standard templates, gradual pilots, knowledge Q&A, and shared review fit you.", work: "Teaching, operations, education, and organizational change suit you; you stabilize adoption." },
        variants: {
          T: { zh: { modifier: "作业批注版", tagline: "工具不必最新，但交上来的东西不能一眼看出是 AI 代写。" }, en: { modifier: "Annotated Edition", tagline: "The tool need not be newest, but the work must not look obviously AI-written." } },
          U: { zh: { modifier: "标准答案版", tagline: "全组都能按说明书交付，就是你理解的技术普惠。" }, en: { modifier: "Answer-key Edition", tagline: "To you, democratized technology means the whole team can ship from the same playbook." } }
        }
      },
      CFSG: {
        zh: { name: "权限表守门大爷", portrait: "你接受 AI 进入团队，但每一步都要有授权、说明和人工兜底。新技术必须先学会尊重组织边界，才能获得更多权限。", edge: "能建立可信、安全且可追责的采用方式，保护团队不被一次事故拖垮。", bug: "流程过重会把低风险实验也挡在门外，让创新者转入地下使用。", aiUse: "适合企业级工具、权限分层、审核记录、受控知识库和人工确认。", work: "适合合规、治理、客户信任和高责任流程，是组织的 AI 门禁系统。" },
        en: { name: "Permission Gatekeeper", portrait: "AI may enter your team, but every step needs permission, explanation, and human fallback. New technology earns access by respecting organizational boundaries.", edge: "You build adoption that is safe, accountable, and resilient to a single failure.", bug: "Heavy process can block low-risk experiments and push innovators into shadow use.", aiUse: "Enterprise tools, permission tiers, audit logs, controlled knowledge bases, and human confirmation fit you.", work: "Compliance, governance, customer trust, and high-responsibility workflows suit you." },
        variants: {
          T: { zh: { modifier: "品牌门禁版", tagline: "没过审美和权限两道门，AI 输出别想进入正式文件。" }, en: { modifier: "Brand Access Control", tagline: "AI output passes both taste and permission checks before entering an official file." } },
          U: { zh: { modifier: "最小权限版", tagline: "没有授权记录的 AI，在你这里连门禁都过不了。" }, en: { modifier: "Least-privilege Edition", tagline: "Without an access record, AI does not make it past reception." } }
        }
      },
      CIPO: {
        zh: { name: "灵感永动机", portrait: "你通过不停对话、连接和公开碰撞理解 AI。每次交流都可能长出新支线，你最擅长让想法从一个人跳到另一个人。", edge: "联想速度快，能跨领域连接灵感，并营造鼓励新想法出现的氛围。", bug: "支线太多会稀释注意力，公开发散也可能早于判断和完成。", aiUse: "适合头脑风暴、多角色模拟、创意社群、快速概念和跨媒介联想。", work: "适合内容、社群、创意和探索型团队；需要明确的收敛节点保护交付。" },
        en: { name: "Infinite Ideator", portrait: "You understand AI through continuous conversation, connection, and public collision. Every exchange can grow a new branch, and you move ideas between people quickly.", edge: "Fast association helps you connect fields and create an atmosphere where new ideas appear.", bug: "Too many branches dilute attention, and public expansion can outrun judgment or completion.", aiUse: "Brainstorms, role simulation, creative communities, rapid concepts, and cross-media connections suit you.", work: "Content, community, creativity, and exploratory teams fit you; explicit convergence points protect delivery." },
        variants: {
          T: { zh: { modifier: "风格裂变者", tagline: "别人用 AI 提效，你用 AI 把脑洞开成了连锁店，还拒绝加盟。" }, en: { modifier: "Style Multiplier", tagline: "Others use AI for efficiency. You franchise new aesthetics and still refuse to standardize them." } },
          U: { zh: { modifier: "点子批发商", tagline: "灵感已经生成 200 条，真正交付的文件还叫“新建文档 3”。" }, en: { modifier: "Idea Wholesaler", tagline: "You have 200 ideas and one final file still named Untitled 3." } }
        }
      },
      CIPG: {
        zh: { name: "赛博深潜者", portrait: "你与 AI 的最佳合作发生在安静、私密、没有评价的深处。直觉带你向前，边界保护那些还没准备好见光的想法。", edge: "能进行长链条、非线性的探索，形成非常个人化且有深度的成果。", bug: "长期潜水容易失去现实校准，也可能因为不愿展示半成品而错过合作。", aiUse: "适合私人对话、长文研究、世界观构建、个人代理和深度创作。", work: "适合独立创作者、研究者和需要心理安全的项目；信任比规模重要。" },
        en: { name: "Cyber Deep Diver", portrait: "Your best work with AI happens in quiet, private depth without immediate evaluation. Intuition moves you; boundaries protect ideas not ready for daylight.", edge: "You sustain nonlinear exploration and produce deeply personal, layered work.", bug: "Long dives can lose reality checks, and hiding unfinished work can miss valuable collaboration.", aiUse: "Private dialogue, long-form research, world-building, personal agents, and deep creation suit you.", work: "Independent creation, research, and psychologically safe projects fit you; trust matters more than scale." },
        variants: {
          T: { zh: { modifier: "暗网美学家", tagline: "凌晨三点和 AI 聊出的东西，白天的人类暂时还不配看。" }, en: { modifier: "After-dark Aesthetician", tagline: "What you and AI made at 3 a.m. is not ready for daytime humans." } },
          U: { zh: { modifier: "地下原型师", tagline: "你不发动态，只在角落里默默做出了下一版未来。" }, en: { modifier: "Underground Prototyper", tagline: "You post no updates; you simply build the next version of the future in a corner." } }
        }
      },
      CISO: {
        zh: { name: "云端和事佬", portrait: "你让 AI 进入熟悉的人类关系和工作方式，而不是反过来要求所有人适应机器。语境、感受和共同节奏是你的关键接口。", edge: "能翻译不同角色的需求，让技术减少摩擦而不是制造新的隔阂。", bug: "为了维持和谐，可能回避必要冲突，也容易让效率目标变得不够明确。", aiUse: "适合沟通润色、会议准备、共识梳理、服务流程和渐进协作。", work: "适合客户、团队协调、教育和服务设计，是人和 AI 之间的润滑层。" },
        en: { name: "Cloud Mediator", portrait: "You bring AI into familiar human relationships instead of forcing everyone to adapt to machines. Context, feeling, and shared pace are your core interface.", edge: "You translate between roles so technology reduces friction rather than creating distance.", bug: "Protecting harmony can avoid necessary conflict and make efficiency goals vague.", aiUse: "Communication polishing, meeting preparation, consensus mapping, service workflows, and gradual collaboration fit you.", work: "Customer work, coordination, education, and service design suit you; you lubricate the human–AI boundary." },
        variants: {
          T: { zh: { modifier: "语气校准师", tagline: "大家都在和 AI 吵架，只有你在纠正它说话的分寸感。" }, en: { modifier: "Tone Calibrator", tagline: "Everyone else argues with AI; you teach it how much is too much." } },
          U: { zh: { modifier: "协作润滑剂", tagline: "只要项目能往前走，你不介意 AI 和人类谁先道歉。" }, en: { modifier: "Collaboration Lubricant", tagline: "If the project moves forward, you do not care whether human or AI apologizes first." } }
        }
      },
      CISG: {
        zh: { name: "人类体验钉子户", portrait: "你不拒绝 AI，但坚持很多价值只能在人与人的关系、经验和责任中成立。技术应该安静地辅助，而不是占据舞台中央。", edge: "能守住信任、同理心和难以量化的人类经验，避免把一切问题工具化。", bug: "对技术介入保持距离时，可能把可以安全减负的任务也继续留给自己。", aiUse: "适合低风险辅助、私人整理、人工主导服务、可撤回建议和最小介入。", work: "适合照护、咨询、文化、教育和高信任协作；人的在场感是核心资产。" },
        en: { name: "Human-experience Holdout", portrait: "You do not reject AI, but some value exists only through human relationship, experience, and responsibility. Technology should assist quietly rather than take center stage.", edge: "You protect trust, empathy, and hard-to-measure human experience from being reduced to tools.", bug: "Distance from technology can keep safely automatable burdens on your own shoulders.", aiUse: "Low-risk assistance, private organization, human-led service, reversible advice, and minimal intervention suit you.", work: "Care, counseling, culture, education, and high-trust collaboration fit you; human presence is the asset." },
        variants: {
          T: { zh: { modifier: "灵魂质检员", tagline: "不是反对 AI，只是很多东西没有人的味道就不算成品。" }, en: { modifier: "Soul Quality Inspector", tagline: "You are not anti-AI; you simply refuse to call something finished without a human trace." } },
          U: { zh: { modifier: "人工兜底王", tagline: "机器可以做 99%，最后那 1% 你还是不放心交出去。" }, en: { modifier: "Human Fallback Champion", tagline: "The machine may do 99%. You still keep the final 1% in human hands." } }
        }
      }
    }
  };

  root.MBAI_DATA = data;
  if (typeof module !== "undefined" && module.exports) module.exports = data;
})(typeof window !== "undefined" ? window : globalThis);
