import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { menuIdxSlice } from '../../store/menuIdxSlice';
import { IoMenuSharp, IoCloseSharp } from 'react-icons/io5';
import styled from 'styled-components';
import ToggleNav from './ToggleNav';
import logo from '../../asset/logo.png';

const Header = () => {
  const [showNav, setShowNav] = useState(false);
  const dispatch = useDispatch();

  return (
    <HeaderContainer>
      <HeaderWrapper>
        {showNav && <ToggleNav setShowNav={setShowNav} />}
        <FlexLeft>
          {/* TODO: 로그인 상태값에 따른 숨김 처리 필요 */}
          <button onClick={() => setShowNav((prev) => !prev)}>
            {!showNav && <IoMenuSharp className="hamburger" />}
            {showNav && <IoCloseSharp className="close" />}
          </button>
          <Link
            to="/"
            onClick={() => {
              setShowNav(false);
              dispatch(menuIdxSlice.actions.idx(0));
            }}
          >
            <img src={logo} alt="stackoverflow logo" />
          </Link>
        </FlexLeft>

        <FlexRight>
          {/* TODO: 로그인 상태값에 따른 변경 필요 */}
          <Link to="/user/login" onClick={() => setShowNav(false)}>
            <BorderBtn>Log in</BorderBtn>
          </Link>
          <Link to="/user/join" onClick={() => setShowNav(false)}>
            <BlueBtn>Sign up</BlueBtn>
          </Link>
          {/* 로그인 후 버튼 */}
          {/* <Link
            to="/user/:member-id/:username"
            onClick={() => setShowNav(false)}
          >
            <BorderBtn>Mypage</BorderBtn>
          </Link>
          <Link to="/logout" onClick={() => setShowNav(false)}>
            <BlueBtn>Log out</BlueBtn>
          </Link> */}
        </FlexRight>
      </HeaderWrapper>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 56px;
  z-index: 10;
  border-top: 3px solid var(--orange);
  border-bottom: 1px solid hsl(210, 8%, 85%);
  background-color: #ffffff;
  .hamburger,
  .close {
    width: 24px;
    height: 24px;
  }
`;

const HeaderWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
`;

const FlexLeft = styled.div`
  display: flex;
  align-items: center;
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 52px;
    padding: 0 15px;
    cursor: pointer;
    &:hover {
      background-color: var(--menu-hover-background);
    }
  }
  a {
    display: flex;
    align-items: center;
    width: 166px;
    height: 52px;
    padding: 0 8px;
    &:hover {
      background-color: var(--menu-hover-background);
    }
  }
`;

const FlexRight = styled.div`
  display: flex;
  align-items: center;
`;

const BorderBtn = styled.span`
  margin-right: 4px;
  padding: 8px 10px;
  background-color: #e1ecf4;
  border: 1px solid #39739d;
  border-radius: 3px;
  color: #39739d;
  font-size: 13px;
  &:hover {
    background-color: hsl(205, 57%, 81%);
    color: hsl(205, 46%, 32%);
  }
`;

const BlueBtn = styled.span`
  margin-right: 15px;
  padding: 8px 10px;
  background-color: var(--bright-blue);
  border: 1px solid var(--bright-blue);
  border-radius: 3px;
  color: #ffffff;
  font-size: 13px;
  &:hover {
    background-color: var(--dark-blue);
  }
`;

export default Header;
