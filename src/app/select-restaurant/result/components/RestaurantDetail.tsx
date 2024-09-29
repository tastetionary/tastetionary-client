'use client';

import DefaultButton from '@/components/Button/DefaultButton';
import { useSelectResultStore } from '@/store/useSelectResultStore';

export default function RestaurantDetail() {
  const { restaurant } = useSelectResultStore();

  const priceList = ['~10,000', '10,000~13,000', '13,000~16,000', '16,000~20,000', '20,000~'];

  return (
    <div className="pb-[120px]">
      <div className="py-lg">
        <div className="title2 font-bold">대표 키워드</div>

        <div className="mt-md flex flex-wrap gap-[12px] py-xxs">
          {restaurant?.review?.keywords?.map((k, i) => (
            <DefaultButton key={i} bgColor="gray" customStyle="py-xxs px-13">
              <span className="body1">{k}</span>
            </DefaultButton>
          ))}
        </div>
      </div>

      <div className="py-lg">
        <div className="flex w-full items-center justify-between">
          <div className="title2 font-bold">메뉴 가격대</div>

          <span className="title2">13,000원 이상 ~ 16,000원 미만</span>
        </div>

        <table className="mt-md w-full table-auto border-collapse border-1 border-solid border-neutral-bg40">
          <thead>
            <tr>
              {priceList?.map((price, i) => {
                const parts = price.split('~');

                return (
                  <th
                    className="body2 border border-solid border-neutral-bg40 bg-neutral-bg05 px-4 py-10 text-center"
                    key={i}
                  >
                    {[parts[0] === '' ? '' : parts[0].trim(), '~', parts[1] === undefined ? '' : parts[1].trim()]?.map(
                      p => <div className="body2">{p}</div>
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="body2 border border-solid border-neutral-bg40 px-4 py-10 text-center font-bold">0</td>
              <td className="body2 border border-solid border-neutral-bg40 px-4 py-10 text-center font-bold">0</td>
              <td className="body2 border border-solid border-neutral-bg40 px-4 py-10 text-center font-bold">0</td>
              <td className="body2 border border-solid border-neutral-bg40 px-4 py-10 text-center font-bold">0</td>
              <td className="body2 border border-solid border-neutral-bg40 px-4 py-10 text-center font-bold">0</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
