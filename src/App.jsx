import { useState } from "react";

/* ============================================================================
   AMAZON AD INTELLIGENCE TOOLKIT — Free Prompt Generator Edition
   No API, no credits. Generates prompts to paste into Copilot / ChatGPT / Claude.
   ============================================================================ */

// ── Tool 1: Keyword Battle ──────────────────────────────────────────────────
const KW_FOCUS = [
  { id: "split",     label: "Organic vs Paid winners", blurb: "Who wins organically vs through ads" },
  { id: "placement", label: "Placement breakdown",     blurb: "Top-of-search, rest-of-search, product pages" },
  { id: "gaps",      label: "Placement gaps",           blurb: "Openings you could exploit" },
  { id: "cpc",       label: "CPC & bid guidance",       blurb: "Estimated costs and bid strategy" },
  { id: "creative",  label: "Creative angles",          blurb: "Messaging competitors use" },
];

function buildKeywordPrompt({ keyword, category, focus, depth, tone }) {
  const kw = keyword.trim() || "[KEYWORD]";
  const cat = category.trim();
  const map = {
    split:     "- **Organic vs Paid split** — separate who wins the top organic positions from who wins the sponsored placements, with the reason each wins and how dominant they are.",
    placement: "- **Placement breakdown** — cover four battlegrounds separately: Top of Search (sponsored), Rest of Search (sponsored), Top Organic positions, and Product-Page targeting. Say who owns each and how contested it is.",
    gaps:      "- **Placement gaps** — identify openings competitors are NOT covering, rated Easy / Medium / Hard to capture, with how to exploit each.",
    cpc:       "- **CPC & bid guidance** — give an estimated CPC range, competition level, and a suggested bid strategy for a new advertiser.",
    creative:  "- **Creative angles** — describe the messaging and positioning competitors use in ads for this keyword, and what angle is missing.",
  };
  const depthMap = {
    quick: "Keep it concise — a tight summary with the top 3 players only.",
    standard: "Provide balanced depth across each requested area.",
    deep: "Be exhaustive — cover 5+ players where relevant, with detailed tactical reasoning.",
  };
  const toneMap = {
    table: "Format with clear tables and bullet points for easy scanning.",
    prose: "Write as flowing analytical prose with clear section headers.",
    action: "Format as a prioritized action checklist.",
  };
  return `You are an Amazon search-placement and advertising analyst with deep expertise in organic ranking, sponsored placements, and PPC strategy.

Analyze who wins the Amazon keyword: "${kw}"${cat ? ` in the ${cat} category` : ""}.

Start with a 2-3 sentence overview plus quick stats: estimated search volume (Low/Medium/High/Very High), competition level (Fierce/Moderate/Low), estimated CPC range, and buyer intent.

Then cover:

${focus.map(f => map[f]).join("\n")}

Finish with 4 tactical insights — specific, actionable takeaways for competing on this keyword.

${depthMap[depth]} ${toneMap[tone]}

If unsure of exact real-time data, give your best expert estimate based on known market patterns and flag it as an estimate.`;
}

// ── Tool 2: Ad Spy (category) ───────────────────────────────────────────────
const SPY_FOCUS = [
  { id: "players",    label: "Dominant ad players",   blurb: "Brands, tiers, spend levels, strategies" },
  { id: "keywords",   label: "Keyword battlegrounds", blurb: "Contested keywords & CPCs" },
  { id: "trends",     label: "Ad trends",             blurb: "What's shifting right now" },
  { id: "whitespace", label: "Whitespace gaps",       blurb: "Underserved opportunities" },
];

function buildSpyPrompt({ category, focus, depth, tone }) {
  const cat = category.trim() || "[CATEGORY]";
  const map = {
    players:    "- **Dominant ad players** — for each major brand: tier (Enterprise/Mid-Market/Challenger/Generic), ad types running, estimated spend (Low/Medium/High/Very High), one-sentence strategy, 2 strengths, 1-2 weaknesses.",
    keywords:   "- **Keyword battlegrounds** — 5-7 high-stakes keywords with competition level, estimated CPC range, and who typically wins each.",
    trends:     "- **Ad trends** — 3-5 trends shaping advertising in this category now, each with a High/Medium/Low impact rating.",
    whitespace: "- **Whitespace opportunities** — 3-5 gaps competitors aren't covering, rated Easy/Medium/Hard to capture.",
  };
  const depthMap = {
    quick: "Keep it concise — top 3 players, tightest version.",
    standard: "Provide balanced depth across each area.",
    deep: "Be exhaustive — 5-6 players, detailed tactics throughout.",
  };
  const toneMap = {
    table: "Format with clear tables and bullet points.",
    prose: "Write as flowing analytical prose with headers.",
    action: "Format as a prioritized action checklist.",
  };
  return `You are an Amazon advertising intelligence analyst with deep knowledge of sponsored ads, PPC strategy, and retail media.

Analyze the competitive advertising landscape for the Amazon category: ${cat}.

Start with a 2-3 sentence overview of the category's ad landscape.

Then cover:

${focus.map(f => map[f]).join("\n")}

Finish with 4 tactical insights for someone looking to advertise in this category.

${depthMap[depth]} ${toneMap[tone]}

If unsure of exact real-time data, give your best expert estimate and flag it as an estimate.`;
}

