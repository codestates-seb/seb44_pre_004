import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import axios from 'axios';
import { HiExternalLink } from 'react-icons/hi';
import styled from 'styled-components';

import { setNav, setFooter } from '../store/showComponentsSlice';
import { logout } from '../store/userSlice';
import logo from '../asset/logo.png';

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // 처음 렌더링 될 때 Nav와 Footer 제거
  useEffect(() => {
    dispatch(setNav(false));
    dispatch(setFooter(false));
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('persist:root');
    dispatch(logout());
    navigate('/');
  };

  return (
    <LogoutContainer>
      <LogoutBox>
        <img src={logo} alt="logo" />
        <ul>
          <li>
            <HiExternalLink />
            <a href="askubuntu.com">askubuntu.com</a>
          </li>
          <li>
            <HiExternalLink />
            <a href="mathoverflow.net">mathoverflow.net</a>
          </li>
          <li>
            <HiExternalLink />
            <a href="serverfault.com">serverfault.com</a>
          </li>
          <li>
            <HiExternalLink />
            <a href="stackapps.com">stackapps.com</a>
          </li>
          <li>
            <HiExternalLink />
            <a href="stackexchange.com">stackexchange.com</a>
          </li>
          <li>
            <HiExternalLink />
            <a href="stackoverflow.com">stackoverflow.com</a>
          </li>
          <li>
            <HiExternalLink />
            <a href="superuser.com">superuser.com</a>
          </li>
        </ul>
        <div>
          <BlueBtn onClick={handleLogout}>Log out</BlueBtn>
          <WhiteBtn onClick={() => navigate(-1)}>Cancel</WhiteBtn>
        </div>
        <p>
          If you’re on a shared computer, remember to log out of your Open ID
          provider (Facebook, Google, Stack Exchange, etc.) as well.
        </p>
      </LogoutBox>
    </LogoutContainer>
  );
};

const LogoutContainer = styled.section`
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100%;
  background-color: hsl(210, 8%, 95%);
`;

const LogoutBox = styled.div`
  width: 312px;
  padding: 24px;
  background-color: #ffffff;
  box-shadow: 0 10px 24px hsla(0, 0%, 0%, 0.05),
    0 20px 48px hsla(0, 0%, 0%, 0.05), 0 1px 4px hsla(0, 0%, 0%, 0.1);
  border-radius: 7px;

  > img {
    display: block;
    width: 50%;
    margin: 0 auto 20px;
  }
  ul {
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid hsl(210, 8%, 85%);
  }
  li {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    font-size: 15px;
    svg {
      color: var(--grey);
    }
    a {
      margin-left: 5px;
      color: var(--dark-blue);
    }
  }
  p {
    margin-top: 20px;
    font-size: 12px;
    color: var(--grey);
  }
`;

const WhiteBtn = styled.button`
  padding: 8px;
  font-size: 13px;
  font-weight: 500;
  color: var(--bright-blue);
  cursor: pointer;
`;

const BlueBtn = styled.button`
  margin-right: 15px;
  padding: 8px 10px;
  background-color: var(--bright-blue);
  border: 1px solid var(--bright-blue);
  border-radius: 3px;
  color: #ffffff;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    background-color: var(--dark-blue);
  }
`;

export default Logout;
