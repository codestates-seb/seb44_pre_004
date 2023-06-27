import styled from 'styled-components';
import Question from '../components/Question';
import Paging from '../components/Paging/Paging';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setNav, setFooter } from '../store/showComponentsSlice';
import LoadingSpinner from '../components/LoadingSpinner';
import { getApi } from '../util/ApiController';

const Questions = () => {
  const dispatch = useDispatch();

  const [questionData, setQuestionData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getApi
      .get(`/qna/question`)
      .then((res) => {
        setQuestionData(res.data.data.questions.content);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);
  // 처음 렌더링 될 때 Nav와 Footer 제거
  useEffect(() => {
    dispatch(setNav(true));
    dispatch(setFooter(true));
  }, []);

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const displayedQuestions = questionData.slice(startIndex, endIndex);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <MainComponent>
        <H1>All Questions</H1>
        <AskButton>
          <Link to="/qna/ask">Ask Question</Link>
        </AskButton>
      </MainComponent>
      <MainComponent>
        <TotalDiv>{questionData.length} questions</TotalDiv>
      </MainComponent>
      <MainComponent>
        <QuestionDiv>
          {displayedQuestions.map((question, index) => (
            <Question key={index} question={question} />
          ))}
        </QuestionDiv>
      </MainComponent>
      <PagingComponent>
        <Paging
          currentPage={currentPage}
          onPageChange={handlePageChange}
          itemsPerPage={itemsPerPage}
          totalItemsCount={questionData.length}
        />
      </PagingComponent>
    </>
  );
};

const MainComponent = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 1rem 1rem 1rem 0;
`;

const AskButton = styled.button`
  height: 2.5rem;
  background-color: var(--bright-blue);
  border-radius: 5px;
  a {
    color: white;
    border: none;
    cursor: pointer;
    text-decoration: none;
  }
  :hover {
    background-color: var(--dark-blue);
  }
`;

const H1 = styled.h1`
  padding: 0 1rem;
  font-size: x-large;
`;

const TotalDiv = styled.div`
  margin: 0.5rem;
  padding: 0 1rem;
`;
const QuestionDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const PagingComponent = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 1rem 1rem 3rem;
`;

export default Questions;
