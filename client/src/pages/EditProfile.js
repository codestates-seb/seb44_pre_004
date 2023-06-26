import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { setNav, setFooter } from '../store/showComponentsSlice';
import styled from 'styled-components';
import UserInfo from '../components/UserInfo';
import LoadingSpinner from '../components/LoadingSpinner';

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({});
  const [updatedData, setUpdatedData] = useState({});
  const [imageFile, setImageFile] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const memberId = useSelector((state) => state.user.memberId);
  // const { memberId } = userData;
  const { image, name, title, aboutMe } = updatedData;

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/user/${memberId}`)
      .then((res) => {
        console.log(res.data.data);
        const { memberId, image, name, title, aboutMe, createdAt, updatedAt } =
          res.data.data;
        const data = {
          memberId,
          image,
          name,
          title,
          aboutMe,
          createdAt,
          updatedAt,
        };
        setUserData(data);
        setUpdatedData({
          image,
          name,
          title,
          aboutMe,
        });
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  // 처음 렌더링 될 때 Nav와 Footer 제어
  useEffect(() => {
    dispatch(setNav(true));
    dispatch(setFooter(true));
  }, []);

  const handleInputChange = (e) => {
    const { value, id } = e.target; // e.target에서 구조 분해 할당
    setUpdatedData({
      ...updatedData, // 기존의 input 객체를 복사
      [id]: value || '', // id 키를 가진 값을 value 로 설정
    });
    // console.log(updatedData);
  };

  //이미지 파일 등록 함수
  // const handleUploadFile = (e) => {
  //   const file = e.target.files[0];
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);

  //   return new Promise((resolve) => {
  //     reader.onload = () => {
  //       setUpdatedData({
  //         ...updatedData,
  //         imageUrl: reader.result || null,
  //       });
  //       resolve();
  //       // console.log(reader.result);
  //     };
  //   });
  // };

  const handleUploadFile = (e) => {
    const file = e.target.files[0];
    // console.log(file);
    setImageFile(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.persist();

    let formData = new FormData(); // formData 객체를 생성한다.
    console.log(imageFile);
    formData.append('files', imageFile);
    formData.append('data', JSON.stringify(updatedData));

    console.log(formData);

    updateUserInfo(formData);
    setUserData({ ...userData, ...updatedData });
    alert('수정이 완료되었습니다.');
    navigate(`/user/${memberId}`);
  };

  // 사용자 정보 변경 PATCH 요청
  const updateUserInfo = async (formData) => {
    await axios
      .patch(
        `${process.env.REACT_APP_API_URL}/user/edit/${memberId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data', // Content-Type을 반드시 이렇게 하여야 한다.
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error('Error update user profile', err);
      });
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <UserInfo userData={userData} />
      <ContentsContainer>
        <h2>Edit your profile</h2>
        <InfoElement>
          <h3>Public information</h3>
          <form onSubmit={handleSubmit}>
            <ul>
              <InputFile>
                <h4>Profile image</h4>
                <div>
                  <label htmlFor="imageUrl">Change picture</label>
                  <input
                    type="file"
                    id="imageUrl"
                    name="imageFile"
                    multiple="multiple"
                    onChange={(e) => handleUploadFile(e)}
                  />
                  <img src={image} alt="profile" />
                </div>
              </InputFile>
              <InputText>
                <label htmlFor="name">Display name</label>
                <input
                  type="text"
                  id="name"
                  value={name || ''}
                  onChange={handleInputChange}
                />
              </InputText>
              <InputText>
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  value={title || ''}
                  onChange={handleInputChange}
                />
              </InputText>
              <InputText>
                <label htmlFor="aboutMe">About me</label>
                <textarea
                  name="aboutMe"
                  id="aboutMe"
                  value={aboutMe || ''}
                  onChange={handleInputChange}
                  maxLength={300}
                ></textarea>
              </InputText>
            </ul>
            <ButtonArea>
              <BlueBtn type="submit">Save profile</BlueBtn>
              <Link
                to={`/user/${memberId}`}
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
