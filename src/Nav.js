import React from "react";
import styled from "styled-components";

const NavContainer = styled.nav`
  top: 0;
  left: 0;
  right: 0;
  z-index: 1001;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 6.0625rem;
  padding-right: 30px;
  padding-left: 30px;
  background-color: black;
  box-sizing: border-box;
  width: 100%;
  font-weight: "bold";
  font-family: "DoHyeon-Regular";
`;
//border-bottom: 1px solid #d3d3d3; 네브바 하단줄

const NavWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LeftSide = styled.div`
  display: flex;
  align-items: center;
  text-decoration: none;
`;

const Logo = styled.img`
  height: 55px;
  object-fit: contain;
  cursor: pointer;
`;

const LogoLetter = styled.div`
  font-weight: bold;
  color: black;
  margin-right: 40px;
  cursor: pointer;
`;

const LeftSideLink = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  font-size: 0.9375rem;
  cursor: pointer;
  color: white;
  height: 6.0625rem;
`;
/* 호버시 색반전
 */
const LeftSideLinkHover = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  font-size: 0.9375rem;
  cursor: pointer;
  color: white;
  height: 6.0625rem;
  text-decoration: none;
  &:hover {
    color: #02a2e0;
  }
`;
const Line = styled.div`
  list-style: none;
  text-decoration: none;
  font-family: sans-serif;
  font-weight: bold;
  font-size: 0.9rem;
`;

const Lineli = styled.ul`
  position: relative;
  display: inline-block;
  margin: 0 20px;
  height: 40px;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
`;

const LineInside = styled.li`
  position: absolute;
  content: "";
  display: block;
  border-bottom: 3px solid #000;
  transition: all 250ms ease-out;
  left: 50%;
  width: 0;
  &:hover {
    background-color: white;
  }
`;

const RightSide = styled.div`
  display: flex;
  align-items: center;
`;

const RightSideLink = styled.div`
  margin-left: 20px;
  font-size: 0.9375rem;
  color: white;
  cursor: pointer;
  &:hover {
    color: #02a2e0;
  }
`;

const Select = styled.select`
  margin-left: 30px;
  font-size: 0.9375rem;
  background-color: #d3d3d3;
  background-color: #02215e;
  color: white;
  border: 0;
`;

const DropdownContainer = styled.div`
  position: absolute;
  left: 0;
  top: "6.0625rem";
`;

const DropdownAnchor = styled.a`
  color: white;
  text-decoration: none;
  &:hover {
    color: white;
    text-decoration: none;
  }
`;

const DropdownMenu = styled.div`
  display: flex;
  align-items: center;
  padding-left: 16px;
  height: 45px;
  width: 140px;
  background-color: rgb(40, 40, 40);
  &:hover {
    background-color: rgb(55, 55, 55);
    font-weight: bold;
  }
`;

const ImageContainer = styled.div`
  margin-left: 3px;
`;

const Image = styled.img``;

const Linker = styled.a`
  &:hover {
    text-decoration: none;
  }
`;

const Nav = () => {
  return (
    <>
      <NavContainer>
        <NavWrapper>
          <LeftSide>
            <LeftSideLink>
              <LeftSide>KANGBIT</LeftSide>
            </LeftSideLink>
            <LeftSideLinkHover>
              <LeftSide>Markets</LeftSide>
            </LeftSideLinkHover>
            <LeftSideLinkHover>
              <LeftSide>Trade</LeftSide>
            </LeftSideLinkHover>
            <LeftSideLinkHover>
              <LeftSide>Trade Support</LeftSide>
            </LeftSideLinkHover>
            <LeftSideLinkHover>
              <LeftSide>Information</LeftSide>
            </LeftSideLinkHover>
          </LeftSide>
          <RightSide>
            <RightSideLink>
              <RightSide>Log in</RightSide>
            </RightSideLink>
            <RightSideLink>
              <RightSide>Register</RightSide>
            </RightSideLink>
          </RightSide>
        </NavWrapper>
      </NavContainer>
    </>
  );
};

export default Nav;
