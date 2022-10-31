import React, { useState } from "react";
import styled from "styled-components";
import Coin from "./CoinData/Coin";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { CoinSymbol, CoinLastPrice } from "./atom/Atom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faSort, faStar } from "@fortawesome/free-solid-svg-icons";

import _ from "lodash";
import axios from "axios";
const api_root = "https://fapi.binance.com";

const EXCHANGE_COLUMNS_STAR = "5%";
const EXCHANGE_COLUMNS_NAME = "40%";
const EXCHANGE_COLUMNS_CURRENTPRICE = "40%";
const EXCHANGE_COLUMNS_CHANGE = "40%";
const EXCHANGE_COLUMNS_VOLUME = "40%";

const CoinListWapper = styled.div`
  height: 800px;
  minwidth: 100px;
  overflow: auto;
  backgroundcolor: black;
  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: black;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #435075;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;
const TradingPairs = styled.div`
  flex: 1;
  overflow: auto
  &::-webkit-scrollbar {
    /* 세로 스크롤 넓이 */
    width: 8px;

    /* 가로 스크롤 높이 */
    height: 8px;

    border-radius: 6px;
    background: rgba(255, 255, 255, 0.4);
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 6px;
  }
`;
const TradingPair = styled.div`
  display: flex;
  padding: 8px 0px;
  cursor: pointer;
  width: 190px;
  background-color: black;
  color: white;
  &:hover {
    background-color: #252a44;
    border-left: 4px solid #ffcc00;
  }
`;
const TradingPair2 = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 8px 0px;
  cursor: pointer;
  border-bottom: 1px solid rgb(244, 244, 244);
  width: 200px;
`;
const TradingPair3 = styled.div`
  display: flex;
  cursor: pointer;
  flex-wrap: wrap;
  align-content: stretch;
`;

const Name = styled.div`
  display: flex;
  flex-direction: row;
  flex: 0 0 ${EXCHANGE_COLUMNS_NAME};
  padding: 0px 5px;
  width: 30%;
`;

const AssetName = styled.div`
  font-size: 12px;
  font-weight: bold;
`;

const AssetSymbol = styled.div`
  font-size: 11px;
  color: rgb(140, 140, 140);
  margin-top: 4px;
`;

const CurrentPrice = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 0.8rem;
  color: ${(props) =>
    props.rate < 0 ? "rgb(215, 78, 90)" : "rgb(65, 179, 125)"};
  width: ${EXCHANGE_COLUMNS_CURRENTPRICE};
`;
const CurrentPriceMinus = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 0.8rem;
  color: ${(props) =>
    props.rate < 0 ? "rgb(215, 78, 90)" : "rgb(65, 179, 125)"};
  width: ${EXCHANGE_COLUMNS_CURRENTPRICE};
`;
const Logo = styled.img`
  width: 50.5px;
  height: 27px;
  object-fit: contain;
  cursor: pointer;
`;

const Change = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 0.8rem;
  color: ${(props) =>
    props.rate < 0 ? "rgb(215, 78, 90)" : "rgb(65, 179, 125)"};
  width: ${EXCHANGE_COLUMNS_CHANGE};
  padding: 0px 5px;
`;

const Volume = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  font-size: 12px;
  font-weight: bold;
  width: ${EXCHANGE_COLUMNS_VOLUME};
  padding: 0px 5px;
  white-space: nowrap;
  word-break: keep-all;
  margin-left: 10px; //
`;
const LogoLetter = styled.div`
  font-size: 0.8rem;
  color: white;
  cursor: pointer;
`;
const Label = styled.div`
  display: flex;
  font-size: 11px;
  color: rgb(120, 120, 140);
  padding: 0px 5px;
  cursor: pointer;
`;
const LabelStar = styled(Label)`
  width: ${EXCHANGE_COLUMNS_STAR};
`;

const Input = styled.input`
  height: 30px;
  padding-left: 10px;
  width: 100%;
  border: 1px solid #252a44;
  border-radius: 4px;
  font-size: 1rem;
  background: #131722;
  color: #fff;
`;