// ── Tool 3: Competitor Deep-Dive ────────────────────────────────────────────
function buildCompetitorPrompt({ brand, category, depth, tone }) {
  const b = brand.trim() || "[BRAND]";
  const cat = category.trim() || "[CATEGORY]";
  const depthMap = {
    quick: "Keep it focused on the 3 most important findings.",
    standard: "Provide balanced coverage of all areas below.",
    deep: "Be exhaustive with detailed reasoning and specific examples throughout.",
  };
  const toneMap = {
    table: "Use tables and bullets where helpful.",
    prose: "Write as flowing analytical prose with headers.",
    action: "Format as a prioritized action checklist.",
  };
  return `You are an Amazon competitive intelligence analyst.

Run a deep-dive competitor analysis on ${b} in the Amazon ${cat} category. Cover:

- Current Amazon ad strategy (formats, funnel coverage)
- Top sponsored keywords they likely bid on
- Estimated monthly ad spend and how you arrived at it
- Creative angles they use (messaging, imagery, positioning)
- Their BSR (Best Seller Rank) trend over the last 90 days
- Pricing strategy vs competitors
- Any recent product launches
- 3 specific vulnerabilities a competitor could exploit

${depthMap[depth]} ${toneMap[tone]}

If unsure of exact real-time data, give your best expert estimate based on known market patterns and flag it as an estimate.`;
}

// ── Tool 4: PPC Budget Advisor ──────────────────────────────────────────────
function buildBudgetPrompt({ category, budget, goal, depth, tone }) {
  const cat = category.trim() || "[CATEGORY]";
  const bud = budget.trim() || "[MONTHLY BUDGET]";
  const goalMap = {
    launch: "launching a new product and needing visibility fast",
    profit: "maximizing profitability and ACoS efficiency",
    share: "aggressively taking market share from competitors",
    defend: "defending existing rankings against competitors",
  };
  const depthMap = {
    quick: "Keep it to the essential allocation and top 3 moves.",
    standard: "Provide a balanced plan across campaign types.",
    deep: "Be exhaustive — full campaign structure, bid ranges, and a 90-day ramp plan.",
  };
  const toneMap = {
    table: "Use a budget allocation table and bullets.",
    prose: "Write as an explained strategy with headers.",
    action: "Format as a step-by-step launch checklist.",
  };
  return `You are an Amazon PPC strategist.

Build an advertising budget and bidding strategy for the Amazon ${cat} category. My monthly ad budget is ${bud}, and my primary goal is ${goalMap[goal]}.

Cover:

- Recommended budget split across Sponsored Products, Sponsored Brands, Sponsored Brands Video, and Sponsored Display (with percentages and dollar amounts)
- Which keyword types to prioritize (broad/exact/branded/competitor) and why
- Suggested starting bid ranges for the main keyword tiers
- Target ACoS and what's realistic for this category
- 3 things to avoid that waste budget in this category
- A simple 30-day plan to get started

${depthMap[depth]} ${toneMap[tone]}

If unsure of exact real-time data, give your best expert estimate based on known market patterns and flag it as an estimate.`;
}

// ── Shared UI bits ──────────────────────────────────────────────────────────
const DEPTH = [
  { id: "quick", label: "Quick" },
  { id: "standard", label: "Standard" },
  { id: "deep", label: "Deep dive" },
];
const TONE = [
  { id: "table", label: "Tables" },
  { id: "prose", label: "Prose" },
  { id: "action", label: "Checklist" },
];

const TOOLS = [
  { id: "keyword",    name: "Keyword Battle",     icon: "⚔️", desc: "Who wins a keyword" },
  { id: "spy",        name: "Ad Spy",             icon: "🔍", desc: "Category ad landscape" },
  { id: "competitor", name: "Competitor Dive",    icon: "🎯", desc: "Deep-dive one brand" },
  { id: "budget",     name: "PPC Budget",         icon: "💰", desc: "Bid & budget plan" },
];

