import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setNav, setFooter } from '../store/showComponentsSlice';
import { menuIdxSlice } from '../store/menuIdxSlice';
import styled from 'styled-components';
import UserInfo from '../components/UserInfo';

const Mypage = () => {
  const dispatch = useDispatch();
  // 처음 렌더링 될 때 Nav와 Footer 제거
  useEffect(() => {
    dispatch(setNav(true));
    dispatch(setFooter(true));
    dispatch(menuIdxSlice.actions.idx(3));
  }, []);

  return (
    <>
      <UserInfo />
      <ContentsContainer>
        <InfoElement>
          <h3>Answers</h3>
          <ul>
            <EmptyMsg>You have not answered any questions</EmptyMsg>
            {/* <li>tango una pragunta</li>
            <li>tango una pragunta</li>
            <li>tango una pragunta</li> */}
          </ul>
        </InfoElement>
        <InfoElement>
          <h3>Questions</h3>
          <ul>
            <EmptyMsg>You have not asked any questions</EmptyMsg>
          </ul>
        </InfoElement>
      </ContentsContainer>
    </>
  );
};

const ContentsContainer = styled.ul`
  padding: 32px 32px 200px;
  border-top: 1px solid rgb(214, 217, 220);
`;

const InfoElement = styled.li`
  margin: 20px 0;
  > h3 {
    margin-bottom: 8px;
    font-size: 21px;
  }

  > ul {
    padding: 16px 24px;
    border: 1px solid hsl(210, 8%, 85%);
    border-radius: 5px;
    > li {
      padding: 8px 0;
      font-size: 14px;
    }
  }
`;

const EmptyMsg = styled.li`
  color: rgb(106, 115, 124);
  font-size: 13px;
  text-align: center;
`;

export default Mypage;
