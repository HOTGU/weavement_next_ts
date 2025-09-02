const StatsCard = ({
  title,
  value,
  subtitle,
}: {
  title: string;
  value: string;
  subtitle: string;
}) => (
  <div className="w-full aspect-[679/320] rounded bg-neutral-900 p-10 flex flex-col justify-between">
    <div className="flex items-center gap-4">
      <div className=" text-3xl font-bold">{title}</div>
    </div>
    <div className="flex justify-between">
      <div className=" text-5xl text-neutral-400">{value}</div>
      <div className=" text-xl font-light font-ibm text-neutral-400 self-end">
        {subtitle}
      </div>
    </div>
  </div>
);
export default StatsCard;
