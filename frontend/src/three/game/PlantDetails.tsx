import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { X, Leaf } from 'lucide-react';
import { plantsData } from './plantsData';


interface PlantDetailsProps {
    plantName: string | null;
    onClose: () => void;
}

export default function PlantDetails({ plantName, onClose }: PlantDetailsProps) {
    const [data, setData] = useState<{ content: string; loading: boolean }>({ content: '', loading: true });

    useEffect(() => {
        if (plantName && plantsData[plantName]) {
            setData({
                content: `
# ${plantsData[plantName].name} (${plantsData[plantName].sanskritName})

**Role in AYUSH:** ${plantsData[plantName].role}

**Home Remedy:** ${plantsData[plantName].remedy}

${plantsData[plantName].description}
                `,
                loading: false
            });
        } else if (plantName) {
            setData({ content: 'Plant details not found in ancient scrolls.', loading: false });
        }
    }, [plantName]);

    if (!plantName) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="relative w-full max-w-2xl bg-slate-900/90 border border-emerald-500/50 rounded-2xl p-6 shadow-2xl shadow-emerald-500/20 text-emerald-100 overflow-hidden">
                <button
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors"
                    onClick={onClose}
                >
                    <X size={24} className="text-emerald-400" />
                </button>

                <h2 className="text-3xl font-bold mb-6 text-emerald-300 font-serif border-b border-emerald-500/30 pb-2">
                    {plantName}
                </h2>

                <div className="max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
                    {data.loading ? (
                        <div className="flex flex-col items-center justify-center py-12">
                            <Leaf className="animate-spin text-emerald-500 mb-4" size={48} />
                            <p className="text-emerald-400 animate-pulse">Consulting the ancient texts...</p>
                        </div>
                    ) : (
                        <div className="prose prose-invert prose-emerald max-w-none">
                            <ReactMarkdown>{data.content}</ReactMarkdown>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
