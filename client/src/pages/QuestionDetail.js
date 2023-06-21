import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setNav, setFooter } from '../store/showComponentsSlice';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Answer from '../components/Answer';
// import axios from 'axios';

const QuestionDetail = ({ questionData }) => {
  const { qnaId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedQuestion, setEditedQuestion] = useState({
    title: '',
    body: '',
  });

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

  const handleQuestionEdit = () => {
    setIsEditing(true);
    setEditedQuestion({
      title: question.title,
      body: question.body,
    });
  };

  const handleQuestionSave = /*async 서버 구현시 추가 */ () => {
    question.title = editedQuestion.title;
    question.body = editedQuestion.body;
    setIsEditing(false);
  };

  // 서버 완성 시 변경 할 수정 코드
  //   try {
  //     const updatedQuestion = {
  //       id: question.id,
  //       title: editedQuestion.title,
  //       body: editedQuestion.body,
  //     };

  //     const response = await axios.put(`/api/questions/${question.id}`, updatedQuestion);

  //     if (response.status === 200) {
  //       setIsEditing(false);
  //     } else {
  //       console.error('Error updating question');
  //     }
  //   } catch (error) {
  //     console.error('Error updating question:', error);
  //   }
  // };

  const handleQuestionCancel = () => {
    setIsEditing(false);
  };

  const handleQuestionDelete = async () => {
    alert('Question deleted');
    navigate('/qna');
  };
  //   서버 완성 시 변경 할 삭제 코드
  //   try {
  //     const response = await axios.delete(`/api/questions/${question.id}`);

  //     if (response.status === 200) {
  //       // 여기서 질문 삭제 후 리다이렉트 또는 화면 전환 등의 작업을 수행할 수 있습니다.
  //       console.log('Question deleted');
  //     } else {
  //       console.error('Error deleting question');
  //     }
  //   } catch (error) {
  //     console.error('Error deleting question:', error);
  //   }
  // };

  return (
    <>
      <MainComponent>
        {isEditing ? (
          <QuestionInput
            value={editedQuestion.title}
            onChange={(e) =>
              setEditedQuestion({
                ...editedQuestion,
                title: e.target.value,
              })
            }
          />
        ) : (
          <H2>{question.title}</H2>
        )}
        <RowDiv>
          <div>asked {/* 작성일 */}today</div>
          <div>Modified {/* 수정일 */}today</div>
        </RowDiv>
        <BodyContainer>
          {isEditing ? (
            <QuestionTextArea
              value={editedQuestion.body}
              onChange={(e) =>
                setEditedQuestion({
                  ...editedQuestion,
                  body: e.target.value,
                })
              }
            />
          ) : (
            <div>{question.body}</div>
          )}
          <AuthorDiv>
            <ColumDiv>
              <div>{/* 작성시간 */}asked 40 secs ago</div>
              <RowDiv>
                <div>{/* 프로필 이미지 */}🌈</div>
                <DisplayNameSpan>{/* 닉네임 */}kim</DisplayNameSpan>
              </RowDiv>
            </ColumDiv>
          </AuthorDiv>
          {isEditing ? (
            <ButtonContainer>
              <SaveButton onClick={handleQuestionSave}>Save</SaveButton>
              <CancelButton onClick={handleQuestionCancel}>Cancel</CancelButton>
              <DeleteButton onClick={handleQuestionDelete}>Delete</DeleteButton>
            </ButtonContainer>
          ) : (
            <ButtonContainer>
              <EditButton onClick={handleQuestionEdit}>Edit</EditButton>
              <DeleteButton onClick={handleQuestionDelete}>Delete</DeleteButton>
            </ButtonContainer>
          )}
          <CommentButton>
            <AddComment>Add a comment</AddComment>
          </CommentButton>
        </BodyContainer>
      </MainComponent>
      <MainComponent>
        <H3>{answers.length} Answer</H3>{' '}
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
  margin-bottom: 1rem;
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
  margin-top: 1rem;
  cursor: pointer;
  :hover {
    color: var(--bright-blue);
  }
`;

const AnswerTextArea = styled.textarea`
  width: 100%;
  height: 5rem;
  margin-bottom: 1rem;
`;

const AnswerForm = styled.form`
  width: 100%;
`;

const AnswerList = styled.ul`
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

const ButtonContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const EditButton = styled.button`
  color: var(--light-grey);
  cursor: pointer;
  :hover {
    color: var(--dark-blue);
  }
`;

const SaveButton = styled.button`
  color: var(--light-grey);
  cursor: pointer;
  :hover {
    color: var(--dark-blue);
  }
`;

const CancelButton = styled.button`
  color: var(--light-grey);
  cursor: pointer;
  :hover {
    color: var(--dark-blue);
  }
`;

const DeleteButton = styled.button`
  color: var(--light-grey);
  cursor: pointer;
  :hover {
    color: var(--dark-blue);
  }
`;

const QuestionInput = styled.input`
  margin: 1rem;
  padding: 0.5rem;
  border: 1px solid var(--grey);
  border-radius: 2px;
`;

const QuestionTextArea = styled.textarea`
  width: 100%;
  height: 5rem;
  padding: 0.5rem;
`;

export default QuestionDetail;
