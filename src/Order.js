import React, { useEffect, useState } from "react";
import styled from "styled-components";
import _ from "lodash";
import { CoinSymbol, CoinLastPrice } from "./atom/Atom";
import { OrderBookState } from "./atom/Atom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
const Wapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  width: 300px;
`;
const OrderButton = styled.div`
  display: flex;
  width: 85px;
  height: 30px;
  justify-content: center;
  align-items: center;
  font-size: 0.8rem;
  border: 1px solid #252a44;
  border-radius: 4px;
  background-color: black;
  color: #eee;
  margin: 5px;
  margin-right: 15px;
  &:hover {
    background-color: #131722;
  }
`;
const OrderSelectButton = styled.div`
  display: flex;
  width: 85px;
  height: 30px;
  justify-content: center;
  align-items: center;
  font-size: 0.8rem;
  border: 1px solid #252a44;
  border-radius: 4px;
  background-color: #131722;
  color: #eee;
  padding: 5px;
  margin-right: 15px;
`;
const LoginButton = styled.div`
  display: flex;
  width: 185px;
  height: 30px;
  justify-content: center;
  align-items: center;
  font-size: 0.8rem;
  border: 1px solid #252a44;
  border-radius: 4px;
  background-color: black;
  color: #eee;
  margin: 5px;
  margin-right: 15px;
  &:hover {
    background-color: #131722;
  }
`;
const PriceButton = styled.div`
  display: flex;
  width: 80%;
  height: 30px;
  justify-content: center;
  align-items: center;
  font-size: 0.8rem;
  border: 1px solid #252a44;
  border-radius: 4px;
  background-color: black;
  color: #eee;
  margin: 5px;
  margin-right: 15px;
  &:hover {
    background-color: #131722;
  }
`;
const SignUpButton = styled.div`
  display: flex;
  width: 185px;
  height: 30px;
  justify-content: center;
  align-items: center;
  font-size: 0.8rem;
  border: 1px solid #252a44;
  border-radius: 4px;
  background-color: black;
  color: #eee;
  margin: 5px;
  margin-right: 15px;
  &:hover {
    background-color: #131722;
  }
`;
const OrderNumButton = styled.div`
  display: flex;
  width: 85px;
  height: 30px;
  justify-content: center;
  align-items: center;
  font-size: 0.8rem;
  border: 1px solid #252a44;
  border-radius: 4px;
  background-color: #131722;
  color: yellow;
  padding: 12px;
  margin: 5px;
  margin-right: 15px;
`;
const OrderUpbar = styled.div`
  display: flex;
  justify-content: flex-start;
  background-color: black;
  height: 50px;
`;
const OrderMiddleUpbar = styled.div`
  display: flex;
  height: 230px;
  flex-wrap: wrap;
  align-content: stretch;
  background-color: black;
  border: 1px solid #252a44;
`;
const OrderMiddleLowbar = styled.div`
  display: flex;
  height: 230px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: black;
`;
const Flex = styled.div`
  height: 30px;
  flex: 1 1 40%;
  font-size: 0.8rem;
  color: #848e9c;
`;
const Flex2 = styled.div`
  height: 30px;
  font-size: 0.8rem;
  color: #848e9c;
  margin: 5px;
`;
const LoginFlex = styled.div`
  font-size: 0.8rem;
  color: white;
  margin: 5px;
`;
const BuyFlex = styled.div`
  display: flex;
  height: 80px;
  width: 80%;
  margin: 5px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 0.8rem;
  color: #41b37d;
  background-color: black;
  border: 1px solid #41b37d;
`;
const SellFlex = styled.div`
  width: 80%;
  display: flex;
  height: 80px;
  margin: 5px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  color: #d74e5a;
  background-color: black;
  border: 1px solid #d74e5a;
