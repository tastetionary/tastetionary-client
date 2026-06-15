interface Props {
  tabList: string[];
  selectedTab: number;
  clickEvent: (value: number) => void;
}

export default function ButtonTab({ tabList, selectedTab, clickEvent }: Props) {
  return (
    <div className="flex w-full flex-wrap border-orange-o50">
      {tabList?.map((tab, i) => (
        <div className={`flex`} key={i} style={{ width: `${100 / tabList.length}%` }}>
          <div
            className={`button-tab body1 flex flex-grow cursor-pointer items-center justify-center py-13 ${selectedTab === i ? 'selected' : 'default'}`}
            onClick={() => clickEvent(i)}
          >
            {tab}
          </div>

          {i !== tabList?.length - 1 && <div className="h-[calc(100%+0.5px)] w-1 bg-neutral-bg20" />}
        </div>
      ))}
    </div>
  );
}
