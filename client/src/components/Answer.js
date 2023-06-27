import { useState } from 'react';
import styled from 'styled-components';
import { IoMdArrowDropupCircle } from 'react-icons/io';
import instance from '../util/ApiController';
import { useSelector } from 'react-redux';

const Answer = ({ answer, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(answer.content);
  const [isLiked, setIsLiked] = useState(answer.likeExist || false);
  const [likeCount, setLikeCount] = useState(answer.likeCount || 0);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const createdAt = new Date(answer.createdAt);
  const answerId = answer.answerId;
  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onEdit(answerId, editedContent);
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete(answerId);
  };

  const handleLikeClick = () => {
    if (isLiked) {
      // 좋아요 취소
      instance
        .delete(`/qna/answer/${answerId}/like`, answerId)
        .then(() => {
          setIsLiked(false);
          setLikeCount((prevCount) => prevCount - 1);
        })
        .catch((error) => {
          console.error('Error sending like status to server:', error);
        });
    }
    if (!isLiked) {
      // 좋아요 추가
      instance
        .post(`/qna/answer/${answerId}/like`, answerId)
        .then(() => {
          setIsLiked(true);
          setLikeCount((prevCount) => prevCount + 1);
        })
        .catch((error) => {
          console.error('Error sending like status to server:', error);
        });
    }
  };

  return (
    <AnswerContainer>
      {isEditing && isLoggedIn ? (
        <>
          <AnswerTextArea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
          <SaveButton onClick={handleSave}>Save</SaveButton>
        </>
      ) : (
        <>
          <RowDiv>
            <LikeContainer>
              <LikeButton onClick={handleLikeClick} isLiked={isLiked}>
                <IoMdArrowDropupCircle size="46" />
              </LikeButton>
              <LikeCount>{likeCount}</LikeCount>
            </LikeContainer>
            <AnswerContent>{answer.content}</AnswerContent>
          </RowDiv>

          <ButtonContainer>
            <AuthorDiv>
              <ColumDiv>
                <div>작성일 {createdAt.toLocaleString('ko-KR')}</div>
                <RowDiv>
                  <div>🌈</div>
                  <DisplayNameSpan>{answer.writerName}</DisplayNameSpan>
                </RowDiv>
              </ColumDiv>
            </AuthorDiv>
            <AnswerButton onClick={handleEdit}>Edit</AnswerButton>
            <AnswerButton onClick={handleDelete}>Delete</AnswerButton>
          </ButtonContainer>
        </>
      )}
    </AnswerContainer>
  );
};

const AnswerContainer = styled.li`
  width: 100%;
  margin-bottom: 1rem;
  border-bottom: 0.5px solid var(--light-grey);
`;

const AnswerTextArea = styled.textarea`
  width: 100%;
  height: 5rem;
  margin-bottom: 1rem;
`;

const SaveButton = styled.button`
  margin-bottom: 1rem;
  color: var(--light-grey);
  cursor: pointer;
`;

const ButtonContainer = styled.div`
  margin-bottom: 1rem;
`;

const AnswerContent = styled.div`
  margin-bottom: 1rem;
`;

const AnswerButton = styled.button`
  color: var(--light-grey);
  cursor: pointer;
`;

const AuthorDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: 1rem;
  padding-right: 1rem;
  gap: 0.5rem;
`;

const DisplayNameSpan = styled.span`
  color: var(--bright-blue);
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

export default Answer;
