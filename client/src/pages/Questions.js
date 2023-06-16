import styled from 'styled-components';
import Question from '../components/Question';

const Questions = () => {
  return (
    <>
      <MainComponent>
        <H1>All Questions</H1>
        <AskButton>
          <a href="/qna/ask">Ask Question</a>
        </AskButton>
      </MainComponent>
      <MainComponent>
        <TotalDiv>{/* total */}23,763,596 questions</TotalDiv>
        {/* filter 버튼 추가 필요 */}
      </MainComponent>
      <MainComponent>
        <QuestionDiv>
          <Question></Question>
          <Question></Question>
          <Question></Question>
          <Question></Question>
          <Question></Question>
          <Question></Question>
          <Question></Question>
          <Question></Question>
        </QuestionDiv>
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
