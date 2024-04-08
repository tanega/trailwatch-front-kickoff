import DetailsContainer from "@/components/details/details-container";
import mockData from '@/mock-data-details.json';

export default function VesselDetailsPage() {
  const vesselDetails = mockData["vesselDetails"];

  return (
    <DetailsContainer details={vesselDetails} />
  );
}