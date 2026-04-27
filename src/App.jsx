 import { useState, useEffect, useRef, useCallback } from "react";

// ─── THEMES ───────────────────────────────────────────────────────────────────
const THEMES = {
  midnight: {
    id: "midnight",
    name: "Midnight",
    emoji: "🌙",
    tagline: "Still & deep",
    bg: "#06060f",
    bgGrad: "radial-gradient(ellipse at 20% 20%, #0d0a2a 0%, #06060f 60%)",
    card: "#0e0e1e",
    cardBorder: "#1a1a30",
    primary: "#7c6af7",
    primaryLight: "#a99cf9",
    primaryDim: "#3d2f9e",
    accent: "#c9a84c",
    accentDim: "#7a6020",
    text: "#e8e4ff",
    textDim: "#6060a0",
    surface: "#12122a",
    glow: "rgba(124,106,247,0.15)",
    font: "'Cormorant Garamond', Georgia, serif",
  },
  bloom: {
    id: "bloom",
    name: "Bloom",
    emoji: "🌸",
    tagline: "Soft & warm",
    bg: "#0f0609",
    bgGrad: "radial-gradient(ellipse at 80% 10%, #2a0a18 0%, #0f0609 60%)",
    card: "#1a0a10",
    cardBorder: "#2e1020",
    primary: "#e8789a",
    primaryLight: "#f5a0ba",
    primaryDim: "#8a304a",
    accent: "#f0c080",
    accentDim: "#907030",
    text: "#f5e8ee",
    textDim: "#705060",
    surface: "#1e0e16",
    glow: "rgba(232,120,154,0.15)",
    font: "'Playfair Display', Georgia, serif",
  },
  golden: {
    id: "golden",
    name: "Golden",
    emoji: "☀️",
    tagline: "Radiant & alive",
    bg: "#080600",
    bgGrad: "radial-gradient(ellipse at 50% 0%, #1a1000 0%, #080600 60%)",
    card: "#120e00",
    cardBorder: "#2a2000",
    primary: "#e8b84c",
    primaryLight: "#f5d080",
    primaryDim: "#8a6010",
    accent: "#e07050",
    accentDim: "#803020",
    text: "#f5f0e0",
    textDim: "#706040",
    surface: "#181200",
    glow: "rgba(232,184,76,0.15)",
    font: "'Libre Baskerville', Georgia, serif",
  },
  peaceful: {
    id: "peaceful",
    name: "Peaceful",
    emoji: "🌿",
    tagline: "Grounded & still",
    bg: "#040a06",
    bgGrad: "radial-gradient(ellipse at 30% 70%, #081a0c 0%, #040a06 60%)",
    card: "#081208",
    cardBorder: "#102010",
    primary: "#6abf80",
    primaryLight: "#90d8a0",
    primaryDim: "#2a6040",
    accent: "#c9a84c",
    accentDim: "#706020",
    text: "#e0f0e8",
    textDim: "#406050",
    surface: "#0c180c",
    glow: "rgba(106,191,128,0.15)",
    font: "'Lora', Georgia, serif",
  },
  pure: {
    id: "pure",
    name: "Pure",
    emoji: "🤍",
    tagline: "Clean & clear",
    bg: "#f8f6f2",
    bgGrad: "radial-gradient(ellipse at 50% 0%, #ede8e0 0%, #f8f6f2 60%)",
    card: "#ffffff",
    cardBorder: "#e0d8cc",
    primary: "#8a6a4a",
    primaryLight: "#b08860",
    primaryDim: "#c0a888",
    accent: "#6a8a6a",
    accentDim: "#90b090",
    text: "#2a2018",
    textDim: "#908070",
    surface: "#f0ece4",
    glow: "rgba(138,106,74,0.08)",
    font: "'Cormorant Garamond', Georgia, serif",
  },
};

// ─── DATA ─────────────────────────────────────────────────────────────────────
const TIMES = [
  { id: "morning", label: "Morning", icon: "🌅", greeting: "Good morning, beloved.", verse: "This is the day the Lord has made; let us rejoice and be glad in it. — Psalm 118:24" },
  { id: "afternoon", label: "Afternoon", icon: "☀️", greeting: "You are sustained, beloved.", verse: "I can do all things through Christ who strengthens me. — Philippians 4:13" },
  { id: "evening", label: "Evening", icon: "🌇", greeting: "Well done today, beloved.", verse: "He gives strength to the weary. — Isaiah 40:29" },
  { id: "night", label: "Night", icon: "🌙", greeting: "Rest now, beloved.", verse: "He grants sleep to those he loves. — Psalm 127:2" },
];

