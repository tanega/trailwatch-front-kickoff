import { ItemDetails } from "@/types/item";
import ListCard from "@/components/ui/list-card";

type Props = {
  details: ItemDetails
}

export default function DetailsContainer({ details }: Props) {
  const { label, description, relatedItemsType, relatedItems } = details;

  return (
    <div className="flex grid grid-cols-5 gap-x-32">
      <div className="col-span-2">
        <div className="text-3xl font-semibold text-white mb-5">{label}</div>
        <div className="block text-xs font-light text-white leading-relaxed text-justify">{description}</div>
      </div>
      <div className="col-span-3">
        <ListCard title={relatedItemsType} items={relatedItems} />
      </div>
    </div>
  );
}
