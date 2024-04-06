import { Item } from "@/types/item";
import ListItem from "@/components/ui/list-item";

type Props = {
  title: string;
  items: Item[];
  enableViewDetails?: boolean;
};

export default function ListCard({ title, items, enableViewDetails }: Props) {
  enableViewDetails = enableViewDetails ?? false;

  return (
    <div className="min-h-50 pl-5 pr-10 pt-2 bg-color-2 rounded">
      <div className="block uppercase font-semibold text-xs text-white mb-3">{title}</div>
      
      {items.map((item) => <ListItem item={item} key={item.id} enableViewDetails={enableViewDetails} />)}      
    </div>
  );
}