const ROUTINES = {
  morning: [
    { id: "wake", icon: "🌅", title: "Wake & Be Still", desc: "Lie still for 2 minutes. Breathe. Say: 'Good morning Lord, I am yours today.'", duration: "2 min", category: "spiritual" },
    { id: "pray", icon: "🙏", title: "Morning Prayer", desc: "Talk to God freely. Thank Him for the night. Ask for guidance for today.", duration: "5–10 min", category: "spiritual" },
    { id: "worship", icon: "🎵", title: "Worship", desc: "Play one worship song. Let it fill the room. Sing, hum, or just listen.", duration: "5 min", category: "spiritual" },
    { id: "word", icon: "📖", title: "The Word", desc: "Read one passage or verse. Sit with it. Don't rush.", duration: "5–10 min", category: "spiritual" },
    { id: "body", icon: "💧", title: "Hydrate Your Temple", desc: "Drink a full glass of water. Your body is God's temple — water it first.", duration: "1 min", category: "body" },
    { id: "move", icon: "🤸", title: "Move Your Body", desc: "Stretch, walk, or dance gently. Just 5 minutes to wake your body up.", duration: "5 min", category: "body" },
    { id: "groom", icon: "✨", title: "Self Care Ritual", desc: "Brush, wash your face, skin care. Do it slowly — you are worth the care.", duration: "10 min", category: "selfcare" },
    { id: "eat", icon: "🥣", title: "Nourish Yourself", desc: "Eat something real. Sit down if you can. Bless your food.", duration: "15 min", category: "body" },
    { id: "intention", icon: "📝", title: "Set Your Intention", desc: "Ask: What is the ONE thing God wants me to focus on today?", duration: "3 min", category: "mind" },
  ],
  afternoon: [
    { id: "check", icon: "🧭", title: "Midday Check-In", desc: "Pause. Breathe. Ask: How am I doing? Am I in peace or striving?", duration: "2 min", category: "spiritual" },
    { id: "midpray", icon: "🙏", title: "Quick Prayer", desc: "'Lord, guide the rest of my day. Keep me in Your peace.'", duration: "2 min", category: "spiritual" },
    { id: "water", icon: "💧", title: "Hydrate Again", desc: "Drink water. Have you eaten? Your body needs fuel to do God's work.", duration: "5 min", category: "body" },
    { id: "rest", icon: "😮‍💨", title: "Rest Your Eyes", desc: "Look away from screens for 5 minutes. Step outside if you can.", duration: "5 min", category: "body" },
    { id: "gratitude", icon: "💛", title: "Gratitude Pause", desc: "Name 3 things you're thankful for right now, big or small.", duration: "2 min", category: "mind" },
    { id: "skill", icon: "🌱", title: "Skill Time", desc: "Practice a gift God gave you. 15–20 minutes of joyful growth.", duration: "20 min", category: "growth" },
    { id: "connect", icon: "💬", title: "Connect", desc: "Reach out to one person — a text, a call, a kind word. Relationship is ministry.", duration: "5 min", category: "social" },
  ],
  evening: [
    { id: "unwind", icon: "🕯️", title: "Transition Ritual", desc: "Light a candle or dim the lights. Signal to your body: work time is done.", duration: "1 min", category: "selfcare" },
    { id: "evepray", icon: "🙏", title: "Evening Prayer", desc: "Thank God for today. Hand Him anything that felt hard or unfinished.", duration: "5 min", category: "spiritual" },
    { id: "reflect", icon: "📖", title: "Reflect on the Day", desc: "Where did you see God today? What would you do differently? No shame — just growth.", duration: "5 min", category: "mind" },
    { id: "meal", icon: "🍽️", title: "Nourishing Meal", desc: "Eat a proper meal. Sit. Rest. Bless it. You deserve to eat well.", duration: "30 min", category: "body" },
    { id: "bath", icon: "🛁", title: "Cleanse & Refresh", desc: "Shower or bath. Use it as a reset. You are being renewed, inside and out.", duration: "15 min", category: "selfcare" },
    { id: "stretch", icon: "🧘", title: "Gentle Stretch", desc: "Stretch or do light yoga. Release what your body held today.", duration: "10 min", category: "body" },
    { id: "joy", icon: "🎨", title: "Something Joyful", desc: "Do one thing purely for joy — music, drawing, cooking, something uplifting.", duration: "30 min", category: "joy" },
  ],
  night: [
    { id: "screen", icon: "📵", title: "Screen Wind-Down", desc: "Put screens away or on night mode. Give your mind space to quiet.", duration: "30 min before bed", category: "body" },
    { id: "skincare", icon: "🌸", title: "Night Self Care", desc: "Do your night skin care slowly. This is love for your body. You are worth it.", duration: "10 min", category: "selfcare" },
    { id: "nightword", icon: "📖", title: "One Verse", desc: "Read one verse or psalm. Let it be the last thing your mind holds.", duration: "5 min", category: "spiritual" },
    { id: "nightpray", icon: "🙏", title: "Night Prayer", desc: "Talk to God in the dark. Thank Him. Give Him your worries. Ask for rest.", duration: "5 min", category: "spiritual" },
    { id: "breathe", icon: "🌙", title: "Breathing to Rest", desc: "Breathe in 4 counts, hold 4, out 6. Repeat until peace settles.", duration: "5 min", category: "body" },
    { id: "grateful", icon: "💛", title: "Last Thought of Gratitude", desc: "Name the best thing about today. Fall asleep with that thought.", duration: "1 min", category: "mind" },
  ],
};

