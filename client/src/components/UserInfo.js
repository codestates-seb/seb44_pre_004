import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { menuIdxSlice } from '../store/menuIdxSlice';
import { IoPeople, IoPencil } from 'react-icons/io5';
import styled from 'styled-components';

const UserInfo = ({ userData }) => {
  const dispatch = useDispatch();
  const { imageUrl, name, title, aboutMe, days } = userData;

  return (
    <UserContainer>
      <InfoSection>
        <Link to="/user/:memberId/:username">
          <img src={imageUrl} alt="profile" />
        </Link>
        <InfoArea>
          <h2>{name}</h2>
          <h3>{title}</h3>
          <p>{aboutMe}</p>
          <p>
            <IoPeople />
            Member for <span>{days}</span> days
          </p>
        </InfoArea>
      </InfoSection>
      <EditButton>
        <IoPencil />
        <Link
          to="/user/edit/:memberId"
          onClick={() => dispatch(menuIdxSlice.actions.idx(3))}
        >
          Edit profile
        </Link>
      </EditButton>
    </UserContainer>
  );
};

const UserContainer = styled.section`
  display: flex;
  justify-content: space-between;
  padding: 24px;
`;

const InfoSection = styled.div`
  display: flex;
  img {
    display: block;
    width: 128px;
    height: 128px;
    margin: 8px;
  }
`;

const InfoArea = styled.div`
  width: 600px;
  margin: 8px;
  > h2 {
    margin-bottom: 12px;
    font-size: 34px;
  }
  > h3 {
    margin-bottom: 8px;
    font-size: 21px;
    color: rgb(106, 115, 124);
  }
  > p {
    font-size: 13px;
    &:last-of-type {
      margin-top: 8px;
      color: rgb(106, 115, 124);
    }
    svg {
      width: 20px;
      height: 20px;
      margin-right: 8px;
      vertical-align: middle;
    }
  }
`;

const EditButton = styled.span`
  height: fit-content;
  padding: 10px;
  border: 1px solid rgb(106, 115, 124);
  border-radius: 3px;
  color: rgb(106, 115, 124);
  font-size: 13px;
  &:hover {
    color: hsl(210, 8%, 35%);
    background-color: hsl(210, 8%, 97.5%);
  }
  svg {
    margin-right: 4px;
    vertical-align: middle;
  }
`;

export default UserInfo;
