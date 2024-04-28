import axios from 'axios';
import { ListParams } from './interface';

export const virtualAssetList = async (params:ListParams) => {
  // 쿠키값 확인
  function getCookie(name: string){
    // 쿠키 이름 
    const cookieString = document.cookie;
    const cookies = cookieString.split('; ');
  
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const [cookieName, cookieValue] = cookie.split('=');
      if (cookieName === name) {
        return cookieValue;
      }
    }
    return null; // 해당 이름의 쿠키가 없을 경우 null 반환
  }

  const bookIds = getCookie('bookmarkIds'); // 쿠키에서 문자열을 가져옴
  const formattedIds = bookIds ? JSON.parse(bookIds).join(',') : ''; // 문자열을 배열로 파싱한 후 쉼표로 구분된 문자열로 변환
  
  try {
    
    if(params.path === '/bookmark'){
      // axios를 사용하여 GET 요청을 보냅니다.
      const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${params.vsCurrency}&ids=${formattedIds}&order=market_cap_desc&per_page=${params.perPage}&page=${params.currentPage}&sparkline=false&price_change_percentage=1h%2C24h%2C7d&locale=es&precision=7`);
      return response.data;
    }else{
      // axios를 사용하여 GET 요청을 보냅니다.
      const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${params.vsCurrency}&order=market_cap_desc&per_page=${params.perPage}&page=${params.currentPage}&sparkline=false&price_change_percentage=1h%2C24h%2C7d&locale=es&precision=7`);
      return response.data;
    }

  } catch (error) {
    console.error('Error fetching data:', error);
  }
};