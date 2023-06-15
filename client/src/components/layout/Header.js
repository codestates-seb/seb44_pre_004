import styled from 'styled-components';

const Header = () => {
  return <HeaderContainer>Header</HeaderContainer>;
};

const HeaderContainer = styled.header`
  position: fixed;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  width: 100%;
  max-width: 1280px;
  height: 56px;
  background-color: beige;
`;

export default Header;
