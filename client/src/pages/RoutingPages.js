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

  return (
    <ContentsContainer>
      <ContentsSection>
        {showNav && <SideNav />}
        <MainComponent>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/qna" element={<Questions />} />
            <Route path="/qna/:qna-id" element={<QuestionDetail />} />
            <Route path="/qna/ask" element={<AskQuestion />} />
            <Route path="/tags" element={<Tags />} />
            <Route path="/user" element={<Users />} />
            <Route path="/user/:member-id/:username" element={<Mypage />} />
            <Route path="/user/edit/:member-id" element={<EditProfile />} />
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
