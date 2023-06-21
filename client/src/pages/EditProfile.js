import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';

import { setNav, setFooter } from '../store/showComponentsSlice';
import styled from 'styled-components';
import UserInfo from '../components/UserInfo';

const EditProfile = ({ userData, setUserData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getUserInfo();
  }, []);

  // 처음 렌더링 될 때 Nav와 Footer 제어
  useEffect(() => {
    dispatch(setNav(true));
    dispatch(setFooter(true));
  }, []);

  const { memberId, username } = userData;

  // TODO: 사용자 정보 initial value 또는 null로 지정
  const [inputs, setInputs] = useState({
    imageUrl: userData.imageUrl,
    name: userData.name,
    title: userData.title || null,
    aboutMe: userData.aboutMe || null,
  });
  const { imageUrl, name, title, aboutMe } = inputs;

  const handleInputChange = (e) => {
    const { value, id } = e.target; // e.target에서 구조 분해 할당
    setInputs({
      ...inputs, // 기존의 input 객체를 복사
      [id]: value || null, // id 키를 가진 값을 value 로 설정
    });
    // console.log(inputs);
  };

  //이미지 파일 등록 함수
  const onUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    return new Promise((resolve) => {
      reader.onload = () => {
        setInputs({
          ...inputs,
          imageUrl: reader.result || null,
        });
        resolve();
        // console.log(reader.result);
      };
    });
  };

  const onSubmit = (e) => {
    // updateUserInfo();
    console.log('Submitted');
    setUserData({ ...userData, ...inputs });
    alert('수정이 완료되었습니다.');
    navigate(`/user/${memberId}/${username}`);
    e.preventDefault();
  };

  // 사용자 정보 GET 요청
  const getUserInfo = /* async */ () => {
    // try {
    //   const response = await axios.get(`/user/edit/${memberId}`);
    //   console.log(response);
    // } catch (error) {
    //   console.error('Error EditProfile get user info', error);
    // }
  };

  // 사용자 정보 변경 PATCH 요청
  // const updateUserInfo = /* async */ () => {
  // try {
  //   await axios.patch(`/user/edit/${memberId}`, inputs);
  // } catch (error) {
  //   console.error('Error update user profile', error);
  // }
  // };

  return (
    <>
      <UserInfo userData={userData} />
      <ContentsContainer>
        <h2>Edit your profile</h2>
        <InfoElement>
          <h3>Public information</h3>
          <form onSubmit={onSubmit}>
            <ul>
              <InputFile>
                <h4>Profile image</h4>
                <div>
                  <label htmlFor="imageUrl">Change picture</label>
                  <input
                    type="file"
                    id="imageUrl"
                    onChange={(e) => onUpload(e)}
                  />
                  <img src={imageUrl} alt="profile" />
                </div>
              </InputFile>
              <InputText>
                <label htmlFor="name">Display name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={handleInputChange}
                />
              </InputText>
              <InputText>
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={handleInputChange}
                />
              </InputText>
              <InputText>
                <label htmlFor="aboutMe">About me</label>
                <textarea
                  name="aboutMe"
                  id="aboutMe"
                  value={aboutMe}
                  onChange={handleInputChange}
                  maxLength={300}
                ></textarea>
              </InputText>
            </ul>
            <ButtonArea>
              <BlueBtn type="submit">Save profile</BlueBtn>
              <Link
                to={`/user/${memberId}/${username}`}
                onClick={() =>
                  alert('작성하신 내용이 저장되지 않습니다. 계속하시겠습니까?')
                }
              >
                Cancel
              </Link>
            </ButtonArea>
          </form>
        </InfoElement>
      </ContentsContainer>
    </>
  );
};

const ContentsContainer = styled.ul`
  padding: 32px;
  border-top: 1px solid rgb(214, 217, 220);
  h2 {
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 1px solid rgb(214, 217, 220);
    font-size: 27px;
  }
`;

const InfoElement = styled.li`
  margin: 20px 0;
  > h3 {
    margin-bottom: 8px;
    font-size: 21px;
  }

  ul {
    padding: 16px 24px;
    border: 1px solid hsl(210, 8%, 85%);
    border-radius: 5px;
  }
`;
const InputFile = styled.li`
  display: flex;
  flex-direction: column;
  margin: 8px 0;

  > h4 {
    margin: 4px 0;
    padding: 0 2px;
    font-size: 15px;
    font-weight: 600;
  }
  > div {
    position: relative;
    width: 164px;
    height: 164px;
    margin: 2px 0;
    border-radius: 3px;
    overflow: hidden;
    > label {
      position: absolute;
      bottom: 0;
      width: 100%;
      padding: 10px 0;
      font-size: 13px;
      text-align: center;
      background-color: hsl(210, 8%, 35%);
      color: #ffffff;
      &:hover {
        background-color: hsl(210, 8%, 25%);
      }
    }
    > input[type='file'] {
      position: absolute;
      width: 0;
      height: 0;
      padding: 0;
      overflow: hidden;
      border: 0;
    }
    > img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
`;
const InputText = styled.li`
  display: flex;
  flex-direction: column;
  margin: 8px 0;
  > label {
    margin: 4px 0;
    padding: 0 2px;
    font-size: 15px;
    font-weight: 600;
  }
  > input[type='text'] {
    width: 420px;
    height: 36px;
    margin: 4px 0;
    padding: 10px;
    font-size: 13px;
    border: 1px solid hsl(210, 8%, 75%);
    border-radius: 3px;
  }
  > textarea {
    height: 80px;
    margin: 4px 0;
    padding: 10px;
    font-size: 13px;
    border: 1px solid hsl(210, 8%, 75%);
    border-radius: 3px;
  }
`;

const ButtonArea = styled.div`
  display: flex;
  margin-top: 40px;
  a {
    padding: 8px;
    font-size: 13px;
    font-weight: 500;
    color: var(--bright-blue);
  }
`;

const BlueBtn = styled.button`
  margin-right: 15px;
  padding: 8px 10px;
  background-color: var(--bright-blue);
  border: 1px solid var(--bright-blue);
  border-radius: 3px;
  color: #ffffff;
  font-size: 13px;
  font-weight: 500;
  &:hover {
    background-color: var(--dark-blue);
  }
`;

export default EditProfile;
