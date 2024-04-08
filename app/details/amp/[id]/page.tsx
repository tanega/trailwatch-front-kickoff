import DetailsContainer from "@/components/details/details-container";
import mockData from '@/mock-data-details.json';

export default function AmpDetailsPage() {
  const ampDetails = mockData["ampDetails"];

  return (
    <DetailsContainer details={ampDetails} />
  );
}