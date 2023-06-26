import { useState } from 'react';
import styled from 'styled-components';
import { IoMdArrowDropupCircle } from 'react-icons/io';
// import axios from 'axios';

const Answer = ({ answer, onEdit, onDelete /*, author*/ }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(answer.content);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0 /*answer.likeCount || 0*/);
  const createdAt = new Date(answer.createdAt);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onEdit(answer.answerId, editedContent);
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete(answer.answerId);
  };

  const handleLikeButtonClick = () => {
    // 좋아요 상태 변경 처리
    setIsLiked((prevIsLiked) => !prevIsLiked);

    // 변경 예정
    setLikeCount((prevLikeCount) =>
      isLiked ? prevLikeCount - 1 : prevLikeCount + 1
    );
  };

  //   // 서버에 좋아요 상태 전송
  //   const requestData = {
  //     answerId: answer.id, // 좋아요를 누른 답변의 식별자
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

  return (
    <AnswerContainer>
      {isEditing ? (
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
              <LikeButton onClick={handleLikeButtonClick} isLiked={isLiked}>
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
                  <div>{/* 프로필 이미지 author.image? */}🌈</div>
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
