import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { setNav, setFooter } from '../store/showComponentsSlice';
import { menuIdxSlice } from '../store/menuIdxSlice';
import BeforeLogin from '../components/BeforeLogin';
import AfterLogin from '../components/AfterLogin';
import LoadingSpinner from '../components/LoadingSpinner';

const Main = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const [questionData, setQuestionData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/qna/question`)
      .then((res) => {
        setQuestionData(res.data.data.questions.content);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  // 처음 렌더링 될 때 Nav와 Footer 제어
  useEffect(() => {
    // 로그인 여부에 레이웃 분기 처리
    if (isLoggedIn) {
      dispatch(setNav(true));
    } else {
      dispatch(setNav(false));
    }
    dispatch(setFooter(true));
    dispatch(menuIdxSlice.actions.idx(0));
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      {isLoggedIn ? (
        <AfterLogin questionData={questionData} />
      ) : (
        <BeforeLogin />
      )}
    </>
  );
};

export default Main;
