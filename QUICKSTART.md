# 🚀 Quick Start Guide

## Get Up and Running in 3 Minutes

### Step 1: Install Dependencies
```bash
cd frontend
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```

### Step 3: Open Browser
Navigate to: **http://localhost:5173**

That's it! 🎉

---

## 📱 First Steps

1. **Explore the Home Page** - Get familiar with all features
2. **Visit the 3D Garden** - Click on plants to learn about them
3. **Browse the Plant Compendium** - Use search and filters
4. **Try a Guided Tour** - Follow the Immunity Boosters tour
5. **Bookmark Your Favorites** - Save plants to My Garden
6. **Add Personal Notes** - Document your findings
7. **Chat with the Assistant** - Ask about herbal remedies

---

## 🎯 Key Features to Try

### 🏛️ 3D Garden (`/garden`)
- Click and drag to rotate the view
- Scroll to zoom in/out
- Click on any plant marker to see details
- Use the plant list below the 3D scene

### 📚 Plant Explorer (`/plants`)
- Search by plant name
- Filter by AYUSH systems (Ayurveda, Unani, etc.)
- Filter by health concerns (stress, immunity, etc.)
- Filter by plant parts (leaf, root, etc.)

### 🔍 Plant Details (`/plant/:id`)
- Read comprehensive plant information
- View therapeutic uses and dosage
- Check safety precautions
- Add personal notes
- Bookmark for later

### 🎓 Guided Tours (`/tours`)
- Choose a health-focused tour
- Learn about plants step-by-step
- Follow educational narrations
- Jump to detailed plant profiles

### ⭐ My Garden (`/my`)
- View all bookmarked plants
- Read and edit your notes
- Quick access to plant details

### 💬 Chat (`/chat`)
- Ask questions about herbs
- Get quick recommendations
- Use suggestion buttons

---

## 🎨 Sample Queries for Chat

Try these questions with the chatbot:

- "How can I boost my immunity?"
- "Which herbs help with sleep?"
- "What plants are good for digestion?"
- "Help me reduce stress naturally"
- "Which herbs are good for skin?"
- "What helps with common cold?"

---

## 📊 Plant Database

Currently includes 8 medicinal plants:

1. **Tulsi** (Holy Basil) - Immunity & Stress
2. **Ashwagandha** - Adaptogen & Energy
3. **Neem** - Antibacterial & Skin
4. **Turmeric** - Anti-inflammatory
5. **Brahmi** - Brain & Memory
6. **Amla** - Vitamin C & Immunity
7. **Ginger** - Digestion & Nausea
8. **Aloe Vera** - Skin & Healing

---

## 🛠️ Common Tasks

### Add a New Plant
1. Edit `/public/plants.json`
2. Add plant object with all required fields
3. Add media files to `/public/images/`, etc.
4. Refresh the app

### Create a Custom Tour
1. Edit `/public/tours.json`
2. Add tour with steps referencing plant IDs
3. Refresh the app

### Customize Styling
- Components use Tailwind CSS classes
- Modify classes directly in component files
- Update global styles in `src/index.css`

---

## 📱 Mobile Experience

The app is fully responsive:
- Mobile-friendly navigation
- Touch-enabled 3D controls
- Collapsible filters
- Optimized layouts

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5173
npx kill-port 5173
npm run dev
```

### Slow 3D Performance
- Close other browser tabs
- Disable browser extensions
- Use a modern browser (Chrome/Firefox/Edge)

### Data Not Saving
- Check browser localStorage is enabled
- Try a different browser
- Clear cache and reload

---

## 🎓 Learn More

- **React**: https://react.dev
- **Three.js**: https://threejs.org
- **Tailwind CSS**: https://tailwindcss.com
- **Zustand**: https://zustand-demo.pmnd.rs

---

## 💡 Tips

1. **Bookmark Often** - Save plants as you explore
2. **Add Notes** - Document your personal experiences
3. **Try All Tours** - Each offers unique insights
4. **Use Filters** - Find plants by specific needs
5. **3D Garden** - Most immersive way to explore

---

## 🌟 Have Fun Exploring!

This is your personal gateway to the world of AYUSH medicinal plants. Take your time, explore at your own pace, and discover the ancient wisdom of herbal medicine.

**Questions?** Check the main README.md or explore the code - it's well documented! 🌿
