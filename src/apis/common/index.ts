import axios from 'axios';
import { ListParams } from '../../components/layouts/List';

export const virtualAssetList = async (params:ListParams) => {
  try {
    // axios를 사용하여 GET 요청을 보냅니다.
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${params.vsCurrency}&order=market_cap_desc&per_page=${params.perPage}&page=${params.currentPage}&sparkline=false&price_change_percentage=1h%2C24h%2C7d&locale=es&precision=7`);

    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};