import { useParams } from 'react-router-dom';
import PlantDetailView from '../components/PlantDetailView';

export default function PlantDetailPage() {
  const { id } = useParams<{ id: string }>();

  // If we are on this page, 'back' means standard history back
  const handleBack = () => {
    window.history.back();
  };

  if (!id) return null;

  return (
    <PlantDetailView
      plantId={id}
      onBack={handleBack}
      isOverlay={false}
    />
  );
}
