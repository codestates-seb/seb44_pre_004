import { useState } from 'react';
import styled from 'styled-components';

const Answer = ({ answer, onEdit, onDelete /*, author*/ }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(answer.content);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onEdit(answer.id, editedContent);
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete(answer.id);
  };

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
          <AnswerContent>{answer.content}</AnswerContent>
          <ButtonContainer>
            <AuthorDiv>
              <ColumDiv>
                <div>{/* 작성시간 */}asked 40 secs ago</div>
                <RowDiv>
                  <div>{/* 프로필 이미지 author.image? */}🌈</div>
                  <DisplayNameSpan>
                    {/* 닉네임 author.username? */}kim
                  </DisplayNameSpan>
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

export default Answer;
