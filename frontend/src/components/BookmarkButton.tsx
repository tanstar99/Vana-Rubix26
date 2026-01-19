import { useAppStore } from '../store/useAppStore';

interface BookmarkButtonProps {
  plantId: string;
  className?: string;
}

export default function BookmarkButton({ plantId, className = '' }: BookmarkButtonProps) {
  const { isBookmarked, toggleBookmark } = useAppStore();
  const bookmarked = isBookmarked(plantId);

  return (
    <button
      onClick={() => toggleBookmark(plantId)}
      className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
        bookmarked
          ? 'bg-gradient-to-r from-yellow-500 to-amber-500 text-white shadow-lg hover:shadow-xl hover:shadow-yellow-500/50'
          : 'bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20'
      } ${className}`}
    >
      <span className="flex items-center gap-2">
        <span className="text-xl">{bookmarked ? '★' : '☆'}</span>
        {bookmarked ? 'Bookmarked' : 'Bookmark'}
      </span>
    </button>
  );
}
