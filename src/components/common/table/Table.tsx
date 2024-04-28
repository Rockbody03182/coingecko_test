
import { Coin, ListParams } from "../../../apis/common/interface";
import { bookmarkStore } from "../../../common/states/Coins.store";

type Props = {
  item: Coin;
  handleBookmarkClick: (id:string) => void;
  params : ListParams;
}

export default function Table({item, handleBookmarkClick, params}: Props){
  const {bookmarkIds} = bookmarkStore();
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
    const formattedValue =
      value > 0 ? (
        <span style={{ color: 'red' }}>+{value.toFixed(2)}%</span>
      ) : (
        isInteger ? <span style={{ color: 'blue' }}>{value}%</span> 
        : <span style={{ color: 'blue' }}>{value.toFixed(2)}%</span>
      );
    return formattedValue;
  };

  return (
    <>
      <ul className="thead">
        <li>
          <span
            className={`star ${bookmarkIds.includes(item.id) ? 'star-active' : ''}`}
            onClick={() => handleBookmarkClick(item.id)}
          ></span> {item.name}
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
    </>
  )
}