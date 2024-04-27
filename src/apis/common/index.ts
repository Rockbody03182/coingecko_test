// import { ApiCaller } from '../../common/helpers/axios';

// // 가상 화페 리스트 정보
// export const virtualAssetList = async () => {
//   try{
//     const response = await ApiCaller.get(
//       `https://api.coingecko.com/api/v3/coins/list`,
//       {},
//       true,
//     );
//     console.log(response);
//     return response.data;
//   }catch (error){
//     if(error instanceof Error){
//       throw new Error(`Error fetching data: ${error.message}`)
//     }
//   }
// };
// CoinGecko API의 엔드포인트 URL

import axios from 'axios';
import { ListParams } from '../../components/layouts/List';
// const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d&locale=ko&precision=7';
// API를 호출하는 함수
export const virtualAssetList = async (params:ListParams) => {
  try {
    // axios를 사용하여 GET 요청을 보냅니다.
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${params.perPage}&page=${params.currentPage}&sparkline=false&price_change_percentage=1h%2C24h%2C7d&locale=ko&precision=7`);

    // 응답 데이터는 response.data에 있습니다.
    // console.log(response.data);
    return response.data;
  } catch (error) {
    // 오류가 발생할 경우 처리합니다.
    console.error('Error fetching data:', error);
  }
};