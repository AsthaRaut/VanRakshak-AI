# 🌿 VanRakshak-AI
### AI-Powered Forest Monitoring and Restoration Prioritisation Platform

<p align="center">
  <a href="https://vanrakshak-ai-1.onrender.com">
    <img src="https://img.shields.io/badge/Live%20Demo-Visit%20Website-2E7D32?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Live Demo" />
  </a>
  <a href="https://github.com/AsthaRaut/VanRakshak-AI">
    <img src="https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub Repository" />
  </a>
  <img src="https://img.shields.io/badge/Language-TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
</p>

## Overview

**VanRakshak-AI** is a web platform that helps identify degraded forest areas, visualise environmental indicators, and support data-informed restoration planning. It brings forest indicators, map-based visualisation, and community observations together in one place.

Developed by **Team TeraPlus** for the **Code4Nature Challenge**.

## Problem Statement

Forest conservation depends on timely information, yet:

- Large forest areas are difficult to monitor.
- Environmental data is scattered across multiple sources.
- Identifying restoration priorities requires analysing several indicators together.
- Local observations rarely reach decision-makers.

## Solution

| Step | Action | Description |
|---|---|---|
| 1 | **Monitor** | Explore vegetation, fire-impact, and habitat indicators. |
| 2 | **Visualise** | View forest information on an interactive map. |
| 3 | **Analyse** | Assess indicators to understand degradation and restoration needs. |
| 4 | **Prioritise** | Rank locations by restoration urgency. |
| 5 | **Track** | Follow recovery progress over time. |

## Key Features

- 🌳 **Forest Monitoring:** Indicators for vegetation, fire impact, and habitat condition.
- 🗺️ **Interactive GIS Map:** Location-based forest information on a Leaflet map.
- 🤖 **Restoration Prioritisation:** AI-assisted ranking of locations by restoration need.
- 📍 **Community Reporting:** Location-based records of environmental and biodiversity observations.
- 📊 **Restoration Insights:** Clear charts and summaries to support planning.
- 🌱 **Recovery Progress Index (RPI):** Shows whether an area is recovering, stable, or declining.

## How It Works

```text
Environmental Indicators + Community Observations
                    ↓
            Data Organisation
                    ↓
        Forest Condition Assessment
                    ↓
         Restoration Prioritisation
                    ↓
          Interactive Map & Insights
```

## Technology Stack

| Technology | Purpose |
|---|---|
| React, TypeScript | User interface and type-safe development |
| TanStack Start | Routing and server-side framework |
| Vite, Nitro | Build tooling and production server |
| Tailwind CSS | Styling and responsive layouts |
| Leaflet | Interactive maps |
| Recharts | Charts and data visualisation |
| Node.js, npm | Runtime and package management |

## Getting Started

**Prerequisites:** Node.js, npm, and Git.

```bash
# Clone the repository
git clone https://github.com/AsthaRaut/VanRakshak-AI.git
cd VanRakshak-AI

# Install dependencies
npm install

# Start the development server
npm run dev
```

**Production build**

```bash
NITRO_PRESET=node-server npm run build
node .output/server/index.mjs
```

The build is generated in the `.output/` directory. Open the address reported by the server.

## Project Structure

```text
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
└── tsconfig.json
```

## Future Scope

- Integrate satellite imagery and verified environmental datasets.
- Develop and validate AI/ML models for degradation assessment.
- Add historical forest-cover analysis and change detection.
- Verify community observations and improve biodiversity reporting.
- Introduce field-based restoration monitoring.
- Collaborate with conservation organisations and researchers.

## Limitations

The current prototype uses representative sample data. Restoration priorities and recovery indicators are demonstrative only and should not replace expert field assessments until supported by verified data and validated models.

**Team :** TeraPlus | **Challenge:** Code4Nature

---

<p align="center">🌿 <b>Protect Forests. Prioritise Restoration. Support Biodiversity.</b></p>
