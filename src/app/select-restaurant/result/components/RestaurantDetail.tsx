'use client';

import { useSelectResultStore } from '@/store/useSelectResultStore';

export default function RestaurantDetail() {
  const { restaurant } = useSelectResultStore();

  const priceList = Object.fromEntries(
    Object.entries(restaurant?.review?.aggregatePrice ?? {}).filter(([key]) => key !== 'avg')
  );

  const maxPriceText: { [key: string]: string } = {
    '10,000원 미만': '~10,000',
    '10,000원 이상 ~ 13,0000원 미만': '10,000~13,000',
    '13,000원 이상 ~ 16,000원 미만': '13,000~16,000',
    '16,000원 이상 ~ 20,000원 미만': '16,000~20,000',
    '20,000원 이상': '20,000~',
  };

  return (
    <div className="border-b-1 border-t-1 border-solid border-neutral-bg20 px-xl py-lg">
      <div className="flex w-full items-center justify-between">
        <div className="title2 whitespace-pre-line break-keep font-bold">메뉴 가격대</div>
      </div>

      <table className="mt-md w-full table-auto border-collapse border-1 border-solid border-neutral-bg40">
        <thead>
          <tr>
            {Object.keys(priceList)?.map((price, i) => {
              const parts = maxPriceText[price].split('~');

              return (
                <th
                  className="body2 content-center border border-solid border-neutral-bg40 bg-neutral-bg05 px-4 py-10 text-center"
                  key={i}
                >
                  {[parts[0].trim(), '~', parts[1].trim()]?.map((p, index) => {
                    if (!p || p === '') return <div className="h-[22.4px] w-full" key={index} />;

                    return (
                      <div className="body2" key={1000 + index}>
                        {p}
                      </div>
                    );
                  })}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          <tr>
            {Object.values(priceList)?.map((price, i) => (
              <td key={i} className="body2 border border-solid border-neutral-bg40 px-4 py-10 text-center font-bold">
                {price ?? 0}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
