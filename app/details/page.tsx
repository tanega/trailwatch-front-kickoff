import DetailsContainer from "@/components/details/details-container";
import BackNavigator from "@/components/ui/back-navigator";
import mockData from '@/mock-data-details.json';

export default function DetailsPage() {
  const ampDetails = mockData["ampDetails"];

  return (
    <div className="h-svh bg-color-2">
      <BackNavigator />
      <div className="pt-24 pl-20 pr-2">
        <DetailsContainer details={ampDetails} />
      </div>
    </div>
  );
}
