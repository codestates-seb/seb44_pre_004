import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Question = ({ question }) => {
  return (
    <Container>
      <div>
        <RowDiv>
          <span>{question.voteCount} vote</span>
        </RowDiv>

        <RowDiv>
          <div>
            <span>{question.answerCount} answer</span>
          </div>
        </RowDiv>
      </div>

      <ColumDiv>
        <H3>
          <Link to={`/qna/:qna-id`}>{question.title}</Link>
        </H3>
        <div>{question.body}</div>
        <ColumDiv>
          <AuthorDiv>
            <span>{/* 프로필 이미지 */}🌈</span>
            <DisplayNameSpan>{/* 닉네임 */}kim</DisplayNameSpan>
            <span>{/* 작성일 */}40 secs ago</span>
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
  border-top: 0.5px solid gray;
`;

const RowDiv = styled.div`
  display: flex;
  justify-content: center;
  width: 100px;
  margin-bottom: 0.3rem;
  gap: 0.5rem;
`;

const ColumDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const H3 = styled.h3`
  margin-bottom: 0.5rem;
`;

const AuthorDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: 0.5rem;
  gap: 0.5rem;
`;

const DisplayNameSpan = styled.span`
  color: #488fd6;
`;

export default Question;
