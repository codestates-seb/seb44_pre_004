import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { FaGhost, FaHome, FaUndoAlt } from 'react-icons/fa';

import { setNav, setFooter } from '../store/showComponentsSlice';

const NotFound = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // 처음 렌더링 될 때 Nav와 Footer 제거
  useEffect(() => {
    dispatch(setNav(false));
    dispatch(setFooter(false));
  }, []);

  return (
    <NotFoundContainer>
      <Contents>
        <FaGhost />
        <h1>Wrong Entry :(</h1>
        <BtnArea>
          <Link to="/">
            <FaHome />
            Main
          </Link>
          <button onClick={() => navigate(-1)}>
            <FaUndoAlt />
            Back
          </button>
        </BtnArea>
      </Contents>
    </NotFoundContainer>
  );
};

const NotFoundContainer = styled.section`
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  /* align-items: center; */
  width: 100vw;
  height: 100%;
  background-color: hsl(210, 8%, 95%);
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 250px;
  > svg {
    width: 50px;
    height: 50px;
    color: var(--orange);
  }
  h1 {
    margin: 40px 0;
    font-size: 36px;
  }
`;

const BtnArea = styled.div`
  display: flex;
  a {
    display: flex;
    align-items: center;
    margin-right: 40px;
    font-size: 16px;
  }
  svg {
    width: 20px;
    height: 20px;
    margin-right: 8px;
  }
  button {
    display: flex;
    align-items: center;
    font-size: 16px;
    cursor: pointer;
  }
`;

export default NotFound;