const GIFTS_AND_SKILLS = [
  { category: "🎵 Music & Worship", items: ["Learn guitar", "Sing worship songs", "Play piano basics", "Write a worship song", "Learn music theory", "Explore your vocal range"] },
  { category: "✍️ Writing & Words", items: ["Prayer journaling", "Start a devotional blog", "Write poetry or psalms", "Practice storytelling", "Write your testimony", "Scripture memory cards"] },
  { category: "🎨 Art & Creativity", items: ["Watercolor painting", "Sketch Bible scenes", "Hand lettering Scripture", "Digital art basics", "Vision boards", "Photography"] },
  { category: "👐 Helping & Ministry", items: ["Active listening", "Gentle counselling", "Conflict resolution", "Hospitality", "Encouragement notes", "Pastoral care basics"] },
  { category: "📚 Teaching & Wisdom", items: ["Deep Bible study", "Hermeneutics basics", "Explain Scripture simply", "Christian theology", "Read a Christian classic", "How to mentor"] },
  { category: "💻 Digital & Business", items: ["Graphic design basics", "Faith-based social page", "Video editing basics", "Build a simple website", "Content creation", "Email writing"] },
  { category: "🏠 Home & Practical", items: ["Cook nourishing meals", "Decluttering", "Sewing basics", "Home organization", "Budgeting", "Gardening basics"] },
  { category: "💪 Body & Movement", items: ["Morning yoga flow", "Dance to worship music", "Simple workout routine", "Walking meditation", "Stretching sequences", "Breathing exercises"] },
  { category: "🧠 Mind & Study", items: ["Learn a new language", "Biblical history", "Memorize Scripture", "Speed reading", "Apologetics", "Learn something new online"] },
  { category: "🌿 Healing & Care", items: ["Basic nutrition", "Herbal remedies", "Prayer for healing", "Emotional first aid", "Trauma-informed care", "Gentle massage techniques"] },
];

const INTRO_LINES = [
  "You were not an accident.",
  "You were crafted.",
  "Intentionally.",
  "Lovingly.",
  "With gifts the world needs.",
  "And on the days you feel tangled,",
  "or lost,",
  "or unsure of your next step —",
  "this is your companion.",
  "Welcome home, beloved.",
  "You were Created for Grace. 🕊️",
];

function getTimeOfDay() {
  const h = new Date().getHours();
  if (h >= 5 && h < 12) return "morning";
  if (h >= 12 && h < 17) return "afternoon";
  if (h >= 17 && h < 21) return "evening";
  return "night";
}

// ─── TYPEWRITER ───────────────────────────────────────────────────────────────
function useTypewriter(text, speed = 38, active = true) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (!active) return;
    setDisplayed("");
    setDone(false);
    let i = 0;
    const iv = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) { clearInterval(iv); setDone(true); }
    }, speed);
    return () => clearInterval(iv);
  }, [text, active]);
  return { displayed, done };
}

