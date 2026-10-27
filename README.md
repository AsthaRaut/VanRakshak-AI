<h1 align="center">VanRakshak-AI 🌿</h1>

<p align="center">
  <b>AI-powered forest monitoring and restoration prioritisation platform</b>
</p>

<p align="center">
  <a href="https://vanrakshak-ai.lovable.app/">
    <img src="https://img.shields.io/badge/🌐_Live_Demo-Open_Website-2e7d32?style=for-the-badge" alt="Live Demo" />
  </a>
</p>

<p align="center">
  🔗 <a href="https://vanrakshak-ai.lovable.app/">https://vanrakshak-ai.lovable.app/</a>
</p>

---

VanRakshak-AI turns scattered forest data into one clear, location-based map of restoration priority. It combines satellite and environmental indicators with community reports to show which degraded areas need action first.

Built by **Team TeraPlus** for the **Code4Nature Challenge**.

## ❗ Problem

Forests are large and constantly changing, so regular monitoring is difficult. Data is also scattered across satellite feeds, field notes and local reports, which makes it hard to decide where restoration should begin.

## 💡 Solution

1. **Collect** – Gather vegetation, fire and habitat indicators together with community reports.
2. **Analyse** – Score each location for degradation and risk using an AI-based model.
3. **Prioritise** – Show every location on an interactive map, colour-coded by restoration urgency.

## ✨ Features

- **Forest Monitoring** – Track vegetation condition, fire impact and habitat degradation.
- **GIS Map** – View forest condition, reported issues and priority areas in one place.
- **AI Analysis** – Rank locations from "urgent restoration" to "stable".
- **Community Reporting** – Submit location-based observations and biodiversity concerns.
- **Restoration Insights** – Turn monitoring results into practical planning inputs.
- **Recovery Progress Index (RPI)** – Track whether a restored area is recovering, stable or declining.

> The prototype uses representative sample data. Real satellite and environmental datasets will be integrated as the project matures.

## 🛠️ Tech Stack

React · TypeScript · Vite · CSS · Bun / npm

## 🚀 Run Locally

**Prerequisites:** Node.js with npm, or Bun.

```bash
# 1. Clone the repository
git clone https://github.com/AsthaRaut/VanRakshak-AI.git
cd VanRakshak-AI

# 2. Install dependencies
npm install        # or: bun install

# 3. Start the development server
npm run dev        # or: bun run dev

# 4. Create a production build (output in /dist)
npm run build      # or: bun run build
```

## 📁 Project Structure

```
VanRakshak-AI/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   ├── routes/
│   ├── router.tsx
│   ├── server.ts
│   └── styles.css
├── package.json
├── vite.config.ts
└── README.md
```

## 🎯 Impact

Helps forest agencies, NGOs, researchers and local communities monitor ecosystem change, focus restoration where it is needed most, and make local biodiversity concerns visible.

## 👥 Team TeraPlus

**Team Lead:** Astha Raut ([GitHub](https://github.com/AsthaRaut))
**Members:** Nishu Kumari, Swati Wadekar, Prathibha Maurya


Repository: [VanRakshak-AI](https://github.com/AsthaRaut/VanRakshak-AI)