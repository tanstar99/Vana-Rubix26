import { useState, useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';

interface NoteEditorProps {
  plantId: string;
}

export default function NoteEditor({ plantId }: NoteEditorProps) {
  const { getNote, addNote, updateNote, removeNote } = useAppStore();
  const existingNote = getNote(plantId);
  const [noteText, setNoteText] = useState(existingNote?.text || '');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setNoteText(existingNote?.text || '');
  }, [existingNote]);

  const handleSave = () => {
    if (noteText.trim()) {
      if (existingNote) {
        updateNote(plantId, noteText);
      } else {
        addNote(plantId, noteText);
      }
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    removeNote(plantId);
    setNoteText('');
    setIsEditing(false);
  };

  const handleCancel = () => {
    setNoteText(existingNote?.text || '');
    setIsEditing(false);
  };

  return (
    <div className="h-full flex flex-col p-8">
      <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
        <span className="p-2 bg-yellow-500/20 rounded-lg text-yellow-400 text-base">📝</span>
        Personal Notes
      </h3>

      {!isEditing && !existingNote ? (
        <div className="flex-1 flex items-center justify-center">
          <button
            onClick={() => setIsEditing(true)}
            className="w-full py-4 px-4 bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-2xl border border-zinc-700 border-dashed transition-all flex flex-col items-center gap-2 group"
          >
            <span className="text-2xl group-hover:scale-110 transition-transform">✍️</span>
            <span>Add a personal note</span>
          </button>
        </div>
      ) : (
        <div className="space-y-4 flex-1 flex flex-col">
          {isEditing ? (
            <>
              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Write your observations..."
                className="w-full flex-1 px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-2xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/20 resize-none min-h-[120px]"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="flex-1 py-2 px-4 bg-white text-black hover:bg-zinc-200 rounded-full font-semibold transition-all"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="flex-1 py-2 px-4 bg-zinc-800 hover:bg-zinc-700 text-white rounded-full border border-zinc-600 transition-all"
                >
                  Cancel
                </button>
                {existingNote && (
                  <button
                    onClick={handleDelete}
                    className="py-2 px-4 bg-red-900/20 hover:bg-red-900/40 text-red-400 rounded-full border border-red-900/30 transition-all"
                  >
                    Delete
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col">
              <div className="flex-1 bg-zinc-800/30 rounded-2xl p-4 mb-4 border border-zinc-700/50">
                <p className="text-zinc-300 whitespace-pre-wrap leading-relaxed">{existingNote?.text}</p>
              </div>

              <div className="flex items-center justify-between mt-auto">
                <span className="text-xs text-zinc-600 font-medium">
                  Edited {new Date(existingNote!.updatedAt).toLocaleDateString()}
                </span>
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white text-sm rounded-full border border-zinc-600 transition-all"
                >
                  Edit
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
