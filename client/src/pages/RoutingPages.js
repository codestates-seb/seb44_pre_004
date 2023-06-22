import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
// styles
import styled from 'styled-components';
// components
import SideNav from '../components/layout/SideNav';
import Footer from '../components/layout/Footer';
import AskQuestion from './AskQuestion';
import EditProfile from './EditProfile';
import Login from './Login';
import Main from './Main';
import Mypage from './Mypage';
import QuestionDetail from './QuestionDetail';
import Questions from './Questions';
import SignIn from './SignIn';
import Tags from './Tags';
import Users from './Users';

const RoutingPages = () => {
  // showNav, showFooter 상태를 불러옴
  const showNav = useSelector((state) => state.showComponents.showNav);
  const showFooter = useSelector((state) => state.showComponents.showFooter);

  // 임시 질문 데이터
  const questionData = [
    {
      id: 1,
      voteCount: 10,
      answerCount: 5,
      title: 'Sample Question 1',
      body: 'Sample question body 1',
    },
    {
      id: 2,
      voteCount: 8,
      answerCount: 3,
      title: 'Sample Question 2',
      body: 'Sample question body 2',
    },
    {
      id: 3,
      voteCount: 15,
      answerCount: 7,
      title: 'Sample Question 3',
      body: 'Sample question body 3',
    },
    {
      id: 4,
      voteCount: 3,
      answerCount: 1,
      title: 'Sample Question 4',
      body: 'Sample question body 4',
    },
    {
      id: 5,
      voteCount: 12,
      answerCount: 6,
      title: 'Sample Question 5',
      body: 'Sample question body 5',
    },
    {
      id: 6,
      voteCount: 6,
      answerCount: 2,
      title: 'Sample Question 6',
      body: 'Sample question body 6',
    },
    {
      id: 7,
      voteCount: 9,
      answerCount: 4,
      title: 'Sample Question 7',
      body: 'Sample question body 7',
    },
    {
      id: 8,
      voteCount: 13,
      answerCount: 5,
      title: 'Sample Question 8',
      body: 'Sample question body 8',
    },
    {
      id: 9,
      voteCount: 7,
      answerCount: 3,
      title: 'Sample Question 9',
      body: 'Sample question body 9',
    },
    {
      id: 10,
      voteCount: 11,
      answerCount: 4,
      title: 'Sample Question 10',
      body: 'Sample question body 10',
    },
  ];

  return (
    <ContentsContainer>
      <ContentsSection>
        {showNav && <SideNav />}
        <MainComponent>
          <Routes>
            <Route path="/" element={<Main questionData={questionData} />} />
            <Route
              path="/qna"
              element={<Questions questionData={questionData} />}
            />
            <Route
              path="/qna/:qnaId"
              element={<QuestionDetail questionData={questionData} />}
            />
            <Route path="/qna/ask" element={<AskQuestion />} />
            <Route path="/tags" element={<Tags />} />
            <Route path="/user" element={<Users />} />
            <Route path="/user/:memberId" element={<Mypage />} />
            <Route path="/user/edit/:memberId" element={<EditProfile />} />
            <Route path="/user/login" element={<Login />} />
            <Route path="/user/join" element={<SignIn />} />
          </Routes>
        </MainComponent>
      </ContentsSection>
      {showFooter && <Footer />}
    </ContentsContainer>
  );
};

const ContentsContainer = styled.div`
  margin-top: 56px;
`;

const ContentsSection = styled.section`
  display: flex;
`;

const MainComponent = styled.div`
  width: calc(100% - 164px);
  margin: 0 auto;
`;

export default RoutingPages;
