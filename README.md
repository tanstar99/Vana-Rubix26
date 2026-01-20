# 🌿 Virtual Herbal Garden - AYUSH Medicinal Plants

A comprehensive, interactive web application for exploring medicinal plants from AYUSH (Ayurveda, Yoga & Naturopathy, Unani, Siddha, and Homeopathy) traditions through 3D visualization, detailed plant profiles, and guided educational tours.

## ✨ Features

### 🏛️ 3D Virtual Garden
- Interactive 3D garden scene built with React Three Fiber
- Clickable plant models with hover effects
- Orbital controls for navigation (rotate, zoom, pan)
- Visual plant markers in garden layout

### 📚 Plant Explorer & Compendium
- Comprehensive database of 8 medicinal plants
- Advanced search functionality by name and properties
- Multi-filter system:
  - AYUSH systems (Ayurveda, Unani, Siddha, etc.)
  - Disease categories (immunity, stress, digestion, etc.)
  - Plant parts used (leaf, root, bark, etc.)
- Beautiful card-based grid layout

### 🔍 Detailed Plant Profiles
Each plant profile includes:
- **Basic Information**: Scientific name, common names, local names
- **AYUSH Classifications**: Traditional medicine systems
- **Medicinal Properties**: Anti-inflammatory, antioxidant, etc.
- **Therapeutic Uses**: Specific health conditions and benefits
- **Dosage Information**: Form, amount, and frequency
- **Safety Precautions**: Important warnings and contraindications
- **Cultivation Guide**: Soil, water, and climate requirements
- **Habitat Details**: Geographic origin and distribution
- **3D Viewer**: Interactive 3D plant model
- **Media Gallery**: Images, videos, and audio resources

### 🎯 Guided Tours
Four themed educational tours:
1. **Immunity Boosters** - Plants that strengthen immune system
2. **Digestive Health** - Herbs for gut health and digestion
3. **Stress Relief & Mental Clarity** - Adaptogenic herbs
4. **Radiant Skin** - Plants for skin health and beauty

Each tour includes:
- Step-by-step journey through selected plants
- Educational narration for each plant
- Progress tracking
- Direct links to full plant profiles

### ⭐ Personal Garden (Bookmarks & Notes)
- Bookmark favorite plants for quick access
- Add personal notes to any plant
- Edit and delete notes
- View all bookmarked plants in one place
- Local storage persistence (no backend required)

### 💬 Herbal Chat Assistant
- Rule-based chatbot for instant plant information
- Quick suggestion buttons for common queries
- Health-focused conversation flows
- Topics covered:
  - Immunity boosting
  - Stress and anxiety relief
  - Digestive issues
  - Sleep problems
  - Skin health
  - Energy and fatigue
  - And more!

## 🛠️ Tech Stack

### Frontend Framework
- **React 19** with TypeScript
- **Vite** for blazing-fast development
- **React Router** for navigation

### Styling
- **Tailwind CSS v4** for utility-first styling
- Custom glassmorphism effects
- Responsive design for all screen sizes
- Beautiful gradient backgrounds
- Google Fonts: Poppins & Cinzel

### 3D Graphics
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers and abstractions
- **Three.js** - 3D graphics library

### State Management
- **Zustand** - Lightweight state management
- **Zustand Persist** middleware for localStorage
- **Hybrid Data**: Plant data static, RAG queries via API

### Data Structure
- Static JSON files for plant and tour data
- Type-safe TypeScript interfaces
- Easy to extend and modify

## 📁 Project Structure

```
frontend/
├── public/
│   ├── plants.json          # Plant database
│   ├── tours.json           # Tour definitions
│   └── [media folders]      # Images, videos, audio, 3D models
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Navbar.tsx
│   │   ├── PlantCard.tsx
│   │   ├── SearchBar.tsx
│   │   ├── FilterPanel.tsx
│   │   ├── PlantModal.tsx
│   │   ├── TourCard.tsx
│   │   ├── TourPlayer.tsx
│   │   ├── BookmarkButton.tsx
│   │   └── NoteEditor.tsx
│   ├── three/               # 3D components
│   │   ├── GardenScene.tsx
│   │   ├── PlantModel.tsx
│   │   └── PlantViewer.tsx
│   ├── pages/               # Page components
│   │   ├── HomePage.tsx
│   │   ├── GardenPage.tsx
│   │   ├── PlantsPage.tsx
│   │   ├── PlantDetailPage.tsx
│   │   ├── ToursPage.tsx
│   │   ├── MyGardenPage.tsx
│   │   └── ChatPage.tsx
│   ├── store/               # State management
│   │   └── useAppStore.ts
│   ├── types/               # TypeScript types
│   │   ├── plant.ts
│   │   └── tour.ts
│   ├── utils/               # Utility functions
│   │   ├── filterPlants.ts
│   │   └── getUserId.ts
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
└── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm
- Python 3.8+ (for RAG data ingestion)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Vana-Rubix26
```

2. **Backend Setup**:
```bash
cd backend
npm install
```

3. **Frontend Setup**:
```bash
cd frontend
npm install
```

