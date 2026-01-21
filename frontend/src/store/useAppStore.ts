import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Note {
  plantId: string;
  text: string;
  updatedAt: string;
}

interface AppState {
  // User
  userId: string;

  // Bookmarks & Notes
  bookmarks: string[];
  notes: Note[];

  // Tours
  selectedTourId: string | null;

  // Filters
  searchQuery: string;
  selectedAyushSystems: string[];
  selectedDiseaseCategories: string[];
  selectedPartsUsed: string[];
  selectedRegion: string;
  playerPosition: [number, number, number];

  // Actions
  setPlayerPosition: (position: [number, number, number]) => void;
  addBookmark: (plantId: string) => void;
  removeBookmark: (plantId: string) => void;
  toggleBookmark: (plantId: string) => void;
  isBookmarked: (plantId: string) => boolean;

  addNote: (plantId: string, text: string) => void;
  updateNote: (plantId: string, text: string) => void;
  removeNote: (plantId: string) => void;
  getNote: (plantId: string) => Note | undefined;

  setSelectedTourId: (tourId: string | null) => void;

  setSearchQuery: (query: string) => void;
  setSelectedAyushSystems: (systems: string[]) => void;
  setSelectedDiseaseCategories: (categories: string[]) => void;
  setSelectedPartsUsed: (parts: string[]) => void;
  setSelectedRegion: (region: string) => void;
  clearFilters: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      userId: crypto.randomUUID(),
      bookmarks: [],
      notes: [],
      selectedTourId: null,
      searchQuery: '',
      selectedAyushSystems: [],
      selectedDiseaseCategories: [],
      selectedPartsUsed: [],
      selectedRegion: '',
      playerPosition: [0, 2, 12],

      // Bookmark actions
      addBookmark: (plantId) =>
        set((state) => ({
          bookmarks: [...state.bookmarks, plantId],
        })),

      removeBookmark: (plantId) =>
        set((state) => ({
          bookmarks: state.bookmarks.filter((id) => id !== plantId),
        })),

      toggleBookmark: (plantId) => {
        const { bookmarks } = get();
        if (bookmarks.includes(plantId)) {
          get().removeBookmark(plantId);
        } else {
          get().addBookmark(plantId);
        }
      },

      isBookmarked: (plantId) => get().bookmarks.includes(plantId),

      // Player actions
      setPlayerPosition: (position) => set({ playerPosition: position }),

      // Note actions
      addNote: (plantId, text) =>
        set((state) => ({
          notes: [
            ...state.notes,
            { plantId, text, updatedAt: new Date().toISOString() },
          ],
        })),

      updateNote: (plantId, text) =>
        set((state) => ({
          notes: state.notes.map((note) =>
            note.plantId === plantId
              ? { ...note, text, updatedAt: new Date().toISOString() }
              : note
          ),
        })),

      removeNote: (plantId) =>
        set((state) => ({
          notes: state.notes.filter((note) => note.plantId !== plantId),
        })),

      getNote: (plantId) => get().notes.find((note) => note.plantId === plantId),

      // Tour actions
      setSelectedTourId: (tourId) => set({ selectedTourId: tourId }),

      // Filter actions
      setSearchQuery: (query) => set({ searchQuery: query }),
      setSelectedAyushSystems: (systems) => set({ selectedAyushSystems: systems }),
      setSelectedDiseaseCategories: (categories) => set({ selectedDiseaseCategories: categories }),
      setSelectedPartsUsed: (parts) => set({ selectedPartsUsed: parts }),
      setSelectedRegion: (region) => set({ selectedRegion: region }),
      clearFilters: () =>
        set({
          searchQuery: '',
          selectedAyushSystems: [],
          selectedDiseaseCategories: [],
          selectedPartsUsed: [],
          selectedRegion: '',
        }),
    }),
    {
      name: 'herbal-garden-storage',
    }
  )
);