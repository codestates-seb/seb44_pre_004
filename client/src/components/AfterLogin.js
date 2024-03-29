import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Question from './Question';
import Paging from './Paging/Paging';

const AfterLogin = ({ questionData }) => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const displayedQuestions = questionData.slice(startIndex, endIndex);

  return (
    <>
      <MainComponent>
        <H1>Top Questions</H1>
        <AskButton>
          <Link to="/qna/ask">Ask Question</Link>
        </AskButton>
      </MainComponent>
      <MainComponent></MainComponent>
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
  padding: 10px;
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

export default AfterLogin;
