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

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleDisplayNameChange = (e) => {
    setDisplayName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 여기에 회원가입 처리 로직을 추가하세요.
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
          <FormContainer onSubmit={handleSubmit}>
            <Label for="Display Name">Display Name</Label>
            <Input
              type="text"
              value={displayName}
              onChange={handleDisplayNameChange}
            />
            <Label for="Email">Email</Label>
            <Input type="email" value={email} onChange={handleEmailChange} />
            <Label for="Password">Password</Label>
            <Input
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
            <Button type="submit">Sign Up</Button>
          </FormContainer>
        </RightContainer>
      </FormWrapper>
    </Container>
  );
};

export default SignIn;
