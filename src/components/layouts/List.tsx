import { ChangeEvent, useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { virtualAssetList } from '../../apis/common/index';
import {bookmarkStore} from '../../common/states/Coins.store';
import Table from '../common/table/Table';
import { Coin, ListParams } from '../../apis/common/interface';
import { useLocation } from 'react-router-dom';

export default function List() {
  const location = useLocation();
  const [bookId, setBookId] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [listData, setListData] = useState<Coin[]>([]); // list 변수를 listData로 변경
  const queryClient = useQueryClient();
  const {bookmarkIds, setBookmarkIds} = bookmarkStore(); // 여러 개의 북마크 아이디를 저장하는 상태로 변경
  const [params, setParams] = useState<ListParams>({
    path: location.pathname, 
    vsCurrency: 'krw',
    currentPage:1, // 현재 페이지
    perPage:50 // 페이지당 보여지는 갯수
  })

  // 쿠키생성
  function setCookie(name: string, value: string, days: number) {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
  }

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
      const cookieBookmarkIds = document.cookie.replace(/(?:(?:^|.*;\s*)bookmarkIds\s*=\s*([^;]*).*$)|^.*$/, '$1');
      if (cookieBookmarkIds) {
        const parsedBookmarkIds = JSON.parse(cookieBookmarkIds);
        setBookmarkIds(parsedBookmarkIds);
      }
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
    if(name !== 'site'){
      setParams(prevParams => ({
        ...prevParams,
        [name]: value
      }));
    }
  };

  // 북마크추가
  const handleBookmarkClick = (name: string) => {
    setBookId(name)

    // 북마크 아이디 목록에 이미 존재하는지 확인
    const isAlreadyBookmarked = bookmarkIds.includes(name);

    // 이미 북마크된 경우 제외하고, 아닌 경우 추가
    const updatedBookmarkIds = isAlreadyBookmarked
      ? bookmarkIds.filter((bookId) => bookId !== name)
      : [...bookmarkIds, name];

    // 업데이트된 북마크 아이디 목록을 설정
    setBookmarkIds(updatedBookmarkIds);

    // 북마크가 추가되었음을 알리는 토스트 메시지를 표시
    setShowToast(true);

    // 쿠키에 북마크 정보를 저장
    setCookie('bookmarkIds', JSON.stringify(updatedBookmarkIds), 30);

    // 3초 후에 토스트 메시지 종료
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
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
              <Table
                item={item}
                handleBookmarkClick={handleBookmarkClick}
                params={params}
              />
            </div>
          ))
        )}
      </div>

      {/* 토스트 메시지 */}
      {showToast && (<div className="toast">북마크가 추가되었습니다 {bookId}</div>)}
      
      {/* 더보기 버튼 */}
      {listData.length >= params.perPage && 
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
      }
    </div>

    </>
  );
};
