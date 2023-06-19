import { useState, useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { setNav, setFooter } from '../store/showComponentsSlice';
import styled from 'styled-components';
import { FaQuestion, FaTree, FaTags, FaTrophy, FaGithub } from 'react-icons/fa';

import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const FormWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-items: center;
`;
const AnotherBtn = styled.button``;

const AnotherButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 30px;
  width: 245px;
  margin: 6px 0px;

  border-radius: 3px;
  font-size: 11px;
  color: white;
  font-weight: lighter;
  cursor: pointer;
`;

const LeftContainer = styled.div`
  display: grid;
  align-items: center;
  margin: 110px 48px 128px 0px;
`;

const RightContainer = styled.div`
  display: grid;
  margin-top: 15px;
  justify-items: center;
  border-radius: 5px;
`;

const Title = styled.h3`
  font-size: 22px;
  margin-bottom: 20px;
  font-weight: 400;
`;

const Description = styled.p`
  font-size: 12px;
`;

const FormContainer = styled.form`
  max-width: 97.2307692rem;
  /* justify-items: center;
  flex-direction: column;
  align-items: center; */

  width: 250px;
  height: 400px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 15px;
  padding: 17px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 10px 24px hsla(0, 0%, 0%, 0.05),
    0 20px 48px hsla(0, 0%, 0%, 0.05), 0 1px 4px hsla(0, 0%, 0%, 0.1);
`;

const Input = styled.input`
  height: 25px;
  width: 215px;
  margin-top: 2px;
  margin-bottom: 25px;
  padding: 7.8px 9px;
  border: 1px solid #ccc;
  border-radius: 3px;
  font-size: 11px;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 30px;
  width: 210px;
  padding: 10.4px;
  margin: 6px 0px;

  background-color: #0a95ff;
  color: #fff;
  border: none;
  border-radius: 3px;
  font-size: 11px;
  font-weight: lighter;
  cursor: pointer;
`;

const Label = styled.label`
  margin-left: 2px 0px;
  padding: 0px 2px;
  font-size: 12px;
  font-weight: bold;
`;
const DivBox1 = styled.p`
  flex-wrap: nowrap;
  width: 210px;
  margin: -20px 0px 20px 0px;

  font-size: 10px;
  color: gray;
`;
const DivBox2 = styled.p`
  flex-wrap: nowrap;
  width: 210px;
  margin: 30px 20px 20px 0px;

  font-size: 10px;
  color: gray;
`;
const DivBox3 = styled.p`
  width: 210px;
  margin: 65px 20px 10px 20px;

  font-size: 11px;
  color: #242629;
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
            <div
              style={{
                display: 'flex',
                marginBottom: 24,
              }}
            >
              <FaQuestion />
              <p>Unlock new privileges like voting and commenting</p>
            </div>
            <div
              style={{
                display: 'flex',
                marginBottom: 24,
              }}
            >
              <FaTree />
              <p> Get unstuck — ask a question</p>
            </div>
            <div
              style={{
                display: 'flex',
                marginBottom: 24,
              }}
            >
              <FaTags />
              <p>Save your favorite questions, answers, watch tags, and more</p>
            </div>
            <div
              style={{
                display: 'flex',
                marginBottom: 24,
              }}
            >
              <FaTrophy />
              <p>Earn reputation and badges</p>
            </div>
            <div
              style={{
                fontSize: 10,
                color: 'gray',
              }}
            >
              <p>
                Collaborate and share knowledge with a private group for FREE.
              </p>
              <p style={{ color: '#0074cc' }}>
                <a
                  href="https://stackoverflow.co/teams/?utm_source=so-owned&utm_medium=product&utm_campaign=free-50&utm_content=public-sign-up"
                  target="_blank"
                  rel="noreferrer"
                >
                  Get Stack Overflow for Teams free for up to 50 users.
                </a>
              </p>
            </div>
          </Description>
        </LeftContainer>
        <RightContainer>
          <AnotherBtn>
            <AnotherButton
              style={{
                backgroundColor: 'white',
                border: '1px solid #d5d9db',
                color: 'black',
              }}
              className="Google"
              type="submit"
            >
              <div style={{ margin: 3, paddingLeft: 0 }}>
                <FcGoogle size={15} />
              </div>
              Sign up with Google
            </AnotherButton>
            <AnotherButton
              style={{ backgroundColor: '#333538' }}
              className="git"
              type="submit"
            >
              <div style={{ margin: 5, justifyContent: 'center' }}>
                <FaGithub size={14} color={'#fff'} />
                Sign up with GitHub
              </div>
            </AnotherButton>
          </AnotherBtn>
          <FormContainer>
            <Label htmlFor="Display Name">Display name</Label>
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
            <DivBox1>
              <p>
                Passwords must contain at least eight
                <br />
                characters, including at least 1 letter and 1 number.
              </p>
            </DivBox1>
            <Button type="submit" onClick={handleSignUp}>
              <Link to="/">Sign Up</Link>
            </Button>
            <DivBox2>
              <p>
                By clicking “Sign up”, you agree to our terms of service and
                acknowledge that you have read and understand our privacy policy
                and code of conduct.
              </p>
            </DivBox2>
            <DivBox3>
              <span style={{ marginRight: 5 }}>Already have an account?</span>
              <span style={{ color: '#0074cc' }}>
                <Link to="/user/login"> Log in </Link>
              </span>
            </DivBox3>
          </FormContainer>
        </RightContainer>
      </FormWrapper>
    </Container>
  );
};

export default SignIn;
