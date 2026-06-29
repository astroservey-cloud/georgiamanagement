# 🚓 Georgia State Roleplay - ER:LC Management Bot

A Discord bot designed for ER:LC (Emergency Response: Liberty County) roleplay servers.  
It handles staff management, shift tracking, warnings, promotions, and statistics.

---

## ✨ Features

### 🚔 Shift System
- Start shift
- End shift
- Tracks time worked

### ⚠️ Warning System
- Issue staff warnings
- Stores reason + moderator + timestamp

### 🎖️ Promotion System
- Promote users (admin only)

### 📊 Stats System
- View warnings per user

---

## 📁 Commands

### `/shift`
- `start` → Begin shift
- `end` → End shift and show time worked

### `/warn`
- Warn a user (moderators only)
- Requires:
  - user
  - reason

### `/promote`
- Promote a user (admin only)
- Requires:
  - user
  - rank

### `/stats`
- View user stats
- Requires:
  - user

---

## ⚙️ Setup Instructions

### 1. Install dependencies
```bash
npm install