// ─── INTRO SCREEN ─────────────────────────────────────────────────────────────
function IntroScreen({ onDone }) {
  const [lineIdx, setLineIdx] = useState(0);
  const [shownLines, setShownLines] = useState([]);
  const [currentText, setCurrentText] = useState("");
  const [typing, setTyping] = useState(true);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (lineIdx >= INTRO_LINES.length) {
      setTimeout(() => setFinished(true), 600);
      return;
    }
    const line = INTRO_LINES[lineIdx];
    setCurrentText("");
    setTyping(true);
    let i = 0;
    const iv = setInterval(() => {
      i++;
      setCurrentText(line.slice(0, i));
      if (i >= line.length) {
        clearInterval(iv);
        setTyping(false);
        setTimeout(() => {
          setShownLines(prev => [...prev, line]);
          setCurrentText("");
          setLineIdx(idx => idx + 1);
        }, lineIdx < 3 ? 300 : 500);
      }
    }, lineIdx < 4 ? 55 : 42);
    return () => clearInterval(iv);
  }, [lineIdx]);

  return (
    <div style={{ minHeight: "100vh", background: "#06060f", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 28px", position: "relative", overflow: "hidden" }}>
      {/* bg particles */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        {[...Array(18)].map((_, i) => (
          <div key={i} style={{ position: "absolute", width: i % 3 === 0 ? 3 : 2, height: i % 3 === 0 ? 3 : 2, borderRadius: "50%", background: `rgba(200,168,100,${0.15 + (i % 4) * 0.08})`, left: `${(i * 23 + 7) % 100}%`, top: `${(i * 17 + 11) % 100}%`, animation: `twinkle ${2 + (i % 3)}s ease-in-out ${(i * 0.3) % 2}s infinite` }} />
        ))}
      </div>

      <div style={{ maxWidth: 340, width: "100%", textAlign: "center" }}>
        <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 13, color: "rgba(200,168,100,0.5)", letterSpacing: 5, textTransform: "uppercase", marginBottom: 40 }}>Created for Grace</div>

        <div style={{ minHeight: 280, display: "flex", flexDirection: "column", justifyContent: "center", gap: 0 }}>
          {shownLines.map((line, i) => (
            <div key={i} style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: i < 4 ? 28 : 18, color: i < 4 ? `rgba(248,240,220,${0.3 + i * 0.15})` : "rgba(200,168,100,0.7)", lineHeight: 1.5, marginBottom: i < 4 ? 2 : 6, fontStyle: i > 4 ? "italic" : "normal", animation: "fadeUp 0.5s ease forwards" }}>
              {line}
            </div>
          ))}
          {currentText && (
            <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: lineIdx < 4 ? 28 : 18, color: lineIdx < 4 ? "rgba(248,240,220,0.9)" : "rgba(200,168,100,0.9)", lineHeight: 1.5, marginBottom: lineIdx < 4 ? 2 : 6, fontStyle: lineIdx > 4 ? "italic" : "normal" }}>
              {currentText}<span style={{ opacity: 0.6, animation: "blink 0.8s step-end infinite" }}>|</span>
            </div>
          )}
        </div>

        {finished && (
          <div style={{ animation: "fadeUp 0.8s ease forwards", marginTop: 40 }}>
            <button onClick={onDone} style={{ background: "linear-gradient(135deg, #c9a84c, #8a6020)", border: "none", borderRadius: 40, padding: "16px 44px", color: "#000", fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 17, cursor: "pointer", letterSpacing: 1 }}>
              Begin Your Journey →
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes twinkle { 0%,100%{opacity:.3;transform:scale(1)} 50%{opacity:1;transform:scale(1.4)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
      `}</style>
    </div>
  );
}

// ─── THEME PICKER ─────────────────────────────────────────────────────────────
function ThemePicker({ onPick }) {
  const [selected, setSelected] = useState(null);
  const [hovering, setHovering] = useState(null);

  return (
    <div style={{ minHeight: "100vh", background: "#06060f", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>
      <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 13, color: "rgba(200,168,100,0.5)", letterSpacing: 5, textTransform: "uppercase", marginBottom: 16, animation: "fadeUp 0.6s ease" }}>Your aesthetic</div>
      <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 26, color: "#f5f0e0", textAlign: "center", marginBottom: 8, animation: "fadeUp 0.7s ease" }}>How does your soul feel?</div>
      <div style={{ color: "rgba(200,168,100,0.5)", fontSize: 13, fontStyle: "italic", marginBottom: 36, animation: "fadeUp 0.8s ease" }}>Choose what draws you in. You can change this anytime.</div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%", maxWidth: 360, animation: "fadeUp 0.9s ease" }}>
        {Object.values(THEMES).map((theme, i) => {
          const isSelected = selected === theme.id;
          const isHover = hovering === theme.id;
          return (
            <button key={theme.id} onMouseEnter={() => setHovering(theme.id)} onMouseLeave={() => setHovering(null)} onClick={() => setSelected(theme.id)}
              style={{ background: isSelected || isHover ? theme.card : "rgba(255,255,255,0.03)", border: `1px solid ${isSelected ? theme.primary : isHover ? theme.primaryDim : "rgba(255,255,255,0.08)"}`, borderRadius: 20, padding: "18px 22px", cursor: "pointer", display: "flex", alignItems: "center", gap: 16, transition: "all 0.3s ease", transform: isSelected ? "scale(1.02)" : "scale(1)" }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: theme.bgGrad, border: `2px solid ${theme.primary}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{theme.emoji}</div>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontFamily: theme.font, fontSize: 17, color: isSelected ? theme.primaryLight : "#e0d8c8", marginBottom: 2 }}>{theme.name}</div>
                <div style={{ fontSize: 12, color: isSelected ? theme.primary : "rgba(200,168,100,0.4)", fontStyle: "italic" }}>{theme.tagline}</div>
              </div>
              {isSelected && <div style={{ marginLeft: "auto", color: theme.primary, fontSize: 20 }}>✓</div>}
            </button>
          );
        })}
      </div>

      {selected && (
        <button onClick={() => onPick(selected)} style={{ marginTop: 28, background: `linear-gradient(135deg, ${THEMES[selected].primary}, ${THEMES[selected].primaryDim})`, border: "none", borderRadius: 40, padding: "16px 44px", color: THEMES[selected].id === "pure" ? "#fff" : "#000", fontFamily: THEMES[selected].font, fontSize: 17, cursor: "pointer", animation: "fadeUp 0.4s ease", letterSpacing: 0.5 }}>
          This is me → 
        </button>
      )}
      <style>{`@keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }`}</style>
    </div>
  );
}

