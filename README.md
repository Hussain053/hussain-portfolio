# Hussain Patanwala — Portfolio Website

> A premium, futuristic personal portfolio built with pure HTML, CSS & JavaScript.  
> **Live at:** [hussain053.github.io/portfolio](https://hussain053.github.io/portfolio)

---

## ✨ Features

- 🌑 Dark / ☀️ Light mode toggle (preference saved in localStorage)
- 🎨 Glassmorphism + Neon glow UI
- 🌊 Animated particle field hero canvas
- 🖱️ Custom glow cursor with ring-follow effect
- ⚡ Scroll-triggered animations with stagger delays
- 📊 Animated skill bars (fire on scroll into view)
- 🔍 Project filter system (All / Web Apps / React / Systems)
- 📱 Fully responsive — mobile-first
- ♿ Accessible markup (ARIA labels, roles, semantic HTML)
- 🚀 Zero dependencies — no frameworks, no build step needed

---

## 📁 Folder Structure

```
hussain-portfolio/
│
├── index.html          ← Main HTML (all sections)
│
├── css/
│   ├── tokens.css      ← Design variables & theme tokens
│   ├── base.css        ← Reset, body, cursor, loader, keyframes
│   ├── nav.css         ← Navigation bar styles
│   ├── sections.css    ← Section layouts (hero, about, projects…)
│   ├── components.css  ← Reusable cards, buttons, badges, forms
│   └── responsive.css  ← All breakpoints & mobile overrides
│
└── js/
    └── main.js         ← All interactions (7 clean modules)
```

---

## 🚀 Deploying to GitHub Pages

### Step 1 — Create a GitHub repository

1. Go to [github.com/new](https://github.com/new)
2. Name it: `portfolio` (or `hussain053.github.io` for root domain)
3. Set to **Public**
4. Click **Create repository**

### Step 2 — Push your code

```bash
# Inside the project folder
git init
git add .
git commit -m "🚀 Initial portfolio launch"
git branch -M main
git remote add origin https://github.com/hussain053/portfolio.git
git push -u origin main
```

### Step 3 — Enable GitHub Pages

1. Go to your repo on GitHub
2. Click **Settings** → **Pages** (left sidebar)
3. Under **Source**, select: `Deploy from a branch`
4. Branch: `main`, Folder: `/ (root)`
5. Click **Save**

✅ Your site will be live at:  
`https://hussain053.github.io/portfolio/` in ~60 seconds.

---

### Optional: Deploy to Vercel (faster CDN)

```bash
npm i -g vercel
vercel
```
Follow the prompts — zero config needed for a static site.

---

## 🛠 Customisation Guide

| What to change | Where |
|---|---|
| Colors / theme variables | `css/tokens.css` |
| Skills, percentages | `index.html` → Skills section |
| Projects, links | `index.html` → Projects section |
| Work experience | `index.html` → Experience section |
| Contact details | `index.html` → Contact section |
| Animation timings | `css/base.css` (keyframes) |
| Particle count / speed | `js/main.js` → initHeroCanvas() |

---

## 📬 Contact

**Hussain Patanwala**  
📧 hussainpatanwala6@gmail.com  
📞 +91 7822089785  
🔗 [LinkedIn](https://www.linkedin.com/in/hussain-patanwala-9881b6328/)  
⬡  [GitHub](https://github.com/hussain053)

---

*Built with HTML · CSS · JS · Passion — Pune, India 2025*
