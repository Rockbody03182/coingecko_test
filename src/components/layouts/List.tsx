import { ChangeEvent, useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { virtualAssetList } from '../../apis/common/index';

interface Coin {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_1h_in_currency: number;
  price_change_percentage_24h_in_currency: number;
  price_change_percentage_7d_in_currency: number;
  market_cap_change_24h: number;
}
export interface ListParams {
  vsCurrency: string;
  currentPage : number;
  perPage : number;
}

export default function List() {
  const [bookId, setBookId] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [params, setParams] = useState<ListParams>({
    vsCurrency: 'krw',
    currentPage:1, // 현재 페이지
    perPage:50 // 페이지당 보여지는 갯수
  })

  const [listData, setListData] = useState<Coin[]>([]); // list 변수를 listData로 변경

  const queryClient = useQueryClient();

  const { data: newData = [], isLoading, isError } = useQuery<Coin[], Error>(
    ['virtualAssetList', params],
    () => virtualAssetList(params),
    { 
      keepPreviousData: true,
      staleTime: 1000 * 60 * 1,  
      retry: 10, 
      onError: (error) => {
        console.log(error);
      },
    }
  );

  useEffect(() => {
    if (newData.length > 0) {
      console.log(newData.length);
      setListData(prevListData => [...prevListData, ...newData]);
    }
  }, [newData]);

  useEffect(() => {
    queryClient.invalidateQueries(['virtualAssetList']); // 쿼리 키를 배열로 감싸서 전달
  }, [params, queryClient]);

  // select 요소의 변경
  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setListData([]);
    const { name, value } = event.target;
    console.log(`...name ${name}`);
    console.log(`...value ${value}`);
    if(name !== 'site'){
      setParams(prevParams => ({
        ...prevParams,
        [name]: value
      }));
    }
  };

  // 금액 단위 변환
  const formatCurrency = (value: number) => {
    const formattedValue = new Intl.NumberFormat('en-US', {
      maximumFractionDigits: value % 1 === 0 ? 0 : 2,
    }).format(value);
    return formattedValue.replace(/\.00$/, '');
  };

  // 퍼센트 단위 변환
  const formatPercentage = (value: number) => {
    if (isNaN(value) || value === null) {
      return '-';
    }
    const isInteger = Number.isInteger(value);
    console.log(value);
    const formattedValue =
      value > 0 ? (
        <span style={{ color: 'red' }}>+{value.toFixed(2)}%</span>
      ) : (
        isInteger ? <span style={{ color: 'blue' }}>{value}%</span> 
        : <span style={{ color: 'blue' }}>{value.toFixed(2)}%</span>
      );
    return formattedValue;
  };

  // 북마크추가
  const handleBookmarkClick = (name: string) => {
    setBookId(name)
    // 북마크가 추가되었다는 토스트 메시지를 띄웁니다.
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000); // 3초 후에 토스트 메시지를 숨깁니다.
  };

  return (
    <>
      <div className='select-wrap'>
        <select name="site"  defaultValue="" onChange={handleSelectChange}>
          <option value="virtual">전체 보기</option>
          <option value="bookmark">북마크 보기</option>
        </select>
        <select name="vsCurrency"  defaultValue="krw" onChange={handleSelectChange}>
          <option value="krw">KRW 보기</option>
          <option value="usd">USD 보기</option>
        </select>
        <select name="perPage"  defaultValue="50" onChange={handleSelectChange}>
          <option value="10">10</option>
          <option value="30">30</option>
          <option value="50">50</option>
        </select>
      </div>
    <div>
      <ul className="thead">
        <li>자산</li>
        <li>심볼</li>
        <li>Price</li>
        <li>1H</li>
        <li>24H</li>
        <li>7D</li>
        <li>24H Volume</li>
      </ul>
      <div>
        {isLoading || isError? (
          <p style={{height:'500px', display:'flex', alignItems:'center', justifyContent: 'center'}}>로딩 중...</p>
        ) :  (
          listData.map((item, index) => (
            <div key={`list-key-${index}`}>
               <ul className="thead">
                  <li>
                    <span className="star" onClick={() => handleBookmarkClick(item.id)}></span> {item.name}
                  </li>
                  <li>{item.symbol}</li>
                  <li>
                    {params.vsCurrency === 'krw' ? '₩' : '$'}
                    {formatCurrency(item.current_price)}
                  </li>
                  <li>{formatPercentage(item.price_change_percentage_1h_in_currency)}</li>
                  <li>{formatPercentage(item.price_change_percentage_24h_in_currency)}</li>
                  <li>{formatPercentage(item.price_change_percentage_7d_in_currency)}</li>
                  <li>
                    {params.vsCurrency === 'krw' ? '₩' : '$'}
                    {formatCurrency(item.market_cap_change_24h)}
                  </li>
                </ul>
            </div>
          ))
        )}
      </div>
      {/* 토스트 메시지 */}
      {showToast && (
        <div className="toast">
          북마크가 추가되었습니다 {bookId}
        </div>
      )}
      <button
        className="viewmore"
        onClick={() =>
          setParams(prevParams => ({
            ...prevParams,
            currentPage: prevParams.currentPage + 1
          }))
        }
        >
        + 더보기
      </button>
    </div>

    </>
  );
};