// ─── TANGLED MODE ─────────────────────────────────────────────────────────────
function TangledMode({ theme, onBack }) {
  const [messages, setMessages] = useState([{ role: "assistant", text: "What's weighing on your heart right now? Just say it — all of it. Nothing is too small or too big." }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    const newMessages = [...messages, { role: "user", text: userMsg }];
    setMessages(newMessages);
    setLoading(true);
    try {
      const history = newMessages.map(m => ({ role: m.role === "assistant" ? "assistant" : "user", content: m.text }));
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: `You are a warm, Spirit-filled Christian life companion inside an app called "Created for Grace". Your purpose is to help someone who feels overwhelmed and tangled — emotionally, mentally, spiritually.

Your approach:
- Speak with grace, warmth, and faith. Never clinical or harsh.
- Listen first. Reflect back what you hear with deep compassion.
- Gently untangle what they share — identify the core threads (spiritual, emotional, practical).
- Break things into the SMALLEST possible next step — so small it feels easy and light, never heavy.
- Ground encouragement in faith and Scripture naturally, not forcefully.
- End EVERY response with ONE single gentle next step they can take RIGHT NOW.
- Never give a list. One thing only. Always one.
- If they spiral, bring them back: "Let's just breathe. Right now, just this one thing..."
- Remind them of their worth, their gifts, God's presence with them.
- Keep responses warm, conversational, concise. Not preachy.
- Use phrases like "beloved", "sweet one", "friend" naturally.`,
          messages: history,
        }),
      });
      const data = await res.json();
      const reply = data.content?.find(c => c.type === "text")?.text || "I'm here with you. Take a breath. You are not alone. 🕊️";
      setMessages(m => [...m, { role: "assistant", text: reply }]);
    } catch {
      setMessages(m => [...m, { role: "assistant", text: "I'm right here with you. Take one slow breath. God sees you in this moment. What feels most heavy right now?" }]);
    }
    setLoading(false);
  };

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", background: theme.bg, backgroundImage: theme.bgGrad }}>
      <div style={{ padding: "16px 20px", borderBottom: `1px solid ${theme.cardBorder}`, display: "flex", alignItems: "center", gap: 12, backdropFilter: "blur(10px)" }}>
        <button onClick={onBack} style={{ background: "none", border: "none", color: theme.accent, cursor: "pointer", fontSize: 22 }}>←</button>
        <div>
          <div style={{ color: theme.primaryLight, fontFamily: theme.font, fontSize: 17 }}>I'm Feeling Tangled</div>
          <div style={{ color: theme.textDim, fontSize: 11 }}>Let's untangle together 🕊️</div>
        </div>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "20px 16px", display: "flex", flexDirection: "column", gap: 16 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", animation: "fadeUp 0.4s ease" }}>
            <div style={{ maxWidth: "82%", background: m.role === "user" ? `linear-gradient(135deg, ${theme.primary}40, ${theme.primaryDim}40)` : theme.card, border: m.role === "assistant" ? `1px solid ${theme.cardBorder}` : `1px solid ${theme.primary}30`, borderRadius: m.role === "user" ? "20px 20px 4px 20px" : "20px 20px 20px 4px", padding: "14px 18px", color: theme.text, fontSize: 14, lineHeight: 1.8, fontFamily: m.role === "assistant" ? theme.font : "inherit" }}>
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex", gap: 6, padding: "8px 16px" }}>
            {[0,1,2].map(i => <div key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: theme.primary, animation: `pulse 1.2s ease-in-out ${i*0.2}s infinite` }} />)}
          </div>
        )}
        <div ref={bottomRef} />
      </div>
      <div style={{ padding: "12px 16px", borderTop: `1px solid ${theme.cardBorder}`, display: "flex", gap: 10 }}>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder="Just say what's on your heart..." style={{ flex: 1, background: theme.card, border: `1px solid ${theme.cardBorder}`, borderRadius: 28, padding: "13px 18px", color: theme.text, fontSize: 14, outline: "none", fontFamily: "inherit" }} />
        <button onClick={send} disabled={loading || !input.trim()} style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.primaryDim})`, border: "none", borderRadius: "50%", width: 46, height: 46, cursor: "pointer", fontSize: 18, opacity: loading || !input.trim() ? 0.4 : 1, flexShrink: 0 }}>→</button>
      </div>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse { 0%,100%{opacity:.3;transform:scale(1)} 50%{opacity:1;transform:scale(1.3)} }
      `}</style>
    </div>
  );
}

