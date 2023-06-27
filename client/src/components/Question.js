import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Question = ({ question }) => {
  const createdAt = new Date(question.createdAt);
  return (
    <Container>
      <div>
        <RowDiv>
          <TextGreySpan>{question.answerCount} answer</TextGreySpan>
        </RowDiv>
      </div>

      <ColumDiv>
        <H3>
          <Link to={`/qna/${question.questionId}`}>{question.title}</Link>
        </H3>
        <TextBodyDiv>{question.content}</TextBodyDiv>
        <ColumDiv>
          <AuthorDiv>
            <span>🌈</span>
            <DisplayNameSpan>{question.writerName}</DisplayNameSpan>
            <TextGreySpan>{createdAt.toLocaleString('ko-KR')}</TextGreySpan>
          </AuthorDiv>
        </ColumDiv>
      </ColumDiv>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  padding: 1rem;
  border-top: 1px solid hsl(210, 8%, 90%);
`;

const RowDiv = styled.div`
  display: flex;
  justify-content: center;
  width: 100px;
  margin-bottom: 0.3rem;
  gap: 0.5rem;
  font-size: 13px;
  > span {
    font-weight: 500;
  }
`;

const ColumDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const H3 = styled.h3`
  margin-bottom: 0.5rem;
  font-size: 17px;
  color: var(--dark-blue);
  &:hover {
    color: var(--bright-blue);
  }
`;

const TextBodyDiv = styled.div`
  font-size: 13px;
`;

const AuthorDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: 0.5rem;
  gap: 0.5rem;
  font-size: 12px;
  font-weight: 500;
`;

const DisplayNameSpan = styled.span`
  color: #488fd6;
  font-weight: 500;
`;

const TextGreySpan = styled.span`
  color: var(--grey);
  font-weight: 500;
`;

export default Question;
