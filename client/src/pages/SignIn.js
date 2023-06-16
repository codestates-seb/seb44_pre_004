import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setNav, setFooter } from '../store/showComponentsSlice';
import styled from 'styled-components';

const InputWrapper = styled.div`
  border: 1px solid black;
  height: 300px;
  width: 200px;
`;

const InputDiv = styled.input`
  border-bottom: 1px solid gray;
  display: flex;
`;

const SignIn = () => {
  const dispatch = useDispatch();
  // 처음 렌더링 될 때 Nav와 Footer 제거
  useEffect(() => {
    dispatch(setNav(false));
    dispatch(setFooter(false));
  }, []);

  return (
    <>
      <InputWrapper>
        SignIn
        <InputDiv type="text" />
        <InputDiv type="text" />
        <InputDiv type="text" />
      </InputWrapper>
    </>
  );
};

export default SignIn;
