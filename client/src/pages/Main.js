import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setNav, setFooter } from '../store/showComponentsSlice';
import BeforeLogin from '../components/BeforeLogin';
// import AfterLogin from '../components/AfterLogin';

const Main = () => {
  const dispatch = useDispatch();
  // 처음 렌더링 될 때 Nav와 Footer 제어
  useEffect(() => {
    // 로그인 여부에 따른 네비게이션 유무 분기 처리 필요
    // dispatch(setNav(true));
    dispatch(setNav(false));
    dispatch(setFooter(true));
  }, []);

  return (
    <>
      <BeforeLogin />
      {/* <AfterLogin /> */}
    </>
  );
};

export default Main;
