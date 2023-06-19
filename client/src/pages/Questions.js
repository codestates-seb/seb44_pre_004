import styled from 'styled-components';
import Question from '../components/Question';
import Paging from '../components/Paging/Paging';
import { useState } from 'react';

const questionData = [
  {
    voteCount: 10,
    answerCount: 5,
    title: 'Sample Question 1',
    body: 'Sample question body 1',
  },
  {
    voteCount: 8,
    answerCount: 3,
    title: 'Sample Question 2',
    body: 'Sample question body 2',
  },
  {
    voteCount: 15,
    answerCount: 7,
    title: 'Sample Question 3',
    body: 'Sample question body 3',
  },
  {
    voteCount: 3,
    answerCount: 1,
    title: 'Sample Question 4',
    body: 'Sample question body 4',
  },
  {
    voteCount: 12,
    answerCount: 6,
    title: 'Sample Question 5',
    body: 'Sample question body 5',
  },
  {
    voteCount: 6,
    answerCount: 2,
    title: 'Sample Question 6',
    body: 'Sample question body 6',
  },
  {
    voteCount: 9,
    answerCount: 4,
    title: 'Sample Question 7',
    body: 'Sample question body 7',
  },
  {
    voteCount: 13,
    answerCount: 5,
    title: 'Sample Question 8',
    body: 'Sample question body 8',
  },
  {
    voteCount: 7,
    answerCount: 3,
    title: 'Sample Question 9',
    body: 'Sample question body 9',
  },
  {
    voteCount: 11,
    answerCount: 4,
    title: 'Sample Question 10',
    body: 'Sample question body 10',
  },
];

const Questions = () => {
  const itemsPerPage = 5; // Number of items to display per page
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Calculate the index range for the questions to display on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Get the subset of questions to display on the current page
  const displayedQuestions = questionData.slice(startIndex, endIndex);

  return (
    <>
      <MainComponent>
        <H1>All Questions</H1>
        <AskButton>
          <a href="/qna/ask">Ask Question</a>
        </AskButton>
      </MainComponent>
      <MainComponent>
        <TotalDiv>{questionData.length} questions</TotalDiv>
        {/* filter 버튼 추가 필요 */}
      </MainComponent>
      <MainComponent>
        <QuestionDiv>
          {displayedQuestions.map((question, index) => (
            <Question key={index} question={question} />
          ))}
        </QuestionDiv>
      </MainComponent>
      <MainComponent>
        <Paging
          currentPage={currentPage}
          onPageChange={handlePageChange}
          itemsPerPage={itemsPerPage}
          totalItemsCount={questionData.length}
        />
      </MainComponent>
    </>
  );
};

const MainComponent = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 1rem;
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
  font-size: x-large;
`;

const TotalDiv = styled.div`
  margin: 0.5rem;
`;
const QuestionDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export default Questions;
