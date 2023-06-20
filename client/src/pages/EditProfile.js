import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setNav, setFooter } from '../store/showComponentsSlice';
import styled from 'styled-components';
import UserInfo from '../components/UserInfo';

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // TODO: 사용자 정보 initial value 또는 null로 지정
  const [imageSrc, setImageSrc] = useState('https://picsum.photos/164');
  // const [displayName, setDisplayName] = useState(null);
  // const [title, setTitle] = useState(null);
  // const [textBody, setTextBody] = useState(null);
  // 처음 렌더링 될 때 Nav와 Footer 제어
  useEffect(() => {
    dispatch(setNav(true));
    dispatch(setFooter(true));
  }, []);

  //이미지 파일 등록 함수
  const onUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result || null); // 파일의 컨텐츠
        resolve();
        console.log(reader.result);
      };
    });
  };

  return (
    <>
      <UserInfo />
      <ContentsContainer>
        <h2>Edit your profile</h2>
        <InfoElement>
          <h3>Public information</h3>
          <form>
            <ul>
              <InputFile>
                <h4>Profile image</h4>
                <div>
                  <label htmlFor="changeImage">Change picture</label>
                  <input
                    type="file"
                    id="changeImage"
                    onChange={(e) => onUpload(e)}
                  />
                  {/* TODO: 사용자 정보 value로 받아오기 */}
                  <img src={imageSrc} alt="profile" />
                </div>
              </InputFile>
              <InputText>
                <label htmlFor="name">Display name</label>
                {/* TODO: 사용자 정보 value로 받아오기 */}
                <input
                  type="text"
                  id="name"
                  // value={displayName}
                />
              </InputText>
              <InputText>
                <label htmlFor="title">Title</label>
                {/* TODO: 사용자 정보 value로 받아오기. 초기값 = null */}
                <input
                  type="text"
                  id="title"
                  // value={title}
                />
              </InputText>
              <InputText>
                <label htmlFor="aboutMe">About me</label>
                {/* TODO: 사용자 정보 value로 받아오기. 초기값 = null */}
                <textarea
                  name="aboutMe"
                  id="aboutMe"
                  // value={textBody}
                  maxLength={300}
                ></textarea>
              </InputText>
            </ul>
            <ButtonArea>
              <BlueBtn onClick={() => navigate('/user/:memberId/:username')}>
                Save profile
              </BlueBtn>
              <Link to="/user/:memberId/:username">Cancel</Link>
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

const BlueBtn = styled.span`
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