function Field({ label, optional, value, onChange, placeholder }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <label style={{ display: "block", fontSize: 11, color: "#5a5a75", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700, marginBottom: 7 }}>
        {label} {optional && <span style={{ color: "#33334a" }}>(optional)</span>}
      </label>
      <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        style={{ width: "100%", boxSizing: "border-box", background: "#12122a", border: "1px solid #24243c", borderRadius: 8, padding: "11px 13px", color: "#dcdcec", fontSize: 14, outline: "none", fontFamily: "inherit" }}
        onFocus={e => e.target.style.borderColor = "#4a3a8a"} onBlur={e => e.target.style.borderColor = "#24243c"} />
    </div>
  );
}

function SegRow({ label, options, value, onChange, cols }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <label style={{ display: "block", fontSize: 11, color: "#5a5a75", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700, marginBottom: 8 }}>{label}</label>
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols || options.length}, 1fr)`, gap: 7 }}>
        {options.map(o => (
          <button key={o.id} onClick={() => onChange(o.id)} style={{
            background: value === o.id ? "rgba(167,139,250,0.14)" : "transparent",
            border: value === o.id ? "1px solid rgba(167,139,250,0.45)" : "1px solid #24243c",
            borderRadius: 8, padding: "9px 8px", color: value === o.id ? "#c4b5fd" : "#7a7a95",
            fontSize: 12.5, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", textAlign: "center" }}>
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function CheckRow({ label, options, selected, onToggle }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <label style={{ display: "block", fontSize: 11, color: "#5a5a75", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700, marginBottom: 8 }}>
        {label} <span style={{ color: "#33334a" }}>(pick any)</span>
      </label>
      <div style={{ display: "grid", gap: 7 }}>
        {options.map(o => {
          const on = selected.includes(o.id);
          return (
            <button key={o.id} onClick={() => onToggle(o.id)} style={{
              background: on ? "rgba(167,139,250,0.14)" : "transparent",
              border: on ? "1px solid rgba(167,139,250,0.45)" : "1px solid #24243c",
              borderRadius: 8, padding: "9px 12px", color: on ? "#c4b5fd" : "#7a7a95",
              fontSize: 12.5, cursor: "pointer", fontFamily: "inherit", textAlign: "left" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <span style={{ fontSize: 13, opacity: on ? 1 : 0.3 }}>{on ? "☑" : "☐"}</span>
                <span style={{ fontWeight: 600 }}>{o.label}</span>
              </div>
              <div style={{ fontSize: 11, color: "#55556e", marginTop: 2, marginLeft: 20 }}>{o.blurb}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function App() {
  const [tool, setTool] = useState("keyword");
  const [copied, setCopied] = useState(false);

  // shared
  const [depth, setDepth] = useState("standard");
  const [tone, setTone]   = useState("table");

  // keyword
  const [kw, setKw]           = useState("");
  const [kwCat, setKwCat]     = useState("");
  const [kwFocus, setKwFocus] = useState(["split", "placement", "gaps"]);

  // spy
  const [spyCat, setSpyCat]     = useState("");
  const [spyFocus, setSpyFocus] = useState(["players", "keywords", "trends", "whitespace"]);

  // competitor
  const [compBrand, setCompBrand] = useState("");
  const [compCat, setCompCat]     = useState("");

  // budget
  const [budCat, setBudCat]   = useState("");
  const [budget, setBudget]   = useState("");
  const [goal, setGoal]       = useState("launch");

  const toggle = (arr, setArr, id) =>
    setArr(arr.includes(id) ? arr.filter(x => x !== id) : [...arr, id]);

  let prompt = "";
  if (tool === "keyword")    prompt = buildKeywordPrompt({ keyword: kw, category: kwCat, focus: kwFocus, depth, tone });
  if (tool === "spy")        prompt = buildSpyPrompt({ category: spyCat, focus: spyFocus, depth, tone });
  if (tool === "competitor") prompt = buildCompetitorPrompt({ brand: compBrand, category: compCat, depth, tone });
  if (tool === "budget")     prompt = buildBudgetPrompt({ category: budCat, budget, goal, depth, tone });

  const copy = () => {
    navigator.clipboard.writeText(prompt).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    });
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a12", color: "#dcdcec", fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* Header */}
      <div style={{ background: "linear-gradient(180deg, #101020, #0a0a12)", borderBottom: "1px solid #1a1a2c", padding: "20px 26px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#a78bfa", boxShadow: "0 0 8px #a78bfa99" }} />
          <span style={{ fontSize: 10, letterSpacing: "0.18em", color: "#5a5a75", textTransform: "uppercase", fontWeight: 700 }}>Free · No API · Works in Copilot</span>
        </div>
        <h1 style={{ margin: 0, fontSize: 23, fontWeight: 800, letterSpacing: "-0.04em", color: "#fff", lineHeight: 1 }}>
          Amazon Ad Intelligence <span style={{ color: "#a78bfa" }}>Toolkit</span>
        </h1>
        <p style={{ margin: "5px 0 14px", fontSize: 12.5, color: "#5a5a75" }}>Build a prompt → paste into Copilot, ChatGPT, or Claude</p>

        {/* Tool tabs */}
        <div style={{ display: "flex", gap: 4 }}>
          {TOOLS.map(t => (
            <button key={t.id} onClick={() => setTool(t.id)} style={{
              background: tool === t.id ? "#12122a" : "transparent",
              border: "1px solid " + (tool === t.id ? "#2a2a48" : "transparent"),
              borderBottom: tool === t.id ? "1px solid #12122a" : "1px solid transparent",
              borderRadius: "8px 8px 0 0", padding: "10px 16px", cursor: "pointer",
              fontFamily: "inherit", marginBottom: -1,
            }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: tool === t.id ? "#c4b5fd" : "#6a6a85" }}>{t.icon} {t.name}</div>
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, alignItems: "start" }}>

        {/* Left: controls */}
        <div style={{ padding: "22px 26px", borderRight: "1px solid #1a1a2c" }}>

          {tool === "keyword" && (<>
            <Field label="Keyword *" value={kw} onChange={setKw} placeholder="e.g. external hard drive for ps5" />
            <Field label="Category" optional value={kwCat} onChange={setKwCat} placeholder="e.g. External Hard Drives" />
            <CheckRow label="What to analyze" options={KW_FOCUS} selected={kwFocus} onToggle={id => toggle(kwFocus, setKwFocus, id)} />
          </>)}

          {tool === "spy" && (<>
            <Field label="Category *" value={spyCat} onChange={setSpyCat} placeholder="e.g. Wireless Earbuds" />
            <CheckRow label="What to analyze" options={SPY_FOCUS} selected={spyFocus} onToggle={id => toggle(spyFocus, setSpyFocus, id)} />
          </>)}

          {tool === "competitor" && (<>
            <Field label="Brand *" value={compBrand} onChange={setCompBrand} placeholder="e.g. Seagate" />
            <Field label="Category *" value={compCat} onChange={setCompCat} placeholder="e.g. External Hard Drives" />
          </>)}

          {tool === "budget" && (<>
            <Field label="Category *" value={budCat} onChange={setBudCat} placeholder="e.g. Standing Desks" />
            <Field label="Monthly budget *" value={budget} onChange={setBudget} placeholder="e.g. $5,000/month" />
            <SegRow label="Primary goal" cols={2} value={goal} onChange={setGoal} options={[
              { id: "launch", label: "Launch fast" },
              { id: "profit", label: "Max profit" },
              { id: "share", label: "Take share" },
              { id: "defend", label: "Defend rank" },
            ]} />
          </>)}

          <SegRow label="Depth" value={depth} onChange={setDepth} options={DEPTH} />
          <SegRow label="Output format" value={tone} onChange={setTone} options={TONE} />
        </div>

        {/* Right: output */}
        <div style={{ padding: "22px 26px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <span style={{ fontSize: 11, color: "#5a5a75", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700 }}>Your Prompt</span>
            <button onClick={copy} style={{
              background: copied ? "rgba(52,211,153,0.15)" : "linear-gradient(135deg, #7c3aed, #5b21b6)",
              border: copied ? "1px solid rgba(52,211,153,0.4)" : "none", borderRadius: 7,
              padding: "7px 16px", color: copied ? "#34d399" : "#fff", fontSize: 12.5, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
              {copied ? "✓ Copied!" : "📋 Copy"}
            </button>
          </div>

          <div style={{ background: "#0e0e1e", border: "1px solid #1e1e34", borderRadius: 10, padding: "16px 18px", maxHeight: 420, overflow: "auto" }}>
            <pre style={{ margin: 0, fontSize: 12.5, color: "#b8b8d4", lineHeight: 1.6, whiteSpace: "pre-wrap", wordBreak: "break-word", fontFamily: "'SF Mono', Menlo, monospace" }}>{prompt}</pre>
          </div>

          <div style={{ marginTop: 14, background: "rgba(167,139,250,0.06)", border: "1px solid rgba(167,139,250,0.18)", borderRadius: 9, padding: "12px 15px" }}>
            <div style={{ fontSize: 11, color: "#a78bfa", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>How to use</div>
            <ol style={{ margin: 0, paddingLeft: 18, fontSize: 12.5, color: "#8a8aa8", lineHeight: 1.7 }}>
              <li>Fill in the fields and pick your options</li>
              <li>Click <strong style={{ color: "#c4b5fd" }}>Copy</strong></li>
              <li>Paste into Copilot, ChatGPT, or Claude</li>
              <li>Send and read your analysis</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

