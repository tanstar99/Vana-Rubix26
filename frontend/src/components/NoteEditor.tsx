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
    <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6">
      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <span>📝</span> Personal Notes
      </h3>

      {!isEditing && !existingNote ? (
        <button
          onClick={() => setIsEditing(true)}
          className="w-full py-3 px-4 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-200 rounded-lg border border-emerald-500/30 transition-all"
        >
          Add a note about this plant
        </button>
      ) : (
        <div className="space-y-4">
          {isEditing ? (
            <>
              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Write your notes here..."
                rows={5}
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-400 resize-none"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="flex-1 py-2 px-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-all"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="flex-1 py-2 px-4 bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/20 transition-all"
                >
                  Cancel
                </button>
                {existingNote && (
                  <button
                    onClick={handleDelete}
                    className="py-2 px-4 bg-red-500/20 hover:bg-red-500/30 text-red-200 rounded-lg border border-red-500/30 transition-all"
                  >
                    Delete
                  </button>
                )}
              </div>
            </>
          ) : (
            <>
              <p className="text-white/80 whitespace-pre-wrap">{existingNote?.text}</p>
              <div className="flex gap-2 text-xs text-white/50">
                <span>
                  Last updated: {new Date(existingNote!.updatedAt).toLocaleDateString()}
                </span>
              </div>
              <button
                onClick={() => setIsEditing(true)}
                className="w-full py-2 px-4 bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/20 transition-all"
              >
                Edit Note
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
