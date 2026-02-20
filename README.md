# CompCommand

Agent command center for Complyze's OpenClaw multi-team pipeline.

**Single HTML file. No build step. Open directly or deploy to Vercel.**

---

## Teams

### 🔵 Outreach Team
| Agent | Role |
|-------|------|
| 🔍 Scout | Finds leads via Apollo.io free API |
| 🔎 Enricher | Enriches leads with context via Exa.ai |
| ✍️ Drafter | Writes personalized emails via Claude Haiku |
| 📊 SheetsBot | Populates Google Sheet for review |

### 🟣 Dev Team — Complyze
| Agent | Role |
|-------|------|
| 🧪 QA Agent | Tests browser→desktop config flow |
| 🔧 Coder Agent | Fixes bugs and builds features |
| 🚀 Deployer | Builds, signs, deploys releases |
| 🔐 Security | Audits and vulnerability scanning |

---

## Features

- **Live OpenClaw backend** — connects to `localhost:18789` (or any gateway URL)
- **Real agent editing** — SOUL.md / AGENTS.md / HEARTBEAT.md via modal, saved to gateway
- **Create agents** — new agents registered with OpenClaw on creation
- **Test agents** — send prompts directly from UI
- **Dev runner** — send commands to dev agents from the browser
- **Lead sheet** — view drafted leads with fit scores and email drafts
- **Offline message** — customizable Telegram message when gateway is offline

---

## Local Setup

```bash
git clone https://github.com/dferdowsfy/CompCommand.git
open index.html
```

Start OpenClaw gateway:
```bash
openclaw gateway
```

---

## Vercel Auto-Deploy

1. Go to [vercel.com](https://vercel.com) → **Add New Project**
2. Import `dferdowsfy/CompCommand` from GitHub
3. Framework: **Other** (static — no build)
4. Root: `/`
5. Deploy

Every `git push main` → auto-deploys.

---

## Push to GitHub

```bash
cd ~/Downloads/CompCommand
git remote add origin https://github.com/dferdowsfy/CompCommand.git
git push -u origin main
```
