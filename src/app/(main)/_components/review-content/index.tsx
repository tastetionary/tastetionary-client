export interface Reviews {
  address: string;
  name: string;
  summary: string;
}

export default function ReviewContent({ address, name, summary }: Reviews) {
  return (
    <div className="border-b border-solid border-neutral-bg20 pt-16 pb-20">
      <p className="title3 font-bold">{name}</p>
      <p className="body3 text-neutral-bg60">{address}</p>
      <p className="body2 text-neutral-bg80">{summary}</p>
    </div>
  );
}
