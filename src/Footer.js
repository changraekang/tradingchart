import React from "react";
import styled from "styled-components";

const FooterContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: black;
  height: 200px;
  width: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
`;

const ContentWrapper = styled.div`
  flex: 1 1 auto;
  display: flex;
  justify-content: space-around;
`;


const InformationPart = styled.div`
  color: white;
  font-size: 13px;
  line-height: 2;
`;

const SiteMapGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 40px;
`;

const Sites = styled.div`
  line-height: 1.5;
`;

const Site = styled.div`
  font-size: 13px;
  cursor: pointer;
  text-decoration: none;
  color: white;
  line-height: 2;
`;

const Footer = () => {
  return (
    <>
      <FooterContainer>
          <ContentWrapper>
              <InformationPart>
                <div>회사명 : (주) </div>
                <div>대표이사 : </div>
                <div>사업자등록번호 : </div>
                <div>고객문의 : </div>
                <div>상장 및 제휴 문의 : </div>
                <div>서울시 </div>
              </InformationPart>
              <SiteMapGroup>
                <Sites>
                  <Site>회사소개</Site>
                  <Site>이용약관</Site>
                  <Site>이용안내</Site>
                  <Site>개인정보처리방침</Site>
                </Sites>
              </SiteMapGroup>
              <SiteMapGroup>
                <Sites>
                  <Site>공지사항</Site>
                  <Site>자주하는 질문</Site>
                </Sites>
              </SiteMapGroup>
          </ContentWrapper>
      </FooterContainer>
    </>
  );
};

export default Footer;
