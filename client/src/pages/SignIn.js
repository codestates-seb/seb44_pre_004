import { useState, useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { setNav, setFooter } from '../store/showComponentsSlice';
import styled, { css } from 'styled-components';
import { FaQuestion, FaTree, FaTags, FaTrophy, FaGithub } from 'react-icons/fa';

import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';

const SignIn = () => {
  const navigate = useNavigate();
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

  const handleDisplayNameChange = (e) => {
    const currentName = e.target.value;
    console.log(displayName);
    setDisplayName(currentName);
    if (currentName.length < 2 || currentName.length > 5) {
      setNameMessage('닉네임은 2글자 이상 5글자 이하로 입력해주세요');
      setIsName(false);
    } else {
      setNameMessage('사용 가능한 닉네임입니다.');
      setIsName(true);
    }
  };

  const onChangePassword = (e) => {
    const currentPassword = e.target.value;
    setPassword(currentPassword);
    const passwordRegExp =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    if (!passwordRegExp.test(currentPassword)) {
      setPasswordMessage(
        '숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!'
      );
      setIsPassword(false);
    } else {
      setPasswordMessage('안전한 비밀번호 입니다.');
      setIsPassword(true);
    }
  };

  const onChangeEmail = (e) => {
    const currentEmail = e.target.value;
    setEmail(currentEmail);
    const emailRegExp =
      /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;

    if (!emailRegExp.test(currentEmail)) {
      setEmailMessage('이메일의 형식이 올바르지 않습니다!');
      setIsEmail(false);
    } else {
      setEmailMessage('사용 가능한 이메일 입니다.');
      setIsEmail(true);
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
    if (isEmail && isPassword) {
      navigate('/user/login');
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
              <div>Unlock new privileges like voting and commenting</div>
            </div>
            <div
              style={{
                display: 'flex',
                marginBottom: 24,
              }}
            >
              <FaTree />
              <div> Get unstuck — ask a question</div>
            </div>
            <div
              style={{
                display: 'flex',
                marginBottom: 24,
              }}
            >
              <FaTags />
              <div>
                Save your favorite questions, answers, watch tags, and more
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                marginBottom: 24,
              }}
            >
              <FaTrophy />
              <div>Earn reputation and badges</div>
            </div>
            <div
              style={{
                fontSize: 10,
                color: 'gray',
              }}
            >
              <div>
                Collaborate and share knowledge with a private group for FREE.
              </div>
              <div style={{ color: '#0074cc' }}>
                <a
                  href="https://stackoverflow.co/teams/?utm_source=so-owned&utm_medium=product&utm_campaign=free-50&utm_content=public-sign-up"
                  target="_blank"
                  rel="noreferrer"
                >
                  Get Stack Overflow for Teams free for up to 50 users.
                </a>
              </div>
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
              autoComplete="off"
              onChange={handleDisplayNameChange}
              required
            />
            <ErrorMessageDiv primary={isName}>
              <p>{nameMessage}</p>
            </ErrorMessageDiv>
            <Label htmlFor="Email">Email</Label>
            <Input
              id="email"
              type="text"
              value={email}
              autoComplete="off"
              onChange={onChangeEmail}
              required
            />
            <ErrorMessageDiv primary={isEmail}>
              <p className="message">{emailMessage}</p>
            </ErrorMessageDiv>
            <Label htmlFor="Password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              autoComplete="current-password"
              onChange={onChangePassword}
              required
            />
            <ErrorMessageDiv primary={isPassword}>
              <p className="message">{passwordMessage}</p>
            </ErrorMessageDiv>
          </FormContainer>
          <DivBox1>
            <div>
              Passwords must contain at least eight
              <br />
              characters, including at least 1 letter and 1 number.
            </div>
          </DivBox1>
          <Button type="submit" onClick={handleSignUp}>
            Sign Up
          </Button>

          <DivBox2>
            <div>
              By clicking “Sign up”, you agree to our terms of service and
              acknowledge that you have read and understand our privacy policy
              and code of conduct.
            </div>
          </DivBox2>

          <DivBox3>
            <span style={{ marginRight: 5 }}>Already have an account?</span>
            <span style={{ color: '#0074cc' }}>
              <Link to="/user/login"> Log in </Link>
            </span>
          </DivBox3>
        </RightContainer>
      </FormWrapper>
    </Container>
  );
};

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
const AnotherBtn = styled.div``;

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

const Description = styled.div`
  font-size: 12px;
`;

const FormContainer = styled.form`
  max-width: 97.2307692rem;
  /* justify-items: center;
  flex-direction: column;
  align-items: center; */

  width: 250px;
  height: 450px;
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
  margin-bottom: 30px;
  padding: 7.8px 9px;
  border: 1px solid #ccc;
  border-radius: 3px;
  font-size: 11px;
  autocomplete: 'current-password';
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 30px;
  width: 210px;
  padding: 10.4px;
  margin: -130px 0px;

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
  font-weight: 700;
`;
const DivBox1 = styled.div`
  width: 210px;
  text-align: left;
  margin-top: -180px;
  font-size: 10px;
  color: gray;
`;
const DivBox2 = styled.div`
  flex-wrap: nowrap;
  width: 210px;
  text-align: left;
  margin-top: -75px;

  font-size: 10px;
  color: gray;
`;
const DivBox3 = styled.div`
  text-align: center;
  margin-top: 30px;
  width: 210px;

  font-size: 11px;
  color: #242629;
`;
const ErrorMessageDiv = styled.div`
  margin-top: -26px;
  margin-bottom: 20px;
  font-size: 11px;
  color: ${(props) => (props.primary ? 'green' : 'red')};
  ${(props) =>
    props.primary &&
    css`
      color: green;
    `}

  ${(props) =>
    !props.primary &&
    css`
      color: red;
    `}
`;
export default SignIn;
