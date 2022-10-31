import React, { useState } from "react";
import { OrderBookState } from "./atom/Atom";
import { TradeState } from "./atom/Atom";
import styled from "styled-components";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { CoinSymbol } from "./atom/Atom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import _ from "lodash";

const TradeOdd = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  padding-left: 10px;
  padding-right: 10px;
  height: 23px;
  color: #fa7661;
  background-color: black;
  &:hover {
    background-color: #5b2d3a;
  }
`;
const Flex = styled.div`
  display: flex;
`;
const TradeEven = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  padding-left: 10px;
  padding-right: 10px;
  height: 23px;
  color: #41b37d;
  background-color: black;
  &:hover {
    background-color: #275047;
  }
`;
const TradePrice = styled.div`
  display: flex;
  justify-content: center;
  font-size: 18px;
  padding-left: 10px;
  padding-right: 10px;
  height: 23px;
  color: white;
  background-color: black;
  &:hover {
    background-color: #275047;
  }
`;
const TradingPair2 = styled.div`
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  width: 200px;
`;
const LogoLetter = styled.div`
  font-size: 0.9 rem;
  cursor: pointer;
  &:hover {
    color: #4fff08;
  }
`;
const LogoLetter2 = styled.div`
  color: #aaa;
  cursor: pointer;
`;
const Wapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const OrderBook = () => {
  const order = useRecoilValue(OrderBookState);
  const trade = useRecoilValue(TradeState);
  const coinidx = useRecoilValue(CoinSymbol);

  React.useEffect(() => {
    // console.log("[DEBUG] OrderBook init", coinidx);
    // console.log(order);
  }, [order]);

  const renderaskSocket = () => {
    let index = _.findIndex(order, (o) => o.symbol === coinidx);
    if (index >= 0) {
      // console.log(order[index]);
      let asks = _.orderBy(order[index].asks, ["0"], ["desc"]);
      return (
        <>
          {asks.map((ask, idx) => {
            let color = idx % 2;
            return (
              <TradeOdd key={idx}>
                <TradingPair2>
                  <LogoLetter>
                    {parseFloat(ask[0]).toLocaleString()}
                  </LogoLetter>
                  <LogoLetter2>{ask[1]}</LogoLetter2>
                </TradingPair2>
              </TradeOdd>
            );
          })}
        </>
      );
    }
  };
  const renderbidSocket = () => {
    let index = _.findIndex(order, (o) => o.symbol === coinidx);
    if (index >= 0) {
      // console.log(order[index]);
      let bids = _.orderBy(order[index].bids, ["0"], ["desc"]);
      return (
        <>
          {bids.map((bid, idx) => {
            let color = idx % 2;
            return (
              <TradeEven key={idx}>
                <TradingPair2>
                  <LogoLetter>
                    {parseFloat(bid[0]).toLocaleString()}
                  </LogoLetter>
                  <LogoLetter2>{bid[1]}</LogoLetter2>
                </TradingPair2>
              </TradeEven>
            );
          })}
        </>
      );
    }
  };
  const renderPrice = () => {
    let index = _.findIndex(trade, (o) => o.symbol === coinidx);
    if (index >= 0) {
      // console.log(order[index]);
      let t = trade[index];
      let s = t.direction == 'minus' ? "rgb(215, 78, 90)" : "rgb(65, 179, 125)";
      let c = {color : s};
      return (
        <>
              <FontAwesomeIcon
                icon={t.direction == 'minus' ? faArrowDown : faArrowUp}
                color={t.direction == 'minus' ? "rgb(215, 78, 90)" : "rgb(65, 179, 125)"}
                style={{ fontSize: "18px" }}
              />
              <span style={c}>
                {t.price}
             </span>
        </>
      );
    }
  };
  // console.log(order, coinidx);
  return (
    <Wapper>
      <div
        style={{
          maxWidth: 300,
          height: 270,
          minWidth: 100,
          overflow: "hidden",
        }}
      >
        <>{renderaskSocket()}</>
      </div>
      <TradeOdd>
        <Flex>price</Flex>
        <Flex>sum</Flex>
      </TradeOdd>
      <TradePrice
        >
        <Flex>
        {renderPrice()}
        </Flex>
      </TradePrice>
      <TradeEven>
        <Flex>price</Flex>
        <Flex>sum</Flex>
      </TradeEven>
      <div
        style={{
          maxWidth: 300,
          height: 270,
          minWidth: 100,
          overflow: "hidden",
        }}
      >
        <>{renderbidSocket()}</>
      </div>
    </Wapper>
  );
};

export default OrderBook;
