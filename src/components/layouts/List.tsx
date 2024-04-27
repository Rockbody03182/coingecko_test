import { useEffect, useState } from 'react';
import { virtualAssetList } from '../../apis/common/index';

interface Coin {
  id: string;
  symbol: string;
  name: string;
}

const List = () =>{
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [data, setData] = useState<Coin[]>([]);
  const [loadedItems, setLoadedItems] = useState<number>(50);

  const loadMoreItems = async (curPage: number) => {
    console.log(curPage);
    try {
      const newData = await virtualAssetList(curPage);
      console.log(newData);
      // setData(prevData => [...prevData, ...newData.slice(prevData.length, prevData.length + loadedItems)]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    loadMoreItems(currentPage);
  }, [currentPage])

  return (
    <>
    <div>
      <ul>
        {data.map((item, index) => (
          <li key={`list-key${item.id}`}>
            <ul >
              <li>{index + 1}. {item.id} {item.symbol} {item.name}</li>
            </ul>
          </li>
        ))}
      </ul>
      <button onClick={() => setCurrentPage(currentPage+1)}>Load More</button>
    </div>

    </>
  );
};

export default List;