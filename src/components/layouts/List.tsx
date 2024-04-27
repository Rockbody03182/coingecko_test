import { useEffect, useState } from 'react';
import { virtualAssetList } from '../../apis/common/index';
import { v4 as uuidv4 } from 'uuid';

interface Coin {
  id: string;
  symbol: string;
  name: string;
}
export interface ListParams {
  currentPage : number;
  perPage : number;
}

export default function List() {
  const uuid = uuidv4()  // UUID 생성
  const [params, setParams] = useState<ListParams>({
    currentPage:1, // 현재 페이지
    perPage:50 // 페이지당 보여지는 갯수
  })

  const [data, setData] = useState<Coin[]>([]);

  const loadMoreItems = async () => {
    console.log(params.currentPage);
    try {
      const newData = await virtualAssetList(params);
      console.log(newData);
      setData(prevData => [...prevData, ...newData]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    loadMoreItems();
  }, [params])

  return (
    <>
    <div>
      <ul>
        {data.map((item, index) => (
          <li key={`list-key${uuid}`}>
            <ul >
              <li>{index + 1}. {item.id} {item.symbol} {item.name}</li>
            </ul>
          </li>
        ))}
      </ul>
      <button onClick={() => setParams({currentPage: params.currentPage+1, perPage: params.perPage})}>Load More</button>
    </div>

    </>
  );
};