`;
const PriceWapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  background-color: black;
  width: 300px;
`;
const Order = () => {
  const order = useRecoilValue(OrderBookState);
  const coinidx = useRecoilValue(CoinSymbol);
  const coinLastPrice = useRecoilValue(CoinLastPrice);
  const [buyPrice, setBuyPrice] = useState(0);
  const [sellPrice, setSellPrice] = useState(0);
  const [isSelect, setIsSelect] = useState(true);
  const [isMarket, setIsMarket] = useState(false);
  const [isStopMarket, setIsStopMarket] = useState(false);
  useEffect(() => {
    let index = _.findIndex(order, (o) => o.symbol === coinidx);
    if (index > 0) {
      // console.log(order[index]);
      let asks = _.orderBy(order[index].asks, ["0"], ["desc"]);
      let bids = _.orderBy(order[index].bids, ["0"], ["desc"]);
      if (asks[0]) {
        /**
         *
         */
        let buy = asks[0][0];
        if (buy) {
          setBuyPrice(buy);
        }
      }
      if (bids[0]) {
        /**
         *
         */
        let sell = bids[0][0];
        if (sell) {
          setSellPrice(sell);
        }
      }
    }
  }, [order]);
  const onClickSelect = () => {
    setIsSelect(true);
    setIsMarket(false);
    setIsStopMarket(false);
  };
  const onClickMarket = () => {
    setIsMarket(true);
    setIsSelect(false);
    setIsStopMarket(false);
  };
  const onClickStopMarket = () => {
    setIsStopMarket(true);
    setIsMarket(false);
    setIsSelect(false);
  };
  const renderSelect = () => {
    return (
      <PriceWapper>
        <BuyFlex>
          ????????? ????????????
          <PriceButton>{coinLastPrice}</PriceButton>
        </BuyFlex>
        <SellFlex>
          ????????? ????????????
          <PriceButton>{sellPrice}</PriceButton>
        </SellFlex>
      </PriceWapper>
    );
  };
  const renderMarketBuy = () => {};
  const renderMarket = () => {
    return (
      <PriceWapper>
        <BuyFlex>
          ????????? ????????????
          <PriceButton>{buyPrice}</PriceButton>
        </BuyFlex>
        <SellFlex>
          ????????? ????????????
          <PriceButton>{sellPrice}</PriceButton>
        </SellFlex>
      </PriceWapper>
    );
  };
  const renderStopMarket = () => {
    return (
      <PriceWapper>
        <BuyFlex>
          ????????? ????????????
          <PriceButton>{buyPrice}</PriceButton>
        </BuyFlex>
        <SellFlex>
          ????????? ????????????
          <PriceButton>{sellPrice}</PriceButton>
        </SellFlex>
      </PriceWapper>
    );
  };
  return (
    <Wapper>
      <OrderUpbar>
        <OrderButton>??????</OrderButton>
        <OrderButton>??????</OrderButton>
        <OrderNumButton>1X</OrderNumButton>
      </OrderUpbar>
      <OrderMiddleUpbar>
        <Flex>????????????</Flex>
        <Flex>???????????????</Flex>
        <Flex>0 %</Flex>
        <Flex>0 %</Flex>
        <Flex>??????????????????</Flex>
        <Flex>USDT</Flex>
        <Flex></Flex>
        <Flex></Flex>
        <Flex></Flex>
        <Flex></Flex>
        <Flex></Flex>
        <Flex></Flex>
      </OrderMiddleUpbar>
      <OrderUpbar>
        {!isSelect ? (
          <OrderButton onClick={onClickSelect}>?????????</OrderButton>
        ) : (
          <OrderSelectButton onClick={onClickSelect}>?????????</OrderSelectButton>
        )}
        {!isMarket ? (
          <OrderButton onClick={onClickMarket}>?????????</OrderButton>
        ) : (
          <OrderSelectButton onClick={onClickMarket}>?????????</OrderSelectButton>
        )}
        {!isStopMarket ? (
          <OrderButton onClick={onClickStopMarket}>?????? ??????</OrderButton>
        ) : (
          <OrderSelectButton onClick={onClickStopMarket}>
            ?????? ??????
          </OrderSelectButton>
        )}
      </OrderUpbar>
      {isSelect && renderSelect()}
      {isMarket && renderMarket()}
      {isStopMarket && renderStopMarket()}
      <OrderMiddleLowbar>
        <Flex2>
          CoinRF.com?????? ???????????? Binance Futures??? ????????? ????????? ??????????????? !
        </Flex2>
        <LoginFlex>???????????? ????????? ?????????</LoginFlex>
        <LoginButton>????????? ??????</LoginButton>
        <LoginFlex>?????? ????????? ?????????????</LoginFlex>
        <SignUpButton>???????????? ??????</SignUpButton>
      </OrderMiddleLowbar>
    </Wapper>
  );
};

export default Order;
