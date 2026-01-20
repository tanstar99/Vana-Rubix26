import { useState, useEffect } from 'react';
import { Plant } from '../types';
import BookmarkButton from './BookmarkButton';
import NoteEditor from './NoteEditor';
import PlantViewer from '../three/PlantViewer';

interface PlantDetailViewProps {
    plantId: string;
    onBack: () => void;
    isOverlay?: boolean;
}

export default function PlantDetailView({ plantId, onBack, isOverlay = false }: PlantDetailViewProps) {
    const [plant, setPlant] = useState<Plant | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'info' | '3d' | 'media'>('info');

    useEffect(() => {
        fetch('/plants.json')
            .then((res) => res.json())
            .then((data: Plant[]) => {
                const foundPlant = data.find((p) => p.id === plantId);
                setPlant(foundPlant || null);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error loading plant:', err);
                setLoading(false);
            });
    }, [plantId]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onBack();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onBack]);

    if (loading) {
        return (
            <div className={`flex items-center justify-center ${isOverlay ? 'h-full w-full rounded-3xl' : 'min-h-screen'} bg-black text-white`}>
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-t-2 border-emerald-500 rounded-full animate-spin"></div>
                    <span className="text-zinc-400 font-medium tracking-wide">Loading Experience...</span>
                </div>
            </div>
        );
    }

    if (!plant) {
        return (
            <div className={`flex items-center justify-center ${isOverlay ? 'h-full w-full rounded-3xl' : 'min-h-screen'} bg-black`}>
                <div className="text-center space-y-6">
                    <h1 className="text-4xl font-bold text-white tracking-tight">Plant not found</h1>
                    <button
                        onClick={onBack}
                        className="px-8 py-3 bg-white text-black rounded-full font-semibold hover:bg-zinc-200 transition-colors"
                    >
                        Return to Garden
                    </button>
                </div>
            </div>
        );
    }

    const containerClasses = isOverlay
        ? "absolute inset-0 z-50 overflow-y-auto bg-black/95 backdrop-blur-xl"
        : "min-h-screen bg-black";

    return (
        <div className={`${containerClasses} text-white font-sans selection:bg-emerald-500/30`}>
            {/* Sticky Navigation Bar */}
            <div className="sticky top-0 z-40 w-full bg-black/80 backdrop-blur-md border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <button
                        onClick={onBack}
                        className="group flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors"
                    >
                        <span className="w-8 h-8 flex items-center justify-center rounded-full bg-zinc-900 group-hover:bg-zinc-800 transition-colors">
                            ←
                        </span>
                        <span>Back to Garden</span>
                    </button>

                    <div className="flex items-center gap-4">
                        <span className="hidden md:block text-sm font-semibold text-zinc-500 uppercase tracking-widest">{plant.scientificName}</span>
                        <div className="scale-90">
                            <BookmarkButton plantId={plant.id} />
                        </div>
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-6 pb-24 pt-12">
                {/* Hero Section */}
                <div className="flex flex-col md:flex-row gap-12 items-start justify-between mb-20 animate-fade-in-up">
                    <div className="max-w-3xl">
                        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white mb-6 leading-tight">
                            {plant.commonName}
                        </h1>
                        <p className="text-2xl md:text-3xl text-zinc-400 leading-relaxed font-light">
                            {plant.descriptionFull}
                        </p>

                        <div className="flex flex-wrap gap-3 mt-8">
                            {plant.localNames.map((name) => (
                                <span key={name} className="px-4 py-2 rounded-full border border-zinc-800 text-zinc-400 text-sm">
                                    {name}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Compact Ayush Tags */}
                    <div className="flex flex-wrap md:flex-col gap-3 md:items-end">
                        {plant.ayushSystems.map((system) => (
                            <span key={system} className="px-5 py-2 bg-emerald-900/30 text-emerald-400 border border-emerald-900/50 rounded-full text-sm font-medium">
                                {system}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Floating Tabs */}
                <div className="sticky top-24 z-30 flex justify-center mb-16 px-4 pointer-events-none">
                    <div className="flex flex-wrap justify-center items-center gap-3 md:gap-6 pointer-events-auto">
                        {(['info', '3d', 'media'] as const).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-8 py-3 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 backdrop-blur-xl border ${activeTab === tab
                                        ? 'bg-white text-black border-white shadow-[0_0_30px_rgba(255,255,255,0.2)] scale-110 z-10'
                                        : 'bg-zinc-900/80 text-zinc-400 border-white/10 hover:bg-zinc-800 hover:text-white hover:border-white/20 hover:scale-105'
                                    }`}
                            >
                                {tab === 'info' && 'Overview'}
                                {tab === '3d' && '3D View'}
                                {tab === 'media' && 'Gallery'}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content Area - Bento Grid Style */}
                <div className="min-h-[50vh] transition-opacity duration-500 ease-in-out">
                    {activeTab === 'info' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                            {/* Medicinal Properties - Featured Card */}
                            <div className="lg:col-span-2 bg-zinc-900/50 border border-white/5 p-8 rounded-3xl hover:bg-zinc-900 transition-colors">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400">✨</div>
                                    <h3 className="text-xl font-semibold text-white">Medicinal Properties</h3>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {plant.medicinalProperties.map((prop) => (
                                        <span key={prop} className="px-4 py-2 bg-zinc-800 text-zinc-300 rounded-xl text-sm border border-zinc-700">
                                            {prop}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Dosage - Compact Card */}
                            <div className="bg-zinc-900/50 border border-white/5 p-8 rounded-3xl hover:bg-zinc-900 transition-colors">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">📊</div>
                                    <h3 className="text-xl font-semibold text-white">Dosage</h3>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
                                        <span className="text-zinc-500">Form</span>
                                        <span className="text-white font-medium">{plant.dosage.form}</span>
                                    </div>
                                    <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
                                        <span className="text-zinc-500">Amount</span>
                                        <span className="text-white font-medium">{plant.dosage.amount}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-zinc-500">Freq</span>
                                        <span className="text-white font-medium">{plant.dosage.frequency}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Therapeutic Uses - Tall Card */}
                            <div className="row-span-2 lg:col-span-1 bg-gradient-to-br from-emerald-900/20 to-zinc-900 border border-white/5 p-8 rounded-3xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -mr-16 -mt-16 transition-all group-hover:bg-emerald-500/20"></div>
                                <div className="relative z-10">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400">❤️</div>
                                        <h3 className="text-xl font-semibold text-white">Therapeutics</h3>
                                    </div>
                                    <div className="space-y-6">
                                        {plant.therapeuticUses.map((use, idx) => (
                                            <div key={idx} className="relative pl-6 before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-emerald-500">
                                                <h4 className="text-lg font-medium text-emerald-100 mb-1">{use.condition}</h4>
                                                <p className="text-zinc-400 text-sm leading-relaxed">{use.benefit}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Parts Used */}
                            <div className="bg-zinc-900/50 border border-white/5 p-8 rounded-3xl hover:bg-zinc-900 transition-colors">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-orange-500/20 rounded-lg text-orange-400">🌱</div>
                                    <h3 className="text-xl font-semibold text-white">Parts Used</h3>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {plant.partsUsed.map((part) => (
                                        <span key={part} className="px-3 py-1 bg-zinc-800 text-zinc-300 rounded-lg text-sm capitalize">
                                            {part}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Cultivation */}
                            <div className="bg-zinc-900/50 border border-white/5 p-8 rounded-3xl hover:bg-zinc-900 transition-colors">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-amber-500/20 rounded-lg text-amber-400">🌾</div>
                                    <h3 className="text-xl font-semibold text-white">Cultivation</h3>
                                </div>
                                <div className="space-y-3 text-sm">
                                    <p><span className="text-zinc-500 block mb-1">Soil</span> <span className="text-zinc-300">{plant.cultivation.soil}</span></p>
                                    <p><span className="text-zinc-500 block mb-1">Climate</span> <span className="text-zinc-300">{plant.cultivation.climate}</span></p>
                                </div>
                            </div>

                            {/* Precautions - Warning Style */}
                            <div className="lg:col-span-2 bg-red-900/10 border border-red-500/20 p-8 rounded-3xl">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-red-500/20 rounded-lg text-red-400">⚠️</div>
                                    <h3 className="text-xl font-semibold text-red-100">Precautions</h3>
                                </div>
                                <ul className="grid md:grid-cols-2 gap-4">
                                    {plant.precautions.map((precaution, idx) => (
                                        <li key={idx} className="flex gap-3 text-zinc-400">
                                            <span className="text-red-500 mt-1">•</span>
                                            <span>{precaution}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Habitat */}
                            <div className="bg-zinc-900/50 border border-white/5 p-8 rounded-3xl hover:bg-zinc-900 transition-colors">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-cyan-500/20 rounded-lg text-cyan-400">🌍</div>
                                    <h3 className="text-xl font-semibold text-white">Habitat</h3>
                                </div>
                                <div className="space-y-3 text-sm">
                                    <p><span className="text-zinc-500 block mb-1">Region</span> <span className="text-zinc-300">{plant.habitat.region}</span></p>
                                    <p><span className="text-zinc-500 block mb-1">Origin</span> <span className="text-zinc-300">{plant.habitat.origin}</span></p>
                                </div>
                            </div>

                            {/* Note Editor - Taking up space naturally */}
                            <div className="lg:col-span-2 bg-zinc-900/50 border border-white/5 rounded-3xl p-1 overflow-hidden">
                                <NoteEditor plantId={plant.id} />
                            </div>

                        </div>
                    )}

                    {activeTab === '3d' && (
                        <div className="h-[70vh] w-full bg-zinc-900 rounded-3xl overflow-hidden border border-white/5 relative">
                            <PlantViewer />
                            <div className="absolute bottom-8 left-0 right-0 text-center pointer-events-none">
                                <span className="bg-black/50 backdrop-blur-md px-4 py-2 rounded-full text-zinc-400 text-sm">
                                    Interactive 3D View • Drag to Rotate
                                </span>
                            </div>
                        </div>
                    )}

                    {activeTab === 'media' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="aspect-video bg-zinc-900 rounded-3xl flex flex-col items-center justify-center border border-white/5 group cursor-pointer hover:border-emerald-500/50 transition-colors">
                                <span className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">📸</span>
                                <span className="text-zinc-500 font-medium">Image Gallery</span>
                            </div>
                            <div className="aspect-video bg-zinc-900 rounded-3xl flex flex-col items-center justify-center border border-white/5 group cursor-pointer hover:border-emerald-500/50 transition-colors">
                                <span className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">▶️</span>
                                <span className="text-zinc-500 font-medium">Watch Videos</span>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
