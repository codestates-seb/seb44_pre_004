import { useState, useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { setNav, setFooter } from '../store/showComponentsSlice';
import styled from 'styled-components';
import { FaQuestion, FaTree, FaTags, FaTrophy } from 'react-icons/fa';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100vw;
  width: 100vw;
  background-color: rgb(238, 238, 238);
`;
const FormWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-items: center;

  margin-top: -380px;
`;
const AnotherButton = styled.button``;

const LeftContainer = styled.div`
  padding-right: 20px;
`;

const RightContainer = styled.div`
  display: grid;
  justify-items: center;
  border-radius: 10px;

  border-radius: 5px;
`;

const Title = styled.h3`
  font-size: 22px;
  margin-bottom: 20px;
  font-weight: 500;
`;

const Description = styled.p`
  font-size: 13px;
`;

const FormContainer = styled.form`
  display: flex;
  justify-items: center;
  flex-direction: column;
  align-items: center;

  width: 240px;
  height: 400px;
  margin-top: 15px;
  padding-top: 20px;
  background-color: white;
  border-radius: 5px;
`;

const Input = styled.input`
  height: 25px;
  width: 215px;
  margin-bottom: 25px;
  padding: 7.8px 9px;
  border: 1px solid #ccc;
  border-radius: 3px;
  font-size: 16px;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 30px;
  width: 215px;
  padding: 10.4px;
  margin: 6px 0px;

  background-color: #0a95ff;
  color: #fff;
  border: none;
  border-radius: 3px;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
`;

const Label = styled.label`
  display: flex;
  justify-items: left;
  text-align: left;
  font-size: 13px;
  font-weight: bold;
`;
const DivBox = styled.p`
  text-align: left;
  width: 210px;
  margin: -20px 0px 20px -5px;

  font-size: 10px;
  color: gray;
`;

const SignIn = () => {
  const dispatch = useDispatch();
  // 처음 렌더링 될 때 Nav와 Footer 제거
  useEffect(() => {
    dispatch(setNav(false));
    dispatch(setFooter(false));
  }, []);

  // 초기값 세팅 - 이름, 이메일, 비밀번호
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');

  // 오류메세지 상태저장
  const [nameMessage, setNameMessage] = useState(''); // eslint-disable-line no-unused-vars
  const [emailMessage, setEmailMessage] = useState(''); // eslint-disable-line no-unused-vars
  const [passwordMessage, setPasswordMessage] = useState(''); // eslint-disable-line no-unused-vars

  // 유효성 검사
  const [isName, setIsName] = useState(false); // eslint-disable-line no-unused-vars
  const [isEmail, setIsEmail] = useState(false); // eslint-disable-line no-unused-vars
  const [isPassword, setIsPassword] = useState(false); // eslint-disable-line no-unused-vars

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    const pwRegExp =
      /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
    if (!pwRegExp.test(setPassword)) {
      setPasswordMessage(
        '1개의 문자와 1개의 숫자를 포함하는 8개 이상의 문자로 만들어주세요.'
      );
      setIsPassword(false);
    } else {
      setPasswordMessage('안전한 비밀번호입니다.');
      setIsPassword(true);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    const emailRegExp =
      /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;

    if (!emailRegExp.test(setEmail)) {
      setEmailMessage('이메일의 형식이 올바르지 않습니다.');
      setIsEmail(false);
    } else {
      setEmailMessage('사용 가능한 이메일입니다.');
      setIsEmail(true);
    }
  };

  const handleDisplayNameChange = (e) => {
    setDisplayName(e.target.value);
    if (setDisplayName.length < 2 || setDisplayName.length > 5) {
      setNameMessage('닉네임은 2글자 이상 5글자 이하로 입력해주세요');
      setIsName(false);
    } else {
      setNameMessage('사용 가능한 닉네임입니다.');
      setIsName(true);
    }
  };

  const handleSignUp = () => {
    if (email.trim() === '') {
      setEmailMessage('Email cannot be empty.');
      setIsEmail(false);
    }
    if (password.trim() === '') {
      setPasswordMessage('Password cannot be empty.');
      setIsPassword(false);
    }
  };

  return (
    <Container>
      <FormWrapper>
        <LeftContainer>
          <Title>Join the Stack Overflow community</Title>
          <Description>
            <FaQuestion />
            <p className="icon">
              Unlock new privileges like voting and commenting
            </p>
            <FaTree />
            <p className="icon">Get unstuck — ask a question</p>
            <p className="icon">
              Save your favorite questions, answers, watch tags, and more
            </p>
            <FaTags />
            <p className="icon">Earn reputation and badges</p>
            <FaTrophy />
            <p className="icon">
              Collaborate and share knowledge with a private group for FREE.
            </p>
            Get Stack Overflow for Teams free for up to 50 users.
          </Description>
        </LeftContainer>
        <RightContainer>
          <AnotherButton>
            <Button className="Google" type="submit">
              Sign up with Google
            </Button>
            <Button className="git" type="submit">
              Sign up with Google
            </Button>
          </AnotherButton>
          <FormContainer>
            <Label htmlFor="Display Name">Display Name</Label>
            <Input
              id="name"
              type="text"
              value={displayName}
              onChange={handleDisplayNameChange}
            />
            <Label htmlFor="Email">Email</Label>
            <Input
              id="email"
              type="text"
              value={email}
              onChange={handleEmailChange}
            />
            <Label htmlFor="Password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
            <DivBox>
              <p>
                Passwords must contain at least eight
                <br />
                characters, including at least 1 letter and 1 number.
              </p>
            </DivBox>
            <Button type="submit" onClick={handleSignUp}>
              {' '}
              <a href="/">Sign Up</a>
            </Button>
          </FormContainer>
        </RightContainer>
      </FormWrapper>
    </Container>
  );
};

export default SignIn;
