import styled from 'styled-components';

const Comment = ({ comment, onDelete }) => {
  const handleDelete = () => {
    onDelete(comment.id);
  };

  return (
    <div>
      <div>
        <RowDiv>
          <p>{comment.content} -</p>
          <DisplayNameSpan>{comment.writerName}kim</DisplayNameSpan>
          <div>asked {comment.createdAt}</div>
        </RowDiv>
        <CommentButton onClick={handleDelete}>Delete</CommentButton>
      </div>
    </div>
  );
};

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

const CommentButton = styled.button`
  color: var(--light-grey);
  cursor: pointer;
`;

export default Comment;
