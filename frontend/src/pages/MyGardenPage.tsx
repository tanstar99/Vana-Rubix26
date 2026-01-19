import { Link } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { usePlants } from '../hooks/usePlants';

export default function MyGardenPage() {
  const { bookmarks, notes, removeBookmark, getNote, removeNote } = useAppStore();
  const { plants, loading } = usePlants();

  const bookmarkedPlants = plants.filter((plant) => bookmarks.includes(plant.id));

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-green-900 to-emerald-950 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-pulse" style={{ filter: 'drop-shadow(0 0 20px rgba(139, 92, 246, 0.8))' }}>⭐</div>
          <div className="text-2xl bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent font-semibold">Loading your garden...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-green-900 to-emerald-950 pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 font-['Cinzel']">
            ⭐ My Garden
          </h1>
          <p className="text-xl text-emerald-200">
            Your bookmarked plants and personal notes
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8 max-w-2xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 text-center">
            <div className="text-4xl font-bold text-emerald-400 mb-2">{bookmarks.length}</div>
            <div className="text-emerald-200">Bookmarked Plants</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 text-center">
            <div className="text-4xl font-bold text-emerald-400 mb-2">{notes.length}</div>
            <div className="text-emerald-200">Personal Notes</div>
          </div>
        </div>

        {/* Bookmarked Plants */}
        {bookmarkedPlants.length === 0 ? (
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-12 border border-white/20 text-center">
            <div className="text-6xl mb-4">🌿</div>
            <h3 className="text-2xl font-bold text-white mb-2">No bookmarks yet</h3>
            <p className="text-emerald-200 mb-6">
              Start exploring plants and bookmark the ones you find interesting
            </p>
            <Link
              to="/plants"
              className="inline-block px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl transition-all"
            >
              Explore Plants
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {bookmarkedPlants.map((plant) => {
              const note = getNote(plant.id);
              return (
                <div
                  key={plant.id}
                  className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl border border-white/20 p-6 hover:border-emerald-400/50 transition-all"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Plant Icon */}
                    <div className="flex-shrink-0">
                      <div className="w-24 h-24 bg-gradient-to-br from-emerald-600/30 to-green-700/30 rounded-xl flex items-center justify-center">
                        <span className="text-5xl">🌿</span>
                      </div>
                    </div>

                    {/* Plant Info */}
                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-1">
                            {plant.commonName}
                          </h3>
                          <p className="text-emerald-300 italic">{plant.scientificName}</p>
                        </div>
                        <button
                          onClick={() => removeBookmark(plant.id)}
                          className="text-yellow-400 hover:text-yellow-500 text-2xl transition-colors"
                          title="Remove bookmark"
                        >
                          ★
                        </button>
                      </div>

                      <p className="text-white/80 mb-4">{plant.descriptionShort}</p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {plant.tags.slice(0, 4).map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-emerald-500/20 text-emerald-200 text-xs rounded-full border border-emerald-500/30"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Note Section */}
                      {note && (
                        <div className="bg-white/5 rounded-xl p-4 mb-4 border border-white/10">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="text-sm font-semibold text-emerald-300">📝 Your Note</h4>
                            <button
                              onClick={() => removeNote(plant.id)}
                              className="text-red-400 hover:text-red-300 text-xs transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                          <p className="text-white/80 text-sm whitespace-pre-wrap">{note.text}</p>
                          <p className="text-white/40 text-xs mt-2">
                            Updated: {new Date(note.updatedAt).toLocaleDateString()}
                          </p>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex gap-3">
                        <Link
                          to={`/plant/${plant.id}`}
                          className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-all font-semibold"
                        >
                          View Details
                        </Link>
                        <Link
                          to={`/garden`}
                          className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/20 transition-all"
                        >
                          View in Garden
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
