import styled from 'styled-components';
import { IoConstruct } from 'react-icons/io5';

const Inpreparation = () => {
  return (
    <Container>
      <h2>
        <IoConstruct />
        This service is currently in preparation.
      </h2>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  height: 70vh;
  margin-top: 10vh;
  h2 {
    display: flex;
    justify-content: center;
    align-items: center;
    height: fit-content;
    font-size: 20px;
  }
  svg {
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }
`;

export default Inpreparation;
