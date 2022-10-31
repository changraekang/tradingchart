import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

const CoinLName = atom({
  key: "coinname", // unique ID (with respect to other atoms/selectors)
  default: "BTC", // default value (aka initial value)
  effects_UNSTABLE: [persistAtom],
});
const CoinSymbol = atom({
  key: "coinsymbol", // unique ID (with respect to other atoms/selectors)
  default: "BTCUSDT", // default value (aka initial value)
  effects_UNSTABLE: [persistAtom],
});
const CoinLastPrice = atom({
  key: "coinLastPrice", // unique ID (with respect to other atoms/selectors)
  default: 0, // default value (aka initial value)
  effects_UNSTABLE: [persistAtom],
});

const TradeState = atom({
  key: "trade", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
  effects_UNSTABLE: [persistAtom],
});

const OrderBookState = atom({
  key: "orderbook", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
  effects_UNSTABLE: [persistAtom],
});

export { CoinLName, CoinSymbol, TradeState, OrderBookState, CoinLastPrice };