// ─── SKILLS MODE ──────────────────────────────────────────────────────────────
function SkillsMode({ theme, onBack }) {
  const [feeling, setFeeling] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [browsing, setBrowsing] = useState(false);

  const getActivity = async () => {
    if (!feeling.trim() || loading) return;
    setLoading(true); setResult(null);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: `You are a Christian life companion helping someone discover God-given gifts through joyful, light activities. Given how they feel, suggest ONE specific fun activity that: matches their energy, feels like play not work, develops a real skill, is framed as stewarding a God-given gift, takes 15-30 min, feels light and joyful. Respond ONLY in JSON (no markdown):
{"title":"","emoji":"","description":"2-3 inviting sentences","skill":"","scripture":"short verse","duration":"","tip":"one gentle enjoyment tip"}`,
          messages: [{ role: "user", content: `How I feel: ${feeling}` }],
        }),
      });
      const data = await res.json();
      const text = data.content?.find(c => c.type === "text")?.text || "";
      setResult(JSON.parse(text.replace(/```json|```/g, "").trim()));
    } catch {
      setResult({ title: "Free Worship Time", emoji: "🎵", description: "Put on your favorite worship song and just be. Sing, dance, sit — whatever feels right. Let God meet you in this moment.", skill: "Worship & spiritual sensitivity", scripture: "Sing to the Lord a new song. — Psalm 96:1", duration: "15–20 min", tip: "Don't perform — just be yourself before God." });
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: theme.bg, backgroundImage: theme.bgGrad, paddingBottom: 40 }}>
      <div style={{ padding: "16px 20px", borderBottom: `1px solid ${theme.cardBorder}`, display: "flex", alignItems: "center", gap: 12 }}>
        <button onClick={onBack} style={{ background: "none", border: "none", color: theme.accent, cursor: "pointer", fontSize: 22 }}>←</button>
        <div>
          <div style={{ color: theme.primaryLight, fontFamily: theme.font, fontSize: 17 }}>Grow Your Gifts</div>
          <div style={{ color: theme.textDim, fontSize: 11 }}>Fun activities that build your God-given potential</div>
        </div>
      </div>
      <div style={{ padding: "24px 20px" }}>
        <div style={{ color: theme.text, fontFamily: theme.font, fontSize: 20, marginBottom: 6 }}>How are you feeling right now?</div>
        <div style={{ color: theme.textDim, fontSize: 13, marginBottom: 18, lineHeight: 1.6 }}>Tell me your energy, mood, anything — and I'll find the perfect activity for this moment.</div>
        <textarea value={feeling} onChange={e => setFeeling(e.target.value)} placeholder="e.g. I feel calm and creative... or I have energy but don't know what to do..." style={{ width: "100%", background: theme.card, border: `1px solid ${theme.cardBorder}`, borderRadius: 16, padding: "14px 16px", color: theme.text, fontSize: 14, outline: "none", minHeight: 90, resize: "none", lineHeight: 1.6, boxSizing: "border-box", fontFamily: "inherit" }} />
        <button onClick={getActivity} disabled={loading || !feeling.trim()} style={{ width: "100%", marginTop: 12, background: `linear-gradient(135deg, ${theme.primary}, ${theme.primaryDim})`, border: "none", borderRadius: 30, padding: "15px", color: theme.id === "pure" ? "#fff" : "#000", fontFamily: theme.font, fontSize: 16, cursor: "pointer", opacity: loading || !feeling.trim() ? 0.5 : 1 }}>
          {loading ? "Finding your activity..." : "Find My Activity ✨"}
        </button>

        {result && (
          <div style={{ marginTop: 24, background: theme.card, border: `1px solid ${theme.cardBorder}`, borderRadius: 24, padding: 24, animation: "fadeUp 0.5s ease" }}>
            <div style={{ fontSize: 44, textAlign: "center", marginBottom: 12 }}>{result.emoji}</div>
            <div style={{ color: theme.primaryLight, fontFamily: theme.font, fontSize: 22, textAlign: "center", marginBottom: 6 }}>{result.title}</div>
            <div style={{ color: theme.textDim, fontSize: 11, textAlign: "center", marginBottom: 16 }}>{result.skill} · {result.duration}</div>
            <div style={{ color: theme.text, fontSize: 14, lineHeight: 1.8, marginBottom: 16 }}>{result.description}</div>
            <div style={{ background: theme.surface, border: `1px solid ${theme.accent}30`, borderRadius: 14, padding: "12px 16px", marginBottom: 12 }}>
              <div style={{ color: theme.accent, fontSize: 10, letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>📖 Scripture</div>
              <div style={{ color: theme.accent, fontStyle: "italic", fontSize: 13, lineHeight: 1.6 }}>{result.scripture}</div>
            </div>
            <div style={{ background: theme.surface, borderRadius: 14, padding: "12px 16px", marginBottom: 16 }}>
              <div style={{ color: theme.primaryLight, fontSize: 10, letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>💡 Tip</div>
              <div style={{ color: theme.text, fontSize: 13, lineHeight: 1.6 }}>{result.tip}</div>
            </div>
            <button onClick={() => { setResult(null); setFeeling(""); }} style={{ width: "100%", background: "none", border: `1px solid ${theme.cardBorder}`, borderRadius: 30, padding: "12px", color: theme.textDim, fontSize: 13, cursor: "pointer" }}>Try a different activity</button>
          </div>
        )}

        <div style={{ marginTop: 28 }}>
          <button onClick={() => setBrowsing(!browsing)} style={{ background: "none", border: `1px solid ${theme.cardBorder}`, borderRadius: 14, padding: "12px 16px", color: theme.textDim, fontSize: 13, cursor: "pointer", width: "100%", textAlign: "left" }}>
            {browsing ? "▲" : "▼"} Browse all gift categories
          </button>
          {browsing && (
            <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 10 }}>
              {GIFTS_AND_SKILLS.map((cat, i) => (
                <div key={i} style={{ background: theme.card, border: `1px solid ${theme.cardBorder}`, borderRadius: 16, padding: 16 }}>
                  <div style={{ color: theme.text, fontFamily: theme.font, fontSize: 14, marginBottom: 10 }}>{cat.category}</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {cat.items.map((item, j) => (
                      <button key={j} onClick={() => { setFeeling(`I want to try: ${item}`); setBrowsing(false); window.scrollTo(0,0); }} style={{ background: theme.surface, border: `1px solid ${theme.primary}30`, borderRadius: 20, padding: "6px 14px", color: theme.primaryLight, fontSize: 12, cursor: "pointer" }}>
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <style>{`@keyframes fadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }`}</style>
    </div>
  );
}

// ─── ROUTINE MODE ─────────────────────────────────────────────────────────────
function RoutineMode({ theme, timeId, onBack }) {
  const time = TIMES.find(t => t.id === timeId);
  const steps = ROUTINES[timeId] || [];
  const [currentIdx, setCurrentIdx] = useState(0);
  const [done, setDone] = useState([]);
  const [skipped, setSkipped] = useState([]);
  const current = steps[currentIdx];
  const isComplete = currentIdx >= steps.length;

  const catColors = {
    spiritual: theme.primary,
    body: "#6abf80",
    selfcare: "#e8789a",
    mind: "#78a8e8",
    growth: "#e8a84c",
    social: "#e87878",
    joy: "#a8e878",
  };

  return (
    <div style={{ minHeight: "100vh", background: theme.bg, backgroundImage: theme.bgGrad }}>
      <div style={{ padding: "16px 20px", borderBottom: `1px solid ${theme.cardBorder}`, display: "flex", alignItems: "center", gap: 12 }}>
        <button onClick={onBack} style={{ background: "none", border: "none", color: theme.accent, cursor: "pointer", fontSize: 22 }}>←</button>
        <div>
          <div style={{ color: theme.primaryLight, fontFamily: theme.font, fontSize: 17 }}>{time.icon} {time.label} Rhythm</div>
          <div style={{ color: theme.textDim, fontSize: 11 }}>{done.length} of {steps.length} complete</div>
        </div>
      </div>
      <div style={{ padding: "20px" }}>
        <div style={{ display: "flex", gap: 4, marginBottom: 24 }}>
          {steps.map((s, i) => <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: done.includes(s.id) ? theme.primary : skipped.includes(s.id) ? theme.cardBorder : i === currentIdx ? theme.primary + "50" : theme.cardBorder, transition: "background 0.3s" }} />)}
        </div>

        {!isComplete ? (
          <>
            <div style={{ color: theme.textDim, fontSize: 11, marginBottom: 6, letterSpacing: 3, textTransform: "uppercase" }}>Step {currentIdx + 1} of {steps.length}</div>
            <div style={{ background: theme.card, border: `1px solid ${theme.cardBorder}`, borderRadius: 28, padding: 28, marginBottom: 20, animation: "fadeUp 0.4s ease" }}>
              <div style={{ fontSize: 50, marginBottom: 16, textAlign: "center" }}>{current.icon}</div>
              <div style={{ color: theme.primaryLight, fontFamily: theme.font, fontSize: 24, marginBottom: 10, textAlign: "center" }}>{current.title}</div>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
                <span style={{ background: theme.surface, color: catColors[current.category] || theme.primary, fontSize: 10, padding: "4px 12px", borderRadius: 20, letterSpacing: 1, textTransform: "uppercase" }}>{current.category}</span>
              </div>
              <div style={{ color: theme.text, fontSize: 15, lineHeight: 1.9, textAlign: "center", marginBottom: 14, fontFamily: theme.font }}>{current.desc}</div>
              <div style={{ color: theme.textDim, fontSize: 12, textAlign: "center" }}>⏱ {current.duration}</div>
            </div>
            <button onClick={() => { setDone(d => [...d, current.id]); setCurrentIdx(i => i + 1); }} style={{ width: "100%", background: `linear-gradient(135deg, ${theme.primary}, ${theme.primaryDim})`, border: "none", borderRadius: 30, padding: "16px", color: theme.id === "pure" ? "#fff" : "#000", fontFamily: theme.font, fontSize: 17, cursor: "pointer", marginBottom: 12 }}>
              Done ✓
            </button>
            <button onClick={() => { setSkipped(s => [...s, current.id]); setCurrentIdx(i => i + 1); }} style={{ width: "100%", background: "none", border: `1px solid ${theme.cardBorder}`, borderRadius: 30, padding: "14px", color: theme.textDim, fontSize: 14, cursor: "pointer" }}>
              Skip for now
            </button>
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "40px 20px", animation: "fadeUp 0.6s ease" }}>
            <div style={{ fontSize: 60, marginBottom: 20 }}>🙏</div>
            <div style={{ color: theme.primaryLight, fontFamily: theme.font, fontSize: 26, marginBottom: 12 }}>Well done, beloved.</div>
            <div style={{ color: theme.text, fontSize: 15, lineHeight: 1.8, marginBottom: 16 }}>You completed {done.length} step{done.length !== 1 ? "s" : ""} of your {time.label.toLowerCase()} rhythm.</div>
            <div style={{ color: theme.accent, fontStyle: "italic", fontSize: 13, lineHeight: 1.7, marginBottom: 32, padding: "0 16px" }}>{time.verse}</div>
            <button onClick={onBack} style={{ background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentDim})`, border: "none", borderRadius: 30, padding: "14px 36px", color: "#000", fontFamily: theme.font, fontSize: 16, cursor: "pointer" }}>Return Home</button>
          </div>
        )}
      </div>
      <style>{`@keyframes fadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }`}</style>
    </div>
  );
}

// ─── HOME ─────────────────────────────────────────────────────────────────────
function Home({ theme, onChangeTheme, setScreen, setActiveTime }) {
  const currentTime = getTimeOfDay();
  const timeObj = TIMES.find(t => t.id === currentTime);

  return (
    <div style={{ minHeight: "100vh", background: theme.bg, backgroundImage: theme.bgGrad, paddingBottom: 48 }}>
      {/* Header */}
      <div style={{ padding: "36px 24px 28px", textAlign: "center", borderBottom: `1px solid ${theme.cardBorder}` }}>
        <div style={{ color: theme.accent, fontFamily: theme.font, fontSize: 11, letterSpacing: 5, textTransform: "uppercase", marginBottom: 6, opacity: 0.7 }}>Faith · Growth · Purpose</div>
        <div style={{ color: theme.primaryLight, fontFamily: theme.font, fontSize: 30, marginBottom: 4, letterSpacing: 0.5 }}>Created for Grace</div>
        <div style={{ color: theme.textDim, fontSize: 13, fontStyle: "italic", marginBottom: 20 }}>Your faith-rooted life companion</div>

        {/* Time greeting */}
        <div style={{ background: theme.card, border: `1px solid ${theme.cardBorder}`, borderRadius: 20, padding: "16px 20px", maxWidth: 360, margin: "0 auto" }}>
          <div style={{ color: theme.primaryLight, fontFamily: theme.font, fontSize: 15, marginBottom: 6 }}>{timeObj.icon} {timeObj.greeting}</div>
          <div style={{ color: theme.accent, fontStyle: "italic", fontSize: 12, lineHeight: 1.7, opacity: 0.8 }}>{timeObj.verse}</div>
        </div>

        <button onClick={onChangeTheme} style={{ marginTop: 16, background: "none", border: `1px solid ${theme.cardBorder}`, borderRadius: 20, padding: "8px 18px", color: theme.textDim, fontSize: 11, cursor: "pointer", letterSpacing: 1 }}>
          {theme.emoji} Change my aesthetic
        </button>
      </div>

      <div style={{ padding: "24px 20px" }}>
        {/* Main actions */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ color: theme.textDim, fontSize: 10, letterSpacing: 4, textTransform: "uppercase", marginBottom: 14 }}>Right Now</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <button onClick={() => setScreen("tangled")} style={{ background: theme.card, border: `1px solid ${theme.primary}30`, borderRadius: 22, padding: "20px 22px", textAlign: "left", cursor: "pointer", display: "flex", alignItems: "center", gap: 16, transition: "transform 0.2s" }}>
              <div style={{ fontSize: 34, flexShrink: 0 }}>🕊️</div>
              <div>
                <div style={{ color: theme.primaryLight, fontFamily: theme.font, fontSize: 18, marginBottom: 4 }}>I'm Feeling Tangled</div>
                <div style={{ color: theme.textDim, fontSize: 12, lineHeight: 1.5 }}>Let's untangle together. One gentle step at a time.</div>
              </div>
            </button>
            <button onClick={() => setScreen("skills")} style={{ background: theme.card, border: `1px solid ${theme.accent}20`, borderRadius: 22, padding: "20px 22px", textAlign: "left", cursor: "pointer", display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ fontSize: 34, flexShrink: 0 }}>🌱</div>
              <div>
                <div style={{ color: theme.accent, fontFamily: theme.font, fontSize: 18, marginBottom: 4 }}>Grow My Gifts</div>
                <div style={{ color: theme.textDim, fontSize: 12, lineHeight: 1.5 }}>Fun activities that build your God-given potential.</div>
              </div>
            </button>
          </div>
        </div>

        {/* Rhythms */}
        <div>
          <div style={{ color: theme.textDim, fontSize: 10, letterSpacing: 4, textTransform: "uppercase", marginBottom: 14 }}>My Daily Rhythms</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {TIMES.map(t => (
              <button key={t.id} onClick={() => { setActiveTime(t.id); setScreen("routine"); }} style={{ background: theme.card, border: `1px solid ${t.id === currentTime ? theme.primary + "60" : theme.cardBorder}`, borderRadius: 20, padding: "20px 14px", textAlign: "center", cursor: "pointer", position: "relative", transition: "transform 0.2s" }}>
                {t.id === currentTime && <div style={{ position: "absolute", top: 10, right: 10, width: 6, height: 6, borderRadius: "50%", background: theme.primary, boxShadow: `0 0 6px ${theme.primary}` }} />}
                <div style={{ fontSize: 28, marginBottom: 8 }}>{t.icon}</div>
                <div style={{ color: t.id === currentTime ? theme.primaryLight : theme.text, fontFamily: theme.font, fontSize: 14, marginBottom: 4 }}>{t.label}</div>
                <div style={{ color: theme.textDim, fontSize: 11 }}>{ROUTINES[t.id].length} steps</div>
              </button>
            ))}
          </div>
        </div>

        {/* Scripture anchor */}
        <div style={{ marginTop: 28, background: theme.surface, border: `1px solid ${theme.accent}30`, borderRadius: 20, padding: "20px 22px", textAlign: "center" }}>
          <div style={{ color: theme.accent, fontSize: 10, letterSpacing: 3, textTransform: "uppercase", marginBottom: 10, opacity: 0.7 }}>Today's Anchor</div>
          <div style={{ color: theme.accent, fontFamily: theme.font, fontStyle: "italic", fontSize: 15, lineHeight: 1.8 }}>
            "For I know the plans I have for you," declares the Lord, "plans to prosper you and not to harm you, plans to give you hope and a future."
          </div>
          <div style={{ color: theme.accentDim, fontSize: 12, marginTop: 10 }}>— Jeremiah 29:11</div>
        </div>
      </div>
    </div>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [stage, setStage] = useState("intro"); // intro | theme | app
  const [themeId, setThemeId] = useState("midnight");
  const [screen, setScreen] = useState("home");
  const [activeTime, setActiveTime] = useState(null);

  const theme = THEMES[themeId];

  if (stage === "intro") return <IntroScreen onDone={() => setStage("theme")} />;
  if (stage === "theme") return <ThemePicker onPick={id => { setThemeId(id); setStage("app"); }} />;

  if (screen === "tangled") return <TangledMode theme={theme} onBack={() => setScreen("home")} />;
  if (screen === "skills") return <SkillsMode theme={theme} onBack={() => setScreen("home")} />;
  if (screen === "routine" && activeTime) return <RoutineMode theme={theme} timeId={activeTime} onBack={() => { setScreen("home"); setActiveTime(null); }} />;

  return (
    <Home
      theme={theme}
      onChangeTheme={() => setStage("theme")}
      setScreen={setScreen}
      setActiveTime={setActiveTime}
    />
  );
}
