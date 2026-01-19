import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import GardenPage from './pages/GardenPage';
import PlantsPage from './pages/PlantsPage';
import PlantDetailPage from './pages/PlantDetailPage';
import ToursPage from './pages/ToursPage';
import MyGardenPage from './pages/MyGardenPage';
import ChatPage from './pages/ChatPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/garden" element={<GardenPage />} />
          <Route path="/plants" element={<PlantsPage />} />
          <Route path="/plant/:id" element={<PlantDetailPage />} />
          <Route path="/tours" element={<ToursPage />} />
          <Route path="/tour/:tourId" element={<ToursPage />} />
          <Route path="/my" element={<MyGardenPage />} />
          <Route path="/chat" element={<ChatPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