### 🧠 Data Ingestion (First Time Only)
To populate the RAG database with medicinal plant knowledge:
```bash
cd backend/rag_scripts
pip install -r requirements.txt
python ingest.py
```

### ▶️ Running the App

1. **Start Backend Server** (Terminal 1):
```bash
cd backend
npm start
```
*Server runs at http://localhost:5000*

2. **Start Frontend** (Terminal 2):
```bash
cd frontend
npm run dev
```
*App runs at http://localhost:5173*

3. Open your browser and navigate to `http://localhost:5173`.

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` folder, ready for deployment.

## 🌱 Plant Database

The application includes 8 medicinal plants:

1. **Tulsi (Holy Basil)** - *Ocimum sanctum*
   - Immunity booster, stress relief, respiratory health

2. **Ashwagandha (Indian Ginseng)** - *Withania somnifera*
   - Adaptogen, stress relief, energy booster

3. **Neem** - *Azadirachta indica*
   - Antibacterial, skin health, blood purifier

4. **Turmeric (Haldi)** - *Curcuma longa*
   - Anti-inflammatory, antioxidant, digestive aid

5. **Brahmi** - *Bacopa monnieri*
   - Brain tonic, memory enhancement, anxiety relief

6. **Amla (Indian Gooseberry)** - *Phyllanthus emblica*
   - Vitamin C rich, immunity, rejuvenation

7. **Ginger (Adrak)** - *Zingiber officinale*
   - Digestive aid, anti-nausea, anti-inflammatory

8. **Aloe Vera** - *Aloe barbadensis miller*
   - Skin healing, digestive support, detox

## 🎨 Design Philosophy

### Visual Theme
- **Nature + Ancient Knowledge + Modern UI**
- Deep green and earthy gradient backgrounds
- Glassmorphism effects with backdrop blur
- Soft shadows and rounded corners
- Gold and emerald accent colors

### User Experience
- Clean, intuitive navigation
- Fast loading and smooth animations
- Mobile-responsive design
- Accessible color contrasts
- Interactive 3D elements

## 🔧 Customization

### Adding New Plants

1. Add plant data to `/public/plants.json`:
```json
{
  "id": "plant-name",
  "scientificName": "Scientific Name",
  "commonName": "Common Name",
  // ... other fields
}
```

2. Add plant media to `/public/media/` folders

3. Update `gardenPlacement` coordinates for 3D scene

### Creating New Tours

1. Add tour data to `/public/tours.json`:
```json
{
  "id": "tour-id",
  "title": "Tour Title",
  "theme": "theme-name",
  "steps": [
    {
      "plantId": "plant-id",
      "narrationText": "Educational content",
      "order": 1
    }
  ]
}
```

### Styling

- Modify Tailwind classes in components
- Update global styles in `src/index.css`
- Adjust color scheme in component files

## 📱 Pages

1. **Home (/)** - Landing page with features and CTAs
2. **Garden (/garden)** - Interactive 3D garden scene
3. **Plants (/plants)** - Searchable plant compendium
4. **Plant Detail (/plant/:id)** - Detailed plant profile
5. **Tours (/tours)** - Educational tour listing
6. **Tour Player (/tour/:tourId)** - Step-by-step tour experience
7. **My Garden (/my)** - Bookmarks and personal notes
8. **Chat (/chat)** - Herbal knowledge chatbot

## 💾 Data Persistence

- Uses browser localStorage for:
  - User identification (UUID)
  - Plant bookmarks
  - Personal notes
  - Filter preferences
- No backend or database required
- Data persists across sessions
- Privacy-friendly (all data stays local)

## 🎯 Use Cases

- **Educational**: Learn about medicinal plants and their uses
- **Research**: Quick reference for AYUSH plant information
- **Personal Health**: Discover natural remedies for common ailments
- **Cultural**: Explore traditional Indian medicine systems
- **Wellness**: Track favorite herbs and personal experiences

## 🌟 Future Enhancements

Potential additions:
- Real 3D plant models (.glb files)
- Video and audio content
- Advanced search with autocomplete
- Plant comparison feature
- Export notes as PDF
- Share bookmarked collections
- Integration with OpenAI for smarter chatbot
- Multi-language support
- Dark/light theme toggle
- Plant identification by image

## ⚠️ Disclaimer

This application provides educational information about medicinal plants. It is not intended to replace professional medical advice, diagnosis, or treatment. Always consult with a qualified healthcare provider before using any herbal remedies, especially if you are pregnant, nursing, taking medications, or have existing health conditions.

## 📄 License

This project is open source and available for educational purposes.

## 🙏 Acknowledgments

- AYUSH Ministry of India for traditional medicine knowledge
- Plant data compiled from traditional Ayurvedic texts
- React and Three.js communities for excellent documentation
- All contributors to open-source libraries used

## 👨‍💻 Development

Built with ❤️ for the Rubix Hackathon

- **Framework**: React + TypeScript + Vite
- **3D**: React Three Fiber
- **Styling**: Tailwind CSS v4
- **State**: Zustand with persistence
- **Backend**: Node.js + Express (RAG Pipeline)
- **Database**: Pinecone (Vector DB) + LocalStorage (User Data)

---

**Happy Exploring! 🌿**
