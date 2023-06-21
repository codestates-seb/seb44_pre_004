import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setNav, setFooter } from '../store/showComponentsSlice';
// import axios from 'axios';

import { menuIdxSlice } from '../store/menuIdxSlice';
import styled from 'styled-components';
import UserInfo from '../components/UserInfo';

export const dummyUserData = {
  memberId: 11,
  imageUrl: 'https://picsum.photos/164',
  username: 'rocket',
  name: 'Rocket the Raccoon',
  title: 'Gaurdians of Gallaxy',
  aboutMe:
    'I am raccoon. Deserunt duis proident consequat enim minim nisi dolor consequat adipisicing duis nisi nostrud sint.',
  answers: ['I am Groot', 'sssssssssssss', 'dfadf', 'dgsgfgsgwrthh'],
  questions: null,
  days: 200,
};

const Mypage = ({ userData }) => {
  const dispatch = useDispatch();

  // const [userData, setUserData] = useState(dummyUserData);
  const { answers, questions } = userData;

  // useEffect(() => {
  //   getUserInfo();
  // }, []);

  // 처음 렌더링 될 때 Nav와 Footer 제거
  useEffect(() => {
    dispatch(setNav(true));
    dispatch(setFooter(true));
    dispatch(menuIdxSlice.actions.idx(3));
  }, []);

  // 사용자 정보 GET 요청
  // const getUserInfo = async () => {
  //   try {
  //     const response = await axios.get(`/user/${memberId}/${username}`);
  //     setUserData((prev) => [...prev, response.data]);
  //     console.log(response);
  //   } catch (error) {
  //     console.error('Error Mypge get user info', error);
  //   }
  // };

  return (
    <>
      <UserInfo userData={userData} />
      <ContentsContainer>
        <InfoElement>
          <h3>Answers</h3>
          <ul>
            {!answers && (
              <EmptyMsg>You have not answered any questions</EmptyMsg>
            )}
            {answers &&
              answers
                .slice(0, 3)
                .map((answer, idx) => <li key={idx}>{answer}</li>)}
          </ul>
        </InfoElement>
        <InfoElement>
          <h3>Questions</h3>
          <ul>
            {!questions && (
              <EmptyMsg>You have not asked any questions</EmptyMsg>
            )}
            {questions &&
              questions
                .slice(0, 3)
                .map((question, idx) => <li key={idx}>{question}</li>)}
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
