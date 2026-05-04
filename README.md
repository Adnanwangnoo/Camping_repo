# Aru Camping Resort Website

## Setup Instructions

### Step 1 — Install Node.js
Go to https://nodejs.org and download the LTS version.

### Step 2 — Open this folder in VS Code
File → Open Folder → select this "aru-camping" folder

### Step 3 — Open VS Code terminal
Press Ctrl + ` (backtick key, above Tab)

### Step 4 — Install dependencies
Type this and press Enter:
```
npm install
```
Wait 1-2 minutes.

### Step 5 — Run the website
```
npm run dev
```

### Step 6 — Open in browser
Go to: http://localhost:5173

---

## Login Credentials

### Admin Login
- Email: admin@arucamping.com
- Password: admin123
- Access: Full admin panel + all pages

### Regular User
- Register a new account from the Login page
- Access: Dashboard, reviews, bookings

---

## Project Structure
```
src/
  App.jsx     ← entire website code
  main.jsx    ← entry point (do not change)
public/
  favicon.svg ← browser tab icon
index.html    ← HTML entry (do not change)
package.json  ← dependencies
```

## To build for production (upload to internet)
```
npm run build
```
This creates a "dist" folder you can upload to Vercel or Netlify for free.
