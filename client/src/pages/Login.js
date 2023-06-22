import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { setNav, setFooter } from '../store/showComponentsSlice';

import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import logo from '../asset/logo_small.png';
import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // 처음 렌더링 될 때 Nav와 Footer 제거
  useEffect(() => {
    dispatch(setNav(false));
    dispatch(setFooter(false));
  }, []);

  // axios 요청 확인

  // .get('https://koreanjson.com/users/1')
  // .then((response) => {
  //   console.log(response);
  //   const { data } = response;
  //   console.log(data);
  // })
  // .catch((error) => console.log(error));

  // axios POST 요청 예시
  // .post('https://koreanjson.com/users', { nickName: 'ApeachIcetea', age: '20' })
  // .then((response) => {
  //   const { data } = response;
  //   console.log(data);
  // })
  // .catch((error) => console.log(error));

  // Dummy Data 통신
  // useEffect(() => {
  //   axios.get('https://jsonplaceholder.typicode.com/users').then((response) => {
  //     console.log(response);
  //     setUsers(response.data);
  //   });
  // }, []);
  // useEffect(() => {
  //   console.log(users);
  // }, [users]);

  //데이터 불러와 확인 axios
  // const [users, setUsers] = useState([]);

  // 초기값 세팅 - 이름, 이메일, 비밀번호
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 오류메세지 상태저장

  const [emailMessage, setEmailMessage] = useState(''); // eslint-disable-line no-unused-vars
  const [passwordMessage, setPasswordMessage] = useState(''); // eslint-disable-line no-unused-vars

  // 유효성 검사

  const [isEmail, setIsEmail] = useState(false); // eslint-disable-line no-unused-vars
  const [isPassword, setIsPassword] = useState(false); // eslint-disable-line no-unused-vars

  const onChangeEmail = (e) => {
    const currentEmail = e.target.value;
    setEmail(currentEmail);
    const emailRegExp =
      /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;

    if (!emailRegExp.test(currentEmail)) {
      setEmailMessage('');
      setIsEmail(false);
    } else {
      setEmailMessage('');
      setIsEmail(true);
    }
  };

  const onChangePassword = (e) => {
    const currentPassword = e.target.value;
    setPassword(currentPassword);
    const passwordRegExp =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    if (!passwordRegExp.test(currentPassword)) {
      setPasswordMessage('');
      setIsPassword(false);
    } else {
      setPasswordMessage('');
      setIsPassword(true);
    }
  };
  const handleSignUp = () => {
    if (isEmail === false) {
      alert('이메일을 다시 확인해주세요.');
      // setEmailMessage('Email cannot be empty.');
      setIsEmail(false);
    } else if (isPassword === false) {
      alert('입력하신 정보를 다시 확인해주세요.');
      // setPasswordMessage('Password cannot be empty.');
      setIsPassword(false);
      // } else if (isEmail === '' || isPassword === '') {
      //   setEmailMessage('Email cannot be empty.');
      //   setPasswordMessage('Password cannot be empty.');
    } else if (isEmail && isPassword) {
      navigate('/');
    }
    // if (isEmail === false) {
    //   alert('이메일을 다시 확인해주세요.');
    //   setEmailMessage('Email cannot be empty.');
    //   setIsEmail(false);
    // } else if (isPassword === false) {
    //   alert('비밀번호를 다시 확인해주세요.');
    //   setPasswordMessage('Password cannot be empty.');
    //   setIsPassword(false);
    // } else if (isEmail && isPassword) {
    //   navigate('/');
    // }
  };

  return (
    <Containor>
      <div>
        <LinkWapper>
          <Link to="/">
            <img src={logo} alt="logo" style={{ width: 50 }} />
          </Link>
        </LinkWapper>
        <div style={{ margin: '0 0 0 5' }}>
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
            Log in with Google
          </AnotherButton>
          <AnotherButton
            style={{ backgroundColor: '#333538' }}
            className="git"
            type="submit"
          >
            <div style={{ margin: 5, textAlign: 'center' }}>
              <FaGithub size={14} color={'#fff'} />
              Log in with GitHub
            </div>
          </AnotherButton>
        </div>
      </div>
      <FormContainer>
        <Label htmlFor="Email">Email</Label>
        <Input
          id="email"
          type="text"
          value={email}
          autoComplete="on"
          onChange={onChangeEmail}
          required
        />
        <ErrorMessageDiv>
          <p className="message">{emailMessage}</p>
        </ErrorMessageDiv>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          autoComplete="current-password"
          onChange={onChangePassword}
          required
        />
        <ErrorMessageDiv>
          <p className="message">{passwordMessage}</p>
        </ErrorMessageDiv>
      </FormContainer>
      <ButtonContainor>
        <Button type="submit" onClick={handleSignUp}>
          Log in
        </Button>
      </ButtonContainor>
      <DivBox3>
        <span style={{ marginRight: 5 }}>Don’t have an account?</span>
        <span style={{ color: '#0074cc' }}>
          <Link to="/user/join"> Sign up </Link>
        </span>
      </DivBox3>
    </Containor>
  );
};

const Containor = styled.div`
  display: grid;
  align-items: center;
  justify-content: center;

  margin-top: 100px;
`;

const LinkWapper = styled.div`
  display: grid;
  align-items: center;
  justify-items: center;
`;

const AnotherButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 37px;
  width: 300px;
  margin-top: 10px;

  border-radius: 3px;
  font-size: 13px;
  color: white;
  font-weight: 400;
  cursor: pointer;
`;
const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 97.2307692rem;

  width: 300px;
  height: 290px;
  margin-top: 15px;
  padding: 30px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 10px 24px hsla(0, 0%, 0%, 0.05),
    0 20px 48px hsla(0, 0%, 0%, 0.05), 0 1px 4px hsla(0, 0%, 0%, 0.1);
`;

const Input = styled.input`
  height: 30px;
  width: 240px;
  margin-top: 2px;
  margin-bottom: 30px;
  padding: 7.8px 9px;
  border: 1px solid #ccc;
  border-radius: 3px;
  font-size: 11px;
`;
const ErrorMessageDiv = styled.div`
  margin-top: -25px;
  margin-bottom: 20px;
  font-size: 11px;
  color: red;
`;

const Label = styled.label`
  margin-left: 5px;
  margin-bottom: 5px;
  font-weight: 600;
`;
const ButtonContainor = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  align-items: center;

  height: 40px;
  width: 240px;
  padding: 10.4px;
  margin-top: -90px;

  font-weight: 600;
  font-size: 0.9em;
  line-height: 1em;

  background-color: #0a95ff;
  color: #ffffff;
  border: none;
  border-radius: 3px;
  box-shadow: inset 0 0 0px 0.2px #ffffff, 0 -1px 0px 1px #0a95ff;

  cursor: pointer;
`;
const DivBox3 = styled.div`
  justify-items: center;
  /* text-align: center; */
  margin-top: 40px;
  padding-left: 55px;
  width: 300px;

  font-size: 13px;
  font-weight: 600;
  color: #242629;
`;
export default Login;
