# Smart Building Admin Dashboard 🏢✨

This repository contains the complete implementation for the Frontend Developer Intern Assignment: Smart Building Admin Dashboard. The objective of this project is to evaluate core web development proficiencies, focusing on clean component-based architecture, asynchronous data orchestration, responsive cross-device layout handling, and rich data visualization.

🌐 **Live Production Link:** [https://smart-build-sigma.vercel.app/](https://smart-build-sigma.vercel.app/) 

---

## 📷 UI Preview

(Note: Replace this placeholder with an actual screenshot or a brief screen-recording gif of your working dashboard to instantly showcase your UI execution to reviewers ).

---

## 🚀 Key Modules & Widget Implementations

The user interface delivers a fluid administrative experience across desktop, tablet, and mobile viewports, split into five specialized dashboard widgets:

* 
**Widget 1: Organization Overview:** Built using a responsive statistical grid layout displaying 14 critical enterprise metrics, including active campuses, total buildings, floors, rooms, users, total assets, outstanding work orders, work requests, active alarms, gateways, wired/wireless hardware counts, square footage, and the global health score.


* 
**Widget 2: Product Updates & Release Notes:** Configured as an interactive feed timeline that chronologically presents release milestones and dynamically parses Unix epoch timestamps into clear, human-readable calendar dates.


* 
**Widget 3: Asset Health Summary:** Explicitly handles nested data structures (Building → Floors) via expandable accordion panels, highlighting floor-specific asset conditions (healthy, warning, critical) paired with precise real-time energy consumption tracking measured in kWh.


* 
**Widget 4: Interactive Building Map:** Powered by Leaflet and OpenStreetMap layers, plotting localized building markers that dynamically present rich contextual metadata (Building Name, Health Score, and region profiles) upon user hover or click events.


* 
**Widget 5: Device Health Analytics:** Integrates an analytical trend graphing interface tracking monthly hardware status shifts across healthy, warning, and critical operating thresholds.



---

## 🏗️ Architecture & Simulation Strategy

To mimic a real-world enterprise cloud environment, this application strictly separates data declaration from user presentation:

* 
**Decoupled Mock API Integration:** Data states are never hardcoded inside core view structures; all records are extracted into separate local JSON files.


* 
**Asynchronous Transport Layers:** Content is dynamically requested via asynchronous network operations using the native Fetch API or Axios.


* 
**Simulated Infrastructure Latency:** Implements true-to-life processing lag by introducing a mock network delay of 1 to 2 seconds utilizing native `setTimeout` calls.


* 
**Perceived Performance Handling:** Leverages active skeleton loaders and layout spinners during asynchronous retrieval phases to guarantee design continuity.


* 
**Graceful Error Catching (Bonus feature):** Utilizes an explicit error boundary fallback mechanism on a targeted module to gracefully manage failed network transactions without interrupting the rest of the application ecosystem.



---

## 🛠️ Technical Stack & Quality Controls

* 
**Core Structure:** Component-based library environment tailored for code cleanliness, predictability, and long-term maintainability.


* 
**Language Layer:** JavaScript / Strict TypeScript type definitions to avoid interface implicit types and guarantee robust object structures.


* 
**Styling Framework:** Utilitarian grid layouts (such as Tailwind CSS or Material UI) to satisfy perfect component alignment and responsive element wrapping.



---

## 📂 Directory Blueprint

```text
├── public/
[cite_start]│   └── data/             # Standalone local JSON resource files (overview.json, updates.json, etc.) [cite: 14]
├── src/
[cite_start]│   ├── components/       # Reusable layout primitives, status badges, and generic skeleton views [cite: 5, 17, 129]
[cite_start]│   ├── hooks/            # Dedicated async data extraction hooks featuring latency simulation [cite: 15, 16]
[cite_start]│   ├── views/            # Isolated standalone dashboard widget sections [cite: 20]
[cite_start]│   ├── App.tsx           # Layout shell orchestration and error boundary setup [cite: 18]
│   └── main.tsx          # Client application initialization point

```

---

## ⚙️ Getting Started & Local Deployment

Follow these standard instructions to pull, build, and test the repository locally on your machine:

### Prerequisites

Verify that **Node.js** (LTS build recommended) and your preferred package manager are installed.

### 1. Acquire the Source

```bash
git clone https://github.com/ArvindJayan/SmartBuild.git
cd SmartBuild

```

### 2. Install Dependencies

```bash
npm install

```

### 3. Initialize the Development Environment

```bash
npm run dev

```

Open your browser of choice and point it to the output address to view the interactive admin application.

### 4. Build Optimized Production Assets

```bash
npm run build

```

---

## 📋 Evaluation Checklist Compliance

* 
**Commit Continuity:** Maintained standard incremental versioning history to illustrate development progression, design patterns, and problem-solving steps.


* 
**Cloud Hosting:** Fully built and deployed live on a cloud hosting platform for automated remote verification.
