# Deploy the Amazon Ad Toolkit to a permanent URL

This folder is a complete, ready-to-deploy project. Follow these steps to get a
clean permanent link like `amazon-toolkit.vercel.app` that your whole team can use.

Total time: about 10 minutes. Everything here is free.

---

## What's in this folder

```
amazon-toolkit/
├── index.html          ← page shell
├── package.json        ← project dependencies
├── vite.config.js      ← build config
└── src/
    ├── main.jsx        ← React entry point
    └── App.jsx         ← the toolkit (all four tools)
```

You don't need to edit any of these. Just deploy them.

---

## Step 1 — Put the code on GitHub (free)

1. Create a free account at **github.com** if you don't have one.
2. Click the **+** (top right) → **New repository**.
3. Name it `amazon-ad-toolkit`, leave it **Public** or **Private** (both work), click
   **Create repository**.
4. On the next screen, click **uploading an existing file**.
5. Drag in ALL the files from this `amazon-toolkit` folder — keep the `src` folder
   structure intact (upload the folder, not just loose files).
6. Click **Commit changes**.

---

## Step 2 — Deploy on Vercel (free, permanent URL)

1. Go to **vercel.com** → **Sign Up** → choose **Continue with GitHub** (easiest — it
   links the two automatically).
2. On your Vercel dashboard, click **Add New → Project**.
3. Find `amazon-ad-toolkit` in the list of your GitHub repos → click **Import**.
4. Vercel auto-detects it's a Vite project — you don't need to change any settings.
   Just click **Deploy**.
5. Wait about 60 seconds. You'll get a live URL like
   `amazon-ad-toolkit.vercel.app`.

That URL is permanent and always on. Share it with your team.

---

## Step 3 — (Optional) Give it a custom name

If `amazon-ad-toolkit.vercel.app` is taken or you want something cleaner:

1. In your Vercel project → **Settings → Domains**.
2. You can rename the free `.vercel.app` subdomain to something available like
   `yourteam-ad-tools.vercel.app`.
3. Or, if your company owns a domain, add a custom one like `tools.yourcompany.com`.

---

## Updating the tool later

Because Vercel is connected to GitHub, any change you push to the GitHub repo
auto-deploys to the same URL within a minute. If you want me to add tools or tweak
the prompts later, I give you an updated `App.jsx`, you replace that one file on
GitHub, and the live site updates itself.

---

## Sharing with your team

Just send them the Vercel URL. They:
1. Open the link (works on desktop and phone)
2. Pick a tool, fill in the fields, click **Copy**
3. Paste into Microsoft Copilot and send

No accounts, no API keys, no cost. On iPhone they can add the link to their home
screen (Safari → Share → Add to Home Screen) so it feels like an app.

---

## If you get stuck

- **Vercel build fails:** make sure the `src` folder and its two files uploaded
  correctly to GitHub — the structure must match the tree above.
- **Blank page after deploy:** confirm `index.html` is in the root (not inside `src`).
- **Want to test locally first:** if you have Node.js installed, run `npm install`
  then `npm run dev` in this folder, and open the localhost link it prints.
