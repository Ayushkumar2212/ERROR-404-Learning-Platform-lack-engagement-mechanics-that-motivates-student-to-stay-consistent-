# LEARN·XP | Elite Gamified Learning Platform 🚀

**LEARN·XP** is a high-fidelity, AI-powered educational ecosystem designed to maximize student engagement through gamification, real-time data analysis, and adaptive learning paths. 

Built as a high-performance single-page application (SPA), it bridges the gap between traditional learning and modern interactive environments.

---

## 🌟 Core Features

### 🎮 Gamified Ecosystem
- **Dynamic XP System**: Real-time experience points tracking with floating visual feedback.
- **Persistent Streaks**: Tracks daily logins using `localStorage` to encourage consistency.
- **Elite Leaderboard**: Live-sorting global rankings with animated **Rank Change Indicators** (▲/▼).
- **Mastery Badges**: Visual rewards for academic milestones and solver speed.

### 🤖 Nexus AI Integration
- **AI Navigator**: Natural language search bar allowing users to navigate features via commands (e.g., "Load Lab", "Show Rank").
- **Adaptive Quests**: AI-driven challenge generator that targets the user's **weakest subject** based on performance stats.
- **Elite MCQ Engine**: Modular quiz sets (5/10 questions) with progressive leveling (Level 1 to Advanced).

### 🔬 Nexus Molecular Lab
- **Real-World Data Connection**: Integrated with the **`roboBohr.csv`** dataset (170MB molecular physics data).
- **Server-Side Streaming**: Custom Node.js backend serves molecular coordinate data via JSON API.
- **Molecular Explorer**: High-precision data visualization for atomic energy and stability analysis.

### 🛰️ Live Activity Pulse
- A global achievement feed that updates every 10 seconds, showing live student progress from across the "Nexus Cloud".

---

## 🛠️ Technology Stack

- **Frontend**: React (18.x), Babel (JSX), Vanilla CSS (Premium Animations).
- **Backend**: Node.js (Lightweight HTTP Server & Data Streamer).
- **Persistence**: Browser `localStorage` (Accounts, Progress, Streaks).
- **Data**: CSV (roboBohr Molecular Data, Solution Bank).

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js** installed on your system.
- **`roboBohr.csv`** located in the documents path specified in `server.js`.

### 2. Installation
Clone the repository:
```bash
git clone https://github.com/Ayushkumar2212/ERROR-404-Learning-Platform-lack-engagement-mechanics-that-motivates-student-to-stay-consistent-
```

### 3. Run Locally
Start the Nexus Server:
```bash
node server.js
```
Open your browser at: `http://localhost:8000`

---

## 🛡️ Security & Real-Time Tracking
- **Authentication**: Secure registration/login gate requiring local registration before platform access.
- **Data Accuracy**: Leaderboard is recalculated on every XP gain to ensure 100% sorting accuracy.

---

## 📄 License
This project is developed by **Team Nexus** for the mission to eliminate educational disengagement. 

*"Level Up Your Learning."* 🎓✨
