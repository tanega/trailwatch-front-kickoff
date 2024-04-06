
type Props = {
  title: string;
  kpiValue: number;
  kpiUnit?: string;
  totalValue: number;
  totalUnit?: string;
};

export default function KPICard(props: Props) {
  let { title, kpiValue, kpiUnit, totalUnit, totalValue } = props;
  kpiUnit = kpiUnit ?? "";
  totalUnit = totalUnit ?? "";

  return (
    <div className="container h-24 w-full pl-3 pt-3 bg-color-1 rounded">
      <div className="block font-bold uppercase text-xxs mb-4">{title}</div>
      <div className="inline font-bold uppercase text-4xl">{`${kpiValue}`}</div>
      <div className="inline font-bold uppercase text-base ml-2">{`${kpiUnit}`} / {`${totalValue} ${totalUnit}`}</div>
    </div>
  );
}