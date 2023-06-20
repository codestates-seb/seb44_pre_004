import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setNav, setFooter } from '../store/showComponentsSlice';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Answer from '../components/Answer';
// import axios from 'axios';

const QuestionDetail = ({ questionData }) => {
  const { qnaId } = useParams();
  const dispatch = useDispatch();

  const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState('');

  useEffect(() => {
    const dummyAnswers = {
      1: [
        {
          id: 1,
          content: '각각 저장되는지 확인만 하자..',
        },
        {
          id: 2,
          content: '2번째..',
        },
        {
          id: 7,
          content: '3번 댓글..',
        },
      ],
      2: [
        {
          id: 3,
          content: '2번째 페이지 1번 답변이요',
        },
        {
          id: 4,
          content: '2번재 페이지 2번 답변이유',
        },
      ],
      3: [
        { id: 5, content: 'Hi' },
        { id: 6, content: '3번 페이지 확인' },
      ],
    };

    if (dummyAnswers[qnaId]) {
      setAnswers(dummyAnswers[qnaId]);
    } else {
      setAnswers([]);
    }
  }, [qnaId]);

  // 처음 렌더링 될 때 Nav와 Footer 제거
  useEffect(() => {
    dispatch(setNav(true));
    dispatch(setFooter(true));
  }, []);

  // 해당 id의 질문을 찾기 위해 questionData에서 필터링
  const question = questionData.find(
    (question) => question.id === parseInt(qnaId)
  );

  if (!question) {
    return <div>Question not found.</div>;
  }

  // 답변 작성 처리 함수
  const handleAnswerSubmit = /*async 서버 구현시 추가 */ (e) => {
    e.preventDefault();
    if (newAnswer.trim() === '') return;

    const newAnswerObj = {
      id: Date.now(),
      content: newAnswer,
      // author: {
      //   userId: loggedInUser.id,
      //   username: loggedInUser.username,
      // },       답변 작성자 정보
    };

    // 임시로 답변 데이터 저장
    setAnswers((prevAnswers) => [...prevAnswers, newAnswerObj]);
    setNewAnswer('');
  };

  // 서버 완성 시 전송 할 답변 코드
  //   try {
  //     const response = await axios.post('/api/answers', newAnswerObj);
  //     setAnswers((prevAnswers) => [...answers, response.data]);
  //     setNewAnswer('');
  //   } catch (error) {
  //     console.error('Error submitting answer:', error);
  //   }
  // };

  const handleAnswerEdit = /*async 서버 구현시 추가 */ (
    answerId,
    editedContent
  ) => {
    // 답변 수정 처리
    setAnswers((prevAnswers) =>
      prevAnswers.map((answer) =>
        answer.id === answerId ? { ...answer, content: editedContent } : answer
      )
    );
  };

  // 서버 완성 시 변경 할 답변 코드
  //   try {
  //     const updatedAnswer = {
  //       id: answerId,
  //       content: editedContent,
  //     };

  //     const response = await axios.put(`/api/answers/${answerId}`, updatedAnswer);
  //     setAnswers((prevAnswers) =>
  //       prevAnswers.map((answer) =>
  //         answer.id === answerId ? response.data : answer
  //       )
  //     );
  //   } catch (error) {
  //     console.error('Error updating answer:', error);
  //   }
  // };

  const handleAnswerDelete = /*async 서버 구현시 추가 */ (answerId) => {
    // 답변 삭제 처리
    setAnswers((prevAnswers) =>
      prevAnswers.filter((answer) => answer.id !== answerId)
    );
  };

  // 서버 완성 시 변경 할 삭제 코드
  //   try {
  //     await axios.delete(`/api/answers/${answerId}`);
  //     setAnswers((prevAnswers) =>
  //       prevAnswers.filter((answer) => answer.id !== answerId)
  //     );
  //   } catch (error) {
  //     console.error('Error deleting answer:', error);
  //   }
  // };

  return (
    <>
      <MainComponent>
        <H2>{question.title}</H2>
        <RowDiv>
          <div>asked {/* 작성일 */}today</div>
          <div>Modified {/* 수정일 */}today</div>
        </RowDiv>
        <BodyContainer>
          <div>{question.body}</div>
          <AuthorDiv>
            <ColumDiv>
              <div>{/* 작성시간 */}asked 40 secs ago</div>
              <RowDiv>
                <div>{/* 프로필 이미지 */}🌈</div>
                <DisplayNameSpan>{/* 닉네임 */}kim</DisplayNameSpan>
              </RowDiv>
            </ColumDiv>
          </AuthorDiv>
          <CommentButton>
            <AddComment>Add a comment</AddComment>
          </CommentButton>
        </BodyContainer>
      </MainComponent>
      <MainComponent>
        <h3>{answers.length} Answer</h3>{' '}
        {/* 답변의 총 개수 표시 후에 변경 필요 */}
        <AnswerList>
          {answers.map((answer) => (
            <Answer
              key={answer.id}
              answer={answer}
              // author={answer.author}   후에 추가 할 예정
              onEdit={handleAnswerEdit}
              onDelete={handleAnswerDelete}
            />
          ))}
        </AnswerList>
      </MainComponent>
      <MainComponent>
        <H3>Your Answer</H3>
        <AnswerForm onSubmit={handleAnswerSubmit}>
          <AnswerTextArea
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
            placeholder="Write a Answer..."
          />
          <AnswerButton type="submit">Post Your Answer</AnswerButton>
        </AnswerForm>
      </MainComponent>
    </>
  );
};

const MainComponent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 2rem;
`;

const H2 = styled.h2`
  font-size: xx-large;
`;

const H3 = styled.h3`
  font-size: x-large;
`;

const RowDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  width: 100%;
  margin-bottom: 0.3rem;
  gap: 0.5rem;
`;

const ColumDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  border-radius: 5px;
  background-color: var(--light-blue);
`;

const BodyContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  width: 100%;
  padding: 1rem;
  border-top: 0.5px solid var(--light-grey);
`;

const AuthorDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: 1rem;
  gap: 0.5rem;
`;

const DisplayNameSpan = styled.span`
  color: var(--bright-blue);
`;

const CommentButton = styled.button`
  display: flex;
  margin-top: 1rem;
  color: var(--light-grey);
`;

const AddComment = styled.p`
  cursor: pointer;
  :hover {
    color: var(--bright-blue);
  }
`;

const AnswerTextArea = styled.textarea`
  width: 100%;
  height: 5rem;
`;

const AnswerForm = styled.form`
  // 댓글 폼의 스타일을 지정해주세요.
  width: 100%;
`;

const AnswerList = styled.ul`
  // 댓글 목록의 스타일을 지정해주세요.
  margin-top: 1rem;
`;

const AnswerButton = styled.button`
  height: 2.5rem;
  background-color: var(--bright-blue);
  border-radius: 5px;
  color: white;
  cursor: pointer;
  :hover {
    background-color: var(--dark-blue);
  }
`;
export default QuestionDetail;
