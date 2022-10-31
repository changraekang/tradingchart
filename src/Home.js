import React, { useEffect, useState } from "react";
import CoinList from "./CoinList";
import styled from "styled-components";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { CoinSymbol } from "./atom/Atom";
import { TradingViewStockChartWidget } from "react-tradingview-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
const Wapper = styled.div`
  display: flex;
  align-items: stretch;
  background-color: black;
  width: 100%;
  height: 100%;
`;
const TVCWapper2 = styled.div`
  display: flex;
  flex-direction: column;
  background-color: black;
  padding-left: 15px;
`;

const CoinWapper = styled.div`
  display: flex;
  align-items: stretch;
  background-color: black;
  width: 20%;
  height: 100%;
`;
const OrderWapper = styled.div`
  display: flex;
  background-color: black;
  width: 25%;
  height: 100%;
`;
const TVCWapper = styled.div`
  display: flex;
  background-color: black;
  height: 300px;
`;
const TVCbarWapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: black;
  height: 110px;
`;
const TVCbar = styled.div`
  display: flex;
`;
const TVCbarButton = styled.div`
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
  padding: 2px;
  margin: 5px;
  margin-right: 15px;
  &:hover {
    background-color: #131722;
    padding: 5px;
  }
`;
const AssetName = styled.div`
  font-size: 1.2rem;
  padding-left: 5px;
  color: white;
`;

const TVCbarUpper = styled.div`
  display: flex;
  height: 45px;
  justify-content: space-between;
  background-color: black;
`;
const TVCbarUpperRight = styled.div`
  display: flex;
  font-size: 11.52px;
  height: 20px;
  justify-content: space-between;
  background-color: black;
  color: #848e9c;
  border-bottom: 1px dashed #848e9c;
  padding-right: 15px;
`;
const TVCbarUpperRightDown = styled.div`
  display: flex;
  height: 25px;
  font-size: 11.52px;
  justify-content: space-between;
  background-color: black;
  color: #848e9c;
  padding-right: 15px;
`;
const TVCbarLower = styled.div`
  display: flex;
  justify-content: flex-start;
  background-color: black;
  height: 50px;
`;
const Flex = styled.div`
  display: flex;
  flex-direction: column;
  background-color: black;
`;

const Home = () => {
  const [coinidx, setCoinidx] = useRecoilState(CoinSymbol);
  return (
    <>
      <Wapper>
        <CoinWapper>
          <CoinList></CoinList>
        </CoinWapper>
        <TVCWapper2>
          <TVCbarWapper>
            <TVCbarUpper>
              <TVCbar>
                <AssetName>
                  {" "}
                  <FontAwesomeIcon icon={faBars} />
                </AssetName>
                <AssetName>{coinidx.split("USDT")[0]}</AssetName>
              </TVCbar>
              <TVCbar>
                <Flex>
                  <TVCbarUpperRight>최대포지션금액</TVCbarUpperRight>
                  <TVCbarUpperRightDown>USDT</TVCbarUpperRightDown>
                </Flex>
                <Flex style={{ width: 15 }}></Flex>
                <Flex>
                  <TVCbarUpperRight>펀딩비 / 8H</TVCbarUpperRight>
                  <TVCbarUpperRightDown>
                    <div style={{ color: "#ffcc00" }}>0.0054%</div>
                    <div style={{ color: "white" }}>1:00</div>
                  </TVCbarUpperRightDown>
                </Flex>
              </TVCbar>
            </TVCbarUpper>
            <TVCbarLower>
              <TVCbarButton>차트</TVCbarButton>
              <TVCbarButton>오픈포지션</TVCbarButton>
              <TVCbarButton>HOT 마켓</TVCbarButton>
              <TVCbarButton>거래종합</TVCbarButton>
              <TVCbarButton>거래내역</TVCbarButton>
            </TVCbarLower>
          </TVCbarWapper>
          <TVCWapper>
          <TradingViewStockChartWidget
        symbol={coinidx}
        interval="1"
        timezone="Asia/Seoul"
        theme="dark"
      />
          </TVCWapper>
        </TVCWapper2>
      </Wapper>
    </>
  );
};

export default Home;
