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
      className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${bookmarked
          ? 'bg-white text-black shadow-lg scale-105'
          : 'bg-transparent border border-zinc-600 text-zinc-300 hover:border-white hover:text-white'
        } ${className}`}
    >
      <span className="text-lg">{bookmarked ? '★' : '☆'}</span>
      <span>{bookmarked ? 'Saved' : 'Save'}</span>
    </button>
  );
}