const CoinList = () => {
  const [coinidx, setCoinidx] = useRecoilState(CoinSymbol);
  const [coinLastPrice, setCoinLastPrice] = useRecoilState(CoinLastPrice);
  const [marketList, setMarketList] = useState([]);
  const [isFavorites, setIsFavorites] = useState([]);
  const [search, setSearch] = useState("");

  React.useEffect(async () => {
    console.log("[DEBUG] CoinList init", coinidx);
    let url = api_root + "/fapi/v1/ticker/24hr";
    let market = await axios(url);
    console.log("[DEBUG] CoinList market", market.data.length);
    // console.log('[DEBUG] CoinList Coin', Coin);
    let market_data = [];
    let data = _.orderBy(market.data, ["symbol"], ["asc"]);
    for (let i = 0; i < data.length; i++) {
      if (
        data[i]["symbol"].includes("USDT") &&
        !data[i]["symbol"].includes("USDT_")
      ) {
        console.log(data[i]["symbol"], "api symbol");
        // console.log("[DEBUG] data[i]", i, data[i]);
        let c = {};
        c["name"] = data[i]["symbol"];
        c["isTop"] = true;
        let amount = data[i]["volume"] * 1;
        amount = amount / 1000000;
        amount = amount.toLocaleString() + " m";
        c["amount"] = amount;
        c["price"] = data[i]["lastPrice"];
        c["rate"] = data[i]["priceChangePercent"];
        market_data.push(c);
      }
    }
    let favorite = localStorage.getItem("favorites");
    if (favorite) {
      favorite = JSON.parse(favorite);
    } else {
      favorite = {
        favorites: [],
      };
    }
    setIsFavorites(favorite.favorites);

    setMarketList(market_data);
  }, []);

  const onClick = (name, price) => {
    setCoinidx(name);
    console.log(price, "선택가격");
    setCoinLastPrice(price);
    window.location.reload();
  };
  const onSearchChange = (e) => {
    setSearch(e.target.value.toUpperCase());
  };
  const onClickFavorite = (name) => {
    console.log(name, "좋아하는");

    let favorite = localStorage.getItem("favorites");
    if (favorite) {
      favorite = JSON.parse(favorite);
    } else {
      favorite = {
        favorites: [],
      };
    }

    if (favorite.favorites.includes(name)) {
      let index = favorite.favorites.indexOf(name);
      favorite.favorites.splice(index, 1);
    } else {
      favorite.favorites.push(name);
    }
    let result = JSON.stringify(favorite);
    localStorage.setItem("favorites", result);
    setIsFavorites(favorite.favorites);
  };
  return (
    <CoinListWapper>
      <TradingPair2>
        <Logo src="/Binance_Logo.png"></Logo>
        <LogoLetter>BINANCE 24H</LogoLetter>
      </TradingPair2>
      <TradingPair2>
        <Input
          placeholder="Search Symbol"
          value={search}
          onChange={onSearchChange}
        ></Input>
      </TradingPair2>
      <TradingPairs>
        {marketList.map(({ name, amount, price, rate, isTop, idx }) => {
          return (
            <>
              {isFavorites.includes(name) &&
              name.split("USDT")[0].includes(search) ? (
                <TradingPair>
                  <FontAwesomeIcon
                    icon={faStar}
                    color="yellow"
                    className={"favoriteStar"}
                    style={{ fontSize: "14px" }}
                    onClick={() => onClickFavorite(name)}
                  />
                  <TradingPair3 onClick={() => onClick(name, price)}>
                    <Name>
                      <AssetName>{name.split("USDT")[0]}</AssetName>
                    </Name>
                    <Volume>{amount} </Volume>
                    <Change rate={rate}>{rate} %</Change>
                    <CurrentPrice rate={rate}>{price}</CurrentPrice>
                  </TradingPair3>
                </TradingPair>
              ) : null}
            </>
          );
        })}
      </TradingPairs>
      <TradingPairs>
        {marketList.map(({ name, amount, price, rate, isTop, idx }) => {
          return (
            <>
              {!isFavorites.includes(name) &&
              name.split("USDT")[0].includes(search) ? (
                <TradingPair>
                  <FontAwesomeIcon
                    icon={faStar}
                    className={"favoriteStar"}
                    style={{ fontSize: "14px" }}
                    onClick={() => onClickFavorite(name)}
                  />
                  <TradingPair3 onClick={() => onClick(name, price)}>
                    <Name>
                      <AssetName>{name.split("USDT")[0]}</AssetName>
                    </Name>
                    <Volume>{amount} </Volume>
                    <Change rate={rate}>{rate} %</Change>
                    <CurrentPrice rate={rate}>{price}</CurrentPrice>
                  </TradingPair3>
                </TradingPair>
              ) : null}
            </>
          );
        })}
      </TradingPairs>
    </CoinListWapper>
  );
};

export default CoinList;
