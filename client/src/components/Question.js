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
          <TextGreySpan>{question.answerCount} answer</TextGreySpan>
        </RowDiv>
      </div>

      <ColumDiv>
        <H3>
          <Link to={`/qna/:qna-id`}>{question.title}</Link>
        </H3>
        <TextBodyDiv>{question.body}</TextBodyDiv>
        <ColumDiv>
          <AuthorDiv>
            <span>{/* 프로필 이미지 */}🌈</span>
            {/* <img src="" alt="" /> */}
            <DisplayNameSpan>{/* 닉네임 */}kim</DisplayNameSpan>
            <TextGreySpan>{/* 작성일 */}40 secs ago</TextGreySpan>
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
`;

const TextGreySpan = styled.span`
  color: var(--grey);
`;

export default Question;
