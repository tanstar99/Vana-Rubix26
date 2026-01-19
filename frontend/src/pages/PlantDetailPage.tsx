import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Plant } from '../types';
import BookmarkButton from '../components/BookmarkButton';
import NoteEditor from '../components/NoteEditor';
import PlantViewer from '../three/PlantViewer';

export default function PlantDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [plant, setPlant] = useState<Plant | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'info' | '3d' | 'media'>('info');

  useEffect(() => {
    fetch('/plants.json')
      .then((res) => res.json())
      .then((data: Plant[]) => {
        const foundPlant = data.find((p) => p.id === id);
        setPlant(foundPlant || null);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading plant:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-green-900 to-emerald-950 flex items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  if (!plant) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-green-900 to-emerald-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Plant not found</h1>
          <Link to="/plants" className="text-emerald-400 hover:text-emerald-300">
            ← Back to Plants
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-green-900 to-emerald-950 pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Back button */}
        <Link
          to="/plants"
          className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 mb-6 transition-colors"
        >
          <span>←</span> Back to Plants
        </Link>

        {/* Header */}
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl border border-white/20 p-8 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">{plant.commonName}</h1>
              <p className="text-2xl text-emerald-300 italic">{plant.scientificName}</p>
            </div>
            <BookmarkButton plantId={plant.id} />
          </div>

          {/* Local Names */}
          {plant.localNames.length > 0 && (
            <div className="mb-4">
              <span className="text-emerald-300 font-semibold">Also known as: </span>
              <span className="text-white/80">{plant.localNames.join(', ')}</span>
            </div>
          )}

          {/* Tags & Systems */}
          <div className="flex flex-wrap gap-2 mb-4">
            {plant.ayushSystems.map((system) => (
              <span
                key={system}
                className="px-3 py-1 bg-amber-500/20 text-amber-200 text-sm rounded-full border border-amber-500/30"
              >
                {system}
              </span>
            ))}
            {plant.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-emerald-500/20 text-emerald-200 text-sm rounded-full border border-emerald-500/30"
              >
                {tag}
              </span>
            ))}
          </div>

          <p className="text-white/90 text-lg leading-relaxed">{plant.descriptionFull}</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('info')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === 'info'
                ? 'bg-emerald-500 text-white'
                : 'bg-white/10 text-white/80 hover:bg-white/20'
            }`}
          >
            📋 Information
          </button>
          <button
            onClick={() => setActiveTab('3d')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === '3d'
                ? 'bg-emerald-500 text-white'
                : 'bg-white/10 text-white/80 hover:bg-white/20'
            }`}
          >
            🌿 3D View
          </button>
          <button
            onClick={() => setActiveTab('media')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === 'media'
                ? 'bg-emerald-500 text-white'
                : 'bg-white/10 text-white/80 hover:bg-white/20'
            }`}
          >
            🎬 Media
          </button>
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {activeTab === 'info' && (
              <div className="space-y-6">
                {/* Medicinal Properties */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6">
                  <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <span>💊</span> Medicinal Properties
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {plant.medicinalProperties.map((prop) => (
                      <span
                        key={prop}
                        className="px-3 py-1 bg-purple-500/20 text-purple-200 text-sm rounded border border-purple-500/30"
                      >
                        {prop}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Therapeutic Uses */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6">
                  <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <span>🏥</span> Therapeutic Uses
                  </h2>
                  <div className="space-y-3">
                    {plant.therapeuticUses.map((use, idx) => (
                      <div key={idx} className="border-l-4 border-emerald-500 pl-4">
                        <h3 className="text-lg font-semibold text-emerald-300">{use.condition}</h3>
                        <p className="text-white/80">{use.benefit}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Parts Used */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6">
                  <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <span>🌱</span> Parts Used
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {plant.partsUsed.map((part) => (
                      <span
                        key={part}
                        className="px-3 py-2 bg-green-500/20 text-green-200 rounded-lg border border-green-500/30 capitalize"
                      >
                        {part}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Dosage */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6">
                  <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <span>📊</span> Dosage
                  </h2>
                  <div className="space-y-2 text-white/80">
                    <p><strong className="text-emerald-300">Form:</strong> {plant.dosage.form}</p>
                    <p><strong className="text-emerald-300">Amount:</strong> {plant.dosage.amount}</p>
                    <p><strong className="text-emerald-300">Frequency:</strong> {plant.dosage.frequency}</p>
                  </div>
                </div>

                {/* Precautions */}
                <div className="bg-red-500/10 backdrop-blur-md rounded-2xl border border-red-500/30 p-6">
                  <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <span>⚠️</span> Precautions
                  </h2>
                  <ul className="space-y-2">
                    {plant.precautions.map((precaution, idx) => (
                      <li key={idx} className="text-red-200 flex items-start gap-2">
                        <span>•</span>
                        <span>{precaution}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Cultivation */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6">
                  <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <span>🌾</span> Cultivation
                  </h2>
                  <div className="space-y-2 text-white/80">
                    <p><strong className="text-emerald-300">Soil:</strong> {plant.cultivation.soil}</p>
                    <p><strong className="text-emerald-300">Water:</strong> {plant.cultivation.water}</p>
                    <p><strong className="text-emerald-300">Climate:</strong> {plant.cultivation.climate}</p>
                  </div>
                </div>

                {/* Habitat */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6">
                  <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <span>🌍</span> Habitat
                  </h2>
                  <div className="space-y-2 text-white/80">
                    <p><strong className="text-emerald-300">Region:</strong> {plant.habitat.region}</p>
                    <p><strong className="text-emerald-300">Origin:</strong> {plant.habitat.origin}</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === '3d' && (
              <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6">
                <h2 className="text-2xl font-bold text-white mb-4">3D Plant Viewer</h2>
                <PlantViewer />
                <p className="text-white/60 text-sm mt-4 text-center">
                  Drag to rotate • Scroll to zoom
                </p>
              </div>
            )}

            {activeTab === 'media' && (
              <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6">
                <h2 className="text-2xl font-bold text-white mb-4">Media Gallery</h2>
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-emerald-600/30 to-green-700/30 rounded-xl h-64 flex items-center justify-center">
                    <span className="text-8xl">🌿</span>
                  </div>
                  <p className="text-white/60 text-center">
                    Images, videos, and audio files will be displayed here
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <NoteEditor plantId={plant.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
