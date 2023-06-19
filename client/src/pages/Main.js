import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setNav, setFooter } from '../store/showComponentsSlice';
import styled from 'styled-components';
import backgroundImg from '../asset/main_bg.svg';

const Main = () => {
  const dispatch = useDispatch();
  // 처음 렌더링 될 때 Nav와 Footer 제거
  useEffect(() => {
    // dispatch(setNav(true));
    // dispatch(setFooter(true));
    dispatch(setNav(false));
    dispatch(setFooter(false));
  }, []);

  return (
    <MainContainer>
      <img src={backgroundImg} alt="background iamge" />
      <BannerContainer>
        <li className="orange">
          <svg aria-hidden="true" width="48" height="48" viewBox="0 0 48 48">
            <path
              d="M29.22 38.1a3.4 3.4 0 0 1 4.81-4.82l8.81 8.81a3.4 3.4 0 0 1-4.81 4.81l-8.81-8.8Z"
              opacity=".2"
            ></path>
            <path d="M18.5 5a1 1 0 1 0 0 2c.63 0 1.24.05 1.84.15a1 1 0 0 0 .32-1.98A13.6 13.6 0 0 0 18.5 5Zm7.02 1.97a1 1 0 1 0-1.04 1.7 11.5 11.5 0 0 1 5.44 8.45 1 1 0 0 0 1.98-.24 13.5 13.5 0 0 0-6.38-9.91ZM18.5 0a18.5 18.5 0 1 0 10.76 33.55c.16.57.46 1.12.9 1.57L40 44.94A3.5 3.5 0 1 0 44.94 40l-9.82-9.82c-.45-.45-1-.75-1.57-.9A18.5 18.5 0 0 0 18.5 0ZM2 18.5a16.5 16.5 0 1 1 33 0 16.5 16.5 0 0 1-33 0Zm29.58 15.2a1.5 1.5 0 1 1 2.12-2.12l9.83 9.83a1.5 1.5 0 1 1-2.12 2.12l-9.83-9.83Z"></path>
          </svg>
          <p>
            Find the best answer to your technical question, help others answer
            theirs
          </p>
          <div>Join the community</div>
        </li>
        <li className="blue">
          <svg aria-hidden="true" width="48" height="48" viewBox="0 0 48 48">
            <path
              d="M12 22a2 2 0 0 0-2 2v19a4 4 0 0 0 4 4h24a4 4 0 0 0 4-4V26a4 4 0 0 0-4-4H12Zm6 7a5 5 0 1 1 7.67 4.23l.05.35c.15.84.36 1.8.61 2.86A2.06 2.06 0 0 1 24.35 39h-2.7a2.06 2.06 0 0 1-1.98-2.56c.29-1.2.52-2.3.66-3.2l-.19-.14A5 5 0 0 1 18 29Z"
              opacity=".2"
            ></path>
            <path d="M23 24a5 5 0 0 0-2.86 9.1l.2.13c-.15.91-.38 2-.67 3.21A2.06 2.06 0 0 0 21.65 39h2.7c1.32 0 2.3-1.26 1.98-2.56a46.74 46.74 0 0 1-.6-2.86l-.06-.35A5 5 0 0 0 23 24Zm0 2a3 3 0 0 1 1.76 5.43l-.16.11a2 2 0 0 0-.91 2c.16.98.4 2.12.7 3.37.01.05-.02.09-.04.09h-2.7c-.02 0-.05-.04-.04-.09.3-1.25.54-2.4.7-3.36a2 2 0 0 0-.78-1.92l-.13-.09A3 3 0 0 1 23 26ZM12 12.44V18H9a3 3 0 0 0-3 3v21a3 3 0 0 0 3 3h28a3 3 0 0 0 3-3V21a3 3 0 0 0-3-3h-3v-5.56C34 6.2 29.36 1 23 1S12 6.19 12 12.44ZM23 3c5.14 0 9 4.18 9 9.44V18H14v-5.56C14 7.18 17.86 3 23 3ZM9 20h28a1 1 0 0 1 1 1v21a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V21a1 1 0 0 1 1-1Z"></path>
          </svg>
          <p>Want a secure, private space for your technical knowledge?</p>
          <div>Discover Teams</div>
        </li>
      </BannerContainer>
    </MainContainer>
  );
};

const MainContainer = styled.section`
  img {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    z-index: -1;
  }
`;

const BannerContainer = styled.ul`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  padding: 80px;
  li {
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
    max-width: 440px;
    margin: 16px;
    padding: 24px;
    /* border-radius: 7px; */
    &.orange {
      background-color: hsl(27, 95%, 90%);
      border-radius: 7px 7px 0 7px;
      /* hsl(27,90%,50%); */
      &::after {
        position: absolute;
        top: 99%;
        left: auto;
        right: 0;
        transform: scaleX(-1);
        display: block;
        content: '';
        width: 32px;
        height: 32px;
        clip-path: polygon(18px 0, 32px 0, 0 40px, 0 38px, 0 0, 18px 0);
        background-color: hsl(27, 95%, 90%);
        border-radius: 0 5px 0;
      }
    }
    &.blue {
      background-color: hsl(206, 96%, 90%);
      border-radius: 7px 7px 7px 0;
      /* hsl(206,100%,52%); */
      &::after {
        position: absolute;
        top: 99%;
        left: 0;
        display: block;
        content: '';
        width: 32px;
        height: 32px;
        clip-path: polygon(18px 0, 32px 0, 0 40px, 0 38px, 0 0, 18px 0);
        background-color: hsl(206, 96%, 90%);
        border-radius: 0 5px 0;
      }
    }
  }
`;

export default Main;
