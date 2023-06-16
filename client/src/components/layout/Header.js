import { FaBars } from 'react-icons/fa';
import styled from 'styled-components';
// import logo from '../../asset/logo.png';

const Header = () => {
  return (
    <HeaderContainer>
      <HeaderWrapper>
        <FlexLeft>
          <button>
            <FaBars />
          </button>
          {/* <img src={logo} alt="" /> */}
        </FlexLeft>
        <FlexRight></FlexRight>
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
  border-top: 4px solid var(--orange);
  background-color: beige;
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
`;

const FlexLeft = styled.div`
  button {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const FlexRight = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 1280px;
`;

export default Header;
