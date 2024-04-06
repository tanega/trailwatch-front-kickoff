'use client';

import { Item } from "@/types/item";
import Button from "./button";
import { useRouter } from 'next/navigation'

type Props = {
  item: Item;
  enableViewDetails?: boolean;
}

export default function ListItem({ item, enableViewDetails }: Props) {
  const router = useRouter();
  const { title, description, value } = item;
  let showViewDetailsButton = !!enableViewDetails;

  const onClickView = () => {
    router.push("/details"); // TODO: change redirect logic to be SSR + with variables 
  }

  return (
    <div className="flex my-1.5">
      <div className="flex w-full border-b-1 border-color-5">
        <div className="w-full pb-1">
          <div className="text-xxs text-white">{title}</div>
          <div className="text-xxxs text-color-4">{description}</div>
        </div>
        <div className="block text-sm text-white">{value}</div>
      </div>
      <div className="flex inline ml-6">
        {showViewDetailsButton && (
          <Button
            title="View"
            withArrowIcon
            onClick={onClickView}
          />
        )}
      </div>
    </div>
  );
}
