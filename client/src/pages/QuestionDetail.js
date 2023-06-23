import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setNav, setFooter } from '../store/showComponentsSlice';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Answer from '../components/Answer';
import { IoMdArrowDropupCircle } from 'react-icons/io';
import Comment from '../components/Comment';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';

const QuestionDetail = () => {
  const { questionId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [editedQuestion, setEditedQuestion] = useState({
    title: '',
    body: '',
  });
  const [newComment, setNewComment] = useState('');
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [comments, setComments] = useState([]);
  const [questionData, setQuestionData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // 처음 렌더링 될 때 Nav와 Footer 제거
  useEffect(() => {
    dispatch(setNav(true));
    dispatch(setFooter(true));
  }, []);

  useEffect(() => {
    // Fetch the question data using the qnaId
    axios
      .get(`${process.env.REACT_APP_API_URL}/qna/question/${questionId}`)
      .then((res) => {
        // Set the question data in state or do something with it
        console.log(res.data);
        const questionData = res.data?.data || {};
        setQuestionData(questionData);
        setAnswers(questionData.answers);
        setComments(questionData.comments);
        setLikeCount(questionData.likeCount || 0);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [questionId]);

  if (!questionData) {
    return <div>Question not found.</div>;
  }

  // 답변 작성 처리 함수
  const handleAnswerSubmit = async (e) => {
    e.preventDefault();
    if (newAnswer.trim() === '') return;

    const newAnswerObj = {
      // id: answerId,
      content: newAnswer,
      // author: {
      //   userId: loggedInUser.id,
      //   username: loggedInUser.username,
      // },       답변 작성자 정보
    };

    //   // 임시로 답변 데이터 저장
    //   setAnswers((prevAnswers) => [...prevAnswers, newAnswerObj]);
    //   setNewAnswer('');
    // };

    // 서버 완성 시 전송 할 답변 코드
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/qna/question/${questionId}/answer`,
        newAnswerObj
      );
      setAnswers((prevAnswers) => [...prevAnswers, response.data]);
      setNewAnswer('');
    } catch (error) {
      console.error('Error submitting answer:', error);
    }
  };

  const handleAnswerEdit = async (answerId, editedContent) => {
    // 답변 수정 처리 변경 예정
    //   setAnswers((prevAnswers) =>
    //     prevAnswers.map((answer) =>
    //       answer.id === answerId ? { ...answer, content: editedContent } : answer
    //     )
    //   );
    // };

    // 서버 완성 시 변경 할 답변 코드
    try {
      const updatedAnswer = {
        id: answerId,
        content: editedContent,
      };

      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/qna/answer/${answerId}`,
        updatedAnswer
      );
      setAnswers((prevAnswers) =>
        prevAnswers.map((answer) =>
          answer.id === answerId ? response.data : answer
        )
      );
    } catch (error) {
      console.error('Error updating answer:', error);
    }
  };

  const handleAnswerDelete = async (answerId) => {
    // 답변 삭제 처리 변경 예정
    //   setAnswers((prevAnswers) =>
    //     prevAnswers.filter((answer) => answer.id !== answerId)
    //   );
    // };

    // 서버 완성 시 변경 할 삭제 코드
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/qna/answer/${answerId}`
      );
      setAnswers((prevAnswers) =>
        prevAnswers.filter((answer) => answer.id !== answerId)
      );
    } catch (error) {
      console.error('Error deleting answer:', error);
    }
  };

  const handleQuestionEdit = () => {
    setIsEditing(true);
    setEditedQuestion({
      title: questionData.title,
      content: questionData.content,
    });
  };

  const handleQuestionSave = async () => {
    // 변경 예정
    //   questionData.title = editedQuestion.title;
    //   questionData.content = editedQuestion.content;
    //   setIsEditing(false);
    // };

    // 서버 완성 시 변경 할 수정 코드
    try {
      const updatedQuestion = {
        // id: questionId,
        title: editedQuestion.title,
        body: editedQuestion.body,
      };

      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/api/questions/${questionId}`,
        { updatedQuestion },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization:
              'Bearer eyJhbGciOiJIUzM4NCJ9.eyJyb2xlcyI6W10sInVzZXJuYW1lIjoidGVzdEB0ZXN0LmNvbSIsInN1YiI6InRlc3RAdGVzdC5jb20iLCJpYXQiOjE2ODc1MDc1NjUsImV4cCI6MTY4NzUwOTM2NX0.r2QkZPPij7f0PFOZnRPo11CrB21nx_E7rSoOtCPVhOLzQ3y0khjLk-1bOK2tl16x',
          },
        }
      );

      if (response.status === 200) {
        setIsEditing(false);
      } else {
        console.error('Error updating question');
      }
    } catch (error) {
      console.error('Error updating question:', error);
    }
  };

  const handleQuestionCancel = () => {
    setIsEditing(false);
  };

  const handleQuestionDelete = async () => {
    alert('Question deleted');
    navigate('/qna');
    //   서버 완성 시 변경 할 삭제 코드
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/questions/${questionId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization:
              'Bearer eyJhbGciOiJIUzM4NCJ9.eyJyb2xlcyI6W10sInVzZXJuYW1lIjoidGVzdEB0ZXN0LmNvbSIsInN1YiI6InRlc3RAdGVzdC5jb20iLCJpYXQiOjE2ODc1MDc1NjUsImV4cCI6MTY4NzUwOTM2NX0.r2QkZPPij7f0PFOZnRPo11CrB21nx_E7rSoOtCPVhOLzQ3y0khjLk-1bOK2tl16x',
          },
        }
      );

      if (response.status === 200) {
        // 여기서 질문 삭제 후 리다이렉트 또는 화면 전환 등의 작업을 수행할 수 있습니다.
        console.log('Question deleted');
      } else {
        console.error('Error deleting question');
      }
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  };

  const handleLikeClick = () => {
    setIsLiked((prevIsLiked) => !prevIsLiked);

    // 변경 예정
    setLikeCount((prevLikeCount) =>
      isLiked ? prevLikeCount - 1 : prevLikeCount + 1
    );
  };

  //   // 서버에 좋아요 상태 전송
  //   const requestData = {
  //     postId: question.id, // 좋아요를 누른 게시물의 식별자 (예: 질문의 id)
  //     liked: !isLiked, // 좋아요 상태
  //   };

  //   // 서버로 POST 요청 보내기
  //   axios.post('/api/like', requestData)
  //     .then((response) => {
  //       // POST 요청이 성공적으로 처리된 경우
  //       console.log('Like status sent to server:', response.data);
  //     })
  //     .catch((error) => {
  //       // POST 요청이 실패한 경우
  //       console.error('Error sending like status to server:', error);
  //     });
  // };

  // 댓글 작성 처리 함수
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim() === '') return;

    const newCommentObj = {
      id: Date.now(),
      content: newComment,
      // 작성자 정보 등 필요한 댓글 데이터 추가
    };

    // 임시로 댓글 데이터 저장
    setComments((prevComments) => [...prevComments, newCommentObj]);
    setNewComment('');

    setShowCommentForm(false);
  };

  const handleCommentDelete = async (commentId) => {
    // 답변 삭제 처리 변경 예정
    //   setAnswers((prevAnswers) =>
    //     prevAnswers.filter((answer) => answer.id !== answerId)
    //   );
    // };

    // 서버 완성 시 변경 할 삭제 코드
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/qna/comment/${commentId}`
      );
      setAnswers((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId)
      );
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

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
          <H2>{questionData.title}</H2>
        )}
        {isEditing ? (
          <></>
        ) : (
          <RowDiv>
            <div>asked {questionData.createdAt}</div>
            <div>Modified {questionData.updatedAt}</div>
          </RowDiv>
        )}
        <BodyContainer>
          {isEditing ? (
            <QuestionTextArea
              value={editedQuestion.content}
              onChange={(e) =>
                setEditedQuestion({
                  ...editedQuestion,
                  content: e.target.value,
                })
              }
            />
          ) : (
            <RowDiv>
              <LikeContainer>
                <LikeButton onClick={handleLikeClick} isLiked={isLiked}>
                  <IoMdArrowDropupCircle size="46" />
                </LikeButton>
                <LikeCount>{likeCount}</LikeCount>
              </LikeContainer>
              <div>{questionData.content}</div>
            </RowDiv>
          )}
          <AuthorDiv>
            <ColumDiv>
              <div>asked {questionData.createdAt}</div>
              <RowDiv>
                <div>{/* 프로필 이미지 */}🌈</div>
                <DisplayNameSpan>{questionData.writerName}</DisplayNameSpan>
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
            <AddComment onClick={() => setShowCommentForm(true)}>
              Add a comment
            </AddComment>
          </CommentButton>
          {showCommentForm && (
            <>
              <CommentForm onSubmit={handleCommentSubmit}>
                <CommentTextArea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Write a comment..."
                />
                <CommentButton type="submit">Post Comment</CommentButton>
              </CommentForm>
              {/* 댓글 목록 렌더링 */}
            </>
          )}
          {comments.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              onDelete={handleCommentDelete}
            />
          ))}
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

const LikeButton = styled.button`
  color: ${(props) => (props.isLiked ? 'var(--orange)' : 'black')};
  cursor: pointer;
  :hover {
    color: var(--bright-blue);
  }
  :active {
    transform: scale(1.1);
  }
`;

const LikeCount = styled.span`
  display: flex;
  justify-content: center;
`;

const LikeContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const CommentForm = styled.form`
  width: 100%;
`;

const CommentTextArea = styled.textarea`
  width: 100%;
  height: 5rem;
  margin-bottom: 1rem;
`;

export default QuestionDetail;
