import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setNav, setFooter } from '../store/showComponentsSlice';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Answer from '../components/Answer';
import { IoMdArrowDropupCircle } from 'react-icons/io';
import Comment from '../components/Comment';
import LoadingSpinner from '../components/LoadingSpinner';
import instance, { getApi } from '../util/ApiController';

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
    content: '',
  });
  const [newComment, setNewComment] = useState('');
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [comments, setComments] = useState([]);
  const [questionData, setQuestionData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const createdAt = new Date(questionData.createdAt);
  const updatedAt = new Date(questionData.updatedAt);

  // 처음 렌더링 될 때 Nav와 Footer 제거
  useEffect(() => {
    dispatch(setNav(true));
    dispatch(setFooter(true));
  }, []);

  useEffect(() => {
    // Fetch the question data using the qnaId
    getApi
      .get(`/qna/question/${questionId}`)
      .then((res) => {
        // Set the question data in state or do something with it
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

  const handleAnswerSubmit = (e) => {
    // 답변 작성 코드
    e.preventDefault();
    if (newAnswer.trim() === '') return;

    const newAnswerObj = {
      content: newAnswer,
    };

    instance
      .post(`/qna/question/${questionId}/answer`, newAnswerObj)
      .then((response) => {
        setAnswers((prevAnswers) => [...prevAnswers, response.data]);
        setNewAnswer('');
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error submitting answer:', error);
      });
  };

  const handleAnswerEdit = async (answerId, editedContent) => {
    // 답변 수정 코드
    const updatedAnswer = {
      content: editedContent,
    };

    instance
      .patch(`/qna/answer/${answerId}`, updatedAnswer)
      .then((response) => {
        if (response.status === 200) {
          setIsEditing(false);
        } else {
          console.error('Error updating answer');
        }
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error updating answer:', error);
      });
  };

  const handleAnswerDelete = async (answerId) => {
    // 답변 삭제 코드
    try {
      await instance.delete(`/qna/answer/${answerId}`);
      setAnswers((prevAnswers) =>
        prevAnswers.filter((answer) => answer.id !== answerId)
      );
      window.location.reload();
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

  const handleQuestionSave = () => {
    // 질문 수정 저장 코드
    const updatedQuestion = {
      title: editedQuestion.title,
      content: editedQuestion.content,
    };

    instance
      .patch(`/qna/question/${questionId}`, updatedQuestion)
      .then((response) => {
        if (response.status === 200) {
          setIsEditing(false);
          window.location.reload();
        } else {
          console.error('Error updating question');
        }
      })
      .catch((error) => {
        console.error('Error updating question:', error);
      });
  };

  const handleQuestionCancel = () => {
    setIsEditing(false);
  };

  const handleQuestionDelete = () => {
    // 질문 삭제 코드
    instance
      .delete(`/qna/question/${questionId}`)
      .then((response) => {
        if (response.status === 200) {
          console.log('Question deleted');
        } else {
          console.error('Error deleting question');
        }
        alert('Question deleted');
        navigate('/qna');
      })
      .catch((error) => {
        console.error('Error deleting question:', error);
      });
  };

  const handleLikeClick = (questionId) => {
    if (isLiked) {
      // 좋아요 취소
      instance
        .delete(`/qna/questions/${questionId}/like`)
        .then(() => {
          setIsLiked(false);
          setLikeCount((prevCount) => prevCount - 1);
          window.location.reload();
        })
        .catch((error) => {
          console.error('Error sending like status to server:', error);
        });
    } else {
      // 좋아요 추가
      instance
        .post(`/qna/questions/${questionId}/like`)
        .then(() => {
          setIsLiked(true);
          setLikeCount((prevCount) => prevCount + 1);
          window.location.reload();
        })
        .catch((error) => {
          console.error('Error sending like status to server:', error);
        });
    }
  };

  // 댓글 작성 처리 함수
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim() === '') return;

    const newCommentObj = {
      content: newComment,
    };

    instance
      .post(`/qna/question/${questionId}/comment/`, newCommentObj)
      .then((response) => {
        const createdComment = response.data;
        setComments((prevComments) => [...prevComments, createdComment]);
        setNewComment('');
        setShowCommentForm(false);
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleCommentDelete = (commentId) => {
    // 서버 완성 시 변경 할 삭제 코드
    instance
      .delete(`/qna/comment/${commentId}`)
      .then(() => {
        setAnswers((prevComments) =>
          prevComments.filter((comment) => comment.id !== commentId)
        );
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error deleting comment:', error);
      });
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
            <div>작성일 {createdAt.toLocaleString('ko-KR')}</div>
            <div>수정일 {updatedAt.toLocaleString('ko-KR')}</div>
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
              <div>작성일 {createdAt.toLocaleString('ko-KR')}</div>
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
              key={comment.commentId}
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
              key={answer.answerId} // 고유한 id 값을 key prop으로 설정
              answer={answer}
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
