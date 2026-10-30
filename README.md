# Use Claude Code for Free with OmniRoute

Run **Claude Code** (the agentic coding tool) on **free-tier cloud models** by routing it through **OmniRoute**, a local model aggregator.

![Claude Code Free - cover](https://github.com/user-attachments/assets/9c5e5ead-b9f3-4627-84bf-77384eea3cd0)

---

## How It Works

| Tool | Role |
|------|------|
| **Claude Code** | The agentic environment (the CLI you type in) |
| **OmniRoute** | Model aggregator, runs locally on your machine |
| **OpenRouter, AgentRouter, etc.** | Model providers (the models run in the cloud) |

```
Claude Code  →  OmniRoute (localhost)  →  Model Providers (cloud)
```

> The router runs on your system. The models run in the cloud.

![Architecture](https://github.com/user-attachments/assets/f81ce69a-fd8d-48fb-b119-19372a606243)

---

## Prerequisites

- Node.js and npm installed
- Windows PowerShell or CMD
- Free accounts with at least one model provider (see [Providers](#free-model-providers))

---

## Step 1: Install and Launch OmniRoute

```bash
npm install -g omniroute
```

![Install OmniRoute](https://github.com/user-attachments/assets/75f70bba-0241-4404-b3e1-9b0cdf6cd4ce)

Start it:

```bash
omniroute
```

Your browser opens the local dashboard. Default password: `CHANGEME` (change it after first login).

![Dashboard login](https://github.com/user-attachments/assets/881fca5b-ad77-4177-8505-e86fc41d92e6)

---

## Step 2: Install Claude Code

**PowerShell**

```powershell
irm https://claude.ai/install.ps1 | iex
```

**CMD**

```cmd
curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd
```

Check the install by typing `claude` in a terminal.

> If it does not open, add Claude Code to your system **PATH** environment variable.

![Claude Code install](https://github.com/user-attachments/assets/eaf57cd8-3cfe-4721-a44c-89105df0b1a9)

---

## Step 3: Connect a Free Model Provider

1. In OmniRoute, open **Omniproxy → Providers**.
2. Click the **Free Tier** filter to see free models.
3. Create an account with a provider and get its **API key**.

![Free tier filter](https://github.com/user-attachments/assets/d0734bb6-d64a-4f63-a538-a070d6f1033a)

**Example: OpenRouter** (one-time setup per provider)

1. Create an API key on the OpenRouter website.
2. In OmniRoute, click **Add connection**.
3. Paste the API key and check that it is valid.
4. Enable the free models.
5. Click **Import**.

Repeat for each provider you want.

---

## Step 4: Create a Combo

A **combo** groups models from different providers under one name.

**Example**

| Priority | Provider | Model |
|----------|----------|-------|
| 1 | OpenRouter | Opus |
| 2 | AgentRouter | Opus |
| 3 | AgentRouter | Haiku |
| 4 | OpenRouter | Haiku |

**Steps**

1. Go to **Omniproxy → Combos**.
2. Enter a name, for example `My free models`. Click **Next**.
3. Select providers and models. Think about which one should run first, second, and so on.
4. Choose a strategy:
   - **Priority**: uses models in your order. If one fails, it moves to the next.
   - **Round robin**: rotates automatically across models.
5. Click **Create combo**.

![Combo name](https://github.com/user-attachments/assets/a8a91944-3840-40cf-9916-ec9ab7c91d71)

![Combo models](https://github.com/user-attachments/assets/e1531957-68d7-4358-bdc9-310d4017f997)

---

## Step 5: Create a Single API Key

1. Open **API Keys** in the left panel.
2. Enter a name and click **Create**.
3. **Copy the key now.** It is shown only once.

![API key](https://github.com/user-attachments/assets/6906c5fb-7349-4330-ab84-68907d0d425e)

---

## Step 6: Point Claude Code to OmniRoute

Run these in PowerShell:

```powershell
$env:CLAUDE_CONFIG_DIR = "$HOME\.claude-omniroute"
$env:ANTHROPIC_BASE_URL = "http://localhost:20128"
$env:ANTHROPIC_AUTH_TOKEN = "YOUR_OMNIROUTE_KEY"
$env:ANTHROPIC_API_KEY = ""
$env:ANTHROPIC_MODEL = "YOUR_COMBO_NAME"
```

Replace `YOUR_OMNIROUTE_KEY` and `YOUR_COMBO_NAME` with your own values.

> These variables last only for the current terminal session. Run `claude` in the **same** terminal.

![Environment variables](https://github.com/user-attachments/assets/efa4c68c-22e7-454b-a7f3-23bf0002d048)

---

## Step 7: Run Claude Code

```bash
claude
```

Answer the first-run questions. Then ask:

```
What model are you using?
```

![Claude Code running](https://github.com/user-attachments/assets/72702538-4da9-48c3-ad32-6b497cb75ecb)

---

## Step 8: Verify It Works

**Option A: In Claude Code**

```
/status
```

Check that:
- **Anthropic base URL** is `http://localhost:20128`
- **Model** is your combo name

![Status check](https://github.com/user-attachments/assets/ae0907fe-a92b-448d-9634-2e65ff1c35d8)

**Option B: In OmniRoute**

Go to **Omniproxy → Combos → Control Center** (tower icon) and see your requests.

![Control center](https://github.com/user-attachments/assets/9678f6e8-f251-46f5-8569-c68753aacae6)

---

## Free Model Providers

| Provider | Notes / Models |
|----------|----------------|
| OpenRouter | Free models, API key |
| NVIDIA NIM | Kimi, DeepSeek, Gemma, Nemotron, GPT |
| Ollama Cloud | GPT, DeepSeek, Kimi, GLM |
| AgentRouter | $150 free credits (Claude models) |
| Google AI Studio | Gemini models |
| Groq | GPT, Qwen |
| Mistral | Mistral models |
| Antigravity | Claude, Gemini |
| Cloudflare Workers AI | Mistral, Qwen, DeepSeek, Llama |
| Cohere | Cohere models |
| Hugging Face | DeepSeek |
| Kiro AI | Sonnet, Haiku, GPT, DeepSeek, MiniMax, Qwen, GLM |
| LLM7.io | Opus, Sonnet, Haiku, DeepSeek |
| XKiro | Qwen, MiniMax, Mistral, DeepSeek |
| **OpenCode** | **No account needed** |

> Free tiers have rate limits and can change anytime. Check each provider's terms before use.

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| `claude` not found | Add Claude Code to PATH, then reopen the terminal |
| Claude Code uses the wrong model | Set the variables again in the **same** terminal |
| Rate limit errors | Add more models to your combo or use round robin |
| Lost API key | Create a new key in OmniRoute |

---

## Summary

1. Install OmniRoute and Claude Code
2. Connect free providers
3. Create a combo
4. Create one API key
5. Set environment variables
6. Run `claude` and verify

**Happy building!**
