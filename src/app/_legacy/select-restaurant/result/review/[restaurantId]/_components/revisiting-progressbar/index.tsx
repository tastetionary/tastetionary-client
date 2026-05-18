import { Line } from 'rc-progress';

interface Props {
  name: string;
  cnt: number;
  percent: number;
}

export default function RevisitingProgressbar({ name, cnt, percent }: Props) {
  if (percent === 0) return <></>;

  return (
    <div className="relative mb-8">
      <div className="flex items-center justify-center">
        <Line
          strokeColor={'#fff8e1'}
          trailColor={'#edeff1'}
          percent={percent}
          style={{
            height: 32,
          }}
        />
      </div>
      <div className="px-10">
        <span className="absolute left-10 top-10 font-normal text-primary-y80">{name}</span>
        <span className="absolute right-10 top-10">{cnt}</span>
      </div>
      <div
        style={{
          width: `${percent + 0.5}%`,
        }}
        className="z-1000 absolute top-0 h-32 border-1 border-solid border-primary-y50"
      ></div>
    </div>
  );
}
