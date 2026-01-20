import { useParams } from 'react-router-dom';
import ImmersivePlantDetail from '../components/ImmersivePlantDetail';

export default function PlantDetailPage() {
  const { id } = useParams<{ id: string }>();

  // If we are on this page, 'back' means standard history back
  const handleBack = () => {
    window.history.back();
  };

  if (!id) return null;

  return (
    <ImmersivePlantDetail
      plantId={id}
      onBack={handleBack}
    />
  );
}
